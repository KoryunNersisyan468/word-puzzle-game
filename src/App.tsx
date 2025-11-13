import { Suspense } from "react";
import { Route, Routes } from "react-router";
import "./index.css";

import SinglePage from "./pages/SinglePage";
import Home from "./pages/Home";
import Finished from "./pages/Finished";
import NotFound from "./pages/NotFound";
import { fallbackLoader } from "./components/fallbackLoader";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={fallbackLoader()}><Home /></Suspense>} />
      <Route path="/home" element={<Suspense fallback={fallbackLoader()}><Home /></Suspense>} />
      <Route path="/start" element={<Suspense fallback={fallbackLoader()}><Home /></Suspense>} />
      <Route path="/game" element={<Suspense fallback={fallbackLoader()}><Home /></Suspense>} />
      <Route
        path="/level/:id"
        element={
          <Suspense
            fallback={fallbackLoader("bg-white", "border-purple-500", "text-indigo-700", "Խաղը բեռնվում է ...")}
          >
            <SinglePage />
          </Suspense>
        }
      />
      <Route
        path="/finished"
        element={
          <Suspense
            fallback={fallbackLoader("bg-white", "border-emerald-500", "text-emerald-700", "Վերջնական բեռնվում է ...")}
          >
            <Finished />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense
            fallback={fallbackLoader("bg-white", "border-red-300", "text-red-600", "Էջը բեռնվում է ...")}
          >
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
