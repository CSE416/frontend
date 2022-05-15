import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

export const BoxWhisker = (props) => {
  // let planData = {
  //   x: [0, 1, 2, 3],
  //   y: [0.37065, 0.47064, 0.52528, 0.67706],
  //   name: "Plan 1",
  //   type: "scatter",
  //   mode: "markers",
  //   marker: {
  //     color: "#734E46",
  //     opacity: 0.8,
  //   },
  // };

  const constructPlanDataPlot = () => {
    let xrange = [];
    let yrange = [];
    planData.forEach((district) => {
      xrange.push(district["districtId"] - 1);
      yrange.push(district["p" + category]);
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
  const [data, setData] = useState(null);
  const [planData, setPlanData] = useState(null);

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

  useEffect(() => {
    axios
      .get(`https://redistricting-fever.herokuapp.com/planDemographics`, {
        params: {
          planId: 320,
        },
      })
      .then((res) => {
        setPlanData(res.data);
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
      minArr.push(100 * (district["whislo"]));
      maxArr.push(100 * (district["whishi"]));
      medianArr.push(100 * (district["med"]));
      lowerQuartileArr.push(100 * (district["q1"]));
      upperQuartileArr.push(100 * (district["q3"]));
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
    plotData.push(constructPlanDataPlot());
    // plotData.push(planData);
    return plotData;
  };

  const handleClick = (e) => {
    setCategory(e.target.innerHTML);
    props.handleChangeDemoCategory(e);
  };

  return (
    <div id="box-whisker-container"
          style={{flex:1}}>
      {data && planData ? (
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
          <div>
          <button onClick={props.handleClickDemographics}>See Demographics</button>
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
              //autosize: true,
              margin:{
                t: '1em',
                r: '1em'
              },
              // width: '80%',
              // height: 500,
              title: "Box and Whisker Plot for Minority: " + category,
              xaxis: xaxis,
              yaxis: yaxis,
              legend:{
                orientation: 'h'
              }
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
