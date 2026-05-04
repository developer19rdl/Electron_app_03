import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { GetChartThreeData } from '../../../../services/LoginPageService';
// import { GetSensorDropdown, UpdateMachineHeaderData, GetChartData, GetChartThreeData } from '../../../Services/NodeJsApiServices';

export const IntervalModalThree = (props) => {
    const {
        locationDetails,
        intervalModalThree,
        setIntervalModalThree,
        selectedGraph,
        setSelectedDropdown,
        selectedGropdown,
        machineId,
        // FIRST GRAPH
        setChartData,
        setChartThreeData,
        selectedLast,
        setSelectedLast,
        selectedAggregation,
        setSelectedAggregation,
        selectedInterval,
        setSelectedInterval,
        // SECOND GRAPH
        secondSelectedLast,
        setSecondSelectedLast,
        secondSelectedAggregation,
        setSecondSelectedAggregation,
        secondSelectedInterval,
        setSecondSelectedInterval,
        //THIRD GRAPH
        thirdSelectedLast,
        setThirdSelectedLast,
        thirdSelectedAggregation,
        setThirdSelectedAggregation,
        thirdSelectedInterval,
        setThirdSelectedInterval,
        chartThreeTagId,
        chartThreeSlaveId,
        setBackDropLoader,
        isDarkMode
    } = props;
    // const [selectedLast, setSelectedLast] = useState('8hr');
    // const [selectedAggregation, setSelectedAggregation] = useState('min');
    // const [selectedInterval, setSelectedInterval] = useState('1hr');

    // BACKGROUND COLOR OF DROPDOWN LISTS AFTER CLICK
    const MenuProps = {
        PaperProps: {
            style: {
                backgroundColor: isDarkMode ? '#333333' : '#ffffff', // Background color for the dropdown list
            },
        },
    };

    // CHART ONE SUCCESS HANDLER
    const handleGetChartDataSuccess = (dataObject) => {
        setBackDropLoader(false)
        setChartThreeData(dataObject || [])
    }
    const handleGetChartDataException = () => { }

    // CHART TWO SUCCESS HANDLER
    const handleGetChartTwoDataSuccess = (dataObject) => {
        // setChartData(dataObject || [])
    }
    const handleGetChartTwoDataException = () => { }

    // CHART THREE SUCCESS HANDLER
    const handleGetChartThreeDataSuccess = (dataObject) => {
        setChartData(dataObject || [])
    }
    const handleGetChartThreeDataException = () => { }

    return (
        <Dialog
            open={intervalModalThree}
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%', backgroundColor: isDarkMode ? '#1A2027' : '#ffffff' } }}
            maxWidth="sm"
        >
            {/* <DialogTitle id="alert-dialog-title">
                Header Filter
            </DialogTitle> */}
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Last</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={thirdSelectedLast}
                                label="Last"
                                onChange={(e) => {
                                    setBackDropLoader(true)
                                    setThirdSelectedLast(e.target.value)
                                    GetChartThreeData({
                                        deviceId: chartThreeSlaveId,
                                        locationId: locationDetails.locationId,
                                        selected: selectedGropdown,
                                        aggregation: thirdSelectedAggregation,
                                        interval: thirdSelectedInterval,
                                        sortDataType: e.target.value,
                                        tagIds: chartThreeTagId,
                                        chartNo: 3,
                                        // slaveId: chartThreeSlaveId
                                    }, handleGetChartDataSuccess, handleGetChartDataException)
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                <MenuItem value={'8hr'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>8hrs</MenuItem>
                                <MenuItem value={'1day'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1day</MenuItem>
                                <MenuItem value={'1week'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1week</MenuItem>
                                <MenuItem value={'15days'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>15days</MenuItem>
                                <MenuItem value={'30days'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>30days</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Data Aggregations</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={thirdSelectedAggregation}
                                label="Data Aggregations"
                                onChange={(e) => {
                                    setBackDropLoader(true)
                                    setThirdSelectedAggregation(e.target.value)
                                    GetChartThreeData({
                                        deviceId: machineId,
                                        locationId: locationDetails.locationId,
                                        selected: selectedGropdown,
                                        aggregation: e.target.value,
                                        interval: thirdSelectedInterval,
                                        sortDataType: thirdSelectedLast,
                                        tagIds: chartThreeTagId,
                                        chartNo: 3,
                                        slaveId: chartThreeSlaveId
                                    }, handleGetChartDataSuccess, handleGetChartDataException)
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                <MenuItem value={'count'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Count</MenuItem>
                                <MenuItem value={'avg'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Average</MenuItem>
                                <MenuItem value={'max'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Max</MenuItem>
                                <MenuItem value={'min'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Min</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Grouping Interval</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={thirdSelectedInterval}
                                label="Grouping Interval"
                                onChange={(e) => {
                                    setBackDropLoader(true)
                                    setThirdSelectedInterval(e.target.value)
                                    GetChartThreeData({
                                        deviceId: machineId,
                                        locationId: locationDetails.locationId,
                                        selected: selectedGropdown,
                                        aggregation: thirdSelectedAggregation,
                                        interval: e.target.value,
                                        sortDataType: thirdSelectedLast,
                                        tagIds: chartThreeTagId,
                                        chartNo: 3,
                                        slaveId: chartThreeSlaveId
                                    }, handleGetChartDataSuccess, handleGetChartDataException)
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                <MenuItem value={'15min'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>15Min</MenuItem>
                                <MenuItem value={'30min'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>30Min</MenuItem>
                                <MenuItem value={'1hr'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1Hr</MenuItem>
                                <MenuItem value={'1day'} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1day</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIntervalModalThree(false)} style={{ backgroundColor: isDarkMode ? '#F5F5F5' : '#212529', color: isDarkMode ? '#000000' : '#F5F5F5' }}>Close</Button>
                {/* <Button onClick={handleSubmitForm}>
                    Update
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}
