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

  return (
    <Card class="plan-summary-card"
      align='left'
      sx={{
        flex: 1,
        width:'50%',
        //height:'50%'
        //m: 0.5, p: 0.5,
        //border: 3,
        //borderColor: (props.cardSelected == props.color) ? '#e0e0e0' : 'white'
      }} >
      <div id="card-top"
        style={{
          //display: 'flex', flexDirection: 'row',
          backgroundColor: (props.cardSelected == props.color) ? '#e0e0e0' : 'white'
        }}>
        <div id="card-checkbox" //style={{ flex: 1 }}
        >
          <Checkbox
            {...label}
            //defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
            checked={checked}
            onChange={handleChange}
          />
        </div>
      </div>

      <div id="card-title"
        style={{
          flex: 5, display: 'flex', flexDirection: 'row',
          marginTop: '0.5em', marginBottom: '0.5em', marginLeft: '0em'
        }}>
        <ThemeProvider theme={theme} >
          <Box sx={{
            border: '1px solid', borderRadius: 1, p: 0.5, m: 0.5,
            fontSize: '0.5rem',
            fontWeight: '500',
            textAlign: 'center',
          }} alignItems="center">{props.status} </Box>
          <Typography gutterBottom variant="h6" component="div" sx={{ flex: 1, fontWeight: '700', mx: 1 }}>
            {props.planName}
          </Typography>
        </ThemeProvider>
      </div>

      <CardActionArea onClick={() => {
        cardClicked();
        props.setPlanId(props.planId);
        props.setPlanName(props.planName);
        props.setPlanStatus(props.status);
        props.setCardSelected(props.color);
      }}>
        <CardContent sx={{ p: 0.2, px: 0.5 }}>
          <ThemeProvider id="card-summary" theme={theme}>
            <Typography sx={{
              fontSize: '0.9rem',
              fontWeight: '500',
            }}>
              Proposed by: Nevada Democrats</Typography>
            <Typography>
              Partisan Split
            </Typography>

            <Typography>
              Number of Split counties: 3
            </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );

}