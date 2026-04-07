import { Controller, useForm } from "react-hook-form"
import { Icon } from "@/components/custom/Icon"
import ModalStepHeader from "@/components/common/modal-header"
import { useEffect } from "react"
import type { WizardState } from "../types"

const MAX_BIO_LENGTH = 300

interface BiographyFormData {
  biography: string
}

export default function Biography({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["biography"]
  onDraftChange: (value: WizardState["forms"]["biography"]) => void
}) {
  const {
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BiographyFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      biography: draft.biography,
    },
  })
  const biography = watch("biography")

  useEffect(() => {
    onDraftChange({ biography })
  }, [biography, onDraftChange])

  const biographyRules = {
    required: "Biography is required",
    validate: (value: string) =>
      value.trim().length > 0 || "Biography is required",
  }

  const biographyErrorMessage = errors.biography?.message

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title={"Add New Children"}
        subtitle={"Start by defining the athlete's core identity profile."}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 pb-6">
        <h3 className="text-[20px] leading-[150%] font-bold text-white">Bio</h3>
        <p className="border-b border-dashed border-white/20 pb-6 text-[14px] leading-[150%] font-normal text-white/70">
          Almost there! Your athlete&apos;s profile is taking shape.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 p-6">
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-[16px] leading-[150%] font-medium text-white">
                Tell us about the athlete
              </h4>
              <p className="max-w-126.75 text-[14px] leading-[150%] font-normal text-white/70">
                Share their journey, achievements, and what makes them stand out
                on and off the field. This bio helps scouts and coaches
                understand their unique story.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <label className="text-[14px] leading-[150%] font-medium text-white">
                Athlete Biography
              </label>

              <div className="mt-6 rounded-xl bg-secondary/60 p-4">
                <Controller
                  control={control}
                  name="biography"
                  rules={biographyRules}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Describe the player's history, favorite positions, and major accomplishments..."
                      className="min-h-55 w-full resize-none border-0 bg-transparent p-0 text-[14px] leading-[150%] font-normal text-white placeholder:max-w-110.75 placeholder:text-[12px] placeholder:leading-[150%] placeholder:font-normal placeholder:text-white/50 focus:ring-0 focus:outline-none"
                      onChange={(event) => {
                        const nextValue = event.target.value

                        if (nextValue.length > MAX_BIO_LENGTH) {
                          field.onChange(nextValue.slice(0, MAX_BIO_LENGTH))
                          setError("biography", {
                            type: "maxLength",
                            message: `You can't add more than ${MAX_BIO_LENGTH} characters`,
                          })
                          return
                        }

                        if (errors.biography?.type === "maxLength") {
                          clearErrors("biography")
                        }

                        field.onChange(nextValue)
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex items-start justify-between gap-3 pt-1">
                <p className="flex items-start gap-1 text-[12px] leading-[150%] font-normal text-white">
                  <Icon
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                  >
                    <path
                      d="M5.25 8.75H6.41667V5.25H5.25V8.75ZM5.83333 4.08333C5.99861 4.08333 6.13715 4.02743 6.24896 3.91563C6.36076 3.80382 6.41667 3.66528 6.41667 3.5C6.41667 3.33472 6.36076 3.19618 6.24896 3.08437C6.13715 2.97257 5.99861 2.91667 5.83333 2.91667C5.66806 2.91667 5.52951 2.97257 5.41771 3.08437C5.3059 3.19618 5.25 3.33472 5.25 3.5C5.25 3.66528 5.3059 3.80382 5.41771 3.91563C5.52951 4.02743 5.66806 4.08333 5.83333 4.08333ZM5.83333 11.6667C5.02639 11.6667 4.26806 11.5135 3.55833 11.2073C2.84861 10.901 2.23125 10.4854 1.70625 9.96042C1.18125 9.43542 0.765625 8.81806 0.459375 8.10833C0.153125 7.39861 0 6.64028 0 5.83333C0 5.02639 0.153125 4.26806 0.459375 3.55833C0.765625 2.84861 1.18125 2.23125 1.70625 1.70625C2.23125 1.18125 2.84861 0.765625 3.55833 0.459375C4.26806 0.153125 5.02639 0 5.83333 0C6.64028 0 7.39861 0.153125 8.10833 0.459375C8.81806 0.765625 9.43542 1.18125 9.96042 1.70625C10.4854 2.23125 10.901 2.84861 11.2073 3.55833C11.5135 4.26806 11.6667 5.02639 11.6667 5.83333C11.6667 6.64028 11.5135 7.39861 11.2073 8.10833C10.901 8.81806 10.4854 9.43542 9.96042 9.96042C9.43542 10.4854 8.81806 10.901 8.10833 11.2073C7.39861 11.5135 6.64028 11.6667 5.83333 11.6667ZM5.83333 10.5C7.13611 10.5 8.23958 10.0479 9.14375 9.14375C10.0479 8.23958 10.5 7.13611 10.5 5.83333C10.5 4.53056 10.0479 3.42708 9.14375 2.52292C8.23958 1.61875 7.13611 1.16667 5.83333 1.16667C4.53056 1.16667 3.42708 1.61875 2.52292 2.52292C1.61875 3.42708 1.16667 4.53056 1.16667 5.83333C1.16667 7.13611 1.61875 8.23958 2.52292 9.14375C3.42708 10.0479 4.53056 10.5 5.83333 10.5Z"
                      fill="white"
                    />
                  </Icon>
                  <span>
                    Try to include current team and years of experience.
                  </span>
                </p>

                <span className="text-[12px] leading-[150%] font-normal text-white">
                  {biography.length} / {MAX_BIO_LENGTH} characters
                </span>
              </div>

              <div className="min-h-4 pt-1" aria-live="polite">
                {biographyErrorMessage && (
                  <p className="text-[12px] leading-[150%] font-normal text-red-400">
                    {biographyErrorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
