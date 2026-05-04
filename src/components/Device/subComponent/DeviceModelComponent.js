import React, { useState, useEffect } from 'react';
import {
  DialogContent, TextField, Box, Dialog, DialogTitle, Button, Select, FormControl, MenuItem, InputLabel, Grid,
} from '@mui/material';
import { DeviceAddService, DeviceCategoryFetchService, DeviceEditService } from '../../../services/LoginPageService';
import DeviceAdd from '../DeviceAdd';
import NotificationBar from '../../notification/ServiceNotificationBar';
import DeviceLocationModal from '../deviceLocation/DeviceLocationModalComponent';
import { AddCategoryValidate } from '../../../validation/formValidation';
import { useUserAccess } from '../../../context/UserAccessProvider';

function DeviceModel({
  open,
  setOpen,
  isAddButton,
  deviceData,
  categoryData,
  locationDetails,
  labMap,
  setRefreshData,
}) {
  const moduleAccess = useUserAccess()('devicelocation');
  const [id, setId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceTag, setDeviceTag] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [hardwareModelVersion, setHardwareModelVersion] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [category_id, setCategory_id] = useState('');

  const [firmwareBinFile, setFirmwareBinFile] = useState({});
  const [binFileName, setBinFileName] = useState('');
  const [pollingPriority, setPollingPriority] = useState('');
  const [nonPollingPriority, setNonPollingPriority] = useState('');
  const [floorCords, setFloorCords] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [deviceCategory, setDeviceCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  console.log("categoryList==", categoryList)
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setOpen(open);
    loadData();
    loadCategory();
  }, [deviceData, categoryData]);


  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);

  };

  const loadCategory = () => {
    DeviceCategoryFetchService(categoryHandleSuccess, handleException);
  };


  console.log("categoryData==", categoryData)

  const loadData = () => {
    console.log("deviceCategory==", deviceData.deviceCategory)
    setId(deviceData.id || '');
    setDeviceName(deviceData.deviceName || '');
    setDeviceTag(deviceData.deviceTag || '');
    setMacAddress(deviceData.macAddress || '');
    setFirmwareVersion(deviceData.firmwareVersion || '');
    setHardwareModelVersion(deviceData.hardwareVersion || '');
    setPollingPriority(deviceData.pollingPriority || '');
    setNonPollingPriority(deviceData.nonPollingPriority || '');
    setFloorCords(deviceData.floorCords || '');
    setCategoryList(categoryData || []);
    setCategory_id(deviceData.deviceCategoryId || '');
    setBinFileName(deviceData.binFileName || '');
    setDeviceCategory(deviceData.deviceCategory || '');
  };



  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      await DeviceAddService(
        {
          deviceName,
          category_id,
          firmwareBinFile,
          binFileName,
          deviceTag,
          firmwareVersion,
          hardwareModelVersion,
          macAddress,
          pollingPriority,
          nonPollingPriority,
          floorCords,
          ...locationDetails,
        },
        handleSuccess,
        handleException,
      );
    } else {
      await DeviceEditService(
        {
          id,
          deviceName,
          // category_id,
          // firmwareBinFile,
          // binFileName,
          deviceTag,
          deviceCategory: deviceCategory,
          firmwareVersion,
          hardwareVersion: hardwareModelVersion,
          macAddress,
          // pollingPriority,
          // nonPollingPriority,
          // floorCords,
          ...locationDetails,
        },
        handleSuccess,
        handleException,
      );
    }
  };

  const resetForm = () => {
    setFirmwareBinFile({});
    setBinFileName(deviceData.binFileName || '');
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      sx={{ '& .MuiDialog-paper': { width: '95%', maxHeight: '95%' } }}
      open={open}
    >
      <DialogTitle>{isAddButton ? 'Add Device' : 'Edit Device'}</DialogTitle>
      <DialogContent>
        <form onSubmit={HandleSubmit}>
          <div className="rounded-md -space-y-px ">
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                  Device Category
                </InputLabel>
                <Select
                  sx={{ minWidth: 250 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={deviceCategory}
                  label="Device Category"
                  // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                  onChange={(e) => {
                    setDeviceCategory(e.target.value);
                  }}
                  error={errorObject?.deviceCategory?.errorStatus}
                  helperText={errorObject?.deviceCategory?.helperText}
                >
                  {categoryList.map((data) => (
                    <MenuItem value={data.id}>{data.cateName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

          </div>
          <div className="rounded-md -space-y-px">
            <TextField
              value={deviceName}
              onBlur={() => validateForNullValue(deviceName, 'deviceName')}
              onChange={(e) => {
                setDeviceName(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Name of the device"
              fullWidth
              error={errorObject?.deviceName?.errorStatus}
              helperText={errorObject?.deviceName?.helperText}
              autoComplete="off"
            />
          </div>
          <div className="rounded-md -space-y-px">
            <TextField
              value={deviceTag}
              onBlur={() => validateForNullValue(deviceTag, 'deviceTag')}
              onChange={(e) => {
                setDeviceTag(e.target.value);
                // setPreviewImage(e.target.value);
              }}
              margin="normal"
              autoComplete="off"
              required
              id="outlined-required"
              label="Device Tag"
              fullWidth
              error={errorObject?.deviceTag?.errorStatus}
              helperText={errorObject?.deviceTag?.helperText}
            />
          </div>
          <div className="rounded-md -space-y-px">
            <TextField
              value={macAddress}
              onBlur={() => validateForNullValue(macAddress, 'macAddress')}
              onChange={(e) => {
                setMacAddress(e.target.value);
              }}
              margin="normal"
              required
              id="outlined-required"
              label="Mac Address"
              autoComplete="off"
              fullWidth
              error={errorObject?.macAddress?.errorStatus}
              helperText={errorObject?.macAddress?.helperText}
            />
          </div>
          <div className="rounded-md -space-y-px">
            <TextField
              value={firmwareVersion}
              onBlur={() => validateForNullValue(firmwareVersion, 'firmwareVersion')}
              onChange={(e) => {
                setFirmwareVersion(e.target.value);
              }}
              margin="normal"
              id="outlined-required"
              label="Firmware Version"
              autoComplete="off"
              fullWidth
              error={errorObject?.firmwareVersion?.errorStatus}
              helperText={errorObject?.firmwareVersion?.helperText}
            />
          </div>
          <div className="rounded-md -space-y-px">
            <TextField
              value={hardwareModelVersion}
              onBlur={() => validateForNullValue(hardwareModelVersion, 'hardwareModelVersion')}
              onChange={(e) => {
                setHardwareModelVersion(e.target.value);
              }}
              margin="normal"
              id="outlined-required"
              label="Hardware Model Version."
              autoComplete="off"
              fullWidth
              error={errorObject?.hardwareModelVersion?.errorStatus}
              helperText={errorObject?.hardwareModelVersion?.helperText}
            />
          </div>

          <div className="float-right">
            <div className="rounded-md -space-y-px">
              <Button
                sx={{ m: 2 }}
                onClick={(e) => {
                  setOpen(false);
                  setErrorObject({});
                  loadData();
                  resetForm();
                }}
              >
                Cancel
              </Button>
              {moduleAccess.edit &&
                <Button
                  sx={{ m: 2 }}
                  type="submit"
                  disabled={
                    errorObject?.deviceName?.errorStatus
                    || errorObject?.deviceTag?.errorStatus
                    || errorObject?.macAddress?.errorStatus
                    || errorObject?.firmwareVersion?.errorStatus
                    || errorObject?.hardwareModelVersion?.errorStatus
                    // || errorObject?.pollingPriority?.errorStatus
                    // || errorObject?.nonPollingPriority?.errorStatus
                  }
                >
                  {isAddButton ? 'Add' : 'Update'}
                </Button>
              }
            </div>
          </div>
        </form>
        <Grid
          sx={{ mt: 0, padding: 0 }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlignLast: 'right' }}
        >
          <div>
            <Button
              sx={{ m: 2 }}
              onClick={(e) => {
                setOpenModel(true);
              }}
            >
              Locate Device
            </Button>
          </div>
        </Grid>
        {/* <DeviceAdd locationDetails={locationDetails} labMap={labMap} deviceData={deviceData} setOpen={setOpen}/> */}
      </DialogContent>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <DeviceLocationModal
        open={openModel}
        setOpen={setOpenModel}
        src={labMap}
        floorCords={floorCords}
        setFloorCords={setFloorCords}
      />
    </Dialog>
  );
}

export default DeviceModel;