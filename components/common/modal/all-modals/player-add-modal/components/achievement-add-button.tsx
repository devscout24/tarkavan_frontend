"use client"

import CommonBtn from "@/components/common/common-btn"

type AchievementAddButtonProps = {
  onClick?: () => void
}

export default function AddAchievementButton({
  onClick,
}: AchievementAddButtonProps) {
  return (
    <CommonBtn
      variant="default"
      size="sm"
      text="Add Achievement"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8.00197 13.3392C8.5539 13.3392 9.0013 12.8918 9.0013 12.3399V9.00454H12.336C12.8876 9.00454 13.3349 8.55754 13.3353 8.00587C13.3356 7.45367 12.8881 7.00587 12.336 7.00587H9.0013V3.67123C9.0013 3.11956 8.5543 2.67224 8.00264 2.67188C7.45044 2.67152 7.00264 3.11905 7.00264 3.67123V7.00587H3.66732C3.1154 7.00587 2.66797 7.45327 2.66797 8.0052C2.66797 8.55714 3.1154 9.00454 3.66732 9.00454H7.00264V12.3399C7.00264 12.8918 7.45004 13.3392 8.00197 13.3392Z"
            stroke="#060807"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      onClick={onClick}
      className="h-9 w-fit cursor-pointer rounded-xl bg-brand px-4 text-[14px] font-semibold text-[#111308] hover:bg-secondary/20 hover:text-white"
    />
  )
}
