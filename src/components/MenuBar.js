import React from 'react';
import Box from '@mui/material/Box';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { sizing } from '@mui/system';
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontSize: 12,
    },
});

const statusFormat = (status) => {
    let formated = "";
    if (status === "INLITIGATION") {
      formated = "In Litigation";
    }
    else {
      formated = "Proposed"
    };
    return formated;
  };

const MenuBar = React.forwardRef((props, mapGJSONref) => {


    return (
        <div className="menu-bar"
            style={{ display: 'block', display: 'flex', width: '100%', hieght: '0.5em', flexDirection: 'row', gap: '3em' }}>

            {mapGJSONref.current &&
                // Choose State  
                <Autocomplete
                    sx={{ width: '10em', hieght: '1em', margin: '1em', marginTop: '0.57m', marginBottom: '0.5em' }}
                    onChange={(event, value) => { props.setcurrState(value ? { name: value.name, fipsCode: value.fipsCode } : null) }}
                    id="state-select"
                    options={mapGJSONref.current.getLayers().map((layer) => ({ name: layer.feature.properties.NAME, fipsCode: layer.feature.properties.STATE }))}
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
                            variant="standard" size="small" >
                        </TextField>
                    )} />
            }
            { // Reset button -> make it x later?
                props.currState &&
                <Button variant="contained"
                    size="medium"
                    sx={{ m: '1em', textTransform:'none' }}// maxHeight: '2rem',
                    onClick={() => {
                        props.setIsPlanSelected(false);
                        props.setPlanId(props.defaultPlan.defaultPlanId);
                        props.setPlanName(props.defaultPlan.defaultPlanName);
                        props.setPlanStatus(props.defaultPlan.defaultPlanStatus);
                        props.setCardSelected(props.defaultPlan.defaultPlanId);
                        props.setPlanIdList(new Set([props.defaultPlan.defaultPlanId]));
                        props.setCompare(false);
                        props.setTableMode(false);

                    }}
                >Reset
                </Button>
            }

            {/* {props.currState &&
                // Choose Districting plan to display on map: up to 2
                <Autocomplete
                    sx={{ maxWidth: '30em', hieght: '0.5em', margin: '0.5em', marginTop: '0.3em', marginBottom: '0em', flex: 1 }}
                    multiple
                    id="tags-standard"
                    //options={top100Films}
                    options={props.planLabel}
                    getOptionLabel={(option) => option.name}// <div style={{display:'flex',flexDirection:'row'}}>
                    //        <Box sx={{border: '1px solid', borderRadius:1, p:0.1,px: 0.3, 
                    //               m: 0,
                    //              fontSize: '0.65rem',
                    //             fontWeight: '500',}}>{option.status} </Box>
                    //    <Typography sx={{fontSize:'1em', m:0.5, fontWeight:'700'}}>{option.name}</Typography></div>}
                    //isOptionEqualToValue={(option, value) => option.name === value.name}           
                    defaultValue={props.planLabel.find(v => v.name[0])}

                    //onChange={(event, value) => console.log(value)}
                    renderInput={(params) => (

                        <TextField
                            {...params}
                            variant="standard"
                            label="Choose districting plans(s) to display"
                            placeholder="Plan to display"
                            size="small"
                        />
                    )} />
            } */}
            {/* {props.currState &&
                <Button variant="contained"
                    size="small"
                    sx={{ maxHeight: '2rem',maxWidth: '8em', my: '1em', flex: 1, textTransform: "none" }}
                    onClick={() => {
                        props.setIsPlanSelected(true);
                        props.setPlanId(props.planId);
                        props.setPlanName(props.planLabel[0].name);
                        props.setPlanStatus(props.planLabel[0].status);
                        console.log(props.planIdList)
                    }}>
                    See Details
                </Button>
            } */}

            {(props.currState && (!props.comepare)) &&
                // title
                <div style={{ margin: 1, display: 'flex' }}>
                    <Box sx={{
                        border: '1px solid', borderRadius: 1, p: 0.4, px: 0.5,
                        m: '1em',
                        fontSize: '0.875rem',
                        maxHeight: '3em',
                        fontWeight: '500',
                        backgroundColor: (props.planStatus=='INLITIGATION')?'#C5E1A5' : '#e0e0e0'
                    }}>{statusFormat(props.planStatus)}</Box>

                    <ThemeProvider theme={theme}>
                        <Typography variant="h6" id="plan-name" sx={{ b: '0.1em', fontWeight: '700' }}>
                            <span>{props.planName}</span></Typography>

                    </ThemeProvider>
                </div>}

                {(props.currState && (props.compare)) &&
                // title
                <div style={{ margin: 1, display: 'flex' }}>
                    {/* <Box sx={{
                        border: '1px solid', borderRadius: 1, p: 0.4, px: 0.5,
                        m: '1em',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor: (props.planStatus=='INLITIGATION')?'#C5E1A5' : '#e0e0e0'
                    }}>{statusFormat(props.planStatus)}</Box> */}

                    <ThemeProvider theme={theme}>
                        <Typography variant="h6" id="plan-name" sx={{ b: '0.1em', fontWeight: '700' }}>
                            <span>Choose District Plans to Compare</span></Typography>

                    </ThemeProvider>
                </div>}

            {/* {!props.isPlanSelected && <div>
                <Button variant="contained" 
                size="small"
                    style={{maxHeight:'6rem', marginTop:'10px', marginBottom:'5px'}}
                     disabled>Change Districting</Button>
            </div>}

            
            {props.isPlanSelected && <div>
                <Button variant="contained" 
                    style={{maxHeight:'6rem', marginTop:'10px', marginBottom:'5px'}}
                    size="small"
                    onClick={()=>{props.setIsPlanSelected(false)}}>Change Districting</Button>
            </div>} */}

            {/*!props.currState && <div>
                <Button variant="contained" 
                    style={{maxHeight:'6rem', margin:'13px'}}
                    disabled>Plots</Button>
            </div>}

            {/*(props.currState && !props.isPlotSelected) && <div>
                <Button variant="contained" 
                    style={{maxHeight:'5rem', margin:'10px'}}
                    onClick={()=>{props.setIsPlotSelected(true)}}>Plots</Button>
            </div>*/}

            {/*(props.currState&& props.isPlotSelected) && <div>
                <Button variant="contained" 
                    style={{maxHeight:'5rem', margin:'10px'}}
                    onClick={()=>{props.setIsPlotSelected(false)}}>Map</Button>
        </div>*/}


        </div>
    );
});

export default MenuBar;
