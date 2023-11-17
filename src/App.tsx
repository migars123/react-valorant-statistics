import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import MatchHistory from './MatchHistory';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
import './App.css'

function arrayMin(arr: number[]) { return Math.min.apply(Math, arr); };
function arrayMax(arr: number[]) { return Math.max.apply(Math, arr); };
function roleColor(role: string){
  switch(role){
    case "Duelist":
      return "#0fdbd8";
    case "Controller":
      return "#4638c7";
    case "Sentinel":
      return "#d1a815";
    case "Initiator":
      return "#67d611";
    default:
      return "#ffffff";
  }
}

interface CustomPoint extends Highcharts.PointOptionsObject {
  date: string;
}
type DataPoint = {
  y: number;
  date: string;
};
type PackedBubbleData = {
  name: string;
  color: string,
  marker: {
    fillColor: string
  },
  data: ({
      name: string;
      value: number;
  })[];
}[];

function App() {

  const agentsAPI = useRef<any>([]);

   useEffect(() => {
      fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            agentsAPI.current = data;
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  const [agentData, setAgentData] = useState([{
    name: 'Duelist',
    color: "#0fdbd8",
    marker: {
      fillColor: "#0fdbd8"
    },
    data: [{
      name: 'Jett',
      value: 4
    }, {
      
    }, {
      name: 'Reyna',
      value: 2
    }, {
      name: 'Iso',
      value: 1
    }]
  }, {
    name: 'Controller',
    color: "#4638c7",
    marker: {
      fillColor: "#4638c7"
    },
    data: [{
      name: 'Omen',
      value: 3
    }, {
      
    }, {
      name: 'Astra',
      value: 2,
    }]
  }, {
    name: 'Initiator',
    color: "#67d611",
    marker: {
      fillColor: "#67d611"
    },
    data: [{
      name: 'Skye',
      value: 5
    }, {
      
    }, {
      name: 'Breach',
      value: 3
    }]
  }]);

  const [input, setInput] = useState([{y:27.3, date:"03/11/23, 19:29"}, {y:30.2, date:"06/11/23, 22:20"}, {y:31, date:"08/11/23, 21:40"}, {y:32.2, date:"08/11/23, 22:32"}, {y:21.2, date:"08/11/23, 23:03"}]);

  const areaOptions: Highcharts.Options = {
    title: {
        text: 'AVG HS%',
        align: 'center',
        style: {
          color: '#ffffff',
          fontSize: "3em"
        },
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: undefined
      },
      labels: {
        style: {
          color: "#99ABBF",
          fontSize: "1.5em"
        }
      },

      tickInterval: 10,

      min: arrayMin(input.map(i => i.y)),
      max: arrayMax(input.map(i => i.y)),
      startOnTick: true,
      endOnTick: true
    },
    chart: {
      type: 'area',
      backgroundColor:'transparent',
      height: "50%",
      width:900
   },
   tooltip: {
    backgroundColor: "#1b2733",
    shadow: false,
    style: {
      color: "#ffffff"
    },
    formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
      var point = this.point.options as CustomPoint;
      return '<span style="font-size:1.5em"><b>' + this.y?.toFixed(1) + '%</b> HS</span> <br> <span style="color:#99ABBF; font-size:1.25em">' + point.date + '</span>';
    }
    
  },
   credits: { enabled: false },
   legend:{ enabled:false },
    plotOptions: {
      area: {
        marker: {
          enabled: false
        },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
              [0, 'rgb(194, 19, 19, 0.5)'], // start
              [1, 'rgb(194, 19, 19, 0)'] // end
          ]
        },
        lineColor: 'rgb(194, 19, 19)'
      },
      
      series: {
          lineWidth: 5
      }
    },
    series: [{
        type: 'area',
        data: input
    }]
  };

  const bubbleOptions: Highcharts.Options = {
    title: {
        text: 'Played Agents',
        align: 'center',
        style: {
          color: '#ffffff',
          fontSize: "3em"
        },
    },
    chart: {
      type: 'packedbubble',
      height: '100%',
      backgroundColor:'transparent',
    },
    credits: { enabled: false },
    legend:{ enabled:false },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} ' + '{#if (eq 1 point.value)}game{else}games{/if}'
  },
  plotOptions: {
      packedbubble: {
          minSize: '30%',
          maxSize: '120%',
          layoutAlgorithm: {
              splitSeries: false,
              gravitationalConstant: 0.02
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: {
                  color: 'white',
                  textOutline: 'none',
                  fontWeight: 'normal',
                  fontSize: "1rem"
              }
          }
      }
    },
    series: agentData as any
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  function applyAgentData(playedAgents: string[]){

    let newAgents: PackedBubbleData = [];

    playedAgents.forEach((agent) => {
      let agentInfo = agentsAPI.current.data.find((currAgentInfo: any) => currAgentInfo.displayName.toLocaleLowerCase() == agent.toLocaleLowerCase());
      if(!newAgents.find(index => index.name == agentInfo.role.displayName)){
        let color = roleColor(agentInfo.role.displayName);
        newAgents.push({
          name: agentInfo.role.displayName,
          color: color,
          marker: {
            fillColor: color
          },
          data: []
        })
      }
      if(!newAgents.find(index => index.name == agentInfo.role.displayName)?.data.find(currAgent => currAgent.name == agentInfo.displayName)){
        newAgents.find(index => index.name == agentInfo.role.displayName)?.data.push({
          name: agentInfo.displayName,
          value: 0
        })
      }

      newAgents.find(index => index.name == agentInfo.role.displayName)!.data.find(currAgent => currAgent.name == agentInfo.displayName)!.value++

    })
    setAgentData(newAgents);
  }

  const onSearch = (input: string) => {
    
    const username = input.split('#')[0];
    const tag = input.split('#')[1];
    console.log("searching...")
    fetch(`https://valorantstatsapi.migars.repl.co/stats/${username}/${tag}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let matchData: DataPoint[] = [];
        let playedAgents: string[] = [];
        let uuid = res.data[0].players.all_players.find((player: any) => player.name.toLocaleLowerCase() == username.toLocaleLowerCase() && player.tag.toLocaleLowerCase() == tag.toLocaleLowerCase()).puuid;
        console.log(uuid);
        res.data.forEach((match: any) => {
          console.log("looping through matches...");
          let player = match.players.all_players.find((player: any) => player.puuid == uuid);
          
          
          let totalshots = player.stats.bodyshots + player.stats.headshots + player.stats.legshots;
          let headshotRate = player.stats.headshots/totalshots*100;

          let date = new Date(match.metadata.game_start * 1000);
          let dateString = date.toLocaleDateString("en-GB", dateOptions);

          matchData.push({y:+headshotRate.toFixed(1), date:dateString});
          playedAgents.push(player.character);
        });
        
        console.log("setting graph");
        applyAgentData(playedAgents)
        matchData = matchData.reverse();
        setInput(matchData)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div id='search-box'>
        <input
          type="text"
          placeholder="Migars#UwU"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputElement = e.target as HTMLInputElement;
              onSearch(inputElement.value);
            }
        }}
        />
        <i>
          <FontAwesomeIcon 
            className='icon' 
            icon={faMagnifyingGlass} 
            size="xl" 
            onClick={() => {
              const inputElement = document.getElementById('search-box')?.querySelector('input');
              if (inputElement instanceof HTMLInputElement) {
                onSearch(inputElement.value);
              }
            }}
           />
        </i>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={areaOptions}
        ref={chartComponentRef}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={bubbleOptions}
      />
      <MatchHistory
      />
    </>
  );
}

export default App
