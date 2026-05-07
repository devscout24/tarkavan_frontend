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
import { Button } from "@/components/ui/button"
import Export from "@/components/common/export"

interface EarningsData {
  applied_filter: string
  summary: {
    active_programs: number
    total_earnings: number
    net_earnings: number
    platform_fee: number
    net_earnings_month: number
    platform_fee_month: number
  }
  earnings: EarningsRow[]
  monthly_growth: {
    labels: string[]
    values: number[]
  }
}

export default function EarningsPage() {
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("month")

  const fetchEarnings = async (filterValue: string) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('go_elite_token') || sessionStorage.getItem('go_elite_token')
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coach/earnings/view?filter=${filterValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Earnings API Response:", result)

      if (result.status && result.data) {
        setEarningsData(result.data)
      } else {
        console.warn("Invalid response structure:", result)
      }
    } catch (error) {
      console.error("Error fetching earnings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEarnings(filter)
  }, [filter])

  const stats = [
    { 
      icon: <ActiveProgramsIcon />, 
      title: "Active Programs", 
      text: earningsData ? earningsData.summary.active_programs.toString() : "--" 
    },
    { 
      icon: <NetEarningsIcon />, 
      title: "Total Earnings", 
      text: earningsData ? `$${earningsData.summary.total_earnings.toFixed(2)}` : "$--.--"
    },
    { 
      icon: <NetEarningsIcon />, 
      title: filter === "year" ? "Net Earnings (Year)" : "Net Earnings (Month)", 
      text: earningsData 
        ? filter === "year" 
          ? `$${earningsData.summary.net_earnings.toFixed(2)}`
          : `$${earningsData.summary.net_earnings_month.toFixed(2)}`
        : "$--.--"
    },
    {
      icon: <PlatformFeeIcon />,
      title: filter === "year" ? "10% Platform Fee (Year)" : "10% Platform Fee (Month)",
      text: earningsData
        ? filter === "year"
          ? `$${earningsData.summary.platform_fee.toFixed(2)}`
          : `$${earningsData.summary.platform_fee_month.toFixed(2)}`
        : "$--.--",
    },
  ]

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Earnings</h2>
        <Export onExport={() => console.log("Export earnings data")} />
       
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
}
