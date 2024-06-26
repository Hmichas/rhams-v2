import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans
({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = 
{
  title: "The Artwork of Reuban Hale",
  description: "Artwork Management System for The Artwork of Reuban Hale, Inc.",
};

export default function RootLayout
({children,}: {children: React.ReactNode;}) 
{
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>The Artwork of Reuban Hale</title>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}