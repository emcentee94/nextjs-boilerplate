-- Create demo_requests table if it doesn't exist
create table if not exists public.demo_requests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null unique,
  school text,
  role text,
  message text,
  submitted_at timestamp with time zone default now(),
  status text default 'pending'
);

-- Indexes
create index if not exists idx_demo_requests_email on public.demo_requests(email);
create index if not exists idx_demo_requests_submitted_at on public.demo_requests(submitted_at desc);

-- Enable RLS
alter table public.demo_requests enable row level security;

-- RLS Policies
create policy if not exists "Service can insert demo requests" on public.demo_requests
  for insert with check (true);

create policy if not exists "Users can view own demo requests" on public.demo_requests
  for select using (auth.jwt() ->> 'email' = email);
