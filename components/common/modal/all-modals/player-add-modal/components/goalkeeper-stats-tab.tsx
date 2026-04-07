import SeasonStatField from "./season-stat-field"
import type { SeasonStatsValues } from "../types"

type GoalkeeperStatKey =
  | "goalkeeperGamesPlayed"
  | "goalkeeperGoals"
  | "goalkeeperAssists"
  | "goalkeeperYellowCards"
  | "goalkeeperRedCards"
  | "goalkeeperCleanSheets"
  | "goalkeeperTotalSaves"

interface GoalkeeperStatsTabProps {
  values: SeasonStatsValues
  onChange: (name: GoalkeeperStatKey, value: string) => void
}

export default function GoalkeeperStatsTab({
  values,
  onChange,
}: GoalkeeperStatsTabProps) {
  return (
    <>
      <SeasonStatField
        title="Games Played"
        subtitle="Total appearances this season"
        value={values.goalkeeperGamesPlayed}
        onChange={(value) => onChange("goalkeeperGamesPlayed", value)}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Attacking &amp; Discipline
        </p>
      </div>

      <SeasonStatField
        title="Goals"
        subtitle="Competitive match goals"
        value={values.goalkeeperGoals}
        onChange={(value) => onChange("goalkeeperGoals", value)}
      />

      <SeasonStatField
        title="Assists"
        subtitle="Key passes leading to goals"
        value={values.goalkeeperAssists}
        onChange={(value) => onChange("goalkeeperAssists", value)}
      />

      <SeasonStatField
        title="Yellow Cards"
        subtitle="Cautions received"
        value={values.goalkeeperYellowCards}
        onChange={(value) => onChange("goalkeeperYellowCards", value)}
      />

      <SeasonStatField
        title="Red Cards"
        subtitle="Cautions received"
        value={values.goalkeeperRedCards}
        onChange={(value) => onChange("goalkeeperRedCards", value)}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Goalkeeper Metrics
        </p>
      </div>

      <SeasonStatField
        title="Clean Sheets"
        subtitle="Matches with zero goals conceded"
        value={values.goalkeeperCleanSheets}
        onChange={(value) => onChange("goalkeeperCleanSheets", value)}
      />

      <SeasonStatField
        title="Total Saves"
        subtitle="Estimated total saves made"
        value={values.goalkeeperTotalSaves}
        onChange={(value) => onChange("goalkeeperTotalSaves", value)}
      />
    </>
  )
}
