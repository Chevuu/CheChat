import React, { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import "./styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/`);
    ws.current.onopen = (event) => {
      console.log('WebSocket opened');
      ws.current.send(`::${window.location.port}`);
    };
    ws.current.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
    ws.current.onmessage = (event) => {
      const message = event.data;
      console.log("Received message" + message)
      const messageTime = new Date().toLocaleTimeString([], { hour12: false, hourCycle: 'h23', hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        message: message.split(':')[0],
        time: messageTime,
        receiverPort: message.split(':')[1],
        senderPort: message.split(':')[2],
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleMessageSubmit = (message, recipientPort) => {
    ws.current.send(`${message}:${recipientPort}:${window.location.port}`);
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatInput onMessageSubmit={handleMessageSubmit} />
      <MessageBox messages={messages} />
    </div>
  );
};

export default Chat;
