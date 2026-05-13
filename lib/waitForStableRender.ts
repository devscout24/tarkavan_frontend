export const waitForStableRender = async () => {
  // fonts load wait
  await document.fonts.ready

  // images load wait
  const images = Array.from(document.images)

  await Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve(null)
          else {
            img.onload = resolve
            img.onerror = resolve
          }
        })
    )
  )

  // browser idle wait
  await new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => resolve(null))
    } else {
      setTimeout(resolve, 1000)
    }
  })

  // final frame settle
  await new Promise((r) => requestAnimationFrame(() => r(null)))
}