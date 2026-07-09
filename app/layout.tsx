import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

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
      <body className="font-body bg-ink text-paper antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* {children} is where Next.js automatically injects your page.tsx content */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
