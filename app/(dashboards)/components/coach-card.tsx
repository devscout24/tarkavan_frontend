import * as React from "react"
import Image, { type StaticImageData } from "next/image" 
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils" 
import { IoIosFootball } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb"; 
import { Award } from "lucide-react";
import CommonBtn from "@/components/common/common-btn";

export type CoachCardProps = {
  image?: string | StaticImageData
  name?: string 
  onClick?: () => void
  className?: string  
  age: string , 
  type: string ,
  experience: string ,
  location: string ,
  head: string ,
  award: string ,
}

export default function CoachCard({
  image,
  name, 
  age ,
  onClick,
  className,   
  type,
  experience,
  location,
  head,
  award
}: CoachCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/12 bg-[#09070f] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] relative hover:shadow-[0_32px_80px_rgba(0,0,0,0.35)] transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative aspect-448/234 min-h-50 w-full overflow-hidden"
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name || "Coach Image"}
            fill
            className="object-cover h-50 " 
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
 
        </div>
      </div>

      <CardContent className={cn("p-5 h-full flex flex-col justify-between   ")}>
        {/* Header */}
        <div className="mb-4 flex items-center   ">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <div className="text-sm text-white flex gap-2  "> 
                    <p className="text-xs  ">Age : {age}</p>
                    <TfiLayoutLineSolid className="rotate-90 text-white" /> 
                    <p className="text-xs  ">{type}</p> 
                    <TfiLayoutLineSolid className="rotate-90 text-white" />
                    <p className="text-xs  ">Age : {experience}</p>
                </div>
            </div>
            <div className="w-9 h-9 bg-secondary rounded-md grid place-items-center   "> 
                <IoIosFootball className="text-2xl  "   />
            </div>
 
        </div>

        <div className=" gap-2  opacity-80 space-y-2 mt-6    ">
 
            <p className="text-sm text-white flex items-center  ">
                <CiLocationOn className="text-xl mr-2  " />
                <span>{location}</span>
            </p>
            <p className="text-sm text-white flex items-center  ">
                <TbCurrentLocation className="text-xl mr-2  " /> 
                <span>{head}</span>
            </p>
            <p className="text-sm text-white flex items-center  ">
                <Award className="text-xl mr-2  " /> 
                <span>{award}</span>
            </p> 
        </div>

        <CommonBtn 
        variant="default" 
        size="lg" 
        text="View Profile"
        className="mt-5 bg-brand hover:bg-brand text-primary hover:text-primary w-full     "
        />
 
 
      </CardContent>
    </Card>
  )
}
