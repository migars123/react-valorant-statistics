import React from 'react'
import Match from './Match'
import * as Types  from './Types';
import './MatchHistory.css'

interface props{
  matches: Types.Data[];
  puuid: string;
}

const MatchHistory = (props: props) => {

  const getPlayer = (match: Types.Data) => {
    return match.players.all_players.find((player) => player.puuid == props.puuid)!;
  }

  const getHeadshot = (match: Types.Data) => {
    let player = getPlayer(match);

    let totalshots = player.stats.bodyshots + player!.stats.headshots + player.stats.legshots;
    return player.stats.headshots/totalshots*100;
  }

  const getPlace = (match: Types.Data) => {
    match.players.all_players.sort((playerA, playerB) => {
      return playerA.stats.score - playerB.stats.score;
    });
    match.players.all_players.reverse();
    console.log(match.players.all_players);
    return match.players.all_players.findIndex((player) => player.puuid == props.puuid) + 1;
  }

  return (
    <div className="matchHistory">
        <div className="matchDay">
          {
            props.matches.map(match => 
              <Match
                matchType={match.metadata.mode}
                matchTimestamp={match.metadata.game_start}
                matchMap={match.metadata.map}
                matchFriendlyScore={getPlayer(match).team == "Blue" ? match.teams.blue.rounds_won : match.teams.red.rounds_won}
                matchEnemyScore={getPlayer(match).team == "Blue" ? match.teams.blue.rounds_lost : match.teams.red.rounds_lost}
                matchPlace={getPlace(match)}
                matchKills={getPlayer(match).stats.kills}
                matchDeaths={getPlayer(match).stats.deaths}
                matchAssists={getPlayer(match).stats.assists}
                matchDamageDealt={getPlayer(match).damage_made}
                matchDamageReceived={getPlayer(match).damage_received}
                matchHeadshotPer={getHeadshot(match)}
                matchScore={getPlayer(match).stats.score}
                matchAgentImage={getPlayer(match).assets.agent.small}
                matchRankImage={"https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/" + getPlayer(match).currenttier + ".png"}
              />)
          }
        </div>
    </div>
  )
}

export default MatchHistory