import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
// import dummyData from "./placeholder.json";
import dummyData from "./ALL.json";
import planData from "./800.json";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const BoxWhisker = (props) => {
  let planData = {
    x: [0, 1, 2, 3],
    y: [0.37065, 0.47064, 0.52528, 0.67706],
    name: "Plan 1",
    type: "scatter",
    mode: "markers",
    marker: {
      color: "#734E46",
      opacity: 0.8,
    },
  };

  const constructPlanDataPlot = () => {
    let xrange = [];
    let yrange = [];
    planData.forEach((district) => {
      console.log(district);
      xrange.push(district["districtId"] - 1);
      yrange.push(district[category]);
    });
    let planDataPlot = {
      x: xrange,
      y: yrange,
      name: "Plan 1",
      type: "scatter",
      mode: "markers",
      marker: {
        color: "#734E46",
        opacity: 0.8,
      },
    };

    return planDataPlot;
  };

  const [category, setCategory] = useState("WHITE");
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

  // const constructPlotData = (districts) => {
  //   let plotData = [],
  //     minArr = [],
  //     maxArr = [],
  //     medianArr = [],
  //     lowerQuartileArr = [],
  //     upperQuartileArr = [];

  //   for (let districtId in districts) {
  //     let box = districts[districtId];
  //     minArr.push(box["min"]);
  //     maxArr.push(box["max"]);
  //     medianArr.push(box["median"]);
  //     lowerQuartileArr.push(box["lowerQuartile"]);
  //     upperQuartileArr.push(box["upperQuartile"]);
  //   }

  const constructPlotData = (districts) => {
    let plotData = [],
      minArr = [],
      maxArr = [],
      medianArr = [],
      lowerQuartileArr = [],
      upperQuartileArr = [];

    // for (let districtId in districts) {
    //   let box = districts[districtId];
    //   console.log(box);
    //   minArr.push(box["whislo"]);
    //   maxArr.push(box["whishi"]);
    //   medianArr.push(box["med"]);
    //   lowerQuartileArr.push(box["q1"]);
    //   upperQuartileArr.push(box["q3"]);
    // }

    districts.forEach((district) => {
      // console.log(district);
      minArr.push(district["whislo"]);
      maxArr.push(district["whishi"]);
      medianArr.push(district["med"]);
      lowerQuartileArr.push(district["q1"]);
      upperQuartileArr.push(district["q3"]);
    });

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
    // plotData.push(constructPlanDataPlot());
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