-- Cinemateca: ejecutar UNA VEZ en Supabase → SQL Editor → New query → Run
create table if not exists public.cinemateca (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.cinemateca enable row level security;

create policy "cada usuario solo su fila"
  on public.cinemateca for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
