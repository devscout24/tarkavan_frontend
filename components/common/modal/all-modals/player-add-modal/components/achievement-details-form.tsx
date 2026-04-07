"use client"

import { useEffect, useMemo, useState } from "react"
import DatepickerField from "@/components/common/datepicker-field"
import InputField from "@/components/common/input-field"

const inputClassName =
  "h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 mt-2 text-[14px] text-white placeholder:text-white/30 focus-visible:border-brand focus-visible:ring-0"

type AchievementDetailsValue = {
  title: string
  dateEarned?: string
  description: string
}

export default function AchievementDetailsForm({
  value,
  onChange,
}: {
  value: AchievementDetailsValue
  onChange: (value: AchievementDetailsValue) => void
}) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [title, setTitle] = useState(value.title)
  const [description, setDescription] = useState(value.description)
  const [dateEarned, setDateEarned] = useState<Date | undefined>(
    value.dateEarned ? new Date(value.dateEarned) : undefined
  )

  const dateEarnedIso = useMemo(
    () => (dateEarned ? dateEarned.toISOString() : undefined),
    [dateEarned]
  )

  useEffect(() => {
    onChange({
      title,
      dateEarned: dateEarnedIso,
      description,
    })
  }, [title, dateEarnedIso, description, onChange])

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="Achievement Title"
          placeholder="Enter achievement title"
          labelClassName="text-[14px] font-medium text-white"
          className={inputClassName}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <DatepickerField
          label="Date Earned"
          selected={dateEarned}
          open={openDatePicker}
          onOpenChange={setOpenDatePicker}
          onSelect={setDateEarned}
          labelClassName="text-[14px] font-medium text-white"
          triggerClassName="h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 text-[14px] mt-2 text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-medium text-white">
          Description (Optional)
        </label>
        <textarea
          placeholder="Briefly describe the significance..."
          className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-[#0F1117] px-3 py-2 text-[14px] leading-[150%] text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
    </div>
  )
}
