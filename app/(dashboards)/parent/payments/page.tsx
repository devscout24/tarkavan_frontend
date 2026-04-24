"use client"

import StatCard from "@/components/common/stat-card"
import {
  fetchParentPayments,
  type ParentPaymentItem,
  type PaymentSummary,
} from "@/components/parentAndCoachApi"
import { useEffect, useState } from "react"
import { FaRegCreditCard } from "react-icons/fa"
import { MdOutlinePending } from "react-icons/md"
import { CiWallet } from "react-icons/ci"
import PaymentTable from "../../../../components/common/payment-table"
import { RotateCcw } from "lucide-react"

export default function PaymentPage() {
  const [summary, setSummary] = useState<PaymentSummary>({
    total_paid: 0,
    pending_payments: 0,
    refunded_payments: 0,
    total_transactions: 0,
  })
  const [payments, setPayments] = useState<ParentPaymentItem[]>([])

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetchParentPayments()

        if (response.status) {
          setSummary(response.data.summary)
          setPayments(response.data.payments)
        }
      } catch (error) {
        console.error("Failed to load parent payments:", error)
      }
    }

    loadPayments()
  }, [])

  const paymentStats = [
    {
      icon: <FaRegCreditCard className="h-5 w-5" />,
      title: "Total Paid",
      value: `$${Number(summary.total_paid || 0).toFixed(2)}`,
    },
    {
      icon: <MdOutlinePending className="h-5 w-5" />,
      title: "Pending Payments",
      value: `$${Number(summary.pending_payments || 0).toFixed(2)}`,
    },
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: "Refunded Payments",
      value: `$${Number(summary.refunded_payments || 0).toFixed(2)}`,
    },
    {
      icon: <CiWallet className="h-5 w-5" />,
      title: "Total Transactions",
      value: String(summary.total_transactions || 0).padStart(2, "0"),
    },
  ]

  return (
    <section>
      {/* stats */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paymentStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            text={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* payment table */}
      <PaymentTable payments={payments} />
    </section>
  )
}
