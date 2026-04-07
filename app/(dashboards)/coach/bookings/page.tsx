"use client"

import alexThompsonImage from "@/public/images/alex_thompson.png"
import michaelRossImage from "@/public/images/michael_ross.png"
import emilyDavisImage from "@/public/images/emily_davis.png"
import BookingsTable, {
  type BookingItem,
} from "@/components/common/bookings-table"
import StatusFilterSelect from "@/components/common/status-filter-select"
import { useMemo, useState } from "react"

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
]

const bookings: BookingItem[] = [
  {
    id: "1",
    clientName: "Alex Thompson",
    programName: "Elite 1-on-1",
    amount: "$299.00",
    date: "Dec 15, 2024",
    status: "approved",
    avatar: alexThompsonImage,
  },
  {
    id: "2",
    clientName: "Michael Ross",
    programName: "Strategy Call",
    amount: "$249.00",
    date: "Dec 20, 2024",
    status: "pending",
    avatar: michaelRossImage,
  },
  {
    id: "3",
    clientName: "Emily Davis",
    programName: "Workshop Session",
    amount: "$199.00",
    date: "Dec 22, 2024",
    status: "rejected",
    avatar: emilyDavisImage,
  },
]

export default function BookingsPage() {
  const [status, setStatus] = useState("all")

  const filteredBookings = useMemo(() => {
    if (status === "all") {
      return bookings
    }

    return bookings.filter((booking) => booking.status === status)
  }, [status])

  return (
    <section className="w-full max-w-full min-w-0 overflow-x-hidden text-white">
      <div className="mb-4 flex w-full min-w-0 justify-start sm:justify-end">
        <StatusFilterSelect
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
          className="w-full max-w-45"
        />
      </div>

      <BookingsTable bookings={filteredBookings} />
    </section>
  )
}
