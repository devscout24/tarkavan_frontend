"use client"

import ProgramCoachCard from "@/components/common/program-coach-card"
import { Card } from "@/components/ui/card"
import {
  FullStarIcon,
  PartialStarIcon,
} from "./icons"
import SocialLinks from "@/app/(dashboards)/player/components/social-links"
import { TCoachProfileData } from "@/types"




export default function CoachLeftColumn(
  {
    profileData,
    coaching_titles
  }
    :
    {
      profileData: TCoachProfileData,
      coaching_titles: string[]
    }) {

  return (
    <aside className="space-y-2 ">
      <ProgramCoachCard
        className="rounded-[12px] border border-secondary/60 bg-primary xl:[&_h3]:text-[38px] 2xl:[&_h3]:text-[46px] xl:[&_p]:text-[17px] 2xl:[&_p]:text-[19px] xl:[&_span]:text-[11px] 2xl:[&_span]:text-[12px]"
        name={profileData?.name}
        highlightedName={profileData?.last_name}
        role={profileData?.current_role?.name || ""}
        location={profileData?.city && profileData?.country ? `${profileData?.city}, ${profileData?.country}` : profileData?.city || profileData?.country || ""}
        tags={["tag"]}
        imageUrl={profileData?.profile_image || "/images/bannerbg.png"}
        showMessageButton={false}
      />

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <p className="text-[32px] leading-[125%] font-bold text-white xl:text-[38px] 2xl:text-[44px]">
          {profileData?.overall_avg_rating?.toFixed(1) || "0.0"}
        </p>

        <StarRating rating={profileData?.overall_avg_rating || 0} />

        <p className="mt-2 text-base leading-[150%] font-semibold tracking-[-0.32px] text-white xl:text-lg 2xl:text-xl">
          Average Rating Based on {profileData?.total_reviews || 0} reviews
        </p>
      </Card>

      <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
        <h5 className="text-base leading-[150%] font-semibold text-white uppercase xl:text-lg 2xl:text-xl">
          Coaching Titles
        </h5>
        <div className="mt-3 flex flex-wrap gap-4 xl:mt-4 xl:gap-5">
          {coaching_titles && coaching_titles.length > 0 && coaching_titles?.map((title, index) => (
            <span
              key={index}
              className="rounded-[6px] bg-white/10 p-2 text-[10px] leading-[120%] font-medium text-white xl:px-2.5 xl:py-2.5 xl:text-[11px] 2xl:text-xs"
            >
              {title}
            </span>
          ))}
        </div>
      </Card>

      <SocialLinks
        profileUrl={`profile/coach`}
        facebookUrl={profileData?.facebook_link || undefined}
        twitterUrl={profileData?.twitter_link || undefined}
        whatsappUrl={profileData?.whatsapp_link || undefined}

      />
    </aside>
  )
}


// Add this helper above the component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="mt-1 flex items-center gap-1 xl:mt-2 xl:gap-1.5 xl:[&_svg]:scale-110 2xl:[&_svg]:scale-125">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating - i
        if (filled >= 1) return <FullStarIcon key={i} />
        if (filled > 0) return <PartialStarIcon key={i} />
        return <EmptyStarIcon key={i} />   // add EmptyStarIcon to your icons if not already there
      })}
    </div>
  )
}

// icons.tsx
export function EmptyStarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z"
        stroke="#6B7280" strokeWidth="1.2" fill="none"
      />
    </svg>
  )
}