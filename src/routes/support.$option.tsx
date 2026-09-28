import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeDollarSign,
  Clock3,
  ExternalLink,
  Phone,
  Route as RouteIcon,
  UserRoundCheck,
} from "lucide-react";

import {
  FINANCIAL_SUPPORT_SCHEMES,
  getFinancialSupportText,
} from "@/lib/financial-support";
import {
  HEALTH_HOTLINES,
  HEALTH_RESOURCES,
  getHealthResourceText,
  getHotlineText,
} from "@/lib/health-safety";
import { useLanguage } from "@/lib/language";
import { getStrings } from "@/lib/strings";
import { getSupportOption, getSupportOptionText } from "@/lib/support-options";

export const Route = createFileRoute("/support/$option")({
  head: ({ params }) => {
    const text = getSupportOption(params.option)?.text.en;
    return {
      meta: [
        { title: text ? `${text.nearbyTitle} — coming soon` : "Coming soon" },
        { name: "description", content: text ? `${text.title}: ${text.blurb}. This list is being built.` : "This list is being built." },
        { property: "og:title", content: text ? `${text.nearbyTitle} — coming soon` : "Coming soon" },
        { property: "og:description", content: text ? `${text.title}: ${text.blurb}` : "This list is being built." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: SupportOptionPage,
});

function SupportOptionPage() {
  const { option: optionId } = Route.useParams();
  const { language } = useLanguage();
  const option = getSupportOption(optionId);
  if (!option) throw notFound();

  const strings = getStrings(language);
  const text = getSupportOptionText(option, language);
  const Icon = option.icon;

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-caption text-muted-foreground">
            {strings.youChose} <span className="font-bold text-foreground">{text.title}</span>
          </p>
          <Link to="/support" className="press inline-flex min-h-[3.75rem] shrink-0 items-center justify-center gap-2 rounded-full border-2 border-border bg-card px-6 text-caption font-bold text-foreground hover:border-primary/60">
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
            {strings.back}
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10 text-center">
          <span className="mx-auto grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-secondary text-primary">
            <Icon className="h-12 w-12" strokeWidth={2} aria-hidden="true" />
          </span>
          <h1 className="mt-7 font-display text-heading text-foreground">{text.nearbyTitle}</h1>
          {option.id === "money" ? (
            <MoneyMattersList language={language} />
          ) : option.id === "health-safety" ? (
            <HealthSafetyList language={language} />
          ) : (
            <div className="mt-9 rounded-3xl border-2 border-border bg-card p-6 text-left shadow-soft">
              <p className="text-body text-foreground">{text.detail}</p>
              <p className="mt-4 text-caption text-muted-foreground">{strings.comingSoonNote}</p>
            </div>
          )}
        </div>

        <Link to="/home" className="press tap-target mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-primary px-6 text-body-lg font-bold text-primary-foreground shadow-soft hover:bg-primary/90">
          {strings.backToStart}
        </Link>
      </div>
    </main>
  );
}

function HealthSafetyList({
  language,
}: {
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const strings = getStrings(language);

  return (
    <section className="mt-9 text-left">
      <div className="rounded-2xl border-2 border-primary bg-secondary p-5">
        <p className="text-body font-bold text-foreground">{strings.emergencyWarning}</p>
      </div>

      <h2 className="mt-8 font-display text-subheading font-bold text-foreground">
        {strings.emergencyHotlinesHeading}
      </h2>
      <p className="mt-2 text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{HEALTH_HOTLINES.length}</span>{" "}
        {strings.emergencyHotlinesCount}
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {HEALTH_HOTLINES.map((hotline) => {
          const details = getHotlineText(hotline, language);
          return (
            <li key={hotline.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-body-lg font-bold text-foreground">{hotline.name}</h3>
              <p className="mt-1 text-caption text-muted-foreground">
                {strings.providedBy} {hotline.provider}
              </p>
              <a
                href={`tel:${hotline.phone}`}
                className="mt-4 block font-display text-heading font-bold text-primary underline decoration-2 underline-offset-4"
              >
                {hotline.phoneDisplay}
              </a>
              <p className="mt-4 text-body text-foreground">{details.description}</p>
              <div className="mt-4 flex items-start gap-3 border-t-2 border-border pt-4">
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-caption text-muted-foreground">
                  <span className="block font-bold text-foreground">{strings.hours}</span>
                  {details.hours}
                </p>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${hotline.phone}`}
                  className="press inline-flex min-h-[3.75rem] items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-caption font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {strings.callNow}
                </a>
                <a
                  href={hotline.url}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex min-h-[3.75rem] items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 text-caption font-bold text-foreground hover:border-primary/60"
                >
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  {strings.viewDetails}
                </a>
              </div>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-10 font-display text-subheading font-bold text-foreground">
        {strings.healthResourcesHeading}
      </h2>
      <p className="mt-2 text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{HEALTH_RESOURCES.length}</span>{" "}
        {strings.healthResourcesCount}
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {HEALTH_RESOURCES.map((resource) => {
          const details = getHealthResourceText(resource, language);
          return (
            <li key={resource.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-body-lg font-bold text-foreground">{resource.name}</h3>
              <p className="mt-1 text-caption text-muted-foreground">
                {strings.providedBy} {resource.provider}
              </p>
              <p className="mt-4 text-body text-foreground">{details.description}</p>
              <div className="mt-4 space-y-4 border-t-2 border-border pt-4">
                <div className="flex items-start gap-3">
                  <UserRoundCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-caption text-muted-foreground">
                    <span className="block font-bold text-foreground">{strings.eligibility}</span>
                    {details.eligibility}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <RouteIcon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-caption text-muted-foreground">
                    <span className="block font-bold text-foreground">{strings.access}</span>
                    {details.access}
                  </p>
                </div>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="press mt-5 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-caption font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                {strings.viewDetails}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-caption text-muted-foreground">{strings.healthSafetySource}</p>
    </section>
  );
}

function MoneyMattersList({
  language,
}: {
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const strings = getStrings(language);

  return (
    <section className="mt-9 text-left">
      <p className="text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{FINANCIAL_SUPPORT_SCHEMES.length}</span>{" "}
        {strings.financialSupportCount}
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {FINANCIAL_SUPPORT_SCHEMES.map((scheme) => {
          const details = getFinancialSupportText(scheme, language);

          return (
            <li key={scheme.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-body-lg font-bold text-foreground">{scheme.name}</h2>
              <p className="mt-1 text-caption text-muted-foreground">
                {strings.providedBy} {scheme.provider}
              </p>
              <p className="mt-4 text-body text-foreground">{details.description}</p>

              <div className="mt-4 space-y-4 border-t-2 border-border pt-4">
                <div className="flex items-start gap-3">
                  <UserRoundCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-caption text-muted-foreground">
                    <span className="block font-bold text-foreground">{strings.eligibility}</span>
                    {details.eligibility}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeDollarSign className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-caption text-muted-foreground">
                    <span className="block font-bold text-foreground">{strings.benefit}</span>
                    {details.benefit}
                  </p>
                </div>
              </div>

              <a
                href={scheme.url}
                target="_blank"
                rel="noreferrer"
                className="press mt-5 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-caption font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
                {strings.viewDetails}
              </a>
              <p className="mt-3 text-caption text-muted-foreground">{scheme.source}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-caption text-muted-foreground">{strings.financialSupportSource}</p>
    </section>
  );
}