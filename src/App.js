import './App.css';
import './styles/boxWhisker.css'
import './styles/graphModal.css';
import './styles/informationTab.css';
import './styles/planSummary.css';
import './styles/voteSeatShare.css';
import { InformationTab } from './components/InformationTab';
import { StatePlans } from './components/StatePlans';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState, useRef } from 'react';
import USstatesGJSONdata from './data/stateBoundaries.json'
import nvPlan0GJSON from './data/nv_plan0.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import SidePanel from './components/SidePanel';
import axios from 'axios';
import SlidingPane from "react-sliding-pane";

function App() {  
  const mapGJSONref = useRef();
  const [isSplit, setIsSplit] = useState(false);
  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const [isPlotSelected, setIsPlotSelected] = useState(false);
  const [defaultPlan, setDefaultPlan] = useState({
    defaultPlanId: 0,
    defaultPlanName: '',
    defaultPlanStatus: ''
  });
  const [planLabel, setPlanLabel] = useState([]);
  const [planId, setPlanId] = useState(0);
  const [planName, setPlanName] = useState('');
  const [planStatus, setPlanStatus] = useState('');

  const [currState, setcurrState] = useState(null);
  const [USmap, setUSMap] = useState(null);
  const [USstatesGJSON, setUSstatesGJSON] = useState(null);
  const [planGJSON, setPlanGJSON] = useState(null);
  const [planGJSON2, setPlanGJSON2] = useState(null);
  const [cardSelected, setCardSelected] = useState(1);
  const [tempPlanId, setTempPlanId] = useState(null);
  const [planIdList, setPlanIdList] = useState(new Set());

  // fetch data from API to display US states
  useEffect(() => {
    // Get GEOJSON data for the US states
    // GET /us_states
    setUSstatesGJSON(USstatesGJSONdata);
  }, []);

  // set default parameters for US map with states
  useEffect(() => {
    if (mapGJSONref.current) {
      USmap.setMaxBounds(mapGJSONref.current.getBounds().pad(0.1));
    }
  }, [USmap]);

  // show split-pane and zoom in on state when selected
  useEffect(() => {
    if (mapGJSONref.current){
      // if a state has been selected, split pane should be open
      if (currState != null){
        if (!isSplit){
          setIsSplit(true);
        }
        else{
          // split pane has been opened
          USmap.invalidateSize();
          // zoom in on the state
          let state_bounds = mapGJSONref.current.getLayers().find((layer) => layer.feature.properties.STATE == currState.fipsCode).getBounds();
          USmap.flyToBounds(state_bounds);
        }
      }
      // else the split pane should be closed
      else{
        if (isSplit)
          setIsSplit(false);
        else{
          // reset map view
          USmap.invalidateSize();
          USmap.setView([38,-98], 5);
        }
      }
    }
  }, [currState, isSplit]);

  // fetch state map and display it
  useEffect(() => {
    if (mapGJSONref.current){
      if (currState != null){
        // fetch state map
        //  then stop the pannnig animation?
        //  then setMaxBounds on the state map
        //  and set Zoom levels
      }
    }
  }, [currState]);

  // display district boundaries // dummy
  // useEffect(() => {
  //   setPlanGJSON2(nvPlan0GJSON);
  // }, []);

   // Get the district plan boundaries (default: plan=0)
   const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);
   
   useEffect(() => {
    if (currState != null){
    axios.get(`https://redistricting-fever.herokuapp.com/planBoundaries`, {params: {
      planId: planId
    }})
      .then(res => {
        console.log(res.data);
        setPlanGJSON(res.data);
      }) 
      .catch ((Error) => {
        //alert(Error);
        setNullDataMsg(<p>Data Failed to Load.</p>);
      })
    }
  }, [planId]);



  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MenuBar
        ref={mapGJSONref}
        
        isPlanSelected={isPlanSelected}
        isPlotSelected={isPlotSelected}
        setIsPlanSelected={setIsPlanSelected}
        setcurrState={setcurrState}
        setPlanId={setPlanId}
        setPlanName={setPlanName}
        setPlanStatus={setPlanStatus}
        setIsPlotSelected={setIsPlotSelected}
        setCardSelected={setCardSelected}
        setPlanIdList={setPlanIdList}
        //stateFipsId={currState.fipsCode}
        planName={planName}
        planStatus={planStatus}
        planId={planId}
        defaultPlan={defaultPlan}
        currState={currState}
        planLabel={planLabel}
        defaultLabel={[planLabel[0]]}
        
        planIdList={planIdList}
        
        
        //planStatus={planStatus}
      />
      <div style={{ flex: '1', display: 'flex' }}>
        { // inital state: show districting plan cards
        isSplit && !isPlanSelected && <div style={{ flex: '3' ,overflow: 'auto'}}> 
          <StatePlans 
            setIsPlanSelected={setIsPlanSelected} 
            setPlanId={setPlanId} 
            setPlanName={setPlanName} 
            setPlanStatus={setPlanStatus}
            setDefaultPlan={setDefaultPlan}
            setPlanLabel={setPlanLabel}
            setCardSelected={setCardSelected}
            stateFipsId={currState.fipsCode}
            cardSelected={cardSelected}
            planIdList={planIdList}
            setPlanIdList={setPlanIdList}
            defaultPlan={defaultPlan}/>  
        </div>}

        { // When a plan is selected: show detailed information
        isSplit && isPlanSelected && <div style={{ flex: '4' }}> 
          <InformationTab stateId={currState} planId={planId} setPlanName={setPlanName} planIdList={planIdList} />
        </div>}

          { /* map part */ }
          { // Show Map, when plot button is not selected
          <div style={{ flex: '3'}}>
            <MapContainer
              center={[38, -98]} 
              zoom={5} 
              minZoom={4} 
              maxZoom={7}
              zoomSnap={0.25}
              whenCreated={setUSMap}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
              />
              {USstatesGJSON && <GeoJSON
                  data={USstatesGJSON}
                  ref={mapGJSONref}
              />}
              {
                
              }
              {isSplit && <GeoJSON key={planId} data={planGJSON}/>}
              {isSplit && <GeoJSON key={planId+2} data={planGJSON2}/>}
            </MapContainer>
          </div>
          
          }

          { // Show Plots, when plot button isselected
          isPlotSelected && <div >
            
          </div>}
      </div>
    </div>
  );
}

export default App;
