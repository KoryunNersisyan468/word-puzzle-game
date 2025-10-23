import puzzleImage from "@/assets/puzzle.jpg";

export interface Level {
  id: number;
  image: string;
  word: string;
}

export const data: Level[] = [
  {
    id: 1,
    image: puzzleImage,
    word: "HELLO"
  },
  {
    id: 2,
    image: puzzleImage,
    word: "WORLD"
  }
];
