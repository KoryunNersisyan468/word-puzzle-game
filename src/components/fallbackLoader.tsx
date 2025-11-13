export const fallbackLoader = (bgColor = "bg-white", borderColor = "border-blue-500", textColor = "text-blue-600", text = "Բեռնվում է ...") => (
    <div className={`flex min-h-screen items-center justify-center ${bgColor}`}>
      <div className={`animate-spin w-16 h-16 ${borderColor} border-b-4 rounded-full`}></div>
      <span className={`ml-6 text-xl ${textColor} font-bold animate-pulse`}>
        {text}
      </span>
    </div>
  );