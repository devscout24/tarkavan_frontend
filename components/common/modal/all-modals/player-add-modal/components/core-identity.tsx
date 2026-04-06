import DatepickerField from "@/components/common/datepicker-field"
import InputField from "@/components/common/input-field"
import ModalStepHeader from "@/components/common/modal-header"
import SelectField from "@/components/common/select-field"
import UploadPhoto from "@/components/common/upload-photo"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form" 
 

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

export default function CoreIdentity({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [photoPreviews, setPhotoPreviews] = useState<PhotoPreview[]>([])
  const previewUrlsRef = useRef<string[]>([]) 
 
  const {
    register, 
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

 
 
 

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white ">
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
    </div>
  )
}
