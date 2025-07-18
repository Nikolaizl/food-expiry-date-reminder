import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginClick = (signUp = false) => {
    setIsSignUp(signUp);
    setShowLogin(true);
  };

  return (
    <div className="content-bg">
      <div className="home-centered">
        <h1>Welcome to Good2Eat</h1>

        <Button
          variant="light"
          className="mb-2"
          onClick={() => handleLoginClick(false)}
          style={{ width: "120px" }}
        >
          Log in
        </Button>

        <Button
          variant="outline-light"
          onClick={() => handleLoginClick(true)}
          style={{ width: "120px" }}
        >
          Sign up
        </Button>

        <LoginModal
          show={showLogin}
          onClose={() => setShowLogin(false)}
          defaultIsSignUp={isSignUp}
        />
      </div>
    </div>
  );
}
