import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Toasting from "@/components/custom/toasting"
import StoreProvider from "./StoreProvider"
import OGimage from "@/public/og.png"

export const metadata: Metadata = {
  metadataBase: new URL("https://goelitesport.com/"),
  title: "GoElite",
  description: "Best football(soccer) player website",
  openGraph: {
    title: "Go Elite",
    description: "Best football(soccer) player website",
    url: "https://goelitesport.com",
    siteName: "Go Elite",
    images: [
      {
        url: OGimage.src,
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
        <ThemeProvider>
          <StoreProvider>

            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
