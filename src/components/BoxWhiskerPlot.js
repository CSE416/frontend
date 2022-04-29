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
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
import { stepLabelClasses } from '@mui/material';

function randomValues(count, min, max) {
    const delta = max - min;
    return Array.from({ length: count }).map(() => Math.random() * delta + min);
  }

  const boxplotData = {
    // define label tree
    //labels: ["District1", "District2", "District3"],
    // datasets: [
    //   {
    //     label: "District 1",
    //     backgroundColor: "rgba(255,0,0,0.5)",
    //     borderColor: "red",
    //     borderWidth: 1,
    //     outlierColor: "#999999",
    //     padding: 10,
    //     itemRadius: 5,
    //     data: [
    //       randomValues(100, 0, 100),
    //       randomValues(100, 0, 20),
    //       randomValues(100, 20, 70),
    //       randomValues(100, 60, 100),
    //       randomValues(40, 50, 100),
    //       randomValues(100, 60, 120),
    //       randomValues(100, 80, 100)
    //     ]
    //   }
    // ]
  };

export const BoxWhiskerPlots = (props) => {
    const [data, setData] = useState(null)
    const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
    const [plotLabel, setPlotLabel] = useState(null)

  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/boxWhiskerPlot`, {params: {
      stateId: props.stateFipsId,
      category: props.category
    }})
      .then(res => {
        setPlotLabel(res.data.districtNum);
        setData(res.data);
      }) 
      .catch ((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);

    return(<div>
        {(data)?( <div>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="boxWhiskerCat">Age</InputLabel>
                    <Select
                    id="boxWhiskerCategory"
                    value={plotLabel}
                    label="category"
                    >
                    <MenuItem value={10}>African American population</MenuItem>
                    <MenuItem value={10}>Asian population</MenuItem>
                    <MenuItem value={10}>Hispanic population</MenuItem>
                    <MenuItem value={20}>Democratic population percent </MenuItem>
                    <MenuItem value={30}>Republican population percent</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <canvas>

            </canvas>
        </div>
        ): nullDataMsg}
    </div>
    );
};