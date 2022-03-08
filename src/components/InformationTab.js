import React, { useState } from 'react';
import { Tabs, Tab, Fade } from 'react-bootstrap';
import { Measures } from './Measures';
import { PlanSummary } from './PlanSummary';

export const InformationTab = (props) => {

  const tabContent = {
    "Summary": <PlanSummary stateId={props.stateId} planId={props.planId}/>,
    "Measures": <Measures stateId={props.stateId} planId={props.planId}/>
  }


  return (
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