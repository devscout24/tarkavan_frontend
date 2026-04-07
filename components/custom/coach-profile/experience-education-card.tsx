"use client"

import { Card } from "@/components/ui/card"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { EducationIcon, ExperienceIcon } from "./icons"

export default function ExperienceEducationCard() {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const isTimelineInView = useInView(timelineRef, {
    margin: "-20% 0px -20% 0px",
  })

  return (
    <Card className="rounded-[12px] border border-secondary/60 bg-primary p-6 xl:p-7 2xl:p-8">
      <h5 className="text-2xl leading-[125%] font-medium text-white xl:text-3xl 2xl:text-[34px]">
        Experience &amp; Education
      </h5>

      <div
        ref={timelineRef}
        className="relative mt-6 hidden min-h-52.5 xl:mt-7 xl:block xl:min-h-80 2xl:mt-8 2xl:min-h-90"
      >
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
        <motion.div
          className="absolute top-0 left-1/2 h-full w-0.75 -translate-x-1/2 bg-white/45 blur-[1px]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isTimelineInView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        />

        <motion.div
          className="absolute top-[18%] left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 xl:[&_svg]:scale-115 2xl:[&_svg]:scale-125"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: isTimelineInView ? 1 : 0.6,
            opacity: isTimelineInView ? 1 : 0,
          }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <ExperienceIcon />
        </motion.div>

        <motion.div
          className="absolute top-[64%] left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 xl:[&_svg]:scale-115 2xl:[&_svg]:scale-125"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: isTimelineInView ? 1 : 0.6,
            opacity: isTimelineInView ? 1 : 0,
          }}
          transition={{ delay: 0.55, duration: 0.35 }}
        >
          <EducationIcon />
        </motion.div>

        <div className="grid grid-cols-[1fr_64px_1fr] gap-3 xl:grid-cols-[1fr_96px_1fr] xl:gap-4 2xl:grid-cols-[1fr_132px_1fr] 2xl:gap-5">
          <div className="mt-27 min-w-0 xl:mt-32 2xl:mt-36">
            <div className="min-w-0 rounded-[12px] border border-secondary/60 bg-white/10 p-4 xl:p-5 2xl:p-6">
              <div className="flex items-start justify-between gap-3">
                <h6 className="min-w-0 text-[22px] leading-[112%] font-medium text-white xl:text-[28px] 2xl:text-[36px]">
                  M.S. in Sports Science
                </h6>
                <span className="rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70 xl:px-2.5 xl:py-1.5 xl:text-sm">
                  2016
                </span>
              </div>
              <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50 xl:text-sm 2xl:text-base">
                Northwestern University
              </p>
              <p className="mt-2 text-sm leading-[150%] text-white/80 xl:text-base 2xl:text-lg">
                Concentration in Kinesiology and High-Performance Athletic
                Training.
              </p>
            </div>
          </div>

          <div />

          <div className="min-w-0">
            <div className="min-w-0 rounded-[12px] border border-secondary/60 bg-white/10 p-4 xl:p-5 2xl:p-6">
              <div className="flex items-start justify-between gap-3">
                <h6 className="min-w-0 text-[22px] leading-[112%] font-medium text-white xl:text-[28px] 2xl:text-[36px]">
                  Senior Performance Director
                </h6>
                <span className="rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70 xl:px-2.5 xl:py-1.5 xl:text-sm">
                  2018-Present
                </span>
              </div>
              <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50 xl:text-sm 2xl:text-base">
                Elite Pro Basketball Academy
              </p>
              <p className="mt-2 text-sm leading-[150%] text-white/80 xl:text-base 2xl:text-lg">
                Leading professional development programs for NBA and G-League
                prospects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 xl:hidden">
        <div className="rounded-[12px] border border-secondary/60 bg-white/10 p-4">
          <h6 className="text-[22px] leading-[120%] font-medium text-white">
            Senior Performance Director
          </h6>
          <span className="mt-2 inline-block rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70">
            2018-Present
          </span>
          <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50">
            Elite Pro Basketball Academy
          </p>
          <p className="mt-2 text-sm leading-[150%] text-white/80">
            Leading professional development programs for NBA and G-League
            prospects.
          </p>
        </div>

        <div className="rounded-[12px] border border-secondary/60 bg-white/10 p-4">
          <h6 className="text-[22px] leading-[120%] font-medium text-white">
            M.S. in Sports Science
          </h6>
          <span className="mt-2 inline-block rounded-[6px] bg-secondary/40 px-2 py-1 text-xs text-white/70">
            2016
          </span>
          <p className="mt-2 text-xs leading-[150%] font-semibold tracking-[-0.24px] text-white/50">
            Northwestern University
          </p>
          <p className="mt-2 text-sm leading-[150%] text-white/80">
            Concentration in Kinesiology and High-Performance Athletic Training.
          </p>
        </div>
      </div>
    </Card>
  )
}
