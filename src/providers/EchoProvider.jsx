// src/contexts/EchoContext.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

window.Pusher = Pusher;

const EchoContext = createContext(null);

export function EchoProvider({ children }) {
  const echoRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // adjust to your slice

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      if (echoRef.current) {
        echoRef.current.disconnect();
        echoRef.current = null;
      }
      return;
    }

    echoRef.current = new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT,
      forceTLS: false, // ← http, not https
      enabledTransports: ["ws"], // ← ws, not wss
      authEndpoint: import.meta.env.VITE_REVERB_AUTH_ENDPOINT, // ← your Laravel auth endpoint
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });
    echoRef.current.connector.pusher.connection.bind("state_change", (states) => {
  console.log("🔌 Connection state:", states.previous, "→", states.current);
});

    return () => {
      if (echoRef.current) {
        echoRef.current.disconnect();
        echoRef.current = null;
      }
    };
  }, [isAuthenticated]);

  return (
    <EchoContext.Provider value={echoRef}>{children}</EchoContext.Provider>
  );
}

export function useEcho() {
  return useContext(EchoContext);
}
