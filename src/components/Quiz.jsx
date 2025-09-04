import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'
import Timer from './Timer'

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple'

function useQuery(){ const { search } = useLocation(); return useMemo(() => new URLSearchParams(search), [search]) }

export default function Quiz(){
  const query = useQuery()
  const navigate = useNavigate()
  const source = (query.get('source') || 'local').toLowerCase()
  const difficulty = query.get('difficulty') || '' // easy|medium|hard
  const useTimer = query.get('timer') !== 'off'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([]) // { qIndex, selected, correctIndex }

  const total = questions.length
  const current = questions[idx]

  const normalize = useCallback((items) => items.map((it) => {
    const opts = [...it.incorrect_answers, it.correct_answer]
      .map((s) => String(s))
      .sort(() => Math.random() - 0.5)
    const answerIndex = opts.indexOf(it.correct_answer)
    return { question: it.question, options: opts, answerIndex }
  }), [])

  useEffect(() => {
    let ignore = false
    async function load(){
      try{
        setLoading(true); setError('')
        if(source === 'api'){
          const url = API_URL + (difficulty ? `&difficulty=${difficulty}` : '')
          const res = await fetch(url)
          if(!res.ok) throw new Error('Failed to fetch questions')
          const data = await res.json()
          if(data.response_code !== 0 || !Array.isArray(data.results) || data.results.length === 0){
            throw new Error('No questions returned from API')
          }
          if(!ignore) setQuestions(normalize(data.results))
        }else{
          const local = await import('../data/questions.json')
          const items = Array.isArray(local.default) ? local.default : []
          if(items.length === 0) throw new Error('Local questions.json is empty')
          // Ensure 5–10 items
          const slice = items.slice(0, Math.min(10, Math.max(5, items.length)))
          if(!ignore) setQuestions(slice)
        }
      }catch(e){
        setError(e.message || 'Error loading questions')
      }finally{
        setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [source, difficulty, normalize])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if(e.key >= '1' && e.key <= '4'){
        const i = Number(e.key) - 1
        setSelected(i)
      }else if(e.key === 'Enter'){
        handleNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const handleSelect = (i) => setSelected(i)

  const commitAnswer = () => {
    if(selected == null) return false
    const correct = current.answerIndex === selected
    setLocked(true)
    setScore((s) => s + (correct ? 1 : 0))
    setAnswers((arr) => [...arr, { qIndex: idx, selected, correctIndex: current.answerIndex }])
    return true
  }

  const handleNext = () => {
    if(loading || !current) return
    if(!locked){
      // first click locks the answer
      const ok = commitAnswer()
      if(!ok) return
      // keep it on the same screen so user can see correct/incorrect styling
      return
    }
    // already locked, go to next
    setSelected(null); setLocked(false)
    if(idx + 1 < total) setIdx(idx + 1)
    else navigate('/results', { state: { score, answers: [...answers, { qIndex: idx, selected, correctIndex: current.answerIndex }], questions } })
  }

  const handleExpire = () => {
    if(!useTimer || locked) return
    if(selected == null) setSelected(-1) // no answer
    commitAnswer()
  }

  if(loading) return <div className="card center" style={{minHeight: 200}}>Loading questions…</div>
  if(error) return <div className="card"><h2>Failed to load</h2><p>{error}</p></div>

  return (
    <div className="card">
      <div className="footer" style={{marginBottom: 16}}>
        <ProgressBar current={idx + 1} total={total} />
        <div className="row">
          <span className="badge">Score: {score}</span>
          {useTimer && <Timer seconds={30} isRunning={!locked} onExpire={handleExpire} />}
        </div>
      </div>

      <QuestionCard
        q={current}
        idx={idx}
        selected={selected}
        locked={locked}
        onSelect={handleSelect}
      />

      <div className="footer">
        <button className="btn" onClick={() => { if(idx > 0){ setIdx(idx - 1); setSelected(null); setLocked(false) }}} disabled={idx===0}>Previous</button>
        <div className="row">
          <button className="btn btn-primary" onClick={handleNext}>
            {!locked ? 'Lock Answer' : (idx + 1 < total ? 'Next' : 'Finish')}
          </button>
        </div>
      </div>
    </div>
  )
}
