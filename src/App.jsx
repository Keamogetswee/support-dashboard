import React from "react"
import { useState } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"

export default function App() {
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })
  
  
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Customer Support Dashboard</h1>
      <p>Internal tool for managing support tickets.</p>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />

      
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
