import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export const Measures2 = () => {

  const [panel1, setPanel1] = useState("Polsby Popper");
  const [panel2, setPanel2] = useState("Efficiiency Gap");

  let accordionContent = {
    "Polsby Popper": panel1,
    "Efficiency Gap": panel2,
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