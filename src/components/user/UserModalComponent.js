import {
  Backdrop,
  /* eslint-disable max-len */
  Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BuildingFetchService,
  FetchBranchService, FetchFacilitiyService, FetchLocationService, FloorfetchService, LabfetchService, UnblockUserService, UserAddService, UserUpdateService,
} from '../../services/LoginPageService';
import ApplicationStore from '../../utils/localStorageUtil';
import { AddUserValidate } from '../../validation/formValidation';
import NotificationBar from '../notification/ServiceNotificationBar';
import ConfirmPassword from './passwordConfirmComponent';
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
function UserModal({
  open, setOpen, isAddButton, userData, setRefreshData,
}) {
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const isSuperAdmin = userDetails ? userDetails.userRole === 'superAdmin' : true;
  const { userRole } = userDetails;
  const [id, setId] = useState('');
  const [empId, setEmployeeId] = useState('');
  const [email, setEmailId] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [empRole, setRole] = useState(isSuperAdmin ? 'superAdmin' : 'User');
  const [empName, setFullName] = useState('');
  const [empNotification, setEmpNotification] = useState(false);
  const [companyCode, setCompanyCode] = useState('');
  const [locationId, setLocationId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [facilityId, setFacilityId] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [floorId, setFloorId] = useState('');
  const [zoneId, setLabId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [password, setConfirmPassword] = useState('');
  const [btnReset, setBtnReset] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [backdrop, setBackdrop] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (userData) {
      setOpen(open);
      setBackdrop(true);
      loaddata();
    }
    if (isAddButton) {
      setBackdrop(false);
    }
  }, [userData, isAddButton]);

  const loaddata = () => {
    setBranchList([]);
    setFacilityList([]);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setBranchId('');
    setFacilityId('');
    setBuildingId('');
    setFloorId('');
    setLabId('');
    if (!isAddButton) {
      if (userData?.locationId) {
        setBackdrop(true);
        FetchLocationService((locationRespObj) => {
          locationHandleSuccess(locationRespObj);
          FetchBranchService({
            locationId: userData?.locationId,
          }, (branchRespObj) => {
            setLocationId(userData.locationId);
            branchHandleSuccess(branchRespObj);
            if (userData?.branchId) {
              FetchFacilitiyService({
                locationId: userData?.locationId,
                branchId: userData?.branchId,
              }, (facilityRespObj) => {
                setBranchId(userData.branchId);
                facilityHandleSuccess(facilityRespObj);
                if (userData?.facilityId) {
                  BuildingFetchService({
                    locationId: userData?.locationId,
                    branchId: userData?.branchId,
                    facilityId: userData?.facilityId,
                  }, (buildingRespObj) => {
                    setFacilityId(userData.facilityId);
                    buildingHandleSuccess(buildingRespObj);
                    if (userData?.buildingId) {
                      FloorfetchService({
                        locationId: userData?.locationId,
                        branchId: userData?.branchId,
                        facilityId: userData?.facilityId,
                        buildingId: userData?.buildingId,
                      }, (floorRespObj) => {
                        setBuildingId(userData.buildingId);
                        floorHandleSuccess(floorRespObj);
                        if (userData?.floorId) {
                          LabfetchService({
                            locationId: userData?.locationId,
                            branchId: userData?.branchId,
                            facilityId: userData?.facilityId,
                            buildingId: userData?.buildingId,
                            floorId: userData?.floorId,
                          }, (labRespObj) => {
                            labHandleSuccess(labRespObj);
                            if (userData?.zoneId) {
                              setLabId(userData.zoneId);
                              setBackdrop(false);
                            }
                          }, locationHandleException);
                          setFloorId(userData.floorId);
                        }
                        else {
                          setBackdrop(false);
                        }
                      }, locationHandleException);
                      setBuildingId(userData.buildingId);
                    }
                    else {
                      setBackdrop(false);
                    }
                  }, locationHandleException);
                }
                else {
                  setBackdrop(false);
                }
              }, locationHandleException);
            } else {
              setBackdrop(false);
            }
          }, locationHandleException);
        }, locationHandleException);
      } else {
        setBackdrop(false);
      }
    } else {
      FetchLocationService((locationRespObj) => {
        locationHandleSuccess(locationRespObj);
        setBranchList([]);
        setFacilityList([]);
        setBuildingList([]);
        setFloorList([]);
        setLabList([]);
        setBranchId('');
        setFacilityId('');
        setBuildingId('');
        setFloorId('');
        setLabId('');
      }, locationHandleException);
    }
    setId(userData?.id || '');
    setEmployeeId(userData?.employeeId || '');
    setEmailId(userData?.email || '');
    setPhone(userData?.phone || '');
    if (isSuperAdmin) {
      setRole(userData?.user_role || 'superAdmin');
    } else {
      setRole(userData?.user_role || 'User');
    }
    setEmpNotification(userData?.empNotification === 1 ? true : false);
    setFullName(userData?.FullName || '');
    setCompanyCode(userData?.companyCode || '');
    setLocationId(userData?.locationId || '');
    setBranchId(userData?.branchId || '');
    setFacilityId(userData?.facilityId || '');
    setBuildingId(userData?.buildingId || '');
    setFloorId(userData?.floorId || '');
    setLabId(userData?.zoneId || '');
  };

  const validateForNullValue = (value, type) => {
    AddUserValidate(value, type, setErrorObject);
  };

  const handleSuccess = (resErrorObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: resErrorObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
      setErrorObject({});
    }, 3000);
  };

  const handleException = (resErrorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAddButton) {
      await UserAddService({
        locationId,  /*empId,*/ email, phone: phoneNo, role: empRole, FullName: empName, /*empNotification,*/
      }, handleSuccess, handleException);
    } else {
      await UserUpdateService({
        locationId,  /*empId,*/ email, phone: phoneNo, role: empRole, FullName: empName, /*empNotification,*/ id,
      }, handleSuccess, handleException);
    }
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    UnblockUserService(
      { email, password, id },
      passwordValidationSuccess,
      passwordValidationException,
    );
    setBtnReset(false);
  };
  const passwordValidationSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const passwordValidationException = (resErrorObject, errorMessage) => {
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

  const locationHandleSuccess = (dataObject) => {
    setLocationList(dataObject.data);
    setBranchList([]);
    setFacilityList([]);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
  };

  const locationHandleException = () => { };

  const branchHandleSuccess = (dataObject) => {
    setBranchList(dataObject.data);
    setFacilityList([]);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setBranchId('');
    setFacilityId('');
    setBuildingId('');
    setFloorId('');
    setLabId('');
  };

  const branchHandleException = () => { };

  const facilityHandleSuccess = (dataObject) => {
    setFacilityList(dataObject.data);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setFacilityId('');
    setBuildingId('');
    setFloorId('');
    setLabId('');
  };

  const facilityHandleException = () => { };

  const buildingHandleSuccess = (dataObject) => {
    setBuildingList(dataObject.data);
    setFloorList([]);
    setLabList([]);
    setBuildingId('');
    setFloorId('');
    setLabId('');
  }

  const floorHandleSuccess = (dataObject) => {
    setFloorList(dataObject.data);
    setLabList([]);
    setFloorId('');
    setLabId('');
  }

  const labHandleSuccess = (dataObject) => {
    setLabList(dataObject.data);
    setLabId('');
    setBackdrop(false);
  }

  const onLocationChange = (locationId) => {
    setLocationId(locationId);
    if (locationId) {
      FetchBranchService({ locationId }, branchHandleSuccess, branchHandleException);
    } else {
      setBranchList([]);
      setFacilityList([]);
      setBuildingList([]);
      setFloorList([]);
      setLabList([]);
      setBranchId('');
      setFacilityId('');
      setBuildingId('');
      setFloorId('');
      setLabId('');
    }
  };

  const onBranchChange = (branchId) => {
    setBranchId(branchId);
    if (branchId) {
      FetchFacilitiyService({ locationId, branchId }, facilityHandleSuccess, facilityHandleException);
    } else {
      setFacilityList([]);
      setBuildingList([]);
      setFloorList([]);
      setLabList([]);
      setFacilityId('');
      setBuildingId('');
      setFloorId('');
      setLabId('');
    }
  };

  const onFacilityChange = (facilityId) => {
    setFacilityId(facilityId);
    if (facilityId) {
      BuildingFetchService({ locationId, branchId, facilityId }, buildingHandleSuccess, locationHandleException);
    } else {
      setBuildingList([]);
      setFloorList([]);
      setLabList([]);
      setBuildingId('');
      setFloorId('');
      setLabId('');
    }
  };

  const onBuildingChange = (buildingId) => {
    setBuildingId(buildingId);
    if (facilityId) {
      FloorfetchService({ locationId, branchId, facilityId, buildingId }, floorHandleSuccess, locationHandleException);
    } else {
      setFloorList([]);
      setLabList([]);
      setFloorId('');
      setLabId('');
    }
  }
  const onFloorChange = (floorId) => {
    setFloorId(floorId);
    if (floorId) {
      LabfetchService({ locationId, branchId, facilityId, buildingId, floorId }, labHandleSuccess, locationHandleException);
    } else {
      setLabList([]);
      setLabId('');
    }
  }

  const onLabChange = (zoneId) => {
    setLabId(zoneId);
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle sx={{ letterSpacing: '1px', textAlign: 'center', fontSize: " 22px" }}>
        {isAddButton ? 'Add User' : 'Edit User'}
      </DialogTitle>
      <DialogContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <Grid container spacing={2} sx={{ mt: 0, mb: 2 }}>
              {isSuperAdmin ? '' : (

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      value={locationId}
                      onChange={(e) => onLocationChange(e.target.value)}
                      label="Location"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {locationList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.locationName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="branch-label">Branch</InputLabel>
                    <Select
                      labelId="branch-label"
                      value={branchId}
                      onChange={(e) => onBranchChange(e.target.value)}
                      label="Branch"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {branchList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.branchName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="facility-label">Facility</InputLabel>
                    <Select
                      labelId="facility-label"
                      value={facilityId}
                      onChange={(e) => onFacilityChange(e.target.value)}
                      label="Facility"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {facilityList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.facilityName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="building-label">Building</InputLabel>
                    <Select
                      labelId="building-label"
                      value={buildingId}
                      onChange={(e) => onBuildingChange(e.target.value)}
                      label="Building"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {buildingList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.buildingName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="floor-label">Floor</InputLabel>
                    <Select
                      labelId="floor-label"
                      value={floorId}
                      onChange={(e) => onFloorChange(e.target.value)}
                      label="Floor"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {floorList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.floorName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <InputLabel id="lab-label">Lab</InputLabel>
                    <Select
                      labelId="lab-label"
                      value={zoneId}
                      onChange={(e) => onLabChange(e.target.value)}
                      label="Lab"
                    >
                      <MenuItem value="" key={0}><em>N/A</em></MenuItem>
                      {labList?.map((data, index) => (
                        <MenuItem value={data.id} key={index + 1}>{data.zoneName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}


              {/* <div className="rounded-md -space-y-px mb-2">
              <TextField
                sx={{ mb: 2, mt: 2 }}
                label="Employee Id"
                type="text"
                value={empId}
                variant="outlined"
                placeholder="Employee Id"
                className="mb-2 appearance-none rounded-none
                relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                focus:ring-red-500 focus:border-red-500  sm:text-sm"
                required
                onBlur={() => validateForNullValue(empId, 'employeeId')}
                onChange={(e) => { setEmployeeId(e.target.value); }}
                autoComplete="off"
                error={errorObject?.employeeId?.errorStatus}
                helperText={errorObject?.employeeId?.helperText}
              />
            </div> */}
              {/* <Grid container spacing={2}> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  sx={{ mb: 2 }}
                  label="Email Id"
                  type="email"
                  value={email}
                  variant="outlined"
                  placeholder="Email Id"
                  fullWidth
                  required
                  onBlur={() => { validateForNullValue(email, 'email'); }}
                  onChange={(e) => { setEmailId(e.target.value); }}
                  autoComplete="off"
                  error={errorObject?.emailId?.errorStatus}
                  helperText={errorObject?.emailId?.helperText}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  sx={{ mb: 2 }}
                  label="Phone"
                  type="number"
                  value={phoneNo}
                  variant="outlined"
                  placeholder="Phone number"
                  fullWidth
                  required
                  onBlur={() => validateForNullValue(phoneNo, 'phone')}
                  onChange={(e) => { setPhone(e.target.value); }}
                  autoComplete="off"
                  error={errorObject?.phone?.errorStatus}
                  helperText={errorObject?.phone?.helperText}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <TextField
                  sx={{ mb: 2 }}
                  label="Full Name"
                  type="text"
                  value={empName}
                  variant="outlined"
                  placeholder="Full Name"
                  fullWidth
                  required
                  onBlur={() => validateForNullValue(empName, 'fullName')}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  error={errorObject?.fullName?.errorStatus}
                  helperText={errorObject?.fullName?.helperText}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <FormControl sx={{ mb: 2 }} fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  {isSuperAdmin ? (
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={empRole}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      disabled
                    >
                      <MenuItem value="superAdmin">Super Admin</MenuItem>
                    </Select>
                  ) : (
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={empRole}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      disabled={userRole === 'Manager'}
                    >
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* {isSuperAdmin ? '' :
              <div className="">
                <div className="">
                  <FormGroup sx={{ display: 'block' }}>
                    <FormControlLabel
                      control={(
                        <Switch
                          eslint-disable-next-line 
                          checked={empNotification}
                          onChange={(e) => {
                            setEmpNotification(e.target.checked);
                          }}
                          color="warning"
                        />
                      )}
                      label="Enable Notification"
                    />
                  </FormGroup>
                </div>
              </div>
            } */}
            <div className="rounded-md -space-y-px float-right">
              {/* {isAddButton ? ''
                : (
                  <Button
                    onClick={() => {
                      setBtnReset(true);
                    }}
                  >
                    Reset Password
                  </Button>
                )} */}
              <Button
                type="submit"
                disabled={
                  errorObject?.employeeId?.errorStatus
                  || errorObject?.emailId?.errorStatus
                  || errorObject?.phone?.errorStatus
                  || errorObject?.role?.errorStatus
                  || errorObject?.fullName?.errorStatus
                }
              >
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
                onClick={() => {
                  setErrorObject({});
                  setBranchList([]);
                  setFacilityList([]);
                  setBuildingList([]);
                  setBranchId('');
                  setFacilityId('');
                  setBuildingId('');
                  setFloorId('');
                  setLabId('');
                  loaddata();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
      <ConfirmPassword
        open={btnReset}
        passwordSubmit={passwordSubmit}
        setConfirmPassword={setConfirmPassword}
        setBtnReset={setBtnReset}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog >
  );
}

export default UserModal;
