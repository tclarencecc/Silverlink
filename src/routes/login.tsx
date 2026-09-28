import { createFileRoute } from "@tanstack/react-router";

import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Nearby" },
      { name: "description", content: "Log in to find community, connection, and support services near you." },
      { property: "og:title", content: "Log in — Nearby" },
      { property: "og:description", content: "Log in to find senior services near you in Singapore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
