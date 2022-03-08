import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PlanSummary = (props) => {

  const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);

  const [data, setData] = useState(null);

  const dummyPlanSummary = {
    plan_name : "Republic Plan",
    proposed_by: "Nevada Republicans",
    proposed_date: new Date("11/13/2021"),
    status: "Tabled",
    num_of_districts: 4,
    district_num_change: 0,
    num_of_competitve_districts: 0,
    num_of_split_counties: 0,
    partisan_lean: 0,
    population_equality: 0.02
  };

  //data = dummyPlanSummary;

  useEffect(() => {
    axios.get(`http://localhost:8080/summary`, {params: {
      stateid: props.stateId,
      planid: props.planId
    }})
      .then(res => {
        setData(res.data);
      })
      .catch ((Error) => {
        //alert(Error);
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
  }, []);

  return (
    <div>
      {(data) ? (
        <div id="plan-summary-container">
        <p>Plan Name: <span className='plan-summary-data'>{data.plan_name}</span></p>
        <p>Proposed By: <span className='plan-summary-data'>{data.proposed_by}</span></p>
        <p>Proposed Date: <span className='plan-summary-data'>{data.proposed_date}</span></p>
        <p>Status: <span className='plan-summary-data'>{data.status}</span></p>
        <p>Number of Districts: <span className='plan-summary-data'>{data.num_of_districts}</span></p>
        <p>Change in Number of Districts: <span className='plan-summary-data'>{data.district_num_change}</span></p>
        <p>Number of Competitive Districts: <span className='plan-summary-data'>{data.num_of_competitve_districts}</span></p>
        <p>Number of Split Counties: <span className='plan-summary-data'>{data.num_of_split_counties}</span></p>
        <p>Partisan Lean: <span className='plan-summary-data'>{data.partisan_lean}</span></p>
        <p>Population Equality: <span className='plan-summary-data'>{data.population_equality}</span></p>
        </div>
      ) : nullDataMsg}
    </div>
  );
}