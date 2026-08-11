"use client"

import BookingsTable from "@/components/common/bookings-table"
import StatusFilterSelect from "@/components/common/status-filter-select"
import Loader from "@/components/common/loader"
import api from "@/lib/api-fetcher"
import { useEffect, useMemo, useState } from "react"
import { TClubBookingData } from "@/types"
import { useAppSelector } from "@/lib/hooks"
import { selectIsSubscriptionActive } from "@/lib/features/userSlice"
import ClubDashboardSubscription from "@/components/custom/club-dashboard-subscription"

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
  const isUbscriber = useAppSelector(selectIsSubscriptionActive)

  const filteredBookings = useMemo(() => {
    if (status === "all") {
      return bookings
    } 
    return bookings.filter((booking) => booking.status === status)

  }, [bookings, status])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await api.get("/coach/program/bookings")  
        if (response?.data?.data) { 
          setBookings(response?.data?.data)
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
  }, []) 

  if (isUbscriber) {
    return (
      <section className="w-full max-w-full min-w-0 overflow-x-hidden text-white">
        <div className="mt-1 mb-4 flex w-full min-w-0 justify-start sm:justify-end">
          <StatusFilterSelect
            value={status}
            onValueChange={setStatus}
            options={statusOptions}
            className="w-full max-w-45"
          />
        </div>

        {loading ? (
          <BookingsTable bookings={filteredBookings} loading={loading} />
        ) : filteredBookings.length === 0 ? (
          <p className="py-8 text-center text-white/70">No Bookings yet</p>
        ): 
          <BookingsTable bookings={filteredBookings} loading={loading} />
        }
      </section>
    ) 
  } else {
    return (
      <ClubDashboardSubscription
        text={"May be you are not logged in or not authenticated subscription."}
        link="/coach/subscription"
        btnText="Get Subscription"
      />
    )
  }
}
