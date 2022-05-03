import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(summary, values) {
  return { summary, values };
}
export const PlanSummary = (props) => {
  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
  const [data, setData] = useState(null);

  // const dummyPlanSummary = {
  //   plan_name : "Republic Plan",
  //   proposed_by: "Nevada Republicans",
  //   proposed_date: new Date("11/13/2021"),
  //   status: "Tabled",
  //   num_of_districts: 4,
  //   district_num_change: 0,
  //   num_of_competitve_districts: 0,
  //   num_of_split_counties: 0,
  //   partisan_lean: 0,
  //   population_equality: 0.02
  // };

  //data = dummyPlanSummary;
  //props.setPlanName("Democratic Plan");
const rows=[];
  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/planSummary`, {params: {
      planId:props.planId
    }})
      .then(res => {
        setData(res.data);
        
        props.setPlanName(res.data.planName);
        rows = [
    
          createData("Proposed By",res.data.proposedBy),
          createData("Proposed Date",data.proposedDate),
          createData("Status",data.planStatus),
          createData("Number of Districts", data.numOfDistricts),
          createData("Change in Number of Districts", data.districNnumChange),
          createData("Number of Competitive Districts",data.numOfCompetitiveDistricts),
          createData("Number of Split Counties",data.numSplitCounties),
          createData("Partisan Lean",data.partisanLean),
          createData("Population Equality",data.populationEquality)
        ];
      }) 
      .catch ((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);

 
  
    
  return (
    <div>
      {(data) ? (
        <div id="plan-summary-container">
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 300 }} aria-label="simple table"> 
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ border: 0 }}>
                    <TableCell component="th" scope="row">
                      {row.summary}
                    </TableCell>
                    <TableCell align="right">{row.values}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        <p>Plan Name: <span className='plan-summary-data'>{data.planName}</span></p>
        <p>Proposed By: <span className='plan-summary-data'>{data.proposedBy}</span></p>
        <p>Proposed Date: <span className='plan-summary-data'>{data.proposedDate}</span></p>
        <p>Status: <span className='plan-summary-data'>{data.planStatus}</span></p>
        <p>Number of Districts: <span className='plan-summary-data'>{data.numDistricts}</span></p>
        <p>Change in Number of Districts: <span className='plan-summary-data'>{data.districNumChange}</span></p>
        <p>Number of Competitive Districts: <span className='plan-summary-data'>{data.numCompetitiveDistricts}</span></p>
        <p>Number of Split Counties: <span className='plan-summary-data'>{data.numSplitCounties}</span></p>
        <p>Partisan Lean: <span className='plan-summary-data'>{data.partisanLean}</span></p>
        <p>Population Equality: <span className='plan-summary-data'>{data.populationEquality}</span></p>
        </div>
      ) : nullDataMsg}
    </div>
  );
}