export default function NotFoundLevle() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-50 via-yellow-100 to-pink-200">
      <div className="bg-white/90 border-2 border-red-200 rounded-2xl shadow-xl px-12 py-12 flex flex-col items-center">
        <span className="text-6xl mb-4 animate-bounce select-none">😕</span>
        <h2 className="text-3xl font-extrabold text-red-500 mb-2 drop-shadow">
          Մակարդակը չի գտնվել
        </h2>
        <p className="text-md text-gray-700 mb-4 text-center">
          Նշված խաղի փուլը առկա չէ կամ հեռացվել է։
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-2 px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
        >
          Վերադառնալ
        </button>
      </div>
    </div>
  );
}
