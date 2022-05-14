import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import dummyData from "./results.json";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const VoteSeatShare = (props) => {
  const [data, setData] = useState(dummyData);

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
      rangeData.push(point[0]);
      republicanData.push(point[1]);
      democraticData.push(point[2]);
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
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
  };
  let yaxis = {
    title: {
      text: "Seat Share",
      font: {
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
  };

  return (
    <div id="vote-seat-container">
      <Plot
        data={constructPlotData(data.points)}
        config={{
          scrollZoom: true,
          editable: false,
          displayModeBar: false,
          responsive: true,
        }}
        layout={{
          width: 700,
          height: 500,
          title: "Vote-Seat Share Curve",
          xaxis: xaxis,
          yaxis: yaxis,
        }}
      />
      <div id="vote-seat-measure-container">
        <p>Bias: {data["bias"]}</p>
        <p>Symmetry: {data["symmetry"]}</p>
        <p>Responsiveness: {data["responsiveness"]}</p>
      </div>
    </div>
  );
};
