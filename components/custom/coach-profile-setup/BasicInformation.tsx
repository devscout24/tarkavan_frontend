"use client"

import { useState, useEffect } from "react"
import DatepickerField from "@/components/common/datepicker-field"
import InputField from "@/components/common/input-field"
import SelectField from "@/components/common/select-field"
import { getCountries, getCities } from "@/components/parentApi/api/locations"
import type { Country, City } from "@/components/parentApi/type"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-white/50"

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
]

const cityOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "khulna", label: "Khulna" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "sylhet", label: "Sylhet" },
  { value: "barisal", label: "Barisal" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
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
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await getCountries()
        if (result.success && result.data) {
          setCountries(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch countries:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Fetch cities when country changes
  useEffect(() => {
    if (!country) {
      setCities([])
      return
    }

    const selectedCountry = countries.find(c => c.id.toString() === country)
    if (!selectedCountry) return

    const fetchCities = async () => {
      try {
        const result = await getCities(selectedCountry.id)
        if (result.success && result.data) {
          setCities(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
      }
    }

    fetchCities()
  }, [country, countries])

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
        city: city || "",
        country: country || "",
      })
    }
  }, [firstName, lastName, dateOfBirth, gender, nationality, email, city, country, updateBasicInfo])

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

        <SelectField
          label="Country"
          placeholder="Select country"
          options={countries.map(c => ({ value: c.id.toString(), label: c.name }))}
          triggerClassName={triggerClassName}
          value={country || ""}
          onValueChange={(value) => {
            setCountry(value || "")
            setCity("") // Reset city when country changes
          }}
        />

        <SelectField
          label="City"
          placeholder="Select city"
          options={cities.map(c => ({ value: c.id.toString(), label: c.name }))}
          triggerClassName={triggerClassName}
          value={city || ""}
          onValueChange={(value) => setCity(value || "")}
        />
      </div>
    </div>
  )
}
