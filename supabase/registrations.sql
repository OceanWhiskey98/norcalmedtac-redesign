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

alter table public.registrations
  drop constraint if exists registrations_registration_status_check;

alter table public.registrations
  add constraint registrations_registration_status_check
    check (
      "registrationStatus" in (
        'pending',
        'waitlist_requested',
        'confirmed',
        'canceled'
      )
    ) not valid;

do $$
begin

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

create index if not exists registrations_class_slug_idx
  on public.registrations ("classSlug");

create or replace function public.create_registration_request_atomic(
  p_class_slug text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_seats integer,
  p_notes text,
  p_amount_due integer,
  p_currency text,
  p_source text,
  p_class_capacity integer,
  p_is_waitlist_request boolean
)
returns table (
  "ok" boolean,
  "registrationId" uuid,
  "remainingSeats" integer,
  "errorCode" text,
  "message" text
)
language plpgsql
as $$
declare
  v_registered_seats integer := 0;
  v_remaining_seats integer := null;
  v_registration_id uuid := null;
begin
  if p_seats is null or p_seats <= 0 then
    return query select false, null::uuid, null::integer, 'invalid_input'::text, 'Seats must be greater than zero.'::text;
    return;
  end if;

  if p_is_waitlist_request is distinct from true and (p_class_capacity is null or p_class_capacity <= 0) then
    return query select false, null::uuid, null::integer, 'invalid_input'::text, 'Class capacity must be greater than zero.'::text;
    return;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(coalesce(p_class_slug, ''), 0));

  if p_is_waitlist_request is distinct from true then
    select coalesce(sum(r.seats), 0)
      into v_registered_seats
      from public.registrations r
     where r."classSlug" = p_class_slug
       and r."registrationStatus" in ('pending', 'confirmed')
       and r."canceledAt" is null;

    v_remaining_seats := greatest(p_class_capacity - v_registered_seats, 0);

    if p_seats > v_remaining_seats then
      return query select false, null::uuid, v_remaining_seats, 'insufficient_seats'::text, 'Not enough seats remaining for this class.'::text;
      return;
    end if;
  end if;

  insert into public.registrations (
    "classSlug",
    "firstName",
    "lastName",
    email,
    phone,
    seats,
    notes,
    "registrationStatus",
    "paymentStatus",
    "amountDue",
    currency,
    source
  )
  values (
    p_class_slug,
    p_first_name,
    p_last_name,
    p_email,
    p_phone,
    p_seats,
    p_notes,
    case when p_is_waitlist_request then 'waitlist_requested' else 'pending' end,
    'unpaid',
    coalesce(p_amount_due, 0),
    lower(coalesce(p_currency, 'usd')),
    coalesce(p_source, 'website')
  )
  returning id into v_registration_id;

  if p_is_waitlist_request is distinct from true then
    v_remaining_seats := greatest(v_remaining_seats - p_seats, 0);
  end if;

  return query select true, v_registration_id, v_remaining_seats, null::text, null::text;
end;
$$;

create index if not exists registrations_active_capacity_idx
  on public.registrations ("classSlug")
  where "canceledAt" is null
    and "registrationStatus" in ('pending', 'confirmed');

alter table public.registrations enable row level security;

revoke all on table public.registrations from anon, authenticated;
