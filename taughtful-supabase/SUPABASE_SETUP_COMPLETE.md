# Supabase Setup for Taughtful

Your Supabase project is now configured! Here's what you need to do to complete the setup.

## ✅ What's Already Done

1. **Supabase client configuration** - Updated with your project URL
2. **Environment variables** - Created example file with your credentials
3. **Cursor MCP configuration** - Updated with your project reference

## 🔧 Final Setup Steps

### 1. Create Environment File

Create a `.env.local` file in your project root with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kpdusbhqiswdiyzdwxpw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxMzQsImV4cCI6MjA3NDE4MTEzNH0.i5Zr4pKkbqRMiIaYO0yZflkgwKv2qPI5EBj6nQPmR5I
```

### 2. Set up Database Tables

Run this SQL in your Supabase SQL Editor to create the notes table:

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Complete Cursor MCP Setup

1. Get your Supabase Access Token:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click your profile picture → **Access Tokens**
   - Generate a new token named "Cursor MCP"
   - Copy the token

2. Update `.cursor/mcp.json`:
   - Replace `<access-token>` with your actual access token

3. Restart Cursor completely

### 4. Test the Application

```bash
npm run dev
```

Then visit:
- [http://localhost:3000](http://localhost:3000) - Home page (will redirect to login)
- [http://localhost:3000/login](http://localhost:3000/login) - Login page
- [http://localhost:3000/notes](http://localhost:3000/notes) - Notes page (after login)

## 🧪 Testing Authentication

1. **Sign up** with a new email/password
2. **Check your email** for the confirmation link
3. **Sign in** with your credentials
4. **View your profile** on the home page
5. **Test the notes page** to see database integration

## 🔒 Security Notes

- Your `.env.local` file is already in `.gitignore`
- Never commit your environment variables
- The anon key is safe to use in client-side code
- Use service role key only for server-side operations

## 📊 Your Supabase Project

- **Project URL**: https://kpdusbhqiswdiyzdwxpw.supabase.co
- **Project Reference**: kpdusbhqiswdiyzdwxpw
- **Database**: PostgreSQL
- **Authentication**: Email/Password enabled

## 🆘 Troubleshooting

### If you get "Invalid API key" errors:
- Check that your `.env.local` file exists
- Verify the environment variable names are correct
- Restart your development server

### If authentication doesn't work:
- Check your Supabase project settings
- Ensure email confirmation is configured correctly
- Check the browser console for errors

### If MCP doesn't work:
- Verify your access token is correct
- Restart Cursor completely
- Check that Node.js is in your PATH

## 🎉 You're Ready!

Your Next.js app with Supabase is now fully configured and ready to use!
