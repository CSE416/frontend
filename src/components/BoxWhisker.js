import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import dummyData from "./placeholder.json";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const BoxWhisker = (props) => {
  let planData = {
    x: [0, 1, 2, 3, 4],
    y: [1, 1, 2, 3.5, 4.5],
    name: "Plan 1",
    type: "scatter",
    mode: "markers",
    marker: {
      color: "#734E46",
      opacity: 0.8,
    },
  };

  const [category, setCategory] = useState("Republican Population Share");
  const [data, setData] = useState(dummyData);

  let xaxis = {
    title: {
      text: "District Id",
      font: {
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
  };
  let yaxis = {
    title: {
      text: category,
      font: {
        family: "Courier New, monospace",
        size: 12,
        color: "#7f7f7f",
      },
    },
  };

  useEffect(() => {
    axios
      .get(`https://redistricting-fever.herokuapp.com/boxWhisker`, {
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

  const constructPlotData = (districts) => {
    let plotData = [],
      minArr = [],
      maxArr = [],
      medianArr = [],
      lowerQuartileArr = [],
      upperQuartileArr = [];

    for (let districtId in districts) {
      let box = districts[districtId];
      minArr.push(box["min"]);
      maxArr.push(box["max"]);
      medianArr.push(box["median"]);
      lowerQuartileArr.push(box["lowerQuartile"]);
      upperQuartileArr.push(box["upperQuartile"]);
    }

    let boxTrace = {
      q1: lowerQuartileArr,
      q3: upperQuartileArr,
      median: medianArr,
      lowerfence: minArr,
      upperfence: maxArr,
      name: "Recom Ensemble",
      type: "box",
    };

    plotData.push(boxTrace);
    plotData.push(planData);
    return plotData;
  };

  const handleClick = (e) => {
    setCategory(e.target.innerHTML);
  };

  return (
    <div id="box-whisker-container">
      {data ? (
        <>
          <div className="category-dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="box-whisker-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {category}
            </button>
            <div className="dropdown-menu">
              {Object.keys(data).map((category) => {
                return (
                  <button
                    key={category}
                    className="dropdown-item"
                    type="button"
                    onClick={handleClick}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <Plot
            data={constructPlotData(data[category])}
            config={{
              scrollZoom: true,
              editable: false,
              displayModeBar: false,
              responsive: true,
            }}
            layout={{
              width: 700,
              height: 500,
              title: category,
              xaxis: xaxis,
              yaxis: yaxis,
            }}
          />
          {/* <p style={{ clear: "both" }}>
            Average Districting for Plan 1: {calcAvgDist()}
          </p> */}
        </>
      ) : (
        <p>Box and Whisker Data failed to load.</p>
      )}
    </div>
  );
};
