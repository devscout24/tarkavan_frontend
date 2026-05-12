"use client"

import { useState, useEffect, useRef } from "react"
import CommonBtn from "@/components/common/common-btn"
import { BsArrowRight } from "react-icons/bs"
import { FiCheckSquare, FiSquare } from "react-icons/fi"

interface CoachingPhilosophyProps {
  updatePhilosophy?: (data: {
    philosophy: string
    playerCentric: boolean
    dataDriven: boolean
  }) => void
  onSubmit?: () => void
  isLoading?: boolean
  isEditMode?: boolean
  initialData?: {
    philosophy?: string
    playerCentric?: boolean
    dataDriven?: boolean
  }
}

export default function CoachingPhilosophy({
  updatePhilosophy,
  onSubmit,
  isLoading = false,
  isEditMode = false,
  initialData,
}: CoachingPhilosophyProps) {
  const [philosophy, setPhilosophy] = useState("")
  const [playerCentric, setPlayerCentric] = useState(true)
  const [dataDriven, setDataDriven] = useState(false)

  const localInitRef = useRef(false)
  useEffect(() => {
    if (!initialData || localInitRef.current) return
    // Only initialize if initialData has at least one meaningful value
    const hasRealData = Object.values(initialData).some((v) => v)
    if (!hasRealData) return

    if (typeof initialData.philosophy === "string")
      setPhilosophy(initialData.philosophy)
    if (typeof initialData.playerCentric === "boolean")
      setPlayerCentric(initialData.playerCentric)
    if (typeof initialData.dataDriven === "boolean")
      setDataDriven(initialData.dataDriven)
    localInitRef.current = true
  }, [initialData])

  const pushUpdate = (next: {
    philosophy?: string
    playerCentric?: boolean
    dataDriven?: boolean
  }) => {
    if (!updatePhilosophy) return
    updatePhilosophy({
      philosophy: next.philosophy ?? philosophy,
      playerCentric: next.playerCentric ?? playerCentric,
      dataDriven: next.dataDriven ?? dataDriven,
    })
  }

  return (
    <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-white">
          Coaching Philosophy
        </h3>
        <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
      </div>

      <p className="mt-1 text-sm text-white/85">
        Explain your core values and how you approach athlete development.
      </p>

      <textarea
        value={philosophy}
        onChange={(event) => {
          const v = event.target.value
          setPhilosophy(v)
          pushUpdate({ philosophy: v })
        }}
        rows={4}
        placeholder="My philosophy centers on mental resilience and technical precision..."
        className="mt-3 w-full rounded-xl border border-white/10 bg-secondary/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:outline-none"
      />

      <div className="mt-4 flex flex-wrap items-center gap-5">
        {/* Use div instead of label+input to prevent Radix Dialog's onInteractOutside from firing */}
        <div
          role="checkbox"
          aria-checked={playerCentric}
          tabIndex={0}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/90 select-none"
          onClick={(e) => {
            e.stopPropagation()
            const next = !playerCentric
            setPlayerCentric(next)
            pushUpdate({ playerCentric: next })
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault()
              setPlayerCentric((prev) => !prev)
            }
          }}
        >
          {playerCentric ? (
            <FiCheckSquare className="size-4 text-white" />
          ) : (
            <FiSquare className="size-4 text-white/90" />
          )}
          <span>Player-centric approach</span>
        </div>

        <div
          role="checkbox"
          aria-checked={dataDriven}
          tabIndex={0}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/90 select-none"
          onClick={(e) => {
            e.stopPropagation()
            const next = !dataDriven
            setDataDriven(next)
            pushUpdate({ dataDriven: next })
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault()
              setDataDriven((prev) => !prev)
            }
          }}
        >
          {dataDriven ? (
            <FiCheckSquare className="size-4 text-white" />
          ) : (
            <FiSquare className="size-4 text-white/90" />
          )}
          <span>Data-driven training</span>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-white/10" />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <CommonBtn
          variant="outline"
          size="lg"
          text="Back"
          className="h-12 w-24 border border-brand bg-transparent px-4 text-sm font-medium text-brand hover:bg-brand/10"
        />

        <CommonBtn
          variant="default"
          size="lg"
          text={
            isLoading
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
                ? "Update Profile"
                : "Finish & Create Profile"
          }
          className="h-12 w-60 rounded-xl bg-brand px-5 text-sm font-semibold text-primary hover:border hover:border-secondary hover:bg-transparent hover:text-white"
          iconRight={<BsArrowRight className="size-4" />}
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </section>
  )
}
