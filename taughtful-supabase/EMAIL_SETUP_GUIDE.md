# 📧 Email Setup Guide for Supabase

## 🚨 Current Issue: Email Confirmation Not Working

The signup link isn't working because email confirmation needs to be configured in your Supabase project.

## 🔧 How to Fix Email Functionality

### **Step 1: Configure Email Settings in Supabase**

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/kpdusbhqiswdiyzdwxpw
   - Navigate to **Authentication** → **Settings**

2. **Configure Email Settings**:
   - **Enable email confirmations** (toggle ON)
   - **Set confirmation URL**: `http://localhost:3002` (your current dev server)
   - **Set redirect URLs**: Add `http://localhost:3002/**`

### **Step 2: Set Up Email Provider (Choose One)**

#### **Option A: Use Supabase's Built-in Email (Free)**
- Go to **Authentication** → **Settings** → **Email**
- Use the default Supabase email service
- **Note**: Limited to 3 emails per hour for free tier

#### **Option B: Use Custom SMTP (Recommended for Production)**
- Go to **Authentication** → **Settings** → **Email**
- Configure your SMTP settings:
  - **Gmail**: smtp.gmail.com:587
  - **SendGrid**: smtp.sendgrid.net:587
  - **Mailgun**: smtp.mailgun.org:587

### **Step 3: Test Email Configuration**

1. **Visit your test page**: http://localhost:3002/test-profile
2. **Try signing up** with a new email
3. **Check your email** for the confirmation link
4. **Click the confirmation link**

## 🧪 Testing Your Profile System

### **Test URLs:**
- **Profile Test**: http://localhost:3002/test-profile
- **Connection Test**: http://localhost:3002/test-supabase
- **Login Page**: http://localhost:3002/login

### **What to Test:**
1. **Sign up** with a new email
2. **Check email** for confirmation link
3. **Click confirmation link**
4. **Sign in** with confirmed email
5. **Test profile loading** from database
6. **Test profile updating** with new data

## 🔍 Troubleshooting Email Issues

### **If emails aren't being sent:**
1. **Check Supabase logs** in the dashboard
2. **Verify email settings** are enabled
3. **Check spam folder** for confirmation emails
4. **Test with different email providers**

### **If confirmation links don't work:**
1. **Check redirect URLs** in Supabase settings
2. **Verify the URL** matches your dev server
3. **Check browser console** for errors
4. **Try incognito mode** to avoid cache issues

### **If profile data isn't loading:**
1. **Check database setup** - run the safe SQL script
2. **Verify RLS policies** are working
3. **Check browser console** for errors
4. **Test with the profile test page**

## 📋 Quick Checklist

- [ ] Email confirmations enabled in Supabase
- [ ] Redirect URLs configured correctly
- [ ] Email provider set up (SMTP or built-in)
- [ ] Database tables created (run safe SQL script)
- [ ] RLS policies working
- [ ] Test signup and confirmation flow
- [ ] Test profile loading and updating

## 🚀 Production Email Setup

For production, you'll want to:

1. **Use a reliable email provider** (SendGrid, Mailgun, etc.)
2. **Set up custom domain** for email sending
3. **Configure proper redirect URLs** for your production domain
4. **Set up email templates** for better branding
5. **Monitor email delivery** and bounce rates

## 🆘 Still Having Issues?

1. **Check Supabase status**: https://status.supabase.com/
2. **Review Supabase logs** in the dashboard
3. **Test with a different email address**
4. **Check your internet connection**
5. **Try refreshing the page** and clearing cache

## 📞 Support Resources

- [Supabase Email Documentation](https://supabase.com/docs/guides/auth/auth-email)
- [Supabase Authentication Guide](https://supabase.com/docs/guides/auth)
- [Supabase Community Forum](https://github.com/supabase/supabase/discussions)

**Remember**: Email functionality requires proper configuration in your Supabase project settings!
