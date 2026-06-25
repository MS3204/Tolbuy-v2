-- Harden profiles.role so it cannot be tampered by the client.
-- Strategy: allow insert/update for own row, but forbid changing role.

-- Ensure role is present/nullable
alter table public.profiles
  alter column role set default 'user';

-- IMPORTANT: RLS is already enabled and policies exist in 0001_create_profiles.sql.
-- We add a stricter policy for UPDATE: role can't change.

drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (
  auth.uid() = id
  and (role = old.role)
);

-- Keep insert policy as-is; insert sets role (default 'user' on server side if missing)
-- For additional hardening, we can also restrict insert to only allow role='user' when user_metadata.role is not set.

