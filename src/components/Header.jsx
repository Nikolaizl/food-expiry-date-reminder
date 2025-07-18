import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "../index.css";

export default function Header({ onLoginClick }) {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="">
      <Container>
        <BootstrapNavbar.Brand href={currentUser ? "/dashboard" : "/"}>
          Good2Eat
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!currentUser && <Nav.Link href="/">Home</Nav.Link>}
            {currentUser && (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <div className="d-flex align-items-center">
                <span className="me-3">{currentUser.email}</span>
                <Button variant="outline-primary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={onLoginClick}>
                Login
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
