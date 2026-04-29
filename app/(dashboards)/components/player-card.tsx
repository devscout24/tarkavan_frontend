import * as React from "react"
import Image, { type StaticImageData } from "next/image" 
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils" 
import { IoIosFootball } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb";  
import CommonBtn from "@/components/common/common-btn";

export type PlayerCardProps = {
  image?: string | StaticImageData
  name?: string 
  age: string,
  position: string,
  jerseyNumber: string,
  onClick?: () => void
  className?: string   
  location: string ,
  parental_control: boolean ,  
  games: string ,
  goals: string ,
  assists: string ,
}

export default function PlayerCard({
  image,
  name,  
  age,
  position,
  jerseyNumber,
  onClick,
  className,    
  location,
  parental_control,   
  games , 
  goals , 
  assists
}: PlayerCardProps) {

  console.log(image);
  
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
          "relative aspect-448/234 min-h-50  w-full overflow-hidden"
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name || "Player Image"}
            fill
            className="object-cover"  
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
 
        </div>
      </div>

      <CardContent className={cn("p-5 flex flex-col justify-between h-full   ")}>
        {/* Header */}
        <div className="mb-4 flex items-center   ">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <div className="text-sm text-white flex gap-2  "> 
                    <p className="text-xs  ">Age: {age}</p>   
                    <TfiLayoutLineSolid className="rotate-90 text-white" />
                    <p className="text-xs  ">{position ? position : "Not Specified"}</p>
                    <TfiLayoutLineSolid className="rotate-90 text-white" />
                    <p className="text-xs  ">Jersey: {jerseyNumber}</p>
                </div>
            </div>
            <div className="w-9 h-9 bg-secondary rounded-md grid place-items-center   "> 
                <IoIosFootball className="text-2xl  "   />
            </div>
 
        </div>

        <div className=" gap-2  opacity-80 space-y-2 mt-6    ">
 
            <p className="text-sm text-white flex items-center  ">
                <CiLocationOn className="text-xl mr-2  " />
                <span>{location ? location : "Not Specified"}</span>
            </p>
            <p className="text-sm text-white flex items-center  ">
                <TbCurrentLocation className="text-xl mr-2  " /> 
                <span>{parental_control ? "Parental Control Enabled" : "No Parental Control"}</span>
            </p> 
        </div>

        <div className="bg-secondary/40 mt-5 p-2 rounded-md flex items-center justify-around    ">
           <div className="flex items-center gap-2">
            <span>Games:</span>
            <span>{games}</span>
           </div>
           <TfiLayoutLineSolid className="rotate-90 text-white" />
           <div className="flex items-center gap-2">
            <span>Goals:</span>
            <span>{goals}</span>
           </div>
           <TfiLayoutLineSolid className="rotate-90 text-white" />
           <div className="flex items-center gap-2">
            <span>Assists:</span>
            <span>{assists}</span>
           </div>
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
