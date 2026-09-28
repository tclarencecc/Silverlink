import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/connection")({
  component: () => <Outlet />,
});
