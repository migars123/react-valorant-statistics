import React from 'react'
import Match from './Match'
import './MatchHistory.css'

const MatchHistory = () => {
  return (
    <div className="matchHistory">
        <div className="matchDay">
            <Match/>
        </div>
    </div>
  )
}

export default MatchHistory