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
import Export from "./export"

interface PaymentTableProps {
  payments?: ParentPaymentItem[]
}

const formatCurrency = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "$0.00"
  }

  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.-]+/g, ""))

  if (Number.isNaN(numericValue)) {
    return String(value)
  }

  return `$${numericValue.toFixed(2)}`
}

const formatDate = (value: unknown) => {
  if (!value) {
    return "--"
  }

  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toISOString().split("T")[0]
}

const getPaymentStatus = (payment: ParentPaymentItem) =>
  String(payment.status ?? payment.payment_status ?? "unknown").toLowerCase()

const getProgramName = (payment: ParentPaymentItem) =>
  String(payment.program_name ?? payment.programName ?? "--")

const getChildName = (payment: ParentPaymentItem) =>
  String(payment.child_name ?? payment.childName ?? payment.player_name ?? "--")

export default function PaymentTable({ payments = [] }: PaymentTableProps) {
  const selectItemClassName: string =
    "text-white data-[highlighted]:bg-brand data-[highlighted]:text-primary focus:bg-brand focus:text-primary   py-2! px-4! rounded-0! "
  const columnBorderClass = "border-r border-white/15 last:border-r-0"
  const [statusFilter, setStatusFilter] = useState("all")
  const filteredPayments = useMemo(() => {
    if (statusFilter === "all") {
      return payments
    }

    return payments.filter((payment) => getPaymentStatus(payment) === statusFilter)
  }, [payments, statusFilter])

  return (
    <div className="mx-1 mt-6 text-white">
      <div className="flex items-center justify-between gap-4">
        {/* Status Dropdown on Left */}
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

        {/* Export Component on Right */}
        <Export
          onExport={() => console.log("Export clicked")}
          className="flex-shrink-0"
        />
      </div>

      <div className="mx-auto mt-4 max-w-[95vw] [&>div]:rounded-lg [&>div]:border">
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
              <TableHead className={"text-primary!"}>Date</TableHead>
              <TableHead className={"text-primary!"}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <TableRow
                  key={String(payment.id ?? `${getProgramName(payment)}-${index}`)}
                  className="border-t border-white/20 hover:bg-transparent"
                >
                  <TableCell
                    className={`sticky left-0 bg-background font-medium ${columnBorderClass}`}
                  >
                    {getProgramName(payment)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {getChildName(payment)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {formatCurrency(payment.hst)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {formatCurrency(payment.discount)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {formatCurrency(payment.total ?? payment.total_amount)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {formatDate(payment.date ?? payment.payment_date)}
                  </TableCell>
                  <TableCell className={columnBorderClass}>
                    {getPaymentStatus(payment)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-t border-white/20 hover:bg-transparent">
                <TableCell colSpan={8} className="py-8 text-center text-white/60">
                  No payment history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
