 
import { MapPin } from "lucide-react"
import Image from "next/image" 
import { IoIosFootball } from "react-icons/io"
 
import { TPlayerBasicInfo, TPlayerPositionInfo } from "@/types"

export default function CoachProfileCard({ 
  basic_info,
  position_info,
  jersey_shown = true,
}: { 
  basic_info?: TPlayerBasicInfo
  position_info?: TPlayerPositionInfo
  jersey_shown: boolean
}) {
 
 

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-brand/80 bg-[#0d0f16] shadow-[0_0_0_1px_rgba(178,246,111,0.2),0_18px_45px_rgba(0,0,0,0.5)]">
      {jersey_shown && (
        <div className="absolute top-4 left-4 z-10 rounded-md bg-brand px-3 py-1 text-sm font-semibold text-primary italic">
          JERSEY #{position_info?.jersey_number}
        </div>
      )} 

      <div className="relative max-h-170 w-full">
        <Image
          src={basic_info?.image || "/images/bannerbg.png"}
          alt="Shahin Tarkavan"
          width={1000} 
          height={1000} 
          className="object-cover h-full  "
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,18,0.15)_22%,rgba(8,10,18,0.82)_72%,rgba(8,10,18,0.97)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6">
          <h2 className="text-[42px] leading-[0.88] font-bold tracking-tight text-white">
            {basic_info?.name} 
          </h2>

          <p className="mt-3 text-lg leading-tight text-white/92">
            {position_info?.primary_position?.name}{" "}
            {position_info?.club_team ? `| ${position_info.club_team}` : ""}
          </p>

          <div className="mt-2 flex items-center gap-2 text-lg leading-tight text-white/92">
            <MapPin className="size-5 text-white/88" />
  
            <span>
              {basic_info?.country ? `${basic_info?.country} ,` : null } {basic_info?.province ? `${basic_info?.province} ,` : null } {basic_info?.city ? `${basic_info?.city}` : null } 
            </span> 
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <span className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-base leading-none font-medium text-white/92">
              <IoIosFootball />
            </span>
            {basic_info?.gender ? 
            <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92 uppercase">
              {basic_info?.gender}
            </span>
            : null }
            {basic_info?.age ? 
            <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92">
              UNDER-{basic_info?.age}
            </span>
            : null }
            {position_info?.dominant_foot ? 
            <span className="rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-base font-medium text-white/92 uppercase">
              {position_info?.dominant_foot}
            </span>
           : null  
          }
          </div>
        </div>
      </div>
    </div>
  )
}
