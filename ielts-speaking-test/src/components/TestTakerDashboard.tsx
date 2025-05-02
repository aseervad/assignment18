import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const TestTakerDashboard: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("update", (data) => {
      setMessage(data.message);
    });

    socket.on("test_status", (data) => {
      setMessage(data.status);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="dashboard">
      <h1>Test Taker Dashboard</h1>
      {message && (
        <div className="notification-bar">
          {message}
        </div>
      )}
    </div>
  );
};

export default TestTakerDashboard;
