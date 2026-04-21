import { Progress } from "@/components/ui/progress"

interface CoachProfileSetupHeaderProps {
  currentStep?: number
  totalSteps?: number
}

export default function CoachProfileSetupHeader({
  currentStep = 1,
  totalSteps = 6,
}: CoachProfileSetupHeaderProps) {
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))

  return (
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
  )
}
