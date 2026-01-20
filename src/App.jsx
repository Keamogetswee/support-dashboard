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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("none")
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets")
        }
        return res.json()
      })
      .then((data) => {
        setTimeout(() => {
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

          const mappedTickets = data.map((post, index) => ({
            id: post.id,
            subject: subjects[index % subjects.length],
            description: descriptions[index % descriptions.length],
            status: ["Open", "In Progress", "Resolved"][
              Math.floor(Math.random() * 3)
            ],
            priority: ["Low", "Medium", "High"][
              Math.floor(Math.random() * 3)
            ],
          }))

          setTickets(mappedTickets)
        }, 2000) // ⏳ 2 second delay
      })

      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
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

  const sortedTickets = [...filteredTickets]
  if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    sortedTickets.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }


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

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginLeft: "1rem", padding: "0.5rem" }}
      >
        <option value="none">No sorting</option>
        <option value="priority">Sort by priority</option>


      </select>

      <FilterBar setStatusFilter={setStatusFilter} />

      <p>Showing <strong>{filteredTickets.length}</strong> ticket(s)</p>


      {isLoading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && !error && tickets.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "1.2rem",
            padding: "2rem",
            color: "#555",
          }}
        >
          <h3>No tickets yet</h3>
          <p>You're all caught up. New support tickets will appear here.</p>

        </div>
      )}


      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>

        {sortedTickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onSelect={() => setSelectedTicket(ticket)}
          />
        ))}
      </ul>

      {selectedTicket && (
        <div
          onClick={() => setSelectedTicket(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000",
              border: "2px solid aqua",
              padding: "2rem",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <h2>{selectedTicket.subject}</h2>

            <p><strong>Status:</strong> {selectedTicket.status}</p>
            <p><strong>Priority:</strong> {selectedTicket.priority}</p>
            <p><strong>Description:</strong></p>
            <p>{selectedTicket.description}</p>

            <button
              onClick={() => setSelectedTicket(null)}
              style={{ marginTop: "1rem" }}
            >
              Close
            </button>
          </div>
        </div>
      )}



    </main>
  )
}
