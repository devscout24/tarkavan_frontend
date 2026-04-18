import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Toasting from "@/components/custom/toasting";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "My App",
  description: "Best player card app",
  openGraph: {
    title: "My App",
    description: "Best player card app",
    url: "https://tarkavan.vercel.app/",
    siteName: "My App",
    images: [
      {
        url: "https://tarkavan.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <Toasting />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
