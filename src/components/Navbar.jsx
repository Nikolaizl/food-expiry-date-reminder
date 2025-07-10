import { Nav } from "react-bootstrap";
import "../index.css";

export default function Navbar() {
  return (
    <div
      className="sidebar-fixed d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "200px" }}
    >
      <h4>Good2Eat</h4>
      <Nav className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/add">Add Food</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav>
    </div>
  );
}
