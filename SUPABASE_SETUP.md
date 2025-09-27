# 🚀 Supabase Setup Guide for Taughtful

## ✅ Current Status

Your app is now configured to work in **both modes**:

- **Demo Mode**: Works with localStorage (current state)
- **Production Mode**: Will work with Supabase once configured

## 🔧 Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your account
3. **Click "New Project"**
4. **Fill in details**:
   - Name: `taughtful-platform`
   - Database Password: (choose a strong password)
   - Region: Choose closest to Australia
5. **Click "Create new project"**
6. **Wait 2-3 minutes** for setup to complete

## 🔑 Step 2: Get Your Credentials

1. **Go to Project Settings** → **API**
2. **Copy these values**:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## ⚙️ Step 3: Update Environment Variables

1. **Open your `.env.local` file**
2. **Replace the placeholder values**:

```bash
# Replace these with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## 🗄️ Step 4: Set Up Database Schema

1. **Go to Supabase Dashboard** → **SQL Editor**
2. **Copy the entire contents** of `supabase-schema.sql`
3. **Paste into SQL Editor**
4. **Click "Run"** to create all tables and indexes

## 📥 Step 5: Import Your Curriculum Data

1. **Convert your Excel file to CSV**
2. **Go to your app** → **Admin Panel** (when created)
3. **Upload the CSV file**
4. **Your 21k+ curriculum rows will be imported!**

## 🔄 Step 6: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ Step 7: Test the Connection

1. **Go to your login page**
2. **You should see**: "Supabase connected! Real authentication enabled."
3. **Try creating an account** and logging in
4. **Check your dashboard** - it should now use real database

## 🎯 What You'll Get After Setup

### ✅ Real Authentication

- User registration and login
- Secure password handling
- Session management

### ✅ Database Storage

- Lesson plans stored in database
- User-specific data isolation
- Real-time updates

### ✅ Curriculum Integration

- Import your 21k+ curriculum rows
- Fast search across all outcomes
- Multi-framework support

### ✅ Scalability

- Handle thousands of users
- Production-ready infrastructure
- Automatic backups

## 🆘 Troubleshooting

### "Supabase not configured" Error

- Check your `.env.local` file has correct values
- Restart your development server
- Make sure no spaces in the environment variables

### Database Connection Issues

- Verify your project URL is correct
- Check your anon key is correct
- Ensure your Supabase project is active

### Import Issues

- Make sure CSV file is properly formatted
- Check that database schema was created
- Verify file size isn't too large (split if needed)

## 🚀 Next Steps After Setup

1. **Import your curriculum data**
2. **Test user registration/login**
3. **Create some lesson plans**
4. **Test curriculum search functionality**
5. **Deploy to production!**

## 💡 Pro Tips

- **Keep your service role key secret** (don't commit to git)
- **Use the free tier** for MVP testing
- **Upgrade to Pro** when you have real users
- **Set up database backups** for production

Your Taughtful platform will be production-ready! 🎉
