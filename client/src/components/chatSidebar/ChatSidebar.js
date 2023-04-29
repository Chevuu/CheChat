import React, { useState } from "react";
import "./ChatSidebar.css";

const ChatSidebar = ({ chats, onNewChatClick, onChatSelect }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const handleChatClick = (chat) => {
    console.log(chat);
    onChatSelect(chat);
    setShowMenu(false);
  };

  const handleNewChatNameChange = (event) => {
    setNewChatName(event.target.value);
  };

  const handleNewChatSubmit = () => {
    const madeChat = {
      id: chats.length + 1,
      name: newChatName,
    };
    onNewChatClick(madeChat);
    setShowInput(false)
    setNewChatName("");
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Chats</h1>
        {showInput ? (
          <div className="new-chat-input-container">
            <input
              type="text"
              value={newChatName}
              onChange={handleNewChatNameChange}
              placeholder="Enter chat name"
            />
            <button className="new-chat-submit-button" onClick={handleNewChatSubmit}>
              Create
            </button>
          </div>
        ) : (
          <button className="new-chat-button" onClick={() => setShowInput(true)}>
            + New Chat
          </button>
        )}
      </div>
      <div className="sidebar-menu-container">
        <button className="sidebar-menu-button" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? "Hide Chats" : "Show Chats"}
        </button>
        {showMenu && (
          <ul className="sidebar-menu-list">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className="sidebar-menu-item"
                onClick={() => handleChatClick(chat)}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
