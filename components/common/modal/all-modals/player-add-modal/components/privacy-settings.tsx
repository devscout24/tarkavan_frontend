import ModalStepHeader from "@/components/common/modal-header"
import PrivacyVisibilitySelector from "./privacy-visibility-selector"
import type { WizardState } from "../types"

export default function PrivacySettings({
  currentStep,
  totalSteps,
  draft,
  onDraftChange,
}: {
  currentStep: number
  totalSteps: number
  draft: WizardState["forms"]["privacySettings"]
  onDraftChange: (value: WizardState["forms"]["privacySettings"]) => void
}) {
  // Get user role from localStorage
  const user = typeof window !== 'undefined' && localStorage.getItem("go_elite_user") 
    ? JSON.parse(localStorage.getItem("go_elite_user")!) 
    : null
  const userRole = user?.role

  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white sm:p-6 md:p-8">
      <ModalStepHeader
        title="Add New Children"
        subtitle="Start by defining the athlete's core identity profile."
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 border-b border-dashed border-white/20 pb-6">
        <h3 className="text-[20px] leading-[150%] font-bold text-white">
          Privacy Settings
        </h3>
        <p className="mt-1 max-w-130.25 text-[14px] leading-[150%] font-normal text-white/70">
          {`Control who can see your child's profile, highlights, and athletic
          statistics on the GoElite network.`}
        </p>
      </div>

      <PrivacyVisibilitySelector
        value={draft.visibility}
        onChange={(visibility) => onDraftChange({ visibility   })}
        userRole={userRole}
      />
    </div>
  )
}
