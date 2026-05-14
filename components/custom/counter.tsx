"use client"

import { useEffect, useRef, useState } from "react"
import Container from "../common/container"
import { TLandingStats } from "@/types"



function formatValue(value: number, suffix: string): string {
  if (suffix === "K+") return `${value}K+`
  return `${value.toLocaleString()}${suffix}`
}

function useCounterAnimation(
  target: number,
  suffix: string,
  triggered: boolean
) {
  const [display, setDisplay] = useState(formatValue(0, suffix))

  useEffect(() => {
    if (!triggered) return

    const duration = suffix === "K+" ? 1800 : 2200
    const startTime = performance.now()
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.round(target * easeOutCubic(progress))
      setDisplay(formatValue(current, suffix))
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(formatValue(target, suffix))
    }

    requestAnimationFrame(tick)
  }, [triggered, target, suffix])

  return display
}

interface CounterItemProps {
  value: number
  suffix: string
  desc: string
  triggered: boolean
}

function CounterItem({ value, suffix, desc, triggered }: CounterItemProps) {
  const display = useCounterAnimation(value, suffix, triggered)

  return (
    <div className="text-center">
      <div className="text-4xl font-semibold text-white">{display}</div>
      <div className="mt-1.5 text-sm text-secondary">{desc}</div>
    </div>
  )
}

export default function Counter({ data }: { data?: TLandingStats | null }) {
  const counterRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const counters = [
  { value: data?.active_athletes || 0, suffix: "+", desc: "Active Athletes" },
  { value: data?.certified_coaches || 0, suffix: "+", desc: "Certified Coaches" },
  { value: data?.teams || 0, suffix: "+", desc: "Teams" },
  { value: data?.session_booked || 0, suffix: "+", desc: "Sessions Booked" },
]

  return (
    <section className="w-full bg-[#060807] px-6 pb-10">
      <Container>
        <div
          ref={counterRef}
          className="mx-15 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4    "
        >
          {counters.map((item) => (
            <CounterItem
              key={item.desc}
              value={item.value}
              suffix={item.suffix}
              desc={item.desc}
              triggered={triggered}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
