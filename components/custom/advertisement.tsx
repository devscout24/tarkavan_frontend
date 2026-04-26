import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import Image, { StaticImageData } from "next/image"

interface AdvertisementProps {
  imageUrl: string | StaticImageData
  positions?: string
  teamName?: string
  ageGroup?: string
  tryoutDate?: string
  description?: string
  onApply?: () => void
  hideDetails?: boolean
  isApplied?: boolean
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
    <defs>
      <clipPath id="clip0_2718_10035">
        <rect width="13.907" height="13.907" fill="white" />
      </clipPath>
    </defs>
  </Icon>
)

export default function Advertisement({
  imageUrl,
  positions,
  teamName,
  ageGroup,
  tryoutDate,
  description,
  onApply,
  hideDetails = false,
  isApplied = false,
}: AdvertisementProps) {
  return (
    <div className="flex  h-100  w-full  flex-col overflow-hidden rounded-[24px] bg-primary">
      {/* Image Section */}
      <div className="h-39 w-full flex-shrink-0">
        <Image
          width={1000}
          height={1000}
          src={imageUrl}
          alt="Advertisement"
          className="block h-full w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className={`flex flex-1 flex-col space-y-3 p-5 ${hideDetails ? "hidden" : "block"}`}>
        {/* Positions */}
        <p className="font-weight-500 text-[18px] leading-[120%] font-normal text-white flex-shrink-0">
          {positions}
        </p>

        {/* Team Name and Age Group */}
        <p className="font-weight-400 text-xs leading-[150%] font-normal text-white flex-shrink-0">
          {teamName} | Age: {ageGroup}
        </p>

        {/* Tryout Date */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="h-3.5 w-3.5 text-white">
            <TimerIcon />
          </div>
          <p className="text-xs leading-[150%] font-normal text-white">
            Tryouts: {tryoutDate}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs leading-[150%] font-normal text-white line-clamp-5 flex-1">
          {description}
        </p>

        {/* Apply Button */}
        <CommonBtn
          variant="default"
          size="lg"
          text={isApplied ? "Applied" : "Apply"}
          className={`h-10 w-full cursor-pointer text-base font-medium transition-all flex-shrink-0 ${
            isApplied 
              ? "bg-white text-black cursor-default" 
              : "bg-brand text-zinc-950 hover:bg-brand/90"
          }`}
          onClick={isApplied ? undefined : onApply}
          disabled={isApplied}
        />
      </div>
    </div>
  )
}
