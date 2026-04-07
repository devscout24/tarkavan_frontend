import SeasonStatField from "./season-stat-field"
import type { SeasonStatsValues } from "../types"

type OutfieldStatKey =
  | "outfieldGamesPlayed"
  | "outfieldGoals"
  | "outfieldAssists"
  | "outfieldYellowCards"
  | "outfieldRedCards"

interface OutfieldStatsTabProps {
  values: SeasonStatsValues
  onChange: (name: OutfieldStatKey, value: string) => void
}

export default function OutfieldStatsTab({
  values,
  onChange,
}: OutfieldStatsTabProps) {
  return (
    <>
      <SeasonStatField
        title="Games Played"
        subtitle="Total appearances this season"
        value={values.outfieldGamesPlayed}
        onChange={(value) => onChange("outfieldGamesPlayed", value)}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Attacking &amp; Discipline
        </p>
      </div>

      <SeasonStatField
        title="Goals"
        subtitle="Competitive match goals"
        value={values.outfieldGoals}
        onChange={(value) => onChange("outfieldGoals", value)}
      />

      <SeasonStatField
        title="Assists"
        subtitle="Key passes leading to goals"
        value={values.outfieldAssists}
        onChange={(value) => onChange("outfieldAssists", value)}
      />

      <SeasonStatField
        title="Yellow Cards"
        subtitle="Cautions received"
        value={values.outfieldYellowCards}
        onChange={(value) => onChange("outfieldYellowCards", value)}
      />

      <SeasonStatField
        title="Red Cards"
        subtitle="Cautions received"
        value={values.outfieldRedCards}
        onChange={(value) => onChange("outfieldRedCards", value)}
      />
    </>
  )
}
