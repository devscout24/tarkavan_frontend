"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { format, isSameDay, eachDayOfInterval } from "date-fns"

const timeSlots = [
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:00 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:00 PM",
]

// শুধু এই dates গুলো available (example)
const availableDates = [
  new Date(2026, 3, 20),
  new Date(2026, 3, 22),
  new Date(2026, 3, 25),
]

type ProgramDateTimeSelectorProps = {
  role?: "coach" | "player" | "parent" | "club"
  programStartDate?: Date
  programEndDate?: Date
  programTimes?: Array<{ id: number; time: string; is_available: boolean }>
}

export default function ProgramDateTimeSelector({ 
  role = "player", 
  programStartDate, 
  programEndDate,
  programTimes = []
}: ProgramDateTimeSelectorProps) {
  const [date, setDate] = useState<Date | undefined>(programStartDate)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Use program times if available, otherwise fallback to hardcoded times
  let displayTimes: string[] = []
   
  
  if (programTimes && programTimes.length > 0) {
    // Get the time strings from the program times
    const timeStrings = programTimes.map(t => t.time).filter(Boolean) 
    
    // Check if any of the time strings contain commas (indicating they're joined)
    const allTimes = timeStrings.flatMap(timeStr => {
      if (typeof timeStr === 'string' && timeStr.includes(',')) {
        // Split comma-separated times
        return timeStr.split(',').map(t => t.trim()).filter(t => t !== '')
      }
      return timeStr
    })
    
    displayTimes = allTimes
  } else {
    displayTimes = timeSlots
  }

 
  
  // Extra safety: ensure we have an array of strings
  const normalizedTimes = displayTimes.map(time => String(time)).filter(time => time.trim() !== '')
  
 

  const dateLabel = date ? format(date, "EEEE d MMMM") : role === "coach" ? "Program Schedule" : "Select a date"

  // Generate program date range for coach
  const programDates = programStartDate && programEndDate 
    ? eachDayOfInterval({ start: programStartDate, end: programEndDate })
    : []

  // Check if a date is a program date
  const isProgramDate = (day: Date) => {
    return programDates.some(d => isSameDay(d, day))
  }

  // Check if a date is available (for non-coach roles)
  const isAvailableDate = (day: Date) => {
    return availableDates.some(d => isSameDay(d, day))
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-4 sm:p-6 mt-4    ">
      {/* Calendar */}
      <Calendar
        className="w-full bg-transparent p-0 [aria-multiselectable='false']:w-stretch!     "
        mode="single"
        buttonVariant="ghost"
        selected={date}
        defaultMonth={programStartDate}
        onSelect={(d) => {
          if (d) {
            setDate(d)
            setSelectedTime(null) // date change হলে time reset
          }
        }}
        disabled={(day) => {
          if (role === "coach") {
            // For coach, only program dates are selectable
            return !isProgramDate(day)
          } else {
            // For other roles, use available dates logic
            return !isAvailableDate(day)
          }
        }}
        modifiers={{
          program_date: programDates
        }}
        modifiersClassNames={{
          program_date: "bg-brand/40 text-brand hover:bg-brand/20"
        }}
        classNames={{
          root: "w-full",
          month: "w-full gap-5",
          month_caption: "h-10 justify-start px-0",
          caption_label:
            "text-xl font-semibold tracking-tight text-[#171717]",
          nav: "  top-0 gap-1",
          button_previous:
            "absolute right-10 cursor-pointer size-8 rounded-md text-[#8D8D8D] hover:bg-[#F5F5F5] hover:text-[#171717]",
          button_next:
            " absolute right-0 cursor-pointer size-8 rounded-md text-[#8D8D8D] hover:bg-[#F5F5F5] hover:text-[#171717]",
          weekdays: "mt-1",
          weekday: "text-sm font-normal text-[#7A7A7A]",
          week: "mt-1",
          day: "aspect-square",
          day_button: "size-11 rounded-xl text-lg font-normal text-[#232323] hover:bg-[#F5F5F5]",
          selected:
            "bg-brand! text-white hover:bg-brand/70 hover:text-primary rounded-xl  ",
          today:
            "bg-[#ECECEC] text-[#272727] rounded-xl data-[selected=true]:bg-[#101010] data-[selected=true]:text-white",
          outside:
            "text-[#B7B7B7] line-through opacity-100 aria-selected:text-[#B7B7B7]",
          disabled: role === "coach" ? "text-[#C0C0C0] opacity-50" : "text-[#C0C0C0] line-through opacity-100",
        }}
      />

      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <p className="text-xl font-medium text-[#191919]">{dateLabel}</p>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 text-base font-normal text-[#5C5C5C]"
        >
          EDST
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="mt-1 h-4 w-4"
            fill="none"
          >
            <path
              d="M5.5 7.5L10 12l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Time slots */}
      {date && normalizedTimes.length > 0 && (
        <>
          <div className="mb-2 text-sm font-medium text-[#191919]">
            Available Times:
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {normalizedTimes.map((time, index) => {
 
              return (
                <Button
                  key={`time-${index}`}
                  variant="outline"
                  className={
                    selectedTime === time
                      ? "h-10 rounded-xl border-brand bg-brand text-lg font-medium text-primary hover:bg-brand/70  hover:text-primary"
                      : "h-10 rounded-xl border-[#DEDEDE] bg-white text-lg font-medium text-[#202020] hover:bg-[#F8F8F8]"
                  }
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              )
            })}
          </div>
        </>
      )}

      {/* payment */}
      {role !== "coach" && (
        <div className="flex items-center justify-between gap-4 border-t border-[#DEDEDE] pt-4">
          <p className="text-lg font-medium text-[#191919]">Total: $100.00</p>
          <Button className="h-10 rounded-xl bg-brand text-lg font-medium text-primary hover:bg-brand/80 hover:text-primary cursor-pointer  ">
            Proceed to Payment
          </Button>
        </div>
      )}


    </div>
  )
}
