"use client"

import { useState, useEffect, useRef } from "react"
import InputField from "@/components/common/input-field"
import SelectField from "@/components/common/select-field"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown } from "lucide-react"
import CountryCitySelector from "@/components/common/country-city-selector"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-white/50 py-5 mt-2 "

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

interface BasicInformationProps {
  updateBasicInfo?: (info: any) => void
  initialData?: {
    firstName?: string
    lastName?: string
    dateOfBirth?: string | Date
    gender?: string
    nationality?: string
    email?: string
    city?: string
    country?: string
  }
}

export default function BasicInformation({
  updateBasicInfo,
  initialData,
}: BasicInformationProps) {
  const { setValue } = useForm()
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>()
  const [gender, setGender] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nationality, setNationality] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  // initialize from initialData when it arrives (only once)
  const localInitRef = useRef(false)
  useEffect(() => {
    if (!initialData || localInitRef.current) return
    // Only initialize if initialData has at least one meaningful value
    const hasRealData = Object.values(initialData).some((v) => v)
    if (!hasRealData) return

    setFirstName(initialData.firstName || "")
    setLastName(initialData.lastName || "")
    setGender(initialData.gender || "")
    setNationality(initialData.nationality || "")
    setEmail(initialData.email || "")
    setCountry(initialData.country || "")
    setCity(initialData.city || "")
    if (initialData.dateOfBirth) {
      const d =
        typeof initialData.dateOfBirth === "string"
          ? new Date(initialData.dateOfBirth)
          : initialData.dateOfBirth
      setDateOfBirth(d)
      setValue("dateOfBirth", d, { shouldValidate: true })
    }
    localInitRef.current = true
  }, [initialData, setValue])

  // Push update to parent from user event handlers
  const pushUpdate = (overrides: Partial<Record<string, unknown>> = {}) => {
    if (!updateBasicInfo) return
    updateBasicInfo({
      firstName: overrides.firstName ?? firstName ?? "",
      lastName: overrides.lastName ?? lastName ?? "",
      dateOfBirth: overrides.dateOfBirth ?? dateOfBirth,
      gender: overrides.gender ?? gender ?? "",
      nationality: overrides.nationality ?? nationality ?? "",
      email: overrides.email ?? email ?? "",
      city: overrides.city ?? city ?? "",
      country: overrides.country ?? country ?? "",
    })
  }

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
          onChange={(e) => {
            const v = e.target.value || ""
            setFirstName(v)
            pushUpdate({ firstName: v })
          }}
        />

        <InputField
          label="Last Name"
          placeholder="Enter last name"
          className={controlClassName}
          value={lastName || ""}
          onChange={(e) => {
            const v = e.target.value || ""
            setLastName(v)
            pushUpdate({ lastName: v })
          }}
        />

        <FieldGroup className="flex-row">
          <Field>
            <FieldLabel htmlFor="date-picker-optional">
              Date of Birth
            </FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-optional"
                  className="w-32 justify-between py-5! font-normal"
                >
                  {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  captionLayout="dropdown"
                  defaultMonth={dateOfBirth}
                  onSelect={(date) => {
                    setDateOfBirth(date)
                    setValue("dateOfBirth", date, { shouldValidate: true })
                    pushUpdate({ dateOfBirth: date })
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
        </FieldGroup>

        <SelectField
          label="Select Gender"
          placeholder="Select gender"
          options={genderOptions}
          triggerClassName={triggerClassName}
          value={gender || ""}
          onValueChange={(value) => {
            const v = value || ""
            setGender(v)
            pushUpdate({ gender: v })
          }}
        />

        <InputField
          label="Nationality"
          placeholder="Enter nationality"
          className={controlClassName}
          value={nationality || ""}
          onChange={(e) => {
            const v = e.target.value || ""
            setNationality(v)
            pushUpdate({ nationality: v })
          }}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          className={controlClassName}
          value={email || ""}
          onChange={(e) => {
            const v = e.target.value || ""
            setEmail(v)
            pushUpdate({ email: v })
          }}
        />
      </div>

      <div className="mt-4">
        <CountryCitySelector
          onSelect={(data) => {
            const c = data.country_name
            const ci = data.city_name
            setCountry(c)
            setCity(ci)
            pushUpdate({ country: c, city: ci })
          }}
        />
      </div>
    </div>
  )
}
