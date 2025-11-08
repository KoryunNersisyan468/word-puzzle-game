import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import WordG  from "../components/WordG"
import ImagePuzzle from "../components/ImagePuzzle"
import { data } from "../data/data"
import NotFoundLevle from "../components/NotFoundLevle"

export default function SinglePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const level = data.find((level) => level.id === Number(id));

  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isWordSolved, setIsWordSolved] = useState(false);

  useEffect(() => {
    if (isPuzzleSolved && isWordSolved) {
      setTimeout(() => {
        const nextId = Number(id) + 1;
        if (nextId <= data.length) {
          navigate(`/level/${nextId}`);
          setIsPuzzleSolved(false);
          setIsWordSolved(false);
        } else {
          navigate(`/finished`);
          setIsPuzzleSolved(false);
          setIsWordSolved(false);
        }
      }, 2000);
    }
  }, [isPuzzleSolved, isWordSolved, navigate]);

  if (!level) {
    return (
     <NotFoundLevle />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 max-w-7xl mx-auto h-full">
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
          <ImagePuzzle key={level.image} image={level.image} onSolved={setIsPuzzleSolved} />
        </div>
        <div className="w-full lg:min-w-1/2 h-full flex items-center justify-center">
          <WordG key={level.word} word={level.word} onSolved={setIsWordSolved} />
        </div>
      </div>
    </div>
  );
}

