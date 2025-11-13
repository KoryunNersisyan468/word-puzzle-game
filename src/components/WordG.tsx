import { useEffect, useState } from "react";

export default function WordG({ word, onSolved }: { word: string, onSolved?: (solved: boolean) => void }) {
  const letters = word.split("");

  const [slots, setSlots] = useState(Array(letters.length).fill(""));

   const [bottomLetters, setBottomLetters] = useState<string[]>([]);
    useEffect(() => {
    setBottomLetters([...letters].sort(() => Math.random() - 0.5));
  }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const isWordCorrect = slots.join("").toLowerCase() === word.toLowerCase();
    onSolved?.(isWordCorrect);
  }, [slots, word, onSolved]);

  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [draggedFromSlot, setDraggedFromSlot] = useState<number | null>(null);
  const [draggedFromBottom, setDraggedFromBottom] = useState<number | null>(null);

  const placeLetterClick = (letter: string, index: number) => {
    const firstEmpty = slots.findIndex((slot) => slot === "");
    if (firstEmpty === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmpty] = letter;
    setSlots(newSlots);

    const newBottom = [...bottomLetters];
    newBottom.splice(index, 1);
    setBottomLetters(newBottom);
  };

  const handleDragStartBottom = (letter: string, index: number) => {
    setDraggedLetter(letter);
    setDraggedFromBottom(index);
    setDraggedFromSlot(null);
  };

  const handleDragStartSlot = (letter: string, index: number) => {
    if (!letter) return;
    setDraggedLetter(letter);
    setDraggedFromSlot(index);
    setDraggedFromBottom(null);
  };

  const handleDropSlot = (index: number) => {
    if (!draggedLetter) return;

    const newSlots = [...slots];
    const newBottom = [...bottomLetters];

    if (draggedFromSlot !== null) {
      const temp = newSlots[index];
      newSlots[index] = draggedLetter;
      newSlots[draggedFromSlot] = temp;
      setSlots(newSlots);
      setDraggedLetter(null);
      setDraggedFromSlot(null);
      return;
    }

    if (draggedFromBottom !== null) {
      if (newSlots[index] !== "") {
        const temp = newSlots[index];
        newSlots[index] = draggedLetter;
        newBottom[draggedFromBottom] = temp;
      } else {
        newSlots[index] = draggedLetter;
        newBottom.splice(draggedFromBottom, 1);
      }

      setSlots(newSlots);
      setBottomLetters(newBottom);
      setDraggedLetter(null);
      setDraggedFromBottom(null);
    }
  };

  const handleDropBottomEmpty = () => {
    if (!draggedLetter || draggedFromSlot === null) return;
    const newBottom = [...bottomLetters, draggedLetter];
    const newSlots = [...slots];
    newSlots[draggedFromSlot] = "";
    setBottomLetters(newBottom);
    setSlots(newSlots);
    setDraggedLetter(null);
    setDraggedFromSlot(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const checkWord = () => {
    if (slots.join("") === word) {
      setMessage("Ճիշտ է");
    } else {
      setMessage("Սխալ է");
    }
  };

  const resetGame = () => {
    setSlots(Array(letters.length).fill(""));
    setBottomLetters([...letters].sort(() => Math.random() - 0.5));
    setMessage("");
    setDraggedLetter(null);
    setDraggedFromSlot(null);
    setDraggedFromBottom(null);
    onSolved?.(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4 gap-4 bg-green-50 rounded-2xl shadow-lg max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-800 bg-white px-4 py-2 rounded-full shadow-md">Հավաքիր բառը</h1>

      <div className="flex gap-3 bg-white sm:p-3 p-2 lg:p-4 rounded-2xl shadow-inner border-2 border-gray-200">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            onDrop={() => handleDropSlot(idx)}
            onDragOver={handleDragOver}
            draggable={!!slot}
            onDragStart={() => handleDragStartSlot(slot, idx)}
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold bg-white cursor-pointer rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-400"
          >
            {slot}
          </div>
        ))}
      </div>

      <div
        onDrop={handleDropBottomEmpty}
        onDragOver={handleDragOver}
        className="flex gap-3 flex-wrap bg-white p-2 sm:p-3 lg:p-4 rounded-2xl shadow-inner border-2 border-gray-200 min-w-20"
      >
        {bottomLetters.map((letter, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStartBottom(letter, idx)}
            onClick={() => placeLetterClick(letter, idx)}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold bg-blue-100 cursor-pointer rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-400"
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="mt-4 gap-4 flex items-center justify-center">
        <button
          onClick={checkWord}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
        >
          Ստուգել
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
        >
          Սկսել Նորից
        </button>
      </div>
      {message && (
        <div className={`text-center font-bold text-xl px-6 py-3 rounded-xl shadow-lg animate-pulse ${
          message === "Ճիշտ է" 
            ? "bg-green-100 border-2 border-green-300 text-green-700" 
            : "bg-red-100 border-2 border-red-300 text-red-700"
        }`}>
          {message}
        </div>
      )}
      </div>
  );
}
