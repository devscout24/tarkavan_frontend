 
import { Icon } from "@/components/custom/Icon"
import Image, { StaticImageData } from "next/image"

interface ClubOpurtunityCardProps {
  imageUrl: string | StaticImageData
  positions?: string
  teamName?: string
  ageGroup?: string
  tryoutDate?: string
  description?: string
  hideDetails?: boolean
}

const TimerIcon = () => (
  <Icon width="14" height="14" viewBox="0 0 14 14">
    <g clipPath="url(#clip0_2718_10035)">
      <path
        d="M6.95278 12.7481C10.153 12.7481 12.7474 10.1538 12.7474 6.95351C12.7474 3.75325 10.153 1.15894 6.95278 1.15894C3.75252 1.15894 1.1582 3.75325 1.1582 6.95351C1.1582 10.1538 3.75252 12.7481 6.95278 12.7481Z"
        stroke="white"
        strokeWidth="0.869186"
      />
      <path
        d="M6.95508 4.05615V6.95344L8.40372 8.40208"
        stroke="white"
        strokeWidth="0.869186"
      />
    </g>
  </Icon>
)

export default function ClubOpurtunityCard({
  imageUrl,
  positions,
  teamName,
  ageGroup,
  tryoutDate,
  description,
  hideDetails = false,
}: ClubOpurtunityCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-primary">
      {/* Image */}
      <div className="h-40 w-full">
        <Image
          src={imageUrl}
          alt="Advertisement"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      {!hideDetails && (
        <div className="flex flex-col gap-3 p-5">
          {/* Positions */}
          {positions && (
            <p className="text-lg font-medium text-white">{positions}</p>
          )}

          {/* Team + Age */}
          {(teamName || ageGroup) && (
            <p className="text-xs text-white/80">
              {teamName}
              {teamName && ageGroup && " | "}
              {ageGroup && `Age: ${ageGroup}`}
            </p>
          )}

          {/* Tryout Date */}
          {tryoutDate && (
            <div className="flex items-center gap-1.5 text-white/80">
              <TimerIcon />
              <p className="text-xs">Tryouts: {tryoutDate}</p>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-xs leading-relaxed text-white/80 line-clamp-4">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}