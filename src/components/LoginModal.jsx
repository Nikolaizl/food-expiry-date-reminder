import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function LoginModal({ show, onClose, defaultIsSignUp = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(defaultIsSignUp);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSignUp(defaultIsSignUp);
  }, [defaultIsSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting authentication...", { isSignUp });
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Sign up successful:", { userId: result.user.uid });
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sign in successful:", { userId: result.user.uid });
      }
      handleClose();
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      console.log("Attempting Google sign in...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in successful:", { userId: result.user.uid });
      handleClose();
    } catch (error) {
      console.error("Google sign in error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? "Sign Up" : "Login"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <i className="bi bi-google"></i> Sign in with Google
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
