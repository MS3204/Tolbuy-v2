-- Create orders table and enforce access via RLS (Production-ready)
-- Orders are always scoped to the authenticated user (auth.uid()).

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_name text not null,
  price numeric(12,2) not null,
  status text not null default 'shipping',
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Users can read only their own orders
create policy "orders_select_own"
on public.orders
for select
using (auth.uid() = user_id);

-- Users can insert only for themselves
create policy "orders_insert_own"
on public.orders
for insert
with check (auth.uid() = user_id);

-- Users can update only their own orders
create policy "orders_update_own"
on public.orders
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Users can delete only their own orders
create policy "orders_delete_own"
on public.orders
for delete
using (auth.uid() = user_id);

