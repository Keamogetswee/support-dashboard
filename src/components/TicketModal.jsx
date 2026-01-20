export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>{ticket.subject}</h2>

        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>

        <p style={{ marginTop: "1rem" }}>
          {ticket.description}
        </p>

        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Close
        </button>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}

const modalStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "500px",
  width: "90%",
}
