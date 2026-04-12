"use client"

import * as React from "react"
import { format, isAfter, isWithinInterval, parseISO } from "date-fns"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CommonBtn from "@/components/common/common-btn"

type ProgramCalendarProps = {
  startDate: Date
  endDate: Date
  timeSlotsByDate: Record<string, string[]>
  onSelectedSlotsChange?: (selectedSlots: SelectedSlot[]) => void
}
const getDateKey = (date: Date) => format(date, "yyyy-MM-dd")

type SelectedSlot = {
  date: string
  time: string
}

export function ProgramCalendar({
  startDate,
  endDate,
  timeSlotsByDate,
  onSelectedSlotsChange,
}: ProgramCalendarProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const normalizedRange = React.useMemo(() => {
    if (isAfter(startDate, endDate)) {
      return { from: endDate, to: startDate }
    }

    return { from: startDate, to: endDate }
  }, [startDate, endDate])

  const initialActiveDate = React.useMemo(() => {
    const today = new Date()

    if (
      isWithinInterval(today, {
        start: normalizedRange.from,
        end: normalizedRange.to,
      })
    ) {
      return today
    }

    return normalizedRange.from
  }, [normalizedRange])

  const [activeDateKey, setActiveDateKey] = React.useState<string>(
    getDateKey(initialActiveDate)
  )
  const [selectedSlots, setSelectedSlots] = React.useState<SelectedSlot[]>([])

  React.useEffect(() => {
    if (
      !isWithinInterval(parseISO(activeDateKey), {
        start: normalizedRange.from,
        end: normalizedRange.to,
      })
    ) {
      setActiveDateKey(getDateKey(initialActiveDate))
    }
  }, [activeDateKey, initialActiveDate, normalizedRange])

  React.useEffect(() => {
    onSelectedSlotsChange?.(selectedSlots)
  }, [selectedSlots, onSelectedSlotsChange])

  const activeDateSlots = timeSlotsByDate[activeDateKey] ?? []
  const activeSelectedSlot = selectedSlots.find(
    (slot) => slot.date === activeDateKey
  )?.time

  console.log(selectedSlots)

  return (
    <Card className="mx-auto mt-6 w-full border border-white/15 bg-white/10 p-0 text-white **:data-[disabled='true']:border **:data-[disabled='true']:border-white/10 **:data-[disabled='true']:bg-white/20 **:data-[disabled='true']:text-white **:data-[disabled='true']:opacity-100 **:data-[selected-single=true]:bg-brand **:data-[selected-single=true]:text-primary **:data-[slot='calendar']:w-full [&_[data-disabled=true][data-outside=true]]:border-0 [&_[data-disabled=true][data-outside=true]]:text-white!">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={initialActiveDate}
          selected={parseISO(activeDateKey)}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="text-white [--cell-size:--spacing(10)] md:[--cell-size:--spacing(10)]"
          classNames={{
            weekdays: "flex gap-1",
            week: "mt-2 flex w-full gap-1",
          }}
          disabled={[
            { before: normalizedRange.from },
            { after: normalizedRange.to },
          ]}
          onSelect={() => {
            // Dates are not selectable - only time slots can be selected
          }}
          modifiers={{
            highlightedRange: (day) =>
              isWithinInterval(day, {
                start: normalizedRange.from,
                end: normalizedRange.to,
              }) && getDateKey(day) !== activeDateKey,
            selectedDate: (day) => getDateKey(day) === activeDateKey,
          }}
          modifiersClassNames={{
            highlightedRange: "bg-[#EDFCD6] text-primary ",
            selectedDate: "  text-primary",
          }}
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" })
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              return (
                <CalendarDayButton
                  day={day}
                  modifiers={modifiers}
                  className={`text-white!`}
                  {...props}
                >
                  {children}
                </CalendarDayButton>
              )
            },
          }}
        />

        <div className="space-y-3 border-t p-4">
          <p className="text-sm font-medium text-white/90">
            Available time slots for{" "}
            {format(parseISO(activeDateKey), "MMM d, yyyy")}
          </p>
          {activeDateSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No slots available for this date.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {activeDateSlots.map((slot) => (
                <Button
                  key={`${activeDateKey}-${slot}`}
                  type="button"
                  size="sm"
                  variant="outline"
                  className={
                    activeSelectedSlot === slot
                      ? "border-brand bg-brand text-primary hover:bg-brand/90"
                      : "border-white/20 bg-[#2A2D38] text-white"
                  }
                  onClick={() => {
                    setSelectedSlots([{ date: activeDateKey, time: slot }])
                  }}
                >
                  {slot}
                </Button>
              ))}
            </div>
          )}
          {activeSelectedSlot ? (
            <p className="text-sm text-muted-foreground">
              Selected time: {activeSelectedSlot}
            </p>
          ) : null}
        </div>
      </CardContent>

      <div className="px-5 pb-5">
        <CommonBtn
          text="Continue to Payment"
          size={"lg"}
          variant={"default"}
          className="w-full cursor-pointer bg-brand text-[14px] font-semibold text-primary hover:bg-brand/90"
          onClick={() => {
            const nextParams = new URLSearchParams(searchParams.toString())
            nextParams.set("confirm-pay", "program")
            router.replace(
              nextParams.toString()
                ? `${pathname}?${nextParams.toString()}`
                : pathname
            )
          }}
        />
      </div>
    </Card>
  )
}
