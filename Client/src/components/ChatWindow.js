import { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendClick();
    }
  };

  const handleVoiceButtonClick = () => {
    alert("Voice input is not yet implemented.");
  };

  return (
    <div className="chat-window" data-testid="chat-window">
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendClick} className="send-button">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
        <button onClick={handleVoiceButtonClick} className="voice-button">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.53-2.64 6.4-6.3 6.4S5.7 14.53 5.7 11H4c0 3.98 3.15 7.19 7 7.74V22h2v-3.26c3.85-.55 7-3.76 7-7.74h-1.7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;