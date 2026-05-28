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
      forceTLS: true,
      enabledTransports: ["wss"],
      authEndpoint: import.meta.env.VITE_API_BASE_URL + "/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });

    return () => {
      if (echoRef.current) {
        echoRef.current.disconnect();
        echoRef.current = null;
      }
    };
  }, [isAuthenticated]);

  return (
    <EchoContext.Provider value={echoRef}>
      {children}
    </EchoContext.Provider>
  );
}

export function useEcho() {
  return useContext(EchoContext);
}