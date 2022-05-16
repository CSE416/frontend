import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlanComparisonCard } from './PlanComparisonCard';
import Paper from '@mui/material/Paper';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { textAlign } from '@mui/system';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// const StyledMenu = styled((props) => (
//   <Menu
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center"
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right"
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 10,
//     marginTop: theme.spacing(1),
//     minWidth: 150,
//     color:
//       theme.palette.mode = "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
//   }
// }));

// const themeTable = createTheme({
//   overrides: {
//     MuiTableBody: {
//       root: {  //This can be referred from Material UI API documentation. 
//         padding: 'none',

//       },
//     },
//   },
// });


export const StatePlans = (props) => {
  // get planSummary cards for all the districting plans of the state
  const [nullDataMsg, setNullDataMsg] = useState(<p> </p>);
  const [planData, setPlanData] = useState(null);
  const [checkStatus, setCheckStatus] = useState(null);

  const [compare, setCompare] = useState(false);
  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/getAllPlans`, {
      params: {
        stateFipsId: props.stateFipsId
      }
    })
      .then(res => {
        setPlanData(res.data);

        props.setPlanName(res.data[0].planName);
        props.setPlanStatus(res.data[0].planStatus);
        props.setPlanId(res.data[0].planId);

        props.setDefaultPlan({
          defaultPlanId: res.data[0].planId,
          defaultPlanName: res.data[0].planName,
          defaultPlanStatus: res.data[0].planStatus
        })
        props.setCardSelected(res.data[0].planId);
        setCheckStatus(res.data[0].planId);
        // props.setPlanLabel(
        //   [{ id: res.data[0].planId, name: res.data[0].planName, status: res.data[0].planStatus },
        //   { id: res.data[1].planId, name: res.data[1].planName, status: res.data[1].planStatus },
        //   { id: res.data[2].planId, name: res.data[2].planName, status: res.data[2].planStatus },
        //   { id: res.data[3].planId, name: res.data[3].planName, status: res.data[3].planStatus }]
        // )
        props.setPlanIdList(props.planIdList.add(res.data[0].planId));
      })
      .catch((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
      .catch((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      });
  }, []);


  const handleChangeCompare=(event)=>{
    setCompare((prev)=>!prev);
  }
  return (
    <div class="state-plans-container"
      style={{ height: '100%', margin: '10px' }}>
      {/* flexDirection: 'column', alignItems:'flex-start', */}
      {/* <div class="card-table-mode-button">
        <Button
          id="demo-customized-button"
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          style={{ textTransform: "none", alignItems: 'left' }}
        >
          {mode}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMode} disableRipple id="Card">
            Card
          </MenuItem>
          <MenuItem onClick={handleMode} disableRipple id="Table">
            Table
          </MenuItem>
        </StyledMenu>
      </div> */}

      <div stlye={{ display: 'flex', flexDirection: 'column'}}>
       
        {/* <Button variant="contained"
          size="small"
          sx={{ maxHeight: '2rem', my: '1em', textTransform: "none" }}
          onClick={() => {
            setCompare(true);
          }}>

          Compare District Plans
        </Button> */}
         <div style={{flex:1}}>
        <FormGroup>
          <FormControlLabel control={
            <Switch
            checked={compare}
            onChange={handleChangeCompare}
            inputProps={{ 'aria-label': 'controlled' }}
          />
            } label="Compare District Plans" />
        </FormGroup>
        </div>
        <div style={{ flex: 1 }}>
        {(compare) && <div>
        
          <Button variant="contained"
            size="medium"
            sx={{
              maxHeight: '2em',
              my: '0.4em',
              mr: '2em',
              flex: 1, textTransform: "none"
            }}
            onClick={() => {
              props.setIsPlanSelected(true);
              props.setPlanId(props.planId);
              props.setPlanName(props.planName);
              props.setPlanStatus(props.planStatus);

              console.log(props.planIdList);
              console.log(props.planId);
            }}>
            Compare chosen plans
          </Button>
        </div>}</div>
      </div>


      {(planData) ? (
        <Paper class="plan-summary-card-container"
          sx={{
            height: '100%',
            width: '100%',
            overflow: "auto",
            display: "flex",
            //flexWrap: 'wrap',
            flexDirection: "row"
          }}>
          {/* <div id="card-row-1"
            style={{ flex: 1}}>  */}
          {/* <div style={{display: 'flex', flexDirection: 'row' }}> */}
          <PlanComparisonCard class='plan1'
            compare={compare}
            data={planData[0]}
            planId={planData[0].planId}
            planName={planData[0].planName}
            status={planData[0].planStatus}

            partisanLean='3.4'//{data.partisanLean}

            setIsPlanSelected={props.setIsPlanSelected}
            setPlanId={props.setPlanId}
            setPlanName={props.setPlanName}
            setPlanStatus={props.setPlanStatus}
            //setTempPlanId={props.setTempPlanId}
            cardSelected={props.cardSelected}
            setCardSelected={props.setCardSelected}
            planIdList={props.planIdList}
            setPlanIdList={props.setPlanIdList}
            checkStatus={true} />

          <PlanComparisonCard class='plan2'
            compare={compare}
            data={planData[1]}
            planId={planData[1].planId}
            planName={planData[1].planName}
            status={planData[1].planStatus}

            setIsPlanSelected={props.setIsPlanSelected}
            setPlanId={props.setPlanId}
            setPlanName={props.setPlanName}
            setPlanStatus={props.setPlanStatus}
            //setTempPlanId={props.setTempPlanId}
            cardSelected={props.cardSelected}
            setCardSelected={props.setCardSelected}
            planIdList={props.planIdList}
            setPlanIdList={props.setPlanIdList}
            checkStatus={false} />
          {/* </div> */}
          {/* </div> */}
          {/* <div id="card-row-2"
            style={{ flex: 1}}> */}
          {/* <div style={{display: 'flex', flexDirection: 'row' }}> */}
          <PlanComparisonCard class='plan3'
            compare={compare}
            data={planData[2]}
            planId={planData[2].planId}
            planName={planData[2].planName}
            status={planData[2].planStatus}

            setIsPlanSelected={props.setIsPlanSelected}
            setPlanId={props.setPlanId}
            setPlanName={props.setPlanName}
            setPlanStatus={props.setPlanStatus}
            //setTempPlanId={props.setTempPlanId}
            cardSelected={props.cardSelected}
            setCardSelected={props.setCardSelected}
            planIdList={props.planIdList}
            setPlanIdList={props.setPlanIdList}
            checkStatus={false} />

          <PlanComparisonCard class='plan4'
            compare={compare}
            data={planData[3]}
            planId={planData[3].planId}
            planName={planData[3].planName}
            status={planData[3].planStatus}

            setIsPlanSelected={props.setIsPlanSelected}
            setPlanId={props.setPlanId}
            setPlanName={props.setPlanName}
            setPlanStatus={props.setPlanStatus}
            //setTempPlanId={props.setTempPlanId}

            cardSelected={props.cardSelected}
            setCardSelected={props.setCardSelected}
            planIdList={props.planIdList}
            setPlanIdList={props.setPlanIdList}
            checkStatus={false} />
          {/* </div> */}
          {/* </div> */}
        </Paper>) : nullDataMsg}

      {/* {(planData && (mode === 'Table')) ? (
        <div class="plan-summary-table-container"
          style={{ flex: 1, width: '100%', height: '100%'}}>
          <ThemeProvider theme={themeTable}>
            <TableContainer component={Paper} sx={{ padding: "none" }}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">plan1
                      <Button size="small" sx={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                      }}
                        style={{ textTransform: "none", alignItems: 'right' }}
                        onClick={() => {
                          props.setIsPlanSelected(true); //FIX name
                          props.setPlanId(props.planId);
                          props.setPlanName(props.name);
                          props.setPlanStatus(props.status);
                        }}>Show Details <span> &#10097;</span> </Button>

                    </TableCell>
                    <TableCell align="right">plan2
                      <Button size="small" sx={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                      }}
                        style={{ textTransform: "none", alignItems: 'right' }}
                        onClick={() => {
                          props.setIsPlanSelected(true);
                          props.setPlanId(props.planId);
                          props.setPlanName(props.name);
                          props.setPlanStatus(props.status);
                        }}>Show Details <span> &#10097;</span> </Button>
                    </TableCell>
                    <TableCell align="right">plan3
                      <Button size="small" sx={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                      }}
                        style={{ textTransform: "none", alignItems: 'right' }}
                        onClick={() => {
                          props.setIsPlanSelected(true);
                          props.setPlanId(props.planId);
                          props.setPlanName(props.name);
                          props.setPlanStatus(props.status);
                        }}>Show Details <span> &#10097;</span> </Button>
                    </TableCell>
                    <TableCell align="right">Plan4
                      <Button size="small" sx={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                      }}
                        style={{ textTransform: "none", alignItems: 'right' }}
                        onClick={() => {
                          props.setIsPlanSelected(true);
                          props.setPlanId(props.planId);
                          props.setPlanName(props.name);
                          props.setPlanStatus(props.status);
                        }}>Show Details <span> &#10097;</span> </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ fontSize: '10', padding: '0.5em' }}>
                  {rows.map((row) => (
                    <TableRow key={row.tag} sx={{ border: 0 }}>
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
          </ThemeProvider>
        </div>
      ) : nullDataMsg} */}
    </div>);

}
