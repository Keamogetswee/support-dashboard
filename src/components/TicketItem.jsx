import PriorityBadge from "./PriorityBadge"

export default function TicketItem({ ticket, onSelect }) {
  return (
    <li
      onClick={onSelect}
      style={{
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        cursor: "pointer",
        backgroundColor: "#000",
      }}
    >
      <strong>
        {ticket.subject} <PriorityBadge priority={ticket.priority} />
      </strong>

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
