import React from "react"
import PlayerLayout from "../components/root-layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlayerLayout>{children}</PlayerLayout>
}
