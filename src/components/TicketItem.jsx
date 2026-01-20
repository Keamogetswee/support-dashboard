import PriorityBadge from "./PriorityBadge"

export default function TicketItem({ ticket, onSelect }) {
  return (
    <li
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if(e.key === "Enter" || e.key === " ") {
          onSelect()
        }
      }}
      style={{
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        cursor: "pointer",
        backgroundColor: "#000",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none"
        e.currentTarget.style.boxShadow = "none"
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxshadow = "0 0 0 3px #4f46e5"
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxshadow = "none"
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
    </li>
  )
}
