import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ProjectShowcase from "@/components/ProjectShowcase";
import { artProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Art" };

export default function ArtPage() {
  return (
    <>
      <PageIntro title="Art" meta={`${artProjects.length} projects`} />
      <ProjectShowcase />
    </>
  );
}
