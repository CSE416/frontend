import React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MenuBar = React.forwardRef((props, mapGJSONref) => {

    return(
        <div className="menu-bar" style={{ display: 'block', width: '100%' }}>
            {mapGJSONref.current && <Autocomplete
                onChange={(event, value) => {props.setCurrUSstate(value?{name: value.name, fipsCode: value.fipsCode}:null)}}
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
            <h5 id="plan-name">{props.planName}</h5>
        </div>
    );
});

export default MenuBar;