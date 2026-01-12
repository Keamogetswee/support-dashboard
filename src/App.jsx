import React from "react"
import { useState } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"
import FilterBar from "./components/FilterBar"
import "./App.css"

export default function App() {
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })
  
  
  return (
    <main>
      <h1>Customer Support Dashboard</h1>
      <p>Internal tool for managing support tickets.</p>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />

      
      <FilterBar setStatusFilter={setStatusFilter} />

      {isLoading ? (
        <p>Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : null}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>

    </main>
  )
}
