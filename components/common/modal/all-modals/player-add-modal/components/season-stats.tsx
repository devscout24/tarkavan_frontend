import { useForm } from "react-hook-form"
import { Icon } from "@/components/custom/Icon"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs"
import ModalStepHeader from "@/components/common/modal-header"
import OutfieldStatsTab from "./outfield-stats-tab"
import { useState } from "react"
import GoalkeeperStatsTab from "./goalkeeper-stats-tab"

interface SeasonStatsFormData {
  outfieldGamesPlayed: string
  outfieldGoals: string
  outfieldAssists: string
  outfieldYellowCards: string
  outfieldRedCards: string
  goalkeeperGamesPlayed: string
  goalkeeperGoals: string
  goalkeeperAssists: string
  goalkeeperYellowCards: string
  goalkeeperRedCards: string
  goalkeeperCleanSheets: string
  goalkeeperTotalSaves: string
}

export default function SeasonStats({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
  const {
    formState: { errors },
  } = useForm<SeasonStatsFormData>({
    mode: "onBlur",
    shouldUnregister: true,
    defaultValues: {
      outfieldGamesPlayed: "0",
      outfieldGoals: "0",
      outfieldAssists: "0",
      outfieldYellowCards: "0",
      outfieldRedCards: "0",
      goalkeeperGamesPlayed: "0",
      goalkeeperGoals: "0",
      goalkeeperAssists: "0",
      goalkeeperYellowCards: "0",
      goalkeeperRedCards: "0",
      goalkeeperCleanSheets: "0",
      goalkeeperTotalSaves: "0",
    },
  })

  const [activeTab, setActiveTab] = useState<string>("outfield")



  return (
    <div className="w-full rounded-2xl bg-[#090B10] p-4 text-white">
      <ModalStepHeader
        title={"roleHeaderCopy.title"}
        subtitle={"roleHeaderCopy.subtitle"}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-5 pb-6">
        <h3 className="text-[20px] leading-[150%] font-medium text-white">
          Season Stats
        </h3>
        <p className="mt-1 border-b-2 border-dashed border-white/20 pb-5 text-[14px] leading-[150%] font-normal text-white/70">
          Provide detailed performance data for the current or most recent
          competitive season.
        </p>

        <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-primary/40 p-6">
          <div className="space-y-1.5">
            <p className="text-[14px] leading-[150%] font-medium text-white">
              Select Player Role
            </p>
            <p className="text-[12px] leading-[150%] font-normal text-white/70">
              Different statistics apply to different positions on the field.
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value: string) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl bg-white/95 p-1.5">
              <TabsTrigger
                value="outfield"
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
              >
                <Icon
                  width="12"
                  height="17"
                  viewBox="0 0 12 17"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 16.125V11.625L5.925 10.125L5.175 13.425L0 12.375L0.3 10.875L3.9 11.625L5.1 5.55L3.75 6.075V8.625H2.25V5.1L5.2125 3.825C5.65 3.6375 5.97187 3.51562 6.17812 3.45937C6.38438 3.40312 6.575 3.375 6.75 3.375C7.0125 3.375 7.25625 3.44375 7.48125 3.58125C7.70625 3.71875 7.8875 3.9 8.025 4.125L8.775 5.325C9.1 5.85 9.54063 6.28125 10.0969 6.61875C10.6531 6.95625 11.2875 7.125 12 7.125V8.625C11.175 8.625 10.4031 8.45312 9.68437 8.10938C8.96562 7.76562 8.3625 7.3125 7.875 6.75L7.425 9L9 10.5V16.125H7.5ZM7.875 3C7.4625 3 7.10938 2.85313 6.81563 2.55938C6.52188 2.26562 6.375 1.9125 6.375 1.5C6.375 1.0875 6.52188 0.734375 6.81563 0.440625C7.10938 0.146875 7.4625 0 7.875 0C8.2875 0 8.64062 0.146875 8.93437 0.440625C9.22812 0.734375 9.375 1.0875 9.375 1.5C9.375 1.9125 9.22812 2.26562 8.93437 2.55938C8.64062 2.85313 8.2875 3 7.875 3Z"
                    fill="#060807"
                  />
                </Icon>
                <span>Outfield Player</span>
              </TabsTrigger>
              <TabsTrigger
                value="goalkeeper"
                className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
              >
                <Icon
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  aria-hidden="true"
                >
                  <path
                    d="M6.6375 16.5C6.2625 16.5 5.9125 16.4156 5.5875 16.2469C5.2625 16.0781 4.99375 15.8375 4.78125 15.525L0 8.53125L0.45 8.1C0.6875 7.8625 0.96875 7.725 1.29375 7.6875C1.61875 7.65 1.9125 7.725 2.175 7.9125L4.35 9.43125V2.25C4.35 2.0375 4.42188 1.85938 4.56563 1.71563C4.70938 1.57188 4.8875 1.5 5.1 1.5C5.3125 1.5 5.49062 1.57188 5.63438 1.71563C5.77813 1.85938 5.85 2.0375 5.85 2.25V12.3188L3.075 10.3687L6.01875 14.6625C6.08125 14.7625 6.16875 14.8438 6.28125 14.9062C6.39375 14.9688 6.5125 15 6.6375 15H9.24375H11.85C12.2625 15 12.6156 14.8531 12.9094 14.5594C13.2031 14.2656 13.35 13.9125 13.35 13.5V3C13.35 2.7875 13.4219 2.60938 13.5656 2.46563C13.7094 2.32188 13.8875 2.25 14.1 2.25C14.3125 2.25 14.4906 2.32188 14.6344 2.46563C14.7781 2.60938 14.85 2.7875 14.85 3V13.5C14.85 14.325 14.5562 15.0312 13.9688 15.6187C13.3813 16.2062 12.675 16.5 11.85 16.5H6.6375ZM7.35 8.25V0.75C7.35 0.5375 7.42188 0.359375 7.56563 0.215625C7.70938 0.071875 7.8875 0 8.1 0C8.3125 0 8.49062 0.071875 8.63437 0.215625C8.77812 0.359375 8.85 0.5375 8.85 0.75V8.25H7.35ZM10.35 8.25V1.5C10.35 1.2875 10.4219 1.10938 10.5656 0.965625C10.7094 0.821875 10.8875 0.75 11.1 0.75C11.3125 0.75 11.4906 0.821875 11.6344 0.965625C11.7781 1.10938 11.85 1.2875 11.85 1.5V8.25H10.35Z"
                    fill="#060807"
                  />
                </Icon>
                <span>Goalkeeper</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div
          //   key={role}
          className="mt-6 overflow-hidden rounded-xl border border-white/10"
        >
          <div className="grid grid-cols-[1fr_auto] items-center bg-secondary/40 px-6 py-4.25">
            <div className="space-y-1">
              <p className="text-[20px] leading-[150%] font-medium text-white">
                Player Stats
              </p>
            </div>
            <span className="rounded-md bg-secondary px-3 py-1 text-[16px] leading-[150%] font-medium text-white">
              Required
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto] items-center px-6 py-4">
            <p className="text-[14px] leading-[150%] font-medium text-white">
              Statistic Name
            </p>
            <p className="text-[14px] leading-[150%] font-medium text-white">
              Value
            </p>
          </div>
        </div>

        {activeTab === "outfield" && (
           <OutfieldStatsTab
            // registerStat={}
            // getFieldError={ }
          />
        )}

          {activeTab === "goalkeeper" && (
           <GoalkeeperStatsTab
            // registerStat={}
            // getFieldError={ }
          />
        )}
 
      </div>
    </div>
  )
}
