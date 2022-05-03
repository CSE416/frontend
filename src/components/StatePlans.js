import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlanComparisonCard } from './PlanComparisonCard';
import Paper from '@mui/material/Paper';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export const StatePlans= (props) => {
 // get planSummary cards for all the districting plans of the state
 const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
 const [plan1, setPlan1] = useState(null);
 const [plan2, setPlan2] = useState(null);
 const [plan2Name, setPlan2Name] = useState(null);
 const [plan2Status, setPlan2Status] = useState(null);
 const [plan3, setPlan3] = useState(null);
 const [plan3Name, setPlan3Name] = useState(null);
 const [plan3Status, setPlan3Status] = useState(null);
 const [plan4, setPlan4] = useState(null);
 const [plan4Name, setPlan4Name] = useState(null);
 const [plan4Status, setPlan4Status] = useState(null);

 const [listMode, setListMode]=useState(false);

  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/tableSummary`, {params: {
      stateFipsId: props.stateFipsId
    }})
      .then(res => {
        setPlan1(res.data[0]);
        props.setPlanName(res.data[0].planName);
        props.setPlanStatus(res.data[0].planStatus);
        setPlan2(res.data[1]);
        setPlan2Name(res.data[1].planName);
        setPlan2Status(res.data[1].planStatus);
        setPlan3(res.data[2]);
        setPlan3Name(res.data[2].planName);
        setPlan3Status(res.data[2].planStatus);
        setPlan4(res.data[3]);
        setPlan4Name(res.data[3].planName);
        setPlan4Status(res.data[3].planStatus);
      }) 
      .catch ((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);
  
  

  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function createData(tag, value1,value2,value3,value4) {
    return { tag, value1, value2, value3, value4 };
  }

  const rows = [
    
    createData("plan No.", "plan1", "plan2", "plan3", "plan4"),
    createData("Status","INLITIGATION", "PROPOSED","PROPOSED","PROPOSED"),
  
    createData("Number of Districts", "4", "4","4","4"),
    createData("Change in Number of Districts", "0","0","0","0"),
    createData("Number of Competitive Districts","2","2","1","2"),
    createData("Number of Split Counties","0","0","0","0"),
    createData("Partisan Lean", "R+1","R+1","R+2","R+1"),
    createData("Population Equality", "0.5","0.7","0.4","0.5")
  ];

    return(
    <div>
      <Box sx={{ minWidth: 200, margin: '15px'}} size="small">
      <FormControl sx={{minWidth: 150}} >
        <InputLabel id="demo-simple-select-label">List View</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="List View"
          onChange={handleChange}
        >
          <MenuItem value={10}>card list</MenuItem>
          <MenuItem value={20}>table list</MenuItem>
        </Select>
      </FormControl>
    </Box>

        {(plan1 && (age==10)) ? (  
        <Paper style={{maxHeight: 550, overflow: 'auto'}}>
            <PlanComparisonCard 
              planId ={props.stateFipsId + '0'}
              name={plan1.planName}
              status={plan1.planStatus}
              proposedBy='SC house'//{data.proposedBy}
              partisanLean='3.4'//{data.partisanLean}
              populationEquality='0.5'//{data.populationEquality}
              popularVote='0.1, 2.2'
              seatShare='3'
              polsbyPopper='3.3'
              numOfMajMinDistricts='2'
              setIsPlanSelected={props.setIsPlanSelected} 
              setPlanId={props.setPlanId}
              setPlanName={props.setPlanName}
              setPlanStatus={props.setPlanStatus}  /> 
          
          <PlanComparisonCard 
               planId ={props.stateFipsId + '1'}
              name={plan2Name}
              status={plan2Status}
              proposedBy='SC house'//{data.proposedBy}
              partisanLean='3.4'//{data.partisanLean}
              populationEquality='0.5'//{data.populationEquality}
              popularVote='0.1, 2.2'
              seatShare='3'
              polsbyPopper='3.3'
              numOfMajMinDistricts='2'
              setIsPlanSelected={props.setIsPlanSelected} 
              setPlanId={props.setPlanId}
              setPlanName={props.setPlanName}
              setPlanStatus={props.setPlanStatus} /> 

          <PlanComparisonCard  
          planId ={props.stateFipsId + '2'}
              name={plan3Name}
              status={plan3Status}
              proposedBy='SC house'//{data.proposedBy}
              partisanLean='3.4'//{data.partisanLean}
              populationEquality='0.5'//{data.populationEquality}
              popularVote='0.1, 2.2'
              seatShare='3'
              polsbyPopper='3.3'
              numOfMajMinDistricts='2'
              setIsPlanSelected={props.setIsPlanSelected} 
              setPlanId={props.setPlanId}
              setPlanName={props.setPlanName}
              setPlanStatus={props.setPlanStatus}  /> 

          <PlanComparisonCard 
          planId ={props.stateFipsId + '3'}
              name={plan4Name}
              status={plan4Status}
              proposedBy='SC house'//{data.proposedBy}
              partisanLean='3.4'//{data.partisanLean}
              populationEquality='0.5'//{data.populationEquality}
              popularVote='0.1, 2.2'
              seatShare='3'
              polsbyPopper='3.3'
              numOfMajMinDistricts='2'
              setIsPlanSelected={props.setIsPlanSelected} 
              setPlanId={props.setPlanId}
              setPlanName={props.setPlanName} 
              setPlanStatus={props.setPlanStatus} /> 
        
          </Paper>) : nullDataMsg}

          {(plan1 && (age==20))? (
            <div style={{maxHeight: 600, overflow: 'auto'}}>
              <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 600 }} aria-label="simple table"> 
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.tag}
                    sx={{ border: 0 }}>
                    <TableCell component="th" scope="row">
                      {row.tag}
                    </TableCell>
                    <TableCell align="right">{row.value1}</TableCell>
                    <TableCell align="right">{row.value2}</TableCell>
                    <TableCell align="right">{row.value3}</TableCell>
                    <TableCell align="right">{row.value4}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </div>
          ) : nullDataMsg}
    </div>);

}