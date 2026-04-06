import type { UseFormRegisterReturn } from "react-hook-form" 
import SeasonStatField from "./season-stat-field"

type GoalkeeperStatKey =
  | "goalkeeperGamesPlayed"
  | "goalkeeperGoals"
  | "goalkeeperAssists"
  | "goalkeeperYellowCards"
  | "goalkeeperRedCards"
  | "goalkeeperCleanSheets"
  | "goalkeeperTotalSaves"

interface GoalkeeperStatsTabProps {
  registerStat?: (name: GoalkeeperStatKey) => UseFormRegisterReturn
  getFieldError?: (name: GoalkeeperStatKey) => string | undefined
}

export default function GoalkeeperStatsTab({
  registerStat,
  getFieldError,
}: GoalkeeperStatsTabProps) {
  return (
    <>
      <SeasonStatField
        title="Games Played"
        subtitle="Total appearances this season"
        registerProps={registerStat?.("goalkeeperGamesPlayed")}
        error={getFieldError?.("goalkeeperGamesPlayed")}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Attacking &amp; Discipline
        </p>
      </div>

      <SeasonStatField
        title="Goals"
        subtitle="Competitive match goals"
        registerProps={registerStat?.("goalkeeperGoals")}
        error={getFieldError?.("goalkeeperGoals")}
      />

      <SeasonStatField
        title="Assists"
        subtitle="Key passes leading to goals"
        registerProps={registerStat?.("goalkeeperAssists")}
        error={getFieldError?.("goalkeeperAssists")}
      />

      <SeasonStatField
        title="Yellow Cards"
        subtitle="Cautions received"
        registerProps={registerStat?.("goalkeeperYellowCards")}
        error={getFieldError?.("goalkeeperYellowCards")}
      />

      <SeasonStatField
        title="Red Cards"
        subtitle="Cautions received"
        registerProps={registerStat?.("goalkeeperRedCards")}
        error={getFieldError?.("goalkeeperRedCards")}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Goalkeeper Metrics
        </p>
      </div>

      <SeasonStatField
        title="Clean Sheets"
        subtitle="Matches with zero goals conceded"
        registerProps={registerStat?.("goalkeeperCleanSheets")}
        error={getFieldError?.("goalkeeperCleanSheets")}
      />

      <SeasonStatField
        title="Total Saves"
        subtitle="Estimated total saves made"
        registerProps={registerStat?.("goalkeeperTotalSaves")}
        error={getFieldError?.("goalkeeperTotalSaves")}
      />
    </>
  )
}
