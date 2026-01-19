import React from "react"
import { useState, useEffect } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"
import FilterBar from "./components/FilterBar"
import "./App.css"

export default function App() {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch tickets")
      }
      return res.json()
    })
    .then((data) => {
      const mappedTickets = data.map((post) => ({
        id: post.id,
        subject: post.title,
        description: post.body,
        status: ["Open", "In Progress", "Resolved"][
          Math.floor(Math.random() * 3)
        ],
      }))

      setTickets(mappedTickets)
      setIsLoading(true)
    })
    .catch((err) => {
      setError(err.message)
      setTickets(tickets)
      setIsLoading(false)
    })
}, [])


  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter
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

      {isLoading && <p>Loading tickets...</p>}
      {!isLoading && filteredTickets.length === 0 && <p>No tickets found.</p>}


      <p>Showing <strong>{filteredTickets.length}</strong> ticket(s)</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>

    </main>
  )
}
