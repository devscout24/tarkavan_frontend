"use client"

import EarningsPeriodFilter, {
  type EarningsChartFilter,
} from "@/components/common/earnings-period-filter"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMemo, useState } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartDataset,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

type SeriesData = {
  labels: string[]
  values: number[]
  accentIndex: number
  helperDots: number[]
}

function getChartConfig(): Record<EarningsChartFilter, SeriesData> {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentWeek = Math.min(4, Math.max(0, Math.ceil(now.getDate() / 7) - 1))

  return {
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Current Week"],
      values: [480, 610, 690, 650, 780],
      accentIndex: currentWeek,
      helperDots: [120, 105, 135, 110, 150],
    },
    "6-month": {
      labels: [
        "Jan-Feb",
        "Mar-Apr",
        "May-Jun",
        "Jul-Aug",
        "Sep-Oct",
        "Nov-Dec",
      ],
      values: [510, 730, 750, 620, 610, 950],
      accentIndex: Math.floor(currentMonth / 2),
      helperDots: [140, 220, 220, 180, 300, 150],
    },
    "1-year": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      values: [430, 500, 580, 760, 710, 680, 620, 600, 650, 730, 820, 920],
      accentIndex: currentMonth,
      helperDots: [90, 120, 145, 155, 180, 165, 150, 140, 180, 220, 250, 280],
    },
  }
}

const Y_MAX = 1200
const Y_STEP = 300

export default function EarningsGrowthChart() {
  const [filter, setFilter] = useState<EarningsChartFilter>("month")
  const isMobile = useIsMobile()

  const chartConfig = useMemo(() => getChartConfig(), [])
  const data = chartConfig[filter]

  const chartData = useMemo<ChartData<"line">>(() => {
    const basePointSize = isMobile ? 2.2 : 3
    const revenuePointSize = isMobile ? 3.5 : 5

    const helperDataset: ChartDataset<"line", number[]> = {
      label: "Helper dots",
      data: data.helperDots,
      showLine: false,
      pointRadius: basePointSize,
      pointHoverRadius: basePointSize,
      pointBackgroundColor: "rgba(165,191,225,0.75)",
      pointBorderWidth: 0,
      order: 1,
    }

    const baselineDataset: ChartDataset<"line", number[]> = {
      label: "Baseline dots",
      data: data.helperDots.map(() => 28),
      showLine: false,
      pointRadius: basePointSize,
      pointHoverRadius: basePointSize,
      pointBackgroundColor: "rgba(182,208,245,0.9)",
      pointBorderWidth: 0,
      order: 1,
    }

    const revenueDataset: ChartDataset<"line", number[]> = {
      label: "Revenue",
      data: data.values,
      borderColor: "#C6F57A",
      borderWidth: 2,
      tension: 0.42,
      cubicInterpolationMode: "monotone",
      pointBackgroundColor: "#BFEF73",
      pointBorderColor: "#E9F6D4",
      pointBorderWidth: 1.2,
      pointRadius: revenuePointSize,
      pointHoverRadius: revenuePointSize + 1,
      pointHoverBorderWidth: 1.5,
      fill: false,
      order: 3,
    }

    return {
      labels: data.labels,
      datasets: [baselineDataset, helperDataset, revenueDataset],
    }
  }, [data, isMobile])

  const chartOptions = useMemo<ChartOptions<"line">>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          displayColors: false,
          backgroundColor: "rgba(8, 11, 20, 0.95)",
          borderColor: "rgba(198, 245, 122, 0.4)",
          borderWidth: 1,
          titleColor: "#ffffff",
          bodyColor: "#C6F57A",
          titleFont: {
            size: isMobile ? 11 : 12,
            weight: 600,
          },
          bodyFont: {
            size: isMobile ? 12 : 13,
            weight: 600,
          },
          padding: 10,
          callbacks: {
            title: (items) => items[0]?.label ?? "",
            label: (context) => {
              if (context.datasetIndex !== 2) {
                return ""
              }

              return `Revenue: $${Number(context.parsed.y).toFixed(2)}`
            },
          },
          filter: (tooltipItem) => tooltipItem.datasetIndex === 2,
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            color: "rgba(255,255,255,0.22)",
            lineWidth: 1,
            drawTicks: false,
            drawBorder: false,
          },
          border: {
            color: "rgba(255,255,255,0.22)",
          },
          ticks: {
            color: (ctx) => {
              const tickIndex = Number(ctx.tick.value)
              return tickIndex === data.accentIndex
                ? "#C6F57A"
                : "rgba(255,255,255,0.34)"
            },
            font: (ctx) => {
              const tickIndex = Number(ctx.tick.value)
              return {
                size: isMobile ? 10 : 14,
                weight: tickIndex === data.accentIndex ? 600 : 500,
              }
            },
            autoSkip: true,
            maxTicksLimit:
              filter === "1-year"
                ? isMobile
                  ? 4
                  : 12
                : filter === "6-month"
                  ? isMobile
                    ? 4
                    : data.labels.length
                  : isMobile
                    ? 3
                    : data.labels.length,
            maxRotation: 0,
            minRotation: 0,
            padding: isMobile ? 6 : 12,
          },
        },
        y: {
          type: "linear",
          min: 0,
          max: Y_MAX,
          ticks: {
            stepSize: Y_STEP,
            color: "rgba(255,255,255,0.34)",
            font: {
              size: isMobile ? 10 : 14,
              weight: 500,
            },
            padding: isMobile ? 4 : 8,
          },
          grid: {
            color: "rgba(255,255,255,0.12)",
            borderDash: [4, 5],
            drawTicks: false,
            drawBorder: false,
          },
          border: {
            color: "rgba(255,255,255,0.22)",
          },
        },
      },
    }
  }, [data.accentIndex, data.labels.length, filter, isMobile])

  return (
    <section className="w-full min-w-0 rounded-3xl border border-secondary/50 bg-primary/50 p-4 sm:p-5 md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-xl leading-[125%] font-medium text-white sm:text-[24px]">
            Monthly Revenue Growth
          </h3>
          <p className="mt-1 text-sm leading-[133%] text-white/70 sm:text-base">
            Comparative analysis for the current year
          </p>
        </div>

        <EarningsPeriodFilter
          value={filter}
          onValueChange={setFilter}
          className="w-full sm:w-auto"
        />
      </div>

      <div className="h-56 w-full sm:h-64 md:h-72 lg:h-75">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  )
}