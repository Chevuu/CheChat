import React, { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import "./styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080/');
    ws.current.onmessage = (event) => {
      const message = event.data;
      const messageTime = new Date().toLocaleTimeString([], { hour12: false, hourCycle: 'h23', hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        message: message.split(':')[0],
        time: messageTime,
        senderPort: message.split(':')[1],
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    if (message === "") {
      return;
    }
    ws.current.send(`${message}:${window.location.port}`);
    event.target.reset();
  };
  

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="chat-title">CheChat</h1>
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          className="chat-input"
          type="text"
          name="message"
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button className="chat-submit" type="submit">
          Send
        </button>
      </form>
      <MessageBox messages={messages} />
    </div>
  );
};

export default Chat;
