import React, { useState, useEffect } from 'react';
import axios from 'axios';

import createPlotlyComponent from "react-plotly.js/factory";
import { borderColor } from '@mui/system';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const SeaWulfPlot = (props) => {
  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://redistricting-fever.herokuapp.com/seawulfHistograms`, {
        params: {
          stateFipsId: props.stateId,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

var x = [];
for (var i = 0; i < 500; i ++) {
	x[i] = Math.random();
}

var trace = {
    x: x,
    type: 'histogram',
    
    xaxis: {
        linecolor: 'black',
        linewidth: 2,
        mirror: true
      },
      yaxis: {
        linecolor: 'black',
        linewidth: 2,
        mirror: true
      },
      plot_bgcolor: '#fff',
      paper_bgcolor: '#eee'
  };
var dummydata = [trace];

const layout = {
    xaxis: {
      linecolor: 'black',
      linewidth: 2,
      mirror: true
    },
    yaxis: {
      linecolor: 'black',
      linewidth: 2,
      mirror: true
    },
    plot_bgcolor: '#fff',
    paper_bgcolor: '#eee'
  }

return(
<div style={{flex:1, alignContent:'center'}}>
        <Plot data={dummydata}/>
    </div>
    );
};

//export default SeaWulfPlot;