"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Sparkles, X } from "lucide-react"

interface PlayerSetupHeaderProps {
  title?: string
  subtitle?: string
  isUpdate?: boolean
  currentStep?: number
  totalSteps?: number
  onClose?: () => void
}

export default function PlayerSetupHeader({
  title = "Player Profile Setup",
  subtitle = "Complete athlete credentials, match stats & media highlights",
  isUpdate = false,
  currentStep,
  totalSteps,
  onClose,
}: PlayerSetupHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden border-b border-white/10 bg-[#1A202C] px-6 py-4.5"
    >
      {/* Top Gradient Accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-brand via-teal-400 to-emerald-400" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30 shadow-sm">
            {isUpdate ? (
              <ShieldCheck className="size-5.5" />
            ) : (
              <Sparkles className="size-5.5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                {isUpdate ? "Update Player Profile" : title}
              </h2>
              <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider">
                {isUpdate ? "Edit Mode" : "Official Athlete"}
              </span>
            </div>
            <p className="text-xs text-white/60">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentStep && totalSteps && (
            <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-3.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                Setup Progress
              </span>
              <span className="text-xs font-bold text-brand">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          )} 
        </div>
      </div>
    </motion.header>
  )
}

