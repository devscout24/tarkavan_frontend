import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import {
  getAddAthleteRoleHeaderCopy,
  ModalStepHeader,
  MODAL_ROLE_QUERY_KEY,
  StepActions,
} from "@/pages/parent-pages/modal_common"
import StrengthCategorySidebar, {
  type StrengthCategory,
} from "@/pages/parent-pages/modals/strengths/strength-category-sidebar"
import StrengthItemCheckbox from "@/pages/parent-pages/modals/strengths/strength-item-checkbox"
import StrengthsSelectedSlot from "@/pages/parent-pages/modals/strengths/strengths-selected-slot"

const strengthCategories: StrengthCategory[] = [
  {
    id: "technical",
    label: "Technical",
    strengths: [
      "Passing",
      "Dribbling",
      "First Touch",
      "Ball Control",
      "Shooting",
    ],
  },
  {
    id: "tactical",
    label: "Tactical",
    strengths: [
      "Vision",
      "Positioning",
      "Game Intelligence",
      "Decision Making",
      "Ball Movement",
    ],
  },
  {
    id: "mental",
    label: "Mental",
    strengths: [
      "Leadership",
      "Composure",
      "Work Rate",
      "Determination",
      "Confidence",
    ],
  },
  {
    id: "attacking",
    label: "Attacking",
    strengths: [
      "Finishing",
      "Creativity",
      "Chance Creation",
      "Attacking Movement",
    ],
  },
  {
    id: "defending",
    label: "Defending",
    strengths: [
      "Marking",
      "Tackling",
      "Interceptions",
      "Defensive Positioning",
    ],
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

export default function Strengths() {
  const [searchParams, setSearchParams] = useSearchParams()
  const roleHeaderCopy = getAddAthleteRoleHeaderCopy(
    searchParams.get(MODAL_ROLE_QUERY_KEY)
  )
  const [activeCategoryId, setActiveCategoryId] = useState(
    strengthCategories[0].id
  )
  const [selectedByCategory, setSelectedByCategory] = useState<
    Record<string, string>
  >({})
  const [validationMessage, setValidationMessage] = useState("")

  const selectedStrengths = useMemo(
    () => Object.values(selectedByCategory),
    [selectedByCategory]
  )
  const selectedCount = selectedStrengths.length

  const activeCategory =
    strengthCategories.find((category) => category.id === activeCategoryId) ??
    strengthCategories[0]

  const setModalStep = (step: string) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set("addNewChildren", step)
    setSearchParams(nextParams)
  }

  const onToggleStrength = (strength: string) => {
    setValidationMessage("")

    setSelectedByCategory((prev) => {
      const currentValue = prev[activeCategory.id]
      const selectedTotal = Object.keys(prev).length

      if (currentValue === strength) {
        const next = { ...prev }
        delete next[activeCategory.id]
        return next
      }

      if (currentValue && currentValue !== strength) {
        setValidationMessage(
          "You can select only one strength from each skill category."
        )
        return prev
      }

      if (selectedTotal >= MAX_STRENGTHS && !currentValue) {
        setValidationMessage("You can select up to 5 strengths only.")
        return prev
      }

      return {
        ...prev,
        [activeCategory.id]: strength,
      }
    })
  }

  const goBackToSeasonStats = () => {
    setModalStep("seasonStats")
  }

  const goToNextStep = () => {
    if (selectedCount !== MAX_STRENGTHS) {
      setValidationMessage("Please select exactly 5 strengths to continue.")
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    nextParams.set("addNewChildren", "biography")
    setSearchParams(nextParams)
  }

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title={roleHeaderCopy.title}
        subtitle={roleHeaderCopy.subtitle}
        currentStep={4}
      />

      <div className="mt-5 pb-6">
        <h3 className="text-[20px] leading-[150%] font-bold text-white">
          Select Your Top 5 Strengths
        </h3>
        <p className="text-[14px] leading-[150%] font-normal text-white/70">
          Provide detailed performance data for the current or most recent
          competitive season.
        </p>
        <div className="mt-2 mb-6 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.2)_0_10px,transparent_10px_20px)]" />

        <div className="rounded-xl bg-secondary/40 p-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[20px] leading-[150%] font-bold text-white">
              Your Selected Strengths
            </p>

            <span className="rounded bg-white px-2 py-0.5 text-[12px] leading-[133.333%] font-medium text-[#060807]">
              {selectedCount} / 5 SELECTED
            </span>

            <div className="ml-auto flex flex-wrap gap-2">
              {Array.from({ length: MAX_STRENGTHS }, (_, index) => (
                <StrengthsSelectedSlot
                  key={`selected-strength-${index}`}
                  label={selectedStrengths[index]}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[190px_1fr]">
          <StrengthCategorySidebar
            categories={strengthCategories}
            activeCategoryId={activeCategory.id}
            onCategorySelect={setActiveCategoryId}
          />

          <div className="rounded-xl border border-white/10 p-4">
            <h4 className="text-[16px] leading-[150%] font-medium text-white">
              {activeCategory.label}
            </h4>
            <div className="mt-3 h-px bg-white/15" />

            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {activeCategory.strengths.map((strength) => {
                const selectedInCurrentCategory =
                  selectedByCategory[activeCategory.id]
                const checked = selectedInCurrentCategory === strength

                return (
                  <StrengthItemCheckbox
                    key={strength}
                    label={strength}
                    checked={checked}
                    onChange={() => onToggleStrength(strength)}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {validationMessage && (
          <p className="mt-3 text-[12px] leading-[150%] text-red-400">
            {validationMessage}
          </p>
        )}
      </div>

      <StepActions onBack={goBackToSeasonStats} onNext={goToNextStep} />
    </div>
  )
}
