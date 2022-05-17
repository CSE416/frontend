import React, { useState, useEffect } from "react";
import axios from "axios";

import createPlotlyComponent from "react-plotly.js/factory";
import { borderColor } from "@mui/system";
import dummyData from "./ensemble_summary.json";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const SeaWulfPlot = (props) => {
  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
  const [data, setData] = useState(null);
  const [selectedHist, setSelectedHist] = useState("Seats");

  const barCharts = [
    "Seats",
    "Split Counties",
    "Majority Minority Districts",
    "Influence Districts",
    "Coalition Districts",
  ];

  const optionsDict = {
    Seats: "seats",
    "Split Counties": "splitCounties",
    "Majority Minority Districts": "majMinDistricts",
    "Influence Districts": "influenceDistricts",
    "Coalition Districts": "coalitionDistricts",
    "Polsby Popper": "polsbyPopper",
    "Partisan Bias": "partisanBias",
    Symmetry: "symmetry",
    Responsiveness: "responsiveness",
  };

  useEffect(() => {
    axios
      .get(`localhost:8080/seawulfHistograms`, {
        params: {
          stateFipsId: props.stateId,
        },
      })
      .then((res) => {
        setData(dummyData);
      })
      .catch((error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      });
  }, []);

  const constructPlotData = (dataObj) => {
    let res = [];

    if (selectedHist == "Split Counties") {
      let xRange = Object.keys(dataObj).sort();
      let yRange = [];
      xRange.forEach((x, i) => {
        yRange.push(dataObj[x]);
      });
      let trace = {
        x: xRange,
        y: yRange,
        type: "bar",
        name: selectedHist,
      };

      res.push(trace);
    } else if (dataObj["bins"]) {
      dataObj["counts"].push(0); //display purposes
      let trace = {
        x: dataObj["bins"],
        y: dataObj["counts"],
        type: "bar",
        name: selectedHist,
        offset: 0,
      };

      res.push(trace);
    } else if (Array.isArray(dataObj)) {
      let xRange = [...Array(dataObj.length).keys()];
      let trace = {
        x: xRange,
        y: dataObj,
        type: "bar",
        name: selectedHist,
      };

      res.push(trace);
    } else {
      let xRange = [...Array(dataObj[Object.keys(dataObj)[0]].length).keys()];

      for (let category in dataObj) {
        let trace = {
          x: xRange,
          y: dataObj[category],
          type: "bar",
          name: category,
        };

        res.push(trace);
      }
    }

    return res;
  };

  let xaxis = {
    title: {
      text: `${selectedHist}`,
      font: {
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
    type: "category",
  };
  let yaxis = {
    title: {
      text: "Number of SeaWulf Generated Plans",
      font: {
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
  };

  const handleClick = (e) => {
    setSelectedHist(e.target.innerHTML);
    // props.handleChangeDemoCategory(e);
  };

  return (
    <div style={{ flex: 1, alignContent: "center" }}>
      {data ? (
        <>
          <div className="category-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="ensemble-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedHist}
            </button>
            <div className="dropdown-menu">
              {Object.keys(optionsDict).map((histType) => {
                return (
                  <button
                    key={histType}
                    className="dropdown-item"
                    type="button"
                    onClick={handleClick}
                  >
                    {histType}
                  </button>
                );
              })}
            </div>
          </div>
          <div></div>
          <Plot
            data={constructPlotData(dummyData[optionsDict[selectedHist]])}
            config={{
              scrollZoom: true,
              editable: false,
              displayModeBar: false,
              responsive: true,
            }}
            layout={{
              margin: {
                t: "1em",
                r: "1em",
              },
              width: 600,
              title: selectedHist,
              xaxis: xaxis,
              yaxis: yaxis,
              bargap: barCharts.includes(selectedHist) ? 0.5 : 0,
              hovermode: true,
            }}
          />
        </>
      ) : (
        nullDataMsg
      )}
    </div>
  );
};
