import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IoIosFootball } from "react-icons/io"
import { TfiLayoutLineSolid } from "react-icons/tfi"
import { CiLocationOn } from "react-icons/ci"
import { TbCurrentLocation } from "react-icons/tb"
import { Award } from "lucide-react"
import CommonBtn from "@/components/common/common-btn"

export type CoachCardProps = {
  image?: string | StaticImageData
  name?: string
  onClick?: () => void
  className?: string
  age: string
  type: string
  experience: string
  location: string
  head: string
  award: string
}

export default function CoachCard({
  image,
  name,
  age,
  onClick,
  className,
  type,
  experience,
  location,
  head,
  award,
}: CoachCardProps) {
  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/12 bg-[#09070f] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 hover:shadow-[0_32px_80px_rgba(0,0,0,0.35)]",
        className
      )}
      
    >
      <div
        className={cn(
          "relative aspect-448/234 min-h-50 w-full overflow-hidden"
        )}
      >
        {image && (
          <Image
            src={encodeURI(image as string)}
            alt={name || "Coach Image"}
            width={500}
            height={300}
            className="h-50 max-h-50 object-cover"
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute right-0 bottom-0 left-0 p-4"></div>
      </div>

      <CardContent className={cn("flex h-full flex-col justify-between p-5")}>
        {/* Header */}
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white">
              <p className="text-xs">Age : {age}</p>
              <TfiLayoutLineSolid className="rotate-90 text-white" />
              <p className="text-xs">{type}</p>
              <TfiLayoutLineSolid className="rotate-90 text-white" />
              <p className="text-xs">Experience : {experience}</p>
            </div>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary">
            <IoIosFootball className="text-2xl" />
          </div>
        </div>

        <div className="mt-6 gap-2 space-y-2 opacity-80">
          <p className="flex items-center text-sm text-white">
            <CiLocationOn className="mr-2 text-xl" />
            <span>{location}</span>
          </p>
          <p className="flex items-center text-sm text-white">
            <TbCurrentLocation className="mr-2 text-xl" />
            <span>{head}</span>
          </p>
          <p className="flex items-center text-sm text-white">
            <Award className="mr-2 text-xl" />
            <span className=" line-clamp-4   ">{award}</span>
          </p>
        </div>

        <CommonBtn
          variant="default"
          size="lg"
          text="View Profile"
          onClick={onClick}
          className="mt-5 w-full bg-brand text-primary hover:bg-brand hover:text-primary"
        />
      </CardContent>
    </Card>
  )
}
