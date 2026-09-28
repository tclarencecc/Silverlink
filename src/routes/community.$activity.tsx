import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, MessageCircleQuestion } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { getSportFacilities } from "@/lib/sportsg.functions";
import { askSportsQuestion, type QuestionItem, type QuestionTopic } from "@/lib/sports-question.functions";

import { getActivity, getActivityText } from "@/lib/activities";
import { HOBBIES, getHobbyName } from "@/lib/hobbies";
import { useLanguage } from "@/lib/language";
import { MUSIC_EVENTS } from "@/lib/music";
import { getStrings } from "@/lib/strings";

export const Route = createFileRoute("/community/$activity")({
  head: ({ params }) => {
    const activity = getActivity(params.activity);
    const text = activity?.text.en;

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
  component: ActivityPlaceholder,
});

function ActivityPlaceholder() {
  const { activity: activityId } = Route.useParams();
  const { language } = useLanguage();
  const activity = getActivity(activityId);
  if (!activity) throw notFound();

  const strings = getStrings(language);
  const text = getActivityText(activity, language);
  const Icon = activity.icon;

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <p className="min-w-0 truncate text-caption text-muted-foreground">
            {strings.youChose}{" "}
            <span className="font-bold text-foreground">{text.title}</span>
          </p>
          <Link
            to="/community"
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

          {activity.id === "sports" ? (
            <SportsList language={language} />
          ) : activity.id === "hobbies" ? (
            <HobbiesList language={language} />
          ) : activity.id === "music" ? (
            <MusicList language={language} />
          ) : (
            <div className="mt-9 rounded-3xl border-2 border-border bg-card p-6 text-left shadow-soft">
              <p className="text-body text-foreground">{text.detail}</p>
              <p className="mt-4 text-caption text-muted-foreground">
                {strings.comingSoonNote}
              </p>
            </div>
          )}
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

function SportsList({ language }: { language: ReturnType<typeof useLanguage>["language"] }) {
  const strings = getStrings(language);
  const fetchFacilities = useServerFn(getSportFacilities);
  const { data, isPending, isError } = useQuery({
    queryKey: ["sportsg-facilities"],
    queryFn: () => fetchFacilities(),
    staleTime: 1000 * 60 * 60,
  });

  if (isPending) {
    return (
      <p className="mt-9 rounded-3xl border-2 border-border bg-card p-6 text-body text-foreground" role="status">
        {strings.sportsLoading}
      </p>
    );
  }
  if (isError || !data) {
    return (
      <section className="mt-9 text-left">
        <SportsQuestionForm language={language} topic="sports" items={[]} />
        <p className="mt-8 rounded-3xl border-2 border-border bg-card p-6 text-body text-foreground" role="alert">
          {strings.sportsError}
        </p>
      </section>
    );
  }

  return (
    <section className="mt-9 text-left">
      <p className="text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{data.length}</span> {strings.sportsCount}
      </p>
      <SportsQuestionForm
        language={language}
        topic="sports"
        items={data.map(({ venue, address, postalCode, detailsUrl }) => ({ venue, address, postalCode, detailsUrl }))}
      />
      <ul className="mt-8 flex flex-col gap-4">
        {data.map((f) => (
          <li key={f.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-body-lg font-bold text-foreground">{f.venue}</h2>
            <p className="mt-2 text-body text-muted-foreground">
              {f.address}
              {f.postalCode ? `, ${strings.singapore} ${f.postalCode}` : ""}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {f.lat !== null && f.lng !== null ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${f.lat},${f.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex min-h-[3.75rem] items-center justify-center gap-2 rounded-2xl border-2 border-border bg-background px-4 text-caption font-bold text-foreground hover:border-primary/60"
                >
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  {strings.openMap}
                </a>
              ) : null}
              {f.detailsUrl ? (
                <a
                  href={f.detailsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex min-h-[3.75rem] items-center justify-center gap-2 rounded-2xl border-2 border-border bg-background px-4 text-caption font-bold text-foreground hover:border-primary/60"
                >
                  <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  {strings.moreInfo}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-caption text-muted-foreground">{strings.sportsSource}</p>
    </section>
  );
}

function SportsQuestionForm({
  language,
  topic,
  items,
}: {
  language: ReturnType<typeof useLanguage>["language"];
  topic: QuestionTopic;
  items: QuestionItem[];
}) {
  const strings = getStrings(language);
  const askQuestion = useServerFn(askSportsQuestion);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || !language || isSubmitting) return;

    setIsSubmitting(true);
    setHasError(false);
    setAnswer("");

    try {
      const result = await askQuestion({
        data: { question: trimmedQuestion, language, topic, facilities: items },
      });
      setAnswer(result.answer);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-7 border-b-2 border-border pb-9" aria-labelledby="sports-question-heading">
      <div className="flex items-start gap-3">
        <MessageCircleQuestion className="mt-1 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
        <h2 id="sports-question-heading" className="font-display text-card-title font-bold text-foreground">
          {strings.sportsQuestionHeading}
        </h2>
      </div>

      <form className="mt-5" onSubmit={handleSubmit}>
        <label htmlFor="sports-question" className="block text-body font-bold text-foreground">
          {strings.sportsQuestionLabel}
        </label>
        <textarea
          id="sports-question"
          name="question"
          rows={3}
          maxLength={500}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            topic === "music"
              ? strings.musicQuestionPlaceholder
              : topic === "hobbies"
                ? strings.hobbiesQuestionPlaceholder
                : strings.sportsQuestionPlaceholder
          }
          className="mt-3 min-h-32 w-full resize-y rounded-2xl border-2 border-input bg-card px-5 py-4 text-body text-foreground shadow-soft placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          disabled={!question.trim() || !language || isSubmitting}
          className="press tap-target mt-4 w-full rounded-3xl px-6 text-body-lg font-bold shadow-soft"
        >
          {isSubmitting ? strings.sportsQuestionLoading : strings.sportsQuestionSubmit}
        </Button>
      </form>

      <div aria-live="polite" aria-busy={isSubmitting}>
        {answer ? (
          <div className="mt-5 rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
            <h3 className="font-display text-card-title font-bold text-foreground">
              {strings.sportsAnswerHeading}
            </h3>
            <p className="mt-3 text-body text-foreground">{answer}</p>
          </div>
        ) : null}
        {hasError ? (
          <p className="mt-5 rounded-3xl border-2 border-destructive bg-card p-5 text-body text-foreground" role="alert">
            {strings.sportsQuestionError}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function HobbiesList({ language }: { language: ReturnType<typeof useLanguage>["language"] }) {
  const strings = getStrings(language);

  return (
    <section className="mt-9 text-left">
      <p className="text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{HOBBIES.length}</span> {strings.hobbiesCount}
      </p>
      <SportsQuestionForm
        language={language}
        topic="hobbies"
        items={HOBBIES.map((hobby) => ({ name: getHobbyName(hobby, language), englishName: getHobbyName(hobby, "en"), url: hobby.url }))}
      />
      <ul className="mt-8 flex flex-col gap-4">
        {HOBBIES.map((hobby) => (
          <li key={hobby.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-body-lg font-bold text-foreground">
              {getHobbyName(hobby, language)}
            </h2>
            <a
              href={hobby.url}
              target="_blank"
              rel="noreferrer"
              className="press mt-4 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl border-2 border-border bg-background px-4 text-caption font-bold text-foreground hover:border-primary/60"
            >
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
              {strings.viewCourses}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-caption text-muted-foreground">{strings.hobbiesSource}</p>
    </section>
  );
}

function MusicList({ language }: { language: ReturnType<typeof useLanguage>["language"] }) {
  const strings = getStrings(language);

  return (
    <section className="mt-9 text-left">
      <p className="text-caption text-muted-foreground">
        <span className="font-bold text-foreground">{MUSIC_EVENTS.length}</span> {strings.musicCount}
      </p>
      <SportsQuestionForm
        language={language}
        topic="music"
        items={MUSIC_EVENTS.map(({ title, date, venue, blurb, url }) => ({ title, date, venue, blurb, url }))}
      />
      <ul className="mt-8 flex flex-col gap-4">
        {MUSIC_EVENTS.map((event) => (
          <li key={event.id} className="rounded-3xl border-2 border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-body-lg font-bold text-foreground">{event.title}</h2>
            <p className="mt-2 flex items-center gap-2 text-body font-bold text-foreground">
              <CalendarDays className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              {event.date}
            </p>
            <p className="mt-1 text-body text-muted-foreground">{event.venue}</p>
            <p className="mt-2 text-body text-muted-foreground">{event.blurb}</p>
            <a
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="press mt-4 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl border-2 border-border bg-background px-4 text-caption font-bold text-foreground hover:border-primary/60"
            >
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
              {strings.viewEvent}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-caption text-muted-foreground">{strings.musicSource}</p>
    </section>
  );
}
