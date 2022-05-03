import './App.css';
import './styles/boxWhisker.css'
import './styles/graphModal.css';
import './styles/informationTab.css';
import './styles/planSummary.css';
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
//plot comp
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RadarPlot from './components/RadarPlot';

function App() {  
  const mapGJSONref = useRef();
  const [isSplit, setIsSplit] = useState(false);
  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const [isPlotSelected, setIsPlotSelected] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [planName, setPlanName] = useState('');
  const [planStatus, setPlanStatus] = useState('');
  const [currState, setcurrState] = useState(null);
  const [USmap, setUSMap] = useState(null);
  const [USstatesGJSON, setUSstatesGJSON] = useState(null);
  const [planGJSON, setPlanGJSON] = useState(null);

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
  useEffect(() => {
    setPlanGJSON(nvPlan0GJSON);
  }, []);

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

  //plot componet

  const toggleDrawer = (open) => (event) => {
    setIsPlotSelected(open);
  };

  const [alignment, setAlignment] = useState('radar');

  const handleChange = (
    event,
    newAlignment
  ) => {
    setAlignment(newAlignment);
    return (<div>hi</div>);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MenuBar
        ref={mapGJSONref}
        planName={planName}
        isPlanSelected={isPlanSelected}
        isPlotSelected={isPlotSelected}
        setIsPlanSelected={setIsPlanSelected}
        setcurrState={setcurrState}
        currState={currState}
        planStatus={planStatus}
        setIsPlotSelected={setIsPlotSelected}
        //planStatus={planStatus}
      />
      <div style={{ flex: '1', display: 'flex' }}>
        { // inital state: show districting plan cards
        isSplit && !isPlanSelected && <div style={{ flex: '1', maxHeight: '100%' ,overflowY: 'scroll'}}> 
          <StatePlans 
            setIsPlanSelected={setIsPlanSelected} 
            setPlanId={setPlanId} 
            setPlanName={setPlanName} 
            setPlanStatus={setPlanStatus}
            stateFipsId={currState.fipsCode}/>       
        </div>}

        { // When a plan is selected: show detailed information
        isSplit && isPlanSelected && <div style={{ flex: '1' }}> 
          <InformationTab stateId={currState} planId={planId} setPlanName={setPlanName} />
        </div>}

          { /* map part */ }
          { // Show Map, when plot button is not selected
          <div style={{ flex: '1'}}>
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
            </MapContainer>
          </div>
          
          }

          { // Show Plots, when plot button isselected
          isPlotSelected && <div >
            <SwipeableDrawer 
           variant='persistent'
           sx={{position: 'relative'}}
              BackdropProps={{ style: { opacity: 0 } }}
              anchor="right"
              open={isPlotSelected}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              PaperProps={{ style: { position: "fixed", top: 70, left: 600, m: 0 }}}
            >
              <Box sx={{ width: 700,backgroundColor: 'e0e0e0'}}>
                <Typography variant='h6'>Nevada</Typography>
                </Box>
                <Box sx={{ width: 700, height: 700,backgroundColor:'#eeeeee', maxHeight: 600, overflow: 'auto'}}>
                <ToggleButtonGroup sx={{margin:'20px'}}
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                >
                  <ToggleButton value="radar">Radar</ToggleButton>
                  <ToggleButton value="voteSeat">Vote/Seat Share</ToggleButton>
                  <ToggleButton value="BoxWhisker">Box and Whisker</ToggleButton>
                  <ToggleButton value="seawulf">Seawulf Ensemble</ToggleButton>
                
                </ToggleButtonGroup>
                {(alignment==="radar") && <div>
                <RadarPlot />
              </div>}
              </Box>
              

              
            </SwipeableDrawer>
          </div>}
      </div>
    </div>
  );
}

export default App;
