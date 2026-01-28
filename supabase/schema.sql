
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tenants Table (Businesses)
create table public.tenants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamptz default now()
);
alter table public.tenants enable row level security;

-- 2. Profiles Table (Users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  tenant_id uuid references public.tenants(id),
  role text default 'client' check (role in ('client', 'admin')),
  full_name text,
  email text,
  onboarding_complete boolean default false,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- 3. Onboarding Data
create table public.onboarding (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  contact_name text,
  phone text,
  goals text,
  metrics jsonb, -- Array of selected metrics
  systems jsonb, -- Object { crm, booking, website }
  created_at timestamptz default now()
);
alter table public.onboarding enable row level security;

-- 4. Feedback
create table public.feedback (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  message text not null,
  rating int,
  created_at timestamptz default now()
);
alter table public.feedback enable row level security;

-- 5. Upgrade Requests
create table public.requests (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  type text,
  description text,
  priority text,
  status text default 'pending',
  created_at timestamptz default now()
);
alter table public.requests enable row level security;

-- 6. Leads & Automations
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  source text,
  customer_name text,
  customer_email text,
  status text default 'new',
  data jsonb,
  created_at timestamptz default now()
);
alter table public.leads enable row level security;

-- 7. API Keys
create table public.api_keys (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  key_value text default encode(gen_random_bytes(32), 'hex'),
  name text,
  created_at timestamptz default now()
);
alter table public.api_keys enable row level security;

-- 8. Invoices
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) not null,
  amount numeric,
  status text default 'open',
  date date default CURRENT_DATE,
  pdf_url text,
  created_at timestamptz default now()
);
alter table public.invoices enable row level security;

-- 9. Trigger to create Profile on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'client');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ROW LEVEL SECURITY POLICIES --

-- PROFILES
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Admins can read all profiles" on public.profiles
  for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- TENANTS
create policy "Users can read own tenant" on public.tenants
  for select using (id in (select tenant_id from public.profiles where id = auth.uid()));
-- Critical: Allow authenticated users to create a tenant during signup
create policy "Users can create tenants" on public.tenants
  for insert with check (auth.role() = 'authenticated');
create policy "Admins can read all tenants" on public.tenants
  for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- DATA TABLES (Onboarding, Feedback, Requests, Leads, API Keys, Invoices)
-- Generic policy pattern: Users can access rows where tenant_id matches their profile

-- Helper macro logic repeated for clarity in SQL Editor
create policy "Client access own onboarding" on public.onboarding
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all onboarding" on public.onboarding
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Client access own feedback" on public.feedback
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all feedback" on public.feedback
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Client access own requests" on public.requests
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all requests" on public.requests
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Client access own leads" on public.leads
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all leads" on public.leads
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Client access own keys" on public.api_keys
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all keys" on public.api_keys
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Client access own invoices" on public.invoices
  for all using (tenant_id in (select tenant_id from public.profiles where id = auth.uid()));
create policy "Admin access all invoices" on public.invoices
  for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
