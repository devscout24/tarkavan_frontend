import type { UseFormRegisterReturn } from "react-hook-form" 
import SeasonStatField from "./season-stat-field"

type OutfieldStatKey =
  | "outfieldGamesPlayed"
  | "outfieldGoals"
  | "outfieldAssists"
  | "outfieldYellowCards"
  | "outfieldRedCards"

interface OutfieldStatsTabProps {
  registerStat?: (name: OutfieldStatKey) => UseFormRegisterReturn
  getFieldError?: (name: OutfieldStatKey) => string | undefined
}

export default function OutfieldStatsTab({
  registerStat,
  getFieldError,
}: OutfieldStatsTabProps) {
  return (
    <>
      <SeasonStatField
        title="Games Played"
        subtitle="Total appearances this season"
        registerProps={registerStat?.("outfieldGamesPlayed")}
        error={getFieldError?.("outfieldGamesPlayed")}
      />

      <div className="border-t border-white/10 bg-secondary/40 px-6 py-3">
        <p className="text-[14px] leading-[150%] font-medium text-white">
          Attacking &amp; Discipline
        </p>
      </div>

      <SeasonStatField
        title="Goals"
        subtitle="Competitive match goals"
        registerProps={registerStat?.("outfieldGoals")}
        error={getFieldError?.("outfieldGoals")}
      />

      <SeasonStatField
        title="Assists"
        subtitle="Key passes leading to goals"
        registerProps={registerStat?.("outfieldAssists")}
        error={getFieldError?.("outfieldAssists")}
      />

      <SeasonStatField
        title="Yellow Cards"
        subtitle="Cautions received"
        registerProps={registerStat?.("outfieldYellowCards")}
        error={getFieldError?.("outfieldYellowCards")}
      />

      <SeasonStatField
        title="Red Cards"
        subtitle="Cautions received"
        registerProps={registerStat?.("outfieldRedCards")}
        error={getFieldError?.("outfieldRedCards")}
      />
    </>
  )
}
