import { TPlayerPosition } from "@/types/player.type"
import SoccerLineUp, { PitchSize, type Team } from "react-soccer-lineup"

type Player = {
  name?: string
  number?: number | string
  style?: {
    color?: string
    borderColor?: string
    nameColor?: string
    numberColor?: string
    numberBackgroundColor?: string
  }
  offset?: { x?: number; y?: number }
}

type PositionMapProps = {
  data?: TPlayerPosition[] | null
  size?: PitchSize 
}

const extractShortCode = (name: string): string => {
  const match = name.match(/\(([^)]+)\)\s*$/)
  return match?.[1]?.trim().toUpperCase() ?? ""
}

const emptySlot = (): Player => ({
  name: "",
  number: undefined,
  style: {
    color: "transparent",
    borderColor: "transparent",
    nameColor: "transparent",
    numberColor: "transparent",
    numberBackgroundColor: "transparent",
  },
})

const makeSlot = (
  byCode: Record<string, TPlayerPosition | undefined>,
  code: string,
  label: string,
  offset?: { x?: number; y?: number }
): any => {
  const item = byCode[code]
  if (!item) return emptySlot()

  return {
    number: code,
    name: item.type,
    ...(offset ? { offset } : {}),
  }
}

export default function PositionMap({ data , size = "small" }: PositionMapProps) {


 

  const safeData: TPlayerPosition[] = Array.isArray(data)
    ? data.filter((item): item is TPlayerPosition => !!item?.name)
    : [] 
  const byCode = safeData.reduce<Record<string, TPlayerPosition>>(
    (acc, item) => {
      const code = extractShortCode(item.name)
      if (!code) return acc

      if (code === "CB") {
        if (!acc["RCB"]) {
          acc["RCB"] = item
        } else {
          acc["LCB"] = item
        }
        return acc
      }

      const normalized: Record<string, string> = {
        DM: "CDM",
        AM: "CAM",
      }
      acc[normalized[code] ?? code] = item
      return acc
    },
    {}
  )

  const awayTeam: Team = {
    squad: {
      gk: makeSlot(byCode, "GK", "Goalkeeper"),

      df: [
        makeSlot(byCode, "RB", "Right Back"),
        makeSlot(byCode, "RCB", "Centre Back"),
        makeSlot(byCode, "LCB", "Centre Back"),
        makeSlot(byCode, "LB", "Left Back"),
      ],

      cdm: [makeSlot(byCode, "CDM", "Defensive Mid")],

      cm: [makeSlot(byCode, "CM", "Central Mid")],

      cam: [makeSlot(byCode, "CAM", "Attacking Mid")],

      fw: [
        makeSlot(byCode, "RW", "Right Winger"),
        makeSlot(byCode, "ST", "Striker"),
        makeSlot(byCode, "LW", "Left Winger"),
      ],
    },

    style: {
      borderColor: "#ffffff54",
      nameColor: "#000000",
      numberColor: "#ffffff",
      numberBackgroundColor: "rgba(0,0,0,0.35)",
    },
  }

  return (
    <SoccerLineUp
      size={size}
      color="#479A3B"
      pattern="squares"
      awayTeam={awayTeam}
      
    />
  )
}
