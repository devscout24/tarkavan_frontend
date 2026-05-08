"use client"

import { useState, useEffect } from "react"
import InputField from "@/components/common/input-field"
import SelectField from "@/components/common/select-field"
import { getCountries, getCities } from "@/components/parentAndCoachApi/api/locations"
import type { Country, City } from "@/components/parentAndCoachApi/type"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDown } from "lucide-react"

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
  const { setValue } = useForm()
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
        } else {
          // Use mock data as fallback
          const mockCountries = [
            { id: 1, name: "USA", iso_code: "US" },
            { id: 2, name: "UK", iso_code: "GB" },
            { id: 3, name: "Canada", iso_code: "CA" },
            { id: 4, name: "Australia", iso_code: "AU" },
            { id: 5, name: "Germany", iso_code: "DE" },
            { id: 6, name: "France", iso_code: "FR" },
            { id: 7, name: "Japan", iso_code: "JP" },
            { id: 8, name: "Brazil", iso_code: "BR" }
          ]
          setCountries(mockCountries)
        }
      } catch (error) {
        // Use mock data as fallback
        const mockCountries = [
          { id: 1, name: "USA", iso_code: "US" },
          { id: 2, name: "UK", iso_code: "GB" },
          { id: 3, name: "Canada", iso_code: "CA" },
          { id: 4, name: "Australia", iso_code: "AU" },
          { id: 5, name: "Germany", iso_code: "DE" },
          { id: 6, name: "France", iso_code: "FR" },
          { id: 7, name: "Japan", iso_code: "JP" },
          { id: 8, name: "Brazil", iso_code: "BR" }
        ]
        setCountries(mockCountries)
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

    // Fetch cities from API immediately
    const fetchCities = async () => {
      try {
        const result = await getCities(selectedCountry.id)
        if (result.success && result.data) {
          setCities(result.data)
        } else {
          // Only use mock data if API completely fails
          const mockCities = getMockCitiesForCountry(selectedCountry.id)
          setCities(mockCities)
        }
      } catch (error) {
        // Only use mock data if API completely fails
        const mockCities = getMockCitiesForCountry(selectedCountry.id)
        setCities(mockCities)
      }
    }

    fetchCities()
  }, [country, countries])

  // Helper function to get mock cities based on country
  const getMockCitiesForCountry = (countryId: number) => {
    const citiesMap: Record<number, City[]> = {
      1: [ // USA
        { id: 1, country_id: 1, name: "New York City" },
        { id: 2, country_id: 1, name: "Los Angeles" },
        { id: 3, country_id: 1, name: "Chicago" },
        { id: 4, country_id: 1, name: "Houston" },
        { id: 5, country_id: 1, name: "Phoenix" }
      ],
      2: [ // UK
        { id: 6, country_id: 2, name: "London" },
        { id: 7, country_id: 2, name: "Manchester" },
        { id: 8, country_id: 2, name: "Birmingham" },
        { id: 9, country_id: 2, name: "Liverpool" },
        { id: 10, country_id: 2, name: "Glasgow" }
      ],
      3: [ // Canada
        { id: 11, country_id: 3, name: "Toronto" },
        { id: 12, country_id: 3, name: "Vancouver" },
        { id: 13, country_id: 3, name: "Montreal" },
        { id: 14, country_id: 3, name: "Calgary" },
        { id: 15, country_id: 3, name: "Ottawa" }
      ],
      4: [ // Australia
        { id: 16, country_id: 4, name: "Sydney" },
        { id: 17, country_id: 4, name: "Melbourne" },
        { id: 18, country_id: 4, name: "Brisbane" },
        { id: 19, country_id: 4, name: "Perth" },
        { id: 20, country_id: 4, name: "Adelaide" }
      ],
      5: [ // Germany
        { id: 21, country_id: 5, name: "Berlin" },
        { id: 22, country_id: 5, name: "Munich" },
        { id: 23, country_id: 5, name: "Hamburg" },
        { id: 24, country_id: 5, name: "Frankfurt" },
        { id: 25, country_id: 5, name: "Cologne" }
      ],
      6: [ // France
        { id: 26, country_id: 6, name: "Paris" },
        { id: 27, country_id: 6, name: "Lyon" },
        { id: 28, country_id: 6, name: "Marseille" },
        { id: 29, country_id: 6, name: "Toulouse" },
        { id: 30, country_id: 6, name: "Nice" }
      ],
      7: [ // Japan
        { id: 31, country_id: 7, name: "Tokyo" },
        { id: 32, country_id: 7, name: "Osaka" },
        { id: 33, country_id: 7, name: "Kyoto" },
        { id: 34, country_id: 7, name: "Yokohama" },
        { id: 35, country_id: 7, name: "Nagoya" }
      ],
      8: [ // Brazil
        { id: 36, country_id: 8, name: "São Paulo" },
        { id: 37, country_id: 8, name: "Rio de Janeiro" },
        { id: 38, country_id: 8, name: "Brasília" },
        { id: 39, country_id: 8, name: "Salvador" },
        { id: 40, country_id: 8, name: "Fortaleza" }
      ]
    }
    return citiesMap[countryId] || []
  }

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
          placeholder="Select Country"
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
