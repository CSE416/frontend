import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const EffVotesChart = (props) => {
  const parties = ["Democratic", "Republican"];

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getPlan`, {
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

  let demIneffVotes = {
    y: [parties[0]],
    x: [data ? data.demIneffVotes : 0],
    marker: {
      color: "#a0bdea",
    },
    name: "Democratic Inefficient Votes",
    type: "bar",
    orientation: "h",
    width: 0.5,
  };

  let demEffVotes = {
    y: [parties[0]],
    x: [data ? data.demEffVotes : 0],
    marker: {
      color: "#3141a5",
    },
    name: "Democratic Efficient Votes",
    type: "bar",
    orientation: "h",
    width: 0.5,
  };

  let repIneffVotes = {
    y: [parties[1]],
    x: [data ? data.repIneffVotes : 0],
    marker: {
      color: "#df7d74",
    },
    name: "Republican Inefficient Votes",
    type: "bar",
    orientation: "h",
    width: 0.5,
  };

  let repEffVotes = {
    y: [parties[1]],
    x: [data ? data.repEffVotes : 0],
    marker: {
      color: "#cb3927",
    },
    name: "Republican Efficient Votes",
    type: "bar",
    orientation: "h",
    width: 0.5,
  };

  const xaxis = {
    title: {
      text: "Total Votes Across Districts",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };
  
  const yaxis = {
    title: {
      text: "Parties",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };

  return (
    <div id="eff-chart-container">
      {data ? (
        <Plot
          data={[demEffVotes, demIneffVotes, repEffVotes, repIneffVotes]}
          config={{
            scrollZoom: true,
            editable: false,
            displayModeBar: false,
            responsive: true,
          }}
          layout={{
            width: 600,
            height: props.height,
            title: "Efficient and Inefficient Votes",
            barmode: "stack",
            xaxis: xaxis,
            yaxis: yaxis,
          }}
        />
      ) : (
        <p> Data cannot be loaded.</p>
      )}
    </div>
  );
};
