"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-secondary/40"

const yearsOptions = [
  { value: "1-3", label: "1-3 years" },
  { value: "4-6", label: "4-6 years" },
  { value: "7-10", label: "7-10 years" },
  { value: "10+", label: "10+ years" },
]

export default function ExperienceAndEducation() {
  const [years, setYears] = useState("")
  const [education, setEducation] = useState("")
  const [history, setHistory] = useState("")

  return (
    <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-white">
          Experience &amp; Education
        </h3>
        <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Years of Experience
          </label>
          <Select value={years} onValueChange={setYears}>
            <SelectTrigger className={triggerClassName}>
              <SelectValue placeholder="Select experience range" />
            </SelectTrigger>
            <SelectContent>
              {yearsOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-primary hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Highest Education Degree
          </label>
          <Input
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            placeholder="e.g. M.S. in Sports Science"
            className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-secondary/40 focus-visible:border-brand focus-visible:ring-0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Coaching History Summary
          </label>
          <textarea
            value={history}
            onChange={(event) => setHistory(event.target.value)}
            placeholder="Briefly describe your coaching career journey..."
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-secondary/10 px-3 py-2 text-sm text-white placeholder:text-secondary/40 focus-visible:border-brand focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
      </div>
    </section>
  )
}
