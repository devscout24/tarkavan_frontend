interface ProgramReminderProps {
  title: string
  date: {
    month: string
    day: string | number
  }
  time: string
  location: string
  onClick?: () => void
}

const LocationIcon = () => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.66667 5.83333C4.9875 5.83333 5.26215 5.7191 5.49062 5.49062C5.7191 5.26215 5.83333 4.9875 5.83333 4.66667C5.83333 4.34583 5.7191 4.07118 5.49062 3.84271C5.26215 3.61424 4.9875 3.5 4.66667 3.5C4.34583 3.5 4.07118 3.61424 3.84271 3.84271C3.61424 4.07118 3.5 4.34583 3.5 4.66667C3.5 4.9875 3.61424 5.26215 3.84271 5.49062C4.07118 5.7191 4.34583 5.83333 4.66667 5.83333ZM4.66667 10.1208C5.85278 9.03194 6.73264 8.04271 7.30625 7.15312C7.87986 6.26354 8.16667 5.47361 8.16667 4.78333C8.16667 3.72361 7.82882 2.8559 7.15312 2.18021C6.47743 1.50451 5.64861 1.16667 4.66667 1.16667C3.68472 1.16667 2.8559 1.50451 2.18021 2.18021C1.50451 2.8559 1.16667 3.72361 1.16667 4.78333C1.16667 5.47361 1.45347 6.26354 2.02708 7.15312C2.60069 8.04271 3.48056 9.03194 4.66667 10.1208ZM4.66667 11.6667C3.10139 10.3347 1.93229 9.09757 1.15937 7.95521C0.386458 6.81285 0 5.75556 0 4.78333C0 3.325 0.469097 2.16319 1.40729 1.29792C2.34549 0.432639 3.43194 0 4.66667 0C5.90139 0 6.98785 0.432639 7.92604 1.29792C8.86424 2.16319 9.33333 3.325 9.33333 4.78333C9.33333 5.75556 8.94688 6.81285 8.17396 7.95521C7.40104 9.09757 6.23194 10.3347 4.66667 11.6667Z"
      fill="currentColor"
    />
  </svg>
)

const FootballIcon = () => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 100C43.0833 100 36.5833 98.6875 30.5 96.0625C24.4167 93.4375 19.125 89.875 14.625 85.375C10.125 80.875 6.5625 75.5833 3.9375 69.5C1.3125 63.4167 0 56.9167 0 50C0 43.0833 1.3125 36.5833 3.9375 30.5C6.5625 24.4167 10.125 19.125 14.625 14.625C19.125 10.125 24.4167 6.5625 30.5 3.9375C36.5833 1.3125 43.0833 0 50 0C56.9167 0 63.4167 1.3125 69.5 3.9375C75.5833 6.5625 80.875 10.125 85.375 14.625C89.875 19.125 93.4375 24.4167 96.0625 30.5C98.6875 36.5833 100 43.0833 100 50C100 56.9167 98.6875 63.4167 96.0625 69.5C93.4375 75.5833 89.875 80.875 85.375 85.375C80.875 89.875 75.5833 93.4375 69.5 96.0625C63.4167 98.6875 56.9167 100 50 100ZM75 37.5L81.75 35.25L83.75 28.5C81.0833 24.5 77.875 21.0625 74.125 18.1875C70.375 15.3125 66.25 13.1667 61.75 11.75L55 16.5V23.5L75 37.5ZM25 37.5L45 23.5V16.5L38.25 11.75C33.75 13.1667 29.625 15.3125 25.875 18.1875C22.125 21.0625 18.9167 24.5 16.25 28.5L18.25 35.25L25 37.5ZM19.75 76L25.5 75.5L29.25 68.75L22 47L15 44.5L10 48.25C10 53.6667 10.75 58.6042 12.25 63.0625C13.75 67.5208 16.25 71.8333 19.75 76ZM50 90C52.1667 90 54.2917 89.8333 56.375 89.5C58.4583 89.1667 60.5 88.6667 62.5 88L66 80.5L62.75 75H37.25L34 80.5L37.5 88C39.5 88.6667 41.5417 89.1667 43.625 89.5C45.7083 89.8333 47.8333 90 50 90ZM38.75 65H61.25L68.25 45L50 32.25L32 45L38.75 65ZM80.25 76C83.75 71.8333 86.25 67.5208 87.75 63.0625C89.25 58.6042 90 53.6667 90 48.25L85 44.75L78 47L70.75 68.75L74.5 75.5L80.25 76Z"
      fill="currentColor"
    />
  </svg>
)

export default function ProgramReminder({
  title,
  date,
  time,
  location,
  onClick,
}: ProgramReminderProps) {
  return (
    <section className="relative flex flex-col items-start gap-0 overflow-hidden rounded-[24px] bg-secondary/25 p-6">
      <h5 className="mb-4 text-base font-semibold text-white">
        Program Reminder
      </h5>

      <div className="w-full space-y-4">
        {/* Date and Program Info */}
        <div className="flex items-center gap-4 rounded-[12px] p-2">
          <div className="flex flex-col items-center justify-center rounded bg-secondary/80 px-2 py-1.5">
            <p className="text-xs font-normal text-white uppercase">
              {date.month}
            </p>
            <p className="text-sm font-bold text-white">{date.day}</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-white">
              {title}
            </p>
            <p className="text-base text-secondary">{time}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <div className="h-3 w-3 shrink-0 pt-0.5 text-white">
            <LocationIcon />
          </div>
          <p className="text-sm text-secondary">{location}</p>
        </div>

        {/* View Location Button */}
        <button
          onClick={onClick}
          className="w-full cursor-pointer rounded-[12px] border border-primary bg-white px-4 py-2.5 text-center text-base font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
        >
          View Location
        </button>
      </div>

      {/* Football Icon - Bottom Right */}
      <div className="absolute right-0 bottom-0 -m-4 text-white opacity-30">
        <FootballIcon />
      </div>
    </section>
  )
}
