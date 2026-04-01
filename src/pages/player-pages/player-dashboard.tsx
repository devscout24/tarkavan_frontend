import StatCard from "@/components/common/stat-card"

const playerStats = [
  { label: "Training sessions", value: "5 this week" },
  { label: "Match fitness", value: "87%" },
  { label: "Goals this month", value: "6" },
]

export function PlayerDashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {playerStats.map((item) => (
        <StatCard/>
      ))}
    </section>
  )
}
