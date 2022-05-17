import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import axios from "axios";
import Button from "@mui/material/Button";
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

  const optionsDict = {
    "White": "WHITE",
    "African American": "BLACK",
    "American Indian and Alaska Native": "AIAN",
    "Asian": "ASIAN",
    "Native Hawaiian and Other Pacific Islander": "NHOPI",
    "Two or More Races": "2RACE",
    "Hispanic or Latino": "HISPANIC",
    "Democratic": "DEM",
    "Republican": "REP",
  };

  const constructPlanDataPlot = () => {
    let yrange = [];
    planData.forEach((district) => {
      // xrange.push(district["districtId"]);
      yrange.push(district["p" + optionsDict[category]]);
    });

    let planDataPlot = {
      x: Array.from({ length: planData.length }, (_, i) => i + 1),
      y: yrange.sort((a, b) => a - b),
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

  const [category, setCategory] = useState("White");
  const [data, setData] = useState(null);
  const [planData, setPlanData] = useState(null);

  let xaxis = {
    title: {
      text: "District Id",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };
  let yaxis = {
    title: {
      text: category + "%",
      font: {
        family: "arial, monospace",
        size: 12,
        color: "black",
      },
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/boxWhisker`, {
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
      .get(`http://localhost:8080/planDemographics`, {
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
      minArr.push(100 * district["whislo"]);
      maxArr.push(100 * district["whishi"]);
      medianArr.push(100 * district["med"]);
      lowerQuartileArr.push(100 * district["q1"]);
      upperQuartileArr.push(100 * district["q3"]);
    });

    let boxTrace = {
      q1: lowerQuartileArr,
      q3: upperQuartileArr,
      median: medianArr,
      lowerfence: minArr,
      upperfence: maxArr,
      name: "Recom Ensemble",
      type: "box",
      x: Array.from({ length: districts.length }, (_, i) => i + 1),
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
  
  useEffect(() => {
    console.log(category);
  }, [category])

  return (
    <div id="box-whisker-container" style={{ flex: 1 }}>
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
              {Object.keys(optionsDict).map((category) => {
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
            {/* <button onClick={props.handleClickDemographics}>See Demographics</button> */}
            <Button
              variant="contained"
              size="medium"
              sx={{ m: "1em", textTransform: "none" }} // maxHeight: '2rem',
              onClick={props.handleClickDemographics}
            >
              {props.showDemographics
                ? "Hide Demographics"
                : "Show Demographics"}
            </Button>
          </div>

          <Plot
            data={constructPlotData(data[optionsDict[category]])}
            config={{
              scrollZoom: true,
              editable: false,
              displayModeBar: false,
              responsive: true,
            }}
            layout={{
              //autosize: true,
              margin: {
                t: "1em",
                r: "1em",
              },
              // width: '80%',
              // height: 500,
              title: "Box and Whisker Plot for Minority: " + category,
              xaxis: xaxis,
              yaxis: yaxis,
              legend: {
                orientation: "v",
              },
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
