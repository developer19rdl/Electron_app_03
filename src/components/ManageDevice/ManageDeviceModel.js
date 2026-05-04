import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { DeviceManageAdd, DeviceManageEdit, DeviceMasterCategory, ProjectShowService } from '../../../../services/LoginPageService';
import MapsComponent from '../../../maps/googleMapsComponent';
import 'leaflet/dist/leaflet.css';


const ManageDeviceModel = ({ open, setOpen, isAddButton, setRefreshData, editMdevice, projectId, centerCoord }) => {

    console.log("centerCoord", centerCoord)
    const [id, setId] = useState('');
    // const [longitude, setLongitude] = useState(0);
    //   const [latitude, setLatitude] = useState(0);
    const [statusType, setStatusType] = useState('');
    const [deviceTime, setDeviceTime] = useState('');
    const [protocolType, setProtocolType] = useState('');
    const [deviceCategory, setDeviceCategory] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [deviceDescriptioon, setDeviceDescription] = useState('');
    const [locationName, setLoactionName] = useState('');
    const [pollinginterval, setPollingInterval] = useState('');
    const [server, setServer] = useState('');
    const [datasecreate, setDataSecreate] = useState('');
    const [devciesecreate, setDeviceSecreat] = useState('');
    const [selectedOption, setSelectedOption] = useState('Standalone');
    const [showDeviceSecret, setShowDeviceSecret] = useState(false);
    const [showEnable, setShowEnable] = useState(false);
    console.log("enable", showEnable)
    const [showDisable, setShowDisable] = useState(false);
    const [showSSL, setShowSSL] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ProjectList, setProjectList] = useState([]);
    const [Devicelist, setDeviceList] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(projectId);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [markerLat, setMarkerLat] = useState(0);
    const [markerLng, setMarkerLng] = useState(0);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        setShowDeviceSecret(false); // Reset secret field visibility when switching options
    };

    const [firmwareBinFile, setFirmwareBinFile] = useState({});
    const [binFileName, setBinFileName] = useState('');
    const [deviceTag, setDeviceTag] = useState('');
    const [macAddress, setMacAddress] = useState('');
    const [firmwareVersion, setFirmwareVersion] = useState('');
    const [hardwareVersion, setHardwareVersion] = useState('');
    const [deviceSerialNo, setDeviceSerialNo] = useState('');
    const [deviceSecret, setDeviceSecret] = useState('');
    const [nonPollingPriority, setNonPollingPriority] = useState('');
    const [floorCords, setFloorCords] = useState('');
    // const [deviceCategoryId, setDeviceCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [errorObject, setErrorObject] = useState({});
    const [hooter, setHooter] = useState('Non');
    const [pointer, setPointer] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (longitude === '' || latitude === '') {
            setErrorObject((oldErrorState) => {
                let status = {};
                status = {
                    errorStatus: true,
                    helperText: 'Please choose the points in Map',
                };
                return {
                    ...oldErrorState,
                    coordinates: status,
                };
            });
        } else {
            const coordinates = JSON.stringify(`${latitude},${longitude}`).replaceAll(
                '"',
                '',
            );
            if (isAddButton) {
                DeviceManageAdd(
                    {
                        project_id: selectedDevice,
                        status: statusType,
                        motorCategory: deviceCategory,
                        motorName: devicename,
                        motorDescription: deviceDescriptioon,
                        locationName: locationName,
                        pollingInterval: pollinginterval,
                        motorStatus: showEnable,
                        Ssl: showSSL,
                        serverName: server,
                        dataEncrySecrKey: datasecreate,
                        motorTime: deviceTime,
                        protocol: protocolType,
                        motorSecret: devciesecreate,
                        motorCordinates: coordinates
                    },
                    deviceManageSuccess,
                    deviceManageException
                );
            } else {
                DeviceManageEdit(
                    {
                        id,
                        project_id: selectedDevice,
                        status: statusType,
                        motorCategory: deviceCategory,
                        motorName: devicename,
                        motorDescription: deviceDescriptioon,
                        locationName: locationName,
                        pollingInterval: pollinginterval,
                        motorStatus: showEnable,
                        Ssl: showSSL,
                        serverName: server,
                        dataEncrySecrKey: datasecreate,
                        motorTime: deviceTime,
                        protocol: protocolType,
                        motorSecret: devciesecreate,
                        motorCordinates: coordinates
                    },
                    deviceManageSuccess,
                    deviceManageException
                );
            }

        };
    }

    const deviceManageSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);
        setOpenInnerDialog(false);
        setTimeout(() => {
            resetForm();
            handleClose();
            // setProgressStatus(1);
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    const deviceManageException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    };
    useEffect(() => {
        ProjectShowService(handleProjectSuccess, handleProjectException);
        DeviceMasterCategory(handleSuccess, handleException);
        setOpen(open);
        loadData();
        setSelectedDevice(projectId);
    }, [editMdevice, projectId]);
    const handleProjectSuccess = (dataObject) => {
        // setGridLoading(false);
        setProjectList(dataObject);
    };

    const handleProjectException = (errorObject) => {

    };

    const handleSuccess = (dataObject) => {
        setDeviceList(dataObject || []);
    };
    const handleException = () => {

    };
    const loadData = () => {
        const coordinates = editMdevice.motorCordinates
            ? editMdevice.motorCordinates.split(',')
            : ['', ''];
        console.log("editMdevice", coordinates)
        setLatitude(parseFloat(coordinates[0]) || '');
        setLongitude(parseFloat(coordinates[1]) || '');
        setId(editMdevice.id || '');
        setStatusType(editMdevice.status || '')
        setDeviceCategory(editMdevice.motorCategoryId || '')
        setDeviceName(editMdevice.motorName || '')
        setDeviceDescription(editMdevice.motorDescription || '')
        setLoactionName(editMdevice.locationName || '')
        setPollingInterval(editMdevice.pollingInterval || '')
        setProtocolType(editMdevice.protocol || '')
        setServer(editMdevice.serverName || '')
        setDeviceSecreat(editMdevice.motorSecret || '')
        setDeviceTime(editMdevice.motorTime || '')
        setDataSecreate(editMdevice.dataEncrySecrKey || '')

        setShowEnable(editMdevice.motorStatus || '')
        setShowSSL(editMdevice.Ssl || '')
    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    const onMapClick = (newPosition) => {
        delete errorObject.coordinates; // Clear previous errors

        // Set the new latitude and longitude values
        setLatitude(newPosition.lat);
        setLongitude(newPosition.lng);
    };


    const [openInnerDialog, setOpenInnerDialog] = useState(false);

    const handleOpenInnerDialog = () => {
        setOpenInnerDialog(true);
    };

    const handleCloseInnerDialog = () => {
        setOpenInnerDialog(false);
        setErrorObject({});
        setLatitude('');
        setLongitude('');
        setLoactionName('')
    };
    const formRef = useRef(null);
    return (
        <>
            <Dialog open={open} fullWidth={true} maxWidth="md"
            >
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogContent style={{ height: 'auto' }}>
                        <DialogTitle style={{ float: 'left', padding: '0px', }}>
                            {isAddButton ? 'Add Device' : 'Edit Device'}
                        </DialogTitle>

                        {/* <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Project</InputLabel>
                                    <Select
                                        value={selectedDevice}
                                        label="Project"
                                        disabled
                                        onChange={(e) => {
                                            setSelectedDevice(e.target.value);

                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {ProjectList.map((data, index) => (
                                            <MenuItem value={data.id} key={index + 1} disabled={data.id !== selectedDevice} >
                                                {data.projectName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Type"
                                    autoComplete="off"
                                    select
                                    value={statusType}
                                    onChange={(e) => {
                                        setStatusType(e.target.value);
                                    }}
                                >
                                    <MenuItem value="Standalone">Standalone</MenuItem>
                                    <MenuItem value="Movable">Movable</MenuItem>

                                </TextField>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Device Category"
                                    autoComplete="off"
                                    value={deviceCategory}
                                    onChange={(e) => {
                                        setDeviceCategory(e.target.value);
                                    }}
                                    select
                                >
                                    {Devicelist.map((data, index) => (
                                        <MenuItem value={data.id} key={index + 1}  >
                                            {data.motorCategory}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Device Name"
                                    value={devicename}
                                    onChange={(e) => {
                                        setDeviceName(e.target.value)
                                    }}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Device Description"
                                    value={deviceDescriptioon}
                                    onChange={(e) => {
                                        setDeviceDescription(e.target.value)
                                    }}
                                    autoComplete="off"
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Polling Interval"
                                    value={pollinginterval}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setPollingInterval(e.target.value)
                                    }}
                                    select
                                >
                                    <MenuItem value="1sec">1 Sec</MenuItem>
                                    <MenuItem value="5sec">5 Sec</MenuItem>
                                    <MenuItem value="10sec">10 Sec</MenuItem>
                                    <MenuItem value="30sec">30 Sec</MenuItem>
                                    <MenuItem value="1min">1 min</MenuItem>
                                    <MenuItem value="15min">15 min</MenuItem>
                                    <MenuItem value="1hr">1 hr</MenuItem>
                                    <MenuItem value="2hr">2 hr</MenuItem>
                                    <MenuItem value="24hr">24 hr</MenuItem>



                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Protocol Type"
                                    value={protocolType}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setProtocolType(e.target.value);
                                    }}
                                    select
                                >
                                    <MenuItem value="MQTT">MQTT</MenuItem>
                                    <MenuItem value="JSON">JSON</MenuItem>

                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Server Name"
                                    value={server}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setServer(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Data Encription Secreate Key"
                                    value={datasecreate}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setDataSecreate(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="device Time"
                                    value={deviceTime}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setDeviceTime(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="device Secreate"
                                    value={devciesecreate}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setDeviceSecreat(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1.3} style={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showEnable}
                                            // disabled={showDisable}
                                            onChange={(e) => setShowEnable(e.target.checked)}
                                        />
                                    }
                                    label="Enable"
                                />
                            </Grid>
                           
                            <Grid item xs={1.3} style={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showSSL}

                                            onChange={(e) => setShowSSL(e.target.checked)}
                                        />
                                    }
                                    label="SSL"
                                />
                            </Grid>
                            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', }}>
                                <Button variant="contained" color="primary" onClick={handleOpenInnerDialog}>
                                    Location
                                </Button>
                            </Grid>
                        </Grid> */}

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <FormControl fullWidth  >
                                    <InputLabel id="demo-simple-select-label">
                                        Device Category
                                    </InputLabel>
                                    <Select
                                        // sx={{ height: 40 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={deviceCategory}
                                        required
                                        label="Device Category"
                                        onChange={(e) => {
                                            setDeviceCategory(e.target.value);
                                        }}
                                        error={errorObject?.deviceCategory?.errorStatus}
                                        helperText={errorObject?.deviceCategory?.helperText}
                                    >
                                        {categoryList.map((data) => (
                                            <MenuItem value={data.id} key={data.id}>
                                                {data.cateName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={deviceName}
                                    onBlur={() => validateForNullValue(deviceName, 'deviceName')}
                                    onChange={(e) => {
                                        setDeviceName(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Name of the device"
                                    fullWidth
                                    error={errorObject?.deviceName?.errorStatus}
                                    helperText={errorObject?.deviceName?.helperText}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={deviceTag}
                                    onBlur={() => validateForNullValue(deviceTag, 'deviceTag')}
                                    onChange={(e) => {
                                        setDeviceTag(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Device Tag"
                                    fullWidth
                                    error={errorObject?.deviceTag?.errorStatus}
                                    helperText={errorObject?.deviceTag?.helperText}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={macAddress}
                                    onBlur={() => validateForNullValue(macAddress, 'macAddress')}
                                    onChange={(e) => {
                                        setMacAddress(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="MAC address / Secret key"
                                    autoComplete="off"
                                    fullWidth
                                    error={errorObject?.macAddress?.errorStatus}
                                    helperText={errorObject?.macAddress?.helperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={firmwareVersion}
                                    onBlur={() => validateForNullValue(firmwareVersion, 'firmwareVersion')}
                                    onChange={(e) => {
                                        setFirmwareVersion(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Firmware version"
                                    autoComplete="off"
                                    fullWidth
                                    error={errorObject?.firmwareVersion?.errorStatus}
                                    helperText={errorObject?.firmwareVersion?.helperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={hardwareVersion}
                                    onBlur={() => validateForNullValue(hardwareVersion, 'hardwareModelVersion')}
                                    onChange={(e) => {
                                        setHardwareVersion(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Hardware version"
                                    autoComplete="off"
                                    fullWidth
                                    error={errorObject?.hardwareVersion?.errorStatus}
                                    helperText={errorObject?.hardwareVersion?.helperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={deviceSerialNo}
                                    onBlur={() => validateForNullValue(deviceSerialNo, 'deviceSerialNo')}
                                    onChange={(e) => {
                                        setDeviceSerialNo(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Device Serial No"
                                    fullWidth
                                    error={errorObject?.deviceSerialNo?.errorStatus}
                                    helperText={errorObject?.deviceSerialNo?.helperText}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                <TextField
                                    // sx={{
                                    //     marginTop: 0,
                                    //     '& .MuiInputBase-root': {
                                    //         height: '40px',
                                    //     },
                                    //     '& .MuiInputBase-input': {
                                    //         padding: '6px 12px',
                                    //     },
                                    // }}
                                    value={deviceSecret}
                                    onBlur={() => validateForNullValue(deviceSerialNo, 'deviceSerialNo')}
                                    onChange={(e) => {
                                        setDeviceSecret(e.target.value);
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Device secret"
                                    fullWidth
                                    error={errorObject?.deviceSecret?.errorStatus}
                                    helperText={errorObject?.deviceSecret?.helperText}
                                    autoComplete="off"
                                />
                            </Grid>
                        </Grid>

                        <Dialog sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }} maxWidth="lg" open={openInnerDialog} onClose={handleCloseInnerDialog}>
                            {/* <DialogTitle>Inner Dialog</DialogTitle> */}
                            {/* <DialogContent> */}
                            <Grid container spacing={2} padding={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Location Name"
                                        value={locationName}
                                        onChange={(e) => {
                                            setLoactionName(e.target.value)
                                        }}
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    {/* <div className="rounded-md -space-y-px mb-2 w-full"> */}
                                    <TextField
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        label="Latitude"
                                        type="text"
                                        disabled
                                        value={latitude}
                                        variant="outlined"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                                                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                        required
                                        onChange={(e) => {
                                            setLatitude(e.target.value);
                                        }}
                                        autoComplete="off"
                                        //   error={errorObject?.coordinates?.errorStatus}
                                        //   helperText={errorObject?.coordinates?.helperText}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    {/* </div> */}
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        label="Longitude"
                                        type="text"
                                        disabled
                                        value={longitude}
                                        variant="outlined"
                                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                                                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                        required
                                        onChange={(e) => {
                                            setLongitude(e.target.value);
                                        }}
                                        autoComplete="off"
                                        //   error={errorObject?.coordinates?.errorStatus}
                                        //   helperText={errorObject?.coordinates?.helperText}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>


                            <div className="w-10/12 mr-auto ml-auto sm:float-right lg:float-left  pr-1 mb-7 min-[320px]:w-full min-[768px]:w-[80%] ">
                                <Grid item xs={4} sm={4} md={4} lg={4} />

                                <MapsComponent
                                    onMarkerDrop={onMapClick}
                                    longitude={markerLng}
                                    latitude={markerLat}
                                    // locationName={locationData.locationName}
                                    center={isAddButton ? { lat: Number(centerCoord.lat), lng: Number(centerCoord.lng) } :
                                        { lat: Number(latitude) || 80.500, lng: Number(longitude) || 23.500 }}
                                    zoom={4}
                                    flagDistance={1}
                                />
                            </div>

                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        formRef.current.requestSubmit(); // Manually trigger form submission
                                    }}
                                >
                                    {isAddButton ? 'Add' : 'Update'}
                                </Button>
                                <Button color="primary" variant='contained' onClick={handleCloseInnerDialog}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* )} */}

                    </DialogContent>
                    <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>

                        <Button
                            onClick={() => {
                                setOpen(false);

                            }}
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Dialog>
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </>
    )
}

export default ManageDeviceModel