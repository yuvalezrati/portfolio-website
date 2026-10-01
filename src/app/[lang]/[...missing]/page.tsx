import { notFound } from "next/navigation";

// Any URL that matches no page shows [lang]/not-found.tsx, inside the site's layout and
// language (rather than Next's bare default 404).
export default function Missing() {
  notFound();
}
