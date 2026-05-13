export const convertToJpg = (dataUrl: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.src = dataUrl

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      canvas.width = img.width
      canvas.height = img.height

      // white background (important for JPG)
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, 0, 0)

      const jpg = canvas.toDataURL("image/jpeg", 0.95)
      resolve(jpg)
    }
  })
}