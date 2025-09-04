import React from 'react'

export default function ProgressBar({ current, total }){
  const pct = total ? Math.round((current/total)*100) : 0
  return (
    <div>
      <div className="progress" aria-label={`Progress: ${pct}%`}>
        <div style={{ width: `${pct}%` }} />
      </div>
      <div className="small" style={{marginTop: 8}}>Question {current} of {total} • {pct}%</div>
    </div>
  )
}