import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RadarPlot from './RadarPlot';
import { VoteSeatShare } from './VoteSeatShare';
import { EffVotesChart } from './EffVotesChart';


import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const PlanMeasure = (props) => {

    const [alignment, setAlignment] = useState('voteSeat');

    const handleChange = (
        event,
        newAlignment
      ) => {
        setAlignment(newAlignment);
        return (<div>hi</div>);
      };
      
    return(
        <div style={{textAlign:'center'}}>
            <Box sx={{ width: '50vw', height: '90vh', maxHeight: 600, overflow: 'auto', m: '0.5em' }}>
              <ToggleButtonGroup sx={{ marginBottom: '0px', textTransform:'none' }}
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                size='small'
                
              >
                
                <ToggleButton value="voteSeat"
                  sx={{textTransform:'none' }}>Vote/Seat Share</ToggleButton>
                <ToggleButton value="efficiencyGap"
                sx={{textTransform:'none' }}>Efficient/Inefficient Votes</ToggleButton>
                {/* <ToggleButton value="polsbyPopper">Polsby-Popper</ToggleButton> */}

              </ToggleButtonGroup>
              {/* {(alignment === "radar") && <div style={{ align: 'center' }}>
                <RadarPlot width={'60%'} height={'40%'}
                  planIdList={props.planIdList}
                  planId={props.planId} />
              </div>} */}

              {(alignment === "voteSeat") && <div>
                <VoteSeatShare width={600} height={350}
                  planId={props.planId} isSingleId={true}/>
              </div>}

              {(alignment === "efficiencyGap") && <div>
                <EffVotesChart height={350}/>
              </div>}

              {(alignment === "polsbyPopper") && <div>

              </div>}
            </Box>
        </div>
    );
}