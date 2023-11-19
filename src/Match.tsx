import React from 'react'
import './Match.css'

interface props{
    matchType: string;
    matchTimestamp: number;
    matchMap: string;
    matchFriendlyScore: number;
    matchEnemyScore: number;
    matchPlace: number;
    matchKills: number;
    matchDeaths: number;
    matchAssists: number;
    matchDamageDealt: number;
    matchDamageReceived: number;
    matchHeadshotPer: number;
    matchScore: number;
    matchAgentImage: string;
    matchRankImage: string;
}

const timestampAgo = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const todayDate = new Date();

    const difference = (todayDate.valueOf() - date.valueOf())/1000;
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (difference < secondsInHour) {
        const minutes = Math.floor(difference / secondsInMinute);
        return `${minutes}m`;
    } else if (difference < secondsInDay) {
        const hours = Math.floor(difference / secondsInHour);
        return `${hours}h`;
    } else if (difference < secondsInMonth) {
        const days = Math.floor(difference / secondsInDay);
        return `${days}d`;
    } else if (difference < secondsInYear) {
        const months = Math.floor(difference / secondsInMonth);
        return `${months}mo`;
    } else {
        const years = Math.floor(difference / secondsInYear);
        return `${years}y`;
    }
}

//https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function classNameBadge(place: number){
    switch(place){
        case 1:
            return "bg-gold";
        case 2:
            return "bg-silver";
        case 3:
            return "bg-bronze";
        default:
            return "bg-none";
    }
}

const Match = (props: props) => {
  return (
    <div className={"match" + (props.matchFriendlyScore > props.matchEnemyScore ? " matchVictory": " matchLoss")}>
        <div className={"matchLeft" + (props.matchFriendlyScore > props.matchEnemyScore ? " matchLeftVictory": "")}>
            <img src={props.matchAgentImage} alt="" className="matchAgentImg"/>
            <div className="topDownText modeNmap">
                <p>{props.matchType} • {timestampAgo(props.matchTimestamp)} ago</p>
                <p>{props.matchMap}</p>
            </div>
            <img src={props.matchRankImage} alt="" className="matchRankImg"/>
            <div className="topDownText matchScore">
                <p><span>{props.matchFriendlyScore}</span><span>:</span><span>{props.matchEnemyScore}</span></p>
                <p className={classNameBadge(props.matchPlace)}>{props.matchPlace == 1 ? "MVP" : ordinal_suffix_of(props.matchPlace)}</p>
            </div>
        </div>

        <div className="matchRight">
            <div className="topDownText">
                <p>K / D / A</p>
                <p>{props.matchKills} / {props.matchDeaths} / {props.matchAssists}</p>
            </div>

            <div className="topDownText">
                <p>K/D</p>
                <p className={(props.matchKills/props.matchDeaths) > 1 ? "positive" : "negative"}>{(props.matchKills/props.matchDeaths).toFixed(1)}</p>
            </div>
            <div className="topDownText">
                <p>DDΔ</p>
                <p className={(props.matchDamageDealt - props.matchDamageReceived)/(props.matchFriendlyScore+props.matchEnemyScore) > 0 ? "positive" : "negative"}>{Math.round((props.matchDamageDealt - props.matchDamageReceived)/(props.matchFriendlyScore+props.matchEnemyScore))}</p>
            </div>
            <div className="topDownText">
                <p>HS%</p>
                <p>{Math.round(props.matchHeadshotPer)}</p>
            </div>
            <div className="topDownText">
                <p>ADR</p>
                <p>{Math.round((props.matchDamageDealt)/(props.matchFriendlyScore+props.matchEnemyScore))}</p>
            </div>
            <div className="topDownText">
                <p>ACS</p>
                <p>{Math.round((props.matchScore)/(props.matchFriendlyScore+props.matchEnemyScore))}</p>
            </div>
        </div>
    </div>
  )
}

export default Match