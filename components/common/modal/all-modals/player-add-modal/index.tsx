import { useCallback, useEffect, useState } from "react"
import CoreIdentity from "./components/core-identity"
import PositionMap from "./components/position-map"
import SeasonStats from "./components/season-stats"
import CommonBtn from "@/components/common/common-btn"
import { BsArrowRight } from "react-icons/bs"
import Strengths from "./components/strengths"
import Biography from "./components/biography"
import Highlights from "./components/highlights"
import Achievements from "./components/achievements"
import PrivacySettings from "./components/privacy-settings"
import { defaultWizardState, type WizardState } from "./types"

const PLAYER_ADD_WIZARD_STORAGE_KEY = "player-add-modal:wizard-state:v1"

export default function PlayerAddModal() {
  const [wizardState, setWizardState] =
    useState<WizardState>(defaultWizardState)
  const currentStep = wizardState.currentStep
  const totalSteps = 8

  useEffect(() => {
    try {
      const rawState = window.localStorage.getItem(
        PLAYER_ADD_WIZARD_STORAGE_KEY
      )
      if (!rawState) {
        return
      }

      const parsed = JSON.parse(rawState) as WizardState
      if (!parsed?.forms) {
        return
      }

      setWizardState({
        ...defaultWizardState,
        ...parsed,
        forms: {
          ...defaultWizardState.forms,
          ...parsed.forms,
        },
      })
    } catch {
      // Ignore invalid persisted data.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        PLAYER_ADD_WIZARD_STORAGE_KEY,
        JSON.stringify(wizardState)
      )
    } catch {
      // Ignore storage errors.
    }
  }, [wizardState])

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

  const handleFinish = useCallback(() => {
    console.log("Player add wizard payload", wizardState.forms)
  }, [wizardState.forms])

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

  return (
    <div className="bg-[#090B10]">
      {currentStep === 1 ? (
        <CoreIdentity
          currentStep={currentStep}
          totalSteps={totalSteps}
          draft={wizardState.forms.coreIdentity}
          onDraftChange={handleCoreIdentityChange}
        />
      ) : currentStep === 2 ? (
        <PositionMap
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
          <CommonBtn
            variant="default"
            size="lg"
            text="Finish & Create Profile"
            onClick={handleFinish}
            className="w-fit cursor-pointer bg-brand px-5 py-2 font-semibold text-primary hover:bg-secondary/20 hover:text-white"
          />
        )}
      </div>
    </div>
  )
}
