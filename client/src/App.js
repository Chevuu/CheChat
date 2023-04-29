import React, { useState } from "react";
import Chat from "./components/Chat";
import ChatSidebar from "./components/chatSidebar/ChatSidebar";
import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatPort, setSelectedChatPort] = useState("");

  const handleNewChatClick = (madeChat) => {
    const newChat = { id: madeChat.id, name: madeChat.name };
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
    setSelectedChatPort(madeChat.name);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setSelectedChatPort(chat.name);
  };

  return (
    <div className="app-container">
      <ChatSidebar
        chats={chats}
        onNewChatClick={handleNewChatClick}
        onChatSelect={handleChatSelect}
      />
      {selectedChat ? <Chat chat={selectedChat} port = {selectedChatPort}/> : <p>No chat selected</p>}
    </div>
  );
}

export default App;
