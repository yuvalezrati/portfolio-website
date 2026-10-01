import Rewind from "@/components/Rewind";

export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-baseline gap-x-6 gap-y-2 px-6 py-10 font-mono text-xs uppercase tracking-wider text-ink/45 sm:px-10">
      <p>
        Frame <span className="text-mark">36/36</span> — end of roll
      </p>
      <Rewind />
      <p>© {new Date().getFullYear()} Yuval Ezrati</p>
    </footer>
  );
}
