import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlanComparisonCard } from './PlanComparisonCard';

export const StatePlans= (props) => {

 // get planSummary cards for all the districting plans of the state
 const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
 const [plan1, setPlan1] = useState(null);

  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/tableSummary`, {params: {
      stateFipsId: props.stateFipsId
    }})
      .then(res => {
        setPlan1(res.data[0]);
        props.setPlanName(res.data[0].planName);
        props.setPlanStatus(res.data[0].planStatus);
        
      }) 
      .catch ((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);
  
    return(<div>
        {(plan1) ? (<div>
            <PlanComparisonCard 
              planId={plan1.planId} 
              name='Congressional Districts (PlanC2193)' 
              status={plan1.planStatus}
              proposedBy='SC house'//{data.proposedBy}
              partisanLean='3.4'//{data.partisanLean}
              populationEquality='0.5'//{data.populationEquality}
              popularVote='0.1, 2.2'
              seatShare='3'
              polsbyPopper='3.3'
              numOfMajMinDistricts='2'
              setIsPlanSelected={props.setIsPlanSelected} 
              setPlanId={props.setPlanId} /> 
          
            <PlanComparisonCard name='' setMethod={props.setIsPlanSelected} planId=''/>
            <PlanComparisonCard name='' setMethod={props.setIsPlanSelected} planId=''/>
            <PlanComparisonCard name='' setMethod={props.setIsPlanSelected} planId=''/>
          </div>) : nullDataMsg}
    </div>);

}