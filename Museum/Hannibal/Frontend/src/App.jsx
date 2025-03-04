import React, { useState } from "react";
import CharacterCard from "./components/CharacterCard";
import LetterModal from "./components/LetterModal";

const characters = [
  {
    name: "Hannibal",
    image: "/images/hannibal.jpg",
    endpoint: "/ask_hannibal/",
  },
  {
    name: "Ibn Khaldoun",
    image: "/images/ibn_khaldoun.jpg",
    endpoint: "/ask_hannibal/",
  },
  {
    name: "Habib Bourguiba",
    image: "/images/bourguiba.jpg",
    endpoint: "/ask_hannibal/",
  },
];

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Letters to the Past</h1>
      <div className="flex space-x-6">
        {characters.map((char) => (
          <CharacterCard key={char.name} character={char} onSelect={setSelectedCharacter} />
        ))}
      </div>
      {selectedCharacter && (
        <LetterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default App;
