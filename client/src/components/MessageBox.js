import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./styles/Chat.css";

const MessageBox = ({ messages }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages" ref={chatContainerRef}>
      {messages.map((message, index) => {
        let cssClass = "chat-message";
        let messagePort = message.senderPort;
        if (message.senderPort === window.location.port) {
          cssClass += " my";
          messagePort = "You";
        } else {
          cssClass += " notMy";
          messagePort = `Port ${message.senderPort}`;
        } 
        return (
          <div key={index} className={cssClass}>
            <div className="chat-message-time">{message.time}</div>
            <div className="chat-message-port">{messagePort}</div>
            <div className="chat-message-text">{message.message}</div>
          </div>
        );
      })}
    </div>
  );

};

MessageBox.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageBox;
