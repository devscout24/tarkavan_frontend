"use client"

import { useState } from "react"
import DatepickerField from "@/components/common/datepicker-field"
import InputField from "@/components/common/input-field"
import SelectField from "@/components/common/select-field"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 text-sm text-white placeholder:text-secondary/40 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-[#0F1117] px-3 text-sm text-white data-placeholder:text-secondary/40"

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

export default function BasicInformation() {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>()
  const [gender, setGender] = useState("")

  return (
    <div className="rounded-2xl text-white">
      <h3 className="border-b border-dashed border-white/12 pb-4 text-lg font-semibold text-white">
        Basic Information
      </h3>
      <p className="mt-1 text-sm text-white/70">
        Complete your personal details to build your coach profile.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="First Name"
          placeholder="Enter first name"
          className={controlClassName}
        />

        <InputField
          label="Last Name"
          placeholder="Enter last name"
          className={controlClassName}
        />

        <DatepickerField
          label="Date of Birth"
          selected={dateOfBirth}
          open={openDatePicker}
          onOpenChange={setOpenDatePicker}
          onSelect={setDateOfBirth}
          placeholder="MM/DD/YYYY"
        />

        <SelectField
          label="Select Gender"
          placeholder="Select gender"
          options={genderOptions}
          triggerClassName={triggerClassName}
          value={gender}
          onValueChange={setGender}
        />

        <InputField
          label="Nationality"
          placeholder="Enter nationality"
          className={controlClassName}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          className={controlClassName}
        />
      </div>
    </div>
  )
}
