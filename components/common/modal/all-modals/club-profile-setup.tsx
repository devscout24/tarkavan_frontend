"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import UploadPhoto from "@/components/custom/coach-profile-setup/UploadPhoto"
import { Textarea } from "@/components/ui/textarea"
import UiInput from "../../ui-input"
import {
  getOrganizationsTypes,
  getSportOptions,
} from "@/app/(dashboards)/action"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { clubProfileSetup } from "@/app/(dashboards)/club/action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const maxDescriptionLength = 300

export default function ClubProfileSetup() {
  const router = useRouter()
  const [sports, setSports] = useState<Array<{ id: number; name: string }>>([])
  const [selectedSportId, setSelectedSportId] = useState("")
  const [organizationTypes, setOrganizationTypes] = useState<
    Array<{ id: number; name: string }>
  >([])
  const [selectedOrganizationTypeIds, setSelectedOrganizationTypeIds] =
    useState<number[]>([])
  const [clubName, setClubName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [provinceState, setProvinceState] = useState("")
  const [country, setCountry] = useState("")
  const [clubLogo, setClubLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState(
    "Premier youth soccer development club focused on building champions on and off the field."
  )

  const toggleOrganizationType = (organizationTypeId: number) => {
    setSelectedOrganizationTypeIds((prev) =>
      prev.includes(organizationTypeId)
        ? prev.filter((item) => item !== organizationTypeId)
        : [...prev, organizationTypeId]
    )
  }

  useEffect(() => {
    async function loadData() {
      const results = await Promise.allSettled([
        getSportOptions(), // sport 0 idx
        getOrganizationsTypes(), // organization types 1 idx
      ])

      if (results[0].status === "fulfilled") {
        setSports(results[0].value?.data?.data ?? [])
      }

      if (results[1].status === "fulfilled") {
        setOrganizationTypes(results[1].value?.data?.data ?? [])
      }
    }

    loadData()
  }, [])

  const handleProfileSetup = async () => {
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("club_name", clubName)
      formData.append("email", email)

      const selectedSport = sports.find(
        (sport) => String(sport.id) === selectedSportId
      )

      formData.append("sports_name", selectedSport?.name ?? selectedSportId)

      formData.append("city", city)
      formData.append("state", provinceState)
      formData.append("country", country)
      formData.append("club_description", description)

      selectedOrganizationTypeIds.forEach((organizationTypeId, index) => {
        formData.append(
          `organization_type_id[${index}]`,
          String(organizationTypeId)
        )
      })

      formData.append("privacy_settings", "public")

      const storedUser = localStorage.getItem("go_elite_user")
      const parsedUser = storedUser ? JSON.parse(storedUser) : null

      if (parsedUser?.id) {
        formData.append("club_id", String(parsedUser.id))
      }

      if (clubLogo) {
        formData.append("club_logo", clubLogo)
      }

      const res = await clubProfileSetup(formData)
      

      if (!res.success) {
        toast.error(res.message)
        return
      }
      
      const user = localStorage.getItem("go_elite_user") ? JSON.parse(localStorage.getItem("go_elite_user") as string) : null;
      if (user) {
        user.status = "approve";
        localStorage.setItem("go_elite_user", JSON.stringify(user));
      }


      toast.success("Club profile submitted successfully")

      // set user status approved to true in localStorage
      if (parsedUser) {
        const updatedUser = { ...parsedUser, status: "approve" }
        localStorage.setItem("go_elite_user", JSON.stringify(updatedUser))
        localStorage.setItem(`profile_completed_${parsedUser.id}`, "true")
      } 
      router.replace("/club")

    } catch (err) {
      console.error(err)
      toast.error("Unable to submit club profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-primary">
      <div className="space-y-4 rounded-[16px] bg-secondary/20 p-4 sm:p-6">
        {/* club profile set header */}
        <div className="text-white">
          <div className="space-y-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[28px] leading-[120%] font-semibold text-white">
                Club Profile Setup
              </h2>
            </div>

            <p className="text-[22px] leading-[140%] text-[#D9D9D9]">
              Complete your profile to join the elite coaching network.
            </p>
          </div>
        </div>
        <UploadPhoto
          updatePhotoUploaded={() => {}}
          onFileSelect={setClubLogo}
        />

        <h2 className="border-b border-b-secondary text-xl font-bold text-white">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UiInput
            label="Club Name"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Canada Strikers FC"
            value={clubName}
            onChange={(event) => setClubName(event.target.value)}
          />
          <UiInput
            label="Email Address"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. info@canadastrikersfc.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="mt-1.5 space-y-2">
            <label className="text-sm text-[#D9D9D9]">Sport Selection</label>
            <Select value={selectedSportId} onValueChange={setSelectedSportId}>
              <SelectTrigger className="w-full rounded-md border-white/10 bg-[#2B2E36] py-6 text-white placeholder:text-white/50">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="border-white/10 bg-secondary text-white"
              >
                {sports.map((sport) => (
                  <SelectItem
                    className="hover:bg-brand!"
                    key={sport.id}
                    value={String(sport.id)}
                  >
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <UiInput
            label="City"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Toronto"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <UiInput
            label="Province / State"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Ontario"
            value={provinceState}
            onChange={(event) => setProvinceState(event.target.value)}
          />
          <UiInput
            label="Country"
            labelClass="text-sm text-[#D9D9D9]"
            placeholder="e.g. Canada"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>

        {/* organization type */}
        <div className="rounded-2xl border border-white/10 bg-[#131722]/10 p-4 sm:p-5">
          <h3 className="border-b border-dashed border-white/10 pb-3 text-xl leading-[120%] font-semibold text-white">
            Organization Type
          </h3>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {organizationTypes.map((organizationType) => {
              const isSelected = selectedOrganizationTypeIds.includes(
                organizationType.id
              )

              return (
                <button
                  key={organizationType.id}
                  type="button"
                  onClick={() => toggleOrganizationType(organizationType.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[#B6F36A] text-[#111111]"
                      : "bg-[#2B2E36] text-[#D9D9D9]"
                  }`}
                >
                  {organizationType.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Club Overview */}
        <div className="rounded-[24px] bg-[#1A1A1A]/40 px-5 py-6 text-white sm:px-8 sm:py-7">
          <h3 className="text-xl leading-[120%] font-semibold text-white">
            Club Overview
          </h3>

          <div className="mt-3 border-t border-dashed border-white/15" />

          <div className="mt-5 space-y-3">
            <label className="block text-[18px] leading-[140%] text-white">
              Club Description
            </label>

            <Textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value.slice(0, maxDescriptionLength)
                )
              }
              placeholder="Premier youth soccer development club focused on building champions on and off the field."
              className="min-h-23.5 rounded-md border-white/10 bg-transparent px-3 py-3 text-base text-white placeholder:text-white/25 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <p className="text-right text-sm text-white/80">
              {description.length}/{maxDescriptionLength} characters
            </p>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleProfileSetup}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#B6F36A] px-5 py-3 text-sm font-semibold text-[#111111] transition-opacity hover:opacity-90"
              >
                {loading ? "Submitting..." : "Finish & Create Profile"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
