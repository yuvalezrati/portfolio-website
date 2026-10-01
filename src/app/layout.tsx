import type { Metadata } from "next";
import { EB_Garamond, Geist } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serif = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Yuval Ezrati", template: "%s — Yuval Ezrati" },
  description: "Photography by Yuval Ezrati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-left font-sans">
        <SiteHeader />
        <main className="flex-1 px-6 pb-24 pt-8 sm:px-10">{children}</main>
      </body>
    </html>
  );
}
