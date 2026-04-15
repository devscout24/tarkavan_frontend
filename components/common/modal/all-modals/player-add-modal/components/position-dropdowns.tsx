import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Position {
  id: string
  short: string
  name: string
}

interface PositionDropdownsProps {
  positions: Position[]
  primaryPosition: string
  secondaryPosition: string
  onPrimarySelect: (value: string) => void
  onSecondarySelect: (value: string) => void
  errors?: {
    primaryPosition?: string
    secondaryPosition?: string
  }
}

export default function PositionDropdowns({
  positions,
  primaryPosition,
  secondaryPosition,
  onPrimarySelect,
  onSecondarySelect,
  errors
}: PositionDropdownsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
      <div className="rounded-xl border border-secondary bg-primary p-5 transition-colors hover:bg-secondary/80">
        <p className="text-[14px] leading-[150%] font-semibold text-white">
          Primary Position
        </p>
        <Select value={primaryPosition} onValueChange={onPrimarySelect}>
          <SelectTrigger
            className={`mt-2.5 h-12 w-full rounded-xl border border-secondary px-4 text-[14px] leading-[150%] ${
              primaryPosition
                ? "bg-white text-primary"
                : "bg-secondary text-white"
            }`}
          >
            <SelectValue placeholder="Select primary position" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem
                key={position.id}
                value={position.id}
                className="bg-secondary text-white hover:bg-brand hover:text-gray-800 focus:bg-brand focus:text-gray-800 rounded-none"
              >
                {position.name} ({position.short})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.primaryPosition && (
          <p className="mt-2 text-xs text-red-500">
            {errors.primaryPosition}
          </p>
        )}
        <p className="mt-2.5 text-[14px] leading-[150%] font-normal text-white/70">
          Most active position on the field.
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-5 transition-colors hover:bg-secondary/80">
        <p className="text-[14px] leading-[150%] font-bold text-white">
          Secondary Position
        </p>
        <Select
          value={secondaryPosition}
          onValueChange={onSecondarySelect}
        >
          <SelectTrigger
            className={`mt-2.5 h-12 w-full rounded-xl border border-secondary px-4 text-[14px] leading-[150%] ${
              secondaryPosition
                ? "bg-white text-primary"
                : "bg-secondary text-white"
            }`}
          >
            <SelectValue placeholder="Select secondary position" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem
                key={position.id}
                value={position.id}
                className="bg-secondary text-white hover:bg-brand hover:text-gray-500 focus:bg-brand focus:text-gray-500 rounded-none"
              >
                {position.name} ({position.short})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.secondaryPosition && (
          <p className="mt-2 text-xs text-red-500">
            {errors.secondaryPosition}
          </p>
        )}
        <p className="mt-2.5 text-[14px] leading-[150%] font-normal text-white/70">
          Backup or alternative role.
        </p>
      </div>
    </div>
  )
}
