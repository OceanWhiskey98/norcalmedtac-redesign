create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  "classSlug" text not null,
  "firstName" text not null,
  "lastName" text not null,
  email text not null,
  phone text not null,
  seats integer not null check (seats > 0),
  notes text,
  "registrationStatus" text not null default 'pending',
  "paymentStatus" text not null default 'unpaid',
  "amountDue" integer not null default 0,
  currency text not null default 'usd',
  source text not null default 'website',
  "canceledAt" timestamptz,
  "updatedAt" timestamptz,
  "createdAt" timestamptz not null default now()
);

alter table public.registrations
  add column if not exists "registrationStatus" text not null default 'pending',
  add column if not exists "paymentStatus" text not null default 'unpaid',
  add column if not exists "amountDue" integer not null default 0,
  add column if not exists currency text not null default 'usd',
  add column if not exists source text not null default 'website',
  add column if not exists "canceledAt" timestamptz,
  add column if not exists "updatedAt" timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_registration_status_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_registration_status_check
        check ("registrationStatus" in ('pending', 'confirmed', 'canceled')) not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_payment_status_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_payment_status_check
        check ("paymentStatus" in ('unpaid', 'paid', 'refunded', 'payment_not_required')) not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_amount_due_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_amount_due_check
        check ("amountDue" >= 0) not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_currency_lowercase_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_currency_lowercase_check
        check (currency = lower(currency)) not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'registrations_source_check'
      and conrelid = 'public.registrations'::regclass
  ) then
    alter table public.registrations
      add constraint registrations_source_check
        check (source in ('website')) not valid;
  end if;
end;
$$;

alter table public.registrations validate constraint registrations_registration_status_check;
alter table public.registrations validate constraint registrations_payment_status_check;
alter table public.registrations validate constraint registrations_amount_due_check;
alter table public.registrations validate constraint registrations_currency_lowercase_check;
alter table public.registrations validate constraint registrations_source_check;

alter table public.registrations enable row level security;

revoke all on table public.registrations from anon, authenticated;
