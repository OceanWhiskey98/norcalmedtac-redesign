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
  "createdAt" timestamptz not null default now()
);

alter table public.registrations enable row level security;
