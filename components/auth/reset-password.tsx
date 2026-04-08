import { UserRound } from "lucide-react"
import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BsArrowLeft } from "react-icons/bs"

export default function ResetPassForm() {
  const router = useRouter()
  const handleResetPass = () => {
    router.push("/auth?auth-tab=enter-code")
  }

  return (
    <div className="w-full max-w-105 rounded-2xl bg-primary p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <CommonBtn
        size={"lg"}
        icon={<BsArrowLeft className="text-white" />}
        variant={"link"}
        className="cursor-pointer py-2"
        onClick={() => router.back()}
      />
      <div className="mb-7 space-y-2">
        <h2 className="text-[42px] leading-[1.05] font-semibold tracking-tight">
          Reset password
        </h2>
        <p className="">
          Enter your email address. We’ll send a code so you can reset your
          password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <UiInput
          label="Email"
          placeholder="Please enter your email address"
          icon={<UserRound />}
        />

        <CommonBtn
          size={"lg"}
          text={"Send code"}
          variant={"default"}
          onClick={handleResetPass}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />

        <p className="text-center text-sm font-medium text-[#8D93A1]">
          Back to{" "}
          <Link
            href="/auth?auth-tab=login"
            className="font-semibold text-brand hover:underline"
          >
            login
          </Link>
        </p>
      </form>
    </div>
  )
}
