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
import USstatesGJSONdata from './gz_2010_us_040_00_20m_clipped.json'
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        if (!isSplit)
          setIsSplit(true);
        else{
          // zoom in on the state
          USmap.invalidateSize();
          //todo: set max bounds to the state when a state is selected?
          USmap.flyToBounds(mapGJSONref.current.getLayers().find((layer) => layer.feature.properties.STATE == currUSstate.fipsCode).getBounds());  
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

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="menu-bar" style={{ display: 'flex' }}>
        {mapGJSONref.current && <Autocomplete
          onChange={(event, value) => {setCurrUSstate(value?{name: value.name, fipsCode: value.fipsCode}:null)}}
          id="state-select"
          sx={{ width: '14em', margin: '0.5em' }}
          options={mapGJSONref.current.getLayers().map((layer) => ({name: layer.feature.properties.NAME, fipsCode: layer.feature.properties.STATE}))}
          autoHighlight
          autoComplete
          clearOnEscape
          includeInputInList
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => parseInt(option.fipsCode) == parseInt(value.fipsCode)}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a State"
            />
          )}
        />}
        <Stack sx={{margin: "0.5em", marginLeft: "auto"}} direction="row" spacing={1}>
          <h5 id="plan-name">{planName}</h5>
          <AddDistricting />
          <AddGraph />
        </Stack>
      </div>
      <div style={{ flex: '1', display: 'flex' }}>
        {isSplit && <div style={{ flex: '1' }}>
          <InformationTab stateId={currUSstate} planId={planId} setPlanName={setPlanName}/>
        </div>}
        <div style={{ flex: '2' }}>
          <MapContainer
            center={[38, -98]} 
            zoom={5} 
            minZoom={4} 
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
