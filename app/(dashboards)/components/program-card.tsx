import * as React from "react"
import Image, { type StaticImageData } from "next/image"  
import CommonBtn from "@/components/common/common-btn";
import { LuUserRound } from "react-icons/lu";
import { CiAlarmOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";

export type ProgramCardProps = {
  image: string | StaticImageData
  name?: string 
  onClick?: () => void
  className?: string   
  price: string ,
  user: string ,
  calender: string ,
  duration: string ,
}

export default function ProgramCard({
  image,
  name,  
  onClick,
  className,   
  price ,
  user ,
  calender ,
  duration
}: ProgramCardProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-white/12  transition-all duration-300   flex flex-col relative  ${className} `}
      onClick={onClick}
    >
        <div className="min-h-50  "> 
            <Image
                src={image}
                alt={name || "Coach Image"}
                fill
                className="object-cover  h-50  max-h-50  relative    " 
            /> 
        </div>
 

      <div className={" h-full flex p-5 flex-col justify-between    "}>
        {/* Header */}
        <div className="mb-4 flex items-center   ">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3> 
            </div>
            <p className="text-lg font-bold text-brand ">{price}</p>
 
        </div>

        <div className=" gap-2  opacity-80 space-y-2 mt-6    ">
 
            <p className="text-sm text-white flex items-center  ">
                <LuUserRound className="text-xl mr-2  " />
                <span>{user}</span>
            </p>
            <p className="text-sm text-white flex items-center  ">
                <SlCalender className="text-lg mr-2  " /> 
                <span>{calender}</span>
            </p>
            <p className="text-sm text-white flex items-center  ">
                <CiAlarmOn className="text-xl mr-2  " /> 
                <span>{duration}</span>
            </p> 
        </div>

        <CommonBtn 
        variant="default" 
        size="lg" 
        text="View Profile"
        className="mt-5 bg-brand hover:bg-brand text-primary hover:text-primary w-full     "
        />
 
 
      </div>
    </div>
  )
}
