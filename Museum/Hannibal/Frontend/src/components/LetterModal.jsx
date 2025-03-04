import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";

const LetterModal = ({ character, onClose }) => {
  const [letter, setLetter] = useState("");
  const [response, setResponse] = useState("");

  const sendLetter = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask_hannibal/", { letter });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error sending letter:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl p-6 max-w-lg">
        <h2 className="text-xl font-semibold">Write to {character.name}</h2>
        <textarea
          className="w-full border rounded-lg p-2 mt-2"
          rows="5"
          placeholder="Write your letter..."
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        ></textarea>
        <button
          onClick={sendLetter}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          Send
        </button>
        {response && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <strong>Response:</strong>
            <p>{response}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LetterModal;
