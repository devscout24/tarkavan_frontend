"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"
import { isSameDay, parseISO } from "date-fns"
import { IoIosCheckmark } from "react-icons/io"
import { TChield, TTimeSlot } from "@/types"
import moment from "moment"
import { getAvailableTimes, getDateForMonth } from "@/app/(dashboards)/action"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getChildList } from "@/app/(dashboards)/player/programs/action"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import animationData from "../../public/searching.json"
import Lottie from "lottie-react"
import CommonBtn from "./common-btn"
import { useParams, useRouter } from "next/navigation"
import { bookProgram } from "@/app/(dashboards)/parent/action"
import { toast } from "sonner"
import isValidToken from "@/lib/isValid-token"

// ─── Types ──────

type ProgramDateTimeSelectorProps = {
  programStartDate?: string | Date
  programEndDate?: string | Date
  programTimes?: Array<{ id: number; time: string; is_available: boolean }>
  isOwner?: boolean
  availableTimes?: TTimeSlot[]
  price?: number
  detailsID: string
  priceToShow?: number
  programid: string
  slots?: { booking_date: string; booking_time_ids: number[] }[]
}

// date string (YYYY-MM-DD) → set of time IDs selected for that date
type TSelectedSlots = Record<string, number[]>

// ─── Component ────────────────

export default function ProgramDateTimeSelector({
  programStartDate,
  programEndDate,
  programTimes = [],
  isOwner = false,
  price,
  detailsID,
  programid,
  priceToShow,
  slots,
}: ProgramDateTimeSelectorProps) {
  const params = useParams()
  const child_id = params.child_id
  const router = useRouter()

  const startDate = programStartDate
    ? typeof programStartDate === "string"
      ? parseISO(programStartDate)
      : programStartDate
    : undefined

  const [date, setDate] = useState<Date | undefined>(startDate)
  const [user, setUser] = useState<{ role?: string } | null>(null)
  const currentUser = localStorage.getItem("go_elite_user")
    ? JSON.parse(localStorage.getItem("go_elite_user") as string)
    : null

  const [monthData, setMonthData] = useState<any[]>([])
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"))
  const [selectedDate, setSelectedDate] = useState<Date | string>("")

  // ── Multi-select: date → time_id[] ──────────────────────────────────────────
  const [selectedSlots, setSelectedSlots] = useState<TSelectedSlots>({})

  const [availableTimes, setAvailableTimes] = useState<TTimeSlot[]>([])
  const [allChields, setAllChields] = useState<TChield[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedChildId, setSelectedChildId] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  /** The YYYY-MM-DD key for the currently viewed date */
  const currentDateKey = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : ""

  /** IDs selected for the currently viewed date */
  const currentDateIds: number[] = currentDateKey
    ? (selectedSlots[currentDateKey] ?? [])
    : []

  /** Toggle a time ID on/off for the current date */
  const toggleTime = (slot: TTimeSlot) => {
    if (!currentDateKey) return
    setSelectedSlots((prev) => {
      const existing = prev[currentDateKey] ?? []
      const already = existing.includes(slot.id)
      return {
        ...prev,
        [currentDateKey]: already
          ? existing.filter((id) => id !== slot.id)
          : [...existing, slot.id],
      }
    })
  }

  /** Total number of time slots chosen across all dates */
  const totalSelected = Object.values(selectedSlots).reduce(
    (sum, ids) => sum + ids.length,
    0
  )

  /** Summary badge: "3 slots across 2 dates" */
  const selectionSummary = useMemo(() => {
    const dateCount = Object.values(selectedSlots).filter(
      (ids) => ids.length > 0
    ).length
    if (totalSelected === 0) return null
    return `${totalSelected} slot${totalSelected > 1 ? "s" : ""} across ${dateCount} date${dateCount > 1 ? "s" : ""} selected`
  }, [selectedSlots, totalSelected])

  // ─── Effects ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const storedUser = localStorage.getItem("go_elite_user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const availableDatesFromAPI = useMemo(
    () =>
      monthData
        .filter((d: any) => d.has_slots)
        .map((d: any) => parseISO(d.date)),
    [monthData]
  )

  const canSelectDate = (day: Date) =>
    availableDatesFromAPI.some((d) => isSameDay(d, day))

  // fetch available dates for the month when user changes month in calendar
  useEffect(() => {
    const getMonth = async () => {
      try {
        const res = await getDateForMonth({
          program_id: programid,
          month: currentMonth,
        })

        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setMonthData(res.data.data.days)
        }
      } catch (err) {
        console.error("Error fetching available dates for the month:", err)
      }
    }
    getMonth()
  }, [currentMonth, programid])

  // fetch available times when user selects a date
  useEffect(() => {
    if (!selectedDate) return
    const fetchAvailableTimes = async () => {
      try {
        const res = await getAvailableTimes({
          program_id: detailsID,
          date: String(moment(selectedDate).format("YYYY-MM-DD")),
        })
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setAvailableTimes(res.data.data.times)
        }
      } catch (err) {
        console.error("Error fetching available times:", err)
      }
    }
    fetchAvailableTimes()
  }, [selectedDate])

  // get child list for parent to select which child to book for (if parent has multiple children)
  useEffect(() => {
    const getChild = async () => {
      try {
        const res = await getChildList()
        if (
          res &&
          "success" in res &&
          res.success &&
          res.data &&
          "data" in res.data &&
          res.data.data
        ) {
          setAllChields(res.data.data)
        }
      } catch (error) {
        console.error("Error fetching child list:", error)
      }
    }
    getChild()
  }, [])

  // ─── Build booking payload ───────

  const buildPayload = (athleteProfileId: string | number) => ({
    program_id: Number(detailsID),
    athlete_profile_id: Number(athleteProfileId),
    slots:
      slots && slots.length > 0
        ? slots
        : Object.entries(selectedSlots)
            .filter(([, ids]) => ids.length > 0)
            .map(([booking_date, booking_time_ids]) => ({
              booking_date,
              booking_time_ids,
            })),
    // success_url : `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programid}?success=true`,
    // cancel_url : `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programid}?cancel=true`,
  })

  // ─── Booking handlers ──── 

  const token = localStorage.getItem("go_elite_token")

  const handleBooking = async (bookBy: "parent" | "player") => {
 

    if (!token || !isValidToken(token) || !user || user.role === undefined  ) {
      toast.error("You must be logged in to book a program.")
      router.push("/auth")
      return
    }

    const athleteId =
      bookBy === "parent"
        ? selectedChildId || child_id
        : String(currentUser?.profile_id)

    if (bookBy === "parent" && !athleteId) {
      toast.error("Please select a child to proceed.")
      return
    }

    const payload = buildPayload(athleteId as string)

    try {
      setLoading(false)
      const res = await bookProgram(payload as any) 

      if (res?.status === false && res?.message) {
        toast.error(res.message)
        setLoading(false)
        return
      }

      if (
        res &&
        "success" in res &&
        res.success &&
        res.data &&
        "data" in res.data &&
        res.data.data
      ) {
        const { checkout_url } = res.data.data
        if (checkout_url) {
          setLoading(false)
          window.location.href = checkout_url
        }  

        if(checkout_url === null && res?.data?.status){
          toast.success(res?.data?.message || "Free Booking successful.")
        }


      }
    } catch (err) {
      setLoading(false)
      console.error("Error booking program:", err)
    }
  }

  // ─── Render ─────
 

  return (
    <div className="mt-4 space-y-6 rounded-2xl bg-white p-4 sm:p-6">
      {/* ── Calendar (UI unchanged) ── */}
      <Calendar
        className="[aria-multiselectable='false']:w-stretch! w-full bg-transparent p-0"
        mode="single"
        buttonVariant="ghost"
        selected={date}
        defaultMonth={startDate}
        onSelect={(d) => {
          if (slots && slots.length > 0) {
            return
          }
          if (d && canSelectDate(d)) {
            setDate(d)
            setSelectedDate(d)
          }
        }}
        disabled={(day) => !canSelectDate(day)}
        modifiers={{ available_date: availableDatesFromAPI }}
        modifiersClassNames={{
          available_date:
            "bg-brand rounded-md mx-0.5 text-primary! hover:bg-brand opacity-100!",
        }}
        classNames={{
          root: "w-full",
          month: "w-full gap-5",
          month_caption: "h-10 justify-start px-0",
          caption_label: "text-xl font-semibold tracking-tight text-[#171717]",
          nav: "top-0 gap-1",
          button_previous:
            "absolute right-10 cursor-pointer size-8 rounded-md text-primary hover:bg-[#F5F5F5] hover:text-[#171717]",
          button_next:
            "absolute right-0 cursor-pointer size-8 rounded-md text-primary hover:bg-[#F5F5F5] hover:text-primary",
          weekdays: "mt-1",
          weekday: "text-sm font-normal text-primary",
          week: "mt-1",
          day: "aspect-square",
          day_button:
            "size-11 rounded-xl text-lg font-normal hover:bg-[#F5F5F5] w-full!",
          selected:
            "bg-brand! text-white hover:bg-brand/70 hover:text-primary rounded-xl",
          today:
            "bg-[#ECECEC] text-[#272727] rounded-xl data-[selected=true]:bg-[#101010] data-[selected=true]:text-white",
          outside: "text-[#B7B7B7] line-through aria-selected:text-[#B7B7B7]",
        }}
        onMonthChange={(month) => {
          setCurrentMonth(moment(month).format("YYYY-MM"))
        }}
      />

      {/* ── Available times for selected date ── */}
      {date && availableTimes && availableTimes.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#191919]">
              Available Times{" "}
              <span className="ml-1 text-xs font-normal text-[#888]">
                — pick one or more
              </span>
            </p>
            {currentDateIds.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setSelectedSlots((prev) => ({
                    ...prev,
                    [currentDateKey]: [],
                  }))
                }
                className="text-xs text-red-400 hover:underline"
              >
                Clear {currentDateIds.length} selected
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {availableTimes.map((slot, index) => {
              const isSelected = currentDateIds.includes(slot.id)
              const isDisabled =
                !slot.is_available || slot.is_past || slot.is_booked

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`relative h-10 rounded-xl bg-white text-sm font-medium text-[#202020] hover:bg-[#F8F8F8] ${isDisabled ? "line-through opacity-50" : ""} ${
                    isSelected
                      ? "border-2 border-brand bg-brand/5"
                      : "border border-[#DEDEDE]"
                  } `}
                  onClick={() => !isDisabled && toggleTime(slot)}
                  disabled={isDisabled}
                >
                  {slot.time
                    ? slot.time
                    : `${slot.start_time} - ${slot.end_time}`}

                  {isSelected && (
                    <div className="absolute top-0 right-0 h-4 w-4 rounded-2xl bg-brand">
                      <IoIosCheckmark className="absolute top-0 right-0" />
                    </div>
                  )}
                </Button>
              )
            })}
          </div>
        </>
      )}

      {/* ── Cross-date selection summary ── */}
      {selectionSummary && (
        <div className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand/5 px-3 py-2">
          <p className="text-sm font-medium text-[#191919]">
            {selectionSummary}
          </p>
          <button
            type="button"
            onClick={() => setSelectedSlots({})}
            className="text-xs text-red-400 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Payment row ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#DEDEDE] pt-4">
        <p className="text-lg font-medium text-primary!">
          Total: $ {priceToShow}
        </p>

        {user?.role === "parent" && !child_id ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button className="h-10 cursor-pointer rounded-xl bg-brand text-lg font-medium text-primary hover:bg-brand/80 hover:text-primary">
                {isOwner ? "Can not book own program" : "Proceed to Payment"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Select child
                </DialogTitle>
                <DialogDescription>
                  <p className="text-sm text-muted-foreground">
                    Please select a child to proceed with the booking.
                  </p>

                  {allChields.length > 0 ? (
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <Select
                        onValueChange={(value) => setSelectedChildId(value)}
                        defaultValue={selectedChildId}
                      >
                        <SelectTrigger className="w-full text-primary!">
                          <SelectValue placeholder="Select a child" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {allChields.map((child) => (
                              <SelectItem
                                value={String(child.id)}
                                key={child.id}
                                className="cursor-pointer hover:bg-brand!"
                              >
                                {child.name} {child.last_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div>
                      <Lottie animationData={animationData} loop />
                      <div>
                        <p className="pb-4 text-center text-sm text-muted-foreground">
                          No children found.
                        </p>
                        <CommonBtn
                          variant="outline"
                          size="default"
                          text="add child"
                          className="w-full cursor-pointer border-0 bg-brand text-primary hover:bg-brand"
                          onClick={() => router.push("?player=setup")}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between">
                    <CommonBtn
                      variant="outline"
                      size="default"
                      text="Close"
                      className="w-fit cursor-pointer border-brand bg-transparent px-4 text-primary hover:bg-transparent"
                      onClick={() => setIsDialogOpen(false)}
                    />
                    <CommonBtn
                      variant="outline"
                      size="default"
                      text="Continue to Payment"
                      className="w-fit cursor-pointer border-0 bg-brand px-4 text-primary hover:bg-brand"
                      onClick={() => handleBooking("parent")}
                      disabled={!selectedChildId || isOwner}
                      isLoading={loading}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : null}

        {user?.role === "player" || Boolean(child_id) ? (
          <CommonBtn
            disabled={isOwner}
            size="lg"
            variant="outline"
            className="h-10 w-fit cursor-pointer rounded-xl border-0 bg-brand px-3 text-lg font-medium text-primary hover:bg-brand/80"
            onClick={() =>
              child_id ? handleBooking("parent") : handleBooking("player")
            }
            isLoading={loading}
            text={isOwner ? "Can not book own program" : "Proceed to Payment"}
          />
        ) : null}

        {!user || user.role === undefined ? (
          <CommonBtn 
            size="lg"
            variant="outline"
            className="h-10 w-fit cursor-pointer rounded-xl border-0 bg-brand px-3 text-lg font-medium text-primary hover:bg-brand/80"
            onClick={() =>
              child_id ? handleBooking("parent") : handleBooking("player")
            }
            isLoading={loading}
            text={"Proceed to Payment"}
          />
        ) : null}
      </div>
    </div>
  )
}
