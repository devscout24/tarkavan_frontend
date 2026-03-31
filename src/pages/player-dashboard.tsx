const playerStats = [
  { label: "Training sessions", value: "5 this week" },
  { label: "Match fitness", value: "87%" },
  { label: "Goals this month", value: "6" },
]

export function PlayerDashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {playerStats.map((item) => (
        <article key={item.label} className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </article>
      ))}
    </section>
  )
}
