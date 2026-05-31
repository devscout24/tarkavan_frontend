import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import CommonBtn from "@/components/common/common-btn"
import { LuUserRound } from "react-icons/lu"
import { CiAlarmOn } from "react-icons/ci"
import { SlCalender } from "react-icons/sl"

export type ProgramCardProps = {
  image: string | StaticImageData
  name?: string
  onClick?: () => void
  className?: string
  price: string
  user: string
  calender: string
  duration: string
  btnText?: string 
}

export default function ProgramCard({
  image,
  name,
  onClick,
  className,
  price,
  user,
  calender,
  duration,
  btnText = "View Program",
}: ProgramCardProps) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/12 transition-all duration-300 ${className} `}
      onClick={onClick}
    >
      <div className="min-h-50">
        <Image
          src={image}
          alt={name || "Coach Image"}
          fill
          className="relative h-50 max-h-50 object-cover"
        />
      </div>

      <div className={"flex h-full flex-col justify-between p-5"}>
        {/* Header */}
        <div className="mb-4 flex items-center">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>
          </div>
          <p className="text-lg font-bold text-brand">{price}</p>
        </div>

        <div className="mt-6 gap-2 space-y-2 opacity-80">
          <p className="flex items-center text-sm text-white">
            <LuUserRound className="mr-2 text-xl" />
            <span>{user}</span>
          </p>
          <p className="flex items-center text-sm text-white">
            <SlCalender className="mr-2 text-lg" />
            <span>{calender}</span>
          </p>
          <p className="flex items-center text-sm text-white">
            <CiAlarmOn className="mr-2 text-xl" />
            <span>{duration}</span>
          </p>
        </div>

        <CommonBtn
          variant="default"
          size="lg"
          text={btnText}
          onClick={onClick}
          className="mt-5 w-full cursor-pointer bg-brand text-primary hover:bg-brand hover:text-primary"
        />
      </div>
    </div>
  )
}
