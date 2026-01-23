export default function PriorityBadge({ priority }) {
  const colors = {
    Low: "#2ecc71",
    Medium: "#f1c40f",
    High: "#e74c3c",
  }

  return (
    <span
      style={{
        marginLeft: "0.5rem",
        padding: "0.2rem 0.6rem",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        color: "black",
        backgroundColor: colors[priority],
      }}
    >
      {priority}
    </span>
  )
}
