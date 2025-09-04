# 📘 React Quiz App (Vite)

A production-ready, responsive Quiz App built with **React + React Router + Vite**.  
Supports loading questions from **Open Trivia DB** or a bundled **local JSON** file.

## ✨ Features
- One question per screen, 4 options
- Score tracking & detailed results page
- Progress indicator and optional timer
- Restart quiz flow
- Keyboard accessible (1–4 to select, Enter for Next/Finish)
- Mobile-responsive layout
- Router with `/` (Home), `/quiz`, `/results`

## 🚀 Quick Start
```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build && npm run preview
```

### Data Source
- **Local JSON (default):** `src/data/questions.json`
- **Open Trivia DB:** Add `?source=api` in the URL, e.g. `http://localhost:5173/quiz?source=api`
  - You can also choose difficulty via `&difficulty=easy|medium|hard`.

## 📁 Structure
```
src/
  components/
    ProgressBar.jsx
    QuestionCard.jsx
    Timer.jsx
  pages/
    Results.jsx
  data/
    questions.json
  App.jsx
  main.jsx
  styles.css
```

## 🧪 Notes
- Handles no selection (prevents Next) unless you press Skip (if enabled).
- Graceful loading/error UI when using API.
- Debounced clicks to avoid double submits.

## 🛡️ Accessibility
- Focus states, ARIA labels, keyboard shortcuts:
  - `1–4` to choose options
  - `Enter` to confirm Next/Finish
  - `R` to restart on results page
```

Happy quizzing!
