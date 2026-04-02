import { UserRound } from "lucide-react"
import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"
import { FcGoogle } from "react-icons/fc"
import PwdInput from "../common/password-input"
import { Link } from "react-router"

export default function LoginForm() {
  return (
    <div className="w-full max-w-105 rounded-2xl bg-primary p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <div className="mb-7 space-y-2">
        <h2 className="text-[42px] leading-[1.05] font-semibold tracking-tight">
          Login
        </h2>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <UiInput
          label="Email"
          placeholder="example@exmple.com"
          icon={<UserRound />}
        />
        <PwdInput label="Password" placeholder="••••••••"   />

        <Link to="/forgot-password" className="-mt-3! text-sm font-semibold w-full inline-block text-right text-brand hover:underline">
          Forgot Password?
        </Link>

        <CommonBtn
          size={"lg"}
          text={"Login"}
          variant={"default"}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-[#2D313A]" />
          <span className="text-lg text-[#8D93A1]">Or</span>
          <div className="h-px flex-1 bg-[#2D313A]" />
        </div>

        <CommonBtn
          size={"lg"}
          text={"Login with Google"}
          variant={"default"}
          icon={<FcGoogle />}
          className="w-full bg-secondary/40 text-lg font-semibold text-white transition hover:bg-secondary/38"
        />
        
        <p className="text-center text-sm font-medium text-[#8D93A1]">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand hover:underline"
          >
            Register Here
          </Link>
        </p>

      </form>
    </div>
  )
}
