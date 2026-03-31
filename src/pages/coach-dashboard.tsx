const coachStats = [
  { label: "Squad available", value: "23 players" },
  { label: "Planned sessions", value: "7" },
  { label: "Pending evaluations", value: "12" },
]

export function CoachDashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {coachStats.map((item) => (
        <article key={item.label} className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </article>
      ))}
    </section>
  )
}
