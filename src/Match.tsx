import React from 'react'
import './Match.css'

const Match = () => {
  return (
    <div className="match">
        <div className="matchLeft">
            <img src="https://titles.trackercdn.com/valorant-api/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png" alt="" className="matchAgentImg"/>
            <div className="topDownText modeNmap">
                <p>Competitive • 1d ago</p>
                <p>Sunset</p>
            </div>
            <img src="	https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/16.png" alt="" className="matchRankImg"/>
            <div className="topDownText matchScore">
                <p><span>13</span><span>:</span><span>1</span></p>
                <p className='bg-gold'>MVP</p>
            </div>
        </div>

        <div className="matchRight">
            <div className="topDownText">
                <p>K / D / A</p>
                <p>21 / 6 / 4</p>
            </div>

            <div className="topDownText">
                <p>K/D</p>
                <p className='positive'>3.5</p>
            </div>
            <div className="topDownText">
                <p>DDΔ</p>
                <p className='positive'>+171</p>
            </div>
            <div className="topDownText">
                <p>HS%</p>
                <p>35</p>
            </div>
            <div className="topDownText">
                <p>ADR</p>
                <p>277</p>
            </div>
            <div className="topDownText">
                <p>ACS</p>
                <p>419</p>
            </div>
        </div>
    </div>
  )
}

export default Match