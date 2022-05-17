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
    const idList = [];
    props.planIdList.forEach(id => idList.push(id));

    useEffect(() => {
        axios.get(`http://localhost:8080/getAllPlans`, {params: {
        //planId: props.planId
          stateFipsId: props.stateFipsId  
      }})
        .then(res => {
            setRadarData(res.data); 
        }) 
        .catch ((Error) => {
            setNullDataMsg(<p>Data Failed to Load.</p>);
        })
    }, []);

    const plan1 = [];
    const plan2 = [];

    var maxPol=0;
    var minPol=1;
    for (let i=0;i<4;i++){
      if (radarData[i].polsbyPopper >= maxPol){
        maxPol=radarData[i].polsbyPopper;
      }
      if (radarData[i].polsbyPopper < minPol){
        minPol = radarData[i].polsbyPopper;
      }
    }
    maxPol = parseFloat(maxPol.toFixed(1));
    minPol = parseFloat(minPol.toFixed(1));
   var polRange=100/(maxPol-minPol);
    if (props.planIdList.size === 2) {
      let i = idList[0] % 10;
      let j = idList[1] % 10;
      let c=radarData[i].polsbyPopper;
      let val1= polRange*(c-minPol);
      plan1.push(val1);
      let c2=radarData[j].polsbyPopper;
      let val2= polRange*(c2-minPol);
      plan2.push(val2);
  } 
  
    var maxEff=0;
    var minEff=1;
    for (let i=0;i<4;i++){
      if (radarData[i].efficiencyGap >= maxEff){
        maxPol=radarData[i].efficiencyGap;
      }
      if (radarData[i].efficiencyGap < minEff){
        minPol = radarData[i].efficiencyGap;
      }
    }
    maxEff = parseFloat(maxEff.toFixed(1));
    minEff = parseFloat(minEff.toFixed(1));
   var effRange=100/(maxEff-minEff);
    if (props.planIdList.size === 2) {
      let i = idList[0] % 10;
      let j = idList[1] % 10;
      let c=radarData[i].efficiencyGap;
      let val1= effRange*(c-minEff);
      plan1.push(val1);
      let c2=radarData[j].polsbyPopper;
      let val2= effRange*(c2-minEff);
      plan2.push(val2);
  } 

  var ii = idList[0] % 10;
  var jj = idList[1] % 10;
  var iMaj = (radarData[ii].numCompetitiveDistricts / radarData[ii].numDistricts)*100;
  var jMaj = (radarData[jj].numCompetitiveDistricts / radarData[jj].numDistricts)*100;
  plan1.push(iMaj);
  plan2.push(jMaj);
  
  var icom = (radarData[ii].numMajMinDistricts / radarData[ii].numDistricts)*100;
  var jcom = (radarData[jj].numMajMinDistricts / radarData[jj].numDistricts)*100;
  plan1.push(icom);
  plan2.push(jcom);
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
    
 
      var label=["Compactness", 
                  "efficiency Gap", 
                  "Competitive Districts", 
                  "Majority-Minority Districts" 
                  //"what"
                ];//,"numSplitCounties","populationEquality"];
      
  
      //value.push(radarData["numSplitCounties"]);
      //value.push(radarData["populationEquality"]);

    // const data = [{
    //   type: 'scatterpolar',
    //   r: value,
    //   theta: label,
    //   fill: 'toself',
    //   textposition: "top right",
      
    //   marker:{
    //     // colorbar:{
    //     //   ticklabeloverflow:"allow"
    //     // },
    //     //orientation: "h"
    //   }
    // }]

    const data2 = [
      {
        type: 'scatterpolar',
        r: plan1,
        theta: label,
        fill: 'toself',
        name: radarData[ii].planName
      },
      {
        type: 'scatterpolar',
        r: plan2,
        theta: label,
        fill: 'toself',
        name: radarData[jj].planName
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
        <Plot data={data2}
        layout ={layout}/>
    </div>
    );
};
