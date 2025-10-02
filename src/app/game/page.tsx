import ImagePuzzle from "@/components/ImagePuzzle";
import WordG from "@/components/WordG";

export default function Game() {
  return (
    <main className="min-h-screen flex justify-around items-center">
      <ImagePuzzle />
      <WordG />
    </main>
  );
}
