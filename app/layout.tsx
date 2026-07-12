import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import ParticleWaves from "./components/ParticleWaves";
import Intro from "./components/Intro";

const cinzel = localFont({
  src: "../public/fonts/CinzelDecorative-Regular.ttf",
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haardik S Sagar",
  description: "Building things, one late night at a time.",
  openGraph: {
    title: "Haardik S Sagar",
    description: "Building things, one late night at a time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Haardik S Sagar",
    description: "Building things, one late night at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-body bg-ink text-paper antialiased ${cinzel.variable}`}>
        <Intro name="haardik." label="Loading" once={false} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ParticleWaves />
          {/* {children} is where Next.js automatically injects your page.tsx content */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
