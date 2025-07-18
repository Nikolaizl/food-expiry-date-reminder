import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
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

export default function App() {
  console.log("App component rendering");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Header onLoginClick={() => setShowLogin(true)} />
          <main className="flex-grow-1">
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
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
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
