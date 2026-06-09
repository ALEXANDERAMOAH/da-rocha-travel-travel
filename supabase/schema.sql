-- Run this in your Supabase project: SQL Editor → New query → paste → Run

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Allow public contact form submissions"
  on contact_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow public newsletter signups"
  on newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);
