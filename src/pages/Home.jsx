import { Button } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  return (
    <div className="content-bg">
      <div className="home-centered">
        <h1>Welcome to Good2Eat</h1>
        <Button variant="light" className="mb-2">
          Sign in
        </Button>
        <Button variant="outline-light">Log in</Button>
      </div>
    </div>
  );
}
