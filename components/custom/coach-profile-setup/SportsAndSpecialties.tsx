"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import SelectField from "@/components/common/select-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCoachPositions } from "@/components/parentAndCoachApi/api/coachPositions"
import { getSportOptions } from "@/components/parentAndCoachApi/api/sportOptions"
import type {
  CoachPosition,
  SportOption,
} from "@/components/parentAndCoachApi/type"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-white/50"

const titleInputClassName =
  "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

interface SportsAndSpecialtiesProps {
  updateSports?: (sports: unknown) => void
  initialData?: {
    sport?: string
    role?: string
    coachingTitles?: string[]
  }
}

export default function SportsAndSpecialties({
  updateSports,
  initialData,
}: SportsAndSpecialtiesProps) {
  const [sport, setSport] = useState("")
  const [role, setRole] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [coachingTitles, setCoachingTitles] = useState<string[]>([])
  const [sportOptions, setSportOptions] = useState<SportOption[]>([])
  const [roleOptions, setRoleOptions] = useState<CoachPosition[]>([])
  const [formattedSportOptions, setFormattedSportOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [formattedRoleOptions, setFormattedRoleOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch sport options and coach positions on component mount
  const localInitRef = useRef(false)
  useEffect(() => {
    // initialize from initialData once
    if (initialData && !localInitRef.current) {
      // Only initialize if initialData has at least one meaningful value
      const hasRealData = Object.values(initialData).some((v) => v)
      if (!hasRealData) return

      if (initialData.sport) setSport(initialData.sport)
      if (initialData.role) setRole(initialData.role)
      if (initialData.coachingTitles)
        setCoachingTitles(initialData.coachingTitles.filter(Boolean))
      localInitRef.current = true
    }
    const fetchData = async () => {
      try {
        const [sportsResult, positionsResult] = await Promise.all([
          getSportOptions(),
          getCoachPositions(),
        ])

        if (sportsResult.success && sportsResult.data) {
          const formattedSports = sportsResult.data.map((sport) => ({
            value: sport.id.toString(),
            label: sport.name,
          }))
          setSportOptions(sportsResult.data)
          setFormattedSportOptions(formattedSports)
        }

        if (
          positionsResult &&
          "success" in positionsResult &&
          positionsResult.success &&
          positionsResult.data
        ) {
          const formattedPositions = positionsResult?.data?.map(
            (position: { id: number; name: string }) => ({
              value: position.id.toString(),
              label: position.name,
            })
          )
          setRoleOptions(positionsResult.data)
          setFormattedRoleOptions(formattedPositions)
        }
      } catch (error) {
        console.error("Failed to fetch options:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update parent component when sports data changes
  // Helper to push updates to parent from user actions
  const pushUpdate = (next: {
    sport?: string
    role?: string
    coachingTitles?: string[]
  }) => {
    if (!updateSports) return
    updateSports({
      sport: next.sport ?? sport,
      role: next.role ?? role,
      coachingTitles: next.coachingTitles ?? coachingTitles,
    })
  }

  const addTitle = () => {
    const normalized = titleInput.trim().replace(/\s+/g, " ")
    if (!normalized) return

    const exists = coachingTitles.some(
      (title) => title?.toLowerCase() === normalized.toLowerCase()
    )

    if (!exists) {
      const next = [...coachingTitles, normalized]
      setCoachingTitles(next)
      pushUpdate({ coachingTitles: next })
    }

    setTitleInput("")
  }

  const removeTitle = (titleToRemove: string) => {
    const next = coachingTitles.filter((title) => title !== titleToRemove)
    setCoachingTitles(next)
    pushUpdate({ coachingTitles: next })
  }

  return (
    <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
      <h3 className="pb-4 text-lg font-semibold text-white">
        Sports & Specialties
      </h3>
      <div className="mt-1 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />

      <div className="mt-5 space-y-4">
        <SelectField
          label="Sport Selection"
          placeholder="Select Sport"
          options={formattedSportOptions}
          triggerClassName={triggerClassName}
          value={sport}
          onValueChange={(v) => {
            setSport(v)
            pushUpdate({ sport: v })
          }}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Coaching Titles
          </label>

          {coachingTitles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {coachingTitles.map((title) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => removeTitle(title)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white transition-colors hover:bg-white/20"
                >
                  {title}
                  <span aria-hidden="true">x</span>
                </button>
              ))}
            </div>
          ) : null}

          <Input
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            onBlur={addTitle}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                addTitle()
              }
            }}
            placeholder="Add a title (e.g. Performance Specialist)"
            className={titleInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Role Selection
          </label>
          <Select
            value={role}
            onValueChange={(v) => {
              setRole(v)
              pushUpdate({ role: v })
            }}
          >
            <SelectTrigger className={triggerClassName}>
              <SelectValue placeholder="Select Current Role" />
            </SelectTrigger>
            <SelectContent className="bg-secondary/90 text-white">
              {formattedRoleOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
