"use client"

import { motion } from "framer-motion"
import PlayerSetupHeader from "./components/player-setup-header"
import CoreIdentity from "./components/core-identity"
import { UploadAvatar } from "./components/profile-img"
import CommonBtn from "@/components/common/common-btn"
import PositionSelection from "./components/position-selection"
import SeasonStats from "./components/season-stats"
import StrengthsDesign from "./components/top-strength"
import BioSetup from "./components/bio-setup"
import { useEffect, useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs"
import { IoHandRightOutline } from "react-icons/io5"
import Media from "./components/media"
import AchievementDetailsForm from "./components/achivement"
import { TPlayerProfilePayload } from "./type"
import {
  addChild,
  addPlayer,
  convertToFormData,
  updatePlayer,
} from "../player-add-modal/action"
import { toast } from "sonner"
import useModal from "../../useModal"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { updateChildProfile } from "@/app/(dashboards)/parent/action"
import { validatePlayerProfilePayload } from "@/lib/player-validate"

export default function PLayerSetup() {
  const [activeTab, setActiveTab] = useState<"information" | "media">(
    "information"
  )
  const { close } = useModal()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("go_elite_user")
    if (data) {
      setUser(JSON.parse(data))
    }
  }, [])

  const searchParams = useSearchParams()
  // const router = useRouter()
  // const pathname = usePathname()
  const isUpdatePlayer = searchParams.get("update") === "player"
  const isUpdateChild = searchParams.get("update") === "child"
  const params = useParams()
  const edit_child_id = params.id
  const child_id = params.child_id
  const [payload, setPayload] = useState<TPlayerProfilePayload>({
    // Core Identity
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    email: "",
    sport: "",
    jerseyNumber: "",
    dominantFoot: "",
    clubTeam: "",
    country: "",
    city: "",
    province: "",

    profilePhoto: null,
    profilePhotoPreview: "",
    profilePhotoNames: [],

    // Position
    primaryPosition: "",
    secondaryPosition: "",

    // Biography
    biography: "",

    // Season Stats
    seasonStats: {
      activeTab: "outfield",
      values: {
        gamesPlayed: "",
        goals: "",
        assists: "",
        yellowCards: "",
        redCards: "",
        cleanSheets: "",
        totalSaves: "",
      },
    },

    // Strengths
    strengths: {
      activeCategoryId: "",
      selectedByCategory: {},
    },

    // Highlights
    highlights: {
      showcaseValue: "",
      selectedShowcaseSource: null,

      facebook_link: "",
      whatsapp_link: "",
      twitter_link: "",

      uploadedItems: [],
    },

    // Achievement
    achievements: {
      title: "",
      description: "",
      dateEarned: "",

      uploadedAssets: {
        id: "",
        name: "",
        type: "image",
        file: undefined,
      },
    },

    // Privacy
    privacySettings: {
      visibility: "public",
    },
  })

  const [loading, setLoading] = useState<boolean>(false)
  const handleAddPlayer = async () => {
    if (validatePlayerProfilePayload(payload) === false) return

    setLoading(true)
    if (user.role === "player") {
      try {
        const res = await addPlayer(payload)
        if (res.status) {
          const user = JSON.parse(localStorage.getItem("go_elite_user") || "{}")
          user.status = "approve"
          user.profile_id = res.data.id
          localStorage.setItem("go_elite_user", JSON.stringify(user))
          setLoading(false)
          close("player")
          close("update")
          toast.success(res.message || "Player profile added successfully")
          // remove all parameters from the URL
          const url = new URL(window.location.href)
          url.search = ""
          window.history.replaceState({}, document.title, url.toString())
          return
        } else {
          toast.error(res.message)
          setLoading(false)
          return
        }
      } catch (error) {
        setLoading(false)
        toast.error("Failed to add player")
        console.error("Error adding player:", error)
        return
      }
    }

    if (user.role === "parent") {
      try {
        const res = await addChild(payload) 
        if (res.status) {
          const user = JSON.parse(localStorage.getItem("go_elite_user") || "{}")
          user.status = "approve"
          user.profile_id = res.data.id
          localStorage.setItem("go_elite_user", JSON.stringify(user))
          setLoading(false)
          close("player")
          close("update")
          toast.success(res.message || "Child profile added successfully")
          // remove all parameters from the URL
          const url = new URL(window.location.href)
          url.search = ""
          window.history.replaceState({}, document.title, url.toString())
          window.dispatchEvent(new CustomEvent("child_added"))
          return
        } else {
          toast.error(res.message)
          setLoading(false)
          return
        }
      } catch (error) {
        setLoading(false)
        toast.error("Failed to add player")
        console.error("Error adding player:", error)
        return
      }
    }
  }

  const hanldeUpdate = async () => {
    setLoading(true)
    try {
      if (user?.role === "player") {
        try {
          const res = await updatePlayer(payload)

          if (res.status) {
            setLoading(false)
            toast.success(res.message || "Updated success")
            window.dispatchEvent(new CustomEvent("player_profile_updated"))
            close("update")
            localStorage.removeItem("go_elitr_player_setup_progress")
          } else {
            setLoading(false)
            toast.error(res?.message || "Something went wrong")
          }
        } catch (error) {
          setLoading(false)
          toast.error("Failed to add player")
          console.error("Error saving player profile:", error)
        }
      }

      if (isUpdateChild && user?.role === "parent") {
        try {
          const formData = await convertToFormData(payload)
          const res = await updateChildProfile({
            data: formData,
            child_id: String(edit_child_id || child_id),
          })

          if (res?.status) {
            setLoading(false)
            toast.success("Child profile updated successfully")
            window.dispatchEvent(new CustomEvent("player_profile_updated"))
            localStorage.removeItem("go_elitr_player_setup_progress")
            close("update")
          } else {
            setLoading(false)
            toast.error(res?.message || "Something went wrong")
          }
        } catch (error) {
          setLoading(false)
          toast.error("Failed to add player")
          console.error("Error saving player profile:", error)
        }
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleSaveProgress = async () => {
    window.localStorage.setItem(
      "go_elitr_player_setup_progress",
      JSON.stringify(payload)
    )
    toast.success("Player setup progress saved successfully!")
  }

  useEffect(() => {
    const savedProgress = window.localStorage.getItem(
      "go_elitr_player_setup_progress"
    )
    if (savedProgress) {
      setPayload(JSON.parse(savedProgress))
    }
  }, [])

  return (
    <div className="rounded-3xl border border-white/10 bg-[#090B10]">
      <div className="bg-[#161B22]!">
        <PlayerSetupHeader />
        <Tabs
          value={activeTab}
          onValueChange={(value: string) =>
            setActiveTab(value as "information" | "media")
          }
          className="w-full"
        >
          <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl bg-white p-0.5">
            <TabsTrigger
              value="information"
              className="flex h-6 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
            >
              <span>Information</span>
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="flex h-6 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
            >
              <span>Media/Achivement</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="no-scrollbar h-[70dvh] overflow-y-scroll px-4 py-2">
        {activeTab === "information" && (
          <>
            <UploadAvatar payload={payload} setPayload={setPayload} />
            <CoreIdentity payload={payload} setPayload={setPayload} />
            <PositionSelection payload={payload} setPayload={setPayload} />
            <SeasonStats payload={payload} setPayload={setPayload} />
            <StrengthsDesign payload={payload} setPayload={setPayload} />
            <BioSetup payload={payload} setPayload={setPayload} />
          </>
        )}
        {activeTab === "media" && (
          <>
            <Media payload={payload} setPayload={setPayload} />
            <AchievementDetailsForm payload={payload} setPayload={setPayload} />
          </>
        )}
      </div>

      <div className="flex justify-between border-t border-brand/20 px-5 py-2">
        <CommonBtn
          size={"lg"}
          variant={"default"}
          text="Save progress"
          onClick={handleSaveProgress}
          className="w-fit rounded-lg border border-white/10 px-10"
        />
        {isUpdatePlayer || isUpdateChild ? (
          <CommonBtn
            size={"lg"}
            variant={"default"}
            text="Update"
            onClick={hanldeUpdate}
            disabled={loading}
            isLoading={loading}
            className="w-fit rounded-lg border border-white/10 bg-brand px-10 text-primary hover:bg-brand"
          />
        ) : (
          <CommonBtn
            size={"lg"}
            variant={"default"}
            text="Done"
            onClick={handleAddPlayer}
            disabled={loading}
            isLoading={loading}
            className="w-fit rounded-lg border border-white/10 bg-brand px-10 text-primary hover:bg-brand"
          />
        )}
      </div>
    </div>
  )
}
