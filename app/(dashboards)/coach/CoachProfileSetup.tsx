import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import CountryCitySelector from "@/components/common/country-city-selector"
import CommonBtn from "@/components/common/common-btn"
import { BsArrowRight } from "react-icons/bs"
import { FiCheckSquare, FiSquare } from "react-icons/fi"
import { Input as ShadInput } from "@/components/ui/input"
import Image from "next/image"
import { Icon } from "@/components/custom/Icon"
import { CiImageOn } from "react-icons/ci"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCoachPositions } from "@/components/parentAndCoachApi/api/coachPositions"
import { getSportOptions } from "@/components/parentAndCoachApi/api/sportOptions"
import type {
  CoachPosition,
  SportOption,
} from "@/components/parentAndCoachApi/type"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import {
  createOrUpdateCoachProfile,
  convertToFormData,
} from "@/components/parentAndCoachApi/api/coachProfile"
import type {
  CoachProfileFormData,
  CoachProfileApiResult,
} from "@/components/parentAndCoachApi/type/coachProfileTypes"
import { getCoachEditData } from "./action"
import { handleLogout } from "@/lib/helpers"
import { useRouter } from "next/navigation" 
import useModal from "@/components/common/modal/useModal"

interface CoachProfileSetupProps {
  currentStep?: number
  updatePhotoUploaded?: (uploaded: boolean) => void
  updateBasicInfo?: (info: unknown) => void
  isEditMode?: boolean
}

const getInitialFormData = (): CoachProfileFormData => ({
  name: "",
  last_name: "",
  dob: "",
  gender: "male",
  nationality: "",
  email: "",
  sports: "",
  current_role: "",
  years_of_experience: "",
  highest_education: "",
  coaching_education: "",
  coaching_philosophy: "",
  player_centric_approach: false,
  data_driving_training: false,
  coaching_title: ["", ""],
  images: [],
  privacy_settings: {
    visible_reviews: true,
    allow_parent_player_reviews: true,
  },
  city: "",
  country: "",
  facebook_link: "",
  twitter_link: "",
  instagram_link: "",
  tiktok_link: "",
  whatsapp_link: "",
})

export default function CoachProfileSetup({
  currentStep,
  updatePhotoUploaded,
  updateBasicInfo,
  isEditMode = false,
}: CoachProfileSetupProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [initialPreview, setInitialPreview] = useState<string | null>(null)
  const { close  } = useModal()

  // --- Upload Photo state ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")

  // --- Date picker ---
  const { setValue } = useForm()
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>()

  const [formData, setFormData] =
    useState<CoachProfileFormData>(getInitialFormData)

  // For edit mode
  const [editData, setEditData] = useState<any>(null)
  const [isEditDataLoaded, setIsEditDataLoaded] = useState(false)

  // Initialize dateOfBirth from formData.dob
  useEffect(() => {
    if (formData.dob) {
      const d =
        typeof formData.dob === "string" ? new Date(formData.dob) : undefined
      setDateOfBirth(d)
      if (d) setValue("dateOfBirth", d, { shouldValidate: true })
    }
  }, [formData.dob, setValue])

  // initialize upload preview when initialPreview changes
  useEffect(() => {
    if (initialPreview) {
      setPreviewUrl(initialPreview)
      setFileName(initialPreview.split("/").pop() || "")
    }
  }, [initialPreview])

  // --- Sports & Specialties ---
  const triggerClassName =
    "h-11 w-full rounded-xl border-white/10 bg-secondary/10 px-3 text-sm text-white data-placeholder:text-white/50"

  const titleInputClassName =
    "h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

  const [titleInput, setTitleInput] = useState("")
  const [sportOptions, setSportOptions] = useState<SportOption[]>([])
  const [roleOptions, setRoleOptions] = useState<CoachPosition[]>([])
  const [formattedSportOptions, setFormattedSportOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [formattedRoleOptions, setFormattedRoleOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)

  // --- Credentials ---
  type CredentialFile = { id: string; name: string; sizeMb: string }
  const [credFiles, setCredFiles] = useState<CredentialFile[]>([])
  const credInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sportsResult, positionsResult] = await Promise.all([
          getSportOptions(),
          getCoachPositions(),
        ])

        if (sportsResult.success && sportsResult.data) {
          const formattedSports = sportsResult.data.map((s) => ({
            value: s.id.toString(),
            label: s.name,
          }))
          setSportOptions(sportsResult.data)
          setFormattedSportOptions(formattedSports)
        }

        if (
          positionsResult &&
          "success" in positionsResult &&
          positionsResult.success &&
          positionsResult.data
        ) {
          const formattedPositions = positionsResult.data.map((p: any) => ({
            value: p.id.toString(),
            label: p.name,
          }))
          setRoleOptions(positionsResult.data)
          setFormattedRoleOptions(formattedPositions)
        }
      } catch (error) {
        console.error("Failed to fetch sport/role options:", error)
      } finally {
        setIsLoadingOptions(false)
      }
    }

    fetchData()
  }, [])

  const addTitle = () => {
    const normalized = titleInput.trim().replace(/\s+/g, " ")
    if (!normalized) return

    const exists = formData.coaching_title?.some(
      (t) => t?.toLowerCase() === normalized.toLowerCase()
    )

    if (!exists) {
      const next = [...(formData.coaching_title || []), normalized]
      setFormData((prev) => ({ ...prev, coaching_title: next }))
    }

    setTitleInput("")
  }

  const removeTitle = (titleToRemove: string) => {
    const next =
      formData.coaching_title?.filter((t) => t !== titleToRemove) || []
    setFormData((prev) => ({ ...prev, coaching_title: next }))
  }

  useEffect(() => {
    const getCaochProfileData = async () => {
      try {
        const res = await getCoachEditData()
        type CoachEditPayload = {
          name?: string
          last_name?: string
          dob?: string
          gender?: string
          nationality?: string
          email?: string
          sports?: string
          current_role?:
            | string
            | number
            | { id?: number | string; name?: string; value?: number | string }
          years_of_experience?: string
          highest_education?: string
          coaching_education?: string
          coaching_philosophy?: string
          player_centric_approach?: boolean
          data_driving_training?: boolean
          coaching_titles?: Array<{ title?: string }>
          city?: string
          country?: string
          facebook_link?: string
          twitter_link?: string
          instagram_link?: string
          tiktok_link?: string
          whatsapp_link?: string
          coach_profile_pic?: string
        }

        if (
          res &&
          typeof res === "object" &&
          "data" in res &&
          res.data &&
          typeof res.data === "object" &&
          "data" in res.data &&
          res.data.data
        ) {
          const d = res.data.data as CoachEditPayload
          setEditData(d)

          if (d.coach_profile_pic) {
            try {
              const { resolveAssetUrl } = await import("@/lib/url-utils")
              const preview = resolveAssetUrl(d.coach_profile_pic)
              setInitialPreview(preview)
            } catch {
              // ignore
            }
          }
        }
      } catch (error) {
        console.error("Error fetching coach profile data:", error)
      }
    }
    getCaochProfileData()
  }, [])

  // Set formData from editData when options are loaded
  useEffect(() => {
    if (editData && sportOptions.length > 0 && roleOptions.length > 0) {
      const currentRoleValue = (() => {
        if (typeof editData.current_role === "string") {
          const directMatch = roleOptions.find(
            (role) => role.id.toString() === editData.current_role
          )
          if (directMatch) return directMatch.id.toString()

          const nameMatch = roleOptions.find(
            (role) => role.name === editData.current_role
          )
          return nameMatch ? nameMatch.id.toString() : editData.current_role
        }

        if (typeof editData.current_role === "number") {
          return String(editData.current_role)
        }

        if (
          editData.current_role &&
          typeof editData.current_role === "object"
        ) {
          const currentRoleId =
            editData.current_role.id ?? editData.current_role.value
          if (currentRoleId !== undefined && currentRoleId !== null) {
            return String(currentRoleId)
          }

          const roleName = editData.current_role.name
          const nameMatch = roleName
            ? roleOptions.find((role) => role.name === roleName)
            : undefined
          return nameMatch ? nameMatch.id.toString() : ""
        }

        return ""
      })()

      setFormData((prev) => ({
        ...prev,
        name: editData.name || "",
        last_name: editData.last_name || "",
        dob: editData.dob || "",
        gender: editData.gender || "male",
        nationality: editData.nationality || "",
        email: editData.email || "",
        sports: editData.sports || "",
        current_role: currentRoleValue,
        years_of_experience: editData.years_of_experience || "",
        highest_education: editData.highest_education || "",
        coaching_education: editData.coaching_education || "",
        coaching_philosophy: editData.coaching_philosophy || "",
        player_centric_approach: editData.player_centric_approach || false,
        data_driving_training: editData.data_driving_training || false,
        coaching_title: editData.coaching_titles
          ? editData.coaching_titles.map(
              (t: { title?: string }) => t.title || ""
            )
          : ["", ""],
        city: editData.city || "",
        country: editData.country || "",
        facebook_link: editData.facebook_link || "",
        twitter_link: editData.twitter_link || "",
        instagram_link: editData.instagram_link || "",
        tiktok_link: editData.tiktok_link || "",
        whatsapp_link: editData.whatsapp_link || "",
        privacy_settings: editData.privacy_settings || prev.privacy_settings,
      }))
    }
  }, [editData, sportOptions, roleOptions])

  // Mark edit data as loaded
  useEffect(() => {
    if (editData && sportOptions.length > 0 && roleOptions.length > 0) {
      setIsEditDataLoaded(true)
    }
  }, [editData, sportOptions, roleOptions])

  // Check and update user status from coach profile API
  useEffect(() => {
    const checkCoachProfile = async () => {
      try {
        const token = localStorage.getItem("go_elite_token")
        const rawUser = localStorage.getItem("go_elite_user")

        if (!token || !rawUser) return

        const user = JSON.parse(rawUser)

        // Only check if user is currently "pending"
        if (user.status === "pending") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "https://tarkavan.thenightowl.team/api"}/coach/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )

          if (response.ok) {
            const data = await response.json()

            if (data.data?.user_status === "approve") {
              const updatedUser = { ...user, status: "approved" }
              localStorage.setItem("go_elite_user", JSON.stringify(updatedUser))
            }
          }
        }
      } catch (error) {
        console.error("ERROR CHECKING COACH PROFILE:", error)
      }
    }

    checkCoachProfile()
  }, [])

  // Validation function

  // Handle form submission with the latest form state
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()
      setIsLoading(true)

      try {
        const apiFormData = convertToFormData(formData)

        const result: CoachProfileApiResult =
          await createOrUpdateCoachProfile(apiFormData)
        console.log("API result:", result)

        if (result.success) {
          toast.success(
            result.message || isEditMode ? "Coach profile updated successfully!" :
              "Coach profile created successfully! Please wait for approval."
          )
          setFormData(getInitialFormData())

          if(!isEditMode) { 
            handleLogout(router)
          }

          window.dispatchEvent(new Event("coachProfileUpdated"))
          
          // close modal if in edit mode
          if (isEditMode) { 
            close("edit-coach-profile")
          }

        } else {
          toast.error(result.message || "Failed to create coach profile")
        }
      } catch (err) {
        console.log("Error submitting coach profile:", err)
        toast.error("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    },
    [formData, router]
  )

  return (
    <section className="bg-primary">
      <div className="space-y-4 rounded-[16px] bg-primary p-4 sm:p-6">
        <div className="text-white">
          <div className="space-y-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[28px] leading-[120%] font-semibold text-white">
                Coach Profile Setup
              </h2>
            </div>
            <p className="text-[22px] leading-[140%] text-[#D9D9D9]">
              Complete your profile to join the elite coaching network.
            </p>
          </div>
        </div>

        <div className="rounded-[16px] bg-secondary/20 p-4">
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Upload Photo</h3>
              <p className="mt-1 text-sm text-white/70">
                Add a clear profile photo to help players and parents identify
                you.
              </p>

              <div className="mt-4 pb-5">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex w-full flex-col items-center justify-center gap-2 border-white/20 bg-transparent py-10 text-white hover:border-white/40 hover:bg-white/10"
                    onClick={() =>
                      document.getElementById("profile-pic-input")?.click()
                    }
                  >
                    <CiImageOn className="text-5xl!" />
                    <p className="text-xs text-white/70">
                      Upload JPG, PNG or WEBP up to 5MB
                    </p>
                  </Button>
                  <input
                    id="profile-pic-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setSelectedFile(file)
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () =>
                          setPreviewUrl(reader.result as string)
                        reader.readAsDataURL(file)
                        setFileName(file.name)
                        setFormData((prev) => ({
                          ...prev,
                          coach_profile_pic: file,
                        }))
                        if (updatePhotoUploaded) updatePhotoUploaded(true)
                      } else {
                        setPreviewUrl("")
                        setFileName("")
                        setFormData((prev) => ({
                          ...prev,
                          coach_profile_pic: undefined,
                        }))
                        if (updatePhotoUploaded) updatePhotoUploaded(false)
                      }
                    }}
                  />
                </div>
              </div>

              {previewUrl ? (
                <div className="mt-5 flex items-center justify-center">
                  <div className="group relative">
                    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/40 bg-white/5 p-1 transition-all duration-200 hover:border-white/60 hover:bg-white/10">
                      <div
                        className="relative overflow-hidden rounded-xl"
                        style={{ width: 120, height: 120 }}
                      >
                        <Image
                          src={previewUrl}
                          alt="Selected coach profile"
                          fill
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          sizes="120px"
                          priority
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl("")
                        setFileName("")
                        setFormData((prev) => ({
                          ...prev,
                          coach_profile_pic: undefined,
                        }))
                        if (updatePhotoUploaded) updatePhotoUploaded(false)
                      }}
                      className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-red-700"
                    >
                      <Icon
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        className="pointer-events-none"
                      >
                        <line
                          x1="4"
                          y1="4"
                          x2="12"
                          y2="12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="12"
                          y1="4"
                          x2="4"
                          y2="12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </Icon>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl text-white">
              <div className="pb-4">
                <h3 className="text-lg font-semibold text-white">
                  Basic Information
                </h3>
                <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
              </div>
              <p className="mt-2 text-sm text-white/70">
                Complete your personal details to build your coach profile.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    First Name
                  </label>
                  <ShadInput
                    value={formData.name}
                    onChange={(e) => {
                      const v = e.target.value
                      setFormData((prev) => ({ ...prev, name: v }))
                      if (updateBasicInfo)
                        updateBasicInfo({ ...formData, firstName: v })
                    }}
                    placeholder="Enter first name"
                    className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Last Name
                  </label>
                  <ShadInput
                    value={formData.last_name}
                    onChange={(e) => {
                      const v = e.target.value
                      setFormData((prev) => ({ ...prev, last_name: v }))
                      if (updateBasicInfo)
                        updateBasicInfo({ ...formData, lastName: v })
                    }}
                    placeholder="Enter last name"
                    className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex w-full flex-col">
                    <label className="text-sm font-medium text-white">
                      Date of Birth
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date-picker-optional"
                          className="w-full justify-between py-5! font-normal"
                        >
                          {dateOfBirth
                            ? format(dateOfBirth, "PPP")
                            : "Select date"}
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
                          onSelect={(d) => {
                            setDateOfBirth(d as Date)
                            setValue("dateOfBirth", d, { shouldValidate: true })
                            setFormData((prev) => ({
                              ...prev,
                              dob: d ? d.toISOString().split("T")[0] : "",
                            }))
                            if (updateBasicInfo)
                              updateBasicInfo({ ...formData, dateOfBirth: d })
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Select Gender
                  </label>
                  <Select
                    value={formData.gender || ""}
                    onValueChange={(v) => {
                      const vv = v || ""
                      const vvNorm =
                        vv === "male" || vv === "female" || vv === "other"
                          ? (vv as "male" | "female" | "other")
                          : "male"
                      setFormData((prev) => ({ ...prev, gender: vvNorm }))
                      if (updateBasicInfo)
                        updateBasicInfo({ ...formData, gender: vvNorm })
                    }}
                  >
                    <SelectTrigger className={`${triggerClassName} py-5!`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary/90 text-white">
                      <SelectItem value="male" className="text-white">
                        Male
                      </SelectItem>
                      <SelectItem value="female" className="text-white">
                        Female
                      </SelectItem>
                      <SelectItem value="other" className="text-white">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Nationality
                  </label>
                  <ShadInput
                    value={formData.nationality}
                    onChange={(e) => {
                      const v = e.target.value
                      setFormData((prev) => ({ ...prev, nationality: v }))
                      if (updateBasicInfo)
                        updateBasicInfo({ ...formData, nationality: v })
                    }}
                    placeholder="Enter nationality"
                    className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Email Address
                  </label>
                  <ShadInput
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      const v = e.target.value
                      setFormData((prev) => ({ ...prev, email: v }))
                      if (updateBasicInfo)
                        updateBasicInfo({ ...formData, email: v })
                    }}
                    placeholder="Enter email address"
                    className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="mt-4">
                <CountryCitySelector
                  onSelect={(data) => {
                    const c = data.country_name
                    const ci = data.city_name
                    setFormData((prev) => ({ ...prev, country: c, city: ci }))
                    if (updateBasicInfo)
                      updateBasicInfo({ ...formData, country: c, city: ci })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <h3 className="pb-4 text-lg font-semibold text-white">
            Sports & Specialties
          </h3>
          <div className="mt-1 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-white">
                Sport Selection
              </label>
              <Select
                value={formData.sports}
                onValueChange={(v) => {
                  setFormData((prev) => ({ ...prev, sports: v }))
                }}
              >
                <SelectTrigger className={`${triggerClassName} py-5!`}>
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-secondary/90 text-white"
                >
                  {formattedSportOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Coaching Titles
              </label>

              {formData.coaching_title?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.coaching_title.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => removeTitle(title)}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white transition-colors hover:bg-white/20"
                    >
                      {title}
                      <span aria-hidden="true">x</span>
                    </button>
                  ))}
                </div>
              ) : null}

              <ShadInput
                value={titleInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitleInput(event.target.value)
                }
                onBlur={addTitle}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addTitle()
                  }
                }}
                placeholder="Add a title (e.g. Performance Specialist)"
                className={titleInputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Role Selection
              </label>
              <Select
                value={formData.current_role}
                onValueChange={(v) => {
                  setFormData((prev) => ({ ...prev, current_role: v }))
                }}
              >
                <SelectTrigger className={`${triggerClassName} py-5!`}>
                  <SelectValue placeholder="Select Current Role" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-secondary/90 text-white"
                >
                  {formattedRoleOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-white">
              Experience &amp; Education
            </h3>
            <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Years of Experience
              </label>
              <Select
                value={formData.years_of_experience}
                onValueChange={(v) => {
                  setFormData((prev) => ({ ...prev, years_of_experience: v }))
                }}
              >
                <SelectTrigger className={`${triggerClassName} py-5!`}>
                  <SelectValue placeholder="Select experience range" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-secondary/90 text-white"
                >
                  <SelectItem
                    value="1-3"
                    className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                  >
                    1-3 years
                  </SelectItem>
                  <SelectItem
                    value="4-6"
                    className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                  >
                    4-6 years
                  </SelectItem>
                  <SelectItem
                    value="7-10"
                    className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                  >
                    7-10 years
                  </SelectItem>
                  <SelectItem
                    value="10+"
                    className="text-white hover:bg-brand hover:text-primary focus:bg-brand focus:text-primary"
                  >
                    10+ years
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Highest Education Degree
              </label>
              <ShadInput
                value={formData.highest_education}
                onChange={(e) => {
                  const v = e.target.value
                  setFormData((prev) => ({ ...prev, highest_education: v }))
                }}
                placeholder="e.g. M.S. in Sports Science"
                className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Coaching History Summary
              </label>
              <textarea
                value={formData.coaching_education}
                onChange={(e) => {
                  const v = e.target.value
                  setFormData((prev) => ({ ...prev, coaching_education: v }))
                }}
                placeholder="Briefly describe your coaching career journey..."
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-secondary/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-white">
              Credentials &amp; Certifications
            </h3>
            <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
          </div>

          <button
            type="button"
            onClick={() => credInputRef.current?.click()}
            className="mt-1 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-secondary/10 px-6 py-8 text-center transition-colors hover:bg-secondary/20"
          >
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-white/15">
              {/* upload cloud icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.875 20C4.97917 20 3.35938 19.3438 2.01562 18.0312C0.671875 16.7188 0 15.1146 0 13.2188C0 11.5938 0.489583 10.1458 1.46875 8.875C2.44792 7.60417 3.72917 6.79167 5.3125 6.4375C5.83333 4.52083 6.875 2.96875 8.4375 1.78125C10 0.59375 11.7708 0 13.75 0C16.1875 0 18.2552 0.848958 19.9531 2.54688C21.651 4.24479 22.5 6.3125 22.5 8.75C23.9375 8.91667 25.1302 9.53646 26.0781 10.6094C27.026 11.6823 27.5 12.9375 27.5 14.375C27.5 15.9375 26.9531 17.2656 25.8594 18.3594C24.7656 19.4531 23.4375 20 21.875 20H15C14.3125 20 13.724 19.7552 13.2344 19.2656C12.7448 18.776 12.5 18.1875 12.5 17.5V11.0625L10.5 13L8.75 11.25L13.75 6.25L18.75 11.25L17 13L15 11.0625V17.5H21.875C22.75 17.5 23.4896 17.1979 24.0938 16.5938C24.6979 15.9896 25 15.25 25 14.375C25 13.5 24.6979 12.7604 24.0938 12.1562C23.4896 11.5521 22.75 11.25 21.875 11.25H20V8.75C20 7.02083 19.3906 5.54688 18.1719 4.32812C16.9531 3.10938 15.4792 2.5 13.75 2.5C12.0208 2.5 10.5469 3.10938 9.32812 4.32812C8.10938 5.54688 7.5 7.02083 7.5 8.75H6.875C5.66667 8.75 4.63542 9.17708 3.78125 10.0312C2.92708 10.8854 2.5 11.9167 2.5 13.125C2.5 14.3333 2.92708 15.3646 3.78125 16.2188C4.63542 17.0729 5.66667 17.5 6.875 17.5H10V20H6.875Z"
                  fill="white"
                />
              </svg>
            </span>
            <p className="text-[27px] leading-[120%] font-medium text-white">
              Upload Certification Files
            </p>
            <p className="mt-1 text-[20px] leading-[120%] text-white/55">
              PDF, JPG, or PNG up to 10MB
            </p>
          </button>

          <input
            ref={credInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg"
            multiple
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files
              if (!selected) return
              const next = Array.from(selected).map((file, index) => ({
                id: `${file.name}-${file.size}-${index}-${Date.now()}`,
                name: file.name,
                sizeMb: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              }))
              const updated = [...credFiles, ...next]
              setCredFiles(updated)
              setFormData((prev) => ({ ...prev, images: updated as any[] }))
            }}
          />

          <div className="mt-4 space-y-2">
            {credFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-md border border-white/8 bg-secondary/10 px-3 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9ZM2 2V7V2V7V18V2Z"
                    fill="white"
                  />
                </svg>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[21px] leading-[120%] text-white">
                    {file.name}
                  </p>
                  <p className="text-[18px] leading-[120%] text-white/55">
                    {file.sizeMb}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = credFiles.filter((f) => f.id !== file.id)
                    setCredFiles(updated)
                    setFormData((prev) => ({
                      ...prev,
                      images: updated as any[],
                    }))
                  }}
                  className="shrink-0 rounded p-1 text-white/75 transition-colors hover:text-white"
                  aria-label="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14ZM3 3V16V3Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-white">
              Social Media Links
            </h3>
            <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                key: "facebook_link",
                label: "Facebook Profile",
                placeholder: "https://facebook.com/yourprofile",
                Icon: null,
              },
              {
                key: "twitter_link",
                label: "Twitter Profile",
                placeholder: "https://twitter.com/yourprofile",
                Icon: null,
              },
              {
                key: "instagram_link",
                label: "Instagram Profile",
                placeholder: "https://instagram.com/yourprofile",
                Icon: null,
              },
              {
                key: "tiktok_link",
                label: "TikTok Profile",
                placeholder: "https://tiktok.com/@yourprofile",
                Icon: null,
              },
              {
                key: "whatsapp_link",
                label: "WhatsApp Number",
                placeholder: "+1234567890",
                Icon: null,
              },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white">
                  {label}
                </label>
                <ShadInput
                  value={(formData as any)[key] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="h-11 rounded-xl border border-white/10 bg-secondary/10 px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-secondary/20 p-5 text-white md:p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-white">
              Coaching Philosophy
            </h3>
            <div className="mt-3 h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_12px,transparent_12px,transparent_22px)]" />
          </div>

          <p className="mt-1 text-sm text-white/85">
            Explain your core values and how you approach athlete development.
          </p>

          <textarea
            value={formData.coaching_philosophy}
            onChange={(e) => {
              const v = e.target.value
              setFormData((prev) => ({ ...prev, coaching_philosophy: v }))
            }}
            rows={4}
            placeholder="My philosophy centers on mental resilience and technical precision..."
            className="mt-3 w-full rounded-xl border border-white/10 bg-secondary/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:outline-none"
          />

          <div className="mt-4 flex flex-wrap items-center gap-5">
            <div
              role="checkbox"
              aria-checked={formData.player_centric_approach}
              tabIndex={0}
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/90 select-none"
              onClick={(e) => {
                e.stopPropagation()
                const next = !formData.player_centric_approach
                setFormData((prev) => ({
                  ...prev,
                  player_centric_approach: next,
                }))
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault()
                  setFormData((prev) => ({
                    ...prev,
                    player_centric_approach: !prev.player_centric_approach,
                  }))
                }
              }}
            >
              {formData.player_centric_approach ? (
                <FiCheckSquare className="size-4 text-white" />
              ) : (
                <FiSquare className="size-4 text-white/90" />
              )}
              <span>Player-centric approach</span>
            </div>

            <div
              role="checkbox"
              aria-checked={formData.data_driving_training}
              tabIndex={0}
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/90 select-none"
              onClick={(e) => {
                e.stopPropagation()
                const next = !formData.data_driving_training
                setFormData((prev) => ({
                  ...prev,
                  data_driving_training: next,
                }))
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault()
                  setFormData((prev) => ({
                    ...prev,
                    data_driving_training: !prev.data_driving_training,
                  }))
                }
              }}
            >
              {formData.data_driving_training ? (
                <FiCheckSquare className="size-4 text-white" />
              ) : (
                <FiSquare className="size-4 text-white/90" />
              )}
              <span>Data-driven training</span>
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-white/10" />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <CommonBtn
              variant="outline"
              size="lg"
              text="Back"
              className="h-12 w-24 border border-brand bg-transparent px-4 text-sm font-medium text-brand hover:bg-brand/10"
            />

            <CommonBtn
              variant="default"
              size="lg"
              text={
                isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Submitting..."
                  : isEditMode
                    ? "Update Profile"
                    : "Finish & Create Profile"
              }
              className="h-12 w-60 rounded-xl bg-brand px-5 text-sm font-semibold text-primary hover:border hover:border-secondary hover:bg-transparent hover:text-white"
              iconRight={<BsArrowRight className="size-4" />}
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading || (isEditMode && !isEditDataLoaded)}
            />
          </div>
        </section>
      </div>
    </section>
  )
}
