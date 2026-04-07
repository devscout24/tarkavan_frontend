"use client"
import { Calendar, Clock3, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

      <CardContent className="p-4">
        <div className="flex h-15.5 items-start justify-between gap-4">
          <h3 className="line-clamp-2 max-w-[70%] overflow-hidden text-lg leading-tight font-semibold text-ellipsis">
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
        <div className="mt-2 flex items-center gap-4">
          <CommonBtn
            text={buttonLabel}
            className="h-11 flex-1 rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90"
            size={"lg"}
            variant={"default"}
            onClick={onClick}
          />
          <ThreeDotsMenu
            isVisible={shouldShowThreeDotsMenu}
            items={threeDotsItems}
            triggerClassName="h-11 w-11 rounded-xl"
            menuClassName="w-44"
          />
        </div>
      </CardContent>
    </Card>
  )
}
