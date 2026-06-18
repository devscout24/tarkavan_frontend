import { setPlayerOG } from "@/app/(dashboards)/action"
import { toPng } from "html-to-image"

type CaptureProps = {
  elementId: string
  fileName?: string
  userId?: string
}

export async function captureAndSave({
  elementId,
  fileName = "image.png",
  userId,
}: CaptureProps) {
  const node = document.getElementById(elementId)

  if (!node) throw new Error("Element not found")

  await new Promise((r) => requestAnimationFrame(r))

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 3,
    backgroundColor: "#000",
  })

 
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = fileName
  link.click()

  const blob = await (await fetch(dataUrl)).blob()

  const file = new File([blob], fileName, {
    type: "image/png",
  })

  const formData = new FormData()
  formData.append("preview", file)
  formData.append("athlete_id", String(userId))

  if (userId && formData) {
    try {
      await setPlayerOG({
        id: userId,
        data: formData,
      })
    } catch (err) {
      console.error("Failed to upload OG image:", err)
    }
  }
}
