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
import { addPlayer } from "../player-add-modal/action"
import { toast } from "sonner"

export default function PLayerSetup() {
  const [activeTab, setActiveTab] = useState<"information" | "media">(
    "information"
  )

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

 
  const handleAddPlayer = async () => {
    try{

      const res = await addPlayer(payload)
      console.log("Player added successfully:", res)

    }catch(error){
      console.error("Error adding player:", error)
    }
  }

  const handleSaveProgress = async () => {
     
    window.localStorage.setItem("go_elitr_player_setup_progress", JSON.stringify(payload)) 

    toast.success("Player setup progress saved successfully!")
 
  }

  useEffect(()=> {
    const savedProgress = window.localStorage.getItem("go_elitr_player_setup_progress")
    if(savedProgress){
      setPayload(JSON.parse(savedProgress))
    } 
  } , [])
  console.log("Payload:", payload)


 

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
          text="Cancel"
          className="w-fit rounded-lg border border-white/10 px-10"
        />
        <CommonBtn
          size={"lg"}
          variant={"default"}
          text="Save progress"
          onClick={handleSaveProgress}
          className="w-fit rounded-lg border border-white/10 px-10"
        />
        <CommonBtn
          size={"lg"}
          variant={"default"}
          text="Upload"
          onClick={handleAddPlayer} 
          className="w-fit rounded-lg border border-white/10 bg-brand px-10 text-primary hover:bg-brand"
        />
      </div>
    </div>
  )
}
