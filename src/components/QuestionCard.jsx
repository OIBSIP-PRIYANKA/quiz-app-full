import React from 'react'

export default function QuestionCard({ q, idx, selected, locked, onSelect }){
  return (
    <div className="card" role="group" aria-labelledby={`q-${idx}`}>
      <h2 id={`q-${idx}`} dangerouslySetInnerHTML={{ __html: q.question }} />
      <div className="options">
        {q.options.map((opt, i) => {
          const key = `${idx}-${i}`
          const isSel = selected === i
          const classes = ['option']
          if(isSel) classes.push('selected')
          if(locked){
            if(q.answerIndex === i) classes.push('correct')
            else if(isSel) classes.push('incorrect')
          }
          return (
            <button
              key={key}
              className={classes.join(' ')}
              onClick={() => onSelect(i)}
              disabled={locked}
              aria-pressed={isSel}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          )
        })}
      </div>
    </div>
  )
}