import './App.css';
import './styles/districtingModal.css';
import './styles/graphModal.css';
import './styles/informationTab.css';
import './styles/planSummary.css';
import { AddDistricting } from './components/AddDistricting';
import { AddGraph } from './components/AddGraph';
import { InformationTab } from './components/InformationTab';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState, useRef } from 'react';
import USstatesGJSONdata from './data/stateBoundaries.json'
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';

function App() {  
  const [isSplit, setIsSplit] = useState(false);
  const [planId, setPlanId] = useState(0);
  const [planName, setPlanName] = useState('');
  const [currUSstate, setCurrUSstate] = useState(null);
  const [USmap, setUSMap] = useState(null);
  const [USstatesGJSON, setUSstatesGJSON] = useState(null);
  const mapGJSONref = useRef();

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
      if (currUSstate != null){
        if (!isSplit){
          setIsSplit(true);
        }
        else{
          // split pane has been opened
          USmap.invalidateSize();
          // zoom in on the state
          let state_bounds = mapGJSONref.current.getLayers().find((layer) => layer.feature.properties.STATE == currUSstate.fipsCode).getBounds();
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
  }, [currUSstate, isSplit]);

  // fetch state map and display it
  useEffect(() => {
    if (mapGJSONref.current){
      if (currUSstate != null){
        // fetch state map
        //  then stop the pannnig animation?
        //  then setMaxBounds on the state map
        //  and set Zoom levels
      }
    }
  }, [currUSstate]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <MenuBar
        ref={mapGJSONref}
        setCurrUSstate={setCurrUSstate}
        planName={planName}
      />
      <div style={{ flex: '1', display: 'flex' }}>
        {isSplit && <div style={{ flex: '1' }}>
          <InformationTab stateId={currUSstate} planId={planId} setPlanName={setPlanName}/>
        </div>}
        <div style={{ flex: '2' }}>
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
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
