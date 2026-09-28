import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

import { useLanguage } from "@/lib/language";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "How can we help you today?" },
      {
        name: "description",
        content:
          "Choose community, connection, or support and we will take it from there.",
      },
      { property: "og:title", content: "How can we help you today?" },
      {
        property: "og:description",
        content:
          "Meet people, find someone to talk to, or get help with daily needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NeedsPage,
});

function NeedsPage() {
  const navigate = useNavigate();
  const { language, ready, languageLabel } = useLanguage();

  useEffect(() => {
    if (ready && !language) navigate({ to: "/", replace: true });
  }, [ready, language, navigate]);

  return (
    <main className="min-h-screen bg-background px-5 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-md">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-caption text-muted-foreground">
            Language:{" "}
            <span className="font-bold text-foreground">
              {languageLabel || "Not set"}
            </span>
          </p>
          <Link
            to="/"
            className="press inline-flex min-h-[3.75rem] shrink-0 items-center justify-center rounded-full border-2 border-border bg-card px-6 text-caption font-bold text-foreground hover:border-primary/60"
          >
            Change
          </Link>
        </header>

        <div className="mt-9 sm:mt-12">
          <h1 className="font-display text-heading text-foreground">
            How can we help you today?
          </h1>
          <p className="mt-4 text-body text-muted-foreground">
            Take your time. Choose one and we will take it from there.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.id}
                to="/need/$category"
                params={{ category: service.id }}
                className="press group flex min-h-[7rem] items-center gap-5 rounded-3xl border-2 border-border bg-card p-6 shadow-soft hover:border-primary/60 hover:bg-accent/40 hover:shadow-lift"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-8 w-8" strokeWidth={2} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-card-title text-foreground">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-body text-muted-foreground">
                    {service.blurb}
                  </span>
                </span>

                <ChevronRight
                  className="h-7 w-7 shrink-0 text-muted-foreground group-hover:text-primary"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
