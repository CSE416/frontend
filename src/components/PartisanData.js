import React, { useState, useEffect } from 'react';
import HSBar from "react-horizontal-stacked-bar-chart";

export const PartisanData= (props) => {
    const [paritianData, setPartisanData]=useState(null);
    setPartisanData([
                    {name:"Democrats",
                    value: props.data.democrats,
                    color: "blue"},
                    {name:"Republic",
                    value: props.data.republic,
                    color: "red"}
                    ]);
    return(<div>
            <div className="App">
                <HSBar
                    height={50}
                    showTextIn
                    showTextUp
                    showTextDown
                    outlineWidth={0.5}
                    outlineColor="black"
                    fontColor="rgb(50,20,100)"
                    partisianData
                />
            </div>
     </div>);
}