import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogContent,
  IconButton,
  InputAdornment,
  InputLabel, Select,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Grid,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Accordion, AccordionSummary, AccordionDetails,

} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Box } from '@mui/system';

import { CategoryFetchService, DeviceAddService, DeviceCategoryFetchService } from '../../services/LoginPageService';
import DeviceLocationModal from './deviceLocation/DeviceLocationModalComponent';
import NotificationBar from '../notification/ServiceNotificationBar';
import { AddCategoryValidate } from '../../validation/formValidation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DeviceAdd({ locationDetails, zoneMap, deviceData }) {
  const [id, setId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [firmwareBinFile, setFirmwareBinFile] = useState({});
  const [binFileName, setBinFileName] = useState('');
  const [deviceTag, setDeviceTag] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [firmwareVersion, setFirmwareVersion] = useState('');
  const [hardwareVersion, setHardwareVersion] = useState('');
  const [pollingPriority, setPollingPriority] = useState('');
  const [nonPollingPriority, setNonPollingPriority] = useState('');
  const [floorCords, setFloorCords] = useState('');
  // const [deviceCategoryId, setDeviceCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [hooter, setHooter] = useState('Non');
  const [pointer, setPointer] = useState(false);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: "Device added successfully",
    });

    setTimeout(() => {
      handleClose();
      resetForm();
    }, 5000);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  useEffect(() => {
    loadCategory();
  }, [deviceData]);

  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };

  const loadCategory = () => {
    DeviceCategoryFetchService(categoryHandleSuccess, handleException);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("openModel===", openModel)
    if (locationId) {
      await DeviceAddService({
        deviceName,
        deviceCategory,
        // firmwareBinFile,
        // binFileName,
        deviceTag,
        firmwareVersion,
        hardwareVersion,
        macAddress,
        // pollingPriority,
        // nonPollingPriority,
        coordinates: floorCords,
        ...locationDetails,
      }, handleSuccess, handleException);
    } else {
      showNotification('error', 'Please select all location details and Locate device.');
    }
  };

  const resetForm = () => {
    setFirmwareVersion('');
    setHardwareVersion('');
    setPollingPriority('');
    setNonPollingPriority('');
    setDeviceName('');
    setMacAddress('');
    setDeviceTag('');
    setFirmwareBinFile({});
    setBinFileName('');
    setFloorCords('');
    setDeviceCategory('');
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };



  const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = locationDetails;

  const showNotification = (type, message) => {
    setNotification({
      status: true,
      type: type,
      message: message,
    });
  };

  const handleAddMeter = () => {
    if (locationId) {
      setOpenModel(true);
    } else {
      // Show notification here (you should have a function to handle notifications in the parent component)
      // For example:
      showNotification('error', 'Please select all location details before adding a meter.');
    }
  };

  const [expanded, setExpanded] = useState(false);  // State to track if accordion is open
  const handleAccordionSummaryClick = () => {
    setExpanded((prevExpanded) => !prevExpanded); // Toggle the accordion state only when summary is clicked
  };
  const handleHover = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };


  return (
    <>
      <Accordion
        expanded={expanded}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        disableGutters
        elevation={0}
        style={{ transition: 'max-height 0.2s ease-in-out', borderBottom: '1px solid #212121' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}
          onClick={handleAccordionSummaryClick}

        >
          <Typography style={{ fontWeight: 'bold' }}>
            Add Device
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <form className="p-0 w-full" onSubmit={handleSubmit}>
            <DialogContent sx={{ px: 0, p: 0.8 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                    <InputLabel id="demo-simple-select-label">
                      Device Category
                    </InputLabel>
                    <Select
                      sx={{ height: 40 }}
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
                    sx={{
                      marginTop: 0,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 12px',
                      },
                    }}
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
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <TextField
                    sx={{
                      marginTop: 0,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 12px',
                      },
                    }}
                    value={deviceTag}
                    onBlur={() => validateForNullValue(deviceTag, 'deviceTag')}
                    onChange={(e) => {
                      setDeviceTag(e.target.value);
                    }}
                    margin="normal"
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
                    sx={{
                      marginTop: 0,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 12px',
                      },
                    }}
                    value={macAddress}
                    onBlur={() => validateForNullValue(macAddress, 'macAddress')}
                    onChange={(e) => {
                      setMacAddress(e.target.value);
                    }}
                    margin="normal"
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
                    sx={{
                      marginTop: 0,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 12px',
                      },
                    }}
                    value={firmwareVersion}
                    onBlur={() => validateForNullValue(firmwareVersion, 'firmwareVersion')}
                    onChange={(e) => {
                      setFirmwareVersion(e.target.value);
                    }}
                    margin="normal"
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
                    sx={{
                      marginTop: 0,
                      '& .MuiInputBase-root': {
                        height: '40px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '6px 12px',
                      },
                    }}
                    value={hardwareVersion}
                    onBlur={() => validateForNullValue(hardwareVersion, 'hardwareModelVersion')}
                    onChange={(e) => {
                      setHardwareVersion(e.target.value);
                    }}
                    margin="normal"
                    required
                    id="outlined-required"
                    label="Hardware version"
                    autoComplete="off"
                    fullWidth
                    error={errorObject?.hardwareVersion?.errorStatus}
                    helperText={errorObject?.hardwareVersion?.helperText}
                  />
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 0, padding: 0 }}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Button sx={{ m: 1 }} onClick={handleAddMeter}>
                    Locate Device
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className="mt-0 ml-2 float-right">
                    <Button size="large" onClick={(e) => {
                      setErrorObject({});
                      resetForm();
                    }}>
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        errorObject?.deviceCategory?.errorStatus ||
                        errorObject?.deviceName?.errorStatus ||
                        errorObject?.deviceTag?.errorStatus ||
                        errorObject?.macAddress?.errorStatus ||
                        errorObject?.firmwareVersion?.errorStatus ||
                        errorObject?.hardwareVersion?.errorStatus
                      }
                      sx={{ m: 1 }}
                      size="large"
                      type="submit"
                    >
                      ADD
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        </AccordionDetails>
      </Accordion>

      <DeviceLocationModal
        open={openModel}
        setOpen={setOpenModel}
        src={zoneMap}
        floorCords={floorCords}
        setFloorCords={setFloorCords}
        setPointer={setPointer}
        pointer={pointer}

      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </>
  );
}

export default DeviceAdd;