import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import { TPlayerProfilePayload } from "../type"

export default function StrengthsDesign({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const categories = [
    {
      id: "technical",
      label: "Technical",
      strengths: ["Passing", "Dribbling", "Ball Control", "Shooting"],
    },
    {
      id: "tactical",
      label: "Tactical",
      strengths: ["Vision", "Decision Making", "Positioning", "Awareness"],
    },
    {
      id: "mental",
      label: "Mental",
      strengths: ["Leadership", "Confidence", "Composure", "Focus"],
    },
    {
      id: "physical",
      label: "Physical",
      strengths: ["Speed", "Strength", "Agility", "Stamina"],
    },
    {
      id: "attacking",
      label: "Attacking",
      strengths: ["Finishing", "Crossing", "Creativity", "Movement"],
    },
    {
      id: "defending",
      label: "Defending",
      strengths: ["Marking", "Tackling", "Interceptions"],
    },
    {
      id: "aerial",
      label: "Aerial",
      strengths: ["Heading", "Aerial Duels", "Jumping Ability"],
    },
  ]

  const MAX_SELECTED = 5

  const [activeTab, setActiveTab] = useState(categories[0].id)

  const [selected, setSelected] = useState<Record<string, string>>(payload?.strengths?.selectedByCategory || {})
  useEffect(() => {
    setPayload((prev) => ({
      ...prev, 
      strengths: {
        activeCategoryId: "",
        selectedByCategory: selected, 
      }
    }))
  }, [selected])
  useEffect(() => {
    setSelected(payload?.strengths?.selectedByCategory || {})
  }, [payload])



  const activeCategory =
    categories.find((item) => item.id === activeTab) ?? categories[0]

  const handleSelect = (strength: string) => {
    setSelected((prev) => {
      const current = prev[activeCategory.id]

      // Deselect
      if (current === strength) {
        const next = { ...prev }
        delete next[activeCategory.id]
        return next
      }

      // Maximum 5 categories
      if (!current && Object.keys(prev).length >= MAX_SELECTED) {
        return prev
      }

      // Replace selection in same category
      return {
        ...prev,
        [activeCategory.id]: strength,
      }
    })
  }

  return (
    <>
      <h3 className="my-4 mt-10 text-[20px] leading-[120%] font-semibold text-white">
        Select Your Top 5 Strengths
      </h3>
      <div className="mt-2 grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <div className="space-y-2">
          {categories.map((category , i) => (
            <button
              key={i}
              onClick={() => setActiveTab(category.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-brand text-black shadow-lg shadow-brand/20"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <span>{category.label}</span>

              {selected[category.id] && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/20">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Strength List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              {activeCategory.label} Skills
            </h3>

            <span className="text-sm text-white/50">
              {Object.keys(selected).length} / {MAX_SELECTED}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {activeCategory.strengths.map((strength) => {
              const checked = selected[activeCategory.id] === strength

              return (
                <button
                  key={strength}
                  onClick={() => handleSelect(strength)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                    checked
                      ? "border-brand bg-brand/10"
                      : "border-white/10 bg-white/5 hover:border-brand/40 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${checked ? "text-brand" : "text-white"}`}
                    >
                      {strength}
                    </span>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                        checked
                          ? "border-brand bg-brand text-black"
                          : "border-white/20"
                      }`}
                    >
                      {checked && "✓"}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
