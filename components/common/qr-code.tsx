"use client"

import { QRCodeSVG } from "qrcode.react"

export default function QRCode({ link }: { link: string }) {
  return <QRCodeSVG value={link} size={200} />
}