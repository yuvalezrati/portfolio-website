import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { concerts } from "@/lib/content";

export const metadata: Metadata = { title: "Concerts" };

export default function ConcertsPage() {
  return (
    <>
      <PageIntro title={concerts.title} meta={concerts.years} />
      <Gallery photos={concerts.photos} variant="dense" />
    </>
  );
}
