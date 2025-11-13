export default function NotFoundLevle() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 bg-white">
      <div className="bg-white border-2 border-red-200 rounded-2xl shadow-xl px-12 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-red-500">
          Մակարդակը չի գտնվել
        </h2>
        <p className="text-md text-gray-700 mb-4 text-center">
          Նշված խաղի փուլը առկա չէ կամ հեռացվել է։
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 hover:scale-105 transition"
        >
          Վերադառնալ
        </button>
      </div>
    </div>
  );
}