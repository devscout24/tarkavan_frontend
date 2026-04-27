
import CommonBtn from "@/components/common/common-btn"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { requestMatch } from "../action"
import { toast } from "sonner"

interface ClubOpurtunityCardProps { 
  ClubName: string
  date: string
  location: string
  opurtunity: string
  matchId: string
  action_label: string 
}

 

export default function ClubOpurtunityCard({ 
  ClubName ,
  location ,
  date,
  matchId ,
  action_label ,
  opurtunity
}: ClubOpurtunityCardProps) {


  const user = localStorage.getItem("go_elite_user") ? JSON.parse(localStorage.getItem("go_elite_user")!) : null
  const handleRequestMatch = async () => {

    try{
      const res = await requestMatch({match_id: matchId, requested_club_id: user?.id})
      console.log(res)
            if(!res?.status){
        toast.error(res?.message)
      }

      
      if(res && 'success' in res && res.success && res.data && 'status' in res.data && res.data.status) {
        toast.success("Match requested successfully!")
      } else if(res && 'data' in res && res.data && 'message' in res.data) {
        toast.error(res.data.message)
      }  else     if(!res?.status){
        toast.error(res?.message)
      }




    } catch (error) {
      console.error(error)
      toast.error("Failed to request match")
    }
    
  };

  return (
    <div className="flex max-w-[320px] flex-col overflow-hidden rounded-2xl bg-primary border border-secondary    ">
      {/* Image */}
      <div className="h-40 w-full">
        <Image
          src={"/images/advertisementImage.png"}
          alt="Advertisement"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">

        {/*  */}
        <h2 className="text-lg font-bold text-white pb-3  ">{ClubName}</h2>

        <div className="flex">
          <Calendar className="text-base" />
          <p className="text-sm text-white ml-2 ">{date}</p>
        </div>
        <div className="flex mt-5  ">
          <MapPin className="text-base"  />
          <p className="text-sm text-white ml-2">{location}</p>
        </div>


        <div className="p-5 bg-white/20 rounded-md mt-5   ">{opurtunity}</div>

        <div className="flex mt-4 justify-between flex-wrap    ">
          <CommonBtn
            size={"lg"}
            variant={"default"}
            text="View Details"
            className="border border-brand px-5  text-brand bg-transparent hover:bg-transparent w-fit     "
          />


          <CommonBtn
            size={"lg"}
            variant={"default"}
            text={action_label}
            onClick={handleRequestMatch}
            disabled={action_label !== "Request Match"}
            className={` border border-brand px-2  text-primary  bg-brand  hover:bg-brand w-fit    `}
          />



        </div>



      </div>

 
    </div>
  )
}