import React from "react"
import { useState, useEffect } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"
import FilterBar from "./components/FilterBar"
import "./App.css"
import PriorityBadge from "./components/PriorityBadge"

export default function App() {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    const subjects = [
      "Unable to reset password",
      "Payment failed at checkout",
      "Account verification issue",
      "Refund request",
      "App crashes on login",
    ]

    const descriptions = [
      "Customer reports the password reset link is not working.",
      "Payment fails without showing an error message.",
      "User did not receive verification email.",
      "Customer requesting a refund for a duplicate charge.",
      "App crashes immediately after logging in.",
    ]

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets")
        }
        return res.json()
      })

      .then((data) => {
        const priorities = ["Low", "Medium", "High"]
        const mappedTickets = data.map((post, index) => ({
          id: post.id,
          subject: subjects[index % subjects.length],
          description: descriptions[index % descriptions.length],
          status: ["Open", "In Progress", "Resolved"][
            Math.floor(Math.random() * 3)
          ],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
        }))

        setTickets(mappedTickets)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
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
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            isSelected={ticket.id === selectedTicketId}
            onSelect={() => setSelectedTicketId(ticket.id === selectedTicketId ? null : ticket.id)}
          />
        ))}
      </ul>

    </main>
  )
}
