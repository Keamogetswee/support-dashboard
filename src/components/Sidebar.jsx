export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#0f0f0f",
        color: "#fff",
        padding: "1.5rem",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ marginBottom: "2rem" }}>SupportDesk</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <span>📊 Dashboard</span>
        <span>🎟 Tickets</span>
        <span>📆 Calendar</span>
        <span>👥 Team</span>
        <span>⚙️ Settings</span>
      </nav>
    </aside>
  )
}
