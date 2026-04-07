"use client"

import alexThompsonImage from "@/public/images/alex_thompson.png"
import michaelRossImage from "@/public/images/michael_ross.png"
import emilyDavisImage from "@/public/images/emily_davis.png"
import StatusFilterSelect from "@/components/common/status-filter-select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image, { StaticImageData } from "next/image"
import { useMemo, useState } from "react"
import { LuEye } from "react-icons/lu"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { cn } from "@/lib/utils"

type BookingStatus = "approved" | "pending" | "rejected"

type BookingItem = {
  id: string
  clientName: string
  programName: string
  amount: string
  date: string
  status: BookingStatus
  avatar: StaticImageData
}

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

function StatusPill({
  status,
  className,
}: {
  status: BookingStatus
  className?: string
}) {
  if (status === "approved") {
    return (
      <Badge
        className={cn(
          "h-8 rounded-full bg-[#D6F7E2] px-3 text-base font-medium text-[#0D8E45] hover:bg-[#D6F7E2]",
          className
        )}
      >
        Approved
      </Badge>
    )
  }

  if (status === "pending") {
    return (
      <Badge
        className={cn(
          "h-8 rounded-full bg-[#FFF0DF] px-3 text-base font-medium text-[#E4851C] hover:bg-[#FFF0DF]",
          className
        )}
      >
        Pending
      </Badge>
    )
  }

  return (
    <Badge
      className={cn(
        "h-8 rounded-full bg-[#FDE6E6] px-3 text-base font-medium text-[#D92D20] hover:bg-[#FDE6E6]",
        className
      )}
    >
      Rejected
    </Badge>
  )
}

function ActionButtons({
  booking,
  className,
  iconClassName,
}: {
  booking: BookingItem
  className?: string
  iconClassName?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        className="cursor-pointer text-white"
        aria-label={`View ${booking.clientName} booking`}
      >
        <LuEye className={cn("h-5 w-5", iconClassName)} />
      </button>
      <button
        type="button"
        className="cursor-pointer text-[#00D66B]"
        aria-label={`Approve ${booking.clientName} booking`}
      >
        <IoMdCheckmarkCircleOutline className={cn("h-5 w-5", iconClassName)} />
      </button>
      <button
        type="button"
        className="cursor-pointer text-[#E50000]"
        aria-label={`Cancel ${booking.clientName} booking`}
      >
        <MdCancel className={cn("h-5 w-5", iconClassName)} />
      </button>
    </div>
  )
}

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

      <div className="space-y-3 lg:hidden">
        {filteredBookings.map((booking) => (
          <article
            key={booking.id}
            className="rounded-xl border border-secondary/40 bg-primary/30 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={booking.avatar}
                  alt={booking.clientName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-white">
                    {booking.clientName}
                  </p>
                  <p className="truncate text-sm text-white/70">
                    {booking.programName}
                  </p>
                </div>
              </div>
              <StatusPill status={booking.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/50">Amount</p>
                <p className="text-white">{booking.amount}</p>
              </div>
              <div>
                <p className="text-white/50">Date</p>
                <p className="text-white">{booking.date}</p>
              </div>
            </div>

            <div className="mt-3">
              <ActionButtons booking={booking} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-secondary/40 [scrollbar-color:rgba(198,245,122,0.75)_transparent] [scrollbar-width:thin] lg:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/75 [&::-webkit-scrollbar-track]:bg-transparent">
        <Table className="w-full min-w-full table-fixed">
          <TableHeader>
            <TableRow className="bg-[#ECEEEA] hover:bg-[#ECEEEA]">
              <TableHead className="h-10 w-1/4 border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Client Name
              </TableHead>
              <TableHead className="h-10 w-1/4 border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Program Name
              </TableHead>
              <TableHead className="h-10 w-[11%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Amount
              </TableHead>
              <TableHead className="h-10 w-[14%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Date
              </TableHead>
              <TableHead className="h-10 w-[13%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Status
              </TableHead>
              <TableHead className="h-10 w-[12%] px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="border-b border-white/15 bg-transparent hover:bg-transparent"
              >
                <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <div className="flex min-w-0 items-center gap-2 xl:gap-3">
                    <Image
                      src={booking.avatar}
                      alt={booking.clientName}
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-cover xl:h-9 xl:w-9 2xl:h-10 2xl:w-10"
                    />
                    <p className="truncate text-sm leading-[150%] font-normal text-white xl:text-base">
                      {booking.clientName}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {booking.programName}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {booking.amount}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {booking.date}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <StatusPill
                    status={booking.status}
                    className="h-7 px-2.5 text-sm 2xl:h-8 2xl:px-3 2xl:text-base"
                  />
                </TableCell>
                <TableCell className="h-16 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <ActionButtons
                    booking={booking}
                    className="gap-2 2xl:gap-3"
                    iconClassName="h-4 w-4 2xl:h-5 2xl:w-5"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-2 hidden text-xs text-white/60 lg:block">
        Swipe left or right to see all columns
      </p>
    </section>
  )
}
