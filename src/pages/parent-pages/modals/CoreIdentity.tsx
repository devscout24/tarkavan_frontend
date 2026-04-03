import { useState } from "react"
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

export default function CoreIdentity() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>()
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const goToPositionMapStep = () => {
    searchParams.set("addNewChildren", "positionMap")
    setSearchParams(searchParams)
  }

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
        <UploadPhoto />
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
          />

          <InputField
            label="Last Name"
            placeholder="Enter Last Name"
            className={controlClassName}
          />

          <DatepickerField
            label="Date of Birth"
            selected={dateOfBirth}
            open={openDatePicker}
            onOpenChange={setOpenDatePicker}
            onSelect={setDateOfBirth}
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
          />

          <InputField
            label="Nationality"
            placeholder="Canada"
            className={controlClassName}
          />

          <InputField
            label="Email Address"
            placeholder=""
            className={controlClassName}
          />

          <SelectField
            label="Sport Selection"
            placeholder="Select Sport"
            options={[{ value: "soccer", label: "Soccer" }]}
            triggerClassName={triggerClassName}
          />

          <InputField
            label="Jersey Number"
            placeholder="#"
            className={controlClassName}
          />

          <SelectField
            label="Dominant Foot (Right / Left)"
            placeholder="Select"
            options={[
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
            triggerClassName={triggerClassName}
          />

          <InputField
            label="Club / Team"
            placeholder="e.g. Toronto United"
            className={controlClassName}
          />
        </div>
      </div>

      <StepActions onNext={goToPositionMapStep} />
    </div>
  )
}
