"use client"
import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import Image, { StaticImageData } from "next/image"
import { toast } from "sonner"
import { applyRecruitment } from "@/app/(dashboards)/coach/action"

interface AdvertisementProps {
  imageUrl: string | StaticImageData
  positions?: string
  teamName?: string
  ageGroup?: string
  tryoutDate?: string
  description?: string
  headline?: string 
  hideDetails?: boolean
  is_applied?: boolean 
  recruitId?: string
}

const TimerIcon = () => (
  <Icon width="14" height="14" viewBox="0 0 14 14">
    <g clipPath="url(#clip0_2718_10035)">
      <path
        d="M6.95278 12.7481C10.153 12.7481 12.7474 10.1538 12.7474 6.95351C12.7474 3.75325 10.153 1.15894 6.95278 1.15894C3.75252 1.15894 1.1582 3.75325 1.1582 6.95351C1.1582 10.1538 3.75252 12.7481 6.95278 12.7481Z"
        stroke="white"
        strokeWidth="0.869186"
      />
      <path
        d="M6.95508 4.05615V6.95344L8.40372 8.40208"
        stroke="white"
        strokeWidth="0.869186"
      />
    </g>
    <defs>
      <clipPath id="clip0_2718_10035">
        <rect width="13.907" height="13.907" fill="white" />
      </clipPath>
    </defs>
  </Icon>
)

export default function Advertisement({
  imageUrl,
  positions,
  teamName,
  ageGroup,
  tryoutDate,
  description,
  headline, 
  hideDetails = false,
  is_applied , 
  recruitId,
}: AdvertisementProps) {


  const handleApply = async () => { 
   try{

    const formData = new FormData () ;
    formData.append("recruitment_id", recruitId || "");

    const res = await applyRecruitment(formData)
    if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
      toast.success("Application submitted successfully") 
      window.dispatchEvent(new Event("load_coach_dashboard"))
    } else {
      toast.error("Failed to submit application")
    }

   }catch(error){
    console.error("Error applying:", error)
    toast.error("Error applying , Please try again")
   }


  }



  return (
    <div className="flex  h-100  w-full  flex-col overflow-hidden rounded-[24px] bg-primary">
      {/* Image Section */}
      <div className="h-39 w-full  shrink-0 relative ">
        <Image
          width={1000}
          height={1000}
          src={imageUrl}
          alt="Advertisement"
          className="block h-full w-full object-cover"
        />

        <p className="absolute top-1/2 -translate-y-1/2  left-0 w-full text-center text-xl font-semibold text-white ">{headline}</p>

      </div>

      {/* Content Section */}
      <div className={`flex flex-1 flex-col space-y-3 p-5 ${hideDetails ? "hidden" : "block"}`}>
        {/* Positions */}
        <p className="font-weight-500 text-[18px] leading-[120%] font-normal text-white  shrink-0">
          {positions}
        </p>

        {/* Team Name and Age Group */}
        <p className="font-weight-400 text-xs leading-[150%] font-normal text-white  shrink-0">
          {teamName} | Age: {ageGroup}
        </p>

        {/* Tryout Date */}
        <div className="flex items-center gap-1.5  shrink-0">
          <div className="h-3.5 w-3.5 text-white">
            <TimerIcon />
          </div>
          <p className="text-xs leading-[150%] font-normal text-white">
            Tryouts: {tryoutDate}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs leading-[150%] font-normal text-white line-clamp-5 flex-1">
          {description}
        </p>

        {/* Apply Button */}
        <CommonBtn
          variant="default"
          size="lg"
          text={is_applied ? "Applied" : "Apply"}
          className={`h-10 w-full cursor-pointer text-base font-medium transition-all  shrink-0 ${
            is_applied 
              ? "bg-transparent text-brand border border-brand cursor-default" 
              : "bg-brand text-zinc-950 hover:bg-brand/90"
          }`}
          onClick={handleApply}
          // disabled={is_applied}
        />
      </div>
    </div>
  )
}
