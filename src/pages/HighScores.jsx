import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizHighScores") || "[]");
    setScores(saved.sort((a, b) => b.score - a.score));
  }, []);

  const clearScores = () => {
    localStorage.removeItem("quizHighScores");
    setScores([]);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        // 🤖 Robot / AI background
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* High Score Card */}
      <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center max-w-lg w-full animate-fadeIn border border-yellow-500/40">
        <h1 className="text-5xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
          🏆 High Scores
        </h1>

        {scores.length === 0 ? (
          <p className="mb-6 text-gray-200">
            No scores yet. Play a quiz to add one!
          </p>
        ) : (
          <ul className="space-y-3 mb-6">
            {scores.slice(0, 5).map((s, i) => (
              <li
                key={i}
                className={`flex justify-between items-center px-4 py-2 rounded-lg border shadow-md ${
                  i === 0
                    ? "bg-yellow-500/30 border-yellow-400 text-yellow-200 font-bold"
                    : i === 1
                    ? "bg-gray-400/30 border-gray-300 text-gray-100 font-semibold"
                    : i === 2
                    ? "bg-orange-500/30 border-orange-400 text-orange-200 font-semibold"
                    : "bg-slate-800/50 border-slate-700 text-gray-200"
                }`}
              >
                <span>
                  {i + 1}. {s.name || "Player"}
                </span>
                <span>{s.score}</span>
                <span className="text-sm opacity-70">{s.date}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            🏠 Home
          </Link>
          <button
            onClick={clearScores}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            ❌ Clear Scores
          </button>
        </div>
      </div>
    </div>
  );
}
