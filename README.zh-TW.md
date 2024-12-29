# OpenCTI MCP 伺服器

[English](README.md)

## 概述
OpenCTI MCP 伺服器是一個基於模型上下文協議(Model Context Protocol, MCP)的伺服器，提供與 OpenCTI (Open Cyber Threat Intelligence) 平台的無縫整合。它能夠通過標準化接口查詢和獲取威脅情報數據。

## 功能特點
- 獲取最新威脅情報報告
- 搜尋惡意程式資訊
- 查詢威脅指標
- 搜尋威脅行為者
- 可自定義查詢限制
- 完整支援 GraphQL 查詢

## 系統要求
- Node.js 16 或更高版本
- 可訪問的 OpenCTI 實例
- OpenCTI API 令牌

## 安裝方法
```bash
# 克隆儲存庫
git clone https://github.com/yourusername/opencti-mcp-server.git

# 安裝依賴
cd opencti-mcp-server
npm install

# 建置專案
npm run build
```

## 配置設定

### 環境變數
複製 `.env.example` 到 `.env` 並更新您的 OpenCTI 憑證：
```bash
cp .env.example .env
```

必要的環境變數：
- `OPENCTI_URL`: 您的 OpenCTI 實例 URL
- `OPENCTI_TOKEN`: 您的 OpenCTI API 令牌

### MCP 設定
在 MCP 設定檔案位置創建配置文件：
```json
{
  "mcpServers": {
    "opencti": {
      "command": "node",
      "args": ["path/to/opencti-server/build/index.js"],
      "env": {
        "OPENCTI_URL": "${OPENCTI_URL}",  // 將從 .env 載入
        "OPENCTI_TOKEN": "${OPENCTI_TOKEN}"  // 將從 .env 載入
      }
    }
  }
}
```

### 安全注意事項
- 切勿將 `.env` 檔案或 API 令牌提交到版本控制
- 妥善保管您的 OpenCTI 憑證
- `.gitignore` 檔案已設定排除敏感檔案

## 可用工具

### get_latest_reports
獲取最新的威脅情報報告。
```typescript
{
  "name": "get_latest_reports",
  "arguments": {
    "first": 10  // 可選，預設為 10
  }
}
```

### search_malware
搜尋 OpenCTI 數據庫中的惡意程式資訊。
```typescript
{
  "name": "search_malware",
  "arguments": {
    "query": "ransomware",
    "first": 10  // 可選，預設為 10
  }
}
```

### search_indicators
搜尋威脅指標。
```typescript
{
  "name": "search_indicators",
  "arguments": {
    "query": "domain",
    "first": 10  // 可選，預設為 10
  }
}
```

### search_threat_actors
搜尋威脅行為者資訊。
```typescript
{
  "name": "search_threat_actors",
  "arguments": {
    "query": "APT",
    "first": 10  // 可選，預設為 10
  }
}
```

## 貢獻
歡迎提交貢獻！請隨時提交 pull requests。

## 授權條款
MIT 授權
