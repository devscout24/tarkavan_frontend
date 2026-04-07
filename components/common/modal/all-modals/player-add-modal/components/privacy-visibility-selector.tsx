"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type PrivacyValue = "public" | "coaches-teams" | "private"

const privacyOptions: {
  value: PrivacyValue
  title: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: "public",
    title: "Public",
    description:
      "Visible to everyone on the platform. Recommended for maximizing exposure to college recruiters and scouts. Profile appears in search results.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667ZM7.5 14.9583V13.3333C7.04167 13.3333 6.64931 13.1701 6.32292 12.8438C5.99653 12.5174 5.83333 12.125 5.83333 11.6667V10.8333L1.83333 6.83333C1.79167 7.08333 1.75347 7.33333 1.71875 7.58333C1.68403 7.83333 1.66667 8.08333 1.66667 8.33333C1.66667 10.0139 2.21875 11.4861 3.32292 12.75C4.42708 14.0139 5.81944 14.75 7.5 14.9583ZM13.25 12.8333C13.8194 12.2083 14.2535 11.5104 14.5521 10.7396C14.8507 9.96875 15 9.16667 15 8.33333C15 6.97222 14.6215 5.72917 13.8646 4.60417C13.1076 3.47917 12.0972 2.66667 10.8333 2.16667V2.5C10.8333 2.95833 10.6701 3.35069 10.3438 3.67708C10.0174 4.00347 9.625 4.16667 9.16667 4.16667H7.5V5.83333C7.5 6.06944 7.42014 6.26736 7.26042 6.42708C7.10069 6.58681 6.90278 6.66667 6.66667 6.66667H5V8.33333H10C10.2361 8.33333 10.434 8.41319 10.5938 8.57292C10.7535 8.73264 10.8333 8.93056 10.8333 9.16667V11.6667H11.6667C12.0278 11.6667 12.3542 11.7743 12.6458 11.9896C12.9375 12.2049 13.1389 12.4861 13.25 12.8333Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    value: "coaches-teams",
    title: "Coaches & Teams Only",
    description:
      "Only verified coaches, recruiters, and registered team members can view the full profile. Casual users will see a limited profile.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="17"
        viewBox="0 0 14 17"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.79167 11.2917L10.5 6.58333L9.3125 5.39583L5.79167 8.91667L4.04167 7.16667L2.85417 8.35417L5.79167 11.2917ZM6.66667 16.6667C4.73611 16.1806 3.14236 15.0729 1.88542 13.3438C0.628472 11.6146 0 9.69444 0 7.58333V2.5L6.66667 0L13.3333 2.5V7.58333C13.3333 9.69444 12.7049 11.6146 11.4479 13.3438C10.191 15.0729 8.59722 16.1806 6.66667 16.6667ZM6.66667 14.9167C8.11111 14.4583 9.30556 13.5417 10.25 12.1667C11.1944 10.7917 11.6667 9.26389 11.6667 7.58333V3.64583L6.66667 1.77083L1.66667 3.64583V7.58333C1.66667 9.26389 2.13889 10.7917 3.08333 12.1667C4.02778 13.5417 5.22222 14.4583 6.66667 14.9167Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    value: "private",
    title: "Private",
    description:
      "Profile is hidden from all search results. Only you and those you explicitly share a direct link with can view the athlete's details.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1.66667 17.5C1.20833 17.5 0.815972 17.3368 0.489583 17.0104C0.163194 16.684 0 16.2917 0 15.8333V7.5C0 7.04167 0.163194 6.64931 0.489583 6.32292C0.815972 5.99653 1.20833 5.83333 1.66667 5.83333H2.5V4.16667C2.5 3.01389 2.90625 2.03125 3.71875 1.21875C4.53125 0.40625 5.51389 0 6.66667 0C7.81944 0 8.80208 0.40625 9.61458 1.21875C10.4271 2.03125 10.8333 3.01389 10.8333 4.16667V5.83333H11.6667C12.125 5.83333 12.5174 5.99653 12.8438 6.32292C13.1701 6.64931 13.3333 7.04167 13.3333 7.5V15.8333C13.3333 16.2917 13.1701 16.684 12.8438 17.0104C12.5174 17.3368 12.125 17.5 11.6667 17.5H1.66667ZM1.66667 15.8333H11.6667V7.5H1.66667V15.8333ZM6.66667 13.3333C7.125 13.3333 7.51736 13.1701 7.84375 12.8438C8.17014 12.5174 8.33333 12.125 8.33333 11.6667C8.33333 11.2083 8.17014 10.816 7.84375 10.4896C7.51736 10.1632 7.125 10 6.66667 10C6.20833 10 5.81597 10.1632 5.48958 10.4896C5.16319 10.816 5 11.2083 5 11.6667C5 12.125 5.16319 12.5174 5.48958 12.8438C5.81597 13.1701 6.20833 13.3333 6.66667 13.3333ZM4.16667 5.83333H9.16667V4.16667C9.16667 3.47222 8.92361 2.88194 8.4375 2.39583C7.95139 1.90972 7.36111 1.66667 6.66667 1.66667C5.97222 1.66667 5.38194 1.90972 4.89583 2.39583C4.40972 2.88194 4.16667 3.47222 4.16667 4.16667V5.83333ZM1.66667 15.8333V7.5V15.8333Z"
          fill="white"
        />
      </svg>
    ),
  },
]

export default function PrivacyVisibilitySelector({
  value,
  onChange,
}: {
  value: PrivacyValue
  onChange: (value: PrivacyValue) => void
}) {
  return (
    <div className="mt-6 space-y-3">
      <RadioGroup
        value={value}
        onValueChange={(nextValue) => onChange(nextValue as PrivacyValue)}
        className="space-y-3"
      >
        {privacyOptions.map((option) => (
          <label
            key={option.value}
            className="group block cursor-pointer"
            htmlFor={`privacy-${option.value}`}
          >
            <div className="rounded-xl border border-secondary bg-transparent px-4 py-4 transition-colors group-hover:bg-secondary/10 has-data-[state=checked]:bg-secondary/20">
              <div className="flex items-start gap-3">
                <RadioGroupItem
                  id={`privacy-${option.value}`}
                  value={option.value}
                  className="mt-1 h-5 w-5 border-white/80 bg-transparent data-[state=checked]:border-white data-[state=checked]:bg-transparent"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{option.icon}</span>
                    <p className="text-[16px] leading-[150%] font-medium text-white">
                      {option.title}
                    </p>
                  </div>

                  <p className="mt-1 max-w-129.5 text-[14px] leading-[150%] font-normal text-white/70">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>

      <div className="rounded-xl bg-secondary/40 px-4 py-3">
        <div className="flex items-start gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 15H11V9H9V15ZM10 7C10.2833 7 10.5208 6.90417 10.7125 6.7125C10.9042 6.52083 11 6.28333 11 6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6C9 6.28333 9.09583 6.52083 9.2875 6.7125C9.47917 6.90417 9.71667 7 10 7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
              fill="white"
            />
          </svg>
          <p className="max-w-161.5 text-[14px] leading-[150%] font-normal text-white/70">
            You can change these settings at any time from your child's profile
            dashboard. Information like GPA and contact numbers are always
            hidden by default.
          </p>
        </div>
      </div>
    </div>
  )
}
