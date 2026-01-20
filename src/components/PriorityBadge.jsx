export default function PriorityBadge({ priority }) {
  const colors = {
    High: "#e53935",
    Medium: "#fb8c00",
    Low: "#43a047",
  }

  return (
    <span
      style={{
        backgroundColor: colors[priority],
        color: "white",
        padding: "0.2rem 0.6rem",
        borderRadius: "12px",
        fontSize: "0.75rem",
        marginLeft: "0.5rem",
      }}
    >
      {priority}
    </span>
  )
}
