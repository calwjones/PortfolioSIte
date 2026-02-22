import type { Metadata } from "next";
import { VT323, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const px = VT323({
  subsets: ["latin"],
  variable: "--font-px",
  weight: "400",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CALLUM.SAV — Portfolio",
  description:
    "Callum Jones — final-year CS student at UWE Bristol. A portfolio presented as an RPG save file.",
  openGraph: {
    title: "CALLUM.SAV — Portfolio",
    description:
      "Callum Jones — final-year CS student at UWE Bristol. A portfolio presented as an RPG save file.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${px.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
