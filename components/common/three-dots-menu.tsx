"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu"
import { cn } from "@/lib/utils"

export type ThreeDotsMenuItem = {
  label: string
  onSelect?: () => void
  disabled?: boolean
  className?: string
}

type ThreeDotsMenuProps = {
  isVisible?: boolean
  items?: ThreeDotsMenuItem[]
  triggerAriaLabel?: string
  className?: string
  triggerClassName?: string
  menuClassName?: string
  itemClassName?: string
  id?: string | number
}

function ThreeDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.917 10.1045C11.917 9.26467 12.5977 8.58318 13.4375 8.58301C14.2774 8.58307 14.959 9.2646 14.959 10.1045C14.9588 10.9442 14.2773 11.6249 13.4375 11.625C12.5978 11.6248 11.9172 10.9442 11.917 10.1045ZM12.959 10.1045C12.9592 10.3689 13.1731 10.5828 13.4375 10.583L13.5342 10.5732C13.7524 10.5286 13.9168 10.3359 13.917 10.1045C13.917 9.8399 13.7021 9.62507 13.4375 9.625C13.206 9.62515 13.0134 9.78951 12.9688 10.0078L12.959 10.1045ZM8.27148 10.1045C8.27148 9.26467 8.95221 8.58318 9.79199 8.58301C10.6317 8.58322 11.3135 9.26469 11.3135 10.1045C11.3133 10.9441 10.6316 11.6248 9.79199 11.625C8.95232 11.6248 8.27166 10.9442 8.27148 10.1045ZM9.31348 10.1045C9.31365 10.3689 9.52761 10.5828 9.79199 10.583L9.88867 10.5732C10.1068 10.5285 10.2713 10.3358 10.2715 10.1045C10.2715 9.83999 10.0564 9.62521 9.79199 9.625C9.56056 9.62515 9.36788 9.78954 9.32324 10.0078L9.31348 10.1045ZM4.625 10.1045C4.625 9.26472 5.30579 8.58327 6.14551 8.58301C6.98544 8.58301 7.66699 9.26456 7.66699 10.1045C7.66682 10.9443 6.98533 11.625 6.14551 11.625C5.3059 11.6247 4.62518 10.9441 4.625 10.1045ZM5.66699 10.1045C5.66717 10.3688 5.8812 10.5827 6.14551 10.583L6.24219 10.5732C6.4605 10.5286 6.62485 10.336 6.625 10.1045C6.625 9.83986 6.41014 9.625 6.14551 9.625C5.91412 9.62523 5.72136 9.78955 5.67676 10.0078L5.66699 10.1045Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ThreeDotsMenu({
  isVisible = true,
  items = [],
  triggerAriaLabel = "Open options menu",
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
  id,
}: ThreeDotsMenuProps) {
  if (!isVisible) {
    return null
  }

  const trigger = (
    <button
      type="button"
      aria-label={triggerAriaLabel}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg border border-brand bg-primary",
        triggerClassName
      )}
    >
      <ThreeDotsIcon className="text-brand" />
    </button>
  )

  if (items.length === 0) {
    return <div className={className}>{trigger}</div>
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className={cn(
            "w-48 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg",
            menuClassName
          )}
        >
          {items.map((item, index) => (
            <DropdownMenuItem
              key={`${item.label}-${index}`}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className={cn(
                "w-full cursor-pointer px-4 py-2 text-left text-sm text-white transition-colors duration-150 hover:bg-brand hover:text-black focus:bg-brand focus:text-black focus:outline-none",
                itemClassName,
                item.className,
                item.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
