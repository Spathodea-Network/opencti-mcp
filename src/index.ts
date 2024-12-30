#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import {
  LATEST_REPORTS_QUERY,
  SEARCH_MALWARE_QUERY,
  SEARCH_INDICATORS_QUERY,
  SEARCH_THREAT_ACTORS_QUERY,
} from './queries/reports.js';

const OPENCTI_URL = process.env.OPENCTI_URL || 'http://localhost:8080';
const OPENCTI_TOKEN = process.env.OPENCTI_TOKEN;

if (!OPENCTI_TOKEN) {
  throw new Error('OPENCTI_TOKEN environment variable is required');
}

interface OpenCTIResponse {
  data: {
    stixObjects: Array<{
      id: string;
      name?: string;
      description?: string;
      created_at?: string;
      modified_at?: string;
      pattern?: string;
      valid_from?: string;
      valid_until?: string;
      x_opencti_score?: number;
      [key: string]: any;
    }>;
  };
}

class OpenCTIServer {
  private server: Server;
  private axiosInstance;

  constructor() {
    this.server = new Server(
      {
        name: 'opencti-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.axiosInstance = axios.create({
      baseURL: OPENCTI_URL,
      headers: {
        'Authorization': `Bearer ${OPENCTI_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    this.setupTools();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_latest_reports',
          description: '獲取最新的OpenCTI報告',
          inputSchema: {
            type: 'object',
            properties: {
              first: {
                type: 'number',
                description: '返回結果數量限制',
                default: 10,
              },
            },
          },
        },
        {
          name: 'search_indicators',
          description: '搜尋OpenCTI中的指標',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: '搜尋關鍵字',
              },
              first: {
                type: 'number',
                description: '返回結果數量限制',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'search_malware',
          description: '搜尋OpenCTI中的惡意程式',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: '搜尋關鍵字',
              },
              first: {
                type: 'number',
                description: '返回結果數量限制',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'search_threat_actors',
          description: '搜尋OpenCTI中的威脅行為者',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: '搜尋關鍵字',
              },
              first: {
                type: 'number',
                description: '返回結果數量限制',
                default: 10,
              },
            },
            required: ['query'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        let query = '';
        let variables: any = {};

        switch (request.params.name) {
          case 'get_latest_reports':
            query = LATEST_REPORTS_QUERY;
            variables = {
              first: typeof request.params.arguments?.first === 'number' ? request.params.arguments.first : 10,
            };
            break;

          case 'search_indicators':
            if (!request.params.arguments || typeof request.params.arguments.query !== 'string') {
              throw new McpError(ErrorCode.InvalidParams, 'Query parameter is required');
            }
            query = SEARCH_INDICATORS_QUERY;
            variables = {
              search: request.params.arguments.query,
              first: typeof request.params.arguments.first === 'number' ? request.params.arguments.first : 10,
            };
            break;

          case 'search_malware':
            if (!request.params.arguments || typeof request.params.arguments.query !== 'string') {
              throw new McpError(ErrorCode.InvalidParams, 'Query parameter is required');
            }
            query = SEARCH_MALWARE_QUERY;
            variables = {
              search: request.params.arguments.query,
              first: typeof request.params.arguments.first === 'number' ? request.params.arguments.first : 10,
            };
            break;

          case 'search_threat_actors':
            if (!request.params.arguments || typeof request.params.arguments.query !== 'string') {
              throw new McpError(ErrorCode.InvalidParams, 'Query parameter is required');
            }
            query = SEARCH_THREAT_ACTORS_QUERY;
            variables = {
              search: request.params.arguments.query,
              first: typeof request.params.arguments.first === 'number' ? request.params.arguments.first : 10,
            };
            break;

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }

        const response = await this.axiosInstance.post('/graphql', {
          query,
          variables,
        });

        console.error('OpenCTI Response:', JSON.stringify(response.data, null, 2));
        
        if (!response.data?.data) {
          throw new McpError(
            ErrorCode.InternalError,
            `Invalid response format from OpenCTI: ${JSON.stringify(response.data)}`
          );
        }

        let formattedResponse;
        
        if (request.params.name === 'get_latest_reports') {
          formattedResponse = response.data.data.reports.edges.map((edge: any) => ({
            id: edge.node.id,
            name: edge.node.name || 'Unnamed',
            description: edge.node.description || '',
            content: edge.node.content || '',
            published: edge.node.published,
            confidence: edge.node.confidence,
            created: edge.node.created,
            modified: edge.node.modified,
            reportTypes: edge.node.report_types || [],
          }));
        } else {
          formattedResponse = response.data.data.stixCoreObjects.edges.map((edge: any) => ({
            id: edge.node.id,
            name: edge.node.name || 'Unnamed',
            description: edge.node.description || '',
            created: edge.node.created,
            modified: edge.node.modified,
            type: edge.node.malware_types?.join(', ') || edge.node.threat_actor_types?.join(', ') || '',
            family: edge.node.is_family ? 'Yes' : 'No',
            firstSeen: edge.node.first_seen || '',
            lastSeen: edge.node.last_seen || '',
            pattern: edge.node.pattern || '',
            validFrom: edge.node.valid_from || '',
            validUntil: edge.node.valid_until || '',
            score: edge.node.x_opencti_score,
          }));
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(formattedResponse, null, 2)
          }]
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios Error:', error.response?.data);
          return {
            content: [{
              type: 'text',
              text: `OpenCTI API error: ${JSON.stringify(error.response?.data) || error.message}`
            }],
            isError: true,
          };
        }
        throw error;
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('OpenCTI MCP server running on stdio');
  }
}

const server = new OpenCTIServer();
server.run().catch(console.error);
