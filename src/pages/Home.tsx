import ImagePuzzle from "@/components/ImagePuzzle";
import WordG from "@/components/WordG";

export default function Home() {
  return (
    <div className="flex justify-around items-center">
      <ImagePuzzle />
      <WordG />
    </div>
  );
}
