"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPrivacyOption } from "@/types"

export default function PrivacySetting({
  privacyOptions,
  onChange,
  initialValue,
}: {
  privacyOptions: TPrivacyOption[]
  onChange?: (value: string) => void
  initialValue?: string
}) { 

  const handlePrivacyChange = (value: string) => { 
    onChange?.(value)
  }
 

  return (
    <Card className="mt-6 gap-0 rounded-2xl border border-white/12 bg-primary py-0 text-white ring-0">
      <CardHeader className="px-4 pt-4 pb-1 md:px-6 md:pt-6 md:pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight text-white">
          Privacy Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Privacy settings"
        >
          {privacyOptions.map((option) => {
            const isSelected = initialValue === option.value

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
      </CardContent>
    </Card>
  )
}
