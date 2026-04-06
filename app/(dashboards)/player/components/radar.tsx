"use client" // Next.js hole lagbe

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

export default function RadarChart() {
  const data = {
    labels: [
      "Technical",
      "Defending",
      "Physical",
      "Tactical",
      "Aerial",
      "Attacking",
      "Mental",
    ],
    datasets: [
      {
        data: [80, 90, 75, 60, 96, 65, 100],
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
      min: 20,    
      max: 100,
      ticks: {
        color: "#fff", // gray text
        backdropColor: "transparent", // no bg
        stepSize: 20, // 20,40,60...
      },
      grid: {
        color: "rgba(255, 255, 255, 0.5)", // circle line color
      },
      angleLines: {
        color: "rgba(255, 255, 255, 0.5)", // spoke lines
      },
      pointLabels: {
        color: "rgba(255, 255, 255, 0.7)", // label color (green)
      },
    },
  },
  }

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    // type: 'radar',
    data: data,
    options: options,
  }

  return (
    <div>
      <Radar {...config}   />
    </div>
  )
}
