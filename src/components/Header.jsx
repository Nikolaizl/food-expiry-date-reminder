import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import "../index.css";

export default function Header() {
  return (
    <BootstrapNavbar bg="light" expand="lg" className="">
      <Container>
        <BootstrapNavbar.Brand href="/">Good2Eat</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
