import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll on initial load and message updates
  }, [messages]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Allow Shift+Enter for new lines
      event.preventDefault(); // Prevent default Enter behavior (e.g., new line in textarea)
      handleSendClick();
    }
  };

  return (
    <div className="chat-window" data-testid="chat-window">
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Element to scroll to */}
      </div>
      <div className="input-container">
        <input
          type="text" // Changed to textarea if multi-line input is desired, but keeping text for simplicity
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendClick}>
          {/* Unicode send arrow. For a real app, use an icon library like Font Awesome */}
          <span role="img" aria-label="send"></span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;