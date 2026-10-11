"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  User,
  Compass,
  Activity,
  Trophy,
} from "lucide-react"

import PlayerSetupHeader from "./components/player-setup-header"
import CoreIdentity from "./components/core-identity"
import { UploadAvatar } from "./components/profile-img"
import PositionSelection from "./components/position-selection"
import SeasonStats from "./components/season-stats"
import StrengthsDesign from "./components/top-strength"
import BioSetup from "./components/bio-setup"
import Media from "./components/media"
import AchievementDetailsForm from "./components/achivement"
import CommonBtn from "@/components/common/common-btn"
import useModal from "../../useModal"

import { TPlayerProfilePayload } from "./type"
import { INITIAL_PLAYER_PAYLOAD, SETUP_STEPS } from "./constants"
import {
  addChild,
  addPlayer,
  convertToFormData,
  updatePlayer,
} from "../player-add-modal/action"
import { updateChildProfile } from "@/app/(dashboards)/parent/action"
import { validatePlayerProfilePayload } from "@/lib/player-validate"

const STEP_ICONS = [User, Compass, Activity, Trophy]

export default function PLayerSetup() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [payload, setPayload] = useState<TPlayerProfilePayload>(INITIAL_PLAYER_PAYLOAD)

  const searchParams = useSearchParams()
  const source = searchParams.get("source")
  const isUpdatePlayer = searchParams.get("update") === "player"
  const isUpdateChild = searchParams.get("update") === "child"
  const isUpdate = isUpdatePlayer || isUpdateChild

  const params = useParams()
  const edit_child_id = params.id
  const child_id = params.child_id
  const { close } = useModal()

  useEffect(() => {
    const data = localStorage.getItem("go_elite_user")
    if (data) {
      setUser(JSON.parse(data))
    }
  }, [])

  const handleClose = () => {
    close("player", ["source", "update", "id", "child_id", "porogress", "progress"])
    close("update", ["source", "update", "id", "child_id", "porogress", "progress"])
    close("source", ["source", "update", "id", "child_id", "porogress", "progress"])
  }

  const handleSaveProgress = () => {
    if (!user?.email) {
      toast.error("User not found. Please log in again.")
      return
    }

    window.localStorage.setItem(
      `go_elit_player_progress_${user?.email}`,
      JSON.stringify(payload)
    )
    toast.success("Player setup progress saved successfully!")
    handleClose()
  }

  useEffect(() => {
    if (!source) return

    if (source === "progress") {
      const saved = window.localStorage.getItem(`go_elit_player_progress_${user?.email}`)
      if (saved) setPayload(JSON.parse(saved))
    } else if (source === "edit") {
      const saved = window.localStorage.getItem(`go_elit_player_edit_data_${user?.email}`)
      if (saved) setPayload(JSON.parse(saved))
    } else {
      setPayload(INITIAL_PLAYER_PAYLOAD)
    }
  }, [user, source])

  const validateWithStepJump = (): boolean => {
    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.dateOfBirth ||
      !payload.gender ||
      !payload.nationality ||
      !payload.email ||
      !payload.sport ||
      !payload.jerseyNumber ||
      !payload.dominantFoot ||
      !payload.clubTeam ||
      !payload.country ||
      !payload.province
    ) {
      setCurrentStepIndex(0)
      return validatePlayerProfilePayload(payload)
    }

    if (!payload.primaryPosition || !payload.secondaryPosition) {
      setCurrentStepIndex(1)
      return validatePlayerProfilePayload(payload)
    }

    if (!payload.achievements?.title) {
      setCurrentStepIndex(3)
      return validatePlayerProfilePayload(payload)
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateWithStepJump()) return

    setLoading(true)
    try {
      let res: any
      const isParent = user?.role === "parent"

      if (isUpdate) {
        if (isUpdateChild && isParent) {
          const formData = await convertToFormData(payload)
          res = await updateChildProfile({
            data: formData,
            child_id: String(edit_child_id || child_id),
          })
        } else {
          res = await updatePlayer(payload)
        }
      } else {
        res = isParent ? await addChild(payload) : await addPlayer(payload)
      }

      if (res?.status || res?.success) {
        if (!isUpdate) {
          const storedUser = JSON.parse(localStorage.getItem("go_elite_user") || "{}")
          storedUser.status = "approve"
          if (res?.data?.id) storedUser.profile_id = res.data.id
          localStorage.setItem("go_elite_user", JSON.stringify(storedUser))
        }

        window.localStorage.removeItem("go_elitr_player_setup_progress")
        if (user?.email) {
          window.localStorage.removeItem(`go_elit_player_progress_${user.email}`)
        }

        window.dispatchEvent(
          new CustomEvent(
            isUpdate
              ? "player_profile_updated"
              : isParent
              ? "child_added"
              : "player_profile_updated"
          )
        )

        toast.success(
          res?.message ||
            (isUpdate
              ? "Profile updated successfully"
              : isParent
              ? "Child profile added successfully"
              : "Player profile added successfully")
        )

        handleClose()
        setPayload(INITIAL_PLAYER_PAYLOAD)

        const url = new URL(window.location.href)
        url.search = ""
        window.history.replaceState({}, document.title, url.toString())
      } else {
        toast.error(res?.message || "Failed to submit player profile")
      }
    } catch (error) {
      console.error("Error submitting player setup:", error)
      toast.error("Failed to process request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isStepComplete = (index: number): boolean => {
    switch (index) {
      case 0:
        return Boolean(
          payload.firstName &&
            payload.lastName &&
            payload.dateOfBirth &&
            payload.gender &&
            payload.sport &&
            payload.country
        )
      case 1:
        return Boolean(payload.primaryPosition && payload.secondaryPosition)
      case 2:
        return Boolean(
          payload.seasonStats.values.gamesPlayed ||
            payload.seasonStats.values.goals
        )
      case 3:
        return Boolean(payload.achievements?.title)
      default:
        return false
    }
  }

  const currentStep = SETUP_STEPS[currentStepIndex]
  const progressPercent = ((currentStepIndex + 1) / SETUP_STEPS.length) * 100

  return (
    <div className="relative rounded-3xl border border-white/12 bg-[#121620] text-white shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}
      <PlayerSetupHeader
        isUpdate={isUpdate}
        currentStep={currentStepIndex + 1}
        totalSteps={SETUP_STEPS.length}
        onClose={handleClose}
      />

      {/* Stepper Track */}
      <div className="border-b border-white/10 bg-[#161C28] px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {SETUP_STEPS.map((step, idx) => {
            const isActive = currentStepIndex === idx
            const completed = isStepComplete(idx)
            const Icon = STEP_ICONS[idx] || User

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex-1 flex items-center justify-center sm:justify-start gap-2 rounded-xl px-3 py-2 text-xs transition-all duration-200 ${
                  isActive
                    ? "bg-brand text-black font-bold shadow-md shadow-brand/20 scale-[1.01]"
                    : completed
                    ? "bg-[#1E2536] text-emerald-400 hover:bg-[#252E42] font-semibold border border-white/5"
                    : "bg-[#1E2536]/50 text-white/60 hover:bg-[#1E2536] hover:text-white border border-transparent"
                }`}
              >
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                    isActive
                      ? "bg-black text-brand"
                      : completed
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {completed && !isActive ? (
                    <Check className="size-3 stroke-[3]" />
                  ) : (
                    <Icon className="size-3" />
                  )}
                </div>

                <span className="hidden sm:inline truncate">{step.shortLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Progress Line */}
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-linear-to-r from-brand to-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="no-scrollbar max-h-[64vh] overflow-y-auto px-4 py-5 pb-24 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {currentStep.id === "identity" && (
              <>
                <UploadAvatar payload={payload} setPayload={setPayload} />
                <CoreIdentity payload={payload} setPayload={setPayload} />
                <BioSetup payload={payload} setPayload={setPayload} />
              </>
            )}

            {currentStep.id === "position_skills" && (
              <>
                <PositionSelection payload={payload} setPayload={setPayload} />
                <StrengthsDesign payload={payload} setPayload={setPayload} />
              </>
            )}

            {currentStep.id === "stats" && (
              <SeasonStats payload={payload} setPayload={setPayload} />
            )}

            {currentStep.id === "media_awards" && (
              <>
                <Media payload={payload} setPayload={setPayload} />
                <AchievementDetailsForm payload={payload} setPayload={setPayload} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/10 bg-[#161C28]/95 px-6 py-3.5 backdrop-blur-md">
        <button
          type="button"
          onClick={handleSaveProgress}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1E2536] px-4 py-2.5 text-xs font-semibold text-white/80 transition-all hover:border-white/20 hover:bg-[#252E42] hover:text-white"
        >
          <Save className="size-3.5 text-brand" />
          <span className="hidden sm:inline">Save Draft</span>
          <span className="sm:hidden">Draft</span>
        </button>

        <div className="flex items-center gap-2.5">
          {currentStepIndex > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#1E2536] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-white/20 hover:bg-[#252E42]"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back</span>
            </button>
          )}

          {currentStepIndex < SETUP_STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => setCurrentStepIndex((prev) => Math.min(SETUP_STEPS.length - 1, prev + 1))}
              className="flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/15 px-5 py-2.5 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-black hover:shadow-md hover:shadow-brand/20 active:scale-95"
            >
              <span>Next</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}

          {(currentStepIndex === SETUP_STEPS.length - 1 || isUpdate) && (
            <CommonBtn
              size="default"
              variant="default"
              text={isUpdate ? "Update Profile" : "Complete Profile"}
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              className="rounded-xl  border-0 bg-brand px-6 w-40 py-2.5 text-xs font-bold text-black shadow-md shadow-brand/25 transition-transform hover:bg-brand hover:scale-102 active:scale-98"
            />
          )}
        </div>
      </div>
    </div>
  )
}
