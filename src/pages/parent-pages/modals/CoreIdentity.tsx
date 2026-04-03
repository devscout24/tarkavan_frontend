import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import {
  DatepickerField,
  InputField,
  SelectField,
  StepActions,
  UploadPhoto,
} from "@/pages/parent-pages/modal_common"

const titleClassName = "text-white  text-[20px] font-bold leading-[150%]"

const subtitleClassName =
  "text-white/80  text-[14px] font-normal leading-[150%]"

const controlClassName =
  "h-11 rounded-xl border border-white/10 bg-[#0F1117] px-3 text-sm text-white placeholder:text-secondary/40 focus-visible:border-brand focus-visible:ring-0"

const triggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-[#0F1117] px-3 text-sm text-white data-placeholder:text-secondary/40"

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

export default function CoreIdentity() {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([])
  const previewUrlsRef = useRef<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CoreIdentityFormData>({
    mode: "onBlur",
    defaultValues: {
      profilePhotos: [],
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: "",
      nationality: "",
      email: "",
      sport: "soccer",
      jerseyNumber: "",
      dominantFoot: "",
      clubTeam: "",
    },
  })

  // Register fields that use setValue for validation
  register("profilePhotos", {
    validate: (files) => files.length > 0 || "Photo is required",
  })
  register("dateOfBirth", { required: "Date of birth is required" })
  register("gender", { required: "Gender is required" })
  register("sport", { required: "Sport is required" })
  register("dominantFoot", { required: "Dominant foot is required" })

  const dateOfBirth = watch("dateOfBirth")
  const gender = watch("gender")
  const sport = watch("sport")
  const dominantFoot = watch("dominantFoot")

  const handlePhotoSelect = (files: File[]) => {
    const nextPreviews = files.map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
    }))

    setPhotoPreviews((prev) => {
      const merged = [...prev, ...nextPreviews]
      setValue(
        "profilePhotos",
        merged.map((item) => item.file),
        { shouldValidate: true }
      )
      return merged
    })
  }

  const handlePhotoRemove = (id: string) => {
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
  }

  useEffect(() => {
    previewUrlsRef.current = photoPreviews.map((item) => item.url)
  }, [photoPreviews])

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const goToPositionMapStep = handleSubmit(() => {
    searchParams.set("addNewChildren", "positionMap")
    setSearchParams(searchParams)
  })

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 border-b border-white/8 pt-4 pb-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5">
          <h2 className={titleClassName}>Add New Children</h2>
          <p className={subtitleClassName}>
            Start by defining the athlete's core identity profile.
          </p>
        </div>

        <div className="min-w-47.5 space-y-2">
          <p className="text-right text-[12px] leading-[150%] font-medium text-white">
            Step <span className="text-brand">1</span> of 8
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.25 flex-1 rounded-full bg-brand" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
            <span className="h-1.25 flex-1 rounded-full bg-white" />
          </div>
        </div>
      </div>

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
                <img
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
          <InputField
            label="First Name"
            placeholder="Enter First Name"
            className={controlClassName}
            {...register("firstName", {
              required: "First name is required",
            })}
            error={errors.firstName?.message}
          />

          <InputField
            label="Last Name"
            placeholder="Enter Last Name"
            className={controlClassName}
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={errors.lastName?.message}
          />

          <DatepickerField
            label="Date of Birth"
            selected={dateOfBirth}
            open={openDatePicker}
            onOpenChange={setOpenDatePicker}
            onSelect={(date) => {
              setValue("dateOfBirth", date, { shouldValidate: true })
            }}
            error={errors.dateOfBirth?.message}
          />

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

          <InputField
            label="Nationality"
            placeholder="Canada"
            className={controlClassName}
            {...register("nationality", {
              required: "Nationality is required",
            })}
            error={errors.nationality?.message}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            className={controlClassName}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
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

          <InputField
            label="Jersey Number"
            placeholder="#"
            className={controlClassName}
            {...register("jerseyNumber", {
              required: "Jersey number is required",
            })}
            error={errors.jerseyNumber?.message}
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

          <InputField
            label="Club / Team"
            placeholder="e.g. Toronto United"
            className={controlClassName}
            {...register("clubTeam", {
              required: "Club/Team is required",
            })}
            error={errors.clubTeam?.message}
          />
        </div>
      </div>

      <StepActions onNext={() => goToPositionMapStep()} />
    </div>
  )
}
