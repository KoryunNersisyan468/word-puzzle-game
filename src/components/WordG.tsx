"use client";
import { useEffect, useState } from "react";

export default function WordG() {
  const word = "HELLO";
  const letters = word.split("");

  const [slots, setSlots] = useState(Array(letters.length).fill(""));

  // Ленивая инициализация: перемешиваем один раз при старте
   const [bottomLetters, setBottomLetters] = useState<string[]>([]);
    useEffect(() => {
    setBottomLetters([...letters].sort(() => Math.random() - 0.5));
  }, []);

  const [message, setMessage] = useState("");

  // Drag
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [draggedFromSlot, setDraggedFromSlot] = useState<number | null>(null);
  const [draggedFromBottom, setDraggedFromBottom] = useState<number | null>(null);

  /** Клик по нижней букве */
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

  /** Drag Start */
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

  /** Drop на слот */
  const handleDropSlot = (index: number) => {
    if (!draggedLetter) return;

    const newSlots = [...slots];
    const newBottom = [...bottomLetters];

    // Drag из верхнего ряда — меняем местами
    if (draggedFromSlot !== null) {
      const temp = newSlots[index];
      newSlots[index] = draggedLetter;
      newSlots[draggedFromSlot] = temp;
      setSlots(newSlots);
      setDraggedLetter(null);
      setDraggedFromSlot(null);
      return;
    }

    // Drag из нижнего ряда
    if (draggedFromBottom !== null) {
      if (newSlots[index] !== "") {
        // Слот занят — меняем буквы
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

  /** Drop в нижний ряд (из верхнего ряда) */
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

  /** Проверка слова */
  const checkWord = () => {
    if (slots.join("") === word) {
      setMessage("Правильно! 🎉");
    } else {
      setMessage("Неправильно 😢");
    }
  };

  /** Начать заново */
  const resetGame = () => {
    setSlots(Array(letters.length).fill(""));
    setBottomLetters([...letters].sort(() => Math.random() - 0.5));
    setMessage("");
    setDraggedLetter(null);
    setDraggedFromSlot(null);
    setDraggedFromBottom(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 gap-6">
      <h1 className="text-2xl font-bold">Собери слово (Клик + Drag & Drop)</h1>

      {/* Верхняя строка */}
      <div className="flex gap-2">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            onDrop={() => handleDropSlot(idx)}
            onDragOver={handleDragOver}
            draggable={!!slot}
            onDragStart={() => handleDragStartSlot(slot, idx)}
            className="w-12 h-12 border flex items-center justify-center text-xl font-bold bg-white cursor-pointer"
          >
            {slot}
          </div>
        ))}
      </div>

      {/* Нижние буквы */}
      <div
        onDrop={handleDropBottomEmpty}
        onDragOver={handleDragOver}
        className="flex gap-2 flex-wrap min-h-[50px]"
      >
        {bottomLetters.map((letter, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStartBottom(letter, idx)}
            onClick={() => placeLetterClick(letter, idx)}
            className="w-12 h-12 border flex items-center justify-center text-xl font-bold bg-gray-200 cursor-pointer"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="mt-4 gap-4 flex items-center justify-center">
        <button
          onClick={checkWord}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Проверить
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Начать заново
        </button>
        {message && <div className="text-emerald-600 font-semibold text-lg">{message}</div>}
      </div>
    </div>
  );
}
