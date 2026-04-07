import ModalStepHeader from "@/components/common/modal-header"
import AchievementUploadPanel from "./achievement-upload-panel"
import AchievementDetailsForm from "./achievement-details-form"
import type { WizardState } from "../types"

export default function Achievements({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["achievements"]
  onDraftChange: (value: WizardState["forms"]["achievements"]) => void
}) {
  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title="Add New Children"
        subtitle="Start by defining the athlete's core identity profile."
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-white/20 pb-4">
          <div className="space-y-1">
            <h3 className="text-[20px] leading-[150%] font-bold text-white">
              Achievements
            </h3>
            <p className="pb-3 text-[14px] leading-[150%] font-normal text-white/70">
              Almost there! Just one more step after this.
            </p>
          </div>
        </div>

        <AchievementUploadPanel
          value={draft.uploadedAssets}
          onChange={(uploadedAssets) =>
            onDraftChange({
              ...draft,
              uploadedAssets,
            })
          }
        />
      </div>

      <div className="mt-6">
        <p className="text-[16px] leading-[150%] font-medium text-white">
          Player Achievements
        </p>
        <p className="mt-1 max-w-130 text-[14px] leading-[150%] font-normal text-white/70">
          List any awards, MVP honors, certifications, or milestones your child
          has achieved. These help recruiters see their growth and dedication.
        </p>

        <AchievementDetailsForm
          value={{
            title: draft.title,
            dateEarned: draft.dateEarned,
            description: draft.description,
          }}
          onChange={(details) =>
            onDraftChange({
              ...draft,
              ...details,
            })
          }
        />
      </div>
    </div>
  )
}
