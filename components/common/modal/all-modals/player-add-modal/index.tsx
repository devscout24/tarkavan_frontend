"use client"
import { useCallback, useState } from "react"
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
import { useParams } from "next/navigation";


export default function PlayerAddModal() {
  const [wizardState, setWizardState] = useState<WizardState>(defaultWizardState)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentStep = wizardState.currentStep
  const totalSteps = 8
  const isUpdatePlayer = searchParams.get("update") === "player";
  const isUpdateChild = searchParams.get("update") === "child";
  const params = useParams();
  const edit_child_id = params.id; 
  
  const { close } = useModal()

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
      city: wizardState.forms.coreIdentity.city ,
      country: wizardState.forms.coreIdentity.country ,
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
  const handleSetProfile = useCallback(async () => {
    const completeData = collectCompletePlayerData()

    if (user?.role === "player") {
      // Format strengths data properly
      const backendAllowedStrengthTypes = new Set(["mental", "physical", "technical"  , "tactical" , "attacking" , "defending" , "aerial" ])

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
        const res = await addChildOrPlayer(formData) 

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

        if (response.success && response.data?.status) {
          const user = JSON.parse(localStorage.getItem("go_elite_user") || "{}")
          user.status = "approve"
          user.profile_id = response?.data?.data?.id
          localStorage.setItem("go_elite_user", JSON.stringify(user))

          toast.success(getToastMessage(response.data?.message ?? response.message, "Player added successfully"))
          resetWizardState()

          const nextParams = new URLSearchParams(searchParams.toString())
          nextParams.delete("add-new")
          router.replace(
            nextParams.toString()
              ? `${pathname}?${nextParams.toString()}`
              : pathname
          )
        } else {
          toast.error(
            getToastMessage(response.data?.message ?? response.message, "Failed to add player")
          )
        }
      } catch (error) {
        toast.error("Failed to add player")
        console.error("Error saving player profile:", error)
      }
    }

    if (user?.role === "parent" && !isUpdateChild) {
      // Parent role specific data collection
      const backendAllowedStrengthTypes = new Set(["mental", "physical", "technical"  , "tactical" , "attacking" , "defending" , "aerial" ])

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

        console.log(res)
         
        if(res && 'success' in res && res.success && res.data && 'data' in res.data && res.data.data){
          toast.success(getToastMessage(res.data.message, "Child added successfully"))
          resetWizardState()
          close("add-new")
          window.dispatchEvent(new CustomEvent('child_added')) 
        }
        else if (res && 'success' in res && res.success && res.data && res.data.status === false){
          toast.error(getToastMessage(res.data.message, "Failed to add child"))
        }

      } catch (error) {
        console.log(error)
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


  const [updating , setUpdating] = useState(false)
  const handleUpdateProfile = async () => {
    setUpdating(true)
    const completeData = collectCompletePlayerData()
          const backendAllowedStrengthTypes = new Set(["mental", "physical", "technical"  , "tactical" , "attacking" , "defending" , "aerial" ])

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

    if (user?.role === "player") { 
      try {
        const res = await playerProfileUpdate(formData)  

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

        if (response.success && response.data?.status) {
          setUpdating(false)
          toast.success(getToastMessage(response.data.message, "Player updated successfully")) 
          window.dispatchEvent(new CustomEvent('player_profile_updated')) 
          close("update")
          resetWizardState() 
          const nextParams = new URLSearchParams(searchParams.toString())
          nextParams.delete("update")
          router.replace(
            nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
          )
        } else {
          setUpdating(false)
          toast.error(
            getToastMessage(response.data?.message ?? response.message, "Failed to update player")
          )
        }
      } catch (error) {
        setUpdating(false)
        toast.error("Failed to add player")
        console.error("Error saving player profile:", error)
      }
    } 

    if(isUpdateChild && user?.role === "parent"){
        try {
          console.log(edit_child_id)
        const res = await updateChildProfile({ data: formData, child_id: String(edit_child_id) })
        console.log(res)
 
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
          window.dispatchEvent(new CustomEvent('player_profile_updated')) 
          close("update")
          resetWizardState() 
          const nextParams = new URLSearchParams(searchParams.toString())
          nextParams.delete("update")
          router.replace(
            nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname
          )
        } else {
          setUpdating(false)
          toast.error(
            getToastMessage(response?.data?.message ?? response?.message, "Failed to update player")
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
    <div className="bg-[#090B10]  ">
      {currentStep === 1 ? (
        <CoreIdentity
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.coreIdentity}
          onDraftChange={handleCoreIdentityChange}
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
        ) : (
          isUpdatePlayer || isUpdateChild ? 
          <CommonBtn
            variant="default"
            size="lg"
            text="Finish & Update Profile"
            onClick={handleUpdateProfile}
            isLoading={updating}
            className="w-fit cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
          :


          <CommonBtn
            variant="default"
            size="lg"
            text="Finish & Create Profile"
            onClick={handleSetProfile} 
            className="w-fit cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
        )}
      </div>
    </div>
  )
}
