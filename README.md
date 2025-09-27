# Taughtful - AI-Powered Lesson Planning

Transform the way you learn and teach with AI that understands your unique style. Make every lesson engaging, personalized, and fun.

## Features

- **RAG-Powered AI**: Retrieval-Augmented Generation for curriculum-aligned lesson plans
- **Trauma-Informed**: Built with trauma-informed practices and cultural safety
- **Australian Curriculum**: Aligned to ACARA v9, Victorian, NSW, and WA curricula
- **Email Notifications**: Proton Mail SMTP integration for waitlist and demo requests
- **Supabase Backend**: User authentication, database, and real-time features

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Email**: Proton Mail SMTP
- **Deployment**: Vercel
- **AI**: Anthropic Claude

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Proton Mail)
SMTP_HOST=smtp.protonmail.ch
SMTP_PORT=587
SMTP_USER=hello@taughtful.com.au
SMTP_PASS=your_proton_smtp_token

# AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional: Resend (alternative email service)
RESEND_API_KEY=your_resend_api_key
```

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## Email Configuration

The app uses Proton Mail SMTP for email notifications:

- Waitlist signups → `hello@taughtful.com.au`
- Demo requests → `hello@taughtful.com.au`
- User authentication emails → via Supabase SMTP

I've added a Supabase project and enabled the pg_cron extension.

```sql
-- a CRON job to run every day at midnight
SELECT cron.schedule('daily-cleanup', '0 0 * * *', 'DELETE FROM old_data');
```

And here's another code block.

```javascript
console.log('Hello, World!')
```

### Lists

- Item 1
- Item 2
- Item 3

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Private project - All rights reserved.
