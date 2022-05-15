import React, { useState } from 'react';
import { Tabs, Tab, Fade } from 'react-bootstrap';
import { Measures } from './Measures';
import { Measures2 } from './Measures2';
import { PlanSummary } from './PlanSummary';
import { DemographicData } from './DemographicData';
import { BoxWhisker} from './BoxWhisker';
import { SeaWulfPlot } from './SeaWulfEnsemble';
import '../styles/informationTab.css';


export const InformationTab = (props) => {

  const tabContent = {
    "Summary": <PlanSummary isSingleId={props.planIdList.size==1} 
                            planIdList={props.planIdList} 
                            stateId={props.stateId} 
                            planId={props.planId} 
                            setPlanName={props.setPlanName}/>,
    //"Demographic Data": <Measures stateId={props.stateId} />,//<DemographicData planId={props.planId}/>,
    
    "Demographic data":<BoxWhisker stateId={props.stateId}
                                    isSingleId={props.planIdList.size==1} 
                                    planIdList={props.planIdList} 
                                    handleClickDemographics={props.handleClickDemographics} 
                                    handleChangeDemoCategory={props.handleChangeDemoCategory}/>,
    "Seawulf Ensemble": <SeaWulfPlot stateId={props.stateId}
                                      isSingleId={props.planIdList.size==1} 
                                      planIdList={props.planIdList} />
    //<Measures2 stateId={props.stateId} />
  }

  return (
    <div id="information-tab-container" 
    style={{width:'100%', height:'90vh', margin:'1px', padding:'0.5px',overflow:'auto'}}>
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
          title={title}
          >
            <div id="tab-content"
                  style={{display:'flex'}}>
            {tabContent[title]}
            </div>
          </Tab>);
        })}
        
      </Tabs>
    </div>
  );
};

