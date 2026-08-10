"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { childPrivacyUpdate } from "@/app/(dashboards)/player/profile/action"
import { toast } from "sonner"

const SPRING = {
  type: "spring",
  stiffness: 620,
  damping: 38,
  mass: 0.6,
} as const
const NUDGE = {
  type: "spring",
  stiffness: 700,
  damping: 46,
  mass: 0.5,
} as const
const NONE = { duration: 0 } as const
const ROW_H = 32

export type DropdownItem = {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export type DropdownProps = {
  items: DropdownItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  child_id?: string
  placeholder?: string
  disabled?: boolean
  emptyLabel?: string
  className?: string
}

export function Dropdown({
  items,
  value,
  defaultValue,
  onChange,
  label = "Options",
  placeholder = "Select an option",
  disabled = false,
  emptyLabel = "Nothing to choose",
  className = "",
  child_id
}: DropdownProps) {
  const reduced = useReducedMotion()
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "")
  const selected = value ?? uncontrolled
  const selectedIndex = items.findIndex((i) => i.value === selected)

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [pos, setPos] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)
  const [mounted, setMounted] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const recalc = () => {
    const r = triggerRef.current?.getBoundingClientRect()
    if (r) setPos({ top: r.bottom + 4, left: r.left, width: r.width })
  }

  const openMenu = () => {
    if (disabled || items.length === 0) return
    recalc()
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    setActiveIndex(-1)
    triggerRef.current?.focus()
  }

  const select = (i: number) => {
    const item = items[i]
    if (!item || item.disabled) return
    if (value === undefined) setUncontrolled(item.value)
    onChange?.(item.value)
    close()
  }

  const step = (from: number, dir: 1 | -1) => {
    const n = items.length
    let i = from
    for (let k = 0; k < n; k++) {
      i = (i + dir + n) % n
      if (!items[i].disabled) return i
    }
    return from
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    const onScroll = () => recalc()
    document.addEventListener("pointerdown", onDown, true)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("resize", onScroll)
    return () => {
      document.removeEventListener("pointerdown", onDown, true)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", onScroll)
    }
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault()
        openMenu()
      }
      return
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => step(i, e.key === "ArrowDown" ? 1 : -1))
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      select(activeIndex)
    } else if (e.key === "Escape" || e.key === "Tab") {
      close()
    }
  }

  const handlePlayerPrivacyChange = async (value: string , i: number) => {

    if(!child_id) {
        toast.error("Child ID is missing. Cannot update privacy setting.")
        return
    }

    select(i)
    
    try {
      const formData = new FormData()
      formData.append("privacy_settings", value)
      formData.append("child_id", child_id) 

      const res = await childPrivacyUpdate(formData) 

      if (res && res?.status) { 
        window.dispatchEvent(new CustomEvent("player_profile_updated"));
        toast.success( res?.message || "Privacy setting updated successfully")
      } else {
        console.error(res)
        toast.error("Failed to update privacy setting")
      }
    } catch (error) {
      console.error("Error updating privacy setting:", error)
      toast.error("Failed to update privacy setting")
    }
  }

  const menu = (
    <AnimatePresence>
      {open && pos && (
        <motion.div
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -8 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.97,
            y: -6,
            transition: reduced ? NONE : { duration: 0.12 },
          }}
          transition={
            reduced ? NONE : { ...SPRING, opacity: { duration: 0.12 } }
          }
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            minWidth: Math.max(pos.width, 240),
            transformOrigin: "top left",
          }}
          className="z-999 rounded-[11px] border border-stone-200 bg-white p-1.25 shadow-[0_1px_2px_rgba(28,25,23,0.06),0_16px_36px_-18px_rgba(28,25,23,0.5)] dark:border-white/16 dark:bg-[#1D1D1A] dark:shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        >
          <ul
            role="listbox"
            aria-label={label}
            className="relative max-h-60 overflow-y-auto outline-none"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-[7px] bg-stone-100 dark:bg-white/10"
              initial={false}
              animate={{
                y: activeIndex < 0 ? 0 : activeIndex * ROW_H,
                opacity: activeIndex < 0 ? 0 : 1,
              }}
              transition={
                reduced ? NONE : { ...NUDGE, opacity: { duration: 0.1 } }
              }
            />
            {items.map((item, i) => (
              <li
                key={item.value}
                role="option"
                aria-selected={i === selectedIndex}
                aria-disabled={item.disabled || undefined}
                onPointerMove={() => !item.disabled && setActiveIndex(i)}
                onClick={() => handlePlayerPrivacyChange(item.value, i)}
                className={`relative flex h-8 cursor-default items-center rounded-[7px] px-2.5 text-[13px] select-none ${
                  item.disabled
                    ? "text-stone-500/70 dark:text-stone-400/70"
                    : "text-stone-700 dark:text-stone-200"
                }`}
              >
                <span className="relative flex min-w-0 flex-1 items-center gap-3">
                  <span className="truncate">{item.label}</span>
                  {item.hint && (
                    <span className="ml-auto shrink-0 font-mono text-[10.5px] text-stone-500 dark:text-stone-400">
                      {item.hint}
                    </span>
                  )}
                </span>
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{
                    opacity: i === selectedIndex ? 1 : 0,
                    scale: i === selectedIndex ? 1 : 0.7,
                  }}
                  transition={
                    reduced
                      ? NONE
                      : { type: "spring", stiffness: 520, damping: 34 }
                  }
                  className="ml-2 flex size-3.5 shrink-0 items-center justify-center"
                >
                  <svg viewBox="0 0 14 14" className="size-3.5">
                    <path
                      d="M3 7.4 5.8 10.2 11 4.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              </li>
            ))}
            {items.length === 0 && (
              <li className="flex h-8 items-center px-2.5 text-[13px] text-stone-500 dark:text-stone-400">
                {emptyLabel}
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div
      ref={rootRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onKeyDown}
        className={`flex h-9 items-center gap-2 rounded-[9px] border border-stone-200 bg-white px-3 text-[13px] font-medium whitespace-nowrap text-stone-700 transition-[box-shadow,border-color] duration-150 outline-none select-none disabled:opacity-50 dark:border-white/16 dark:bg-[#1D1D1A] dark:text-stone-200 ${
          open
            ? "shadow-[inset_0_1px_2px_rgba(28,25,23,0.09)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
            : "shadow-[0_1px_2px_rgba(28,25,23,0.06),0_4px_10px_-8px_rgba(28,25,23,0.45)] hover:border-stone-300 dark:hover:border-white/20"
        }`}
      >
        <span className="sr-only">
          {label}: {items[selectedIndex]?.label ?? placeholder}
        </span>
        <span aria-hidden>
          {label}: {items[selectedIndex]?.label ?? placeholder}
        </span>
        <motion.svg
          aria-hidden
          viewBox="0 0 12 12"
          className="size-3 shrink-0 text-stone-500 dark:text-stone-400"
          initial={false}
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduced ? NONE : NUDGE}
        >
          <path
            d="M3 4.75 6 7.75 9 4.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {mounted && createPortal(menu, document.body)}
    </div>
  )
}

const VISIBILITY: DropdownItem[] = [
  { value: "public", label: "Public", hint: "default" },
  { value: "coach_and_team", label: "Coach and Team" },
  { value: "private", label: "Only Me" },
  { value: "only_player", label: "Players only" },
]

export default function VisibilityDropdown({ child_id , bdValue }: { child_id: string; bdValue: string }) {

  const [visibility, setVisibility] = useState(bdValue || "public")
  useEffect(()=> {
    setVisibility(bdValue || "public")
  } , [bdValue])

  return (
    <div className="grid w-fit place-items-center">
      <Dropdown
        label="Visibility"
        items={VISIBILITY}
        value={visibility}
        onChange={setVisibility}
        child_id={child_id}
      />
    </div>
  )
}
