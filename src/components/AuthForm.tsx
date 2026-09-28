import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { logIn, signUp } from "@/lib/local-auth";

type Mode = "login" | "signup";

const inputClass =
  "tap-target w-full rounded-2xl border-2 border-border bg-card px-5 text-body text-foreground shadow-soft focus:border-primary focus:outline-none";

export function AuthForm({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const result = isSignup ? await signUp(name, email, password) : await logIn(email, password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate({ to: "/" });
  }

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-8 sm:py-14">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <h1 className="mb-9 text-center font-display text-hero text-foreground">
          {isSignup ? "Create your account" : "Log in"}
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {isSignup ? (
            <label className="flex flex-col gap-2 text-body text-foreground">
              Name
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
          ) : null}
          <label className="flex flex-col gap-2 text-body text-foreground">
            Email
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-body text-foreground">
            Password
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={isSignup ? 6 : undefined}
              required
            />
          </label>

          {error ? (
            <p role="alert" className="rounded-2xl border-2 border-destructive bg-card px-5 py-4 text-body text-destructive">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="tap-target press mt-2 rounded-3xl bg-primary px-6 font-display text-card-title text-primary-foreground shadow-lift disabled:opacity-60"
          >
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="mt-8 text-center text-body text-muted-foreground">
          {isSignup ? "Already have an account? " : "New here? "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="inline-flex min-h-[60px] items-center font-semibold text-primary underline underline-offset-4"
          >
            {isSignup ? "Log in" : "Create an account"}
          </Link>
        </p>
      </div>
    </main>
  );
}
