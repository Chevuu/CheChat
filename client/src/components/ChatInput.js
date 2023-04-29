import React, { useState } from "react";

const ChatInput = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState("");
  const [recipientPort, setRecipientPort] = useState("");

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (message === "" || recipientPort === "") {
      return;
    }
    onMessageSubmit(message, recipientPort);
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
      <input
        className="chat-recipient-port"
        type="text"
        name="recipient-port"
        placeholder="Port"
        autoComplete="off"
        value={recipientPort}
        onChange={(event) => setRecipientPort(event.target.value)}
      />
      <button className="chat-submit" type="submit">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
