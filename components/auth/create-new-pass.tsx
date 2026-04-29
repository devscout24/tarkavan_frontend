import { BsArrowLeft } from "react-icons/bs"
import CommonBtn from "../common/common-btn"
import PwdInput from "../common/password-input"
import { useRouter } from "next/navigation"
import { setNewPassword } from "./action"
import { useState } from "react"
import { toast } from "sonner"

export default function EnterCode({ email }: { email: string }) {

  const router = useRouter()
  const [password , setPassword] = useState("")
  const [password_confirmation , setPassword_confirmation] = useState("")
  

  const  handleSetNewPassword = async () => {

    const data = {
        email,
        password:  password,
        reset_password_token: localStorage.getItem("reset_password_token") as string,
        password_confirmation: password_confirmation
      }

    try{

      const res = await  setNewPassword(data)
 
      if(res.data.status){
        toast.success("Password reset successfully! Please login with your new password.")
        localStorage.removeItem("reset_password_token")
        router.push("/auth?auth-tab=login")
      }else{
        toast.error("Failed to reset password. Please try again.")
      }

    }catch(error){
        toast.error("Failed to reset password. Please try again.")
         
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
        <h2 className="text-[42px] leading-[1.05] font-semibold tracking-tight">
          Create new password
        </h2>
        <p className="">
          Choose something only you would know. Avoid reusing old passwords.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <PwdInput 
          label="Password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PwdInput 
          label="Confirm Password" 
          placeholder="••••••••" 
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
        />

        <CommonBtn
          size={"lg"}
          text={"Save and continue"}
          variant={"default"}
          onClick={handleSetNewPassword}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />
      </form>
    </div>
  )
}
