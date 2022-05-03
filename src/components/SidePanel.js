import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";

const SidePanel = (props) => {
    // const tabContent = {
    //   "Summary": <PlanSummary stateId={props.stateId} planId={props.planId} setPlanName={props.setPlanName}/>,
    //   "Demographic Data": <Measures stateId={props.stateId} />,//<DemographicData planId={props.planId}/>,
    //   "Measures": <Measures stateId={props.stateId} />
    // }
  
    return (
      <div>
        <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={props.isPlotSelected}
        title="Hey, it is optional pane title.  I can be React component too."
        subtitle="Optional subtitle."
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          props.setIsPlotSelected(false);
        }}
      >
        <div>And I am pane content. BTW, what rocks?</div>
        </SlidingPane>
      </div>
    );
  };
  export default SidePanel;