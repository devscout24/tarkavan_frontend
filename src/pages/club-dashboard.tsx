const clubStats = [
  { label: "Active members", value: "486" },
  { label: "Registered teams", value: "14" },
  { label: "Monthly revenue", value: "$42,000" },
]

export function ClubDashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {clubStats.map((item) => (
        <article key={item.label} className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </article>
      ))}
    </section>
  )
}
