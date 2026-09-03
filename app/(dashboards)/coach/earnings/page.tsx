"use client"

import { useEffect, useState } from "react"
import EarningsGrowthChart from "@/components/common/earnings-growth-chart"
import EarningsTable, {
  type EarningsRow,
} from "@/components/common/earnings-table"
import StatCard from "@/components/common/stat-card"
import {
  ActiveProgramsIcon,
  NetEarningsIcon,
  PlatformFeeIcon,
} from "@/components/custom/coach-dashboard-icons"
import Export from "@/components/common/export"
import { useAppSelector } from "@/lib/hooks"
import { selectIsSubscriptionActive } from "@/lib/features/userSlice"
import ClubDashboardSubscription from "@/components/custom/club-dashboard-subscription"

interface EarningsData {
  applied_filter: string
  summary: {
    active_programs: number
    total_earnings: number
    net_earnings: number
    platform_fee: number
    net_earnings_month: number
    platform_fee_month: number
    platformFee_coach: number
    platformFee_club: number
  }
  earnings: EarningsRow[]
  monthly_growth: {
    labels: string[]
    values: number[]
  }
}

export default function EarningsPage() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null)
  const [filter, setFilter] = useState("month")
  const [exporting, setExporting] = useState(false)
  const [isUbscriber, setIsSubscriber] = useState(false)
  useEffect(() => {
    const user = localStorage.getItem("go_elite_user")
      ? JSON.parse(localStorage.getItem("go_elite_user") || "{}")
      : null

    if (user) {
      setIsSubscriber(user.is_subscription_active)
    }
  }, [])

  const handleExport = async () => {
    try {
      setExporting(true)
      const token =
        localStorage.getItem("go_elite_token") ||
        sessionStorage.getItem("go_elite_token")

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/coach/earnings/export`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept:
              "application/pdf, application/csv, application/vnd.ms-excel, */*",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get the blob from the response
      const blob = await response.blob()

      // Determine file extension from content type
      const contentType = response.headers.get("content-type") || ""
      let fileExtension = "pdf" // Default to PDF

      if (contentType.includes("csv")) {
        fileExtension = "csv"
      } else if (
        contentType.includes("excel") ||
        contentType.includes("spreadsheet")
      ) {
        fileExtension = "xlsx"
      } else if (contentType.includes("pdf")) {
        fileExtension = "pdf"
      }

      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url

      // Generate filename with current date and correct extension
      const currentDate = new Date().toISOString().split("T")[0]
      a.download = `earnings_export_${currentDate}.${fileExtension}`

      // Trigger download
      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting earnings data:", error)
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token =
          localStorage.getItem("go_elite_token") ||
          sessionStorage.getItem("go_elite_token")

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/coach/earnings/view?filter=${filter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.status && result.data) {
          setEarningsData(result.data)
        } else {
          console.warn("Invalid response structure:", result)
        }
      } catch (error) {
        console.error("Error fetching earnings:", error)
      }
    }

    fetchEarnings()
  }, [filter])

  const stats = [
    {
      icon: <ActiveProgramsIcon />,
      title: "Active Programs",
      text: earningsData
        ? earningsData.summary.active_programs.toString()
        : "--",
    },
    {
      icon: <NetEarningsIcon />,
      title: "Total Earnings",
      text: earningsData
        ? `$${earningsData.summary.total_earnings.toFixed(2)}`
        : "$--.--",
    },
    {
      icon: <NetEarningsIcon />,
      title: "Net Earnings",
      text: earningsData
        ? filter === "year"
          ? `$${earningsData.summary.net_earnings.toFixed(2)}`
          : `$${earningsData.summary.net_earnings_month.toFixed(2)}`
        : "$--.--",
    },
    {
      icon: <PlatformFeeIcon />,
      title: `${earningsData?.summary?.platformFee_coach}% Platform Fee`,
      text: "",
    },
  ]

  if (isUbscriber) {
    return (
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Earnings</h2>
          <Export onExport={handleExport} loading={exporting} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              text={stat.text}
            />
          ))}
        </div>

        <div className="max-w-[95dvw] space-y-5 self-center xl:space-y-6">
          <EarningsTable earnings={earningsData?.earnings || []} />
          <EarningsGrowthChart
            labels={earningsData?.monthly_growth?.labels || []}
            values={earningsData?.monthly_growth?.values || []}
            currentFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
      </section>
    )
  } else {
    return (
      <ClubDashboardSubscription
        text={"May be you are not logged in or not authenticated subscription."}
        link="/coach/subscription"
        btnText="Get Subscription"
      />
    )
  }
}
