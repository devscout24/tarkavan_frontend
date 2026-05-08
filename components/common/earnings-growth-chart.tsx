"use client"

import EarningsPeriodFilter, {
  type EarningsChartFilter,
} from "@/components/common/earnings-period-filter"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMemo, useState, useEffect } from "react"
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

interface EarningsResponse {
  status: boolean
  message: string
  data: {
    applied_filter: string
    monthly_growth: {
      labels: string[]
      values: number[]
    }
  }
}

const Y_MAX = 1200
const Y_STEP = 300

// Calculate dynamic Y-axis max based on data values
const calculateDynamicYMax = (values: number[]) => {
  if (!values || values.length === 0) return 1200
  const maxValue = Math.max(...values)
  return Math.max(300, Math.ceil(maxValue / 100) * 110) // Round up to nearest 100, then add 10% padding
}

interface EarningsGrowthChartProps {
  labels?: string[]
  values?: number[]
  currentFilter?: string
  onFilterChange?: (filter: EarningsChartFilter) => void
}

export default function EarningsGrowthChart({ 
  labels = [], 
  values = [], 
  currentFilter = "month",
  onFilterChange
}: EarningsGrowthChartProps) {
  const [filter, setFilter] = useState<EarningsChartFilter>(currentFilter as EarningsChartFilter)
  const [apiData, setApiData] = useState<{ labels: string[]; values: number[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const isMobile = useIsMobile()

  const fetchEarningsData = async (filterValue: EarningsChartFilter) => {
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

      const result: EarningsResponse = await response.json()
      
      if (result.status && result.data?.monthly_growth) {
        setApiData(result.data.monthly_growth)
      } else {
        console.warn("Invalid response structure:", result)
      }
    } catch (error) {
      console.error("Error fetching earnings data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // If props are provided, use them; otherwise fetch data
    if (labels.length > 0 && values.length > 0) {
      setApiData({ labels, values })
    } else {
      fetchEarningsData(filter)
    }
  }, [filter, labels, values])

  const handleFilterChange = (newFilter: EarningsChartFilter) => {
    setFilter(newFilter)
    onFilterChange?.(newFilter)
  }

  // Use API data if available, otherwise use empty data
  const data = apiData || { labels: [], values: [], accentIndex: 0, helperDots: [] }
  
  // Generate helper dots and accent index based on actual data
  const enrichedData = {
    ...data,
    accentIndex: currentFilter === "year"
      ? new Date().getMonth()
      : filter === "month"
      ? Math.min(4, Math.max(0, Math.ceil(new Date().getDate() / 7) - 1))
      : Math.floor(new Date().getMonth() / 2),
    helperDots: data.values?.map((val: number) => val * 0.2) || [],
  }

  // Dynamic title and description based on filter
  const getTitleAndDescription = () => {
    switch (filter) {
      case "month":
        return {
          title: "Weekly Revenue Growth",
          description: "Comparative analysis for current week"
        }
      case "year":
        return {
          title: "Monthly Revenue Growth", 
          description: "Monthly earnings breakdown for the year"
        }
      
      default:
        return {
          title: "Monthly Revenue Growth",
          description: "Monthly earnings breakdown for the year"
        }
    }
  }

  const { title, description } = getTitleAndDescription()

  const chartData = useMemo<ChartData<"line">>(() => {
    const basePointSize = isMobile ? 2.2 : 3
    const revenuePointSize = isMobile ? 3.5 : 5

    const helperDataset: ChartDataset<"line", number[]> = {
      label: "Helper dots",
      data: enrichedData.helperDots,
      showLine: false,
      pointRadius: basePointSize,
      pointHoverRadius: basePointSize,
      pointBackgroundColor: "rgba(165,191,225,0.75)",
      pointBorderWidth: 0,
      order: 1,
    }

    const baselineDataset: ChartDataset<"line", number[]> = {
      label: "Baseline dots",
      data: enrichedData.helperDots.map(() => 28),
      showLine: false,
      pointRadius: basePointSize,
      pointHoverRadius: basePointSize,
      pointBackgroundColor: "rgba(182,208,245,0.9)",
      pointBorderWidth: 0,
      order: 1,
    }

    const revenueDataset: ChartDataset<"line", number[]> = {
      label: "Revenue",
      data: enrichedData.values,
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
      labels: enrichedData.labels,
      datasets: [baselineDataset, helperDataset, revenueDataset],
    }
  }, [enrichedData, isMobile])

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
              return tickIndex === enrichedData.accentIndex
                ? "#C6F57A"
                : "rgba(255,255,255,0.34)"
            },
            font: (ctx) => {
              const tickIndex = Number(ctx.tick.value)
              return {
                size: isMobile ? 10 : 14,
                weight: tickIndex === enrichedData.accentIndex ? 600 : 500,
              }
            },
            autoSkip: true,
            maxTicksLimit:
              filter === "year"
                ? isMobile
                  ? 4
                  : 12
                : isMobile
                    ? 3
                    : 5,
            maxRotation: 0,
            minRotation: 0,
            padding: isMobile ? 6 : 12,
          },
        },
        y: {
          type: "linear",
          min: 0,
          max: enrichedData.values?.length > 0 ? calculateDynamicYMax(enrichedData.values) : Y_MAX,
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
  }, [enrichedData.accentIndex, enrichedData.labels?.length, filter, isMobile, enrichedData.values])

  if (loading) {
    return (
      <section className="w-full min-w-0 rounded-3xl border border-secondary/50 bg-primary/50 p-4 sm:p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="h-7 w-32 bg-white/10 rounded-md animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-white/5 rounded-md animate-pulse"></div>
          </div>
          <div className="h-11 w-24 bg-white/10 rounded-xl animate-pulse"></div>
        </div>
        <div className="h-56 w-full bg-white/5 rounded-xl animate-pulse flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading chart...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full min-w-0 rounded-3xl border border-secondary/50 bg-primary/50 p-4 sm:p-5 md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-xl leading-[125%] font-medium text-white sm:text-[24px]">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-[133%] text-white/70 sm:text-base">
            {description}
          </p>
        </div>

        <EarningsPeriodFilter
          value={filter}
          onValueChange={handleFilterChange}
          className="w-full sm:w-auto"
        />
      </div>

      <div className="h-56 w-full sm:h-64 md:h-72 lg:h-75">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  )
}