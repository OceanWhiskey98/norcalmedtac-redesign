create extension if not exists "pgcrypto";

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  "fullName" text not null,
  email text not null,
  phone text,
  "trainingInterest" text,
  message text not null,
  status text not null default 'new',
  source text not null default 'website',
  "userAgent" text,
  "ipHash" text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz
);

alter table public.contact_inquiries
  add column if not exists "fullName" text not null default '',
  add column if not exists email text not null default '',
  add column if not exists phone text,
  add column if not exists "trainingInterest" text,
  add column if not exists message text not null default '',
  add column if not exists status text not null default 'new',
  add column if not exists source text not null default 'website',
  add column if not exists "userAgent" text,
  add column if not exists "ipHash" text,
  add column if not exists "createdAt" timestamptz not null default now(),
  add column if not exists "updatedAt" timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_inquiries_status_check'
      and conrelid = 'public.contact_inquiries'::regclass
  ) then
    alter table public.contact_inquiries
      add constraint contact_inquiries_status_check
        check (status in ('new', 'reviewed', 'responded', 'closed')) not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_inquiries_source_check'
      and conrelid = 'public.contact_inquiries'::regclass
  ) then
    alter table public.contact_inquiries
      add constraint contact_inquiries_source_check
        check (source in ('website')) not valid;
  end if;
end;
$$;

alter table public.contact_inquiries validate constraint contact_inquiries_status_check;
alter table public.contact_inquiries validate constraint contact_inquiries_source_check;

create index if not exists contact_inquiries_ip_hash_created_at_idx
  on public.contact_inquiries ("ipHash", "createdAt" desc);

alter table public.contact_inquiries enable row level security;

revoke all on table public.contact_inquiries from anon, authenticated;
