export default function FilterBar({ setStatusFilter }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setStatusFilter("All")}>All</button>
      <button onClick={() => setStatusFilter("Open")}>Open</button>
      <button onClick={() => setStatusFilter("In Progress")}>In Progress</button>
      <button onClick={() => setStatusFilter("Resolved")}>Resolved</button>
    </div>
  )
}
