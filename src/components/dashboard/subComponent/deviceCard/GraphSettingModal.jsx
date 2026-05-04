import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { GetChartData, GetgetSlaveIdDropdown, GetSensorDropdown, SearchDevicesFetchService, UpdateGraphDisplayName, UpdateSensorDropdown, UpdateSlaveIdDropdown } from '../../../../services/LoginPageService';
// import { GetChartData, GetSensorDropdown, UpdateSensorDropdown, UpdateGraphDisplayName, GetMachineHeaderData, GetSlaveIdDropdown, UpdateSlaveIdDropdown } from '../../../Services/NodeJsApiServices';

export const GraphSettingModal = (props) => {
    const {
        locationDetails
        , graphSettingOpen,
        setGraphSettingOpen,
        selectedGraph,
        setSelectedDropdown,
        selectedGropdown,
        machineId,
        setChartData,
        setChartTwoData,
        setChartThreeData,
        selectedLast, setSelectedLast, selectedAggregation, setSelectedAggregation, selectedInterval, setSelectedInterval, setRefreshData,
        chartOneName, chartTwoName, chartThreeName,
        chartOneSlaveId, chartTwoSlaveId, chartThreeSlaveId, setHeaderRefreshData,
        setBackDropLoader,
        isDarkMode
    } = props;
    console.log("chartOneSlaveIdmachineId22", machineId);
    const [deviceList, setDeviceList] = useState([])
    const [device, setDevice] = useState('');
    const [selectedCheckBox, setSelectedCheckBox] = React.useState([]);
    const [defaultCheckbox, setDefaultCheckBox] = useState([]);
    const [sensorLists, setSensorLists] = useState([]);
    const [defaultList, setDefaultList] = useState([]);
    const [pageRefresher, setPageRefresher] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [slaveIdList, setSlaveIdList] = useState([]);
    const [selectedSlaveId, setSelectedSlaveId] = useState('');
    console.log("selectedSlaveId", selectedSlaveId)
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    // BACKGROUND COLOR OF DROPDOWN LISTS AFTER CLICK
    const MenuProps = {
        PaperProps: {
            style: {
                backgroundColor: isDarkMode ? '#333333' : '#ffffff', // Background color for the dropdown list
            },
        },
    };

    useEffect(() => {

        // setSelectedSlaveId(selectedGraph === "First" ? chartOneSlaveId : selectedGraph === "Second" ? chartTwoSlaveId : chartThreeSlaveId)
        setSelectedSlaveId(selectedGraph === "First" ? chartOneSlaveId : selectedGraph === "Second" ? chartTwoSlaveId : chartThreeSlaveId)
    }, [chartOneSlaveId, chartTwoSlaveId, chartThreeSlaveId, graphSettingOpen]);


    useEffect(() => {
        selectedGraph === "First" && GetgetSlaveIdDropdown({ locationId: locationDetails.locationId, chartNo: 1 }, handleSlaveIdSuccess, handleSlaveIdException)
        selectedGraph === "Second" && GetgetSlaveIdDropdown({ locationId: locationDetails.locationId, chartNo: 2 }, handleSlaveIdSuccess, handleSlaveIdException)
        selectedGraph === "Third" && GetgetSlaveIdDropdown({ locationId: locationDetails.locationId, chartNo: 3 }, handleSlaveIdSuccess, handleSlaveIdException)

        selectedGraph === "First" && graphSettingOpen && GetSensorDropdown({ locationId: locationDetails.locationId, field: "default", chartNo: 1, /*slaveId: selectedSlaveId*/deviceId: selectedSlaveId }, handleGetSensorSuccess, handleGetSensorException)
        selectedGraph === "Second" && graphSettingOpen && GetSensorDropdown({ locationId: locationDetails.locationId, field: "default", chartNo: 2,/*slaveId: selectedSlaveId*/ deviceId: selectedSlaveId }, handleGetSensorSuccess, handleGetSensorException)
        selectedGraph === "Third" && graphSettingOpen && GetSensorDropdown({ locationId: locationDetails.locationId, field: "default", chartNo: 3,/*slaveId: selectedSlaveId*/ deviceId: selectedSlaveId }, handleGetSensorSuccess, handleGetSensorException)
        loderData();
    }, [graphSettingOpen, pageRefresher, selectedSlaveId])

    // SLAVE ID API HANDLER
    const handleSlaveIdSuccess = (dataObject) => {
        // setSlaveIdList(dataObject?.data || []);
        setDeviceList(dataObject?.data || [])
    }
    const handleSlaveIdException = () => { }

    const loderData = () => {
        if (selectedGraph === "First") {
            setDisplayName(chartOneName)
        } else if (selectedGraph === "Second") {
            setDisplayName(chartTwoName)
        } else {
            setDisplayName(chartThreeName)
        }
    }

    const handleGetSensorSuccess = (dataObject) => {
        setDefaultList(dataObject?.data || [])
        const tagNames = dataObject.data.map((item) => item.Tag_name);
        setSensorLists(tagNames);

        // EXRACTING DEFAULT 1 DATA
        const defaultItems = dataObject.data.filter(item => item.isDefault === 1);
        const defaultTagNames = defaultItems.map(item => item.Tag_name);
        setDefaultCheckBox(defaultTagNames);
    }
    const handleGetSensorException = () => { }

    const handleChangeDefault = (event) => {
        setBackDropLoader(true)
        setSelectedDropdown('default')
        const {
            target: { value },
        } = event;

        // Splitting the value if it's a string, otherwise, using it directly
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        // Extracting IDs from the selected values
        const selectedIds = selectedValues.map(val => {
            const selectedTag = defaultList.find(tag => tag.Tag_name === val);
            return selectedTag ? selectedTag.Id : null;
        }).filter(id => id !== null);
        console.log("selectedIds", selectedIds)

        setDefaultCheckBox(
            typeof value === 'string' ? value.split(',') : value,
        );

        // UPDATE FIRST GRAPH
        selectedGraph === "First" && UpdateSensorDropdown({
            locationId: locationDetails.locationId,
            deviceId: chartOneSlaveId,
            field: "default",
            tagId: '',
            selected: typeof value === 'string' ? value.split(',') : value,
            tagId: selectedIds,
            chartNo: 1,
            // slaveId: selectedSlaveId
        }, handleDefaultUpdateSuccess, handleDefaultUpdateException)

        // UPDATE SECOND GRAPH
        selectedGraph === "Second" && UpdateSensorDropdown({
            locationId: locationDetails.locationId,
            deviceId: chartTwoSlaveId,
            field: "default",
            tagId: '',
            selected: typeof value === 'string' ? value.split(',') : value,
            tagId: selectedIds,
            chartNo: 2,
            // slaveId: selectedSlaveId
        }, handleDefaultUpdateSuccess, handleDefaultUpdateException)

        // UPDATE THIRD GRAPH
        selectedGraph === "Third" && UpdateSensorDropdown({
            locationId: locationDetails.locationId,
            deviceId: chartThreeSlaveId,
            field: "default",
            tagId: '',
            selected: typeof value === 'string' ? value.split(',') : value,
            tagId: selectedIds,
            chartNo: 3,
            // slaveId: selectedSlaveId
        }, handleDefaultUpdateSuccess, handleDefaultUpdateException)

    };

    const handleDefaultUpdateSuccess = () => {
        setBackDropLoader(false)
        setPageRefresher((oldvalue) => !oldvalue)

        // GRAPH API
        GetChartData({
            locationId: locationDetails.locationId,
            deviceId: chartOneSlaveId,
            selected: "default",
            aggregation: selectedAggregation,
            interval: selectedInterval,
            sortDataType: selectedLast,
            tagIds: [],
            chartNo: selectedGraph === "First" ? 1 : selectedGraph === "Second" ? 2 : 3,
            // slaveId: selectedSlaveId
        }, handleGetChartDataSuccess, handleGetChartDataException)
    }
    const handleDefaultUpdateException = () => { }

    // GRAPH SUCCESS HANDLER
    const handleGetChartDataSuccess = (dataObject) => {
        selectedGraph === "First" && setChartData(dataObject || [])
        selectedGraph === "Second" && setChartTwoData(dataObject || [])
        selectedGraph === "Third" && setChartThreeData(dataObject || [])
    }
    const handleGetChartDataException = () => { }

    // DISPLAY UPDATE
    const handleUpdateClick = () => {
        setBackDropLoader(true)
        selectedGraph === "First" && UpdateGraphDisplayName({
            chartNumber: "1", displayName: displayName, locationId: locationDetails.locationId,
            deviceId: chartOneSlaveId,
        }, handleDisplayUpdateSuccess, handleDisplayUpdateException)
        selectedGraph === "Second" && UpdateGraphDisplayName({
            chartNumber: "2", displayName: displayName, locationId: locationDetails.locationId,
            deviceId: chartOneSlaveId,
        }, handleDisplayUpdateSuccess, handleDisplayUpdateException)
        selectedGraph === "Third" && UpdateGraphDisplayName({
            chartNumber: "3", displayName: displayName, locationId: locationDetails.locationId,
            deviceId: chartOneSlaveId,
        }, handleDisplayUpdateSuccess, handleDisplayUpdateException)
    }

    const handleDisplayUpdateSuccess = (dataObject) => {
        setBackDropLoader(false)
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });

        // setRefreshData((oldvalue) => !oldvalue);
        setHeaderRefreshData((oldvalue) => !oldvalue)
        setDisplayName('')
        setTimeout(() => {
            handleClose();
        }, 3000);
    }
    const handleDisplayUpdateException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    }

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    // setRefreshData((oldvalue) => !oldvalue);
    const handleChange = (e) => {
        setBackDropLoader(true)
        setSelectedSlaveId(e.target.value)
        // selectedGraph === "First" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 1, deviceId: e.target.value }, handleSlaveIdSuccess, handleSlaveIdException)
        // selectedGraph === "Second" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 2, deviceId: e.target.value }, handleSlaveIdSuccess, handleSlaveIdException)
        // selectedGraph === "Third" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 3, deviceId: e.target.value }, handleSlaveIdSuccess, handleSlaveIdException)
        selectedGraph === "First" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 1, deviceId: e.target.value }, handleUpdateSlaveIdSuccess, handleUpdateSlaveIdException)
        selectedGraph === "Second" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 2, deviceId: e.target.value }, handleUpdateSlaveIdSuccess, handleUpdateSlaveIdException)
        selectedGraph === "Third" && UpdateSlaveIdDropdown({ locationId: locationDetails.locationId, chartNumber: 3, deviceId: e.target.value }, handleUpdateSlaveIdSuccess, handleUpdateSlaveIdException)
    };

    const handleUpdateSlaveIdSuccess = () => {
        // setRefreshData((oldvalue) => !oldvalue);
        setHeaderRefreshData((oldvalue) => !oldvalue)
        setBackDropLoader(false)
    }
    const handleUpdateSlaveIdException = () => { }


    return (
        <Dialog
            open={graphSettingOpen}
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
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Device Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveId}
                                label="Slave Id"
                                onChange={(e) => handleChange(e)}
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
                                {deviceList.map((name) => (
                                    <MenuItem key={name.id} value={name.deviceId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.deviceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Default Sensor</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={defaultCheckbox}
                                onChange={handleChangeDefault}
                                input={<OutlinedInput label="Default Sensor" />}
                                renderValue={(selected) => selected.join(', ')}
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
                            // MenuProps={MenuProps}
                            >
                                {sensorLists.map((name) => (
                                    <MenuItem key={name} value={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        <Checkbox checked={defaultCheckbox.indexOf(name) > -1} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                        <ListItemText primary={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Display Name"
                            variant="outlined"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            inputProps={{ maxLength: 20 }}
                            style={{ backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? '#ffffff' : '#000000', // Text color
                                    fontWeight: 'bold', // Text font weight
                                },
                                '& .MuiInputLabel-root': {
                                    color: isDarkMode ? '#ffffff' : '#021526', // Label color (e.g., red)
                                    fontWeight: 'bold', // Label font weight (optional)
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                            }}
                        />
                        <Typography style={{ fontSize: '13px', color: isDarkMode ? '#F5F5F5' : '#686D76' }}>Max allowed character length 20</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" onClick={handleUpdateClick} style={{ marginTop: '-12px', backgroundColor: isDarkMode ? '#F5F5F5' : '#212529', color: isDarkMode ? '#000000' : '#F5F5F5' }}>Update</Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button style={{ color: isDarkMode ? '#000000' : '#F5F5F5', backgroundColor: isDarkMode ? '#F5F5F5' : '#212529' }} onClick={() => {
                    setGraphSettingOpen(false)
                    // setSelectedSlaveId('')
                }}>Close</Button>
                {/* <Button>
                    Agree
                </Button> */}
            </DialogActions>
            <NotificationBar
                // handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Dialog>
    )
}
