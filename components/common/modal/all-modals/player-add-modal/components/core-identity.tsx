import DatepickerField from "@/components/common/datepicker-field"
import ModalStepHeader from "@/components/common/modal-header"
import SelectField from "@/components/common/select-field"
import UploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import type { WizardState } from "../types"
import UiInput from "@/components/common/ui-input"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 text-sm text-white placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-[#0F1117] px-3 text-sm text-white data-placeholder:text-white/50 py-5! "

interface CoreIdentityFormData {
  profilePhotos: File[]
  firstName: string
  lastName: string
  dateOfBirth?: Date
  gender: string
  nationality: string
  email: string
  sport: string
  jerseyNumber: string
  dominantFoot: string
  clubTeam: string
}

type PhotoPreview = {
  id: string
  file: File
  url: string
}

export default function CoreIdentity({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["coreIdentity"]
  onDraftChange: (value: WizardState["forms"]["coreIdentity"]) => void
}) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([])
  const previewUrlsRef = useRef<string[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CoreIdentityFormData>({
    mode: "onBlur",
    defaultValues: {
      profilePhotos: [],
      firstName: draft.firstName,
      lastName: draft.lastName,
      dateOfBirth: draft.dateOfBirth ? new Date(draft.dateOfBirth) : undefined,
      gender: draft.gender,
      nationality: draft.nationality,
      email: draft.email,
      sport: draft.sport,
      jerseyNumber: draft.jerseyNumber,
      dominantFoot: draft.dominantFoot,
      clubTeam: draft.clubTeam,
    },
  })

  // Register fields controlled through setValue handlers.
  useEffect(() => {
    register("profilePhotos", {
      validate: (files) => files.length > 0 || "Photo is required",
    })
    register("dateOfBirth", { required: "Date of birth is required" })
    register("gender", { required: "Gender is required" })
    register("sport", { required: "Sport is required" })
    register("dominantFoot", { required: "Dominant foot is required" })
  }, [register])

  const dateOfBirth = watch("dateOfBirth")
  const gender = watch("gender")
  const sport = watch("sport")
  const dominantFoot = watch("dominantFoot")

  // Memoize the handler to prevent it from being recreated on every render
  const handleDraftChange = useCallback(
    (values: CoreIdentityFormData) => {
      onDraftChange({
        profilePhotoNames: photoPreviews.map((item) => item.file.name),
        profilePhotos: photoPreviews.map((item) => item.file),
        firstName: values.firstName ?? "",
        lastName: values.lastName ?? "",
        dateOfBirth: values.dateOfBirth
          ? new Date(values.dateOfBirth).toISOString()
          : undefined,
        gender: values.gender ?? "",
        nationality: values.nationality ?? "",
        email: values.email ?? "",
        sport: values.sport ?? "soccer",
        jerseyNumber: values.jerseyNumber ?? "",
        dominantFoot: values.dominantFoot ?? "",
        clubTeam: values.clubTeam ?? "",
      })
    },
    [onDraftChange, photoPreviews]
  )

  // Use a debounced approach to avoid updating during render phase
  useEffect(() => {
    const subscription = watch((values) => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Schedule update outside render phase using setTimeout
      timeoutRef.current = setTimeout(() => {
        handleDraftChange(values as CoreIdentityFormData)
      }, 0)
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [watch, handleDraftChange])

  const handlePhotoSelect = useCallback(
    (files: File[]) => {
      const nextPreviews = files.map((file, index) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${index}`,
        file,
        url: URL.createObjectURL(file),
      }))

      setPhotoPreviews((prev) => {
        const merged = [...prev, ...nextPreviews]
        // Only update form value, don't call onDraftChange here
        // It will be handled by the watch subscription
        setValue(
          "profilePhotos",
          merged.map((item) => item.file),
          { shouldValidate: true }
        )

        return merged
      })
    },
    [setValue]
  )

  const handlePhotoRemove = useCallback(
    (id: string) => {
      setPhotoPreviews((prev) => {
        const target = prev.find((item) => item.id === id)
        if (target) {
          URL.revokeObjectURL(target.url)
        }

        const next = prev.filter((item) => item.id !== id)
        setValue(
          "profilePhotos",
          next.map((item) => item.file),
          { shouldValidate: true }
        )

        return next
      })
    },
    [setValue]
  )

  useEffect(() => {
    previewUrlsRef.current = photoPreviews.map((item) => item.url)
  }, [photoPreviews])

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white">
      <ModalStepHeader
        title={"Add New Children"}
        subtitle={"Start by defining the athlete's core identity profile."}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 border-b-2 border-dashed border-white/20 pb-6">
        <UploadPhoto onFilesSelect={handlePhotoSelect} />
        {errors.profilePhotos && (
          <p className="mt-2 text-xs text-red-500">
            {errors.profilePhotos.message}
          </p>
        )}

        {photoPreviews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {photoPreviews.map((photo) => (
              <div
                key={photo.id}
                className="relative h-28 w-28 overflow-hidden rounded-lg border border-white/15 bg-[#0F1117]"
              >
                <Image
                  width={1000}
                  height={1000}
                  src={photo.url}
                  alt="Selected profile"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => handlePhotoRemove(photo.id)}
                  className="absolute top-1 right-1 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#DB0000] text-[10px] font-bold text-white"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 pb-3">
          <h3 className="text-[20px] leading-[120%] font-semibold text-white">
            Core Identity
          </h3>
          {/* <div className="h-px flex-1 border-b border-dashed border-white/15" /> */}
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
          <UiInput
            label="First Name"
            placeholder="Enter First Name"
            className={controlClassName}
            value={draft.firstName || ""}
            onChange={(e) => {
              setValue("firstName", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                firstName: e.target.value,
              })
            }}
          />

          <UiInput
            label="Last Name"
            placeholder="Enter Last Name"
            className={controlClassName}
            value={draft.lastName || ""}
            onChange={(e) => {
              setValue("lastName", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                lastName: e.target.value,
              })
            }}
          />

          <FieldGroup className="  flex-row">
            <Field>
              <FieldLabel htmlFor="date-picker-optional">Date of Birth</FieldLabel>
              <Popover  >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-optional"
                    className="w-32 py-5! justify-between font-normal  "
                  > 
                    {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                    <ChevronDownIcon />
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
                      setValue("dateOfBirth", date, { shouldValidate: true })
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field> 
          </FieldGroup>

          <SelectField
            label="Select Gender"
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            triggerClassName={triggerClassName}
            value={gender}
            onValueChange={(value) =>
              setValue("gender", value, { shouldValidate: true })
            }
            error={errors.gender?.message}
          />

          <UiInput
            label="Nationality"
            placeholder="Canada"
            className={controlClassName}
            value={draft.nationality || ""}
            onChange={(e) => {
              setValue("nationality", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                nationality: e.target.value,
              })
            }}
          />

          <UiInput
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            className={controlClassName}
            value={draft.email || ""}
            onChange={(e) => {
              setValue("email", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                email: e.target.value,
              })
            }}
          />

          <SelectField
            label="Sport Selection"
            placeholder="Select Sport"
            options={[{ value: "soccer", label: "Soccer" }]}
            triggerClassName={triggerClassName}
            value={sport}
            onValueChange={(value) =>
              setValue("sport", value, { shouldValidate: true })
            }
            error={errors.sport?.message}
          />

          <UiInput
            label="Jersey Number"
            placeholder="#"
            className={controlClassName}
            value={draft.jerseyNumber || ""}
            onChange={(e) => {
              setValue("jerseyNumber", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                jerseyNumber: e.target.value,
              })
            }}
            type="number"
          />

          <SelectField
            label="Dominant Foot (Right / Left)"
            placeholder="Select"
            options={[
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
            triggerClassName={triggerClassName}
            value={dominantFoot}
            onValueChange={(value) =>
              setValue("dominantFoot", value, { shouldValidate: true })
            }
            error={errors.dominantFoot?.message}
          />

          <UiInput
            label="Club / Team"
            placeholder="e.g. Toronto United"
            className={controlClassName}
            value={draft.clubTeam || ""}
            onChange={(e) => {
              setValue("clubTeam", e.target.value, { shouldValidate: true })
              onDraftChange({
                ...draft,
                clubTeam: e.target.value,
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
