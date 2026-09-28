import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

import {
  CONNECTION_OPTIONS,
  getConnectionOptionText,
} from "@/lib/connections";
import { useLanguage } from "@/lib/language";
import { getService, getServiceText } from "@/lib/services";
import { getStrings } from "@/lib/strings";

export const Route = createFileRoute("/connection/")({
  head: () => ({
    meta: [
      { title: "What kind of connection?" },
      {
        name: "description",
        content:
          "Find someone to talk to, or a group to join — we will show you what is nearby.",
      },
      { property: "og:title", content: "What kind of connection?" },
      {
        property: "og:description",
        content:
          "A friendly voice when you need one, or people who share your interests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConnectionPage,
});

function ConnectionPage() {
  const navigate = useNavigate();
  const { language, ready } = useLanguage();
  const strings = getStrings(language);

  useEffect(() => {
    if (ready && !language) navigate({ to: "/", replace: true });
  }, [ready, language, navigate]);

  return (
    <main className="min-h-screen bg-background px-5 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-md">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-caption text-muted-foreground">
            {strings.youChose}{" "}
            <span className="font-bold text-foreground">
              {getServiceText(getService("connection")!, language).title}
            </span>
          </p>
          <Link
            to="/home"
            className="press inline-flex min-h-[3.75rem] shrink-0 items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-6 text-caption font-bold text-foreground hover:border-primary/60"
          >
            {strings.back}
          </Link>
        </header>

        <div className="mt-9 sm:mt-12">
          <h1 className="font-display text-heading text-foreground">
            {strings.connectionHeading}
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {CONNECTION_OPTIONS.map((option) => {
            const Icon = option.icon;
            const text = getConnectionOptionText(option, language);

            return (
              <Link
                key={option.id}
                to="/connection/$option"
                params={{ option: option.id }}
                className="press group flex min-h-[7rem] items-center gap-5 rounded-3xl border-2 border-border bg-card p-6 shadow-soft hover:border-primary/60 hover:bg-accent/40 hover:shadow-lift"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-8 w-8" strokeWidth={2} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-card-title text-foreground">
                    {text.title}
                  </span>
                  <span className="mt-1 block text-body text-muted-foreground">
                    {text.blurb}
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
