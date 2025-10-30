import puzzleImage from "/puzzle.jpg"
import logo from "/logo.svg"


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
    image: logo,
    word: "WORLD"
  }
];
