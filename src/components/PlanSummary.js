import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/planSummaryTable.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';



const themeTable = createTheme({
  overrides: {
    MuiTableBody: {
      root: {  //This can be referred from Material UI API documentation. 
        padding: 'none',

      },
    },
  },
});

const theme = createTheme({
  typography: {
    fontSize: 12,
    margin: '0.5em'
  },
});
function createData(summary, values) {
  return { summary, values };
}
export const PlanSummary = (props) => {
  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
  const [data, setData] = useState(null);
  const [two, setTwo] = useState(true);
  const tempId = 0;

  const rows = [];
  useEffect(() => {

    axios.get(`http://localhost:8080/getPlan`, {
      params: {
        planId: props.planId
      }
    })
      .then(res => {
        setData(res.data);
        console.log(res.data);
        props.setPlanName(res.data.planName);

      })
      .catch((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);

  const toggleDrawer = (open) => (event) => {

  };
  function createData(tag, value1, value2) {
    return { tag, value1, value2 };
  }

  return (
    <div >
      {(data) ? (
        <div id="plan-summary-container">

          { // Single Plan detail Summary
            (props.isSingleId) && <div>
              <div id="single-title"
                style={{ margin: 1, display: 'flex', alignItems: 'flex-start', justifyContent: "flex-start" }}>
                <Box id="status-tag"
                  sx={{
                    border: '1px solid',
                    borderRadius: 1,
                    p: 0.4, px: 0.5, m: 1,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    backgroundColor: (data.planStatus == 'INLITIGATION') ? '#C5E1A5' : '#e0e0e0'
                  }}>
                  {data.planStatus}
                </Box>
                <ThemeProvider theme={theme}>
                  <Typography variant="h6" id="plan-name"
                    m={1}
                    sx={{
                      b: '0.1em', fontWeight: '700',

                    }}>
                    {data.planName}
                  </Typography>
                </ThemeProvider>
              </div>
              <div style={{ display: 'flex', flexDirection: "column" }}>
                
                <div id="single-plan-info-container"
                  style={{
                    flex: 1,
                    fontSize: '10px',
                    textAlign: 'left',
                    margin: '1em',
                    display: "flex",
                    flexDirection: "row"
                  }}>


                  <div id="single-plan-generalInfo"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography>
                      <b>Proposed By:</b> {data.proposedBy}
                    </Typography>
                    <Typography>
                      <b>Proposed Date:</b> {(data.proposedDate!=null) ? data.proposedDate.slice(0, 10): ""}
                    </Typography>
                    <Typography>
                      <b>Polsby Popper (Compactness)</b>: {data.polsbyPopper}
                    </Typography>
                    <Typography>
                      <b>Population Equality</b>: {data.populationEquality}
                    </Typography>
                    <Typography>
                      <b>Efficiency Gap</b>: {data.efficiencyGap}
                    </Typography>
                    <Typography>
                      <b>Partisan Lean:</b> Democrats +{data.partisanLean}
                    </Typography>
                  </div>
                  <div id="single-plan-districtInfo-table"
                    style={{ flex: 1 }}>
                    <Typography>
                      <b>Districts Infos:</b>
                    </Typography>
                    <table id="districtInfo">
                      <tbody>
                        <tr>
                          <td>No. of Districts</td>
                          <td>{data.numDistricts}</td>
                        </tr>
                        <tr>
                          <td>Changes in No. of Districts</td>
                          <td>{data.districtNumChange}</td>
                        </tr>
                        <tr>
                          <td>No. of Competitive Districts</td>
                          <td>{data.numCompetitiveDistricts}</td>
                        </tr>
                        <tr>
                          <td>No. of Majority-Minority Districts</td>
                          <td>{data.numMajMinDistricts}</td>
                        </tr>
                        <tr>
                          <td>No. of Influence Districts</td>
                          <td>{data.numInfluenceDistricts}</td>
                        </tr>
                        <tr>
                          <td>No. of Coalition Districts</td>
                          <td>{data.coalitionDistricts}</td>
                        </tr>
                        <tr>
                          <td>No. of Split counties</td>
                          <td>{data.numSplitCounties}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div id="single-other-info"
                    style={{ display: 'flex', flexDirection: 'row' }}>
                    
                    {/* {data.efficiencyGap}
            {data.polsbyPopper}
            {data.planId} */}

                  </div>
                </div>

                <div style={{ flex: 1 }}>
                 
                </div>
              </div>
            </div>}

          {/*for table!

        //   Object.keys(tabContent).map((title) => {
        //   return (
        //   <Tab
        //   key={title} 
        //   eventKey={title} 
        //   title={title}
        //   >
        //     {tabContent[title]}
        //   </Tab>);
        // })*/}

          { // when two plans selected: table
            !(props.isSingleId) &&
            <div style={{ flex: 1, fontSize: '10px' }}>
              <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'auto' }}>
                {/* <CompareTable/> */}
                {/* {props.planIdList.forEach((id)=>{
              tempId = id;

            })} */}
                {/* <ThemeProvider theme={themeTable}>
                  <TableContainer component={Paper} sx={{ padding: "none" }}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="right">plan1</TableCell>
                          <TableCell align="right">plan2 </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ fontSize: '10', padding: '0.5em' }}>
                        {row.map((r) => (
                          <TableRow
                            key={row.tag}
                            sx={{ border: 0 }}>
                            <TableCell component="th" scope="row">
                              {r.tag}
                            </TableCell>
                            <TableCell align="right">{r.value1}</TableCell>
                            <TableCell align="right">{r.value2}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ThemeProvider> */}
              </div>
            </div>}

          <div style={{ display: 'flex', flexDirection: 'column' }}>


          </div>
        </div>
      ) : nullDataMsg}

    </div>
  );
}