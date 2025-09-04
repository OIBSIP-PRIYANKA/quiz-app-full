import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Quiz from "./components/Quiz";
import Results from "./pages/Results";
import HighScores from "./pages/HighScores";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
      <Route path="/highscores" element={<HighScores />} />
    </Routes>
  );
}
function Home() {
  const [difficulty, setDifficulty] = React.useState("easy"); // default difficulty

  const optionColors = {
    easy: "text-green-500",
    medium: "text-yellow-400",
    hard: "text-red-500",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glassmorphic Card */}
      <div className="relative z-10 bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-10 text-center animate-fadeIn max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-white">🚀 Tech Quiz</h1>
        <p className="mb-8 text-gray-300">
          Test your knowledge in web development, programming, databases, and
          more!
        </p>

        {/* Difficulty selection */}
        <div className="mb-6">
          <label className="text-gray-200 mr-3 font-medium">Select Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={`px-3 py-2 rounded-lg bg-slate-700 text-white font-semibold`}
            style={{ color: optionColors[difficulty] }}
          >
            <option value="easy" className="text-green-500">
              Easy
            </option>
            <option value="medium" className="text-yellow-400">
              Medium
            </option>
            <option value="hard" className="text-red-500">
              Hard
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="/quiz"
            state={{ difficulty }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 hover:opacity-90 transition transform"
          >
            Start Quiz
          </Link>
          <Link
            to="/highscores"
            className="px-6 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
          >
            View High Scores
          </Link>
        </div>
      </div>
    </div>
  );
}
