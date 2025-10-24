import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SourceKom - Resource Management & Legal Consultancy in Saudi Arabia",
  description: "SourceKom is an innovative resource sharing and legal consultancy platform operating in Saudi Arabia. We connect businesses to maximize potential and foster sustainable growth through resource optimization.",
  keywords: ["SourceKom", "Saudi Arabia", "resource management", "legal consultancy", "business optimization", "logistics", "supply chain", "sustainability", "Abdullah Mirza"],
  authors: [{ name: "SourceKom Team" }],
  openGraph: {
    title: "SourceKom - Adding strength to businesses, businesses to strengths",
    description: "Innovative resource sharing and legal consultancy platform in Saudi Arabia, empowering businesses through resource optimization and legal expertise.",
    url: "https://sourcekom.com",
    siteName: "SourceKom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SourceKom - Resource Management & Legal Consultancy",
    description: "Transforming the Saudi market through resource optimization and legal expertise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
