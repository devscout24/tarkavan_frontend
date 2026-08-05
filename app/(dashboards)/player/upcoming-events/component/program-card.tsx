"use client"
import {
  Calendar,
  Clock3,
  Edit2, 
  Trash2,
  UserRound,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils" 
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDots } from "react-icons/bs"
import { deleteProgram } from "@/app/(dashboards)/club/action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteCoachProgram } from "@/app/(dashboards)/coach/my-programs/action"
import CommonBtn from "@/components/common/common-btn"

type ProgramCardProps = {
  title?: string
  sport?: string
  type?: string 
  schedule?: string
  duration?: string
  currentPrice?: string
  previousPrice?: string
  discountLabel?: string
  imageSrc: string | StaticImageData
  imageAlt: string
  buttonLabel?: string
  className?: string 
  showThreeDotsMenu?: boolean 
  id?: string | number
  editLink: string 
}

export default function ProgramCard({
  title,
  sport,
  type, 
  schedule,
  duration,
  currentPrice,
  previousPrice,
  discountLabel,
  imageSrc,
  imageAlt,
  buttonLabel,
  className,  
  id,
  editLink,
}: ProgramCardProps) {

  const router = useRouter()

 

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-secondary/40 bg-primary py-0 text-white",
        className
      )}
    >
      <div className="relative max-h-60 w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={encodeURI(imageSrc as string) || "/images/bannerbg.png"}
          alt={imageAlt}
          className="h-full w-full object-contain"
        />

        {discountLabel && (
          <Badge className="absolute top-3 right-3 h-8 rounded-full bg-emerald-500 px-3 text-sm font-semibold text-white hover:bg-emerald-500">
            {discountLabel}
          </Badge>
        )}
      </div>

      <CardContent className="flex h-fit flex-col gap-y-10  justify-between p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[70%]">
            <h3 className="line-clamp-1 overflow-hidden text-lg leading-tight font-semibold text-ellipsis">
              {title}
            </h3>

            <p className="">{sport}</p>
          </div>

          <div className="text-right">
            <p className="text-lg leading-none font-bold text-brand!">
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
            <span>
              {`Type: ${type}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="size-4" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{duration} program</span>
          </div>
        </div>
        <div className="flex gap-4">
          <CommonBtn
            text={buttonLabel}
            className="h-11 flex-1 rounded-xl bg-brand text-base font-semibold text-primary hover:bg-brand/90"
            size={"lg"}
            variant={"default"} 
            onClick={() => router.push(editLink)}
          />
 
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

      <CardContent className="flex h-full flex-col justify-between p-4">
        <div className="flex h-15.5 items-start justify-between gap-4">
          <Skeleton className="h-6 w-[70%]" />
          <div className="text-right">
            <Skeleton className="mb-1 h-5 w-16" />
            <Skeleton className="ml-auto h-4 w-12" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
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

        <div className="mt-6 flex gap-4">
          <Skeleton className="h-11 flex-1 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
