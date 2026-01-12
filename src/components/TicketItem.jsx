export default function TicketItem({ ticket }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <strong>{ticket.subject}</strong>

      <p
        style={{
          marginTop: "0.5rem",
          color:
            ticket.status === "Open"
              ? "red"
              : ticket.status === "In Progress"
              ? "orange"
              : "green",
        }}
      >
        Status: {ticket.status}
      </p>
    </li>
  )
}
