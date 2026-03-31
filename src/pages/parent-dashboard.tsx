const parentStats = [
  { label: "Next training", value: "Tue 18:00" },
  { label: "Attendance", value: "94%" },
  { label: "Unread messages", value: "3" },
]

export function ParentDashboardPage() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {parentStats.map((item) => (
        <article key={item.label} className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </article>
      ))}
    </section>
  )
}
