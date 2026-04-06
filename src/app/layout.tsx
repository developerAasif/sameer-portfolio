import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GradientOrbs } from "@/components/gradient-orbs";
import portfolioData from "@/data/portfolio.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const personal = portfolioData.personal;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sameer.codingyari.com/";

export const metadata: Metadata = {
  title: `Hi, I'm ${personal.name} - ${personal.title}`,
  description: personal.description,
  keywords: [
    "Sameer Khan",
    "Full Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    personal.title,
  ],
  authors: [{ name: personal.name, url: personal.social.linkedin }],
  creator: personal.name,
  publisher: personal.name,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `Hi, I'm ${personal.name} - ${personal.title}`,
    description: personal.description,
    siteName: `${personal.name}'s Portfolio`,
    images: personal.image
      ? [
          {
            url: personal.image,
            width: 1200,
            height: 1200,
            alt: `${personal.name} - ${personal.title}`,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `Hi, I'm ${personal.name} - ${personal.title}`,
    description: personal.description,
    images: personal.image ? [personal.image] : undefined,
    creator: personal.social.twitter
      ? `@${personal.social.twitter.split("/").pop()}`
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: personal.image
    ? {
        icon: personal.image,
        shortcut: personal.image,
        apple: personal.image,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GradientOrbs />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
