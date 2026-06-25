-- Create user profiles table
-- Run in Supabase SQL Editor or via supabase migration tooling.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone not null default now(),
  role text
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policy: users can view their own profile
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

-- Policy: users can insert/update their own profile
create policy "profiles_upsert_own"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id);

