-- Table des abonnés Salairia. Fermée par RLS sans policy : seules les trois
-- fonctions SECURITY DEFINER ci-dessous y accèdent, via la clé publique.
create table if not exists public.abonnes (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  categorie text not null check (categorie in ('smic','pass','bareme','retraite','general')),
  page text,
  cree_le timestamptz not null default now(),
  confirme_le timestamptz,
  desinscrit_le timestamptz
);

alter table public.abonnes enable row level security;
revoke all on public.abonnes from anon, authenticated;

create or replace function public.newsletter_inscrire(p_email text, p_categorie text, p_page text)
returns text
language plpgsql security definer set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
  v_row public.abonnes%rowtype;
begin
  if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'email invalide';
  end if;
  select * into v_row from public.abonnes where email = v_email;
  if not found then
    insert into public.abonnes (email, categorie, page) values (v_email, p_categorie, p_page);
    return 'nouveau';
  end if;
  -- Réinscription après désinscription : on repart d'une adresse non confirmée.
  if v_row.desinscrit_le is not null then
    update public.abonnes
       set desinscrit_le = null, confirme_le = null, categorie = p_categorie, page = p_page, cree_le = now()
     where id = v_row.id;
    return 'nouveau';
  end if;
  if v_row.confirme_le is not null then
    return 'deja_confirme';
  end if;
  return 'en_attente';
end $$;

create or replace function public.newsletter_confirmer(p_email text)
returns boolean
language sql security definer set search_path = public
as $$
  update public.abonnes
     set confirme_le = coalesce(confirme_le, now())
   where email = lower(trim(p_email)) and desinscrit_le is null
  returning true;
$$;

create or replace function public.newsletter_desinscrire(p_email text)
returns boolean
language sql security definer set search_path = public
as $$
  update public.abonnes
     set desinscrit_le = coalesce(desinscrit_le, now())
   where email = lower(trim(p_email))
  returning true;
$$;

revoke all on function public.newsletter_inscrire(text, text, text) from public;
revoke all on function public.newsletter_confirmer(text) from public;
revoke all on function public.newsletter_desinscrire(text) from public;
grant execute on function public.newsletter_inscrire(text, text, text) to anon;
grant execute on function public.newsletter_confirmer(text) to anon;
grant execute on function public.newsletter_desinscrire(text) to anon;
