export default function TicketItem({ ticket }) {
  return (
    <li>
      <strong>{ticket.subject}</strong>

      <p
        style={{
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
