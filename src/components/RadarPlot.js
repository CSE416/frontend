import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
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

const RadarPlot = (props) => {
    const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
    const [radarData, setRadarData] = useState([5,4,5,6]);

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

    const data = {
        labels: ['Compactness', 'Majority-minority','Population equality', 'efficiency Gap' ],
        datasets: [
          {
            label: props.planName,
            data: radarData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

    return(<div>
        <Radar data={data} options={{ scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 3,
            suggestedMax: 6
        }
    } }}/>
    </div>
    );
};
export default RadarPlot;