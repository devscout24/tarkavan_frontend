"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPrivacyOption } from "@/types"

interface PrivacySettingsCoachProps {
  privacyOptions: TPrivacyOption[]
  initialValue?: string
  initialAllowParentPlayerReviews?: number | boolean
  initialVisibleReviews?: number | boolean
  onChange: (value: { privacy_settings: string; allow_parent_player_reviews: number; visible_reviews: number }) => void
}

export default function PrivacySettingsCoach({ 
  privacyOptions, 
  initialValue = "public",
  initialAllowParentPlayerReviews = 0,
  initialVisibleReviews = 0,
  onChange 
}: PrivacySettingsCoachProps) {
  const [selectedPrivacy, setSelectedPrivacy] = useState(initialValue)
  const [allowParentPlayerReviews, setAllowParentPlayerReviews] = useState(
    typeof initialAllowParentPlayerReviews === 'boolean' 
      ? (initialAllowParentPlayerReviews ? 1 : 0)
      : initialAllowParentPlayerReviews
  )
  const [visibleReviews, setVisibleReviews] = useState(
    typeof initialVisibleReviews === 'boolean' 
      ? (initialVisibleReviews ? 1 : 0)
      : initialVisibleReviews
  )

  const emitChange = (privacy: string, allowReviews: number, visibleRev: number) => {
    onChange({
      privacy_settings: privacy,
      allow_parent_player_reviews: allowReviews,
      visible_reviews: visibleRev,
    })
  }

  const handlePrivacyChange = (value: string) => {
    setSelectedPrivacy(value)
    emitChange(value, allowParentPlayerReviews, visibleReviews)
  }

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newAllowParentPlayerReviews = allowParentPlayerReviews
    let newVisibleReviews = visibleReviews

    if (optionValue === "allow_parent_player_reviews") {
      newAllowParentPlayerReviews = checked ? 1 : 0
      setAllowParentPlayerReviews(newAllowParentPlayerReviews)
    } else if (optionValue === "visible_reviews") {
      newVisibleReviews = checked ? 1 : 0
      setVisibleReviews(newVisibleReviews)
    }

    emitChange(selectedPrivacy, newAllowParentPlayerReviews, newVisibleReviews)
  }

  // First 2 options for radio buttons
  const radioOptions = privacyOptions.slice(0, 2)
  // Define checkbox options manually based on API requirements
  const checkboxOptions = [
    {
      value: "allow_parent_player_reviews",
      title: "Reviewing Parents and Players",
      description: "Allow parents and players to review your profile"
    },
    {
      value: "visible_reviews", 
      title: "Visible Review in The Profile",
      description: "Make reviews visible on your profile"
    }
  ]

  return (
    <Card className="mt-6 gap-0 rounded-2xl border border-white/12 bg-primary py-0 text-white ring-0">
      <CardHeader className="px-4 pt-4 pb-1 md:px-6 md:pt-6 md:pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight text-white">
          Privacy Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
        {/* Radio Button Options */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-white/65 mb-3">Profile Visibility</h4>
          {radioOptions.map((option) => {
            const isSelected = selectedPrivacy === option.value

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handlePrivacyChange(option.value)}
                className="flex w-full cursor-pointer items-start gap-3 text-left focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-5 items-center justify-center rounded-full border transition-colors ${
                    isSelected
                      ? "border-brand bg-brand"
                      : "border-white/65 bg-transparent"
                  }`}
                >
                  <span className="size-2 rounded-full bg-primary" />
                </span>

                <span className="space-y-1">
                  <span className="block text-base leading-tight font-normal text-white">
                    {option.title}
                  </span>
                  <span className="block text-sm leading-tight font-normal text-white/65">
                    {option.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Checkbox Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white/65 mb-3">Additional Privacy Options</h4>
          {checkboxOptions.map((option) => {
            const isChecked = option.value === "allow_parent_player_reviews" 
              ? allowParentPlayerReviews === 1
              : visibleReviews === 1

            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => handleCheckboxChange(option.value, !isChecked)}
                className="flex w-full cursor-pointer items-start gap-3 text-left focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-5 items-center justify-center rounded border transition-colors ${
                    isChecked
                      ? "border-brand bg-brand"
                      : "border-white/65 bg-transparent"
                  }`}
                >
                  {isChecked && (
                    <svg className="size-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>

                <span className="space-y-1">
                  <span className="block text-base leading-tight font-normal text-white">
                    {option.title}
                  </span>
                  <span className="block text-sm leading-tight font-normal text-white/65">
                    {option.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
