import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import {
  getConnectionOption,
  getConnectionOptionText,
} from "@/lib/connections";
import { useLanguage } from "@/lib/language";
import { getStrings } from "@/lib/strings";

export const Route = createFileRoute("/connection/$option")({
  head: ({ params }) => {
    const option = getConnectionOption(params.option);
    const text = option?.text.en;

    return {
      meta: [
        { title: text ? `${text.nearbyTitle} — coming soon` : "Coming soon" },
        {
          name: "description",
          content: text
            ? `${text.title}: ${text.blurb}. This list is being built.`
            : "This list is being built.",
        },
        {
          property: "og:title",
          content: text ? `${text.nearbyTitle} — coming soon` : "Coming soon",
        },
        {
          property: "og:description",
          content: text ? `${text.title}: ${text.blurb}` : "This list is being built.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: ConnectionOptionPage,
});

function ConnectionOptionPage() {
  const { option: optionId } = Route.useParams();
  const { language } = useLanguage();
  const option = getConnectionOption(optionId);
  if (!option) throw notFound();

  const strings = getStrings(language);
  const text = getConnectionOptionText(option, language);
  const Icon = option.icon;

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-caption text-muted-foreground">
            {strings.youChose}{" "}
            <span className="font-bold text-foreground">{text.title}</span>
          </p>
          <Link
            to="/connection"
            className="press inline-flex min-h-[3.75rem] shrink-0 items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-6 text-caption font-bold text-foreground hover:border-primary/60"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
            {strings.back}
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10 text-center">
          <span className="mx-auto grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-secondary text-primary">
            <Icon className="h-12 w-12" strokeWidth={2} aria-hidden="true" />
          </span>

          <h1 className="mt-7 font-display text-heading text-foreground">
            {text.nearbyTitle}
          </h1>

          <div className="mt-9 rounded-3xl border-2 border-border bg-card p-6 text-left shadow-soft">
            <p className="text-body text-foreground">{text.detail}</p>
            <p className="mt-4 text-caption text-muted-foreground">
              {strings.comingSoonNote}
            </p>
          </div>
        </div>

        <Link
          to="/home"
          className="press tap-target mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-primary px-6 text-body-lg font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          {strings.backToStart}
        </Link>
      </div>
    </main>
  );
}
