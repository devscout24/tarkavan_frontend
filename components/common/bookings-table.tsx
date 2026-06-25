"use client"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { TClubBookingData } from "@/types"
import moment from "moment"
import Image, { StaticImageData } from "next/image"
import { FiEye } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiDotsThreeOutline } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { ChangeBookingStatus } from "@/app/(dashboards)/club/bookings/action"
import { toast } from "sonner"
import { AiOutlineUser } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu"

type BookingsTableProps = {
  bookings: TClubBookingData[]
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter()

  const handleViewDetails = (profile_id: number) => {
    router.push(`/profile/player/${profile_id}`)
  }

  const handleStatusChange = async (booking_id: number, new_status: string) => {
    try {
      const res = await ChangeBookingStatus({ booking_id, status: new_status }) 
      if (res && "data" in res && res.data?.status === true) {
        toast.success(res.data.message || "Booking status updated successfully")
        window.dispatchEvent(new Event("bookingChanged"))
      } else {
        toast.error(res?.message || "Failed to update booking status")
      }
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast.error("Failed to update booking status")
    }
  }

  return (
    <> 
      <div className="  w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-secondary/40 [scrollbar-color:rgba(198,245,122,0.75)_transparent] [scrollbar-width:thin] lg:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/75 [&::-webkit-scrollbar-track]:bg-transparent">
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
            {bookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="border-b border-white/15 bg-transparent hover:bg-transparent"
              >
                <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <div className="flex min-w-0 items-center gap-2 xl:gap-3">
                    <Image
                      src={
                        booking?.athlete?.profile_image?.startsWith("http") ? encodeURI(booking?.athlete?.profile_image) : booking?.athlete?.image?.startsWith("http") ? encodeURI(booking?.athlete?.image) : "/images/bannerbg.png"
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
                  {moment(booking.booking_date).format("MMM Do YY")}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5 capitalize   ">
                  {booking.status}
                </TableCell>
                <TableCell className="h-16 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <div className="flex items-center justify-center gap-4"> 
                    <LuUserRound
                      onClick={() =>
                        handleViewDetails(booking.athlete_profile_id)
                      }
                      className="transition-color cursor-pointer text-2xl duration-300 hover:text-brand!"
                    />
                    {/* <FiEye
                      className="transition-color cursor-pointer text-2xl duration-300 hover:text-brand!"
                    /> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <PiDotsThreeOutline />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(booking.id, "pending")
                            }
                            className="cursor-pointer hover:bg-brand!"
                          >
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(booking.id, "confirmed")
                            }
                            className="cursor-pointer hover:bg-brand!"
                          >
                            Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(booking.id, "cancelled")
                            }
                            className="cursor-pointer hover:bg-brand!"
                          >
                            Cancelled
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(booking.id, "completed")
                            }
                            className="cursor-pointer hover:bg-brand!"
                          >
                            Completed
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
