import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RadarPlot from './RadarPlot';
import { VoteSeatShare } from './VoteSeatShare';
import { EffVotesChart } from './EffVotesChart';


import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const PlanMeasure = (props) => {

    const [alignment, setAlignment] = useState('radar');

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
              <ToggleButtonGroup sx={{ marginBottom: '0px' }}
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                size='small'
              >
                <ToggleButton value="radar">Radar</ToggleButton>
                <ToggleButton value="voteSeat">Vote/Seat Share</ToggleButton>
                <ToggleButton value="efficiencyGap">Efficiency Gap</ToggleButton>
                <ToggleButton value="polsbyPopper">Polsby-Popper</ToggleButton>

              </ToggleButtonGroup>
              {(alignment === "radar") && <div style={{ align: 'center' }}>
                <RadarPlot width={'60%'} height={'40%'}
                  planIdList={props.planIdList}
                  planId={props.planId} />
              </div>}

              {(alignment === "voteSeat") && <div>
                <VoteSeatShare width={500} height={300}
                  planId={props.planId} />
              </div>}

              {(alignment === "efficiencyGap") && <div>
                <EffVotesChart />
              </div>}

              {(alignment === "polsbyPopper") && <div>

              </div>}
            </Box>
        </div>
    );
}