import { Suspense } from "react";
import { Route, Routes } from "react-router";
import "./index.css";

import SinglePage from "./pages/SinglePage";
import Home from "./pages/Home";
import Finished from "./pages/Finished";
import NotFound from "./pages/NotFound";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-purple-200">
                <div className="animate-spin w-16 h-16 border-b-4 border-blue-500 rounded-full"></div>
                <span className="ml-6 text-xl text-blue-600 font-bold animate-pulse">
                  Բեռնվում է ...
                </span>
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-purple-200">
                <div className="animate-spin w-16 h-16 border-b-4 border-blue-500 rounded-full"></div>
                <span className="ml-6 text-xl text-blue-600 font-bold animate-pulse">
                  Բեռնվում է ...
                </span>
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/start"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-purple-200">
                <div className="animate-spin w-16 h-16 border-b-4 border-blue-500 rounded-full"></div>
                <span className="ml-6 text-xl text-blue-600 font-bold animate-pulse">
                  Բեռնվում է ...
                </span>
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/game"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-emerald-100 to-purple-200">
                <div className="animate-spin w-16 h-16 border-b-4 border-blue-500 rounded-full"></div>
                <span className="ml-6 text-xl text-blue-600 font-bold animate-pulse">
                  Բեռնվում է ...
                </span>
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/level/:id"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
                <div className="animate-spin w-16 h-16 border-b-4 border-purple-500 rounded-full"></div>
                <span className="ml-6 text-xl text-indigo-700 font-bold animate-pulse">
                  Խաղը բեռնվում է ...
                </span>
              </div>
            }
          >
            <SinglePage />
          </Suspense>
        }
      />
      <Route
        path="/finished"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100">
                <div className="animate-spin w-16 h-16 border-b-4 border-emerald-500 rounded-full"></div>
                <span className="ml-6 text-xl text-emerald-700 font-bold animate-pulse">
                  Վերջնական բեռնվում է ...
                </span>
              </div>
            }
          >
            <Finished />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 via-pink-100 to-yellow-100">
                <div className="animate-spin w-16 h-16 border-b-4 border-red-300 rounded-full"></div>
                <span className="ml-6 text-xl text-red-600 font-bold animate-pulse">
                  Էջը բեռնվում է ...
                </span>
              </div>
            }
          >
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
