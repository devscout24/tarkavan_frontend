import { BsArrowLeft } from "react-icons/bs"
import CommonBtn from "../common/common-btn"
import PwdInput from "../common/password-input"
import { useRouter } from "next/navigation"

export default function EnterCode() {

  const router = useRouter()

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
        <PwdInput label="Password" placeholder="••••••••" />
        <PwdInput label="Confirm Password" placeholder="••••••••" />

        <CommonBtn
          size={"lg"}
          text={"Save and continue"}
          variant={"default"}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />
      </form>
    </div>
  )
}
