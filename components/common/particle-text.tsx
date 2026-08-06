"use client"
import { useEffect, useRef } from "react"

type Props = {
  text: string
  color1?: string
  color2?: string
  duration?: number // ms, formation animation time
  particleSize?: number // px, size of each drawn square
  className?: string // applied to a hidden test element to read the real font-family from your CSS
  mouseRadius?: number // px, how far the cursor pushes particles
  mouseForce?: number // 0-100, how hard it pushes
}
 
function resolveFontFamily(className?: string): string {
  const fallback =
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  if (typeof document === "undefined" || !className) return fallback
  const test = document.createElement("span")
  test.className = className
  test.style.position = "absolute"
  test.style.visibility = "hidden"
  test.style.pointerEvents = "none"
  document.body.appendChild(test)
  const family = getComputedStyle(test).fontFamily
  document.body.removeChild(test)
  return family || fallback
}

export default function ParticleText({
  text,
  color1 = "#F9731A",
  color2 = "#FFFFFF",
  duration = 1200,
  particleSize = 1,
  className,
  mouseRadius = 60,
  mouseForce = 30,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: -99999, y: -99999 })

  useEffect(() => {
    const container = containerRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    let ro: ResizeObserver

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = container.clientWidth
      const H = container.clientHeight
      if (W < 10 || H < 10) return
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const fontFamily = resolveFontFamily(className)

      // Off-screen sample: binary-search the font size so text fills
      // the box (with margin) without overflowing/clipping.
      const off = document.createElement("canvas")
      off.width = W
      off.height = H
      const octx = off.getContext("2d")!
      const maxW = W * 0.9
      const maxH = H * 0.8
      let lo = 8,
        hi = H,
        size = 8
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2
        octx.font = `700 ${mid}px ${fontFamily}`
        const m = octx.measureText(text)
        const w = m.width
        const h =
          (m.actualBoundingBoxAscent || mid * 0.8) +
          (m.actualBoundingBoxDescent || mid * 0.2)
        if (w <= maxW && h <= maxH) {
          size = mid
          lo = mid
        } else hi = mid
      }
      octx.clearRect(0, 0, W, H)
      octx.fillStyle = "#fff"
      octx.font = `700 ${size}px ${fontFamily}`
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.fillText(text, W / 2, H / 2)
      const img = octx.getImageData(0, 0, W, H).data

      // Sample at a fine, particleSize-aware gap so letters stay solid.
      const gap = Math.max(1, particleSize - 1)
      const points: {
        ox: number
        oy: number
        x: number
        y: number
        c: string
        rx: number // current repulsion offset from cursor
        ry: number
      }[] = []
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (img[(y * W + x) * 4 + 3] > 128) {
            const ang = Math.random() * Math.PI * 2
            const rad = Math.max(W, H) * 0.6
            points.push({
              ox: x,
              oy: y,
              x: W / 2 + Math.cos(ang) * rad,
              y: H / 2 + Math.sin(ang) * rad,
              c: Math.random() < 0.5 ? color1 : color2,
              rx: 0,
              ry: 0,
            })
          }
        }
      }

      let start: number | null = null
      const radius = Math.max(1, mouseRadius)
      const radiusSq = radius * radius
      cancelAnimationFrame(raf)
      const frame = (t: number) => {
        if (start === null) start = t
        const p = Math.min(1, (t - start) / duration)
        const ease = 1 - Math.pow(1 - p, 3) // easeOutCubic
        const formed = p >= 1
        const mx = pointerRef.current.x
        const my = pointerRef.current.y

        ctx.clearRect(0, 0, W, H)
        for (const pt of points) {
          if (!formed) {
            // still flying in from spawn point
            const cx = pt.x + (pt.ox - pt.x) * ease
            const cy = pt.y + (pt.oy - pt.y) * ease
            ctx.fillStyle = pt.c
            ctx.globalAlpha = Math.max(0.15, ease)
            ctx.fillRect(cx, cy, particleSize, particleSize)
            continue
          }

          // settled: push away from the cursor, out to a ring at `radius`
          const dx = pt.ox - mx
          const dy = pt.oy - my
          const distSq = dx * dx + dy * dy
          let targetRx = 0
          let targetRy = 0
          if (distSq > 0 && distSq < radiusSq) {
            const dist = Math.sqrt(distSq)
            const nx = dx / dist
            const ny = dy / dist
            targetRx = nx * (radius - dist) * (mouseForce / 30)
            targetRy = ny * (radius - dist) * (mouseForce / 30)
          }
          pt.rx += (targetRx - pt.rx) * 0.18
          pt.ry += (targetRy - pt.ry) * 0.18

          ctx.fillStyle = pt.c
          ctx.globalAlpha = 1
          ctx.fillRect(
            pt.ox + pt.rx,
            pt.oy + pt.ry,
            particleSize,
            particleSize
          )
        }
        ctx.globalAlpha = 1
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.x = e.clientX - rect.left
      pointerRef.current.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointerRef.current.x = -99999
      pointerRef.current.y = -99999
    }
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerleave", onLeave)

    build()
    ro = new ResizeObserver(() => build())
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
    }
  }, [
    text,
    color1,
    color2,
    duration,
    particleSize,
    className,
    mouseRadius,
    mouseForce,
  ])

  return (
    <div ref={containerRef} style={{ width: "100%", height: 300 }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}