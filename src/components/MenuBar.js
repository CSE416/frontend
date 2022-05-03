import React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const MenuBar = React.forwardRef((props, mapGJSONref) => {

    return(
        <div className="menu-bar" style={{ display: 'block', width: '90%', display: 'flex', flexDirection: 'row', }}>
            {mapGJSONref.current && 
            <Autocomplete
                onChange={(event, value) => {props.setcurrState(value?{name: value.name, fipsCode: value.fipsCode}:null)}}
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
                        label="Choose a State">
                    </TextField>
                )}>
            </Autocomplete>}
            
            {props.currState && <div style={{margin: '10px', display:'flex'}}>
                <Chip label={props.planStatus} sx={{margin: '10px'}} color='success'/>
                <Typography variant="h6" id="plan-name"><span>{props.planName}</span></Typography>
                
            </div>}
            
            {!props.isPlanSelected && <div>
                <Button variant="contained" 
                    style={{height:'70%', margin:'10px'}}
                     disabled>Change Districting</Button>
            </div>}

            
            {props.isPlanSelected && <div>
                <Button variant="contained" 
                    style={{height:'70%', margin:'10px'}}
                    onClick={()=>{props.setIsPlanSelected(false)}}>Change Districting</Button>
            </div>}

            {!props.isPlotSelected && <div>
                <Button variant="contained" 
                    style={{height:'70%', margin:'10px'}}
                    onClick={()=>{props.setIsPlotSelected(true)}}>Plots</Button>
            </div>}

            {props.isPlotSelected && <div>
                <Button variant="contained" 
                    style={{height:'70%', margin:'10px'}}
                    onClick={()=>{props.setIsPlotSelected(false)}}>Map</Button>
            </div>}
            
            
        </div>
    );
});

export default MenuBar;
