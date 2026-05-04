import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  InputLabel,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  MenuItem,
  RadioGroup,
  Radio,
  Grid,
  Box,
  DialogActions,
  DialogTitle,
  Stack,
} from '@mui/material';
import {
  Dialog, InputAdornment, IconButton
} from '@mui/material';


import {
  AssetFetchCategoryBasedService,
  AssetTypeFetchService,
  DeviceCategoryFetchService,
  DeviceFetchService,
  MeterDeployAddService,
  MeterDeployEditService,
  SensorDeployAddService,
  SensorDeployEditService,
} from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validation/formValidation';
import { useUserAccess } from '../../context/UserAccessProvider';
import ApplicationStore from '../../utils/localStorageUtil';
import MeterI1I2I3Alert from './AlertComponent/MeterI1I2I3Alert';
import PowerFactorAlert from './AlertComponent/PowerFactorAlert';
import VoltageAlert from './AlertComponent/VoltageAlert';
import VoltageUnbalAlert from './AlertComponent/VoltageUnbalAlert';
import CurrentUnbalnce from './AlertComponent/CurrentUnbalnce';

function MeterAddModel({
  locationDetails,
  open, setOpen, isAddButton, editData, setRefreshData, deviceId

}) {
  // const moduleAccess = useUserAccess()('devicelocation');
  const id = editData?.id || '';
  // const [deviceId, setDeviceId] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [assetCategory, setAssetCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [assetId, setAssetId] = useState('');
  const [assetList, setAssetList] = useState([]);
  const [assetCategoryList, setAssetCategoryList] = useState([]);
  const [slaveId, setSlaveId] = useState('');
  const [meterName, setMeterName] = useState('');
  const [ratedConsumption, setRatedConsumption] = useState('');
  const [maxConsumption, setMaxConsumption] = useState('');
  const [minConsumption, setMinConsumption] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [lowAlert, setLowAlert] = useState('');
  const [highAlert, setHighAlert] = useState('');
  const [isCurrentRYBSelected, setIsCurrentRYBSelected] = useState(false);
  const [isPowerFactorSelected, setIsPowerFactorSelected] = useState(false);
  const [isVoltageSelected, setIsVoltageSelected] = useState(false);
  const [isVoltageUnbalSelected, setIsVoltageUnbalSelected] = useState(false);
  const [isCurrentUnbalSelected, setIsCurrentUnbalSelected] = useState(false);
  const [primaryCtRange, setPrimaryCtRange] = useState('');
  const [secondaryCtRange, setSecondaryCtRange] = useState('');
  const [showI1, setShowI1] = useState(false);
  const [showI2, setShowI2] = useState(false);
  const [showI3, setShowI3] = useState(false);
  const [i1AlertType, setI1AlertType] = useState(''); // Default value for alert type
  const [i1LowAlert, setI1LowAlert] = useState('');
  const [i1HighAlert, setI1HighAlert] = useState('');
  const [i2AlertType, setI2AlertType] = useState(''); // Default value for alert type
  const [i2LowAlert, setI2LowAlert] = useState('');
  const [i2HighAlert, setI2HighAlert] = useState('');
  const [i3AlertType, setI3AlertType] = useState(''); // Default value for alert type
  const [i3LowAlert, setI3LowAlert] = useState('');
  const [i3HighAlert, setI3HighAlert] = useState('');
  const [maxI1, setMaxI1] = useState('');
  const [minI1, setMinI1] = useState('');
  const [maxI2, setMaxI2] = useState('');
  const [minI2, setMinI2] = useState('');
  const [maxI3, setMaxI3] = useState('');
  const [minI3, setMinI3] = useState('');
  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const [v1AlertType, setV1AlertType] = useState(''); // Default value for alert type
  const [v1LowAlert, setV1LowAlert] = useState('');
  const [v1HighAlert, setV1HighAlert] = useState('');
  const [v2AlertType, setV2AlertType] = useState(''); // Default value for alert type
  const [v2LowAlert, setV2LowAlert] = useState('');
  const [v2HighAlert, setV2HighAlert] = useState('');
  const [v3AlertType, setV3AlertType] = useState(''); // Default value for alert type
  const [v3LowAlert, setV3LowAlert] = useState('');
  const [v3HighAlert, setV3HighAlert] = useState('');
  const [pFAlertType, setPFAlertType] = useState(''); // Default value for alert type
  const [pFLowAlert, setPFLowAlert] = useState('');
  const [pFHighAlert, setPFHighAlert] = useState('');
  const [maxV1, setMaxV1] = useState('');
  const [minV1, setMinV1] = useState('');
  const [maxV2, setMaxV2] = useState('');
  const [minV2, setMinV2] = useState('');
  const [minV3, setMinV3] = useState('');
  const [maxV3, setMaxV3] = useState('');
  const [pfMax, setPfMax] = useState('');
  const [pFMin, setPfMin] = useState('');
  const [voltUnbalAlertType, setVoltUnbalAlertType] = useState(''); // Default value for alert type
  const [voltUnbalLowAlert, setVoltUnbalLowAlert] = useState('');
  const [voltUnbalHighAlert, setVoltUnbalHighAlert] = useState('');
  const [voltUnbalMax, setVoltUnbalMax] = useState('');
  const [voltUnbalMin, setVoltUnbalMin] = useState('');
  const [curUnbalAlertType, setCurUnbalAlertType] = useState(''); // Default value for alert type
  const [curUnbalLowAlert, setCurUnbalLowAlert] = useState('');
  const [curUnbalHighAlert, setCurUnbalHighAlert] = useState('');
  const [curUnbalMax, setCurUnbalMax] = useState('');
  const [curUnbalMin, setCurUnbalMin] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(deviceId);
  const [sensortag, setSensorTag] = useState("")
  console.log("edited data=", editData)

  useEffect(() => {
    setOpen(open);
    loadData();
    setSelectedDevice(deviceId);

  }, [editData, deviceId]);

  const loadData = () => {
    setSelectedDevice(editData.deviceid || '');
    setAssetCategory(editData.assetCategoryid || '');
    setAssetId(editData.assetNameid || '');
    console.log("")
    setMeterName(editData.meterName || '');

    setPrimaryCtRange(editData.primaryCtRange || '');
    setSecondaryCtRange(editData.secondaryCtRange || '');


    setSlaveId(editData.slaveId || '');
    setRatedConsumption(editData.ratedConsumption || '');
    setMaxConsumption(editData.maxConsumption || '');
    setMinConsumption(editData.minConsumption || '');
    setSensorType(editData.sensorType || '');

    setIsCurrentRYBSelected(editData.isCurrentRYBSelected || '');
    setShowI1(editData.showI1 || '');
    setShowI2(editData.showI2 || '');
    setShowI3(editData.showI3 || '');


    setMaxI1(editData.maxI1 || '');
    setMinI1(editData.minI1 || '');

    setI1HighAlert(editData.i1HighAlert || '');
    setI1LowAlert(editData.i1LowAlert || '');
    setI1AlertType(editData.i1AlertType || '');


    setMaxI2(editData.maxI2 || '');
    setMinI2(editData.minI2 || '');

    setI2AlertType(editData.i2AlertType || '');
    setI2HighAlert(editData.i2HighAlert || '');
    setI2LowAlert(editData.i2LowAlert || '')

    setMaxI3(editData.maxI3 || '');
    setMinI3(editData.minI3 || '');

    setI3AlertType(editData.i3AlertType || '');
    setI3HighAlert(editData.i3HighAlert || '');
    setI3LowAlert(editData.i3LowAlert || '')


    setIsVoltageSelected(editData.isVoltageSelected || '');
    setShowV1(editData.showV1 || '');
    setShowV2(editData.showV2 || '');
    setShowV3(editData.showV3 || '');


    setMaxV1(editData.maxV1 || '');
    setMinV1(editData.minV1 || '');
    setV1AlertType(editData.v1AlertType || '');
    setV1HighAlert(editData.v1HighAlert || '');
    setV1LowAlert(editData.v1LowAlert || '');

    setMaxV2(editData.maxV2 || '');
    setMinV2(editData.minV2 || '');
    setV2AlertType(editData.v2AlertType || '');
    setV2HighAlert(editData.v2HighAlert || '');
    setV2LowAlert(editData.v2LowAlert || '');

    setMaxV3(editData.maxV3 || '');
    setMinV3(editData.minV3 || '');
    setV3AlertType(editData.v3AlertType || '');
    setV3HighAlert(editData.v3HighAlert || '');
    setV3LowAlert(editData.v3LowAlert || '');



    setIsPowerFactorSelected(editData.isPowerFactorSelected || '');
    setPfMax(editData.pfMax || '');
    setPfMin(editData.pFMin || '');
    setPFAlertType(editData.pFAlertType || '');
    setPFLowAlert(editData.pFLowAlert || '');
    setPFHighAlert(editData.pFHighAlert || '');
    setLowAlert(editData.lowAlert || '')
    setHighAlert(editData.highAlert || '')
    setIsVoltageUnbalSelected(editData.isVoltageUnbalSelected || '')
    setVoltUnbalAlertType(editData.voltUnbalAlertType || '')
    setVoltUnbalLowAlert(editData.voltUnbalLowAlert || '')
    setVoltUnbalHighAlert(editData.voltUnbalHighAlert || '')
    setVoltUnbalMin(editData.voltUnbalMin || '')
    setVoltUnbalMax(editData.voltUnbalMax || '')
    setIsCurrentUnbalSelected(editData.isCurrentUnbalSelected || '')
    setCurUnbalAlertType(editData.curUnbalAlertType || '')
    setCurUnbalLowAlert(editData.curUnbalLowAlert || '')
    setCurUnbalHighAlert(editData.curUnbalHighAlert || '')
    setCurUnbalMin(editData.curUnbalMin || '')
    setCurUnbalMax(editData.curUnbalMax || '')

  };






  const [errorObject, setErrorObject] = useState({});
  const { userDetails } = ApplicationStore().getStorage('userDetails');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });


  const handleCurrentRYBChange = (event) => {
    setIsCurrentRYBSelected(event.target.checked);
  };

  const handlePowerFactorChange = (event) => {
    setIsPowerFactorSelected(event.target.checked);
  };
  const handleVoltageChange = (event) => {
    setIsVoltageSelected(event.target.checked);
  };

  const handleVoltageUnbalChange = (event) => {
    setIsVoltageUnbalSelected(event.target.checked);
  };
  const handleCurrentUnbalChange = (event) => {
    setIsCurrentUnbalSelected(event.target.checked);
  };



  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };
  const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = locationDetails;


  useEffect(() => {
    DeviceFetchService(
      { ...locationDetails },
      DeviceHandleSuccess,
      handleException
    );
  }, [locationId, branchId, facilityId, buildingId, floorId, zoneId]);

  useEffect(() => {
    AssetTypeFetchService(
      AssetTypeFetchServiceHandleSuccess,
      AssetTypeFetchServiceHandleException
    );
  }, []);

  const AssetTypeFetchServiceHandleSuccess = (dataObject) => {
    setAssetCategoryList(dataObject.data);
  };

  const AssetTypeFetchServiceHandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const DeviceHandleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };



  useEffect(() => {
    // Call the asset list fetch service when the asset category changes
    if (assetCategory) {
      AssetFetchCategoryBasedService(
        { id: assetCategory },
        handleAssetFetchSuccess,
        handleAssetFetchError
      );
    } else {
      // Reset the asset list when no asset category is selected
      setAssetList([]);
    }
  }, [assetCategory]);

  const handleAssetFetchSuccess = (dataObject) => {
    setAssetList(dataObject.data);
  };

  const handleAssetFetchError = (errorObject, errorMessage) => {
    // Handle error when fetching the asset list
    console.error(errorMessage);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      MeterDeployAddService(
        {
          locationId: locationId,
          branchId: branchId,
          facilityId: facilityId,
          buildingId: buildingId,
          floorId: floorId,
          zoneId: zoneId,
          deviceid: selectedDevice,
          meterName: meterName,
          //additional added CT RANGE
          primaryCtRange: primaryCtRange,
          secondaryCtRange: secondaryCtRange,
          assetNameid: assetId,
          slaveId: slaveId,
          assetCategoryid: assetCategory,
          //
          ratedConsumption: ratedConsumption,
          maxConsumption: maxConsumption,
          minConsumption: minConsumption,
          alertType: alertType,
          lowAlert: lowAlert,
          highAlert: highAlert,
          isCurrentRYBSelected: isCurrentRYBSelected,
          showI1: showI1,
          showI2: showI2,
          showI3: showI3,
          i1AlertType: i1AlertType,
          i1LowAlert: i1LowAlert,
          i1HighAlert: i1HighAlert,
          i2AlertType: i2AlertType,
          i2LowAlert: i2LowAlert,
          i2HighAlert: i2HighAlert,
          i3AlertType: i3AlertType,
          i3LowAlert: i3LowAlert,
          i3HighAlert: i3HighAlert,

          showV1: showV1,
          showV2: showV2,
          showV3: showV3,
          v1AlertType: v1AlertType,
          v1LowAlert: v1LowAlert,
          v1HighAlert: v1HighAlert,
          v2AlertType: v2AlertType,
          v2LowAlert: v2LowAlert,
          v2HighAlert: v2HighAlert,
          v3AlertType: v3AlertType,
          v3LowAlert: v3LowAlert,
          v3HighAlert: v3HighAlert,
          pFAlertType: pFAlertType,
          pFLowAlert: pFLowAlert,
          pFHighAlert: pFHighAlert,
          maxI1: maxI1,
          minI1: minI1,
          maxI2: maxI2,
          minI2: minI2,
          maxI3: maxI3,
          minI3: minI3,
          isVoltageSelected: isVoltageSelected,
          maxV1: maxV1,
          maxV2: maxV2,
          maxV3: maxV3,
          minV1: minV1,
          minV2: minV2,
          minV3: minV3,
          isPowerFactorSelected: isPowerFactorSelected,
          pfMax: pfMax,
          pFMin: pFMin,
          isVoltageUnbalSelected: isVoltageUnbalSelected,
          voltUnbalMax: voltUnbalMax,
          voltUnbalMin: voltUnbalMin,
          isCurrentUnbalSelected: isCurrentUnbalSelected,
          curUnbalMax: curUnbalMax,
          curUnbalMin: curUnbalMin,
          curUnbalAlertType: curUnbalAlertType,
          curUnbalLowAlert: curUnbalLowAlert,
          curUnbalHighAlert: curUnbalHighAlert,
          voltUnbalAlertType: voltUnbalAlertType,
          voltUnbalLowAlert: voltUnbalLowAlert,
          voltUnbalHighAlert: voltUnbalHighAlert,
        },
        sensorAddSuccess,
        senserAddException
      );
    } else {
      MeterDeployEditService(
        {
          id,
          locationId: locationId,
          branchId: branchId,
          facilityId: facilityId,
          buildingId: buildingId,
          floorId: floorId,
          zoneId: zoneId,
          deviceid: selectedDevice,
          meterName: meterName,
          //additional added CT RANGE
          primaryCtRange: primaryCtRange,
          secondaryCtRange: secondaryCtRange,
          assetNameid: assetId,
          slaveId: slaveId,
          assetCategoryid: assetCategory,
          //
          ratedConsumption: ratedConsumption,
          maxConsumption: maxConsumption,
          minConsumption: minConsumption,
          alertType: alertType,
          lowAlert: lowAlert,
          highAlert: highAlert,
          isCurrentRYBSelected: isCurrentRYBSelected,
          showI1: showI1,
          showI2: showI2,
          showI3: showI3,
          i1AlertType: i1AlertType,
          i1LowAlert: i1LowAlert,
          i1HighAlert: i1HighAlert,
          i2AlertType: i2AlertType,
          i2LowAlert: i2LowAlert,
          i2HighAlert: i2HighAlert,
          i3AlertType: i3AlertType,
          i3LowAlert: i3LowAlert,
          i3HighAlert: i3HighAlert,

          showV1: showV1,
          showV2: showV2,
          showV3: showV3,
          v1AlertType: v1AlertType,
          v1LowAlert: v1LowAlert,
          v1HighAlert: v1HighAlert,
          v2AlertType: v2AlertType,
          v2LowAlert: v2LowAlert,
          v2HighAlert: v2HighAlert,
          v3AlertType: v3AlertType,
          v3LowAlert: v3LowAlert,
          v3HighAlert: v3HighAlert,
          pFAlertType: pFAlertType,
          pFLowAlert: pFLowAlert,
          pFHighAlert: pFHighAlert,
          maxI1: maxI1,
          minI1: minI1,
          maxI2: maxI2,
          minI2: minI2,
          maxI3: maxI3,
          minI3: minI3,
          isVoltageSelected: isVoltageSelected,
          maxV1: maxV1,
          maxV2: maxV2,
          maxV3: maxV3,
          minV1: minV1,
          minV2: minV2,
          minV3: minV3,
          isPowerFactorSelected: isPowerFactorSelected,
          pfMax: pfMax,
          pFMin: pFMin,
          isVoltageUnbalSelected: isVoltageUnbalSelected,
          voltUnbalMax: voltUnbalMax,
          voltUnbalMin: voltUnbalMin,
          isCurrentUnbalSelected: isCurrentUnbalSelected,
          curUnbalMax: curUnbalMax,
          curUnbalMin: curUnbalMin,
          curUnbalAlertType: curUnbalAlertType,
          curUnbalLowAlert: curUnbalLowAlert,
          curUnbalHighAlert: curUnbalHighAlert,
          voltUnbalAlertType: voltUnbalAlertType,
          voltUnbalLowAlert: voltUnbalLowAlert,
          voltUnbalHighAlert: voltUnbalHighAlert,
        },
        sensorAddSuccess,
        senserAddException
      );
    }

  };

  const sensorAddSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setOpen(false);
    setTimeout(() => {
      resetForm();
      handleClose();
      setProgressStatus(1);
    }, 3000);
    setRefreshData((oldvalue) => !oldvalue);
  };

  const senserAddException = (errorObject, errorMessage) => {
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

  const resetForm = () => {
    setDeviceCategory('');
    setSelectedDevice('');
    // setDeviceList([]);
    setAssetCategory('');
    setAssetId('');
    setAssetList([]);
    setSlaveId('');
    setMeterName('');
    setPrimaryCtRange('');
    setSecondaryCtRange('');
    setErrorObject({});
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        {/* <div style={{ marginTop: 0, overflow: 'auto' }}> */}
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ height: '78vh' }}>
            <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px' }}>
              {isAddButton ? 'Add Sensors' : ' Edit Sensors'}
            </DialogTitle>
            <Grid container spacing={1} sx={{ mt: 0 }}>


              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box >
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="device-name-label">Device Name</InputLabel>
                    <Select
                      labelId="device-name-label"
                      id="device-name-select"
                      value={selectedDevice}
                      onChange={(e) => setSelectedDevice(e.target.value)}
                      label="Device Name"
                      disabled
                    >
                      {deviceList.map((device, index) => (
                        <MenuItem value={device.id} key={index} disabled={device.id !== selectedDevice}>
                          {device.deviceName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>


              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={4}

              >
                <Box >
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">Asset Category</InputLabel>
                    <Select
                      // sx={{ minWidth: 250 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={assetCategory}

                      label="Asset Category"
                      onChange={(e) => {
                        setAssetCategory(e.target.value);
                      }}
                    >
                      {assetCategoryList.map((data) => (
                        <MenuItem value={data.id} key={data.id}>
                          {data.assetTypeName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>



              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={4}

              >
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">Asset Name</InputLabel>
                    <Select
                      // sx={{ minWidth: 250 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={assetId}

                      label="Asset Name"
                      onChange={(e) => {
                        setAssetId(e.target.value);

                      }}
                    >
                      {assetList.map((data) => (
                        <MenuItem value={data.id} key={data.id}>
                          {data.assetName}

                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                sx={{ padding: 0 }}
                item
                xs={4}
              >
                <TextField
                  sx={{ marginTop: 0 }}
                  value={meterName}
                  onBlur={() => validateForNullValue(meterName, 'deviceName')}
                  onChange={(e) => {
                    setMeterName(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Sensor Name"
                  fullWidth
                  error={errorObject?.meterName?.errorStatus}
                  helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>
              {/* <Grid
                sx={{ padding: 0 }}
                item
                xs={6}
              >
                <Box >
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">Slave Id</InputLabel>
                    <Select

                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={slaveId}

                      label="Sensor Category"
                      onChange={(e) => {
                        setSlaveId(e.target.value);
                      }}
                    >
                      {Array.from({ length: 30 }, (_, index) => (
                        <MenuItem value={index + 1} key={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid> */}
              {/* <Grid
                sx={{ padding: 0 }}
                item
                xs={6}
              >
                <TextField
                  sx={{ marginTop: 0 }}
                  value={sensortag}
                  onBlur={() => validateForNullValue(meterName, 'deviceName')}
                  onChange={(e) => {
                    setSensorTag(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Sensor Tag"
                  fullWidth
                  error={errorObject?.meterName?.errorStatus}
                  helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>
              <Grid
                sx={{ padding: 0 }}
                item
                xs={6}
              >
                <TextField
                  sx={{ marginTop: 0 }}
                  value={primaryCtRange}
                  onBlur={() => validateForNullValue(primaryCtRange, 'deviceName')}
                  onChange={(e) => {
                    setPrimaryCtRange(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Primary CT Range"
                  fullWidth
                  error={errorObject?.primaryCtRange?.errorStatus}
                  helperText={errorObject?.primaryCtRange?.helperText}
                  autoComplete="off"
                />
              </Grid>

              <Grid
                sx={{ padding: 0 }}
                item
                xs={6}
              >
                <TextField
                  sx={{ marginTop: 0 }}
                  value={secondaryCtRange}
                  onBlur={() => validateForNullValue(secondaryCtRange, 'deviceName')}
                  onChange={(e) => {
                    setSecondaryCtRange(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Secondary CT Range"
                  fullWidth
                  error={errorObject?.secondaryCtRange?.errorStatus}
                  helperText={errorObject?.secondaryCtRange?.helperText}
                  autoComplete="off"
                />
              </Grid> */}





              {/* <Grid
                sx={{ mt: 1, padding: 0 }}
                item
                xs={12}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Consumption  Alert Settings
                </Typography>
              </Grid>


              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={3}

              >
                <TextField
                  fullWidth
                  sx={{ marginTop: 0 }}
                  value={ratedConsumption}

                  type="number"

                  onChange={(e) => {
                    setRatedConsumption(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Rated Consumption"


                  autoComplete="off"
                />
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={3}

              >
                <TextField
                  fullWidth
                  sx={{ marginTop: 0 }}
                  value={maxConsumption}

                  type="number"

                  onChange={(e) => {
                    setMaxConsumption(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Maximum Rated Consumption"


                  autoComplete="off"
                />

              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={3}

              >
                <TextField
                  fullWidth
                  sx={{ marginTop: 0 }}
                  value={minConsumption}

                  type="number"

                  onChange={(e) => {
                    setMinConsumption(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Minimum Rated Consumption"


                  autoComplete="off"
                />

              </Grid> */}
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={4}

              >
                <Box >
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Sensor Type
                    </InputLabel>
                    <Select
                      fullWidth

                      labelId="demo-simple-select-label"
                      value={sensorType}
                      label="Sensor Type"
                      onChange={(e) => {
                        setSensorType(e.target.value);

                      }}

                    >
                      <MenuItem value="Analog">Analog</MenuItem>
                      <MenuItem value="Digital">Digital</MenuItem>
                      <MenuItem value="Modbus">Modbus</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                sx={{ mt: 0, padding: 0 }}
                item
                xs={4}

              >
                <TextField
                  fullWidth
                  sx={{ marginTop: 0 }}
                  value={minConsumption}

                  type="number"

                  onChange={(e) => {
                    setMinConsumption(e.target.value);
                  }}
                  margin="normal"
                  required
                  id="outlined-required"
                  label="Minimum Rated Consumption"


                  autoComplete="off"
                />

              </Grid>
              {sensorType === 'Low' || sensorType === 'Both'
                ? (
                  <Grid

                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                  >
                    <div className="rounded-md -space-y-px">
                      <TextField
                        sx={{ marginTop: 0 }}
                        value={lowAlert}

                        onChange={(e) => {
                          setLowAlert(e.target.value);
                        }}
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Low alert message"
                        fullWidth

                        autoComplete="off"
                      />
                    </div>
                  </Grid>
                )
                : ''}
              {sensorType === 'High' || sensorType === 'Both'
                ? (
                  <Grid

                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                  >

                    <TextField
                      sx={{ marginTop: 0 }}
                      value={highAlert}

                      onChange={(e) => {
                        setHighAlert(e.target.value);
                      }}
                      margin="normal"
                      required
                      id="outlined-required"
                      label="High alert message"
                      fullWidth

                      autoComplete="off"
                    />

                  </Grid>
                )
                : ''}
              <Grid
                sx={{ mt: 1, padding: 0 }}
                item
                xs={6}
              >
                <Stack>

                  <div>

                    <Checkbox
                      checked={isCurrentRYBSelected}
                      onChange={handleCurrentRYBChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'CurrentRYB checkbox' }}
                    />
                    <label htmlFor="CurrentRYB">Data Warning Level
                    </label>

                    {isCurrentRYBSelected &&
                      <>
                        <Grid
                          sx={{ mt: 1, padding: 0 }}
                          item
                          xs={6}
                        >
                          <TextField
                            fullWidth
                            label="Upper Warning Level"
                            value={maxI1}

                            onChange={(e) => {
                              setMaxI1(e.target.value);
                            }}
                          />
                        </Grid>
                        <Grid
                          sx={{ mt: 1, padding: 0 }}
                          item
                          xs={6}
                        >
                          <TextField
                            fullWidth
                            label="Minimum Warning Level"
                            value={minI1}

                            onChange={(e) => {
                              setMinI1(e.target.value);
                            }}
                          />
                        </Grid>
                      </>
                    }
                  </div>
                </Stack>
              </Grid>
            </Grid>


            <Grid
              sx={{ mt: 1, padding: 0 }}
              item
              xs={6}
            >
              <Stack>
                <Typography variant="subtitle1" gutterBottom>
                  Voltage Settings
                </Typography>
                <div>
                  <Checkbox
                    checked={isVoltageSelected}
                    onChange={handleVoltageChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'VoltageRyb checkbox' }}
                  />
                  <label htmlFor="VoltageRyb">Voltage RYB</label>

                  {isVoltageSelected &&

                    <VoltageAlert

                      showV1={showV1}
                      showV2={showV2}
                      showV3={showV3}
                      v1AlertType={v1AlertType}
                      v1LowAlert={v1LowAlert}
                      v1HighAlert={v1HighAlert}
                      v2AlertType={v2AlertType}
                      v2LowAlert={v2LowAlert}
                      v2HighAlert={v2HighAlert}
                      v3AlertType={v3AlertType}
                      v3LowAlert={v3LowAlert}
                      v3HighAlert={v3HighAlert}
                      setShowV1={setShowV1}
                      setShowV2={setShowV2}
                      setShowV3={setShowV3}
                      setV1AlertType={setV1AlertType}
                      setV1LowAlert={setV1LowAlert}
                      setV1HighAlert={setV1HighAlert}
                      setV2AlertType={setV2AlertType}
                      setV2LowAlert={setV2LowAlert}
                      setV2HighAlert={setV2HighAlert}
                      setV3AlertType={setV3AlertType}
                      setV3LowAlert={setV3LowAlert}
                      setV3HighAlert={setV3HighAlert}
                      maxV1={maxV1}
                      minV1={minV1}
                      setMaxV1={setMaxV1}
                      setMinV1={setMinV1}
                      maxV2={maxV2}
                      minV2={minV2}
                      setMinV2={setMinV2}
                      setMaxV2={setMaxV2}
                      maxV3={maxV3}
                      minV3={minV3}
                      setMinV3={setMinV3}
                      setMaxV3={setMaxV3}
                    />

                  }
                </div>
              </Stack>
            </Grid>

            <Grid
              sx={{ mt: 1, padding: 0 }}
              item
              xs={4}
            >
              <Stack>
                <Typography variant="subtitle1" gutterBottom>
                  Power Factor Settings
                </Typography>
                <div>
                  <Checkbox
                    checked={isPowerFactorSelected}
                    onChange={handlePowerFactorChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'PowerFactor checkbox' }}
                  />
                  <label htmlFor="PowerFactor">Power Factor</label>

                  {isPowerFactorSelected && <PowerFactorAlert
                    pFAlertType={pFAlertType}
                    setPFAlertType={setPFAlertType}
                    pFLowAlert={pFLowAlert}
                    setPFLowAlert={setPFLowAlert}
                    pFHighAlert={pFHighAlert}
                    setPFHighAlert={setPFHighAlert}
                    pfMax={pfMax}
                    setPfMax={setPfMax}
                    pFMin={pFMin}
                    setPfMin={setPfMin}


                  />}
                </div>
              </Stack>
            </Grid>


            <Grid
              sx={{ mt: 1, padding: 0 }}
              item
              xs={4}
            >
              <Stack>
                <Typography variant="subtitle1" gutterBottom>
                  Voltage unbalance Settings
                </Typography>
                <div>
                  <Checkbox
                    checked={isVoltageUnbalSelected}
                    onChange={handleVoltageUnbalChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'voltUnbal checkbox' }}
                  />
                  <label htmlFor="voltUnbal">Voltage Unbalance</label>

                  {isVoltageUnbalSelected && <VoltageUnbalAlert
                    voltUnbalAlertType={voltUnbalAlertType}
                    setVoltUnbalAlertType={setVoltUnbalAlertType}
                    voltUnbalLowAlert={voltUnbalLowAlert}
                    setVoltUnbalLowAlert={setVoltUnbalLowAlert}
                    voltUnbalHighAlert={voltUnbalHighAlert}
                    setVoltUnbalHighAlert={setVoltUnbalHighAlert}
                    voltUnbalMax={voltUnbalMax}
                    setVoltUnbalMax={setVoltUnbalMax}
                    voltUnbalMin={voltUnbalMin}
                    setVoltUnbalMin={setVoltUnbalMin}


                  />}
                </div>
              </Stack>
            </Grid>

            <Grid
              sx={{ mt: 1, padding: 0 }}
              item
              xs={4}
            >
              <Stack>
                <Typography variant="subtitle1" gutterBottom>
                  Current Unbalance Settings
                </Typography>
                <div>
                  <Checkbox
                    checked={isCurrentUnbalSelected}
                    onChange={handleCurrentUnbalChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'curUnbal checkbox' }}
                  />
                  <label htmlFor="curUnbal">Current Unbalance</label>

                  {isCurrentUnbalSelected && <CurrentUnbalnce
                    curUnbalAlertType={curUnbalAlertType}
                    setCurUnbalAlertType={setCurUnbalAlertType}
                    curUnbalLowAlert={curUnbalLowAlert}
                    setCurUnbalLowAlert={setCurUnbalLowAlert}
                    curUnbalHighAlert={curUnbalHighAlert}
                    setCurUnbalHighAlert={setCurUnbalHighAlert}
                    curUnbalMax={curUnbalMax}
                    setCurUnbalMax={setCurUnbalMax}
                    curUnbalMin={curUnbalMin}
                    setCurUnbalMin={setCurUnbalMin}
                  />}
                </div>
              </Stack>
            </Grid>
          </DialogContent>
          <div className="rounded-md -space-y-px float-right">
            <Button
              type="submit"
            >
              {isAddButton ? 'Add' : 'Update'}
            </Button>
            <Button

              onClick={(e) => {
                setOpen(false);

                loadData();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>


      </Dialog >
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </>
  );
}

export default MeterAddModel;
