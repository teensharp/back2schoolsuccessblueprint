CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION private.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','staff'))
$$;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_staff(uuid) TO authenticated, service_role;

-- Repoint policies to the private helpers
DROP POLICY "Staff read all summaries" ON public.ai_summaries;
CREATE POLICY "Staff read all summaries" ON public.ai_summaries FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Staff read all progress" ON public.day_progress;
CREATE POLICY "Staff read all progress" ON public.day_progress FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Staff read all offer events" ON public.offer_events;
CREATE POLICY "Staff read all offer events" ON public.offer_events FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Staff read all profiles" ON public.profiles;
CREATE POLICY "Staff read all profiles" ON public.profiles FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Staff read all responses" ON public.responses;
CREATE POLICY "Staff read all responses" ON public.responses FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Anyone signed in reads published recaps" ON public.session_summaries;
CREATE POLICY "Anyone signed in reads published recaps" ON public.session_summaries FOR SELECT TO authenticated USING (published OR private.is_staff(auth.uid()));

DROP POLICY "Staff delete recaps" ON public.session_summaries;
CREATE POLICY "Staff delete recaps" ON public.session_summaries FOR DELETE TO authenticated USING (private.is_staff(auth.uid()));

DROP POLICY "Staff insert recaps" ON public.session_summaries;
CREATE POLICY "Staff insert recaps" ON public.session_summaries FOR INSERT TO authenticated WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY "Staff update recaps" ON public.session_summaries;
CREATE POLICY "Staff update recaps" ON public.session_summaries FOR UPDATE TO authenticated USING (private.is_staff(auth.uid())) WITH CHECK (private.is_staff(auth.uid()));

DROP POLICY "Staff can read all roles" ON public.user_roles;
CREATE POLICY "Staff can read all roles" ON public.user_roles FOR SELECT TO authenticated USING (private.is_staff(auth.uid()));

DROP FUNCTION IF EXISTS public.is_staff(uuid);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);