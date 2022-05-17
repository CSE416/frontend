import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import createPlotlyComponent from "react-plotly.js/factory";



import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const Plotly = window.Plotly;
  const Plot = createPlotlyComponent(Plotly);

export const RadarPlot = (props) => {
    const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
    const [radarData, setRadarData] = useState([4.4,4,5,6]);
    //const [layout, setLayout] = useState(null)
    //const [data, setData]
    useEffect(() => {
        axios.get(`https://redistricting-fever.herokuapp.com/radarPlot`, {params: {
        planId: props.planId
        }})
        .then(res => {
            setRadarData(res.data); 
        }) 
        .catch ((Error) => {
            setNullDataMsg(<p>Data Failed to Load.</p>);
        })
    }, []);

    // const data = {
    //     labels: ['Compactness', 'Majority-minority','Population equality', 'efficiency Gap' ],
    //     datasets: [
    //       {
    //         label: props.planName,
    //         data: radarData,
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255, 99, 132, 1)',
    //         borderWidth: 1,
    //       },
    //     ],
    //   };
    
      var value=[];
      var label=["Compactness", 
                  "efficiency Gap", 
                  "Competitive Districts",  
                  "Partisan Bias",
                  //"what"
                ];//,"numSplitCounties","populationEquality"];
      
      value.push(parseFloat(radarData["polsbyPopper"])*100);
      value.push(100-(parseFloat(radarData["efficiencyGap"])*100));
      value.push(40);//parseFloat(radarData["numCompetitiveDistricts"])); //FIX divide by the num of districts? 
      value.push(60);//parseFloat(radarData["numMajMinDistricts"])); //FIX make it  partisan bias
      value.push(60);
      //value.push(radarData["numSplitCounties"]);
      //value.push(radarData["populationEquality"]);

    const data = [{
      type: 'scatterpolar',
      r: value,
      theta: label,
      fill: 'toself',
      textposition: "top right",
      
      marker:{
        // colorbar:{
        //   ticklabeloverflow:"allow"
        // },
        //orientation: "h"
      }
    }]

    const data2 = [
      {
        type: 'scatterpolar',
        r: [39, 28, 8, 7, 28, 39],
        theta: ['A','B','C', 'D', 'E', 'A'],
        fill: 'toself'
      },
      {
        type: 'scatterpolar',
        r: [1.5, 10, 39, 31, 15, 1.5],
        theta: ['A','B','C', 'D', 'E', 'A'],
        fill: 'toself',
        name: 'Group B'
        }
    ]

    const layout = {
      autosize: false,
      width: props.width,
      height: props.height,
      margin: {
        l: 50,
        r: 50,
        b: 45,
        t: 100,
      },
      plot_bgcolor: 'none',
      polar: {
        angularaxis:{
          //color:'#aa00ff',
          rotation:45
        },
        radialaxis: {
          angle: 90,
          visible: true,
          range: [0, 100],
          griddash:"2px",
          layer:"below traces",
          linecolor: '#e0e0e0',
          showline: false,
          //showticklabels: false
          ticklabelstep: 2
         
        }
      },
      showlegend: false,
      style:{position: 'relative', display: 'inline-block'}
    }
    
  //   <Radar data={data} options={{ scales: {
  //     r: {
  //         angleLines: {
  //             display: false
  //         },
  //         suggestedMin: 3,
  //         suggestedMax: 6
  //     }
  // } }}/>
  //Plotly.newPlot("myDiv", data, layout)
    return(<div style={{flex:1, alignContent:'center'}}>
        <Plot data={data}
        layout ={layout}/>
    </div>
    );
};
