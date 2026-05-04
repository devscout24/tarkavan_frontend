"use client"

import { useMemo, useState } from "react" 
import StrengthsSelectedSlot from "../modal/all-modals/player-add-modal/components/strengths-selected-slot"
import StrengthCategorySidebar from "../modal/all-modals/player-add-modal/components/strength-category-sidebar"
import StrengthItemCheckbox from "../modal/all-modals/player-add-modal/components/strength-item-checkbox"

 
export interface StrengthCategory {
  id: string
  label: string
  strengths: string[]
}

 
const STRENGTH_CATEGORIES: StrengthCategory[] = [
  {
    id: "technical",
    label: "Technical",
    strengths: ["Passing", "Dribbling", "First Touch", "Ball Control", "Shooting"],
  },
  {
    id: "tactical",
    label: "Tactical",
    strengths: ["Vision", "Positioning", "Game Intelligence", "Decision Making", "Ball Movement"],
  },
  {
    id: "mental",
    label: "Mental",
    strengths: ["Leadership", "Composure", "Work Rate", "Determination", "Confidence"],
  },
  {
    id: "attacking",
    label: "Attacking",
    strengths: ["Finishing", "Creativity", "Chance Creation", "Attacking Movement"],
  },
  {
    id: "defending",
    label: "Defending",
    strengths: ["Marking", "Tackling", "Interceptions", "Defensive Positioning"],
  },
  {
    id: "physical",
    label: "Physical",
    strengths: ["Speed", "Acceleration", "Strength", "Endurance", "Agility"],
  },
  {
    id: "aerial",
    label: "Aerial",
    strengths: ["Heading", "Aerial Duels", "Jumping Ability"],
  },
]

const MAX_STRENGTHS = 5

 
export default function EditPlayerAttributes() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(STRENGTH_CATEGORIES[0].id)
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, string>>({})
  const [validationMessage, setValidationMessage] = useState("")
  console.log("selectedByCategory", selectedByCategory)
  const activeCategory =
    STRENGTH_CATEGORIES.find((c) => c.id === activeCategoryId) ?? STRENGTH_CATEGORIES[0]

  const selectedStrengths = useMemo(
    () => Object.values(selectedByCategory),
    [selectedByCategory]
  )

  const onToggleStrength = (strength: string) => {
    setValidationMessage("")

    setSelectedByCategory((prev) => {
      const currentValue = prev[activeCategory.id]

      // deselect
      if (currentValue === strength) {
        const next = { ...prev }
        delete next[activeCategory.id]
        return next
      }

      // already picked a different one in this category
      if (currentValue && currentValue !== strength) {
        setValidationMessage("You can select only one strength from each skill category.")
        return prev
      }

      // max reached
      if (Object.keys(prev).length >= MAX_STRENGTHS && !currentValue) {
        setValidationMessage("You can select up to 5 strengths only.")
        return prev
      }

      return { ...prev, [activeCategory.id]: strength }
    })
  }

  return (
    <div className="w-full rounded-2xl  p-4 text-white sm:p-6 md:p-8">
      <div className="mt-5 pb-6">
        <h3 className="text-[20px] leading-[150%] font-bold text-white">
          Select Your Top 5 Strengths
        </h3>
        <p className="text-[14px] leading-[150%] font-normal text-white/70">
          Provide detailed performance data for the current or most recent competitive season.
        </p>
        <div className="mt-2 mb-6 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0_10px,transparent_10px_20px)]" />

        {/* selected strengths */}
        <div className="rounded-xl bg-secondary/40 p-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[20px] leading-[150%] font-bold text-white">
              Your Selected Strengths
            </p>
            <span className="rounded bg-white px-2 py-0.5 text-[12px] leading-[133%] font-medium text-[#060807]">
              {selectedStrengths.length} / 5 SELECTED
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              {Array.from({ length: MAX_STRENGTHS }, (_, i) => (
                <StrengthsSelectedSlot key={i} label={selectedStrengths[i]} />
              ))}
            </div>
          </div>
        </div>

        {/* category + items */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[190px_1fr]">
          <StrengthCategorySidebar
            categories={STRENGTH_CATEGORIES}
            activeCategoryId={activeCategory.id}
            onCategorySelect={setActiveCategoryId}
          />

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="text-[16px] leading-[150%] font-medium text-white">
              {activeCategory.label}
            </h4>
            <div className="mt-3 h-px bg-white/15" />
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {activeCategory.strengths.map((strength) => (
                <StrengthItemCheckbox
                  key={strength}
                  label={strength}
                  checked={selectedByCategory[activeCategory.id] === strength}
                  onChange={() => onToggleStrength(strength)}
                />
              ))}
            </div>
          </div>
        </div>

        {validationMessage && (
          <p className="mt-3 text-[12px] leading-[150%] text-red-400">{validationMessage}</p>
        )}
      </div>
    </div>
  )
}