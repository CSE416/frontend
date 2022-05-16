import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import { Typography } from "@mui/material";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const VoteSeatShare = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://redistricting-fever.herokuapp.com/voteSeatShare`, {
        params: {
          planId: props.planId,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const constructPlotData = (points) => {
    let plotData = [],
      rangeData = [],
      democraticData = [],
      republicanData = [];

    points.forEach((point) => {
      rangeData.push(100 * point[0]);
      democraticData.push(100 * point[1]);
      republicanData.push(100 * point[2]);
    });

    let democraticPlot = {
      x: rangeData,
      y: democraticData,
      type: "scatter",
      name: "Democratic Seat-Vote Share",
    };

    let republicanPlot = {
      x: rangeData,
      y: republicanData,
      type: "scatter",
      name: "Republican Seat-Vote Share",
      marker: {
        color: "#BF583F",
      },
    };

    plotData.push(democraticPlot);
    plotData.push(republicanPlot);
    return plotData;
  };

  let xaxis = {
    title: {
      text: "Vote Share",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };
  let yaxis = {
    title: {
      text: "Seat Share",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };

  return (
    <div
      id="vote-seat-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {data ? (
        <>
          <div id="vote-seat-plot" style={{ flex: 1 }}>
            <Plot
              data={constructPlotData(data.points)}
              config={{
                scrollZoom: true,
                editable: false,
                displayModeBar: false,
                responsive: true,
              }}
              layout={{
                width: props.width,
                height: props.height,
                legend: { orientation: "v" },
                xaxis: xaxis,
                yaxis: yaxis,
                margin:{
                  t:10,
                  b:30,
                  
                }
                
              }}
            />
          </div>
          <p></p>
          <div id="vote-seat-measure-container" style={{ flex: 1 }}>
            <Typography><b>Plot Data?</b></Typography>
            <Typography>Bias: {(100 * data["partisanBias"]).toFixed(2)} %</Typography>
            <Typography>Symmetry: {(100 * data["symmetry"]).toFixed(2)} %</Typography>
            <Typography>Responsiveness: {(100 * data["responsiveness"]).toFixed(2)} %</Typography>
          </div>
        </>
      ) : (
        <p> Vote Seat Share data cannot be loaded. </p>
      )}
    </div>
  );
};
