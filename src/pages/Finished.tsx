import { Link } from "react-router";

export default function Finished() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100">
      <h1 className="text-5xl font-bold text-emerald-700 mb-6 drop-shadow">
        Շնորհավորում ենք 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center max-w-2xl">
        Դու հաջողությամբ ավարտեցիր խաղի բոլոր փուլերը:<br/>
        Հուսով ենք, որ հաճույք ստացար թե՛ պատկերը հավաքելով, թե՛ բառը գուշակելով։
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-emerald-500 text-white text-xl rounded-xl shadow-lg hover:bg-emerald-600 transition"
      >
        Վերադառնալ սկիզբ
      </Link>
    </div>
  );}