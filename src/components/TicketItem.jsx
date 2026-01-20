import PriorityBadge from "./PriorityBadge"

export default function TicketItem({ ticket, isSelected, onSelect }) {
  return (
    <li
      onClick={onSelect}
      style={{
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        cursor: "pointer",
        backgroundColor: isSelected ? "#000000" : "black",
      }}
    >
       <strong>
        {ticket.subject}<PriorityBadge priority={ticket.priority} />
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

      {isSelected && (
        <div style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Priority:</strong> {ticket.priority || "Medium"}</p>
        </div>
      )}
    </li>
  )
}
