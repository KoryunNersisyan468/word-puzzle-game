import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen text-center flex flex-col gap-8 items-center justify-center bg-blue-100">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow">
       «Հավաքի՛ր բառը և փազլը»
      </h1>     
      
      <p className="text-lg sm:text-xl text-gray-600 mb-6 text-center max-w-xl">
        Քո խնդիրը — հավաքել պատկերը կտորներից և գուշակել գաղտնագրած բառը։
      </p>
      <Link
        to="/level/1"
        className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200"
      >
        Սկսել խաղը
      </Link>
    </div>
  );
}
