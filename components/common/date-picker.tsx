"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({ onDateChange }: { onDateChange?: (date: string) => void }) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground py-5  "
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate)
            if (selectedDate && onDateChange) {
              const formattedDate = format(selectedDate, "yyyy-MM-dd")
              onDateChange(formattedDate)
            }
          }}
          defaultMonth={date}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          className={`bg-transparent`}
        />
      </PopoverContent>
    </Popover>
  )
}
