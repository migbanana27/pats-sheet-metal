import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pat's Sheet Metal | Custom Fabrication, HVAC & Architectural Metal in Austin, TX",
  description:
    "Premium custom sheet metal fabrication, precision HVAC ductwork, and architectural metalwork in Austin, TX. Forged for contractors and homeowners who won't settle for off-the-shelf.",
  keywords: [
    "sheet metal fabrication Austin",
    "custom HVAC ductwork Austin",
    "architectural metalwork Austin",
    "copper range hood fabricator Austin",
    "custom sheet metal Texas",
  ],
  authors: [{ name: "Pat's Sheet Metal" }],
  openGraph: {
    title: "Pat's Sheet Metal | Forged in Austin. Built to Outlast.",
    description:
      "Premium custom sheet metal fabrication, HVAC ductwork, and architectural metalwork in Austin, TX.",
    siteName: "Pat's Sheet Metal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pat's Sheet Metal | Forged in Austin. Built to Outlast.",
    description:
      "Premium custom sheet metal fabrication, HVAC ductwork, and architectural metalwork in Austin, TX.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
