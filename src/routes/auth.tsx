import logo from "@/assets/teensharp-logo.png.asset.json";
import { ADVISING_EMAIL, WOODSON_URL } from "@/lib/brand";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { BOOK_TITLE, PROGRAM_DATES, PROGRAM_NAME } from "@/lib/content/book";
import { useAuth } from "@/lib/useAuth";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in \u2014 Back-to-School Blueprint | TeenSHARP" },
      {
        name: "description",
        content:
          "Sign in to your Back-to-School Success Week blueprint to save your pre-work, session notes, and daily plans.",
      },
      { property: "og:title", content: "Sign in \u2014 Back-to-School Blueprint" },
      {
        property: "og:description",
        content: "Save your Back-to-School Success Week 2026 workbook answers and build your blueprint.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/" });
  }, [loading, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
          throw new Error(
            "Your password needs at least 8 characters, including one letter and one number.",
          );
        }
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setConfirmationEmail(email);
          return;
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      void navigate({ to: "/" });
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      let message = raw || "Something went wrong. Try again.";
      if (/weak|pwned|known to be/i.test(raw)) {
        message =
          "That password has appeared in known data breaches. Choose a longer, unique password (try 4 random words plus a number).";
      } else if (/after \d+ seconds/i.test(raw)) {
        message = "Too many attempts in a row. Wait about 30 seconds, then try again.";
      } else if (/already registered|already exists/i.test(raw)) {
        message = "That email already has an account. Switch to \u201CI already have an account\u201D to sign in.";
      } else if (/invalid login credentials/i.test(raw)) {
        message = "That email and password don\u2019t match. Check them and try again.";
      } else if (/email not confirmed/i.test(raw)) {
        message =
          "Confirm your email before signing in. Open the message from TeenSHARP and click the confirmation link.";
      }
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in did not complete. Try again or use your email.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-forest p-12 text-forest-foreground lg:flex">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-brand-surface px-3 py-1.5">
            <img src={logo.url} alt="TeenSHARP" className="h-8 w-auto" />
          </span>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-vault">The Vault</p>
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-vault">
            {PROGRAM_NAME}
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[1.05] tracking-wide">
            {BOOK_TITLE}
          </h1>
          <p className="mt-4 max-w-md text-forest-foreground/80">
            Four days. Four core questions. One blueprint you actually use all year.
          </p>
        </div>
        <p className="text-sm text-forest-foreground/70">{PROGRAM_DATES}</p>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-16">
        <div className="w-full max-w-sm">
          {confirmationEmail ? (
            <div role="status" className="border-l-4 border-vault bg-card p-5">
              <h2 className="font-display text-3xl uppercase tracking-wide text-forest">
                Check your email
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your account was created. We sent a confirmation link to{" "}
                <strong className="text-foreground">{confirmationEmail}</strong>. Open that message
                and confirm your email before signing in.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Check spam or promotions if you do not see it. The message may take a few minutes.
              </p>
              <Button
                type="button"
                className="mt-5 w-full bg-forest text-forest-foreground hover:bg-forest/90"
                onClick={() => {
                  setConfirmationEmail(null);
                  setMode("signin");
                  setPassword("");
                }}
              >
                I confirmed my email — sign in
              </Button>
            </div>
          ) : (
            <>
          <h2 className="font-display text-3xl uppercase tracking-wide text-forest">
            {mode === "signup" ? "Start your blueprint" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your answers save automatically as you write.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full border-forest/30"
            onClick={google}
          >
            Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
            <span className="h-px flex-1 bg-rule" /> or <span className="h-px flex-1 bg-rule" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" ? (
              <div>
                <Label htmlFor="name">Your full name</Label>
                <Input
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1.5 bg-paper"
                />
              </div>
            ) : null}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5 bg-paper"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                aria-describedby="password-rules"
                className="mt-1.5 bg-paper"
              />
              {mode === "signup" ? (
                <ul
                  id="password-rules"
                  className="mt-2 space-y-1 text-xs text-muted-foreground"
                >
                  {[
                    { ok: password.length >= 8, label: "At least 8 characters" },
                    { ok: /[A-Za-z]/.test(password), label: "At least one letter" },
                    { ok: /[0-9]/.test(password), label: "At least one number" },
                  ].map((rule) => (
                    <li key={rule.label} className={rule.ok ? "text-forest" : undefined}>
                      <span aria-hidden="true">{rule.ok ? "\u2713" : "\u2022"}</span> {rule.label}
                    </li>
                  ))}
                </ul>
              ) : null}
              {mode === "signup" ? (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Common or breached passwords are rejected even when they meet the rules above.
                  Use a unique password; 12+ characters is recommended.
                </p>
              ) : null}
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" disabled={busy} className="w-full bg-forest text-forest-foreground hover:bg-forest/90">
              {busy ? "Please wait\u2026" : mode === "signup" ? "Create my blueprint" : "Sign in"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="mt-5 w-full text-sm text-forest underline underline-offset-4"
          >
            {mode === "signup"
              ? "I already have an account"
              : "I need to create an account"}
          </button>

          <p className="mt-6 border-t border-rule pt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Questions? Ask{" "}
            <a
              href={WOODSON_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-forest underline underline-offset-4"
            >
              Woodson
            </a>
            , TeenSHARP&rsquo;s virtual advisor, or email{" "}
            <a
              href={`mailto:${ADVISING_EMAIL}`}
              className="font-semibold text-forest underline underline-offset-4"
            >
              {ADVISING_EMAIL}
            </a>
            .
          </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
