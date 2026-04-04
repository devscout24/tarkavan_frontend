import { Calendar, Clock3, UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge" 
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CommonBtn from "./common-btn"
import { useNavigate } from "react-router"

type ProgramCardProps = {
  id?: string | number
  title?: string
  coachName?: string
  schedule?: string
  duration?: string
  currentPrice?: string
  previousPrice?: string
  discountLabel?: string
  imageSrc?: string
  imageAlt?: string
  buttonLabel?: string
  className?: string
  onViewDetails?: () => void
}

export default function ProgramCard({
  id,
  title,
  coachName,
  schedule,
  duration,
  currentPrice,
  previousPrice,
  discountLabel,
  imageSrc,
  imageAlt,
  buttonLabel,
  className, 
}: ProgramCardProps) {

    const navigate = useNavigate()

  return (
    <Card
      
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-secondary/40 bg-primary py-0 text-white",
        className
      )}
    >
      <div className="relative  w-full overflow-hidden max-h-48 ">
        <img
          src={imageSrc}
          alt={imageAlt}
          className=" w-full object-cover"
        />
 
        {discountLabel && 
            <Badge className="absolute top-3 right-3 h-8 rounded-full bg-emerald-500 px-3 text-sm font-semibold text-white hover:bg-emerald-500">
            {discountLabel}
            </Badge>
        }
      </div>

      <CardContent className="   p-4">
        <div className="flex items-start justify-between gap-4 h-15.5 ">
          <h3 className="max-w-[70%] text-lg leading-tight font-semibold line-clamp-2 overflow-hidden text-ellipsis ">
            {title}
          </h3>

          <div className="text-right">
            <p className="text-lg leading-none font-bold text-brand">
              {currentPrice}
            </p>
            <p className="mt-1 text-lg text-white/70 line-through">
              {previousPrice}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-lg font-light text-white/80">
          <div className="flex items-center gap-2">
            <UserRound className="size-4" />
            <span>Coach: {coachName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="size-4" />
            <span>{duration}</span>
          </div>
        </div> 
        <CommonBtn text={buttonLabel}  className=" mt-2 h-11 w-full rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90   " size={"lg"} variant={"default"} onClick={() => navigate(`/player/programs/details/${id}`)} />
      </CardContent>
    </Card>
  )
}
