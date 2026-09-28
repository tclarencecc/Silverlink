import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../lib/language";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-hero text-foreground">404</h1>
        <h2 className="mt-4 font-display text-card-title text-foreground">
          Page not found
        </h2>
        <p className="mt-3 text-body text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="press tap-target inline-flex w-full items-center justify-center rounded-3xl bg-primary px-6 text-body-lg font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-card-title text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-3 text-body text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="press tap-target w-full rounded-3xl bg-primary px-6 text-body-lg font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="press tap-target inline-flex w-full items-center justify-center rounded-3xl border-2 border-border bg-card px-6 text-body-lg font-bold text-foreground hover:border-primary/60"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Community, Connection & Support Near You" },
      {
        name: "description",
        content:
          "A calm, simple app for seniors in Singapore to find community, someone to talk to, and help with daily needs nearby.",
      },
      { name: "author", content: "Lovable" },
      { name: "theme-color", content: "#faf6f0" },
      {
        property: "og:title",
        content: "Community, Connection & Support Near You",
      },
      {
        property: "og:description",
        content:
          "Find community, conversation, and everyday help nearby — in the language you prefer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Lora:wght@500;600;700&family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
