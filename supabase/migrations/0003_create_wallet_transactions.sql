-- Wallet & financial transactions (scoped to the authenticated user)

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(14,2) not null, -- positive for credit, negative for debit
  currency text not null default 'USD',
  kind text not null default 'transaction', -- credit/debit or custom categories
  created_at timestamptz not null default now()
);

alter table public.wallet_transactions enable row level security;

create policy "wallet_transactions_select_own"
on public.wallet_transactions
for select
using (auth.uid() = user_id);

create policy "wallet_transactions_insert_own"
on public.wallet_transactions
for insert
with check (auth.uid() = user_id);

create policy "wallet_transactions_update_own"
on public.wallet_transactions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "wallet_transactions_delete_own"
on public.wallet_transactions
for delete
using (auth.uid() = user_id);

