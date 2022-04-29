import React, { useState, useEffect } from 'react';
import {RadarPlot } from './RadarPlot';
import { BoxWhiskerPlot } from './BoxWhiskerPlot';
import { VoteSeatShare } from './VoteSeatShare';

export const Plots = (props) => {

    const tabContent = {
    "Radar Plot": <RadarPlot stateId={props.stateId} planIdList={props.planIdList} />,
    "Box and Whisker Plot": <BoxWhiskerPlot stateId={props.stateId} planId={props.planId} category={props.category}/>,
    "Vote Seat Share": <VoteSeatShare stateId={props.stateId
                                            /*TODO: */} />
  }
    return(
    <div id="information-tab-container">
    <Tabs
      defaultActiveKey={Object.keys(tabContent)[0]}
      transition={Fade}
      id="information-tab"
      className="mb-3"
    >
      {Object.keys(tabContent).map((title) => {
        return (
        <Tab
        key={title} 
        eventKey={title} 
        title={title}>
          {tabContent[title]}
        </Tab>);
      })}
    </Tabs>
  </div>
    );
};