import { setPlayerOG } from "@/app/(dashboards)/action"
import { toPng } from "html-to-image"

type CaptureProps = {
  elementId: string
  fileName?: string
  userId?: string
  setLoading?: (loading: boolean) => void
}

export async function captureAndSave({
  elementId,
  fileName = "image.png",
  userId,
  setLoading,
}: CaptureProps) {
  if (setLoading) setLoading(true)
  const node = document.getElementById(elementId)

  if (!node) {
    throw new Error("Element not found")
  }

  await new Promise((r) => requestAnimationFrame(r))

  // images load
  await waitForImages(node)

  // chart render finish
  await waitForChartRender()

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 3,
    backgroundColor: "#000",
  })

  const link = document.createElement("a")

  if (!link) setLoading?.(false)

  link.href = dataUrl
  link.download = fileName
  link.click()

  const blob = await (await fetch(dataUrl)).blob()

  if (!blob) setLoading?.(false)

  const file = new File([blob], fileName, {
    type: "image/png",
  })

  if(!file) setLoading?.(false)

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
    } finally {
      setLoading?.(false)
    }
  }
}

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"))

  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve()

      return new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.onerror = () => resolve()
      })
    })
  )
}

async function waitForChartRender() { 
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => setTimeout(r, 500))
}
 