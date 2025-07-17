import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-auto">
      <Container>
        <p className="text-center text-muted mb-0">
          © {new Date().getFullYear()} Good2Eat. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
