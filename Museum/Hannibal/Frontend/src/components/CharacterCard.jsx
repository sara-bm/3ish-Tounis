import React from "react";

const CharacterCard = ({ character, onSelect }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onSelect(character)}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h3 className="text-lg font-semibold text-center mt-2">{character.name}</h3>
    </div>
  );
};

export default CharacterCard;
