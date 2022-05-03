import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export const PlanComparisonCard = (props) => {
  const [clicked, setClicked] = useState(false)
  const cardClicked = () => setClicked((prev) => !prev)

  function createData(summary, values) {
    return { summary, values };
  }
  const rows = [
    createData("Propsed by", props.proposedBy),
    createData("Population Equality", props.populationEquality),
    createData("Partisan Lean",props.partisanLean),
    createData("popular Vote" ,props.popularVote), 
    createData("seat Share", props.seatShare),
    createData("polsbyPopper",props.polsbyPopper),
    createData("Number of Majority-Minority Districts", props.numOfMajMinDistricts)];
    return(
        <Card align='left' sx={{m:1, bgcolor: clicked ? '#e0e0e0' : 'white'}} >
      <CardActionArea onClick={()=>{cardClicked(); props.setPlanId(props.planId); 
                                                    props.setPlanName(props.name);
                                                    props.setPlanStatus(props.status);}}>
        <CardContent>
        {(props.status=='INLITIGATION') && 
          <Chip label={props.status} color='success' />
          }
          {!(props.status=='INLITIGATION') && 
          <Chip label={props.status} />
          }
          <Typography gutterBottom variant="h6" component="div">
            {props.name}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 450 }} aria-label="simple table"> 
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

          
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={()=>{props.setIsPlanSelected(true);
                                            props.setPlanId(props.planId);
                                            props.setPlanName(props.name);
                                            props.setPlanStatus(props.status);}}>Show Details</Button>
        </CardActions>
      
    </Card>
    );

}