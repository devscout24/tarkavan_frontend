"use client"

import BookingsTable from "@/components/common/bookings-table"
import StatusFilterSelect from "@/components/common/status-filter-select"
import Loader from "@/components/common/loader"
import api from "@/lib/api-fetcher"
import React, { useEffect, useMemo, useState } from "react"
import { TClubBookingData } from "@/types"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import moment from "moment"

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
  { value: "refund", label: "Refund" },
]

export default function BookingsPage() {
  const [status, setStatus] = useState("all")
  const [bookings, setBookings] = useState<TClubBookingData[]>([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)

  const filteredBookings = useMemo(() => {
    if (status === "all") {
      return bookings
    }

    return bookings.filter((booking) => booking.status === status)
  }, [bookings, status])

  useEffect(() => {
    const fetchBookings = async () => {
      const params = {
        from_date: date?.from
          ? moment(date.from).format("YYYY-MM-DD")
          : "",

        to_date: date?.to ? moment(date.to).format("YYYY-MM-DD") : "",
      }

      try {
        setLoading(true)

        const response = await api.get("/club/program/bookings", {
          params,
        })

        if (response?.data?.data) {
          setBookings(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()

    const revaliteOnBookingChange = () => {
      fetchBookings()
    }

    window.addEventListener("bookingChanged", revaliteOnBookingChange)

    return () => {
      window.removeEventListener("bookingChanged", revaliteOnBookingChange)
    }
  }, [date?.from, date?.to])

  return (
    <section className="w-full max-w-full min-w-0 overflow-x-hidden text-white">
      <div className="mt-1 mb-4 flex w-full min-w-0 justify-start sm:justify-end">
        <StatusFilterSelect
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
          date={date}
          setDate={setDate}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : filteredBookings.length === 0 ? (
        <p className="py-8 text-center text-white/70">No Bookings yet</p>
      ) : (
        <BookingsTable bookings={filteredBookings} loading={loading} />
      )}
    </section>
  )
}
