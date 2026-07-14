"use client"
import Image, { StaticImageData } from "next/image"
import { toast } from "sonner"
import { applyRecruitment } from "@/app/(dashboards)/coach/action"
import { useEffect, useState } from "react"
import { Icon } from "@/components/custom/Icon"
import CommonBtn from "@/components/common/common-btn"
import { getChildList } from "../../player/programs/action"
import { TChield } from "@/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Lottie from "lottie-react"
import animationData from "../../../../public/searching.json"
import { useRouter } from "next/navigation"
import { MatchedChild } from "@/components/parentAndCoachApi"

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
  application_status: string
  matched_children: MatchedChild[]
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

export default function AdvertisementParent({
  imageUrl,
  positions,
  teamName,
  ageGroup,
  tryoutDate,
  description,
  headline,
  hideDetails = false,
  recruitId,
  matched_children , 
}: AdvertisementProps) {
  const [loading, setLoading] = useState(false) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChildId, setSelectedChildId] = useState<string>("")
  const router = useRouter()
 

 

  const handleApply = async () => {


    if(!selectedChildId){
        toast.error("Please select a child to apply")
        return
    }
    if(!recruitId){
        toast.error("Invalid recruitment opportunity")
        return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("recruitment_id", recruitId || "")
      formData.append("child_id", selectedChildId || "")

      const res = await applyRecruitment(formData)
      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        toast.success("Application submitted successfully")
        window.dispatchEvent(new Event("load_coach_dashboard"))
        setLoading(false)
        setIsModalOpen(false)
      } else {
        toast.error("Failed to submit application")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error applying:", error)
      toast.error("Error applying , Please try again")
      setLoading(false)
    }
  }

  return (
    <div className="flex h-100 w-full flex-col overflow-hidden rounded-[24px] bg-primary">
      {/* Image Section */}
      <div className="relative h-39 w-full shrink-0">
        <Image
          width={1000}
          height={1000}
          src={encodeURI(imageUrl as string)}
          alt="Advertisement"
          className="block h-full w-full object-cover"
        />

        <p className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-center text-xl font-semibold text-white">
          {headline}
        </p>
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-1 flex-col space-y-3 p-5 ${hideDetails ? "hidden" : "block"}`}
      >
        {/* Positions */}
        <p className="font-weight-500 shrink-0 text-[18px] leading-[120%] font-normal text-white">
          {positions}
        </p>

        {/* Team Name and Age Group */}
        <p className="font-weight-400 shrink-0 text-xs leading-[150%] font-normal text-white">
          {teamName} | Age: {ageGroup}
        </p>

        {/* Tryout Date */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-3.5 w-3.5 text-white">
            <TimerIcon />
          </div>
          <p className="text-xs leading-[150%] font-normal text-white">
            Tryouts: {tryoutDate}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-5 flex-1 text-xs leading-[150%] font-normal text-white">
          {description}
        </p>

        {/* Apply Button */}

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger>
              <div
                className="h-10 rounded-xl bg-brand text-lg font-medium text-primary hover:bg-brand/80 hover:text-primary cursor-pointer flex items-center justify-center      "
              > 
                Apply Now
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold  ">Select child</DialogTitle> 
                <DialogDescription>
                  <p className="text-sm text-muted-foreground">
                    Please select a child to proceed with the booking.
                  </p>

                  {matched_children && matched_children.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <Select 
                        onValueChange={(value) => setSelectedChildId(value)}
                        defaultValue={selectedChildId}
                      >
                      <SelectTrigger className="w-full text-primary ">
                        <SelectValue placeholder="Select a child" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          {matched_children.map((child) => ( 
                            <SelectItem value={String(child.id)} key={child.id} className="cursor-pointer hover:bg-brand!   ">
                              {child.name} 
                            </SelectItem> 
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select> 
                   </div>
                  )
                  : 
                  <div className=""> 
                    <Lottie animationData={animationData} loop />
                    <div className="">
                      <p className="text-sm text-muted-foreground text-center pb-4  ">
                        No children found.
                      </p>
                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="add child"
                        className="w-full bg-brand hover:bg-brand text-primary border-0 cursor-pointer     "
                        onClick={()=> router.push("?player=setup") }
                        />
                    </div>
                  </div>
                  }


                  <div className="flex justify-between   mt-4    ">
                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="Close"
                        className="w-fit px-4 border-brand  bg-transparent! hover:bg-transparent text-primary cursor-pointer     "
                        onClick={()=> setIsModalOpen(false) }
                        />

                      <CommonBtn
                        variant="outline"
                        size="default"
                        text="Continue to apply"
                        className="w-fit px-4 bg-brand! hover:bg-brand text-primary border-0 cursor-pointer     "
                        onClick={handleApply}
                        isLoading={loading}
                        />
                  </div>


                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </div>
    </div>
  )
}
