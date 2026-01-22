export default function StatsCards({ tickets }) {
  const total = tickets.length
  const open = tickets.filter(t => t.status === "Open").length
  const inProgress = tickets.filter(t => t.status === "In Progress").length
  const resolved = tickets.filter(t => t.status === "Resolved").length
  const highPriority = tickets.filter(t => t.priority === "High").length

  return (
    <div className="stats-grid">
      <div className="stat-card total">
        <h4>Total Tickets</h4>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card open">
        <h4>Open</h4>
        <span className="stat-value">{open}</span>
      </div>

      <div className="stat-card progress">
        <h4>In Progress</h4>
        <span className="stat-value">{inProgress}</span>
      </div>

      <div className="stat-card resolved">
        <h4>Resolved</h4>
        <span className="stat-value">{resolved}</span>
      </div>

      <div className="stat-card high">
        <h4>High Priority</h4>
        <span className="stat-value">{highPriority}</span>
      </div>
    </div>
  )
}
