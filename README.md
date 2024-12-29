# OpenCTI MCP Server

[Traditional Chinese (繁體中文)](README.zh-TW.md)

## Overview
OpenCTI MCP Server is a Model Context Protocol (MCP) server that provides seamless integration with OpenCTI (Open Cyber Threat Intelligence) platform. It enables querying and retrieving threat intelligence data through a standardized interface.

## Features
- Fetch latest threat intelligence reports
- Search for malware information
- Query indicators of compromise
- Search for threat actors
- Customizable query limits
- Full GraphQL query support

## Prerequisites
- Node.js 16 or higher
- Access to an OpenCTI instance
- OpenCTI API token

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/opencti-mcp-server.git

# Install dependencies
cd opencti-mcp-server
npm install

# Build the project
npm run build
```

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and update with your OpenCTI credentials:
```bash
cp .env.example .env
```

Required environment variables:
- `OPENCTI_URL`: Your OpenCTI instance URL
- `OPENCTI_TOKEN`: Your OpenCTI API token

### MCP Settings
Create a configuration file in your MCP settings location:
```json
{
  "mcpServers": {
    "opencti": {
      "command": "node",
      "args": ["path/to/opencti-server/build/index.js"],
      "env": {
        "OPENCTI_URL": "${OPENCTI_URL}",  // Will be loaded from .env
        "OPENCTI_TOKEN": "${OPENCTI_TOKEN}"  // Will be loaded from .env
      }
    }
  }
}
```

### Security Notes
- Never commit `.env` file or API tokens to version control
- Keep your OpenCTI credentials secure
- The `.gitignore` file is configured to exclude sensitive files

## Available Tools

### get_latest_reports
Retrieves the most recent threat intelligence reports.
```typescript
{
  "name": "get_latest_reports",
  "arguments": {
    "first": 10  // Optional, defaults to 10
  }
}
```

### search_malware
Searches for malware information in the OpenCTI database.
```typescript
{
  "name": "search_malware",
  "arguments": {
    "query": "ransomware",
    "first": 10  // Optional, defaults to 10
  }
}
```

### search_indicators
Searches for indicators of compromise.
```typescript
{
  "name": "search_indicators",
  "arguments": {
    "query": "domain",
    "first": 10  // Optional, defaults to 10
  }
}
```

### search_threat_actors
Searches for threat actor information.
```typescript
{
  "name": "search_threat_actors",
  "arguments": {
    "query": "APT",
    "first": 10  // Optional, defaults to 10
  }
}
```

## Contributing
Contributions are welcome! Please feel free to submit pull requests.

## License
MIT License
