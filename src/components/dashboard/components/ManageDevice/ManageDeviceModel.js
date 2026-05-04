import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { DeviceAddService, DeviceCategoryFetchService, DeviceEditService, DeviceManageAdd, DeviceManageEdit, DeviceMasterCategory, ProjectShowService } from '../../../../services/LoginPageService';
import MapsComponent from '../../../maps/googleMapsComponent';
import 'leaflet/dist/leaflet.css';


const ManageDeviceModel = ({ locationId, open, setOpen, isAddButton, setRefreshData, editMdevice, projectId, centerCoord }) => {
    // console.log("111111111", editMdevice)
    const [deviceName, setDeviceName] = useState('');
    const [deviceCategory, setDeviceCategory] = useState('');
    const [errorObject, setErrorObject] = useState({});
    const [datasecreate, setDataSecreate] = useState('');

    const [deviceTag, setDeviceTag] = useState('');
    const [macAddress, setMacAddress] = useState('');
    const [firmwareVersion, setFirmwareVersion] = useState('');
    const [hardwareVersion, setHardwareVersion] = useState('');
    const [deviceSecret, setDeviceSecret] = useState('');

    const [categoryList, setCategoryList] = useState([]);
    const [id, setId] = useState('');


    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const [showEnable, setShowEnable] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();


        if (isAddButton) {
            DeviceAddService({
                deviceName,
                deviceCategory,
                mode: showEnable,
                deviceTag,
                firmwareVersion,
                hardwareVersion,
                macAddress,
                encryptionKey: datasecreate,
                secretKey: deviceSecret,
                locationId
            }, handleSuccess1, handleException01);
        } else {
            DeviceEditService(
                {
                    id,
                    deviceName,
                    deviceCategory,
                    mode: showEnable,
                    deviceTag,
                    firmwareVersion,
                    hardwareVersion,
                    macAddress,
                    encryptionKey: datasecreate,
                    secretKey: deviceSecret,
                    locationId
                },
                handleSuccess2, handleException2);

        }


    }

    const handleSuccess1 = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: "Device added successfully",
        });

        setRefreshData((oldvalue) => !oldvalue);
        setOpen(false);

    };
    const handleException2 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
    };
    const handleException01 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
    };

    const handleSuccess2 = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: "Device Updated successfully",
        });

        setRefreshData((oldvalue) => !oldvalue);
        setOpen(false);

    };


    const loadData = () => {
        setDeviceCategory(editMdevice.deviceCategory || '')
        setId(editMdevice.id || '')
        setDeviceName(editMdevice.deviceName || '')
        setDeviceTag(editMdevice.deviceTag || '')
        setMacAddress(editMdevice.macAddress || '')
        setFirmwareVersion(editMdevice.firmwareVersion || '')
        setHardwareVersion(editMdevice.hardwareVersion || '')
        setShowEnable(editMdevice.mode || '')
        setDeviceSecret(editMdevice.secretKey || '')
        setDataSecreate(editMdevice.encryptionKey || '')

    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    useEffect(() => {
        loadCategory();
        loadData();
    }, [editMdevice]);

    const categoryHandleSuccess = (dataObject) => {
        setCategoryList(dataObject.data);
    };

    const loadCategory = () => {
        DeviceCategoryFetchService(categoryHandleSuccess, handleException1);
    };
    const handleException1 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
    };


    // const formRef = useRef(null);
    return (
        <>
            <Dialog open={open} fullWidth={true} maxWidth="md"
            >
                <form /*ref={formRef} */ onSubmit={handleSubmit}>
                    <DialogContent style={{ height: 'auto' }}>
                        <DialogTitle style={{ float: 'left', padding: '0px', }}>
                            {isAddButton ? 'Add Device' : 'Edit Device'}
                        </DialogTitle>


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
                                    // onBlur={() => validateForNullValue(deviceName, 'deviceName')}
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
                                    // onBlur={() => validateForNullValue(deviceTag, 'deviceTag')}
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
                                    // onBlur={() => validateForNullValue(macAddress, 'macAddress')}
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
                                    // onBlur={() => validateForNullValue(firmwareVersion, 'firmwareVersion')}
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
                                    value={hardwareVersion}
                                    // onBlur={() => validateForNullValue(hardwareVersion, 'hardwareModelVersion')}
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
                                    fullWidth
                                    label="Data Encription Secreate Key"
                                    value={datasecreate}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setDataSecreate(e.target.value);
                                    }}
                                    id="outlined-required"
                                    error={errorObject?.datasecreate?.errorStatus}
                                    helperText={errorObject?.datasecreate?.helperText}
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
                                    // onBlur={() => validateForNullValue(deviceSerialNo, 'deviceSerialNo')}
                                    onChange={(e) => {
                                        setDeviceSecret(e.target.value);
                                    }}
                                    id="outlined-required"
                                    label="Device secret"
                                    fullWidth
                                    error={errorObject?.deviceSecret?.errorStatus}
                                    helperText={errorObject?.deviceSecret?.helperText}
                                    autoComplete="off"
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
                        </Grid>


                        {/* )} */}

                    </DialogContent>
                    <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>

                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                        >
                            {isAddButton ? 'Add' : 'Update'}
                        </Button>
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