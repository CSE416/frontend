import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';


export const PlanComparisonCard = (props) => {
  const [clicked, setClicked] = useState(false)
  const cardClicked = () => setClicked((prev) => !prev)

    return(
        <Card align='left' sx={{m:1, bgcolor: clicked ? 'grey' : 'white'}} >
      <CardActionArea onClick={()=>{cardClicked(); props.setPlanId(props.planId);}}>
        <CardContent>
        <Chip label={props.status} />
          <Typography gutterBottom variant="h6" component="div">
            {props.name}
          </Typography>
          
          <Typography variant="body2">
            planId: {props.planId} <br/>
            Propsed by: {props.proposedBy} <br/>
            Population Equality: {props.populationEquality}<br/>
            Partisan Lean: {props.partisanLean}<br/>
            popular Vote: {props.popularVote} / seat Share: {props.seatShare}<br/>
            polsbyPopper: {props.polsbyPopper}<br/>
            Number of Majority-Minority Districts: {props.numOfMajMinDistricts}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={()=>{props.setIsPlanSelected(true);}}>Show Details</Button>
        </CardActions>
      
    </Card>
    );

}