import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://calwjones.com";
const TITLE = "Callum Jones — Portfolio";
const DESC =
  "Callum Jones — final-year CS student at UWE Bristol. Portfolio as an RPG save file.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Callum Jones" },
  description: DESC,
  applicationName: "callum.sav",
  authors: [{ name: "Callum Jones" }],
  keywords: [
    "Callum Jones",
    "portfolio",
    "Computer Science",
    "UWE Bristol",
    "graduate developer",
    "TypeScript",
    "Next.js",
    "C++",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "Callum Jones",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Callum Jones",
  givenName: "Callum",
  familyName: "Jones",
  jobTitle: "Final-year Computer Science student",
  alumniOf: { "@type": "CollegeOrUniversity", name: "UWE Bristol" },
  url: SITE_URL,
  sameAs: [
    "https://github.com/calwjones",
    "https://www.linkedin.com/in/callum-jones-a252b3389/",
    "https://matchsticked.com",
  ],
  email: "calwjones12@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressCountry: "UK",
  },
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "C++",
    "Python",
    "PostgreSQL",
  ],
  seeks: {
    "@type": "Demand",
    description: "Graduate software engineering roles, UK remote or on-site",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        {children}
      </body>
    </html>
  );
}
