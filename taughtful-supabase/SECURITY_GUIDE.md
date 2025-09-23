# 🔒 Security Guide for Taughtful Supabase

This guide covers security best practices for your Supabase integration.

## 🛡️ Current Security Measures

### ✅ **Read-Only MCP Configuration**
- The Cursor MCP integration uses `--read-only` flag
- This prevents accidental database modifications from Cursor
- Only allows SELECT queries, not INSERT/UPDATE/DELETE

### ✅ **Environment Variables**
- Sensitive credentials stored in `.env.local`
- Environment files are in `.gitignore`
- Never committed to version control

### ✅ **Row Level Security (RLS)**
- All tables have RLS enabled
- Users can only access their own data
- Curriculum data is publicly readable (as intended)

## 🔐 Production Security Checklist

### 1. **Environment Variables**
```bash
# Development (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://kpdusbhqiswdiyzdwxpw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Production (use environment variables)
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
```

### 2. **Supabase Project Settings**
- ✅ **Enable email confirmation** for new signups
- ✅ **Set up proper CORS origins** for production domain
- ✅ **Configure rate limiting** for API endpoints
- ✅ **Enable audit logs** for security monitoring

### 3. **Database Security**
- ✅ **RLS policies** are enabled on all tables
- ✅ **Service role key** is never exposed to client
- ✅ **Database functions** use SECURITY DEFINER appropriately

### 4. **Cursor MCP Security**
- ✅ **Access token** is stored locally only
- ✅ **Read-only mode** prevents accidental changes
- ✅ **Configuration file** is in `.gitignore`

## 🚨 Security Warnings

### ⚠️ **Never Do These:**
- ❌ Commit `.env.local` or `.cursor/mcp.json` to git
- ❌ Use service role key in client-side code
- ❌ Disable RLS policies in production
- ❌ Share access tokens in chat or documentation
- ❌ Use production credentials in development

### ⚠️ **Always Do These:**
- ✅ Use environment variables for production
- ✅ Regularly rotate access tokens
- ✅ Monitor Supabase dashboard for unusual activity
- ✅ Keep dependencies updated
- ✅ Use HTTPS in production

## 🔧 Production Deployment

### **Vercel Deployment**
```bash
# Set environment variables in Vercel dashboard
NEXT_PUBLIC_SUPABASE_URL=https://kpdusbhqiswdiyzdwxpw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### **Other Platforms**
- Set environment variables in your hosting platform
- Never hardcode credentials in source code
- Use platform-specific secret management

## 🛠️ MCP Configuration for Production

### **Option 1: Environment Variables (Recommended)**
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
        "--project-ref=${SUPABASE_PROJECT_REF}"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

### **Option 2: Separate Configuration**
- Keep development config in `.cursor/mcp.json`
- Use different config for production
- Never commit production configs

## 📊 Monitoring & Alerts

### **Supabase Dashboard**
- Monitor API usage and limits
- Check for failed authentication attempts
- Review database query performance
- Set up alerts for unusual activity

### **Application Monitoring**
- Log authentication events
- Monitor error rates
- Track user activity patterns
- Set up alerts for security issues

## 🔄 Regular Security Tasks

### **Monthly:**
- Review access tokens and rotate if needed
- Check Supabase project settings
- Update dependencies
- Review user permissions

### **Quarterly:**
- Audit RLS policies
- Review database access patterns
- Update security documentation
- Test backup and recovery procedures

## 🆘 Incident Response

### **If Credentials Are Compromised:**
1. **Immediately rotate** the compromised credentials
2. **Check Supabase logs** for unauthorized access
3. **Review user accounts** for suspicious activity
4. **Update all environments** with new credentials
5. **Monitor** for any ongoing issues

### **If Database Is Compromised:**
1. **Isolate** the affected systems
2. **Check RLS policies** and user permissions
3. **Review audit logs** for the attack vector
4. **Restore** from backup if necessary
5. **Implement** additional security measures

## 📚 Additional Resources

- [Supabase Security Guide](https://supabase.com/docs/guides/platform/security)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## ✅ Security Checklist

- [ ] Environment variables configured
- [ ] RLS policies enabled
- [ ] Access tokens secured
- [ ] CORS origins configured
- [ ] Rate limiting enabled
- [ ] Audit logs enabled
- [ ] Dependencies updated
- [ ] Security monitoring active
- [ ] Backup procedures tested
- [ ] Incident response plan ready

**Remember: Security is an ongoing process, not a one-time setup!**
