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
    "Box and Whisker Plot": <BoxWhisker stateId={props.stateId} />,
    "Vote Seat Share": <VoteSeatShare stateId={props.stateId
                                            /*TODO: */} />
  }
    return(
    <div>
      
    </div>
    );
};