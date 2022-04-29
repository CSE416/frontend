import React, { useState, useEffect } from 'react';
import HSBar from "react-horizontal-stacked-bar-chart";

export const RacialData= (props) => {
    const [demoData, setDemoData] = useState([]);
    useEffect(()=>{
      props.data.forEach(district =>{
        setDemoData([...demoData, {name:"African American",
                  value: district.africanAmerian,
                  color: "yellow"},
                  {name:"Hispanic",
                  value: district.hispanic,
                  color: "green"},
                  {name:"Asian",
                  value: district.asian,
                  color: "blue"},
                  {name:"American Indian",
                  value: district.americanIndian,
                  color: "pink"},
                  {name:"White",
                  value: district.white,
                  color: "purple"},
                  {name:"Mixed",
                  value: district.mixed,
                  color: "red"}]);
      })
    },[]);
    return(
          <div>
              {Object.keys(demoData).map((districtData) => {
                // Map each district racial data into a stacked-horizontal bar
                <HSBar
                height={50}
                showTextIn
                showTextUp
                showTextDown
                outlineWidth={0.5}
                outlineColor="black"
                fontColor="rgb(50,20,100)"
                districtData
                />
              })}
          </div>
       );
}