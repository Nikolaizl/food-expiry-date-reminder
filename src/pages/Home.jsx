import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  if (currentUser) {
    navigate("/dashboard");
    return null;
  }

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
          onClick={() => handleLoginClick(true)}
        >
          Sign up
        </Button>
        <Button variant="outline-light" onClick={() => handleLoginClick(false)}>
          Log in
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
