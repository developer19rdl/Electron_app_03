import React, { useState, useEffect } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";
import { Dialog, InputAdornment, IconButton } from "@mui/material";

import {
  AddTagShow,
  AssetFetchCategoryBasedService,
  AssetTypeFetchService,
  assetTypeShow,
  assetunitsShow,
  DeviceassetName,
  DeviceCategoryFetchService,
  DeviceFetchService,
  DeviceTAgName,
  MeterDeployAddService,
  MeterDeployEditService,
  SensorDeployAddService,
  SensorDeployEditService,
  TagManageAdd,
  TagManageEdit,
} from "../../services/LoginPageService";
import NotificationBar from "../notification/ServiceNotificationBar";
import { AddCategoryValidate } from "../../validation/formValidation";
import { useUserAccess } from "../../context/UserAccessProvider";
import ApplicationStore from "../../utils/localStorageUtil";
import DeleteConfirmationDailog from "../../utils/confirmDeletion";

function AddTagModel({
  locationDetails,
  open,
  setOpen,
  isAddButton,
  editTag,
  setRefreshData,
  deviceId,
}) {
  // const moduleAccess = useUserAccess()('devicelocation');
  // const id = editTag?.id || '';
  const [id, setId] = useState("");
  // const [deviceId, setDeviceId] = useState('');
  const [deviceCategory, setDeviceCategory] = useState("");
  const [unitsCategory, setunitsCategory] = useState("");
  const [regaddress, setRegAddress] = useState("");
  const [unitsCategoryList, setunitsCategoryList] = useState([]);
  const [assetcategory, setAssetCategory] = useState('');
  const [assetName, setAssetName] = useState('');
  const [assetcategoryList, setAssetCategoryList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [assetNameList, setAssetNameList] = useState([]);
  const [deviceCategoryList, setDeviceCategoryList] = useState([]);
  const [slaveid, setSlaveId] = useState("");
  const [sensordisplayname, setSensorDisplayname] = useState("");
  const [division, setDivision] = useState("");
  const [multidivision, setMultidivision] = useState("");
  const [inputMin, setInputMin] = useState("");
  const [inputMax, setInputMax] = useState("");
  const [scalingMin, setScallingMin] = useState("");
  const [scalingMax, setScallingMax] = useState("");
  const [jsonType, setJsonType] = useState("");
  const [functionType, setFunctionType] = useState("");
  const [lowAlert, setLowAlert] = useState("");
  const [highAlert, setHighAlert] = useState("");
  const [isCurrentRYBSelected, setIsCurrentRYBSelected] = useState(false);
  const [isPowerFactorSelected, setIsPowerFactorSelected] = useState(false);
  const [isVoltageSelected, setIsVoltageSelected] = useState(false);
  const [isVoltageUnbalSelected, setIsVoltageUnbalSelected] = useState(false);
  const [isCurrentUnbalSelected, setIsCurrentUnbalSelected] = useState(false);
  const [primaryCtRange, setPrimaryCtRange] = useState("");
  const [secondaryCtRange, setSecondaryCtRange] = useState("");
  const [showI1, setShowI1] = useState(false);
  const [showI2, setShowI2] = useState(false);
  const [showI3, setShowI3] = useState(false);
  const [i1AlertType, setI1AlertType] = useState(""); // Default value for alert type
  const [i1LowAlert, setI1LowAlert] = useState("");
  const [i1HighAlert, setI1HighAlert] = useState("");
  const [i2AlertType, setI2AlertType] = useState(""); // Default value for alert type
  const [i2LowAlert, setI2LowAlert] = useState("");
  const [i2HighAlert, setI2HighAlert] = useState("");
  const [i3AlertType, setI3AlertType] = useState(""); // Default value for alert type
  const [i3LowAlert, setI3LowAlert] = useState("");
  const [tagName, setTagName] = useState("");
  const [minI1, setMinI1] = useState("");
  const [maxI2, setMaxI2] = useState("");
  const [minI2, setMinI2] = useState("");
  const [maxI3, setMaxI3] = useState("");
  const [minI3, setMinI3] = useState("");
  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const [v1AlertType, setV1AlertType] = useState(""); // Default value for alert type
  const [v1LowAlert, setV1LowAlert] = useState("");
  const [v1HighAlert, setV1HighAlert] = useState("");
  const [v2AlertType, setV2AlertType] = useState(""); // Default value for alert type
  const [v2LowAlert, setV2LowAlert] = useState("");
  const [v2HighAlert, setV2HighAlert] = useState("");
  const [v3AlertType, setV3AlertType] = useState(""); // Default value for alert type
  const [v3LowAlert, setV3LowAlert] = useState("");
  const [v3HighAlert, setV3HighAlert] = useState("");
  const [pFAlertType, setPFAlertType] = useState(""); // Default value for alert type
  const [pFLowAlert, setPFLowAlert] = useState("");
  const [pFHighAlert, setPFHighAlert] = useState("");
  const [maxV1, setMaxV1] = useState("");
  const [minV1, setMinV1] = useState("");
  const [maxV2, setMaxV2] = useState("");
  const [minV2, setMinV2] = useState("");
  const [minV3, setMinV3] = useState("");
  const [maxV3, setMaxV3] = useState("");
  const [pfMax, setPfMax] = useState("");
  const [pFMin, setPfMin] = useState("");
  const [voltUnbalAlertType, setVoltUnbalAlertType] = useState(""); // Default value for alert type
  const [voltUnbalLowAlert, setVoltUnbalLowAlert] = useState("");
  const [voltUnbalHighAlert, setVoltUnbalHighAlert] = useState("");
  const [voltUnbalMax, setVoltUnbalMax] = useState("");
  const [voltUnbalMin, setVoltUnbalMin] = useState("");
  const [curUnbalAlertType, setCurUnbalAlertType] = useState(""); // Default value for alert type
  const [curUnbalLowAlert, setCurUnbalLowAlert] = useState("");
  const [curUnbalHighAlert, setCurUnbalHighAlert] = useState("");
  const [curUnbalMax, setCurUnbalMax] = useState("");
  const [curUnbalMin, setCurUnbalMin] = useState("");
  // const [selectedDevice, setSelectedDevice] = useState(deviceId);
  const [sensortag, setSensorTag] = useState("");
  const [resetCountValue, setResetCountValue] = useState("");
  const [alertCount, setAlertCount] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [Status, setStatus] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [latchAlert, setLatchAlert] = useState(false);
  const [conversion, setConversion] = useState(false);
  const [criticalMaxValue, setCriticalMaxValue] = useState("");
  const [warningMinValue, setWarningMinValue] = useState("");
  const [warningMaxValue, setWarningMaxValue] = useState("");
  const [outOfRangeMinValue, setOutOfRangeMinValue] = useState("");
  const [outOfRangeMaxValue, setOutOfRangeMaxValue] = useState("");
  const [criticalMinValue, setCriticalMinValue] = useState("");
  const [mapAsset, setMapAsset] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    if (editTag) {
      setOpen(open);
      loadData();
    }

    // setSelectedDevice(deviceId);
  }, [editTag]);

  const [errorObject, setErrorObject] = useState({});
  const { userDetails } = ApplicationStore().getStorage("userDetails");

  const [openNotification, setNotification] = useState({
    status: false,
    type: "error",
    message: "",
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

  useEffect(() => {
    assetunitsShow(handleunitssuccess, handleunitsexception);
  }, []);

  const handleunitssuccess = (dataObject) => {
    setunitsCategoryList(dataObject.data || []);
  };

  const handleunitsexception = (dataObject) => { };

  useEffect(() => {
    AddTagShow(handleTagSuccess, handleTagException);
    assetTypeShow(handleassetListSuccess, handleassetListException);
    //         );
  }, []);

  const handleTagSuccess = (dataObject) => {
    setDeviceCategoryList(dataObject.data);
  };

  const handleTagException = (errorObject, errorMessage) => {
    // Handle error when fetching the asset list
    console.error(errorMessage);
  };

  const handleassetListSuccess = (dataObject) => {
    setAssetCategoryList(dataObject.data);
  };

  const handleassetListException = (errorObject, errorMessage) => {
    // Handle error when fetching the asset list
    console.error(errorMessage);
  };

  const loadData = () => {
    setId(editTag.id || "");
    setDeviceCategory(editTag.devCategoryId || "");
    setDeviceName(editTag.devNameId || "");
    setTagName(editTag.tagName || "");
    setJsonType(editTag.jsonType || "");
    setSlaveId(editTag.slaveId || "");
    setRegAddress(editTag.RegAd || "");
    setFunctionType(editTag.functions || "");
    setunitsCategory(editTag.unitsCategoryId || "");
    setWarningMinValue(editTag.minWarningAlert || '');
    setWarningMaxValue(editTag.maxWarningAlert || '');
    setOutOfRangeMinValue(editTag.minOutRangeAlert || '');
    setOutOfRangeMaxValue(editTag.maxOutRangeAlert || '');
    setCriticalMinValue(editTag.minCriticalValue || '');
    setCriticalMaxValue(editTag.maxCriticalValue || '');
    setDivision(editTag.divisionFactor || '');
    setMultidivision(editTag.multiplicationFactor || '');
    setIsAlert(Number(editTag.isAlerts) || false);
    setConversion(Number(editTag.applyConversion) || false);
    setAlertCount(editTag.alertCount || '')
    setResetCountValue(editTag.alertResetCount || '')
    setSensorTag(editTag.tagName || '')
    setIsEmail(Number(editTag.isSms) || false);
    setLatchAlert(Number(editTag.isLatchedAlert) || false);
    setMapAsset(editTag.isMapAsset || '')
    setSensorDisplayname(editTag.tagDisplayName)
    setAssetCategory(editTag.assetCategoryId);
    setAssetName(editTag.assetNameId)
    setInputMin(editTag.inputMin)
    setInputMax(editTag.inputMax)
    setScallingMin(editTag.scalingMin)
    setScallingMax(editTag.scalingMax)


    if (!isAddButton) {
      DeviceTAgName(
        {
          deviceCategoryId: editTag?.devCategoryId,
        },
        handleFetchDeviceSuccess,
        handleFetchDeviceException
      );
    }

    if (!isAddButton) {
      DeviceassetName(
        {
          assetTypeid: editTag?.assetCategoryId,
        },
        handleAssetNameSuccess,
        handleAssetNameException
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      TagManageAdd(
        {
          devCategory: deviceCategory,
          devName: deviceName,
          tagName: sensortag,
          tagDisplayName: sensordisplayname,
          jsonType: jsonType,
          slaveId: slaveid,
          RegAd: regaddress,
          unitsName: unitsCategory,
          functions: functionType,
          minCriticalValue: criticalMinValue,
          maxCriticalValue: criticalMaxValue,
          minWarningAlert: warningMinValue,
          maxWarningAlert: warningMaxValue,
          minOutRangeAlert: outOfRangeMinValue,
          maxOutRangeAlert: outOfRangeMaxValue,
          isAlerts: isAlert,
          applyConversion: conversion,
          divisionFactor: division,
          multiplicationFactor: multidivision,
          alertCount: alertCount,
          alertResetCount: resetCountValue,
          isMapAsset: mapAsset,
          isSms: isEmail,
          isLatchedAlert: latchAlert,
          assetName: assetName,
          assetCategory: assetcategory,
          inputMin,
          inputMax,
          scalingMin,
          scalingMax,
        },
        sensorAddSuccess,
        senserAddException
      );
    } else {
      TagManageEdit(
        {
          id,
          devCategory: deviceCategory,
          devName: deviceName,
          tagName: sensortag,
          tagDisplayName: sensordisplayname,
          jsonType: jsonType,
          slaveId: slaveid,
          RegAd: regaddress,
          unitsName: unitsCategory,
          functions: functionType,
          applyConversion: conversion,
          divisionFactor: division,
          multiplicationFactor: multidivision,
          minCriticalValue: criticalMinValue,
          maxCriticalValue: criticalMaxValue,
          minWarningAlert: warningMinValue,
          maxWarningAlert: warningMaxValue,
          minOutRangeAlert: outOfRangeMinValue,
          maxOutRangeAlert: outOfRangeMaxValue,
          isAlerts: isAlert,
          alertCount: alertCount,
          alertResetCount: resetCountValue,
          isMapAsset: mapAsset,
          isSms: isEmail,
          isLatchedAlert: latchAlert,
          assetName: assetName,
          assetCategory: assetcategory,
          inputMin,
          inputMax,
          scalingMin,
          scalingMax,
        },
        sensorAddSuccess,
        senserAddException
      );
    }
  };

  const sensorAddSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: "success",
      message: dataObject.message,
    });
    setOpen(false);
    setTimeout(() => {
      // resetForm();
      handleClose();
      // setProgressStatus(1);
    }, 3000);
    setRefreshData((oldvalue) => !oldvalue);
  };

  const senserAddException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: "error",
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: "",
      message: "",
    });
  };

  const resetForm = () => {
    setDeviceCategory(editTag.devCategory || "");
    setDeviceName(editTag.devNameId || "");
    setTagName(editTag.tagName || "");
    setJsonType(editTag.jsonType || "");
    setSlaveId(editTag.slaveId || "");
    setunitsCategory(editTag.unitsName || "");
    setWarningMinValue(editTag.minWarningAlert || '');
    setWarningMaxValue(editTag.maxWarningAlert || '');
    setOutOfRangeMinValue(editTag.minOutRangeAlert || '');
    setOutOfRangeMaxValue(editTag.maxOutRangeAlert || '');
    setCriticalMinValue(editTag.minCriticalValue || '');
    setCriticalMaxValue(editTag.maxCriticalValue || '');
    setIsAlert(Number(editTag.isAlerts) || false);
    setAlertCount(editTag.alertCount || '')
    setResetCountValue(editTag.alertResetCount || '')
    setStatus(Number(editTag.isSms) || false);
    setLatchAlert(Number(editTag.isLatchedAlert) || false);
    setErrorObject({});
    setIsEmail(editTag.maxCriticalValue || '');
    setSensorDisplayname(editTag.tagDisplayName)
  };

  const getDeviceCategory = (e) => {
    DeviceTAgName(
      {
        deviceCategoryId: e.target.value,
      },
      handleFetchDeviceSuccess,
      handleFetchDeviceException
    );
  };
  const handleFetchDeviceSuccess = (dataObject) => {
    setDeviceList(dataObject.data || []);
  };
  const handleFetchDeviceException = (errorObject, errorMessage) => { };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setIsAlert(checked);
  };
  const handleCheckboxMapAssetChange = (event) => {
    const { name, checked } = event.target;

    setMapAsset(checked);
  };

  // const handleDeviceNameChange = (deviceId) => {
  //   // Find the selected motor's details
  //   const selectedDevice = deviceList.find((device) => device.deviceId === deviceId);
  //   if (selectedDevice) {
  //     setTagName(selectedDevice.deviceTag); // Update the locationName state
  //   } else {
  //     setTagName(""); // Reset the locationName if no match found
  //   }
  // };
  const handleEmailCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsEmail(checked);
  };

  const handleLatchCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setLatchAlert(checked);
  };

  const handleConversionCheckbox = (event) => {
    const { name, checked } = event.target;
    setConversion(checked);
  };


  const getAssetName = (e) => {
    DeviceassetName(
      {
        assetTypeid: e.target.value,
      },
      handleAssetNameSuccess,
      handleAssetNameException
    );
  };

  const handleAssetNameSuccess = (dataObject) => {
    setAssetNameList(dataObject.data || []);
  };

  const handleAssetNameException = (errorObject, errorMessage) => { };



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
          <DialogContent style={{ height: "78vh" }}>
            <DialogTitle
              style={{ float: "left", padding: "0px", marginBottom: "10px" }}
            >
              {isAddButton ? "Add Parameter" : " Edit Parameter"}
            </DialogTitle>
            <Grid container spacing={1} sx={{ mt: 0 }}>
              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Device Category
                    </InputLabel>
                    <Select
                      // sx={{ minWidth: 250 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={deviceCategory}
                      label="Device Category"
                      onChange={(e) => {
                        setDeviceCategory(e.target.value);
                        getDeviceCategory(e);
                      }}
                    >
                      {deviceCategoryList.map((data) => (
                        <MenuItem value={data.id} key={data.id}>
                          {data.cateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Device Name
                    </InputLabel>
                    <Select
                      // sx={{ minWidth: 250 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={deviceName}
                      label="Device Name"
                      onChange={(e) => {
                        setDeviceName(e.target.value);
                        // handleDeviceNameChange(e.target.value);
                      }}
                    >
                      {deviceList.map((data) => (
                        <MenuItem value={data.deviceId} key={data.deviceId}>
                          {data.deviceName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ padding: 0 }} item xs={4}>
                <TextField
                  sx={{ marginTop: 0 }}
                  value={sensortag}
                  // disabled={isAddButton}
                  onChange={(e) => {
                    setSensorTag(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Sensor Tag"
                  fullWidth
                  // error={errorObject?.meterName?.errorStatus}
                  // helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>
              <Grid sx={{ padding: 0 }} item xs={4}>
                <TextField
                  sx={{ marginTop: 0 }}
                  value={slaveid}
                  // disabled={isAddButton}
                  onChange={(e) => {
                    setSlaveId(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Slave ID"
                  fullWidth
                  // error={errorObject?.meterName?.errorStatus}
                  // helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>

              <Grid sx={{ padding: 0 }} item xs={4}>
                <TextField
                  sx={{ marginTop: 0 }}
                  value={sensordisplayname}
                  // disabled={isAddButton}
                  onChange={(e) => {
                    setSensorDisplayname(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Sensor Tag Display Name"
                  fullWidth
                  // error={errorObject?.meterName?.errorStatus}
                  // helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>
              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Functions
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      value={functionType}
                      label="Sensor Type"
                      onChange={(e) => {
                        setFunctionType(e.target.value);
                      }}
                    >
                      {/* <MenuItem value="All Records">All Records</MenuItem> */}
                      <MenuItem value="Latest Data With Min Max Avg">Latest Min Max Avg</MenuItem>
                      {/* <MenuItem value="Min Max Avg">Min Max Avg</MenuItem> */}
                      {/* <MenuItem value="std">STD</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Json Type
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      value={jsonType}
                      label="Sensor Type"
                      onChange={(e) => {
                        setJsonType(e.target.value);
                      }}
                    >
                      {/* <MenuItem value="Analog">Analog</MenuItem>
                      <MenuItem value="Digital">Digital</MenuItem> */}
                      <MenuItem value="Modbus">Modbus</MenuItem>
                      {/* <MenuItem value="std">STD</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                <Box>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Units{" "}
                    </InputLabel>
                    <Select
                      // sx={{ minWidth: 250 }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={unitsCategory}
                      label="Units"
                      onChange={(e) => {
                        setunitsCategory(e.target.value);
                      }}
                    >
                      {unitsCategoryList.map((data) => (
                        <MenuItem value={data.id} key={data.id}>
                          {data.unitsName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid sx={{ padding: 0 }} item xs={4}>
                <TextField
                  sx={{ marginTop: 0 }}
                  value={regaddress}
                  // disabled={isAddButton}
                  onChange={(e) => {
                    setRegAddress(e.target.value);
                  }}
                  margin="normal"
                  id="outlined-required"
                  label="Register Address"
                  fullWidth
                  // error={errorObject?.meterName?.errorStatus}
                  // helperText={errorObject?.meterName?.helperText}
                  autoComplete="off"
                />
              </Grid>
              {/* <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                <Tab label="Alert" />
                <Tab label="Map Asset" />
                <Tab label="Conversion" />
              </Tabs>

              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <label style={{ fontSize: "1.2rem" }}>
                  <Checkbox
                    checked={isAlert}
                    onChange={handleCheckboxChange}
                    name="ALERT"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  Alert
                </label>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <label style={{ fontSize: "1.2rem" }}>
                  <Checkbox
                    checked={mapAsset}
                    onChange={handleCheckboxMapAssetChange}
                    name="Map Asset"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  Map Asset
                </label>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <label style={{ fontSize: '1.2rem' }}>
                  <Checkbox
                    checked={isEmail}
                    onChange={handleEmailCheckboxChange}
                    name="Email"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  E-mail/SMS
                </label>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >                <label style={{ fontSize: '1.2rem' }}>
                  <Checkbox
                    checked={latchAlert}
                    onChange={handleLatchCheckboxChange}
                    name="ALERT"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  Latched Alert
                </label>
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label style={{ fontSize: '1.2rem' }}>
                  <Checkbox
                    checked={conversion}
                    onChange={handleConversionCheckbox}
                    name="Conversion
"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  Conversions
                </label>
              </Grid>
              {conversion && (
                <>
                  <Grid sx={{ padding: 0 }} item xs={4}>
                    <TextField
                      sx={{ marginTop: 0 }}
                      value={division}
                      // disabled={isAddButton}
                      onChange={(e) => {
                        setDivision(e.target.value);
                      }}
                      margin="normal"
                      id="outlined-required"
                      label="Division Factor"
                      fullWidth
                    
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid sx={{ padding: 0 }} item xs={4}>
                    <TextField
                      sx={{ marginTop: 0 }}
                      value={multidivision}
                      onChange={(e) => {
                        setMultidivision(e.target.value);
                      }}
                      margin="normal"
                      id="outlined-required"
                      label="Multiplication Factor"
                      fullWidth
                     
                      autoComplete="off"
                    />
                  </Grid>
                </>)}
              {isAlert && (
                <>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    container
                    justifyContent="flex-start"
                  >
                    <Typography>Warning Alert:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={warningMinValue}
                      id="outlined-basic"
                      label="Min Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setWarningMinValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={warningMaxValue}
                      id="outlined-basic"
                      label="Max Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setWarningMaxValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>

                  <Grid
                    item
                    lg={12}
                    md={12}
                    container
                    justifyContent="flex-start"
                  >
                    <Typography>Out-of-Range Alert:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={outOfRangeMinValue}
                      id="outlined-basic"
                      label="Min Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setOutOfRangeMinValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={outOfRangeMaxValue}
                      id="outlined-basic"
                      label="Max Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setOutOfRangeMaxValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    container
                    justifyContent="flex-start"
                  >
                    <Typography>Critical Alert:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={criticalMinValue}
                      id="outlined-basic"
                      label="Min Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setCriticalMinValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      value={criticalMaxValue}
                      id="outlined-basic"
                      label="Max Value"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setCriticalMaxValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    container
                    justifyContent="flex-start"
                  >
                    <Typography> Alert Count:</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      value={alertCount}
                      id="outlined-basic"
                      label="Alert Count:"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setAlertCount(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      value={resetCountValue}
                      id="outlined-basic"
                      label="Alert Reset Count:"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setResetCountValue(e.target.value);
                      }}
                      autoComplete="off"

                    />
                  </Grid>
                  <Grid item xs={4}></Grid>

                 
                </>

              )}
              {mapAsset && (
                <>

                  <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                    <Box>
                      <FormControl
                        fullWidth
                        margin="normal"
                        sx={{ marginTop: 0 }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Asset Categroy
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          value={assetcategory}
                          label="Sensor Type"
                          onChange={(e) => {
                            setAssetCategory(e.target.value);
                            getAssetName(e);

                          }}
                        >
                          {assetcategoryList.map((data) => (
                            <MenuItem value={data.id} key={data.id}>
                              {data.assetTypeName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid sx={{ mt: 0, padding: 0 }} item xs={4}>
                    <Box>
                      <FormControl
                        fullWidth
                        margin="normal"
                        sx={{ marginTop: 0 }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Asset Name
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          value={assetName}
                          label="Sensor Type"
                          onChange={(e) => {
                            setAssetName(e.target.value);
                          }}
                        >
                          {assetNameList.map((data) => (
                            <MenuItem value={data.id} key={data.id}>
                              {data.assetName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                </>
              )} */}
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <label style={{ fontSize: '1.2rem' }}>
                  <Checkbox
                    checked={isEmail}
                    onChange={handleEmailCheckboxChange}
                    name="Email"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  E-mail/SMS
                </label>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >                <label style={{ fontSize: '1.2rem' }}>
                  <Checkbox
                    checked={latchAlert}
                    onChange={handleLatchCheckboxChange}
                    name="ALERT"
                  // style={{ transform: 'scale(1.5)' }}
                  />
                  Latched Alert
                </label>
              </Grid>
              <Grid sx={{ mt: 0, padding: 0 }} item xs={12}>
                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                  <Tab label="Alert" />
                  <Tab label="Map Asset" />
                  <Tab label="Conversion" />
                </Tabs>
              </Grid>
              {/* Fields based on selected tab */}
              {tabIndex === 0 && ( // Alert Tab
                <>
                  <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ fontSize: "1.2rem" }}>
                      <Checkbox checked={isAlert} onChange={handleCheckboxChange} />
                      Alert
                    </label>
                  </Grid>

                  {isAlert && (
                    <>
                      <Grid
                        item
                        lg={12}
                        md={12}
                        container
                        justifyContent="flex-start"
                      >
                        <Typography>Warning Alert:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={warningMinValue}
                          id="outlined-basic"
                          label="Min Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setWarningMinValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={warningMaxValue}
                          id="outlined-basic"
                          label="Max Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setWarningMaxValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>

                      <Grid
                        item
                        lg={12}
                        md={12}
                        container
                        justifyContent="flex-start"
                      >
                        <Typography>Out-of-Range Alert:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={outOfRangeMinValue}
                          id="outlined-basic"
                          label="Min Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setOutOfRangeMinValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={outOfRangeMaxValue}
                          id="outlined-basic"
                          label="Max Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setOutOfRangeMaxValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        md={12}
                        container
                        justifyContent="flex-start"
                      >
                        <Typography>Critical Alert:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={criticalMinValue}
                          id="outlined-basic"
                          label="Min Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setCriticalMinValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          value={criticalMaxValue}
                          id="outlined-basic"
                          label="Max Value"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setCriticalMaxValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid
                        item
                        lg={12}
                        md={12}
                        container
                        justifyContent="flex-start"
                      >
                        <Typography> Alert Count:</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          value={alertCount}
                          id="outlined-basic"
                          label="Alert Count:"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setAlertCount(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          value={resetCountValue}
                          id="outlined-basic"
                          label="Alert Reset Count:"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => {
                            setResetCountValue(e.target.value);
                          }}
                          autoComplete="off"

                        />
                      </Grid>
                      <Grid item xs={4}></Grid>


                    </>

                  )}
                </>
              )}

              {tabIndex === 1 && ( // Map Asset Tab
                <>
                  <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ fontSize: "1.2rem" }}>
                      <Checkbox checked={mapAsset} onChange={handleCheckboxMapAssetChange} />
                      Map Asset
                    </label>
                  </Grid>

                  {mapAsset && (
                    <>
                      <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Asset Category</InputLabel>
                          <Select
                            value={assetcategory}
                            onChange={(e) => {
                              setAssetCategory(e.target.value);
                              getAssetName(e);
                            }}
                          >
                            {assetcategoryList.map((data) => (
                              <MenuItem value={data.id} key={data.id}>
                                {data.assetTypeName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Asset Name</InputLabel>
                          <Select
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                          >
                            {assetNameList.map((data) => (
                              <MenuItem value={data.id} key={data.id}>
                                {data.assetName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                </>
              )}

              {tabIndex === 2 && ( // Conversion Tab
                <>
                  <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ fontSize: "1.2rem" }}>
                      <Checkbox checked={conversion} onChange={handleConversionCheckbox} />
                      Conversions
                    </label>
                  </Grid>

                  {conversion && (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          value={division}
                          label="Division Factor"
                          fullWidth
                          onChange={(e) => setDivision(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={multidivision}
                          label="Multiplication Factor"
                          fullWidth
                          onChange={(e) => setMultidivision(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={inputMin}
                          label="Input Min"
                          fullWidth
                          onChange={(e) => setInputMin(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={inputMax}
                          label="Input Max"
                          fullWidth
                          onChange={(e) => setInputMax(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={scalingMin}
                          label="Scaling Min"
                          fullWidth
                          onChange={(e) => setScallingMin(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          value={scalingMax}
                          label="Scaling Max"
                          fullWidth
                          onChange={(e) => setScallingMax(e.target.value)}
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

            </Grid>
          </DialogContent>
          <div className="rounded-md -space-y-px float-right">
            <Button type="submit">{isAddButton ? "Add" : "Update"}</Button>
            <Button
              onClick={(e) => {
                setOpen(false);

                // loadData();
              }}
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
  );
}

export default AddTagModel;
