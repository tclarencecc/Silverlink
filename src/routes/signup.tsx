import { createFileRoute } from "@tanstack/react-router";

import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — Nearby" },
      { name: "description", content: "Sign up with your name and email to find senior services near you." },
      { property: "og:title", content: "Create an account — Nearby" },
      { property: "og:description", content: "Sign up to find community, connection, and support services in Singapore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
