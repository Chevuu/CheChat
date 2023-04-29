import React, { useState, useEffect, useRef } from "react";
import MessageBox from "./chatMessageBox/MessageBox";
import ChatHeader from "./chatHeader/ChatHeader";
import ChatInput from "./chatInput/ChatInput";
import "./Chat.css";

const Chat = ({ port }) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8080/`);

    // this is done so that backend can be aware of open clients
    ws.current.onopen = (event) => {
      ws.current.send(`::${window.location.port}`);
    };

    ws.current.onmessage = (event) => {
      const message = event.data;
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

  const handleMessageSubmit = (message) => {
    ws.current.send(`${message}:${port}:${window.location.port}`);
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
