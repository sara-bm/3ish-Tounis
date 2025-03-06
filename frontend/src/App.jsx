// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/page1/Home'; // The page with the contes-card div
import HistoryRoom from './components/museum_room/Museum.jsx'; // The History Hello interface
import Hannibalchat from './components/museum_room/HannibalChat.jsx'; // The Hannibal Chat interface
import Tourism from './components/tourism_room/tourism.jsx'; // The Tourism interface
import Clothes from './components/clothes_room/clothes.jsx';
import Kitchen from './components/kitchen_room/kitchen.jsx';
import Saletna from './components/saletna_room/saletna.jsx';
import QassimChat from './components/museum_room/QassimChat.jsx';
import TawhidaChat from './components/museum_room/TawhidaChat.jsx';
import AzizChat from './components/museum_room/AzizaChat.jsx';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history-hello" element={<HistoryRoom />} />
        <Route path="/chat-hannibal" element={<Hannibalchat />} />
        <Route path="/chat-qassim" element={<QassimChat />} />
        <Route path="/chat-tawhida" element={<TawhidaChat />} />
        <Route path="/chat-aziza" element={<AzizChat />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/elmaroo" element={<Clothes />} />
        <Route path="/koujinetna" element={<Kitchen />} />
        <Route path="/saletna" element={<Saletna />} />
      </Routes>
    </div>
  );
}

export default App;