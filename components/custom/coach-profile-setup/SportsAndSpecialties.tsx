"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import SelectField from "@/components/common/select-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-white/50"

const titleInputClassName =
  "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

const sportOptions = [{ value: "soccer", label: "Soccer" }]

const roleOptions = [
  { value: "head-coach", label: "Head Coach" },
  { value: "assistant-coach", label: "Assistant Coach" },
  { value: "goalkeeping-coach", label: "Goalkeeping Coach" },
  { value: "fitness-coach", label: "Fitness Coach" },
  { value: "skills-trainer", label: "Skills Trainer" },
  { value: "performance-analyst", label: "Performance Analyst" },
  { value: "youth-coach", label: "Youth Coach" },
]

interface SportsAndSpecialtiesProps {
  updateSports?: (sports: unknown) => void
}

export default function SportsAndSpecialties({ updateSports }: SportsAndSpecialtiesProps) {
  const [sport, setSport] = useState("")
  const [role, setRole] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [coachingTitles, setCoachingTitles] = useState<string[]>([
    "Head Coach",
    "Skills Trainer",
  ])

  // Update parent component when sports data changes
  useEffect(() => {
    if (updateSports) {
      updateSports({
        sport,
        role,
        coachingTitles,
      })
    }
  }, [sport, role, coachingTitles, updateSports])

  const addTitle = () => {
    const normalized = titleInput.trim().replace(/\s+/g, " ")
    if (!normalized) return

    const exists = coachingTitles.some(
      (title) => title?.toLowerCase() === normalized.toLowerCase()
    )

    if (!exists) {
      setCoachingTitles((prev) => [...prev, normalized])
    }

    setTitleInput("")
  }

  const removeTitle = (titleToRemove: string) => {
    setCoachingTitles((prev) => prev.filter((title) => title !== titleToRemove))
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
          options={sportOptions}
          triggerClassName={triggerClassName}
          value={sport}
          onValueChange={setSport}
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
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className={triggerClassName}>
              <SelectValue placeholder="Select Current Role" />
            </SelectTrigger>
            <SelectContent className="bg-secondary/90 text-white">
              {roleOptions.map((option) => (
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
