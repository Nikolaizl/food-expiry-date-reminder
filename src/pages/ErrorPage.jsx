import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="error-bg d-flex justify-content-center align-items-center">
      <Container className="text-center text-light">
        <div className="error-box p-4 rounded shadow-lg">
          <img
            src="/src/assets/images/Logo_Good2Eat.png"
            alt="Good2Eat Logo"
            style={{ width: "80px", marginBottom: "15px" }}
          />
          <h1 className="display-4 fw-bold">404</h1>
          <p className="lead">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="success" size="lg" className="mt-3">
              Go Home
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
