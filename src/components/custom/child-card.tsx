import { Icon } from "./Icon"
import CommonBtn from "../common/common-btn"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/animate-ui/primitives/radix/dropdown-menu"

interface ChildCardProps {
  imageUrl: string
  name: string
  age: number
  position: string
  jerseyNumber: number
  location: string
  isPublic: boolean
  stats: {
    games: number
    goals: number
    assists: number
  }
  onViewProfile?: () => void
  onInvite?: () => void
  onBlock?: () => void
  onRemove?: () => void
}

const FootballIcon = () => (
  <Icon width="18" height="17" viewBox="0 0 18 17">
    <path
      d="M6.13021 0.408936L8.64396 2.17761L11.1302 0.408936M0.296875 8.9921L2.96067 7.0246L1.59311 3.92598M14.8555 14.0365L11.6434 13.4552L10.5181 16.6589M15.3217 3.48882L14.2998 6.15042L16.9635 8.11785M5.30514 16.1639L5.33973 12.631L1.9663 12.6673"
      stroke="white"
      strokeLinejoin="round"
    />
  </Icon>
)

const LocationIcon = () => (
  <Icon width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M13.3327 6.66671C13.3327 9.99537 9.64002 13.462 8.40002 14.5327C8.2845 14.6196 8.14388 14.6665 7.99935 14.6665C7.85482 14.6665 7.7142 14.6196 7.59868 14.5327C6.35868 13.462 2.66602 9.99537 2.66602 6.66671C2.66602 5.25222 3.22792 3.89567 4.22811 2.89547C5.22831 1.89528 6.58486 1.33337 7.99935 1.33337C9.41384 1.33337 10.7704 1.89528 11.7706 2.89547C12.7708 3.89567 13.3327 5.25222 13.3327 6.66671Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

const LockIcon = () => (
  <Icon width="16" height="16" viewBox="0 0 16 16">
    <path
      d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66602 7.33337V4.66671C4.66602 3.78265 5.01721 2.93481 5.64233 2.30968C6.26745 1.68456 7.11529 1.33337 7.99935 1.33337C8.88341 1.33337 9.73125 1.68456 10.3564 2.30968C10.9815 2.93481 11.3327 3.78265 11.3327 4.66671V7.33337"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

const ThreeDotsIcon = () => (
  <Icon width="20" height="20" viewBox="0 0 20 20">
    <path
      d="M11.917 10.1045C11.917 9.26467 12.5977 8.58318 13.4375 8.58301C14.2774 8.58307 14.959 9.2646 14.959 10.1045C14.9588 10.9442 14.2773 11.6249 13.4375 11.625C12.5978 11.6248 11.9172 10.9442 11.917 10.1045ZM12.959 10.1045C12.9592 10.3689 13.1731 10.5828 13.4375 10.583L13.5342 10.5732C13.7524 10.5286 13.9168 10.3359 13.917 10.1045C13.917 9.8399 13.7021 9.62507 13.4375 9.625C13.206 9.62515 13.0134 9.78951 12.9688 10.0078L12.959 10.1045ZM8.27148 10.1045C8.27148 9.26467 8.95221 8.58318 9.79199 8.58301C10.6317 8.58322 11.3135 9.26469 11.3135 10.1045C11.3133 10.9441 10.6316 11.6248 9.79199 11.625C8.95232 11.6248 8.27166 10.9442 8.27148 10.1045ZM9.31348 10.1045C9.31365 10.3689 9.52761 10.5828 9.79199 10.583L9.88867 10.5732C10.1068 10.5285 10.2713 10.3358 10.2715 10.1045C10.2715 9.83999 10.0564 9.62521 9.79199 9.625C9.56056 9.62515 9.36788 9.78954 9.32324 10.0078L9.31348 10.1045ZM4.625 10.1045C4.625 9.26472 5.30579 8.58327 6.14551 8.58301C6.98544 8.58301 7.66699 9.26456 7.66699 10.1045C7.66682 10.9443 6.98533 11.625 6.14551 11.625C5.3059 11.6247 4.62518 10.9441 4.625 10.1045ZM5.66699 10.1045C5.66717 10.3688 5.8812 10.5827 6.14551 10.583L6.24219 10.5732C6.4605 10.5286 6.62485 10.336 6.625 10.1045C6.625 9.83986 6.41014 9.625 6.14551 9.625C5.91412 9.62523 5.72136 9.78955 5.67676 10.0078L5.66699 10.1045Z"
      fill="#C6F57A"
    />
  </Icon>
)

export default function ChildCard({
  imageUrl,
  name,
  age,
  position,
  jerseyNumber,
  location,
  isPublic,
  stats,
  onViewProfile,
  onInvite,
  onBlock,
  onRemove,
}: ChildCardProps) {
  return (
    <div className="max-h-[452px] max-w-[349px] overflow-hidden rounded-[8px] border border-secondary/50">
      {/* Image Section */}
      <div className="relative max-h-[180px] w-full">
        <img
          src={imageUrl}
          alt={name}
          className="block h-full max-h-[180px] w-full object-contain"
        />
        {/* Badge */}
        <div
          className={`absolute top-4 right-4 flex items-center justify-center rounded-full px-3 py-2 text-base leading-[120%] font-normal text-white ${
            isPublic ? "bg-[#00A63E]" : "bg-[#475969]"
          }`}
        >
          {isPublic ? "PUBLIC" : "PRIVATE"}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 bg-primary p-6">
        {/* Name and Football Icon */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xl leading-[120%] font-medium text-white">
              {name}
            </p>
            <p className="text-sm leading-[150%] font-normal text-white">
              Age: {age} | {position} | Jersey:{" "}
              <span className="font-medium">{jerseyNumber}</span>
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <FootballIcon />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5">
          <LocationIcon />
          <p className="text-item">{location}</p>
        </div>

        {/* Parental Control */}
        <div className="flex items-center gap-1.5">
          <LockIcon />
          <p className="text-item">Parental Control Active</p>
        </div>

        {/* Stats */}
        <div className="flex items-center divide-x divide-secondary/50">
          <div className="flex-1 text-center">
            <p className="text-base leading-[150%] font-semibold text-white">
              {stats.games}
            </p>
            <p className="text-sm leading-[150%] font-normal text-white">
              Games
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-base leading-[150%] font-semibold text-white">
              {stats.goals}
            </p>
            <p className="text-sm leading-[150%] font-normal text-white">
              Goals
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-base leading-[150%] font-semibold text-white">
              {stats.assists}
            </p>
            <p className="text-sm leading-[150%] font-normal text-white">
              Assists
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <CommonBtn
            variant="outline"
            size="lg"
            text="View Profile"
            className="h-10 flex-1 cursor-pointer border-brand bg-transparent text-sm font-medium text-white transition-all hover:bg-brand hover:text-primary"
            onClick={onViewProfile}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-brand bg-primary">
                <ThreeDotsIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-28 overflow-hidden rounded-lg border border-secondary/50 bg-white shadow-lg"
            >
              <DropdownMenuItem
                onSelect={onInvite}
                className="w-full cursor-pointer px-4 py-2 text-center text-sm font-normal text-primary outline-none hover:bg-brand"
              >
                Invite
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={onBlock}
                className="w-full cursor-pointer px-4 py-2 text-center text-sm font-normal text-primary outline-none hover:bg-brand/90"
              >
                Block
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={onRemove}
                className="w-full cursor-pointer px-4 py-2 text-center text-sm font-normal text-primary outline-none hover:bg-brand"
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
