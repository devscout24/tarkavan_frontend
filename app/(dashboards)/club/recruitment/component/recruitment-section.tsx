 
import { cn } from "@/lib/utils"

import RecruitmentCard, { type RecruitmentCardData } from "./recruitment-card" 

type RecruitmentSectionProps = {
  addLabel: string
  items: RecruitmentCardData[]
  className?: string
}

export default function RecruitmentSection({
  addLabel,
  items,
  className,
}: RecruitmentSectionProps) {
 

  return (
    <div className={cn("space-y-3", className)} >
      <div className="flex justify-start">
        <p className=" rounded-md px-3 text-base font-medium text-brand"> 
          {addLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <RecruitmentCard key={item.id} item={item}  />
        ))}
        <div className=" rounded-xl border border-dashed border-white/15" />
      </div>
    </div>
  )
}
