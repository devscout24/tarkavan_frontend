"use client"

import BookingsTable, {
  type BookingItem,
  type BookingStatus,
} from "@/components/common/bookings-table"
import StatusFilterSelect from "@/components/common/status-filter-select"
import Loader from "@/components/common/loader"
import api from "@/lib/api-fetcher"
import { useEffect, useMemo, useState } from "react"

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
]

type ApiBooking = Record<string, unknown>

const FALLBACK_AVATAR = "/images/player1.png"

function normalizeStatus(status: unknown): BookingStatus {
  const value = String(status ?? "")
    .trim()
    .toLowerCase()

  if (value === "approved") return "approved"
  if (value === "rejected" || value === "cancelled" || value === "canceled")
    return "rejected"
  return "pending"
}

function formatAmount(amount: unknown) {
  if (typeof amount === "number") return `$${amount.toFixed(2)}`

  const value = String(amount ?? "").trim()
  if (!value) return "--"
  if (value.startsWith("$")) return value

  const parsed = Number(value)
  return Number.isNaN(parsed) ? value : `$${parsed.toFixed(2)}`
}

function formatDate(date: unknown) {
  const value = String(date ?? "").trim()
  if (!value) return "--"

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function mapBooking(item: ApiBooking, index: number): BookingItem {
  return {
    id: String(item.id ?? item.booking_id ?? index),
    clientName: String(
      item.client_name ??
        item.player_name ??
        item.parent_name ??
        item.user_name ??
        item.name ??
        "Unknown Client"
    ),
    programName: String(
      item.program_name ?? item.title ?? item.program ?? "Untitled Program"
    ),
    amount: formatAmount(
      item.amount ?? item.program_price ?? item.price ?? item.total_amount
    ),
    date: formatDate(
      item.date ?? item.booking_date ?? item.created_at ?? item.updated_at
    ),
    status: normalizeStatus(item.status),
    avatar: String(
      item.avatar ??
        item.player_photo ??
        item.parent_photo ??
        item.user_photo ??
        item.profile_photo ??
        FALLBACK_AVATAR
    ),
  }
}

export default function BookingsPage() {
  const [status, setStatus] = useState("all")
  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [loading, setLoading] = useState(true)

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
        const response = await api.get("/club/program/bookings")
        const data = Array.isArray(response?.data?.data)
          ? response.data.data
          : []
        setBookings(
          data.map((item: ApiBooking, index: number) => mapBooking(item, index))
        )
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : filteredBookings.length === 0 ? (
        <p className="py-8 text-center text-white/70">No Bookings yet</p>
      ) : (
        <BookingsTable bookings={filteredBookings} />
      )}
    </section>
  )
}
