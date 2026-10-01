import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { misc } from "@/lib/content";

export const metadata: Metadata = { title: "Misc" };

export default function MiscPage() {
  return (
    <>
      <PageIntro title={misc.title}>
        <p>{misc.description}</p>
      </PageIntro>
      <Gallery photos={misc.photos} />
    </>
  );
}
