"use client"

import { Icon } from "@/components/custom/Icon"

interface StripeAccountProps {
  title: string
  description: string
  onClick?: () => void
}

const ArrowRightIcon = () => (
  <Icon width="8" height="12" viewBox="0 0 8 12">
    <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill="white"/>
  </Icon>
)

export default function StripeAccount({ title, description, onClick }: StripeAccountProps) {
  return (
    <section 
      className="flex cursor-pointer items-center justify-between rounded-[16px] bg-white/20 p-4 transition-all hover:bg-white/30 mt-4"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-[16px] leading-[150%] font-medium text-white">
          {title}
        </h3>
        <p className="text-[14px] leading-[150%] font-normal text-white/80">
          {description}
        </p>
      </div>
      
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
        <ArrowRightIcon />
      </div>
    </section>
  )
}
