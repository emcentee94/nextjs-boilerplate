# Cursor MCP Supabase Setup

This guide will help you set up the Cursor MCP (Model Context Protocol) integration with Supabase.

## ✅ What's Already Done

1. **Created `.cursor` directory** in your project root
2. **Created `.cursor/mcp.json`** configuration file
3. **Added Node.js to system PATH** for Windows

## 🔧 Next Steps

### 1. Get Your Supabase Project Reference

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **General**
4. Copy the **Project Reference ID** (it looks like: `abcdefghijklmnop`)

### 2. Get Your Supabase Access Token

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Click on your profile picture (top right)
3. Go to **Access Tokens**
4. Click **Generate new token**
5. Give it a name (e.g., "Cursor MCP")
6. Copy the generated token

### 3. Update the Configuration

Edit the `.cursor/mcp.json` file and replace:

- `<project-ref>` with your Project Reference ID
- `<access-token>` with your Access Token

**Example:**
```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase",
        "--read-only",
        "--project-ref=abcdefghijklmnop"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_1234567890abcdef"
      }
    }
  }
}
```

### 4. Restart Cursor

**Important:** You must restart Cursor completely for the changes to take effect.

1. Close Cursor completely
2. Reopen Cursor
3. Open your project

## 🧪 Testing the Integration

Once configured, you should be able to:

1. **Query your database** directly from Cursor
2. **Get schema information** about your tables
3. **View data** from your Supabase tables
4. **Get help with SQL queries** and database operations

## 🔒 Security Notes

- The configuration uses `--read-only` flag for safety
- Your access token is stored locally in the configuration file
- Never commit your `.cursor/mcp.json` file to version control
- Consider using environment variables for production setups

## 🆘 Troubleshooting

### If MCP doesn't work:

1. **Check Node.js PATH**: Make sure `npx` is available in your terminal
2. **Verify credentials**: Double-check your project ref and access token
3. **Restart Cursor**: Always restart after making changes
4. **Check Cursor logs**: Look for any error messages in Cursor's developer tools

### Common Issues:

- **"npx not found"**: Node.js not in PATH (we fixed this)
- **"Invalid project ref"**: Check your project reference ID
- **"Invalid access token"**: Regenerate your access token
- **"Connection failed"**: Check your internet connection and Supabase status

## 📚 Additional Resources

- [Supabase MCP Server Documentation](https://github.com/supabase/mcp-server-supabase)
- [Cursor MCP Documentation](https://cursor.sh/docs/mcp)
- [Supabase Dashboard](https://supabase.com/dashboard)
