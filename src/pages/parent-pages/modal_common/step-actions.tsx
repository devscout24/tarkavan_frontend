import { useNavigate } from "react-router"
import CommonBtn from "@/components/common/common-btn"
import { Icon } from "@/components/custom/Icon"

interface StepActionsProps {
  onBack?: () => void
  onNext?: () => void
  backLabel?: string
  nextLabel?: string
  nextUrl?: string
  isNextDisabled?: boolean
}

export default function StepActions({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next Step",
  nextUrl,
  isNextDisabled = false,
}: StepActionsProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else if (nextUrl) {
      navigate(nextUrl)
    }
  }

  return (
    <div className="mt-7 flex items-center justify-between">
      <CommonBtn
        onClick={handleBack}
        variant="outline"
        size="sm"
        text={backLabel}
        className="h-11 w-24 cursor-pointer rounded-xl border border-brand bg-primary px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-primary"
      />

      <CommonBtn
        onClick={handleNext}
        disabled={isNextDisabled}
        variant="default"
        size="sm"
        text={nextLabel}
        icon={
          <Icon width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M14.43 5.92993L20.5 11.9999L14.43 18.0699"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.50008 12H20.3301"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
        }
        className={`inline-flex h-11 w-40 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all ${
          isNextDisabled
            ? "cursor-not-allowed bg-brand/50 text-[#111308]/70"
            : "cursor-pointer bg-brand text-[#111308] hover:border hover:border-brand hover:bg-transparent hover:text-[#ffffff]"
        }`}
      />
    </div>
  )
}
