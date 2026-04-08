"use client"

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
import alexThompsonImage from "@/public/images/alex_thompson.png"
import emilyDavisImage from "@/public/images/emily_davis.png"
import michaelRossImage from "@/public/images/michael_ross.png"

const stats = [
  { icon: <ActiveProgramsIcon />, title: "Active Programs", text: "05" },
  { icon: <NetEarningsIcon />, title: "Total Earnings", text: "$360.00" },
  { icon: <NetEarningsIcon />, title: "Net Earnings (Month)", text: "$360.00" },
  {
    icon: <PlatformFeeIcon />,
    title: "10% Platform Fee (Month)",
    text: "$60.00",
  },
]

const earnings: EarningsRow[] = [
  {
    id: "1",
    clientName: "Alex Thompson",
    programName: "Elite 1-on-1",
    date: "Dec 15, 2024",
    amount: "$299.00",
    hst: "$38.87",
    discount: "-$25.00",
    total: "$202.27",
    avatar: alexThompsonImage,
  },
  {
    id: "2",
    clientName: "Michael Ross",
    programName: "Strategy Call",
    date: "Dec 20, 2024",
    amount: "$249.00",
    hst: "$32.37",
    discount: "-",
    total: "$256.37",
    avatar: michaelRossImage,
  },
  {
    id: "3",
    clientName: "Emily Davis",
    programName: "Workshop Session",
    date: "Dec 22, 2024",
    amount: "$199.00",
    hst: "$25.87",
    discount: "-$10.00",
    total: "$101.87",
    avatar: emilyDavisImage,
  },
]

export default function EarningsPage() {
  return (
    <section className="max-w-full text-white">
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

      <div className="space-y-5 xl:space-y-6">
        <EarningsTable earnings={earnings} />
        <EarningsGrowthChart />
      </div>
    </section>
  )
}
