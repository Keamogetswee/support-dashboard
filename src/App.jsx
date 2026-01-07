import React from "react"
import { useState } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"

export default function App() {
  const [statusFilter, setStatusFilter] = useState("All")
  const filteredTickets = statusFilter === "All" ? tickets : tickets.filter(ticket => ticket.status === statusFilter)
  
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Customer Support Dashboard</h1>
      <p>Internal tool for managing support tickets.</p>
      
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setStatusFilter("All")}>All</button>
        <button onClick={() => setStatusFilter("Open")}>Open</button>
        <button onClick={() => setStatusFilter("In Progress")}>In Progress</button>
        <button onClick={() => setStatusFilter("Resolved")}>Resolved</button>
      </div>

      <ul>
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>

    </main>
  )
}
