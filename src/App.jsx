import React, { use } from "react"
import { useState, useEffect } from "react"
import { tickets } from "./data/tickets"
import TicketItem from "./components/TicketItem"
import FilterBar from "./components/FilterBar"
import "./App.css"
import PriorityBadge from "./components/PriorityBadge"
import StatsCards from "./components/StatsCards"
import Layout from "./components/Layout"

export default function App() {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("none")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ticketsPerPage = 5

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

  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedTicket])

  useEffect(() => {
    if (!selectedTicket) return

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setSelectedTicket(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  },[selectedTicket])

  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, searchTerm, sortBy])


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

  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage)
  const startIndex = (currentPage - 1) * ticketsPerPage
  const endIndex = startIndex + ticketsPerPage
  const paginatedTickets = sortedTickets.slice(startIndex, endIndex)



  return (
    <Layout>
    <main style={{
    background: "#f7f7f7",
    padding: "2rem",
    borderRadius: "16px",
    minHeight: "100vh",
  }}>
      <h1>Customer Support Dashboard</h1>
      <p>Internal tool for managing support tickets.</p>

      <StatsCards tickets={tickets} />

    <div className="toolbar-actions">
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
    </div>

      <p>Showing <strong>{sortedTickets.length}</strong> ticket(s)</p>


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
          <h3>No new tickets</h3>
          <p>You're all caught up. New support tickets will appear here.</p>

        </div>
      )}

      {!isLoading && !error && tickets.length > 0 && sortedTickets.length === 0 && (
        <p style={{marginTop: "2rem", color: "#777"}}>No tickets match your search filter.</p>
      )}


      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>

        {paginatedTickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onSelect={() => setSelectedTicket(ticket)}
          />
        ))}
      </ul>

{totalPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
      gap: "0.5rem",
    }}
  >
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{
            fontWeight: currentPage === page ? "bold" : "normal",
          }}
        >
          {page}
        </button>
      )
    })}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
    >
      Next
    </button>
  </div>
)}


      {selectedTicket && (
        <div className="modal-overlay"
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
          <div className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="Ticket details"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#CBCBCB",
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
    </Layout>
  )
}
