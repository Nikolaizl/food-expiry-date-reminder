import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import LoginModal from "./components/LoginModal";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { messaging, getToken, onMessage } from "./firebase/firebaseConfig";
import RecipeSearch from "./pages/RecipeSearch";
import RecipeDetail from "./pages/RecipeDetail";
import { Button } from "react-bootstrap";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      setNotification(payload.notification);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        });
    }
  }, []);

  const requestPermission = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (currentToken) {
        console.log("Push token:", currentToken);
        alert("Notifications enabled!");
      } else {
        console.warn("No registration token available.");
      }
    } catch (err) {
      console.error("Error while retrieving token:", err);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header onLoginClick={() => setShowLogin(true)} />
          <main className="flex-grow-1 container py-3">
            {/* Add a button to request notification permission */}
            <div className="text-center mb-3">
              <Button variant="success" onClick={requestPermission}>
                Enable Notifications
              </Button>
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recipes"
                element={
                  <PrivateRoute>
                    <RecipeSearch />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recipes/:id"
                element={
                  <PrivateRoute>
                    <RecipeDetail />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />

          <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
        </div>
      </Router>
    </AuthProvider>
  );
}
