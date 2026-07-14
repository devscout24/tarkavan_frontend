"use client"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs"
import { TbPlayFootball } from "react-icons/tb"
import { IoHandRightOutline } from "react-icons/io5"
import { useState } from "react"
import SeasonStatField from "../../player-add-modal/components/season-stat-field"
import { TPlayerProfilePayload } from "../type"

export default function SeasonStats({
  payload,
  setPayload,
}: {
  payload: TPlayerProfilePayload
  setPayload: React.Dispatch<React.SetStateAction<TPlayerProfilePayload>>
}) {
  const [activeTab, setActiveTab] = useState<"outfield" | "goalkeeper">(
    "outfield"
  )

  return (
    <div className="mt-10">
      <h3 className="my-4 mt-10 text-[20px] leading-[120%] font-semibold text-white">
        Season Stats
      </h3>

      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as "outfield" | "goalkeeper")
        }
        className="w-full"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl bg-white/95 p-1.5">
          <TabsTrigger
            value="outfield"
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
          >
            <TbPlayFootball />

            <span>Outfield Player</span>
          </TabsTrigger>
          <TabsTrigger
            value="goalkeeper"
            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-transparent text-[14px] leading-[150%] font-semibold text-[#111308] shadow-none transition-colors duration-200 outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-[#C6F57A] data-[state=active]:text-[#111308]"
          >
            <IoHandRightOutline />
            <span>Goalkeeper</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

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

      <div>
        <SeasonStatField
          title="Games Played"
          subtitle="Total appearances this season"
          value={payload.seasonStats.values.gamesPlayed}
          onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  gamesPlayed: value,
                }
              }
            }))
          }
        />

        <SeasonStatField title="Goals" subtitle="Competitive match goals"
          value={payload.seasonStats.values.goals}
          onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  goals: value,
                }
              }
            }))
          }
        />

        <SeasonStatField
          title="Assists"
          subtitle="Key passes leading to goals"
          value={payload.seasonStats.values.assists}
          onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  assists: value,
                }
              }
            }))
          }
        />

        <SeasonStatField title="Yellow Cards" subtitle="Cautions received"
          value={payload.seasonStats.values.yellowCards}
          onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  yellowCards: value,
                }
              }
            }))
          }
        />

        <SeasonStatField title="Red Cards" subtitle="Cautions received"
          value={payload.seasonStats.values.redCards}
          onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  redCards: value,
                }
              }
            }))
          }
        />


        {activeTab === "goalkeeper" && (
          <SeasonStatField
            title="Clean Sheets"
            subtitle="Matches with zero goals conceded"
            value={payload.seasonStats.values.cleanSheets} 
            onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  cleanSheets: value,
                }
              }
            }))
          }
          />
        )}


        {activeTab === "goalkeeper" && (
          <SeasonStatField
            title="Penalties saved"
            subtitle="Number of penalties stopped"
            value={payload.seasonStats.values.totalSaves}
            onChange={(value) =>
            setPayload((prev) => ({
              ...prev,
              seasonStats: {
                ...prev.seasonStats,
                values: {
                  ...prev.seasonStats.values,
                  totalSaves: value,
                }
              }
            }))
          }
          />
        )}
      </div>
    </div>
  )
}
