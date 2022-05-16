import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import '../styles/planComparisonCard.css';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});
const theme2 = createTheme({
  typography: {
    fontSize: 10,
  },
});

const statusFormat = (status) => {
  let formated = "";
  if (status === "INLITIGATION") {
    formated = "In Litigation";
  }
  else {
    formated = "Proposed"
  };
  return formated;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PlanComparisonCard = (props) => {
  const [clicked, setClicked] = useState(false);
  const cardClicked = () => setClicked((prev) => !prev);

  const [checked, setChecked] = useState(props.checkStatus);


  const handleChange = (event) => {
    //setChecked((prev)=>!prev);

    if (!checked) {
      // add the planId to the list
      props.setPlanIdList(props.planIdList.add(props.planId));
      setChecked(event.target.checked);
    }
    else {
      // remove planId from the list
      let tempSet = new Set();
      props.planIdList.forEach(function (id) {
        if (id != props.planId) {
          tempSet.add(id);
        };
      })
      props.setPlanIdList(tempSet);
      setChecked(event.target.checked);
    };

  }

  return (<div>
    {
    console.log(props.cardSelected)}
    {console.log(props.color)
    }
    <Card class="plan-summary-card"
      align='left'
      
      sx={{
      backgroundColor: (props.cardSelected == props.color) ? '#BBDEFB' : 'white',
      borderColor: (props.cardSelected == props.color) ? '#BBDEFB' : 'black'
      }} >
      <div id="card-top"
        style={{
          display: 'flex', flexDirection: 'row',
        }}>
        <div id="card-checkbox" style={{ flex: 1 }}
        >
          <Checkbox
            {...label}
            //defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
            checked={checked}
            onChange={handleChange}
          />
        </div>
        <div id="card-title"
          style={{
            flex: 5, display: 'flex', flexDirection: 'row',
            marginTop: '0.5em', marginBottom: '0.5em', marginLeft: '0em'
          }}>
          <ThemeProvider theme={theme} >
            <Box sx={{
              border: '1px solid', borderRadius: 1, p: 0.5, m: 0.5,
              fontSize: '0.7rem',
              fontWeight: '560',
              textAlign: 'center',
            }} alignItems="center">{statusFormat(props.status)} </Box>
            <Typography variant="h6" component="div" 
                      sx={{ flex: 1, fontWeight: '700', mx: 1 
                      , my:0.5}}>
              {props.planName}
            </Typography>
          </ThemeProvider>
          <Button variant="outlined"
                    size="small"
                    sx={{ maxHeight: '1.5em',maxWidth: '8em', 
                    my: '0.4em', 
                    mr:'2em',
                    flex: 1, textTransform: "none" }}
                    onClick={() => {
                        props.setIsPlanSelected(true);
                        props.setPlanId(props.planId);
                        props.setPlanName(props.planName);
                        props.setPlanStatus(props.planStatus);
                        //console.log(props.planIdList)
                    }}>
                    See Details
                </Button>
        </div>
      </div>

      <CardActionArea onClick={() => {
        cardClicked();
        props.setPlanId(props.planId);
        props.setPlanName(props.planName);
        props.setPlanStatus(props.status);
        props.setCardSelected(props.color);
      }}>
        
          <ThemeProvider id="card-summary" theme={theme}>
          <CardContent sx={{ p: 0.2, px: 0.5, display:'flex', flexDirection:'row' }}>
          <div style={{flex:1}}>
            <Typography sx={{
              fontSize: '0.9rem',
              fontWeight: '500',
                 }}>
              Proposed by: {props.data.proposedBy}
              </Typography>
              
              <Typography>
                No. of Competitive Districts: {props.data.numCompetitiveDistricts}
              </Typography>
              <Typography>
              No. of Majority Minority Districts: {props.data.numMajMinDistricts}
            </Typography>
              </div>
              <div sytle={{flex:1}}>
              <Typography>
               Compactness(PolsbyPopper): {props.data.polsbyPopper}
              </Typography>
              <Typography>
                Efficiency Gap: {props.data.efficiencyGap}
              </Typography>
            <Typography>
              Partisan Split
            </Typography>

           
            </div>
            </CardContent>
          </ThemeProvider>
        
      </CardActionArea>
    </Card></div>
  );

}