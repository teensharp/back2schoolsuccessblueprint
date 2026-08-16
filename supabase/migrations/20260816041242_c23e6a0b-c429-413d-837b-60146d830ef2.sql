-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'student');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'staff')
  )
$$;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can read all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

-- Timestamp helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  school text NOT NULL DEFAULT '',
  grade text NOT NULL DEFAULT '',
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Staff read all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Responses: one row per student per question key
CREATE TABLE public.responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  value jsonb NOT NULL DEFAULT 'null'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, question_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.responses TO authenticated;
GRANT ALL ON public.responses TO service_role;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE INDEX responses_user_idx ON public.responses (user_id);

CREATE POLICY "Users read own responses"
  ON public.responses FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own responses"
  ON public.responses FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own responses"
  ON public.responses FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own responses"
  ON public.responses FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Staff read all responses"
  ON public.responses FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER responses_updated_at BEFORE UPDATE ON public.responses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Day progress
CREATE TABLE public.day_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day integer NOT NULL,
  section text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day, section)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.day_progress TO authenticated;
GRANT ALL ON public.day_progress TO service_role;
ALTER TABLE public.day_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX day_progress_user_idx ON public.day_progress (user_id);

CREATE POLICY "Users read own progress"
  ON public.day_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress"
  ON public.day_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress"
  ON public.day_progress FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff read all progress"
  ON public.day_progress FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER day_progress_updated_at BEFORE UPDATE ON public.day_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- AI summaries
CREATE TABLE public.ai_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day integer NOT NULL,
  summary text NOT NULL,
  generation_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day)
);
GRANT SELECT, INSERT, UPDATE ON public.ai_summaries TO authenticated;
GRANT ALL ON public.ai_summaries TO service_role;
ALTER TABLE public.ai_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own summaries"
  ON public.ai_summaries FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own summaries"
  ON public.ai_summaries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own summaries"
  ON public.ai_summaries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Staff read all summaries"
  ON public.ai_summaries FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()));

CREATE TRIGGER ai_summaries_updated_at BEFORE UPDATE ON public.ai_summaries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();