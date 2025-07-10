import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1>Welcome to Good2Eat</h1>
      <Button variant="light" className="mb-2">
        Sign in
      </Button>
      <Button variant="outline-light">Log in</Button>
    </div>
  );
}
