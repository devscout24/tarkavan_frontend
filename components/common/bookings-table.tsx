"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TClubBookingData } from "@/types"
import { SkeletonBoundary } from "@shakhawat.dev/skeleton"
import { motion, type Variants } from "framer-motion"
import moment from "moment"
import Image from "next/image"
import { BookingDetails } from "./booking-details"

type BookingsTableProps = {
  bookings: TClubBookingData[]
  loading: boolean
}

const tableVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const MotionTableBody = motion.create(TableBody)
const MotionTableRow = motion.create(TableRow)

export default function BookingsTable({
  bookings,
  loading,
}: BookingsTableProps) {
  return (
    <>
      <SkeletonBoundary loading={loading}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-secondary/40 [scrollbar-color:rgba(198,245,122,0.75)_transparent] [scrollbar-width:thin] lg:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/75 [&::-webkit-scrollbar-track]:bg-transparent"
        >
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
                  Booking Date
                </TableHead>

                <TableHead className="h-10 w-[14%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                  Program Date
                </TableHead>

                <TableHead className="h-10 w-[13%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                  Status
                </TableHead>

                <TableHead className="h-10 w-[12%] px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <MotionTableBody
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              {bookings.map((booking) => (
                <MotionTableRow
                  key={booking.id}
                  variants={rowVariants}
                  layout
                  className="border-b border-white/15 bg-transparent hover:bg-transparent"
                >
                  <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                    <div className="flex min-w-0 items-center gap-2 xl:gap-3">
                      <Image
                        src={
                          booking?.athlete?.profile_image ||
                          `https://admin.goelitesport.com/${booking?.athlete?.image}`
                        }
                        alt={booking.athlete.name}
                        width={40}
                        height={40}
                        className="h-8 w-8 rounded-full object-cover xl:h-9 xl:w-9 2xl:h-10 2xl:w-10"
                      />

                      <p className="truncate text-sm leading-[150%] font-normal text-white xl:text-base">
                        {booking.athlete.name}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                    {booking.program.program_name}
                  </TableCell>

                  <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                    {booking.amount}
                  </TableCell>

                  <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                    {moment(booking.created_at).format("MMM Do YYYY")}
                  </TableCell>

                  <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                    {moment(booking.booking_date).format("MMM Do YYYY")}
                  </TableCell>

                  <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal capitalize xl:px-4 2xl:h-19 2xl:px-5">
                    {booking.status}
                  </TableCell>

                  <TableCell className="h-16 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                    <BookingDetails data={booking} />
                  </TableCell>
                </MotionTableRow>
              ))}
            </MotionTableBody>
          </Table>
        </motion.div>
      </SkeletonBoundary> 
    </>
  )
}