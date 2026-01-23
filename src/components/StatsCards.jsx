export default function StatsCards({ tickets }) {
  const total = tickets.length
  const open = tickets.filter(t => t.status === "Open").length
  const inProgress = tickets.filter(t => t.status === "In Progress").length
  const resolved = tickets.filter(t => t.status === "Resolved").length
  const highPriority = tickets.filter(t => t.priority === "High").length

  const cards = [
    { label: "Total Tickets", value: total, color: "#6366f1" },
    { label: "Open", value: open, color: "#38bdf8" },
    { label: "In Progress", value: inProgress, color: "#fbbf24" },
    { label: "Resolved", value: resolved, color: "#34d399" },
    { label: "High Priority", value: highPriority, color: "#fb7185" },
  ]

  return (
    <div className="stats-grid">
      {cards.map(card => (
        <div className="stat-card-light" key={card.label}>
          <span
            className="stat-accent"
            style={{ backgroundColor: card.color }}
          />
          <div className="stat-value">{card.value}</div>
          <div className="stat-label">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
