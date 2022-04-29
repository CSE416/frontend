import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PlanSummary = (props) => {
  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
  const [data, setData] = useState(null);

  // const dummyPlanSummary = {
  //   plan_name : "Republic Plan",
  //   proposed_by: "Nevada Republicans",
  //   proposed_date: new Date("11/13/2021"),
  //   status: "Tabled",
  //   num_of_districts: 4,
  //   district_num_change: 0,
  //   num_of_competitve_districts: 0,
  //   num_of_split_counties: 0,
  //   partisan_lean: 0,
  //   population_equality: 0.02
  // };

  //data = dummyPlanSummary;
  //props.setPlanName("Democratic Plan");

  useEffect(() => {
    axios.get(`https://redistricting-fever.herokuapp.com/planSummary`, {params: {
      planId: props.planId
    }})
      .then(res => {
        setData(res.data);
        props.setPlanName(res.data.planName);
      }) 
      .catch ((Error) => {
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);

  return (
    <div>
      {(data) ? (
        <div id="plan-summary-container">
        <p>Plan Name: <span className='plan-summary-data'>{data.planName}</span></p>
        <p>Proposed By: <span className='plan-summary-data'>{data.proposedBy}</span></p>
        <p>Proposed Date: <span className='plan-summary-data'>{data.proposedDate}</span></p>
        <p>Status: <span className='plan-summary-data'>{data.planStatus}</span></p>
        <p>Number of Districts: <span className='plan-summary-data'>{data.numOfDistricts}</span></p>
        <p>Change in Number of Districts: <span className='plan-summary-data'>{data.districNnumChange}</span></p>
        <p>Number of Competitive Districts: <span className='plan-summary-data'>{data.numOfCompetitiveDistricts}</span></p>
        <p>Number of Split Counties: <span className='plan-summary-data'>{data.numSplitCounties}</span></p>
        <p>Partisan Lean: <span className='plan-summary-data'>{data.partisanLean}</span></p>
        <p>Population Equality: <span className='plan-summary-data'>{data.populationEquality}</span></p>
        </div>
      ) : nullDataMsg}
    </div>
  );
}