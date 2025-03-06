import React, { useState } from 'react';
import './kitchen.css'; // Import the CSS file
import chefImage from './assets/chef.png'; // Import the chef image

export default function Kitchen() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    console.log('Send button clicked'); // Debug log

    if (message.trim()) {
      const newMessage = { user: 'You', text: message };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear the input field

      try {
        // Make a POST request to the backend API using fetch
        const response = await fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: message }), // Send user message as query
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check the structure of the response
        console.log('Backend response:', data);

        // Get the response based on the language, here it's assuming "response_en" or "response_tn"
        const responseMessage = data.response_en || data.response_tn.message;

        // Update the chat with the chef's response
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { user: 'Chef', text: responseMessage },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { user: 'Chef', text: 'Sorry, something went wrong. Try again later.' },
        ]);
      }
    } else {
      console.log('Message is empty');
    }
  };

  return (
    <div className="kitchen-container">
      <div className="kitchen-content">
        <img src={chefImage} alt="Chef" className="kitchen-image" />
        <div>
          <h1 className="kitchen-title">Dbaret lyoum!</h1>

          {/* Chat Box */}
          <div className="chat-container">
            <div className="chat-box">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.user.toLowerCase()}`}
                >
                  <strong>{msg.user}: </strong>{msg.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="chat-input-area">
              <input
                className="chat-input"
                type="text"
                value={message}
                onChange={(e) => {
                  console.log(e.target.value);  // Debug log
                  setMessage(e.target.value);
                }}
                placeholder="Type your message..."
              />
              <button
                className="chat-send-btn"
                onClick={handleSendMessage}
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
