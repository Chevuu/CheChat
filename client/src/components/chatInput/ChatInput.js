import React, { useState } from "react";
import "./ChatInput.css";

const ChatInput = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (message === "") {
      return;
    }
    onMessageSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleMessageSubmit}>
      <input
        className="chat-input"
        type="text"
        name="message"
        placeholder="Type a message..."
        autoComplete="off"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button className="chat-submit" type="submit">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
