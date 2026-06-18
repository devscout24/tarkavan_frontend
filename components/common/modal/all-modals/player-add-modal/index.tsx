"use client"
import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import CoreIdentity from "./components/core-identity"
import SeasonStats from "./components/season-stats"
import CommonBtn from "@/components/common/common-btn"
import { BsArrowRight } from "react-icons/bs"
import Strengths from "./components/strengths"
import Biography from "./components/biography"
import Highlights from "./components/highlights"
import Achievements from "./components/achievements"
import PrivacySettings from "./components/privacy-settings"
import { defaultWizardState, type WizardState } from "./types"
import { addChildOrPlayer } from "@/app/(dashboards)/action"
import { toast } from "sonner"
import SelectPosition from "./components/position-map"
import { playerProfileUpdate } from "@/app/(dashboards)/player/profile/action"
import { TCompletePlayerData } from "@/types"
import useModal from "../../useModal"
import { addChild, updateChildProfile } from "@/app/(dashboards)/parent/action"
import { useParams } from "next/navigation"
import type { TPlayerProfile } from "@/types/player.type"
import axios from "axios"

const PLAYER_EDIT_STORAGE_KEY = "go_elite_player_edit_data"

const inferShowcaseSource = (
  value: string
): "youtube" | "hudl" | "vimeo" | null => {
  try {
    const parsed = new URL(value)
    if (
      parsed.hostname.includes("youtube") ||
      parsed.hostname.includes("youtu.be")
    ) {
      return "youtube"
    }
    if (parsed.hostname.includes("hudl")) {
      return "hudl"
    }
    if (parsed.hostname.includes("vimeo")) {
      return "vimeo"
    }
  } catch {
    return null
  }

  return null
}

const normalizeMediaLink = (
  item: string | { link?: string; image?: string }
) => {
  if (typeof item === "string") {
    return item
  }

  return item.link ?? item.image ?? ""
}

const buildWizardStateFromProfile = (profile: TPlayerProfile) => {
 
  const latestStat = profile.season_stats_last_five_years?.[0]
  const primaryPosition = String(profile.position_info?.primary_position?.id) ?? ""
  const secondaryPosition =
    String(profile.position_info?.secondary_position?.id) ?? ""
  const strengths =
    profile.strengths?.reduce<Record<string, string>>((accumulator, item) => {
      if (item?.strength_type) {
        accumulator[item.strength_type] = item.strength_name ?? ""
      }

      return accumulator
    }, {}) ?? {}

  const highlightLinks = (profile.media_links ?? [])
    .map(normalizeMediaLink)
    .filter(Boolean)
  const firstHighlightLink = highlightLinks[0] ?? ""
  const firstHighlightSource = inferShowcaseSource(firstHighlightLink)

  return {
    currentStep: 1,
    forms: {
      coreIdentity: {
        profilePhotoNames: profile.basic_info?.image
          ? [profile.basic_info.image]
          : [],
        profilePhotos: [],
        firstName: profile.basic_info?.name ?? "",
        lastName: profile.basic_info?.last_name ?? "",
        dateOfBirth: profile.basic_info?.dob ?? undefined,
        gender: profile.basic_info?.gender ?? "",
        nationality: profile.basic_info?.nationality ?? "",
        email: profile.basic_info?.email ?? "",
        sport: profile.basic_info?.sports ?? "soccer",
        jerseyNumber: String(profile.position_info?.jersey_number ?? ""),
        dominantFoot: profile.position_info?.dominant_foot ?? "",
        clubTeam: profile.position_info?.club_team ?? "",
        country: profile.basic_info?.country ?? "",
        city: profile.basic_info?.city ?? "",
        province: profile.basic_info?.province ?? "",
      },
      positionMap: {
        primaryPosition,
        secondaryPosition,
      },
      seasonStats: {
        activeTab:
          latestStat &&
            (latestStat.clean_sheets > 0 || latestStat.total_saves > 0)
            ? "goalkeeper"
            : "outfield",
        values: {
          outfieldGamesPlayed: String(latestStat?.total_played_games ?? 0),
          outfieldGoals: String(latestStat?.goals ?? 0),
          outfieldAssists: String(latestStat?.assist ?? 0),
          outfieldYellowCards: String(latestStat?.yellow_cards ?? 0),
          outfieldRedCards: String(latestStat?.red_cards ?? 0),
          goalkeeperGamesPlayed: "0",
          goalkeeperGoals: "0",
          goalkeeperAssists: "0",
          goalkeeperYellowCards: "0",
          goalkeeperRedCards: "0",
          goalkeeperCleanSheets: String(latestStat?.clean_sheets ?? 0),
          goalkeeperTotalSaves: String(latestStat?.total_saves ?? 0),
        },
      },
      strengths: {
        activeCategoryId:
          profile.strengths?.[0]?.strength_type?.trim().toLowerCase() ??
          "technical",
        selectedByCategory: strengths,
      },
      biography: {
        biography: profile.basic_info?.biography ?? "",
      },
      highlights: {
        showcaseValue: firstHighlightLink,
        selectedShowcaseSource: firstHighlightSource,
        facebook_link: profile.basic_info?.facebook_link ?? "",
        whatsapp_link: profile.basic_info?.whatsapp_link ?? "",
        twitter_link: profile.basic_info?.twitter_link ?? "",
        uploadedItems: [
          ...(profile.videos ?? []).map((video, index) => ({
            id: `existing-video-${video.id}`,
            title: video.video_url,
            type: "video" as const,
            file: undefined,
          })),
          ...highlightLinks.map((link, index) => ({
            id: `existing-link-${index}`,
            title: link,
            type: "link" as const,
            source: inferShowcaseSource(link) ?? undefined,
          })),
        ],
      },
      achievements: {
        uploadedAssets: (profile.achievements ?? []).map((achievement) => ({
          id: `achievement-${achievement.id}`,
          name: achievement.title,
          type: achievement.image ? "image" : "file",
        })),
        title: profile.achievements?.[0]?.title ?? "",
        dateEarned: profile.achievements?.[0]?.date_earned ?? undefined,
        description: profile.achievements?.[0]?.description ?? "",
      },
      privacySettings: {
        visibility: profile.basic_info?.privacy_settings ?? "public",
      },
    },
  }
}

export default function PlayerAddModal() {
  const [wizardState, setWizardState] =
    useState<WizardState>(defaultWizardState)
  const [formKey, setFormKey] = useState(0)
  const [existingProfilePhotoUrl, setExistingProfilePhotoUrl] = useState<
    string | null
  >(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentStep = wizardState.currentStep
  const totalSteps = 8
  const isUpdatePlayer = searchParams.get("update") === "player"
  const isUpdateChild = searchParams.get("update") === "child"
  const params = useParams()
  const edit_child_id = params.id
  const child_id = params.child_id
  const token = localStorage.getItem("go_elite_token")

  const { close } = useModal()

  useEffect(() => {
    if (!isUpdatePlayer) {
      setExistingProfilePhotoUrl(null)
      setWizardState(defaultWizardState)
      return
    }

    const storedProfile = sessionStorage.getItem(PLAYER_EDIT_STORAGE_KEY)
    if (!storedProfile) {
      return
    }

    try {
      const profile = JSON.parse(storedProfile) as TPlayerProfile
      const nextWizardState = buildWizardStateFromProfile(profile)

      setWizardState(nextWizardState as WizardState)
      setExistingProfilePhotoUrl(profile.basic_info?.image ?? null)
      setFormKey((current) => current + 1)
    } catch (error) {
      console.error("Failed to load stored player profile data:", error)
    }
  }, [isUpdatePlayer])

  const getToastMessage = (maybe: unknown, fallback: string) => {
    if (typeof maybe === "string") return maybe
    try {
      if (maybe == null) return fallback
      return JSON.stringify(maybe)
    } catch (e) {
      return fallback
    }
  }

  // Function to reset wizard state
  const resetWizardState = useCallback(() => {
    setWizardState(defaultWizardState)
  }, [])

  const updateStepData = useCallback(
    <K extends keyof WizardState["forms"]>(
      key: K,
      value: WizardState["forms"][K]
    ) => {
      setWizardState((prev) => ({
        ...prev,
        forms: {
          ...prev.forms,
          [key]: value,
        },
      }))
    },
    []
  )

  const goToStep = useCallback((step: number) => {
    setWizardState((prev) => ({
      ...prev,
      currentStep: step,
    }))
  }, [])

  // Memoized handlers to prevent unnecessary re-renders of child components
  const handleCoreIdentityChange = useCallback(
    (value: WizardState["forms"]["coreIdentity"]) =>
      updateStepData("coreIdentity", value),
    [updateStepData]
  )

  const handlePositionMapChange = useCallback(
    (value: WizardState["forms"]["positionMap"]) =>
      updateStepData("positionMap", value),
    [updateStepData]
  )

  const handleSeasonStatsChange = useCallback(
    (value: WizardState["forms"]["seasonStats"]) =>
      updateStepData("seasonStats", value),
    [updateStepData]
  )

  const handleStrengthsChange = useCallback(
    (value: WizardState["forms"]["strengths"]) =>
      updateStepData("strengths", value),
    [updateStepData]
  )

  const handleBiographyChange = useCallback(
    (value: WizardState["forms"]["biography"]) =>
      updateStepData("biography", value),
    [updateStepData]
  )

  const handleHighlightsChange = useCallback(
    (value: WizardState["forms"]["highlights"]) =>
      updateStepData("highlights", value),
    [updateStepData]
  )

  const handleAchievementsChange = useCallback(
    (value: WizardState["forms"]["achievements"]) =>
      updateStepData("achievements", value),
    [updateStepData]
  )

  const handlePrivacyChange = useCallback(
    (value: WizardState["forms"]["privacySettings"]) =>
      updateStepData("privacySettings", value),
    [updateStepData]
  )

  // Safe data collection function - properly typed from wizard state
  const collectCompletePlayerData = useCallback((): TCompletePlayerData => {
    return {
      // Core Identity
      firstName: wizardState.forms.coreIdentity.firstName,
      lastName: wizardState.forms.coreIdentity.lastName,
      city: wizardState.forms.coreIdentity.city,
      country: wizardState.forms.coreIdentity.country,
      province: wizardState.forms.coreIdentity.province,
      email: wizardState.forms.coreIdentity.email,
      dateOfBirth: wizardState.forms.coreIdentity.dateOfBirth,
      gender: wizardState.forms.coreIdentity.gender,
      nationality: wizardState.forms.coreIdentity.nationality,
      sport: wizardState.forms.coreIdentity.sport,
      jerseyNumber: wizardState.forms.coreIdentity.jerseyNumber,
      dominantFoot: wizardState.forms.coreIdentity.dominantFoot,
      clubTeam: wizardState.forms.coreIdentity.clubTeam,
      profilePhotoNames: wizardState.forms.coreIdentity.profilePhotoNames,

      // Position Map
      primaryPosition: wizardState.forms.positionMap.primaryPosition,
      secondaryPosition: wizardState.forms.positionMap.secondaryPosition,

      // Season Stats
      seasonStats: wizardState.forms.seasonStats,

      // Strengths
      strengths: wizardState.forms.strengths,

      // Biography
      biography: wizardState.forms.biography.biography,

      // Highlights
      highlights: wizardState.forms.highlights,

      // Achievements
      achievements: wizardState.forms.achievements,

      // Privacy Settings
      privacySettings: wizardState.forms.privacySettings,
    }
  }, [wizardState.forms])

  const user = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user")!)
    : null

  // Safe profile creation for player role
  const [handleSetting, setHandleSetting] = useState(false)
  const handleSetProfile = useCallback(async () => {
    const completeData = collectCompletePlayerData()

    setHandleSetting(true)

    if (user?.role === "player") {
      // Format strengths data properly
      const backendAllowedStrengthTypes = new Set([
        "mental",
        "physical",
        "technical",
        "tactical",
        "attacking",
        "defending",
        "aerial",
      ])

      const strengths: Array<{
        strength_type: string
        strength_name: string
      }> = Object.entries(completeData.strengths.selectedByCategory)
        .filter(([, strength_name]) => Boolean(strength_name?.trim()))
        .map(([strength_type, strength_name]) => ({
          strength_type: strength_type.trim().toLowerCase(),
          strength_name: strength_name.trim(),
        }))
        .filter((item) => backendAllowedStrengthTypes.has(item.strength_type))

      const formData = new FormData()

      const appendText = (key: string, value: string | undefined | null) => {
        if (value == null || value === "") {
          return
        }
        formData.append(key, value)
      }

      const toDateOnly = (value?: string) => {
        if (!value) {
          return undefined
        }

        return value.split("T")[0]
      }

      appendText("name", completeData.firstName)
      appendText("last_name", completeData.lastName)
      appendText("city", completeData.city)
      appendText("country", completeData.country)
      appendText("province", completeData.province)
      appendText("dob", toDateOnly(completeData.dateOfBirth))
      appendText("gender", completeData.gender)
      appendText("nationality", completeData.nationality)
      appendText("email", completeData.email)
      appendText("sports_selection", completeData.sport)
      appendText("jersey_number", completeData.jerseyNumber)
      appendText("dominant_foot", completeData.dominantFoot)
      appendText("club_team", completeData.clubTeam)
      appendText("primary_position", completeData.primaryPosition)
      appendText("secondary_position", completeData.secondaryPosition)
      appendText("athlete_biography", completeData.biography)
      appendText("privacy_settings", completeData.privacySettings.visibility)
      appendText(
        "total_played_games",
        completeData.seasonStats.values.outfieldGamesPlayed
      )
      appendText("goals", completeData.seasonStats.values.outfieldGoals)
      appendText("assist", completeData.seasonStats.values.outfieldAssists)
      appendText(
        "yellow_cards",
        completeData.seasonStats.values.outfieldYellowCards
      )
      appendText("red_cards", completeData.seasonStats.values.outfieldRedCards)
      appendText(
        "clean_sheets",
        completeData.seasonStats.values.goalkeeperCleanSheets
      )
      appendText(
        "total_saves",
        completeData.seasonStats.values.goalkeeperTotalSaves
      )

      strengths.forEach((item, index) => {
        appendText(`strengths[${index}][strength_type]`, item.strength_type)
        appendText(`strengths[${index}][strength_name]`, item.strength_name)
      })

      appendText("title[0]", completeData.achievements.title)
      appendText("description[0]", completeData.achievements.description)
      appendText(
        "date_earned[0]",
        toDateOnly(completeData.achievements.dateEarned)
      )

      const achievementFile = completeData.achievements.uploadedAssets[0]?.file
      if (achievementFile != null) {
        formData.append("image[0]", achievementFile as Blob)
      }

      const profileImageFile = wizardState.forms.coreIdentity.profilePhotos[0]
      if (profileImageFile instanceof File) {
        formData.append("profile_image", profileImageFile)
      }

      completeData.highlights.uploadedItems
        .filter((item) => item.type === "video" && item.file instanceof File)
        .forEach((item, index) => {
          formData.append(`reels[${index}]`, item.file as File)
        })

      const firstLink = completeData.highlights.uploadedItems.find(
        (item) => item.type === "link"
      )
      const firstLinkTitle = firstLink?.title
      const firstLinkSource = firstLink?.source ?? null
      appendText("facebook_link", completeData.highlights.facebook_link)
      appendText("whatsapp_link", completeData.highlights.whatsapp_link)
      appendText("twitter_link", completeData.highlights.twitter_link)
      if (firstLinkTitle) {
        appendText("link[0]", firstLinkTitle)
        appendText("link_status[0]", firstLinkSource)
      } else {
        appendText("link[0]", completeData.highlights.showcaseValue)
        appendText(
          "link_status[0]",
          completeData.highlights.selectedShowcaseSource
        )
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/player/profile/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )

        if (res.data.status) {
          setHandleSetting(false)

          const user = JSON.parse(localStorage.getItem("go_elite_user") || "{}")

          user.status = "approve"
          user.profile_id = res.data.data.id

          localStorage.setItem("go_elite_user", JSON.stringify(user))

          toast.success(
            getToastMessage(
              res.data?.message,
              "Player added successfully"
            )
          )
          // resetWizardState()
          close("add-new")


        } else {
          toast.error(res.data?.message || "Failed to add player")
        }
      } catch (error) {
        setHandleSetting(false)
        toast.error("Failed to add player")
        console.error("Error saving player profile:", error)
      }
    }

    if (user?.role === "parent" && !isUpdateChild) {
      // Parent role specific data collection
      const backendAllowedStrengthTypes = new Set([
        "mental",
        "physical",
        "technical",
        "tactical",
        "attacking",
        "defending",
        "aerial",
      ])

      const strengths: Array<{
        strength_type: string
        strength_name: string
      }> = Object.entries(completeData.strengths.selectedByCategory)
        .filter(([, strength_name]) => Boolean(strength_name?.trim()))
        .map(([strength_type, strength_name]) => ({
          strength_type: strength_type.trim().toLowerCase(),
          strength_name: strength_name.trim(),
        }))
        .filter((item) => backendAllowedStrengthTypes.has(item.strength_type))

      const formData = new FormData()

      const appendText = (key: string, value: string | undefined | null) => {
        if (value == null || value === "") {
          return
        }
        formData.append(key, value)
      }

      const toDateOnly = (value?: string) => {
        if (!value) {
          return undefined
        }

        return value.split("T")[0]
      }

      appendText("name", completeData.firstName)
      appendText("last_name", completeData.lastName)
      appendText("city", completeData.city)
      appendText("country", completeData.country)
      appendText("province", completeData.province)
      appendText("dob", toDateOnly(completeData.dateOfBirth))
      appendText("gender", completeData.gender)
      appendText("nationality", completeData.nationality)
      appendText("email", completeData.email)
      appendText("sports_selection", completeData.sport)
      appendText("jersey_number", completeData.jerseyNumber)
      appendText("dominant_foot", completeData.dominantFoot)
      appendText("club_team", completeData.clubTeam)
      appendText("primary_position", completeData.primaryPosition)
      appendText("secondary_position", completeData.secondaryPosition)
      appendText("athlete_biography", completeData.biography)
      appendText("privacy_settings", completeData.privacySettings.visibility)
      appendText(
        "total_played_games",
        completeData.seasonStats.values.outfieldGamesPlayed
      )
      appendText("goals", completeData.seasonStats.values.outfieldGoals)
      appendText("assist", completeData.seasonStats.values.outfieldAssists)
      appendText(
        "yellow_cards",
        completeData.seasonStats.values.outfieldYellowCards
      )
      appendText("red_cards", completeData.seasonStats.values.outfieldRedCards)
      appendText(
        "clean_sheets",
        completeData.seasonStats.values.goalkeeperCleanSheets
      )
      appendText(
        "total_saves",
        completeData.seasonStats.values.goalkeeperTotalSaves
      )

      strengths.forEach((item, index) => {
        appendText(`strengths[${index}][strength_type]`, item.strength_type)
        appendText(`strengths[${index}][strength_name]`, item.strength_name)
      })

      appendText("title[0]", completeData.achievements.title)
      appendText("description[0]", completeData.achievements.description)
      appendText(
        "date_earned[0]",
        toDateOnly(completeData.achievements.dateEarned)
      )

      const achievementFile = completeData.achievements.uploadedAssets[0]?.file
      if (achievementFile != null) {
        formData.append("image[0]", achievementFile as Blob)
      }

      const profileImageFile = wizardState.forms.coreIdentity.profilePhotos[0]
      if (profileImageFile instanceof File) {
        formData.append("profile_image", profileImageFile)
      }

      completeData.highlights.uploadedItems
        .filter((item) => item.type === "video" && item.file instanceof File)
        .forEach((item, index) => {
          formData.append(`reels[${index}]`, item.file as File)
        })

      const firstLink = completeData.highlights.uploadedItems.find(
        (item) => item.type === "link"
      )
      const firstLinkTitle = firstLink?.title
      const firstLinkSource = firstLink?.source ?? null
      if (firstLinkTitle) {
        appendText("link[0]", firstLinkTitle)
        appendText("link_status[0]", firstLinkSource)
      } else {
        appendText("link[0]", completeData.highlights.showcaseValue)
        appendText(
          "link_status[0]",
          completeData.highlights.selectedShowcaseSource
        )
      }

      try {
        const res = await addChild(formData)


        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          toast.success(
            getToastMessage(res.data.message, "Child added successfully")
          )
          setHandleSetting(false)
          resetWizardState()
          close("add-new")
          window.dispatchEvent(new CustomEvent("child_added"))
        } else if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          res.data.status === false
        ) {
          toast.error(getToastMessage(res.data.message, "Failed to add child"))
        }
      } catch (error) {

        toast.error("Failed to add child")
        console.error("Error saving parent profile:", error)
      }
    }
  }, [
    collectCompletePlayerData,
    pathname,
    router,
    searchParams,
    resetWizardState,
    user,
    wizardState.forms.coreIdentity.profilePhotos,
  ])

  const [updating, setUpdating] = useState(false)
  const handleUpdateProfile = async () => {
    setUpdating(true)
    const completeData = collectCompletePlayerData()
    const backendAllowedStrengthTypes = new Set([
      "mental",
      "physical",
      "technical",
      "tactical",
      "attacking",
      "defending",
      "aerial",
    ])

    const strengths: Array<{
      strength_type: string
      strength_name: string
    }> = Object.entries(completeData.strengths.selectedByCategory)
      .filter(([, strength_name]) => Boolean(strength_name?.trim()))
      .map(([strength_type, strength_name]) => ({
        strength_type: strength_type.trim().toLowerCase(),
        strength_name: strength_name.trim(),
      }))
      .filter((item) => backendAllowedStrengthTypes.has(item.strength_type))

    const formData = new FormData()

    const appendText = (key: string, value: string | undefined | null) => {
      if (value == null || value === "") {
        return
      }
      formData.append(key, value)
    }

    const toDateOnly = (value?: string) => {
      if (!value) {
        return undefined
      }

      return value.split("T")[0]
    }

    appendText("name", completeData.firstName)
    appendText("last_name", completeData.lastName)
    appendText("city", completeData.city)
    appendText("country", completeData.country)
    appendText("province", completeData.province)
    appendText("dob", toDateOnly(completeData.dateOfBirth))
    appendText("gender", completeData.gender)
    appendText("nationality", completeData.nationality)
    appendText("email", completeData.email)
    appendText("sports_selection", completeData.sport)
    appendText("jersey_number", completeData.jerseyNumber)
    appendText("dominant_foot", completeData.dominantFoot)
    appendText("club_team", completeData.clubTeam)
    appendText("primary_position", completeData.primaryPosition)
    appendText("secondary_position", completeData.secondaryPosition)
    appendText("athlete_biography", completeData.biography)
    appendText("privacy_settings", completeData.privacySettings.visibility)
    appendText(
      "total_played_games",
      completeData.seasonStats.values.outfieldGamesPlayed
    )
    appendText("goals", completeData.seasonStats.values.outfieldGoals)
    appendText("assist", completeData.seasonStats.values.outfieldAssists)
    appendText(
      "yellow_cards",
      completeData.seasonStats.values.outfieldYellowCards
    )
    appendText("red_cards", completeData.seasonStats.values.outfieldRedCards)
    appendText(
      "clean_sheets",
      completeData.seasonStats.values.goalkeeperCleanSheets
    )
    appendText(
      "total_saves",
      completeData.seasonStats.values.goalkeeperTotalSaves
    )

    strengths.forEach((item, index) => {
      appendText(`strengths[${index}][strength_type]`, item.strength_type)
      appendText(`strengths[${index}][strength_name]`, item.strength_name)
    })

    appendText("title[0]", completeData.achievements.title)
    appendText("description[0]", completeData.achievements.description)
    appendText(
      "date_earned[0]",
      toDateOnly(completeData.achievements.dateEarned)
    )

    const achievementFile = completeData.achievements.uploadedAssets[0]?.file
    if (achievementFile != null) {
      formData.append("image[0]", achievementFile as Blob)
    }

    const profileImageFile = wizardState.forms.coreIdentity.profilePhotos[0]
    if (profileImageFile instanceof File) {
      formData.append("profile_image", profileImageFile)
    }

    completeData.highlights.uploadedItems
      .filter((item) => item.type === "video" && item.file instanceof File)
      .forEach((item, index) => {
        formData.append(`reels[${index}]`, item.file as File)
      })

    const firstLink = completeData.highlights.uploadedItems.find(
      (item) => item.type === "link"
    )
    const firstLinkTitle = firstLink?.title
    const firstLinkSource = firstLink?.source ?? null
    appendText("facebook_link", completeData.highlights.facebook_link)
    appendText("whatsapp_link", completeData.highlights.whatsapp_link)
    appendText("twitter_link", completeData.highlights.twitter_link)
    if (firstLinkTitle) {
      appendText("link[0]", firstLinkTitle)
      appendText("link_status[0]", firstLinkSource)
    } else {
      appendText("link[0]", completeData.highlights.showcaseValue)
      appendText(
        "link_status[0]",
        completeData.highlights.selectedShowcaseSource
      )
    }

    if (user?.role === "player") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/player/profile/update`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )



        if (res.data.status) {
          setUpdating(false)
          toast.success(
            getToastMessage(
              res.data.message,
              "Player updated successfully"
            )
          )
          window.dispatchEvent(new CustomEvent("player_profile_updated"))
          sessionStorage.removeItem(PLAYER_EDIT_STORAGE_KEY)
          close("update")
        } else {
          setUpdating(false)
          toast.error(
            getToastMessage(
              res.data?.message,
              "Failed to update player"
            )
          )
        }
      } catch (error) {
        setUpdating(false)
        toast.error("Failed to add player")
        console.error("Error saving player profile:", error)
      }
    }

    if (isUpdateChild && user?.role === "parent") {
      try {
        const res = await updateChildProfile({
          data: formData,
          child_id: String(edit_child_id || child_id),
        })

        const response = res as {
          success?: boolean
          message?: string
          data?: {
            status?: boolean
            message?: string
            data?: {
              id?: number
            }
          }
        }

        if (response?.success && response?.data?.status) {
          setUpdating(false)
          toast.success("Child profile updated successfully")
          window.dispatchEvent(new CustomEvent("player_profile_updated"))
          close("update")
          // resetWizardState()
          // const nextParams = new URLSearchParams(searchParams.toString())
          // nextParams.delete("add-new")
          // nextParams.delete("update")
          // router.replace(
          //   nextParams.toString()
          //     ? `${pathname}?${nextParams.toString()}`
          //     : pathname
          // )
        } else {
          setUpdating(false)
          toast.error(
            getToastMessage(
              response?.data?.message ?? response?.message,
              "Failed to update player"
            )
          )
        }
      } catch (error) {
        setUpdating(false)
        toast.error("Failed to add player")
        console.error("Error saving player profile:", error)
      }
    }
  }

  return (
    <div key={formKey} className="bg-[#090B10]">
      {currentStep === 1 ? (
        <CoreIdentity
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.coreIdentity}
          onDraftChange={handleCoreIdentityChange}
          existingProfilePhotoUrl={existingProfilePhotoUrl}
        />
      ) : currentStep === 2 ? (
        <SelectPosition
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.positionMap}
          onDraftChange={handlePositionMapChange}
        />
      ) : currentStep === 3 ? (
        <SeasonStats
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.seasonStats}
          onDraftChange={handleSeasonStatsChange}
        />
      ) : currentStep === 4 ? (
        <Strengths
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.strengths}
          onDraftChange={handleStrengthsChange}
        />
      ) : currentStep === 5 ? (
        <Biography
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.biography}
          onDraftChange={handleBiographyChange}
        />
      ) : currentStep === 6 ? (
        <Highlights
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.highlights}
          onDraftChange={handleHighlightsChange}
        />
      ) : currentStep === 7 ? (
        <Achievements
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.achievements}
          onDraftChange={handleAchievementsChange}
        />
      ) : currentStep === 8 ? (
        <PrivacySettings
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.privacySettings}
          onDraftChange={handlePrivacyChange}
        />
      ) : null}

      <div className="flex items-center justify-between px-4 pb-10">
        {currentStep > 1 && (
          <CommonBtn
            variant="outline"
            size="lg"
            text="Back"
            onClick={() => goToStep(currentStep - 1)}
            className="w-36 cursor-pointer border-brand text-brand hover:bg-secondary/20 hover:text-white"
          />
        )}

        {currentStep < totalSteps ? (
          <CommonBtn
            variant="default"
            size="lg"
            text="Next Step"
            icon={<BsArrowRight />}
            onClick={() => goToStep(currentStep + 1)}
            disabled={currentStep === totalSteps}
            className="w-36 cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
        ) : isUpdatePlayer || isUpdateChild ? (
          <CommonBtn
            variant="default"
            size="lg"
            text="Finish & Update Profile"
            onClick={handleUpdateProfile}
            isLoading={updating}
            disabled={updating}
            className="w-fit cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
        ) : (
          <CommonBtn
            variant="default"
            size="lg"
            text="Finish & Create Profile"
            onClick={handleSetProfile}
            isLoading={handleSetting}
            disabled={handleSetting}
            className="w-fit cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
        )}
      </div>
    </div>
  )
}
