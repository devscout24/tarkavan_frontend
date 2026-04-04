interface ModalStepHeaderProps {
  title: string
  subtitle: string
  currentStep: number
  totalSteps?: number
}

export default function ModalStepHeader({
  title,
  subtitle,
  currentStep,
  totalSteps = 8,
}: ModalStepHeaderProps) {
  const safeStep = Math.min(Math.max(currentStep, 1), totalSteps)

  return (
    <div className="flex flex-col gap-4 border-b border-white/8 pt-4 pb-5 md:flex-row md:items-start md:justify-between">
      <div className="space-y-1.5">
        <h2 className="text-[20px] leading-[150%] font-bold text-white">
          {title}
        </h2>
        <p className="text-[14px] leading-[150%] font-normal text-white/80">
          {subtitle}
        </p>
      </div>

      <div className="min-w-47.5 space-y-2">
        <p className="text-right text-[12px] leading-[150%] font-medium text-white">
          Step <span className="text-brand">{safeStep}</span> of {totalSteps}
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepIndex = index + 1
            return (
              <span
                key={stepIndex}
                className={`h-1.25 flex-1 rounded-full ${
                  stepIndex === safeStep ? "bg-brand" : "bg-white"
                }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
