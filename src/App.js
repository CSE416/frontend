import './App.css';
import './styles/districtingModal.css';
import './styles/graphModal.css';
import { AddDistricting } from './components/AddDistricting';
import { AddGraph } from './components/AddGraph';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './utils/window_size';
import useWindowDimensions from './utils/window_size';
import React, { useState } from 'react';
import { display } from '@mui/system';
import gdata from './gz_2010_us_040_00_20m.json'

function App() {
  const { _height, _width } = useWindowDimensions();
  const [isSplit, setIsSplit] = useState(false);
  const [currState, setCurrState] = useState(null);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="menu-bar">
        <Autocomplete
          onChange={(e, v) => setCurrState(v)}
          id="state-select"
          sx={{ width: '15em', padding: '0.5em' }}
          options={['Nevada', 'S. Carolina']}
          autoHighlight
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a State"
            />
          )}
        />
        <AddDistricting />
        <AddGraph />
      </div>
      <div style={{ flex: '1', display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <MapContainer center={[39, -98]} zoom={5} maxBounds={[[5.499550, -167.276413], [83.162102, -52.233040]]}
            // add max zoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
            <GeoJSON
              data={gdata}
            />
          </MapContainer>
        </div>
        {isSplit && <div style={{ flex: '1' }}>
        </div>}
      </div>
    </div>
  );
}

export default App;
