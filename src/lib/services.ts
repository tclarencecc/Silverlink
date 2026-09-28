import { HandHeart, House, Users, type LucideIcon } from "lucide-react";

export type ServiceId = "community" | "connection" | "support";

export type Service = {
  id: ServiceId;
  title: string;
  blurb: string;
  detail: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    id: "community",
    title: "Community",
    blurb: "Meet people and join activities",
    detail:
      "Find groups, classes and get-togethers happening close to where you live.",
    icon: Users,
  },
  {
    id: "connection",
    title: "Connection",
    blurb: "Find someone to talk to",
    detail:
      "Reach a friendly voice — a volunteer, a neighbour, or someone who understands.",
    icon: HandHeart,
  },
  {
    id: "support",
    title: "Support",
    blurb: "Get help with daily needs",
    detail:
      "Practical help at home: meals, transport, errands, and someone to guide you.",
    icon: House,
  },
];

export function getService(id: string | undefined): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}
