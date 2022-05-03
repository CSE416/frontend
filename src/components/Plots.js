import React, { useState, useEffect } from 'react';
import {RadarPlot } from './RadarPlot';
import { BoxWhiskerPlot } from './BoxWhiskerPlot';
import { VoteSeatShare } from './VoteSeatShare';

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Plots = (props) => {

    const tabContent = {
    "Radar Plot": <RadarPlot stateId={props.stateId} planIdList={props.planIdList} />,
    "Box and Whisker Plot": <BoxWhiskerPlot stateId={props.stateId} planId={props.planId} category={props.category}/>,
    "Vote Seat Share": <VoteSeatShare stateId={props.stateId
                                            /*TODO: */} />
  }
    return(
    <div>
      
    </div>
    );
};