import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Create socket connection to the server
const socket: Socket = io("http://localhost:5000");

export const useWebSocket = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Listen for "update" events from the server
    socket.on("update", (data) => {
      console.log("Received update:", data);
      setMessage(data.message);
    });

    // Listen for "test_status" events from the server
    socket.on("test_status", (data) => {
      console.log("Received test status:", data);
      setMessage(data.status);
    });

    // Handle connection errors
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      setMessage("Connection to server failed. Please refresh the page.");
    });

    // Clean up socket connection when component unmounts
    return () => {
      console.log("Disconnecting WebSocket");
      socket.disconnect();
    };
  }, []);

  return message;
};

// Export the socket for use in other components if needed
export { socket };