import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
import LoginModal from "../components/LoginModal";
import logo from "../assets/images/Logo_Good2Eat.png";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginClick = (signUp = false) => {
    setIsSignUp(signUp);
    setShowLogin(true);
  };

  return (
    <div className="content-bg d-flex justify-content-center align-items-center">
      <div className="p-4 bg-dark bg-opacity-75 rounded shadow text-center">
        <img
          src={logo}
          alt="Good2Eat Logo"
          style={{ width: "80px", marginBottom: "15px" }}
        />
        <h1 className="mb-4 text-light fw-bold">Welcome to Good2Eat</h1>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="success"
            size="lg"
            onClick={() => handleLoginClick(false)}
          >
            Log In
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => handleLoginClick(true)}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        defaultIsSignUp={isSignUp}
      />
    </div>
  );
}
