import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

// One characterful grotesque for everything, from body text to the big titles; its
// optical-size axis keeps small text calm and large titles tight.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  axes: ["opsz"],
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Yuval Ezrati", template: "%s — Yuval Ezrati" },
  description: "Photography by Yuval Ezrati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-left font-sans">
        <div aria-hidden className="scroll-progress" />
        <SiteHeader />
        <main className="flex-1 px-6 pb-24 pt-8 sm:px-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
