import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/planSummaryTable.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';



const themeTable = createTheme({
    overrides: {
        MuiTableBody: {
            root: {  //This can be referred from Material UI API documentation. 
                padding: 'none',

            },
        },
    },
});

export const CompareTable = (props) => {
    //const [data, setData] = useState(false);
    // const [nullDataMsg, setNullDataMsg] = useState(<p>Loading...</p>);

    // useEffect(() => {
    //     axios.get(`https://redistricting-fever.herokuapp.com/getAllPlans`, {
    //         params: {
    //             staeFipsId: props.statFipsId
    //         }
    //     })
    //         .then(res => {
    //             setData(res.data);
    //         })
    //         .catch((Error) => {
    //             setNullDataMsg(<p>Data Failed to Load.</p>);
    //         })
    // }, []);

    function createData1(tag, value1) {
        return { tag, value1};
    }
    function createData2(tag, value1, value2) {
        return { tag, value1, value2 };
    }

    const idList = [];
    props.planIdList.forEach(id => idList.push(id));

    var dataRow=[];
    if (props.planIdList.size === 1) {
        let i = idList[0] % 10;
        dataRow = [
            createData1("Plan Name", props.data[i].planName),
            createData1("Plan Status", props.data[i].planStatus),
            createData1("No. of Competitive Districts", props.data[i].numCompetitiveDistricts),
            createData1("No. of Split Counties", props.data[i].numSplitCounties),
            createData1("No. of Influence Districts", props.data[i].numInfluenceDistricts),
            createData1("No. of Majority-Minority Districts", props.data[i].numMajMinDistricts),
            createData1("Polsby Popper", props.data[i].polsbyPopper),
            createData1("Partisan Lean", props.data[i].partisanLean),
            createData1("Efficiency Gap", props.data[i].efficiencyGap)
        ];
    } else if (props.planIdList.size === 2){
        let i = idList[0] % 10;
        let j = idList[1] % 10;
        dataRow = [
            createData2("Plan Name", props.data[i].planName, props.data[j].planName),
            createData2("Plan Status", props.data[i].planStatus, props.data[j].planStatus),
            createData2("No. of Competitive Districts", props.data[i].numCompetitiveDistricts, props.data[j].numCompetitiveDistricts),
            createData2("No. of Split Counties", props.data[i].numSplitCounties, props.data[j].numSplitCounties),
            createData2("No. of Influence Districts", props.data[i].numInfluenceDistricts, props.data[j].numInfluenceDistricts),
            createData2("No. of Majority-Minority Districts", props.data[i].numMajMinDistricts, props.data[j].numMajMinDistricts),
            createData2("Polsby Popper", props.data[i].polsbyPopper, props.data[j].polsbyPopper),
            createData2("Partisan Lean", props.data[i].partisanLean, props.data[j].partisanLean),
            createData2("Efficiency Gap", props.data[i].efficiencyGap, props.data[j].efficiencyGap)
        ];
    }

    return (<div>
        <ThemeProvider theme={themeTable}>
            <TableContainer component={Paper} sx={{ padding: "none" }}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        </TableRow>
                    </TableHead>
                    {(props.planIdList.size===1) &&
                    <TableBody sx={{ fontSize: '10', padding: '0.5em' }}>
                        {dataRow.map((r) => (
                            <TableRow
                                key={dataRow.tag}
                                sx={{ border: 0 }}>
                                <TableCell component="th" scope="row">
                                    {r.tag}
                                </TableCell>
                                <TableCell align="right">{r.value1}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}

                    {(props.planIdList.size===2) &&
                    <TableBody sx={{ fontSize: '10', padding: '0.5em' }}>
                        {dataRow.map((r) => (
                            <TableRow
                                key={dataRow.tag}
                                sx={{ border: 0 }}>
                                <TableCell component="th" scope="row">
                                    {r.tag}
                                </TableCell>
                                <TableCell align="right">{r.value1}</TableCell>
                                <TableCell align="right">{r.value2}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}

                </Table>
            </TableContainer>
        </ThemeProvider>
    </div>);
}