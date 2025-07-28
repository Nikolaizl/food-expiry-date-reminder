import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { getToken, messaging } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Settings() {
  const { currentUser } = useAuth();
  const [isEnabling, setIsEnabling] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const requestPermission = async () => {
    setIsEnabling(true);
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (currentToken) {
        console.log("Push token:", currentToken);
        setStatusMessage("Notifications enabled successfully!");
      } else {
        setStatusMessage("No registration token available.");
      }
    } catch (err) {
      console.error("Error retrieving token:", err);
      setStatusMessage("Failed to enable notifications.");
    } finally {
      setIsEnabling(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStatusMessage("You have been logged out.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-3 text-success fw-bold text-center">Settings</h3>

        {currentUser && (
          <p className="text-center text-muted mb-4">
            Logged in as <strong>{currentUser.email}</strong>
          </p>
        )}

        <div className="d-grid gap-3">
          <Button
            variant="success"
            onClick={requestPermission}
            disabled={isEnabling}
          >
            {isEnabling ? "Enabling..." : "Enable Notifications"}
          </Button>

          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {statusMessage && (
          <p className="mt-3 text-center text-muted">{statusMessage}</p>
        )}
      </Card>
    </Container>
  );
}
