// // ChatInterface.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import './chat_hannibal.css';
// import backgroundImage from './assets/hannibal_background.webp';

// const HannibalChat = () => {
//   const [messages, setMessages] = useState([
//     { text: 'مرحبًا! كيف يمكنني مساعدتك؟', sender: 'bot' },
//   ]);
//   const [input, setInput] = useState('');
//   const [isBotTyping, setIsBotTyping] = useState(false); // For loading indicator
//   const chatBoxRef = useRef(null); // Ref for auto-scrolling

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: 'user' };
//     setMessages([...messages, userMessage]);
//     setInput('');
//     setIsBotTyping(true); // Show loading indicator

//     // Simulate API response (Replace with real API call)
//     setTimeout(() => {
//       const botResponse = { text: 'هذا رد تلقائي! ما هو سؤالك التالي؟', sender: 'bot' };
//       setMessages(prev => [...prev, botResponse]);
//       setIsBotTyping(false); // Hide loading indicator
//     }, 1000);
//   };

//   // Handle Enter key to send message
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="chat-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//         {isBotTyping && <div className="message bot typing">...</div>}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="اكتب رسالتك هنا..."
//         />
//         <button onClick={handleSendMessage}>إرسال</button>
//       </div>
//     </div>
//   );
// };

// export default HannibalChat;


// ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import './css/chat_hannibal.css';
import backgroundImage from './assets/hannibal_background.webp';

const HannibalChat = () => {
  const [messages, setMessages] = useState([
    { text: 'مرحبًا! كيف يمكنني مساعدتك؟', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsBotTyping(true);

    try {
      // Make API call to your FastAPI endpoint
      const response = await fetch('http://127.0.0.1:8000/ask_hannibal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ letter: input }),
      });

      const data = await response.json();
      console.log('API response:', data);
      const botResponse = { text: data.response.message, sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorResponse = { text: 'عذراً، حدث خطأ أثناء معالجة طلبك', sender: 'bot' };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
           <div className="chat-header">
        <h1>حنبعل</h1>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isBotTyping && <div className="message bot typing">...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب رسالتك هنا..."
        />
        <button onClick={handleSendMessage}>إرسال</button>
      </div>
    </div>
  );
};

export default HannibalChat;