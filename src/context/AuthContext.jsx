import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  console.log("AuthProvider initializing");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    console.log("Setting up auth state listener");

    let refreshInterval = null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", { user: !!user });
      setCurrentUser(user);

      if (user) {
        try {
          const token = await user.getIdToken(true);
          setIdToken(token);
          refreshInterval = setInterval(async () => {
            try {
              const refreshedToken = await user.getIdToken(true);
              setIdToken(refreshedToken);
            } catch (error) {
              console.error("Error refreshing token:", error);
            }
          }, 55 * 60 * 1000);
        } catch (error) {
          console.error("Error getting ID token:", error);
          setIdToken(null);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
      unsubscribe();
    };
  }, []);

  const getIdToken = async (forceRefresh = false) => {
    if (!currentUser) return null;
    try {
      const token = await currentUser.getIdToken(forceRefresh);
      setIdToken(token);
      return token;
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  };

  const value = {
    currentUser,
    loading,
    idToken,
    getIdToken,
  };

  console.log("AuthProvider state:", {
    isAuthenticated: !!currentUser,
    hasToken: !!idToken,
    loading,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
