"use client"
import { Calendar, Clock3, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import CommonBtn from "./common-btn"
import ThreeDotsMenu, { type ThreeDotsMenuItem } from "./three-dots-menu"
import Image, { StaticImageData } from "next/image"

type ProgramCardProps = {
  id?: string | number
  title?: string
  coachName?: string
  schedule?: string
  duration?: string
  currentPrice?: string
  previousPrice?: string
  discountLabel?: string
  imageSrc: string | StaticImageData
  imageAlt: string
  buttonLabel?: string
  className?: string
  onClick?: () => void
  showThreeDotsMenu?: boolean
  threeDotsItems?: ThreeDotsMenuItem[]
}

export default function ProgramCard({
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
  onClick,
  showThreeDotsMenu,
  threeDotsItems = [],
}: ProgramCardProps) {
  const shouldShowThreeDotsMenu = showThreeDotsMenu ?? threeDotsItems.length > 0

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-secondary/40 bg-primary py-0 text-white",
        className
      )}
    >
      <div className="relative max-h-48 w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={imageSrc}
          alt={imageAlt}
          className="w-full object-cover"
        />

        {discountLabel && (
          <Badge className="absolute top-3 right-3 h-8 rounded-full bg-emerald-500 px-3 text-sm font-semibold text-white hover:bg-emerald-500">
            {discountLabel}
          </Badge>
        )}
      </div>

      <CardContent className="h-full flex flex-col justify-between  p-4">
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

        <div className="space-y-2 text-[14px] font-light text-white/80">
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
        <div className="flex gap-4">
          <CommonBtn text={buttonLabel}  className="flex-1 h-11 rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90   " size={"lg"} variant={"default"} onClick={onClick} />
          {shouldShowThreeDotsMenu && (
            <ThreeDotsMenu items={threeDotsItems} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ProgramCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden rounded-2xl border border-secondary/40 bg-primary py-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <CardContent className="h-full flex flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-4 h-15.5">
          <Skeleton className="h-6 w-[70%]" />
          <div className="text-right">
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-4 w-12 ml-auto" />
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div> 

        <div className="flex gap-4 mt-6">
          <Skeleton className="flex-1 h-11 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
