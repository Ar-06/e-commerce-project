import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./chat.module.css";

const socket = io("http://localhost:3000");

export function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserName(decoded.user);

      // Unión al room del admin
      socket.emit("joinAdminRoom");

      if (decoded.user === "admin") {
        socket.emit("adminConnect");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    socket.emit("message", { token, message });
    setMessage("");
  };

  const receiveMessage = (data) => {
    setMessages((state) => [...state, data]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.userName === userName ? styles.messageMe : styles.messageOther
            }`}
          >
            <div className={styles.messageContent}>
              <strong>{msg.userName}:</strong>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={message}
          placeholder="Escribe un mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          className={styles.messageInput}
        />
        <button onClick={handleSubmit} className={styles.sendButton}>
          Enviar
        </button>
      </div>
    </div>
  );
}
