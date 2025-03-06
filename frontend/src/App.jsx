// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/page1/Home'; // The page with the contes-card div
import HistoryRoom from './components/museum_room/Museum.jsx'; // The History Hello interface
import Hannibalchat from './components/museum_room/HannibalChat.jsx'; // The Hannibal Chat interface
// import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history-hello" element={<HistoryRoom />} />
        <Route path="/chat-hannibal" element={<Hannibalchat />} />
      </Routes>
    </div>
  );
}

export default App;