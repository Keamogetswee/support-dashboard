import React from "react"
import { tickets } from "./data/tickets"

export default function App() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Customer Support Dashboard</h1>
      <p>Internal tool for managing support tickets.</p>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.subject}</strong>
            {/* <p>Status: {ticket.status}</p> */}

            <p
              style={{
                color:
                  ticket.status === "Open" ? "red" : ticket.status === "In Progress" ? "orange" : "green",
              }}
            >
              Status: {ticket.status}
            </p>

          </li>
        ))}
      </ul>
    </main>
  )
}
