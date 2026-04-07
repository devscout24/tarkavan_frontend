"use client"

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
import { LuEye } from "react-icons/lu"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdCancel } from "react-icons/md"

export type BookingStatus = "approved" | "pending" | "rejected"

export type BookingItem = {
  id: string
  clientName: string
  programName: string
  amount: string
  date: string
  status: BookingStatus
  avatar: StaticImageData
}

type BookingsTableProps = {
  bookings: BookingItem[]
  onView?: (booking: BookingItem) => void
  onApprove?: (booking: BookingItem) => void
  onCancel?: (booking: BookingItem) => void
}

function StatusPill({ status }: { status: BookingStatus }) {
  if (status === "approved") {
    return (
      <Badge className="h-8 rounded-full bg-[#D6F7E2] px-3 text-base font-medium text-[#0D8E45] hover:bg-[#D6F7E2]">
        Approved
      </Badge>
    )
  }

  if (status === "pending") {
    return (
      <Badge className="h-8 rounded-full bg-[#FFF0DF] px-3 text-base font-medium text-[#E4851C] hover:bg-[#FFF0DF]">
        Pending
      </Badge>
    )
  }

  return (
    <Badge className="h-8 rounded-full bg-[#FDE6E6] px-3 text-base font-medium text-[#D92D20] hover:bg-[#FDE6E6]">
      Rejected
    </Badge>
  )
}

export default function BookingsTable({
  bookings,
  onView,
  onApprove,
  onCancel,
}: BookingsTableProps) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-xl border border-secondary/40 bg-primary/40 p-4"
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
                  <p className="truncate text-sm font-medium text-white">
                    {booking.clientName}
                  </p>
                  <p className="truncate text-xs text-white/70">
                    {booking.programName}
                  </p>
                </div>
              </div>
              <StatusPill status={booking.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/80">
              <div>
                <p className="text-white/50">Amount</p>
                <p className="text-sm text-white">{booking.amount}</p>
              </div>
              <div>
                <p className="text-white/50">Date</p>
                <p className="text-sm text-white">{booking.date}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                className="cursor-pointer text-white"
                aria-label={`View ${booking.clientName} booking`}
                onClick={() => onView?.(booking)}
              >
                <LuEye className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="cursor-pointer text-[#00D66B]"
                aria-label={`Approve ${booking.clientName} booking`}
                onClick={() => onApprove?.(booking)}
              >
                <IoMdCheckmarkCircleOutline className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="cursor-pointer text-[#E50000]"
                aria-label={`Cancel ${booking.clientName} booking`}
                onClick={() => onCancel?.(booking)}
              >
                <MdCancel className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-secondary/40 md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#ECEEEA] hover:bg-[#ECEEEA]">
              <TableHead className="h-11 border-r border-black/20 px-5 text-sm font-medium text-black">
                Client Name
              </TableHead>
              <TableHead className="h-11 border-r border-black/20 px-5 text-sm font-medium text-black">
                Program Name
              </TableHead>
              <TableHead className="h-11 border-r border-black/20 px-5 text-sm font-medium text-black">
                Amount
              </TableHead>
              <TableHead className="h-11 border-r border-black/20 px-5 text-sm font-medium text-black">
                Date
              </TableHead>
              <TableHead className="h-11 border-r border-black/20 px-5 text-sm font-medium text-black">
                Status
              </TableHead>
              <TableHead className="h-11 px-5 text-sm font-medium text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="border-b border-white/15 bg-transparent hover:bg-transparent"
              >
                <TableCell className="h-19 border-r border-white/15 px-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src={booking.avatar}
                      alt={booking.clientName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p className="text-2 leading-[150%] font-normal text-white sm:text-base">
                      {booking.clientName}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-2 h-19 border-r border-white/15 px-5 leading-[150%] font-normal whitespace-normal text-white sm:text-base">
                  {booking.programName}
                </TableCell>
                <TableCell className="text-2 h-19 border-r border-white/15 px-5 leading-[150%] font-normal text-white sm:text-base">
                  {booking.amount}
                </TableCell>
                <TableCell className="text-2 h-19 border-r border-white/15 px-5 leading-[150%] font-normal text-white sm:text-base">
                  {booking.date}
                </TableCell>
                <TableCell className="h-19 border-r border-white/15 px-5">
                  <StatusPill status={booking.status} />
                </TableCell>
                <TableCell className="h-19 px-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="cursor-pointer text-white"
                      aria-label={`View ${booking.clientName} booking`}
                      onClick={() => onView?.(booking)}
                    >
                      <LuEye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer text-[#00D66B]"
                      aria-label={`Approve ${booking.clientName} booking`}
                      onClick={() => onApprove?.(booking)}
                    >
                      <IoMdCheckmarkCircleOutline className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer text-[#E50000]"
                      aria-label={`Cancel ${booking.clientName} booking`}
                      onClick={() => onCancel?.(booking)}
                    >
                      <MdCancel className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
