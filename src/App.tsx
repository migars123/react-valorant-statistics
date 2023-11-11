import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css'

function arrayMin(arr: number[]) { return Math.min.apply(Math, arr); };
function arrayMax(arr: number[]) { return Math.max.apply(Math, arr); };

interface CustomPoint extends Highcharts.PointOptionsObject {
  date: string;
}
type DataPoint = {
  y: number;
  date: string;
};

function App() {

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const [input, setInput] = useState([{y:27.3, date:"03/11/23, 19:29"}, {y:30.2, date:"06/11/23, 22:20"}, {y:31, date:"08/11/23, 21:40"}, {y:32.2, date:"08/11/23, 22:32"}, {y:21.2, date:"08/11/23, 23:03"}]);

  const options: Highcharts.Options = {
    title: {
        text: 'AVG HS%',
        align: 'left',
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

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const onSearch = (input: string) => {
    const username = input.split('#')[0];
    const tag = input.split('#')[1];
    fetch(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`)
         .then((res) => res.json())
         .then((res) => {
            return res.data.puuid;
         })
         .then((puuid) => {

          fetch(`https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/eu/${puuid}?size=10&mode=competitive`)
            .then((res) => res.json())
            .then((res) => {
              
              let matchData: DataPoint[] = [];
              res.data.forEach((match: any) => {
                let player = match.players.all_players.find((player: any) => player.puuid == puuid);
                
                let totalshots = player.stats.bodyshots + player.stats.headshots + player.stats.legshots;
                let headshotRate = player.stats.headshots/totalshots*100;

                let date = new Date(match.metadata.game_start * 1000);
                let dateString = date.toLocaleDateString("en-GB", dateOptions);

                matchData.push({y:+headshotRate.toFixed(1), date:dateString});
              });
              matchData = matchData.reverse();
              setInput(matchData)
            })

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
        options={options}
        ref={chartComponentRef}
      />
    </>
  );
}

export default App
