import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/");
    else {
      const saved = JSON.parse(localStorage.getItem("quizHighScores") || "[]");
      const newScore = { score: state.score, date: new Date().toLocaleString() };
      localStorage.setItem(
        "quizHighScores",
        JSON.stringify([newScore, ...saved].slice(0, 10))
      );
    }
  }, [state, navigate]);

  if (!state) return null;

  const { score, questions, answers } = state;
  const total = questions.length;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Results Card */}
      <div className="relative z-10 bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8 max-w-3xl w-full animate-fadeIn text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
          🎉 Your Results
        </h1>
        <p className="mb-8 text-center text-2xl font-semibold">
          You scored{" "}
          <span className="text-green-400 font-bold text-3xl">{score}</span> /{" "}
          <span className="text-yellow-400 font-bold text-3xl">{total}</span>
        </p>

        {/* Answers */}
        <div className="mb-6 space-y-3 max-h-[350px] overflow-y-auto pr-2">
          {answers.map((a, i) => {
            const q = questions[a.qIndex];
            const userText = q.options[a.selected] ?? "No Answer";
            const correctText = q.options[a.correctIndex];
            const isCorrect = a.selected === a.correctIndex;
            return (
              <div
                key={i}
                className={`p-4 rounded-xl border flex flex-col gap-1 shadow-md transition transform hover:scale-[1.02] ${
                  isCorrect ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"
                }`}
              >
                <div
                  className="font-semibold text-lg"
                  dangerouslySetInnerHTML={{ __html: q.question }}
                />
                <p className="text-sm">
                  Your:{" "}
                  <span
                    className={isCorrect ? "text-green-300 font-medium" : "text-red-400 font-medium"}
                    dangerouslySetInnerHTML={{ __html: userText }}
                  />
                </p>
                {!isCorrect && (
                  <p className="text-sm">
                    Correct:{" "}
                    <span className="text-green-300 font-medium" dangerouslySetInnerHTML={{ __html: correctText }} />
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-4">
          <Link
            to="/quiz"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform font-semibold shadow-lg"
          >
            Retry
          </Link>
          <Link
            to="/highscores"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 transition transform font-semibold shadow-lg"
          >
            View High Scores
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-slate-600 hover:scale-105 transition transform font-semibold shadow-lg"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
