import { useState, useEffect } from "react";

type Tile = number;

export default function ImagePuzzle({ image, size = 3, onSolved }: { image: string, size?: number, onSolved?: (solved: boolean) => void }) {
  const total = size * size;
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initial = Array.from({ length: total }, (_, i) => i);
    setTiles(shuffle(initial));
  }, [size]);

  function shuffle(arr: Tile[]): Tile[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      if (temp !== undefined && copy[j] !== undefined) {
        copy[i] = copy[j];
        copy[j] = temp;
      }
    }
    return copy;
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.dataTransfer.setData("tileIndex", index.toString());
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, dropIndex: number) {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("tileIndex"), 10);
    if (isNaN(dragIndex) || dragIndex < 0 || dropIndex < 0) return;

    const newTiles = [...tiles];
    if (dragIndex < newTiles.length && dropIndex < newTiles.length) {
      const temp = newTiles[dragIndex];
      if (temp !== undefined && newTiles[dropIndex] !== undefined) {
        newTiles[dragIndex] = newTiles[dropIndex];
        newTiles[dropIndex] = temp;
      }
    }
    setTiles(newTiles);

    if (isSolved(newTiles)) {
      setMessage("Հավաքված է");
      onSolved?.(true);
    } else {
      setMessage("");
      onSolved?.(false);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function isSolved(arr: Tile[]) {
    return arr.every((v, i) => v === i);
  }

  return (
    <div className="max-w-2xl p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg max-h-screen overflow-y-auto"> 
      <header className="flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 bg-white px-4 py-2 rounded-full shadow-md">Փազլ {size}×{size}</h1> 
      </header>

      <section
        className="grid gap-3 bg-white p-4 rounded-2xl shadow-inner border-2 border-gray-200"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {tiles.map((tile, idx) => {
          const r = Math.floor(tile / size);
          const c = tile % size;
          return (
            <div
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragOver={handleDragOver}
              className="relative aspect-square rounded-xl overflow-hidden cursor-move bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-blue-400"
              style={{ minHeight: '120px', minWidth: '120px' }}
            >
              <div
                className="absolute inset-0 bg-cover"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: `${size * 100}% ${size * 100}%`,
                  backgroundPosition: `${(c / (size - 1)) * 100}% ${(r / (size - 1)) * 100}%`,
                }}
              />
            </div>
          );
        })}
      </section>

      <div className="mt-6 gap-6 flex items-center justify-center">
        <button
          onClick={() => { setTiles(shuffle(Array.from({ length: total }, (_, i) => i))); setMessage(""); onSolved?.(false); }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-lg"
        >
          Խառնել
        </button>
        {message && (
          <div className="bg-green-100 border-2 border-green-300 text-green-700 font-bold text-xl px-6 py-3 rounded-xl shadow-lg animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}