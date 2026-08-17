CREATE TABLE public.session_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day integer NOT NULL,
  section text NOT NULL DEFAULT 'session',
  title text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (day, section)
);

GRANT SELECT ON public.session_summaries TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.session_summaries TO authenticated;
GRANT ALL ON public.session_summaries TO service_role;

ALTER TABLE public.session_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone signed in reads published recaps"
  ON public.session_summaries FOR SELECT TO authenticated
  USING (published OR public.is_staff(auth.uid()));

CREATE POLICY "Staff insert recaps"
  ON public.session_summaries FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff update recaps"
  ON public.session_summaries FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff delete recaps"
  ON public.session_summaries FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER session_summaries_updated_at
  BEFORE UPDATE ON public.session_summaries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.offer_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  offer_id text NOT NULL,
  placement text NOT NULL DEFAULT '',
  event_type text NOT NULL DEFAULT 'view',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.offer_events TO authenticated;
GRANT ALL ON public.offer_events TO service_role;

ALTER TABLE public.offer_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own offer events"
  ON public.offer_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own offer events"
  ON public.offer_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff read all offer events"
  ON public.offer_events FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE INDEX offer_events_offer_idx ON public.offer_events (offer_id, event_type);