# Taughtful Supabase App

This is a [Next.js](https://nextjs.org) project with [Supabase](https://supabase.com) authentication and database integration.

## Features

- ✅ **Cookie-based Authentication** - Secure server-side authentication
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling
- ✅ **Supabase Integration** - Database and auth
- ✅ **Middleware Protection** - Automatic route protection

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Database

Create a `notes` table in your Supabase database:

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── login/           # Login page and form
│   ├── notes/           # Notes page (example)
│   ├── page.tsx         # Home page (protected)
│   └── layout.tsx       # Root layout
├── utils/
│   └── supabase/
│       ├── client.ts    # Client-side Supabase client
│       ├── server.ts    # Server-side Supabase client
│       └── middleware.ts # Auth middleware
└── middleware.ts        # Next.js middleware
```

## Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Login/Signup** handles user authentication
3. **Protected routes** are automatically secured by middleware
4. **Server components** can access user data via `createClient()`

## Example Usage

### Server Component (Protected)
```tsx
import { createClient } from '@/utils/supabase/server'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <div>Hello {user.email}!</div>
}
```

### Client Component
```tsx
'use client'
import { createClient } from '@/utils/supabase/client'

export default function ClientComponent() {
  const supabase = createClient()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }
  
  return <button onClick={handleSignOut}>Sign Out</button>
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
