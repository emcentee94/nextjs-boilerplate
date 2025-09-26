-- Feedback table to store quick survey responses
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  session_id text,
  user_id uuid,
  email text,
  answers jsonb not null default '{}'::jsonb,
  ui_version text,
  app_version text,
  path text,
  user_agent text,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_feedback_created_at on public.feedback(created_at desc);
create index if not exists idx_feedback_email on public.feedback(email);

-- RLS
alter table public.feedback enable row level security;

-- Allow anyone to insert feedback
do $$ begin
  create policy "Anyone can insert feedback" on public.feedback
    for insert with check (true);
exception when duplicate_object then null; end $$;

-- Owners can read their own by email (optional)
do $$ begin
  create policy "View own feedback by email" on public.feedback
    for select using (coalesce((auth.jwt() ->> 'email')::text, '') = coalesce(email, ''));
exception when duplicate_object then null; end $$;


