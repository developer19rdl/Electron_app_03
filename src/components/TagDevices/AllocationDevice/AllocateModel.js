import React, { useEffect, useState } from 'react';
import {
    Button, Checkbox, Dialog, DialogContent, DialogTitle, TextField,
    Grid, DialogActions, FormControl, InputLabel, Select, MenuItem, Typography
} from '@mui/material';
import { AddTagShow, assetTypeShow, DeviceCategoryName, DeviceTAgName, TagAllocationeAdd, TagAllocationeEdit } from '../../../services/LoginPageService';
// import { EdgeDeviceName, EdgeDeviceViewname, MachineDeviceCategoryView, MachineDevicenameview, Machinenameview, TagAddAdd, TagAddViewedit } from '../../../Services/NodeJsApiServices.js';

function AllocateModel({ open, setOpen, isAddButton, edittagAllocation, setRefreshData }) {

    console.log("edittagAllocation", edittagAllocation);

    const [id, setId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [deviceCategoryList, setDeviceCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [devicecategory, setDeviceCategory] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState('');
    const [tagName, setTagName] = useState('');
    const jsonTypeList = [
        { id: 1, outPut: 'Digital' },
        { id: 2, outPut: 'Analog' },
        { id: 3, outPut: 'Modbus' },
        { id: 4, outPut: 'Std' },
    ]
    const [jsonType, setJsonType] = useState('');
    const [criticalMinValue, setCriticalMinValue] = useState('');
    const [slaveid, setSlaveId] = useState('');
    const [mailid, setMailId] = useState('');
    const [criticalMaxValue, setCriticalMaxValue] = useState('');
    const [warningMinValue, setWarningMinValue] = useState('');
    const [warningMaxValue, setWarningMaxValue] = useState('');
    const [outOfRangeMinValue, setOutOfRangeMinValue] = useState('');
    const [outOfRangeMaxValue, setOutOfRangeMaxValue] = useState('');
    const [resetCountValue, setResetCountValue] = useState('');
    const [alertCount, setAlertCount] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [Status, setStatus] = useState(false);
    const [latchAlert, setLatchAlert] = useState(false);


    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        setOpen(open);
        loadData();
        open && assetTypeShow(handleassetTypeShowFetchSuccess, handleassetTypeShowFetchException)
        AddTagShow(
            handleTagSuccess,
            handleTagException)
    }, [edittagAllocation, open]);

    const handleassetTypeShowFetchSuccess = (dataObject) => {
        setCategoryList(dataObject.data);
    };

    const handleassetTypeShowFetchException = (errorStatus, errorMessage) => {
        console.log(errorMessage);
    };



    const handleTagSuccess = (dataObject) => {
        setDeviceCategoryList(dataObject.data);
    };

    const handleTagException = (errorObject, errorMessage) => {
        // Handle error when fetching the asset list
        console.error(errorMessage);
    };

    const loadData = () => {
        if (!isAddButton) {
            DeviceTAgName({
                deviceCategoryId: edittagAllocation?.deviceId
            }, handleFetchDeviceSuccess, handleFetchDeviceException);
        }
        setId(edittagAllocation.id || '');
        setCategoryId(edittagAllocation.assetId || '');
        setDeviceCategory(edittagAllocation.devCateId)
        setDeviceId(edittagAllocation.deviceId || '');
        setSlaveId(edittagAllocation.slaveId || '');
        setMailId(edittagAllocation.email || '');
        setTagName(edittagAllocation.tagsName || '');
        setJsonType(edittagAllocation.functions || '');
        setWarningMinValue(edittagAllocation.minWarningAlert || '');
        setWarningMaxValue(edittagAllocation.maxWarningAlert || '');
        setOutOfRangeMinValue(edittagAllocation.minOutRangeAlert || '');
        setOutOfRangeMaxValue(edittagAllocation.maxOutRangeAlert || '');
        setCriticalMinValue(edittagAllocation.minCriticalValue || '');
        setCriticalMaxValue(edittagAllocation.maxCriticalValue || '');
        setIsAlert(Number(edittagAllocation.isAlerts) || false);
        setAlertCount(edittagAllocation.alertCount || '')
        setResetCountValue(edittagAllocation.alertResetCount || '')
        setStatus(Number(edittagAllocation.isSms) || false);
        setLatchAlert(Number(edittagAllocation.isLatchedAlert) || false);
        // !isAddButton && FetchCategoryDeviceListService({ deviceCategoryId: edittagAllocation.deviceCategoryId }, handleDeviceFetchSuccess, handleDeviceFetchException);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAddButton) {
            TagAllocationeAdd(
                {
                    asset: categoryId,
                    devCate: devicecategory,
                    tagsName: tagName,
                    email: mailid,
                    deviceName: deviceId,
                    functions: jsonType,
                    slaveId: slaveid,
                    minCriticalValue: criticalMinValue,
                    maxCriticalValue: criticalMaxValue,
                    minWarningAlert: warningMinValue,
                    maxWarningAlert: warningMaxValue,
                    minOutRangeAlert: outOfRangeMinValue,
                    maxOutRangeAlert: outOfRangeMaxValue,
                    isAlerts: isAlert,
                    alertCount: alertCount,
                    alertResetCount: resetCountValue,
                    isSms: Status,
                    isLatchedAlert: latchAlert
                },
                handleSuccess, handleException)
        } else {
            TagAllocationeEdit(
                {
                    id,
                    asset: categoryId,
                    devCate: devicecategory,
                    tagsName: tagName,
                    email: mailid,
                    deviceName: deviceId,
                    functions: jsonType,
                    slaveId: slaveid,
                    minCriticalValue: criticalMinValue,
                    maxCriticalValue: criticalMaxValue,
                    minWarningAlert: warningMinValue,
                    maxWarningAlert: warningMaxValue,
                    minOutRangeAlert: outOfRangeMinValue,
                    maxOutRangeAlert: outOfRangeMaxValue,
                    isAlerts: isAlert,
                    alertCount: alertCount,
                    alertResetCount: resetCountValue,
                    isSms: Status,
                    isLatchedAlert: latchAlert
                },
                handleSuccess, handleException)
        }
    };

    const handleSuccess = (dataObject) => {
        setRefreshData((oldvalue) => !oldvalue);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);

        setTimeout(() => {
            handleClose();
            setOpen(false);
        }, 2000);

    };

    const handleException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 5000);
    };

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setIsAlert(checked);
    };

    const handleSetCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setStatus(checked);
    };

    const handleLatchCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setLatchAlert(checked);
    };

    const getDeviceCategory = (e) => {
        DeviceTAgName({
            deviceCategoryId: e.target.value
        }, handleFetchDeviceSuccess, handleFetchDeviceException);
    };
    const handleFetchDeviceSuccess = (dataObject) => {
        setDeviceList(dataObject.data || [])
    };
    const handleFetchDeviceException = (errorObject, errorMessage) => {

    };
    const handleDeviceNameChange = (deviceId) => {
        // Find the selected motor's details
        const selectedDevice = deviceList.find((device) => device.deviceId === deviceId);
        if (selectedDevice) {
            setTagName(selectedDevice.deviceTag); // Update the locationName state
        } else {
            setTagName(""); // Reset the locationName if no match found
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ color: '#000000', fontWeight: 'bold' }}>
                    {isAddButton ? 'Asset Allocation' : 'Edit Tag'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={4}>
                            <FormControl fullWidth /*margin="normal"*/>
                                <InputLabel id="demo-simple-select-label">
                                    Asset
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryId}
                                    label="Sensor Category"
                                    // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                                    onChange={(e) => {
                                        setCategoryId(e.target.value);
                                        console.log('setDepartment', e.target.value);
                                        // CategoryChanged(e.target.value);


                                    }}
                                    required
                                >
                                    {categoryList.map((data) => (
                                        <MenuItem value={data.id}>{data.assetTypeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth /*margin="normal"*/>
                                <InputLabel id="demo-simple-select-label">
                                    Device Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={devicecategory}
                                    label="Sensor Category"
                                    // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                                    onChange={(e) => {
                                        setDeviceCategory(e.target.value);
                                        console.log('setDepartment', e.target.value);
                                        // CategoryChanged(e.target.value);
                                        getDeviceCategory(e)


                                    }}
                                    required
                                >
                                    {deviceCategoryList.map((data) => (
                                        <MenuItem value={data.id}>{data.cateName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth /*margin="normal"*/>
                                <InputLabel id="demo-simple-select-label">
                                    Device
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={deviceId}
                                    label="Device"
                                    // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                                    onChange={(e) => {
                                        setDeviceId(e.target.value);
                                        // handleDeviceNameChange(e.target.value);

                                    }}
                                    required

                                >
                                    {deviceList.map((data) => (
                                        // <MenuItem key={data.id} value={data.id}>{data.department}</MenuItem>
                                        <MenuItem key={data.deviceId} value={data.deviceId}>{data.deviceName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                // disabled={isAddButton}
                                value={tagName}
                                id="outlined-basic"
                                label="Tag Name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => { setTagName(e.target.value); }}
                                autoComplete="off"
                                required
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                value={slaveid}
                                id="outlined-basic"
                                label="Slave Id"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => { setSlaveId(e.target.value); }}
                                autoComplete="off"

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Function
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={jsonType}
                                    label="Json Type"
                                    // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                                    onChange={(e) => {
                                        setJsonType(e.target.value);
                                    }}
                                    required
                                // error={errorObject?.deviceCategory?.errorStatus}
                                // helperText={errorObject?.deviceCategory?.helperText}
                                >
                                    {jsonTypeList.map((data) => (
                                        <MenuItem key={data.id} value={data.outPut}>{data.outPut}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ fontSize: '1.2rem' }}>
                                <Checkbox
                                    checked={isAlert}
                                    onChange={handleCheckboxChange}
                                    name="ALERT"
                                // style={{ transform: 'scale(1.5)' }}
                                />
                                Alert
                            </label>
                        </Grid>
                        {isAlert && (
                            <>
                                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ fontSize: '1.2rem' }}>
                                        <Checkbox
                                            checked={Status}
                                            onChange={handleSetCheckboxChange}
                                            name="ALERT"
                                        // style={{ transform: 'scale(1.5)' }}
                                        />
                                        E-mail/SMS
                                    </label>
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ fontSize: '1.2rem' }}>
                                        <Checkbox
                                            checked={latchAlert}
                                            onChange={handleLatchCheckboxChange}
                                            name="ALERT"
                                        // style={{ transform: 'scale(1.5)' }}
                                        />
                                        Latched Alert
                                    </label>
                                </Grid>
                                {Status && (
                                    <Grid item xs={4}>
                                        <TextField
                                            value={mailid}
                                            id="outlined-basic"
                                            label="E-mail"
                                            variant="outlined"
                                            type='email'
                                            fullWidth
                                            onChange={(e) => { setMailId(e.target.value); }}
                                            autoComplete="email"
                                            required
                                        />
                                    </Grid>)}
                                <Grid item lg={12} md={12} container justifyContent='flex-start'>
                                    <Typography>Warning Alert:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        value={warningMinValue}
                                        id="outlined-basic"
                                        label="Min Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setWarningMinValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        value={warningMaxValue}
                                        id="outlined-basic"
                                        label="Max Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setWarningMaxValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>

                                <Grid item lg={12} md={12} container justifyContent='flex-start'>
                                    <Typography>Out-of-Range Alert:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        value={outOfRangeMinValue}
                                        id="outlined-basic"
                                        label="Min Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setOutOfRangeMinValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        value={outOfRangeMaxValue}
                                        id="outlined-basic"
                                        label="Max Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setOutOfRangeMaxValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} container justifyContent='flex-start'>
                                    <Typography>Critical Alert:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        value={criticalMinValue}
                                        id="outlined-basic"
                                        label="Min Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setCriticalMinValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        value={criticalMaxValue}
                                        id="outlined-basic"
                                        label="Max Value"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setCriticalMaxValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item lg={12} md={12} container justifyContent='flex-start'>
                                    <Typography> Alert Count:</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        value={alertCount}
                                        id="outlined-basic"
                                        label="Alert Count:"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setAlertCount(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        value={resetCountValue}
                                        id="outlined-basic"
                                        label="Alert Reset Count:"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => { setResetCountValue(e.target.value); }}
                                        autoComplete="off"
                                        required
                                    />
                                </Grid>




                                {/* <Grid item lg={12} md={12} container justifyContent='flex-start'>
                                    <Typography> Alert Reset Count:</Typography>
                                </Grid> */}
                            </>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ margin: '10px' }}>
                    <Button
                        size="large"
                        autoFocus
                        onClick={() => {
                            setOpen(false);
                            // setErrorObject({});
                            loadData();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="large"
                        type="submit"
                    // onClick={handleSubmit}
                    >
                        {' '}
                        {isAddButton ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </form >
            {/* <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            /> */}
        </Dialog >
    );
}

export default AllocateModel;
