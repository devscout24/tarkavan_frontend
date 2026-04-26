import SoccerLineUp, { type Team } from "react-soccer-lineup"

type PositionApiItem = {
  id: number
  name: string
}

type PositionMapProps = {
  data?: PositionApiItem[]
}

const extractShortCode = (name: string) => {
  const match = name.match(/\(([^)]+)\)\s*$/)
  return match?.[1]?.trim().toUpperCase() ?? ""
}

type LineupPlayer = {
  number?: number
  name?: string
  offset?: { x?: number; y?: number }
  style?: {
    color?: string
    borderColor?: string
    nameColor?: string
    numberColor?: string
  }
}

const emptySlot = (): LineupPlayer => ({
  name: "",
  number: undefined,
  offset: { x: 0, y: 0 },
  style: {
    color: "transparent",
    borderColor: "transparent",
    nameColor: "transparent",
    numberColor: "transparent",
  },
})

const slotFromCode = (
  byCode: Record<string, PositionApiItem | undefined>,
  code: string,
  fallbackName: string,
  offset?: { x?: number; y?: number }
): LineupPlayer => {
  const item = byCode[code]

  if (!item) {
    return emptySlot()
  }

  return {
    number: item.id,
    name: fallbackName,
    ...(offset ? { offset } : {}),
  }
}

export default function PositionMap({ data = [] }: PositionMapProps) {
  const byCode = data.reduce<Record<string, PositionApiItem>>((acc, item) => {
    const code = extractShortCode(item.name)
    if (!code) {
      return acc
    }

    // Normalize API codes to field slots used by react-soccer-lineup.
    if (code === "CB") {
      if (!acc.RCB) {
        acc.RCB = item
      } else {
        acc.LCB = item
      }
      return acc
    }

    if (code === "DM") {
      acc.CDM = item
      return acc
    }

    if (code === "AM") {
      acc.CAM = item
      return acc
    }

    acc[code] = item
    return acc
  }, {})

  const awayTeam: Team = {
    squad: {
      gk: slotFromCode(byCode, "GK", "Goalkeeper", { x: 10, y: 0 }),
      df: [
        slotFromCode(byCode, "RB", "Right-back", { x: 11, y: 5 }),
        slotFromCode(byCode, "RCB", "Centre-back", { x: 11, y: 0 }),
        slotFromCode(byCode, "LCB", "Centre-back", { x: 11, y: 0 }),
        slotFromCode(byCode, "LB", "Left-back", { x: 11, y: 0 }),
      ],
      cm: [
        slotFromCode(byCode, "CDM", "Defensive Midfielder", { y: 0 }),
        slotFromCode(byCode, "CM", "Central Midfielder", { y: 0 }),
        slotFromCode(byCode, "CAM", "Attacking Midfielder", { x: -16, y: -30 }),
      ],
      fw: [
        slotFromCode(byCode, "RW", "Right Winger"),
        slotFromCode(byCode, "ST", "Striker", { x: -8, y: 0 }),
        slotFromCode(byCode, "LW", "Left Winger"),
      ],
    },
    style: {
      borderColor: "#ffffff",
      nameColor: "#333333",
    },
  }

  return (
    <SoccerLineUp
      size="responsive"
      color="#479A3B"
      pattern="squares"
      awayTeam={awayTeam}
    />
  )
}
