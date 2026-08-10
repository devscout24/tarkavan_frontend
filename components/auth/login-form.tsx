"use client"
import { UserRound } from "lucide-react"
import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"
import PwdInput from "../common/password-input"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { loginUser } from "./action"
import { setAuthCookie } from "@/lib/set-token"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks" 

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  // const dispatch = useAppDispatch()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await loginUser({ email, password })  
      console.log("Login response:", res) // Log the entire response for debugging
      
      if (res?.data?.status) {
        
        toast.success("Login successful! Welcome back.")
        await setAuthCookie(res.data.data.token)
        localStorage.setItem("go_elite_token", res.data.data.token)
        localStorage.removeItem("go_elitr_player_setup_progress")
        const dbUser = res.data.data.user
        const newUserData = {
          cover_image: dbUser.cover_image,
          email: dbUser.email,
          id: dbUser.id,
          is_verified: dbUser.is_verified,
          name: dbUser.name,
          phone: dbUser.phone,
          profile_image: dbUser.profile_image,
          role: dbUser.role,
          status: dbUser.status,
          profile_id: res.data.data.profile_id,
          is_subscription_active: res.data.data.is_subscription_active 
        }
        if(res?.data?.data?.is_subscription_active){
          newUserData.is_subscription_active = res.data.data.is_subscription_active
        }else{
          newUserData.is_subscription_active = false
        }

        localStorage.setItem("go_elite_user", JSON.stringify(newUserData))
        setLoading(false)

        const normalizedRole = String(
          newUserData.role || res.data.data.user.role || ""
        )
          .trim()
          .toLowerCase()

        const isPending = newUserData.status === "pending"
 
        if (isPending && (normalizedRole === "coach" || normalizedRole === "club")) {
          router.replace(`/${normalizedRole}?${normalizedRole}=profile-setup`) 
          window.location.replace(`/${normalizedRole}`)
        } else {
          // router.replace(`/${normalizedRole}`) 
          window.location.replace(`/${normalizedRole}`)
        }
      } else {
        setLoading(false)
        toast.error(`Login failed. Please try again.`)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Login failed. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-105 rounded-2xl bg-primary p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <div className="mb-7 space-y-2">
        <h2 className="text-lg leading-[1.05] font-semibold tracking-tight md:text-2xl xl:text-[42px]">
          Login
        </h2>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <UiInput
          label="Email"
          placeholder="example@exmple.com"
          icon={<UserRound />}
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <PwdInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />

        <Link
          href="/auth?auth-tab=reset-pass"
          className="-mt-3! inline-block w-full text-right text-sm font-semibold text-brand hover:underline"
        >
          Forgot Password?
        </Link>

        <CommonBtn
          size={"lg"}
          onClick={handleLogin}
          text={"Login"}
          variant={"default"}
          isLoading={loading}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-[#2D313A]" />
          <span className="text-lg text-[#8D93A1]">Or</span>
          <div className="h-px flex-1 bg-[#2D313A]" />
        </div> 
        
        <p className="text-center text-sm font-medium text-[#8D93A1]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth?auth-tab=register"
            className="font-semibold text-brand hover:underline"
          >
            Register Here
          </Link>
        </p>
      </form>
    </div>
  )
}
