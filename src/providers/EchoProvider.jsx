import { createContext, useContext, useEffect, useRef, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

window.Pusher = Pusher;

const EchoContext = createContext({ echo: null, isReady: false });

export function EchoProvider({ children }) {
  const echoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isSecure = import.meta.env.VITE_REVERB_SCHEME === "https";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      echoRef.current?.disconnect();
      echoRef.current = null;
      setIsReady(false);
      return;
    }

    const echo = new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT,
      forceTLS: isSecure,
      enabledTransports: isSecure ? ["wss"] : ["ws"],
      authEndpoint: import.meta.env.VITE_REVERB_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    });

    echoRef.current = echo;

    echo.connector.pusher.connection.bind("state_change", (states) => {
      console.log("🔌 Connection state:", states.previous, "→", states.current);
      setIsReady(states.current === "connected");
    });

    return () => {
      echo.disconnect();
      echoRef.current = null;
      setIsReady(false);
    };
  }, [isAuthenticated]);

  return (
    <EchoContext.Provider value={{ echo: echoRef.current, isReady }}>
      {children}
    </EchoContext.Provider>
  );
}

export function useEcho() {
  return useContext(EchoContext);
}