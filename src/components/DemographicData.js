import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { PartisanData } from './PartisanData';
import { RacialData } from './RacialData';

export const DemographicData= (props) => {
    const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
    const [demoData, setDemoData] = useState([]);
    const [partisanData, setPartisanData] = useState([]);
    const [racialData, setRacialData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [educationData, setEducationData] = useState([]);

        const [panel1, setPanel1] = useState("Partisan Split Data");
        const [panel2, setPanel2] = useState("Racial Makeup Data");
        const [panel3, setPanel3] = useState("Income Data");
        const [panel4, setPanel4] = useState("Education Data");
        const [expanded, setExpanded] = useState(false);
        const handleChange = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

        let accordionContent = {
            "Partisan Split": panel1,
            "Racial Makeup": panel2,
            "Income": panel3,
            "Education": panel4,
        };

        // request data
        axios.get(`https://redistricting-fever.herokuapp.com/districtDemographics`, {params: {
          planId: props.planId
        }})
          .then(res => {
            setDemoData(res.data);
            setPartisanData(res.data.partisan);
            setRacialData(res.data.racial);
            setIncomeData(res.data.income);
            setEducationData(res.data.eduacation);
          })
          .catch ((Error) => {
            setNullDataMsg(<p>Data Failed to Load.</p>);
          })

    return(<div>
        <div>
          <Accordion key="Partisan Split">
            <AccordionSummary>Partisan Split</AccordionSummary>
            <AccordionDetails>
                <PartisanData planId={props.planId} data={partisanData}/>
            </AccordionDetails>
          </Accordion>
          <Accordion key="Racial Makeup">
            <AccordionSummary>Racial Makeup</AccordionSummary>
            <AccordionDetails>
                <RacialData planId={props.planId} data={racialData}/>
            </AccordionDetails>
          </Accordion>
          {/*
          <Accordion key="Income">
            <AccordionSummary>Income</AccordionSummary>
            <AccordionDetails>
                <IncomeData planId={props.planId} data={incomeData}/>
            </AccordionDetails>
          </Accordion>
          <Accordion key="Education">
            <AccordionSummary>Education</AccordionSummary>
            <AccordionDetails>
                <educationData planId={props.planId} data={educationData}/>
            </AccordionDetails>
          </Accordion>
         */}
    </div>
    </div>
    );
}   