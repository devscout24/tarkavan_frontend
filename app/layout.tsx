import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Toasting from "@/components/custom/toasting"

export const metadata: Metadata = {
  metadataBase: new URL("https://tarkavan.thenightowl.team"),
  title: "GoElite",
  description: "Best football player app",
  openGraph: {
    title: "Go Elite",
    description: "Best football player app",
    url: "https://tarkavan.thenightowl.team/",
    siteName: "Go Elite",
    images: [
      {
        url: "https://tarkavan.thenightowl.team/uploads/preview/1779134260.png",
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
      className={cn("antialiased", "font-sans")}
    >
      <body
        suppressHydrationWarning={true}
        className="text-fg-primary min-h-screen bg-background"
      >
        <Toasting />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
