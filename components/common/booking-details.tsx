import { motion, type Variants } from "framer-motion" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogClose,
  DialogContent, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TClubBookingData } from "@/types"
import moment from "moment"
import Link from "next/link"
import { ChangeBookingStatus } from "@/app/(dashboards)/club/bookings/action"
import { toast } from "sonner" 

 

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

 
function SectionLabel({
  index,
  children,
}: {
  index: string
  children: React.ReactNode
}) {
  return (
    <motion.div variants={rise} className="mb-3 flex items-baseline gap-2">
      <span className="text-[10px] text-secondary">{index}</span>
      <h2 className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
        {children}
      </h2>
      <span className="ml-2 h-px flex-1 bg-gray-200" />
    </motion.div>
  )
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: React.ReactNode
  emphasis?: boolean
}) {
  return (
    <motion.div
      variants={rise}
      className="flex flex-col gap-0.5 border-b border-gray-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <span className="text-xs text-secondary">{label}</span>
      <span
        className={
          emphasis
            ? "text-sm font-semibold text-gray-900 sm:text-base"
            : "text-sm font-medium text-gray-900"
        }
      >
        {value}
      </span>
    </motion.div>
  )
}

function StatusPill({ label, solid }: { label: string; solid: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase ${
        solid
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-300 bg-white text-gray-600"
      }`}
    >
      {label}
    </span>
  )
}

export function BookingDetails({ data }: { data: TClubBookingData }) {
  const program = data?.program
  const bookingTime = data?.booking_time
 
  const sessionTimeLabel =
    bookingTime?.time ??
    (bookingTime?.start_time && bookingTime?.end_time
      ? `${bookingTime.start_time} – ${bookingTime.end_time}`
      : "—")

  const isPaid = (data?.payment_status ?? "").toLowerCase() === "paid" 

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

  console.log("BookingDetails data", data)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer rounded-lg bg-brand px-5 py-2 text-primary">
          View Details
        </div>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden bg-white p-0 text-gray-900 sm:max-w-200">
        <style>{`
          .font-display{ font-family:'Fraunces', serif; font-optical-sizing:auto; } 
          .no-scrollbar::-webkit-scrollbar{ display:none; }
        `}</style>

        {/* header */}
        <DialogHeader className="border-b border-gray-200 bg-white px-5 py-4 sm:px-8 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <DialogTitle className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
                Booking #{String(data?.id ?? 0).padStart(6, "0")}
                <motion.div
                  variants={rise}
                  className="flex flex-wrap items-center justify-between gap-2 text-base font-normal text-secondary"
                >
                  <span>
                    Created :{" "}
                    {data?.created_at
                      ? moment(data.created_at).format("LLLL")
                      : "—"}
                  </span>
                </motion.div>
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="no-scrollbar max-h-[72vh] overflow-y-auto bg-white">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-8 bg-white px-5 py-6 text-gray-900 sm:px-8 sm:py-8"
          >
            {/* identity block */}
            <motion.div variants={rise} className=" ">
              <div className="relative h-50 w-full shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                {program?.program_photo && (
                  <img
                    src={program.program_photo}
                    alt={program?.program_name ?? "Program"}
                    className="h-full w-full object-cover"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 10%, rgba(255,255,255,.6) 50%, rgba(255,255,255,.2) 90%, rgba(255,255,255,0) 100%)",
                  }}
                />
                <div className="absolute bottom-2 left-5 z-2 w-full min-w-0">
                  <p className="mb-1 font-semibold! tracking-[0.18em] text-primary! uppercase">
                    {program?.program_name ?? "—"} · {program?.sport ?? "—"}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-secondary!">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 shrink-0 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span className="truncate">
                      {program?.program_location ?? "Location unavailable"}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 01 — program */}
            <section>
              <SectionLabel index="01">Program</SectionLabel>
              <Row
                label="Program window"
                value={`${moment(program?.program_start).format("ll")} — ${moment(program?.program_end).format("ll")}`}
              />

              <Row
                label="Up to age"
                value={
                  program?.upto_age != null ? `${program.upto_age} yrs` : "—"
                }
              />
              <Row
                label="Type"
                value={
                  <span className="capitalize">
                    {program?.program_type ?? "—"}
                  </span>
                }
              />
            </section>

            {/* 02 — session */}
            <section>
              <SectionLabel index="02">Session</SectionLabel>
              <motion.div
                variants={rise}
                className="flex items-center gap-5 rounded-xl border border-gray-900 px-5 py-4"
              >
                <div className="shrink-0 text-center leading-none">
                  <p className="text-[10px] text-secondary!">
                    {moment(data?.booking_time?.booking_date).format("LL")}
                  </p>
                </div>
                <div className="w-px self-stretch bg-gray-200" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-secondary!"> 
                    {moment(data?.booking_time?.booking_date).format('dddd')}
                  </p>
                  <p className="mt-1 text-xs text-secondary!">
                    {sessionTimeLabel}
                  </p>
                </div>
                {bookingTime?.is_available === false && (
                  <span className="ml-auto shrink-0">
                    <StatusPill label="Unavailable" solid={false} />
                  </span>
                )}
              </motion.div>
            </section>

            {/* 03 — people */}
            <section>
              <SectionLabel index="03">Athlet</SectionLabel>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs! text-secondary!">
                    {data?.athlete?.name} {data?.athlete?.last_name}
                  </p>

                  <div className="">
                    {/* <Button className="mr-2 cursor-pointer bg-secondary/10! text-primary! hover:bg-accent">
                      Message
                    </Button> */}
                    <Link
                      href={`/profile/player/${data?.athlete_profile_id}`}
                      className="rounded-md bg-brand px-5 py-2 text-primary hover:bg-brand"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs! text-secondary!">Mail address</p>
                  {data?.athlete?.email ? (
                    <a
                      href={`mailto:${data?.athlete?.email ?? ""}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {data?.athlete?.email}
                    </a>
                  ) : (
                    <span className="text-gray-500">Email unavailable</span>
                  )}
                </div>
              </div>
            </section>

            {/* 04 — payment */}
            <section>
              <SectionLabel index="04">Payment</SectionLabel>
              <Row label="Amount" value={`$${data?.amount}`} />
              <Row label="Tax" value={`${data?.tax}%`} />
              <motion.div
                variants={rise}
                className="mt-1 flex items-center justify-between border-t border-gray-900 pt-4"
              >
                <span className="text-[11px] font-semibold tracking-[0.15em] text-gray-900 uppercase">
                  Total
                </span>
                <span className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  $
                  {data?.tax && data?.amount
                    ? (
                        parseFloat(data.amount) +
                        (parseFloat(data.amount) * parseFloat(data.tax)) / 100
                      ).toFixed(2)
                    : "0.00"}
                  <span className="ml-1.5 text-xs font-normal text-gray-400 uppercase">
                    {data?.currency ?? ""}
                  </span>
                </span>
              </motion.div>
              <motion.div
                variants={rise}
                className="mt-4 flex items-center gap-2"
              >
                <StatusPill
                  label={data?.payment_status ?? "—"}
                  solid={isPaid}
                />
                <StatusPill
                  label={`Payout: ${data?.payout_status ?? "—"}`}
                  solid={false}
                />
              </motion.div>
            </section>
          </motion.div>
        </div>

        <DialogFooter className="border-t border-gray-200 bg-white px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3 pb-3">
            <DialogClose asChild>
              <div className="rounded-lg bg-secondary/5 px-5 py-1.75 cursor-pointer ">
                Close
              </div> 
            </DialogClose>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-md bg-brand! px-5 py-1.5 text-primary">
                  More Actions
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(data.id, "pending")}
                    className="cursor-pointer hover:bg-brand!"
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(data.id, "confirmed")}
                    className="cursor-pointer hover:bg-brand!"
                  >
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(data.id, "cancelled")}
                    className="cursor-pointer hover:bg-brand!"
                  >
                    Cancelled
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(data.id, "completed")}
                    className="cursor-pointer hover:bg-brand!"
                  >
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
