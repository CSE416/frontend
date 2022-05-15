import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const VoteSeatShare = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://redistricting-fever.herokuapp.com/voteSeatShare`, {
        params: {
          planId: 320,
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
      democraticData.push(point[1]);
      republicanData.push(point[2]);
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
                legend: { orientation: "h" },
                xaxis: xaxis,
                yaxis: yaxis,
              }}
            />
          </div>
          <p></p>
          <div id="vote-seat-measure-container" style={{ flex: 1 }}>
            Bias: {data["bias"]}
            Symmetry: {data["symmetry"]}
            Responsiveness: {data["responsiveness"]}
          </div>
        </>
      ) : (
        <p> Vote Seat Share data cannot be loaded. </p>
      )}
    </div>
  );
};
