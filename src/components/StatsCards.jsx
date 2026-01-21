export default function StatsCards({ tickets }) {
  const total = tickets.length
  const open = tickets.filter(t => t.status === "Open").length
  const inProgress = tickets.filter(t => t.status === "In Progress").length
  const resolved = tickets.filter(t => t.status === "Resolved").length
  const highPriority = tickets.filter(t => t.priority === "High").length

  const cardStyle = {
    padding: "1rem",
    borderRadius: "12px",
    background: "#111",
    color: "#fff",
    flex: 1,
    minWidth: "150px"
  }

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
      <div style={cardStyle}>
        <h4>Total Tickets</h4>
        <strong>{total}</strong>
      </div>

      <div style={cardStyle}>
        <h4>Open</h4>
        <strong>{open}</strong>
      </div>

      <div style={cardStyle}>
        <h4>In Progress</h4>
        <strong>{inProgress}</strong>
      </div>

      <div style={cardStyle}>
        <h4>Resolved</h4>
        <strong>{resolved}</strong>
      </div>

      <div style={cardStyle}>
        <h4>High Priority</h4>
        <strong>{highPriority}</strong>
      </div>
    </div>
  )
}
