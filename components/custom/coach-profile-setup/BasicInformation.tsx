"use client"

import { useState, useEffect } from "react"
import DatepickerField from "@/components/common/datepicker-field"
import InputField from "@/components/common/input-field"
import SelectField from "@/components/common/select-field"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-secondary/40 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-secondary/40"

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

interface BasicInformationProps {
  updateBasicInfo?: (info: any) => void
}

export default function BasicInformation({ updateBasicInfo }: BasicInformationProps) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>()
  const [gender, setGender] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nationality, setNationality] = useState("")
  const [email, setEmail] = useState("")

  // Update parent component when form data changes
  useEffect(() => {
    if (updateBasicInfo) {
      updateBasicInfo({
        firstName: firstName || "",
        lastName: lastName || "",
        dateOfBirth,
        gender: gender || "",
        nationality: nationality || "",
        email: email || "",
      })
    }
  }, [firstName, lastName, dateOfBirth, gender, nationality, email, updateBasicInfo])

  return (
    <div className="rounded-2xl text-white">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-white">Basic Information</h3>
        <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
      </div>
      <p className="mt-2 text-sm text-white/70">
        Complete your personal details to build your coach profile.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="First Name"
          placeholder="Enter first name"
          className={controlClassName}
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value || "")}
        />

        <InputField
          label="Last Name"
          placeholder="Enter last name"
          className={controlClassName}
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value || "")}
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
          value={gender || ""}
          onValueChange={(value) => setGender(value || "")}
        />

        <InputField
          label="Nationality"
          placeholder="Enter nationality"
          className={controlClassName}
          value={nationality || ""}
          onChange={(e) => setNationality(e.target.value || "")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          className={controlClassName}
          value={email || ""}
          onChange={(e) => setEmail(e.target.value || "")}
        />
      </div>
    </div>
  )
}
