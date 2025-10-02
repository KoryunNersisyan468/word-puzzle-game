"use client";
import React, { useState, useEffect } from "react";

interface ImagePuzzleProps {
  size?: number;
  image?: string;
}

type Tile = number;

export default function ImagePuzzle({ size = 3, image = "/word-puzzle-game/puzzle.jpg" }: ImagePuzzleProps) {
  const total = size * size;
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Создаем начальный массив номеров тайлов и перемешиваем его
    const initial = Array.from({ length: total }, (_, i) => i);
    setTiles(shuffle(initial));
  }, [size]);

  function shuffle(arr: Tile[]): Tile[] {
    // Функция перемешивания массива
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    // Сохраняем индекс перетаскиваемого тайла
    e.dataTransfer.setData("tileIndex", index.toString());
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, dropIndex: number) {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("tileIndex"), 10);
    if (isNaN(dragIndex)) return;

    // Меняем местами тайлы при сбросе
    const newTiles = [...tiles];
    [newTiles[dragIndex], newTiles[dropIndex]] = [newTiles[dropIndex], newTiles[dragIndex]];
    setTiles(newTiles);

    // Проверяем, собран ли пазл
    if (isSolved(newTiles)) {
      setMessage("🎉 Собрано!");
    } else {
      setMessage("");
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    // Разрешаем drop
    e.preventDefault();
  }

  function isSolved(arr: Tile[]) {
    // Проверяем, соответствует ли порядок тайлов правильному
    return arr.every((v, i) => v === i);
  }

  return (
    <div className="max-w-2xl p-6"> {/* Увеличил максимальную ширину и padding */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Drag & Drop Пазл {size}×{size}</h1> {/* Увеличил размер заголовка */}
        
      </header>

      <section
        className="grid gap-2 bg-slate-300 p-2 rounded-xl"
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
              className="relative aspect-square rounded-md overflow-hidden cursor-move bg-slate-200"
              style={{ minHeight: '180px', minWidth: '180px' }} // Увеличил размер тайлов
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

      <div className="mt-4 gap-12 flex items-center justify-center">
        <button
          onClick={() => { setTiles(shuffle(Array.from({ length: total }, (_, i) => i))); setMessage(""); }}
          className="px-4 py-2 rounded-lg shadow-sm border hover:shadow-md text-lg" // Увеличил кнопку
        >
          Перемешать
        </button>
        {message && <div className="text-emerald-600 font-semibold text-lg">{message}</div>}
        
      </div>
    </div>
  );
}