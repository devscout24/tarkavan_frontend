"use client"
 
import { Card } from "@/components/ui/card" 
import { TCoachProfileData } from "@/types"

 

export default function CoachBioCard({ profileData }: { profileData: TCoachProfileData }) {  

  
  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-base leading-[150%] font-bold text-white xl:text-lg 2xl:text-xl">
        Bio
      </h5>
      <p className="mt-2 text-sm leading-[150%] text-white/85 xl:mt-3 xl:text-base 2xl:text-lg">
        {profileData?.bio || "No bio available"}
      </p>

      {/* {badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 xl:mt-5 xl:gap-3">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1 text-[11px] leading-[150%] text-white/85 xl:px-3.5 xl:py-1.5 xl:text-xs"
            >
              {badge.toUpperCase()}
            </span>
          ))}
        </div>
      )} */}
    </Card>
  )
}
