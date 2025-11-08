import computer from "/hamakargich.jpg"
import stexnashar from "/stexnashar.jpg"
import mknik from "/mknik.webp"
import linux from "/linux.png"

export interface Level {
  id: number;
  image: string;
  word: string;
}

export const data: Level[] = [
 
  {
    id: 1,
    image: stexnashar,
    word: "Ստեղնաշար"
  },
  {
    id: 2,
    image: mknik,
    word: "Մկնիկ"
  },
  {
    id: 3,
    image: computer,
    word: "Համակարգիչ"
  },
   {
    id: 4,
    image: linux,
    word: "Linux"
  },
];
