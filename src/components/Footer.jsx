import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#28a745",
        color: "#fff",
        padding: "15px 0",
        textAlign: "center",
      }}
    >
      <Container>
        <p className="mb-0">© 2025 Good2Eat. All rights reserved.</p>
      </Container>
    </footer>
  );
}
