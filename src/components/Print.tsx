import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/content";

type Props = {
  href: string;
  title: string;
  caption?: string;
  cover?: Photo;
  /** Degrees; prints sit slightly askew, like they were dropped on a table. */
  tilt: number;
  eager?: boolean;
  sizes: string;
  className?: string;
};

export default function Print({ href, title, caption, cover, tilt, eager, sizes, className = "" }: Props) {
  return (
    <Link
      href={href}
      style={{ rotate: `${tilt}deg` }}
      className={`group relative block bg-white p-2 pb-3 shadow-[0_1px_2px_rgb(0_0_0/0.08),0_8px_24px_-8px_rgb(0_0_0/0.18)] transition-[rotate,translate] duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:!rotate-0 sm:p-3 sm:pb-4 ${className}`}
    >
      <span className="relative block aspect-[5/4] bg-neutral-200">
        {cover?.src && (
          <Image
            src={cover.src}
            alt=""
            fill
            sizes={sizes}
            {...(eager && { loading: "eager", fetchPriority: "high" })}
            className="object-cover"
          />
        )}
      </span>
      <span className="mt-3 flex items-baseline gap-3">
        <span className="font-serif text-xl italic leading-none">{title}</span>
        {caption && <span className="font-mono text-[11px] text-ink/50">{caption}</span>}
      </span>
    </Link>
  );
}
