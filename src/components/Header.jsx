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
import logo from "../assets/images/Logo_Good2Eat.png";

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
          <img
            src={logo}
            alt="Good2Eat Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Good2Eat
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!currentUser && <Nav.Link href="/">Home</Nav.Link>}
            {currentUser && (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/recipes">Recipes</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <div className="d-flex align-items-center">
                <span className="me-3">{currentUser.email}</span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="success" onClick={onLoginClick}>
                Login
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
