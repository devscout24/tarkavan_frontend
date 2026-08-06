"use client"

import type { ParentPaymentItem } from "@/components/parentAndCoachApi/type/parent-payments"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo, useState } from "react"
import moment from "moment"
import CommonBtn from "./common-btn"
import { ImDownload } from "react-icons/im"
import { getPaymentExport } from "@/app/(dashboards)/common-pages/paument-page/action"
import { motion } from "framer-motion"
import { SkeletonBoundary } from "@shakhawat.dev/skeleton"

interface PaymentTableProps {
  payments?: ParentPaymentItem[]
  loading: boolean
}

 

 

export default function PaymentTable({
  payments = [],
  loading,
}: PaymentTableProps) {
  const selectItemClassName: string =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary   py-2! px-4! rounded-0! "
  const columnBorderClass = "border-r border-white/15 last:border-r-0"
  const [statusFilter, setStatusFilter] = useState("all")
  const filteredPayments = useMemo(() => {
    if (statusFilter === "all") {
      return payments
    }

    return payments.filter(
      (payment) => payment.payment_status === statusFilter
    )
  }, [payments, statusFilter])
 

  const handleExport = async (booking_id: string) => {
    try {
      const res = await getPaymentExport(booking_id)
      const resAny = res as any
      if (
        res &&
        "success" in res &&
        res.success &&
        "data" in resAny &&
        resAny.data
      ) {
        let blob: Blob
        if (typeof resAny.data === "string") {
          const contentType = resAny.contentType || "application/pdf"
          const binary = atob(resAny.data)
          const len = binary.length
          const bytes = new Uint8Array(len)
          for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i)
          }
          blob = new Blob([bytes], { type: contentType })
        } else {
          blob = new Blob([resAny.data], { type: "application/pdf" })
        }
        const url = URL.createObjectURL(blob)
        const fileName = `earnings-export-${new Date().toISOString().split("T")[0]}.pdf`
        const link = document.createElement("a")
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error("Export failed:", err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-1 mt-6 text-white"
    > 
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between gap-4"
      >
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-32 w-32 rounded-full border-white/20 bg-transparent px-3 text-white hover:bg-white/10">
            <SelectValue placeholder={"All Status"} />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="border-white/10 bg-secondary text-white!"
          >
            <SelectItem className={selectItemClassName} value={"all"}>
              {"All"}
            </SelectItem>
            <SelectItem className={selectItemClassName} value={"paid"}>
              {"Paid"}
            </SelectItem>
            <SelectItem className={selectItemClassName} value={"pending"}>
              {"Pending"}
            </SelectItem>
            <SelectItem className={selectItemClassName} value={"refunded"}>
              {"Refunded"}
            </SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
 
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-brand hover:bg-brand">
              <TableHead
                className={`sticky left-0 z-10 bg-brand ${columnBorderClass} text-primary!`}
              >
                Program Name
              </TableHead>
              <TableHead className={"text-primary!"}>Child</TableHead>
              <TableHead className={"text-primary!"}>Amount</TableHead>
              <TableHead className={"text-primary!"}>HST</TableHead>
              <TableHead className={"text-primary!"}>Discount</TableHead>
              <TableHead className={"text-primary!"}>Total</TableHead>
              <TableHead className={"text-primary!"}>Book Date</TableHead>
              <TableHead className={"text-primary!"}>Program Date</TableHead>
              <TableHead className={"text-primary!"}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <SkeletonBoundary loading={loading}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow
                    key={i}
                    className="border-t border-white/20 hover:bg-transparent"
                  >
                    <TableCell
                      className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                    >
                      {""}
                    </TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell className={columnBorderClass}>{""}</TableCell>
                    <TableCell
                      className={`${columnBorderClass} flex items-center justify-between`}
                    >
                      {""}
                    </TableCell>
                  </TableRow>
                ))}
              </SkeletonBoundary>
            ) : filteredPayments.length > 0 ? (
              filteredPayments.map((p, i) => (
                <TableRow
                  key={i}
                  className="border-t border-white/20 hover:bg-transparent"
                >
                  <TableCell
                    className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                  >
                    {p.program_name ?? p.programName ?? "--"}
                  </TableCell>
                  <TableCell className={columnBorderClass}> 
                    {p.childName ?? p.child_name?? p.child as string}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {p.amount_display as string}
                  </TableCell> 
                  <TableCell className={columnBorderClass}>
                    {p.hst_display as string}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {p.discount_display as string}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {p.total_display as string}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {moment(p.date ?? p.payment_date).format(
                      "MMM Do YYYY"
                    )}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {moment(p.program_start_date).format("MMM Do YYYY")}
                  </TableCell>
                  <TableCell
                    className={`${columnBorderClass} flex items-center justify-between`}
                  > 
                    {p.payment_status}
                    <CommonBtn
                      variant="outline"
                      size="sm"
                      icon={<ImDownload />}
                      onClick={() => handleExport(String(p.id))}
                      className="ml-2 cursor-pointer border-0! bg-transparent! text-brand hover:bg-transparent hover:text-brand!"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-t border-white/20 hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-white/60"
                >
                  No payment history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  )
}
