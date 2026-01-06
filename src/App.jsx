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
            {ticket.subject}
          </li>
        ))}
      </ul>
    </main>
  )
}
