import * as React from "react"
import Image, { type StaticImageData } from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TbPoint } from "react-icons/tb"
import { IoIosFootball } from "react-icons/io"

export type ExploreCardProps = {
  image?: string | StaticImageData
  name?: string
  summary?: string
  details?: string[]
  price?: string
  desc?: string
  stats?: string[]
  onClick?: () => void
  className?: string 
  contentClassName?: string
}

export default function ExploreCard({
  image,
  name,
  summary,
  details,
  price,
  stats,
  desc,
  onClick,
  className,  
}: ExploreCardProps) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/12 bg-[#09070f] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] relative ",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-448/234 w-full overflow-hidden"
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name || "Explore Image"}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />
        )}
      </div>

      <CardContent className={cn("space-y-5 px-5 py-5  pb-15   " )}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            {name && (
              <h3 className="text-[30px] leading-none font-medium tracking-[-0.02em] text-white">
                {name}
              </h3>
            )}
            {summary && (
              <p className="text-[17px] leading-relaxed text-white/92">
                {summary}
              </p>
            )}
          </div>

          {price ? (
            <div className="text-[24px] font-bold text-brand">{price}</div>
          ) : (
            <div className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-white/12 text-white">
              <IoIosFootball className="text-2xl" />
            </div>
          )}
        </div>

        <div className="space-y-3 pt-1 text-[15px] text-white/70">
          {details?.map((detail) => (
            <div key={detail} className="flex items-center gap-3">
              <span className="grid size-5 shrink-0 place-items-center text-white/70">
                <TbPoint />
              </span>
              <span className="leading-none">{detail}</span>
            </div>
          ))}
        </div>

        {stats && stats.length > 0 && (
          <div className="flex justify-between gap-2 rounded-md bg-white/12 px-3 py-2 pt-2 text-sm text-white/70">
            {stats.map((stat, index) => (
              <span key={index} className="rounded-full">
                {stat}
              </span>
            ))}
          </div>
        )}

        {desc && (
          <div className="flex justify-between gap-2 rounded-md bg-white/12 px-3 py-2 pt-2 text-sm text-white/70">
            {desc}
          </div>
        )}

        <Button
          type="button"
          onClick={onClick}
          className="h-14 w-9/10 absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-brand text-[18px] font-semibold text-[#0d0d0d] hover:bg-brand/95"
        >
          {"View Details"}
        </Button>
      </CardContent>
    </Card>
  )
}
