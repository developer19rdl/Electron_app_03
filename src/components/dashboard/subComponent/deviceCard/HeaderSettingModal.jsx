import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { GetHeaderDeviceIdDropdown, GetHeaderTagIdDropdown, GetMachineDeviceHeaderData, UpdateMachineHeaderData } from '../../../../services/LoginPageService';


export const HeaderSettingModal = (props) => {
    const { headerSettingOpen, setHeaderSettingOpen, machineId, setRefreshData, setHeaderRefreshData, isDarkMode, locationDetails } = props;
    const [parameterList, setParameterList] = useState([])
    const [slaveIdList, setSlaveIdList] = useState([]);
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
        headerSettingOpen && GetHeaderTagIdDropdown({ locationId: locationDetails.locationId, field: "selectAll", }, handleGetSensorSuccess, handleGetSensorException)
        headerSettingOpen && GetMachineDeviceHeaderData({ locationId: locationDetails.locationId, }, handleHeaderSuccess, handleHeaderException)
        headerSettingOpen && GetHeaderDeviceIdDropdown({ locationId: locationDetails.locationId, }, handleSlaveIdSuccess, handleSlaveIdException)

    }, [headerSettingOpen])

    // SLAVE ID API HANDLER
    const handleSlaveIdSuccess = (dataObject) => {
        setSlaveIdList(dataObject?.data || []);
    }
    const handleSlaveIdException = () => { }

    const handleGetSensorSuccess = (dataObject) => {
        setParameterList(dataObject?.data || [])
    }
    const handleGetSensorException = () => { }

    const handleHeaderSuccess = (dataObject) => {
        setDisplayLineOneName(dataObject?.data[0].Parameter1_labelname || '')
        setSelectedLineOneParameter(dataObject?.data[0].Parameter1 || '')
        setSetLineOneName(dataObject?.data[0].Parameter1_setname || '')
        setSetLineOneValue(dataObject?.data[0].Parameter1_setvalue || '')

        setDisplayLineTwoName(dataObject?.data[0].Parameter2_labelname || '')
        setSelectedLineTwoParameter(dataObject?.data[0].Parameter2 || '')
        setSetLinTwoName(dataObject?.data[0].Parameter2_setname || '')
        setSetLinTwoValue(dataObject?.data[0].Parameter2_setvalue || '')

        setDisplayLineThreeName(dataObject?.data[0].Parameter3_labelname || '')
        setSelectedLineThreeParameter(dataObject?.data[0].Parameter3 || '')

        setSelectedSlaveIdOne(dataObject?.data[0].parameterSlaveId1 || '')
        setSelectedSlaveIdTwo(dataObject?.data[0].parameterSlaveId2 || '')
        setSelectedSlaveIdThree(dataObject?.data[0].parameterSlaveId3 || '')
    }

    const handleHeaderException = () => { }


    const [displayLineOneName, setDisplayLineOneName] = useState('');
    const [selectedLineOneParameter, setSelectedLineOneParameter] = useState('');
    const [setLineOneName, setSetLineOneName] = useState('');
    const [setLineOneValue, setSetLineOneValue] = useState('');

    const [displayLineTwoName, setDisplayLineTwoName] = useState('');
    const [selectedLineTwoParameter, setSelectedLineTwoParameter] = useState('');
    const [setLinTwoName, setSetLinTwoName] = useState('');
    const [setLinTwoValue, setSetLinTwoValue] = useState('');

    const [displayLineThreeName, setDisplayLineThreeName] = useState('');
    const [selectedLineThreeParameter, setSelectedLineThreeParameter] = useState('');

    const [selectedSlaveIdOne, setSelectedSlaveIdOne] = useState('');
    const [selectedSlaveIdTwo, setSelectedSlaveIdTwo] = useState('');
    const [selectedSlaveIdThree, setSelectedSlaveIdThree] = useState('');

    const handleSubmitForm = () => {
        UpdateMachineHeaderData({
            locationId: locationDetails.locationId,
            Parameter1: selectedLineOneParameter,
            Parameter1_setvalue: setLineOneValue,
            Parameter1_labelname: displayLineOneName,
            Parameter1_setname: setLineOneName,
            parameterSlaveId1: selectedSlaveIdOne,
            Parameter2: selectedLineTwoParameter,
            Parameter2_setvalue: setLinTwoValue,
            Parameter2_labelname: displayLineTwoName,
            Parameter2_setname: setLinTwoName,
            parameterSlaveId2: selectedSlaveIdTwo,
            Parameter3: selectedLineThreeParameter,
            Parameter3_labelname: displayLineThreeName,
            parameterSlaveId3: selectedSlaveIdThree,
        }, handleUpdateSuccess, handleUpdateException)
    }

    const handleUpdateSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });

        // setRefreshData((oldvalue) => !oldvalue);
        setHeaderRefreshData((oldvalue) => !oldvalue)
        setTimeout(() => {
            handleClose();
            setHeaderSettingOpen(false)
        }, 3000);
    }
    const handleUpdateException = (errorObject, errorMessage) => {
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


    return (
        <Dialog
            open={headerSettingOpen}
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%', backgroundColor: isDarkMode ? '#1A2027' : '#ffffff' } }}
            maxWidth="md"
        >
            {/* <DialogTitle id="alert-dialog-title">
                Header Filter
            </DialogTitle> */}
            <DialogContent>
                <Grid container spacing={2}>
                    {/* ===================TEMP==================== */}
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Display Name"
                            variant="outlined"
                            value={displayLineOneName}
                            onChange={(e) => setDisplayLineOneName(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Slave Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdOne}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdOne(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.slaveId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.slaveId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Device Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdOne}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdOne(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.deviceId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.deviceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Parameter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLineOneParameter}
                                label="Parameter"
                                onChange={(e) => setSelectedLineOneParameter(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {parameterList.map((name) => (
                                    <MenuItem key={name.Id} value={name.Id} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.Tag_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Set Name"
                            variant="outlined"
                            value={setLineOneName}
                            onChange={(e) => setSetLineOneName(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Set Value"
                            variant="outlined"
                            value={setLineOneValue}
                            onChange={(e) => setSetLineOneValue(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Divider />
                    </Grid>

                    {/* ====================VIBRATION====================== */}
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Display Name"
                            variant="outlined"
                            value={displayLineTwoName}
                            onChange={(e) => setDisplayLineTwoName(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Slave Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdTwo}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdTwo(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.slaveId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.slaveId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Device Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdTwo}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdTwo(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.deviceId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.deviceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Parameter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLineTwoParameter}
                                label="Parameter"
                                onChange={(e) => setSelectedLineTwoParameter(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {parameterList.map((name) => (
                                    <MenuItem key={name.Id} value={name.Id} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.Tag_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Set Name"
                            variant="outlined"
                            value={setLinTwoName}
                            onChange={(e) => setSetLinTwoName(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Set Value"
                            variant="outlined"
                            value={setLinTwoValue}
                            onChange={(e) => setSetLinTwoValue(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Divider />
                    </Grid>
                    {/* =======================ENERGY========================== */}
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <TextField
                            id="outlined-basic"
                            label="Display Name"
                            variant="outlined"
                            value={displayLineThreeName}
                            onChange={(e) => setDisplayLineThreeName(e.target.value)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Slave Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdThree}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdThree(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.slaveId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.slaveId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Device Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedSlaveIdThree}
                                label="Slave Id"
                                onChange={(e) => setSelectedSlaveIdThree(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {slaveIdList.map((name) => (
                                    <MenuItem key={name.id} value={name.deviceId} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.deviceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Parameter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedLineThreeParameter}
                                label="Parameter"
                                onChange={(e) => setSelectedLineThreeParameter(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                    },
                                    '& .MuiSelect-icon': {
                                        color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                    },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                                {parameterList.map((name) => (
                                    <MenuItem key={name.Id} value={name.Id} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                        {name.Tag_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setHeaderSettingOpen(false)} style={{ backgroundColor: isDarkMode ? '#F5F5F5' : '#212529', color: isDarkMode ? '#000000' : '#F5F5F5' }}>Close</Button>
                <Button onClick={handleSubmitForm} style={{ backgroundColor: isDarkMode ? '#F5F5F5' : '#212529', color: isDarkMode ? '#000000' : '#F5F5F5' }}>
                    Update
                </Button>
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
