import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import HSBar from "react-horizontal-stacked-bar-chart";
import { Typography } from '@mui/material';
export const Measures = () => {

  const [panel1, setPanel1] = useState("Partisan Split Data");
  const [panel2, setPanel2] = useState("Racial Makeup Data");
  const [panel3, setPanel3] = useState("Income Data");
  const [panel4, setPanel4] = useState("Education Data");

  let accordionContent = {
    "Partisan Split": panel1,
    "Racial Makeup": panel2,
    "Income": panel3,
    "Education": panel4,
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/measures`, {params: {
  //     name: "measures"
  //   }})
  //     .then(res => {
  //       setPanel1(res.data);
  //     })
  //     .catch ((Error) => {
  //       alert(Error);
  //     })
  // }, []);

  return (
    <div>
      {Object.keys(accordionContent).map((title) => {
        return (
          <Accordion
            key={title}
            expanded={expanded === title}
            onChange={handleChange(title)}
          >
            <AccordionSummary id={title}>{title}</AccordionSummary>
            <AccordionDetails>{accordionContent[title]}
              <div>
                <div style={{display: 'flex', flexDirection: 'row' }}>
                <Typography>District 1</Typography>
                <HSBar width={100}
                data={[
                  { value: 1000, color: '#ff80ab' },
                  { value: 5000, description: "5.000", color: "#66bb6a" },
                  { value: 3000, description: "3.000", color: "#ffee58" },
                  { value: 2000, description: "3.000", color: "#ff8a80" },
                  { value: 500, description: "3.000", color: "#5b7bb2" },
                  { value: 300, description: "3.000", color: "#9778ce" }
                ]} />
                </div>

                <div style={{display: 'flex', flexDirection: 'row' }}>
                <Typography>District 2</Typography>
                <HSBar width={100}
                data={[
                  { value: 3000, color: '#ff80ab' },
                  { value: 800, description: "5.000", color: "#66bb6a" },
                  { value: 3000, description: "3.000", color: "#ffee58" },
                  { value: 1000, description: "3.000", color: "#ff8a80" },
                  { value: 1000, description: "3.000", color: "#5b7bb2" },
                  { value: 300, description: "3.000", color: "#9778ce" }
                ]} />
                </div>

                <div style={{display: 'flex', flexDirection: 'row' }}>
                <Typography>District 3</Typography>
                <HSBar width={50}
                data={[
                  { value: 2500, color: '#ff80ab' },
                  { value: 3000, description: "5.000", color: "#66bb6a" },
                  { value: 900, description: "3.000", color: "#ffee58" },
                  { value: 2000, description: "3.000", color: "#ff8a80" },
                  { value: 2000, description: "3.000", color: "#5b7bb2" },
                  { value: 800, description: "3.000", color: "#9778ce" }
                ]} />
                </div>

                <div style={{display: 'flex', flexDirection: 'row' }}>
                <Typography>District 4</Typography>
                <HSBar width={100}
                data={[
                  { value: 1800, color: '#ff80ab' },
                  { value: 2000, description: "5.000", color: "#66bb6a" },
                  { value: 1000, description: "3.000", color: "#ffee58" },
                  { value: 5000, description: "3.000", color: "#ff8a80" },
                  { value: 500, description: "3.000", color: "#5b7bb2" },
                  { value: 1000, description: "3.000", color: "#9778ce" }
                ]} />
                </div>
                
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}