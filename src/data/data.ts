import computer from "/hamakargich.jpg";
import stexnashar from "/stexnashar.jpg";
import mknik from "/mknik.webp";
import router from "/router.webp";
import linux from "/linux.png";
import windows from "/windows.jpg";

export interface Level {
  id: number;
  image: string;
  word: string;
}

export const data: Level[] = [
  {
    id: 1,
    image: stexnashar,
    word: "Ստեղնաշար",
  },
  {
    id: 2,
    image: mknik,
    word: "Մկնիկ",
  },
  {
    id: 3,
    image: computer,
    word: "Համակարգիչ",
  },
  { id: 4, image: router, word: "Ռաութեր" },

  {
    id: 5,
    image: linux,
    word: "Linux",
  },
  {
    id: 6,
    image: windows,
    word: "Windows",
  },
];
