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
  // 2-3 frame wait করলে chart animation/render complete হয়
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => requestAnimationFrame(r))
  await new Promise((r) => setTimeout(r, 500))
}

// v2
// import { setPlayerOG } from "@/app/(dashboards)/action"
// import { toPng } from "html-to-image"

// type CaptureProps = {
//   elementId: string
//   fileName?: string
//   userId?: string
// }

// async function resolveImageToDataUrl(img: HTMLImageElement): Promise<void> {
//   if (!img.src || img.src.startsWith("data:")) return

//   try {
//     const response = await fetch(img.src, { mode: "cors", cache: "force-cache" })
//     const blob = await response.blob()
//     const dataUrl = await new Promise<string>((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onload = () => resolve(reader.result as string)
//       reader.onerror = reject
//       reader.readAsDataURL(blob)
//     })
//     img.src = dataUrl
//     await new Promise<void>((resolve, reject) => {
//       img.onload = () => resolve()
//       img.onerror = reject
//     })
//   } catch {
//     // If we can't resolve, mark with crossOrigin attribute as fallback
//     img.crossOrigin = "anonymous"
//   }
// }

// export async function captureAndSave({
//   elementId,
//   fileName = "image.png",
//   userId,
// }: CaptureProps) {
//   const node = document.getElementById(elementId)
//   if (!node) throw new Error("Element not found")

//   // Pre-resolve all images in the node to data URLs to avoid CORS issues
//   const images = Array.from(node.querySelectorAll("img"))
//   await Promise.allSettled(images.map(resolveImageToDataUrl))

//   // Wait for next two frames to ensure all paint is done
//   await new Promise((r) => requestAnimationFrame(r))
//   await new Promise((r) => requestAnimationFrame(r))

//   const dataUrl = await toPng(node, {
//     cacheBust: true,
//     pixelRatio: 3,
//     backgroundColor: "#000",
//     // Skip nodes that fail to render rather than throwing
//     filter: (node) => {
//       if (node instanceof HTMLImageElement && !node.complete) return false
//       return true
//     },
//   })

//   // Trigger download
//   const link = document.createElement("a")
//   link.href = dataUrl
//   link.download = fileName
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)

//   // Upload to server
//   if (userId) {
//     try {
//       const blob = await (await fetch(dataUrl)).blob()
//       const file = new File([blob], fileName, { type: "image/png" })

//       const formData = new FormData()
//       formData.append("preview", file)
//       formData.append("athlete_id", String(userId))

//       await setPlayerOG({ id: userId, data: formData })
//     } catch (err) {
//       console.error("Failed to upload OG image:", err)
//     }
//   }
// }
