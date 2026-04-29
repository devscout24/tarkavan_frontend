import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"
import { GoNumber } from "react-icons/go"
import { BsArrowLeft } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { getForgetPassCode, verifyOPT } from "./action"
import { useState } from "react"
import { toast } from "sonner"

export default function EnterCode({ email }: { email: string }) {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleVerifyCode = async () => {
    setLoading(true)
    try {
      const res = await verifyOPT({ email, otp: Number(code) })
       
      if (res.data.status) {
        setLoading(false)
        toast.success("Code verified successfully!")
        localStorage.setItem("reset_password_token" ,  res.data.data.reset_password_token)
        router.push("/auth?auth-tab=create-new-pass")
      } else {
        setLoading(false)
        toast.error("Invalid code. Please try again.")
      }
    } catch (error) {
      setLoading(false)
      toast.error("An error occurred. Please try again.")
    }
  }

  const handleReSendForgetPassCode = async () => {
    setResendLoading(true)
    try {
      const res = await getForgetPassCode(email as string) 
       
      if (res.data.data.otp) { 
        setResendLoading(false)  
        toast.success("Code resent successfully!")
      } else {
        setResendLoading(false)
        toast.error("Failed to send code. Please try again.") 
      }
    } catch (error) {
      setResendLoading(false)
      toast.error("Failed to send code. Please try again.") 
    }
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
        <h2 className="text-lg leading-[1.05] font-semibold tracking-tight md:text-2xl xl:text-[42px]">
          Enter your code
        </h2>
        <p className="">Enter the 4-digit code we sent to your email.</p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <UiInput
          label="Code"
          placeholder="Please enter the 4-digit code"
          icon={<GoNumber className="text-2xl" />}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <CommonBtn
          size={"lg"}
          text={"Continue"}
          variant={"default"}
          onClick={handleVerifyCode}
          isLoading={loading}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        /> 

        <div className="flex items-center justify-center gap-10 text-center text-sm font-medium text-[#8D93A1]">
          Didn’t receive a code?{" "}
          <CommonBtn
            className="font-semibold text-nowrap text-brand hover:underline"
            variant="link"
            size="sm"
            text="Resend code"
            onClick={handleReSendForgetPassCode}
            isLoading={resendLoading}
          />
        </div>
      </form>
    </div>
  )
}
