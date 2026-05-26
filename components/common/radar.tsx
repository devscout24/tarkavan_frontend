"use client" // Next.js hole lagbe

import { capitalizeFirstLetter } from "@/lib/make-uppercase"
import { TPlayerStrength } from "@/types/player.type"
import { size } from "@floating-ui/react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"

import { Radar } from "react-chartjs-2"

// register required parts
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default function RadarChart({
  strengths,
}: {
  strengths?: TPlayerStrength[]
}) {
  const data = {
    labels: strengths?.map((strength) => capitalizeFirstLetter(strength.strength_type)) || [],
    datasets: [
      {
        data: strengths?.map((strength) => strength.endorse_count) || [
          0, 0, 0, 0, 0, 0, 0,
        ],
        fill: true,
        backgroundColor: "rgba(198, 245, 122, 0.2)",
        pointBackgroundColor: "#C6F57A",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "rgba(198, 245, 122, 0.2)",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        borderColor: "#C6F57A",
      },
    ],
  }

  const counts = strengths?.map((s) => s.endorse_count) || [0]
  const maxVal = Math.max(...counts)

  // nearest "nice" number এ round up
  const dynamicMax = Math.ceil(maxVal / 20) * 20 || 20
  const dynamicStep = dynamicMax / 5

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        min: 0,
        max: dynamicMax,
        ticks: {
          color: "#fff", // gray text
          backdropColor: "transparent", // no bg
          stepSize: dynamicStep,
          size: 20,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.5)", // circle line color
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.5)", // spoke lines
        },
        pointLabels: {
          color: "rgba(255, 255, 255, 0.7)", // label color (green)
          font: {
            size: 20,
          },
          
        },
      },
    },
  }

  const config = {
    // responsive: true,
    // maintainAspectRatio: false,
    // type: 'radar',
    data: data,
    options: options,
  }

  return (
    <div>
      <Radar {...config} />
    </div>
  )
}
