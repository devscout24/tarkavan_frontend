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
import Image, { StaticImageData } from "next/image"

export type EarningsRow = {
  id: string
  clientName: string
  programName: string
  date: string
  amount: string
  hst: string
  discount: string
  total: string
  avatar: StaticImageData
}

type EarningsTableProps = {
  earnings: EarningsRow[]
}

export default function EarningsTable({ earnings }: EarningsTableProps) {
  return (
    <>
      <div className="space-y-3 lg:hidden">
        {earnings.map((earning) => (
          <article
            key={earning.id}
            className="rounded-xl border border-secondary/40 bg-primary/30 p-3.5 sm:p-4"
          >
            <div className="flex items-center gap-3">
              <Image
                src={earning.avatar}
                alt={earning.clientName}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-white">
                  {earning.clientName}
                </p>
                <p className="truncate text-sm text-white/70">
                  {earning.programName}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:gap-3">
              <div>
                <p className="text-white/50">Date</p>
                <p className="text-white">{earning.date}</p>
              </div>
              <div>
                <p className="text-white/50">Amount</p>
                <p className="text-white">{earning.amount}</p>
              </div>
              <div>
                <p className="text-white/50">HST</p>
                <p className="text-white">{earning.hst}</p>
              </div>
              <div>
                <p className="text-white/50">Discount</p>
                <p className="text-white">{earning.discount}</p>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-brand/40 bg-brand/10 p-3">
              <p className="text-xs text-white/70">Total</p>
              <p className="text-base font-semibold text-brand">
                {earning.total}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-secondary/40 [scrollbar-color:rgba(198,245,122,0.75)_transparent] [scrollbar-width:thin] lg:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/75 [&::-webkit-scrollbar-track]:bg-transparent">
        <Table className="w-full min-w-full table-fixed">
          <TableHeader>
            <TableRow className="bg-[#ECEEEA] hover:bg-[#ECEEEA]">
              <TableHead className="h-10 w-[22%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Client Name
              </TableHead>
              <TableHead className="h-10 w-[13%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Program Name
              </TableHead>
              <TableHead className="h-10 w-[13%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Date
              </TableHead>
              <TableHead className="h-10 w-[12%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Amount
              </TableHead>
              <TableHead className="h-10 w-[10%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                HST
              </TableHead>
              <TableHead className="h-10 w-[12%] border-r border-black/20 px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Discount
              </TableHead>
              <TableHead className="h-10 w-[12%] px-3 text-xs font-medium whitespace-normal text-black xl:px-4 xl:text-sm 2xl:h-11 2xl:px-5">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {earnings.map((earning) => (
              <TableRow
                key={earning.id}
                className="border-b border-white/15 bg-transparent hover:bg-transparent"
              >
                <TableCell className="h-16 border-r border-white/15 px-3 whitespace-normal xl:px-4 2xl:h-19 2xl:px-5">
                  <div className="flex min-w-0 items-center gap-2 xl:gap-3">
                    <Image
                      src={earning.avatar}
                      alt={earning.clientName}
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-cover xl:h-9 xl:w-9 2xl:h-10 2xl:w-10"
                    />
                    <p className="truncate text-sm leading-[150%] font-normal text-white xl:text-base">
                      {earning.clientName}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {earning.programName}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {earning.date}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {earning.amount}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {earning.hst}
                </TableCell>
                <TableCell className="h-16 border-r border-white/15 px-3 text-sm leading-[150%] font-normal whitespace-normal text-white xl:px-4 xl:text-base 2xl:h-19 2xl:px-5">
                  {earning.discount}
                </TableCell>
                <TableCell
                  className={cn(
                    "h-16 px-3 text-sm leading-[150%] font-medium whitespace-normal text-brand xl:px-4 xl:text-base 2xl:h-19 2xl:px-5"
                  )}
                >
                  {earning.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
