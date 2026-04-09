 
import CommonBtn from "../common/common-btn"
import UiInput from "../common/ui-input"  
import { GoNumber } from "react-icons/go";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";


export default function EnterCode() {

  const router = useRouter()

  return (
    <div className="w-full max-w-105 rounded-2xl bg-primary p-7 text-[#F5F6F8] shadow-[0_22px_60px_rgba(0,0,0,0.45)] md:p-8">
      <CommonBtn
        size={"lg"}
        icon={<BsArrowLeft className="text-white" />}
        variant={"link"}
        className="py-2 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="mb-7 space-y-2">
        <h2 className="text-[42px] leading-[1.05] font-semibold tracking-tight">
          Enter your code
        </h2>
        <p className="">Enter the 4-digit code we sent to your email.</p>
      </div>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <UiInput
          label="Code"
          placeholder="Please enter the 4-digit code"
          icon={<GoNumber className="text-2xl "/>}
        /> 
 

        <CommonBtn
          size={"lg"}
          text={"Continue"}
          variant={"default"}
          className="mt-1 h-12 w-full rounded-lg bg-brand text-lg font-semibold text-primary transition hover:bg-brand/90"
        />
        <p className="">For security, this code expires in 10 minutes.</p>
 
 
        
        <div className="text-center text-sm font-medium text-[#8D93A1] flex items-center justify-center gap-10 ">
          Didn’t receive a code? {" "}
          <CommonBtn 
            className="font-semibold text-brand hover:underline text-nowrap "
            variant="link"
            size="sm"
            text="Resend code" 
          />
             
        </div>

      </form>
    </div>
  )
}
