import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LANGUAGES, useLanguage, type LanguageCode } from "@/lib/language";
import { getCurrentUser, logOut } from "@/lib/local-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Choose your language" },
      {
        name: "description",
        content:
          "Pick the language you are most comfortable with: English, Chinese, Malay, or Tamil.",
      },
      { property: "og:title", content: "Choose your language" },
      {
        property: "og:description",
        content:
          "English, 中文, Melayu, or தமிழ் — tap the one you are most comfortable with.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LanguagePage,
});

const ADVANCE_DELAY = 700;
const GREETING_INTERVAL = 2200;

const WELCOME: Record<LanguageCode, string> = {
  en: "Welcome",
  zh: "欢迎",
  ms: "Selamat datang",
  ta: "வரவேற்கிறோம்",
};
const GREETING_ORDER: LanguageCode[] = ["en", "zh", "ms", "ta"];

function LanguagePage() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [chosen, setChosen] = useState<LanguageCode | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [greetIndex, setGreetIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setUserName(user.name);
  }, [navigate]);

  useEffect(() => {
    if (chosen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setGreetIndex((i) => (i + 1) % GREETING_ORDER.length),
      GREETING_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [chosen]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const active = chosen ?? language;
  const greetLang: LanguageCode = chosen ?? GREETING_ORDER[greetIndex]!;

  function choose(code: LanguageCode) {
    if (chosen) return;
    setChosen(code);
    setLanguage(code);
    timer.current = window.setTimeout(() => {
      navigate({ to: "/home" });
    }, ADVANCE_DELAY);
  }

  function handleLogOut() {
    logOut();
    navigate({ to: "/login" });
  }

  const announcement = chosen
    ? `${LANGUAGES.find((item) => item.code === chosen)?.hint} selected`
    : "";

  if (!userName) {
    return <main className="min-h-screen bg-background" />;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-8 sm:py-14">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <header className="mb-9 text-center">
          <p
            key={greetLang}
            lang={greetLang}
            className="animate-in fade-in duration-700 font-display text-hero text-primary"
            aria-label={`Welcome, ${userName}`}
          >
            {WELCOME[greetLang]}, {userName}
          </p>
          <h1 className="mt-6 font-display text-hero text-foreground">
            Choose your language
          </h1>
          <p className="mt-4 text-body text-muted-foreground">
            {"\n"}
          </p>
        </header>

        <div className="flex flex-col gap-4" role="group" aria-label="Languages">
          {LANGUAGES.map((item) => {
            const selected = active === item.code;

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => choose(item.code)}
                aria-pressed={selected}
                className={cn(
                  "tap-target press flex items-center justify-between gap-4 rounded-3xl border-2 px-6 text-left",
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-lift"
                    : "border-border bg-card text-foreground shadow-soft hover:border-primary/60 hover:bg-accent/50",
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate font-display text-card-title">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-caption",
                      selected
                        ? "text-primary-foreground/85"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.hint}
                  </span>
                </span>

                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full border-2",
                    selected
                      ? "border-primary-foreground bg-primary-foreground text-primary"
                      : "border-border",
                  )}
                  aria-hidden="true"
                >
                  {selected ? <Check className="h-6 w-6" strokeWidth={3} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </main>
  );
}
