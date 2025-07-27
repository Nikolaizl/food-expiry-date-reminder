import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

export default function App() {
  const [notification, setNotification] = useState(null);
  const [permission, setPermission] = useState(Notification.permission);
  const [token, setToken] = useState(null);

  const requestPermission = async () => {
    if (Notification.permission === "granted") {
      console.log("Permission already granted");
      await getFCMToken();
      return;
    }

    const permissionResult = await Notification.requestPermission();
    setPermission(permissionResult);

    if (permissionResult === "granted") {
      await getFCMToken();
    } else {
      console.warn("⚠ Notification permission denied");
    }
  };

  const getFCMToken = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (currentToken) {
        console.log("Push token:", currentToken);
        setToken(currentToken);
      } else {
        console.warn("No registration token available.");
      }
    } catch (err) {
      console.error("Error retrieving token:", err);
    }
  };

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      setNotification(payload.notification);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Good2Eat</h1>

      {permission !== "granted" && (
        <button
          onClick={requestPermission}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Enable Notifications
        </button>
      )}

      {token && (
        <p style={{ marginTop: "10px", fontSize: "12px" }}>Token: {token}</p>
      )}

      {notification && (
        <div
          style={{ background: "#d4edda", padding: "10px", marginTop: "20px" }}
        >
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
}
