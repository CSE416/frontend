import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


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
            <AccordionDetails>{accordionContent[title]}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}