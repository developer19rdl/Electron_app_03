import React, { useState, useEffect } from 'react';
import {
  InputLabel, MenuItem, FormControl, Select, Grid, Box, Button, TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  FetchBranchService,
  FetchFacilitiyService,
  FetchLocationService,
  FetchUserLogService,
  FetchUserLogDetails,
  BuildingFetchService,
  FloorfetchService,
  LabfetchService,
} from '../../../services/LoginPageService';
import { currentDateValidator, dateRangevalidator } from '../../../utils/helperFunctions';
import NotificationBar from '../../notification/ServiceNotificationBar';

export default function UserLogForm() {
  const [location_id, setLocation_id] = useState('');
  const [branch, setBranch] = useState('');
  const [branch_id, setBranch_id] = useState('');
  const [facility, setFacility] = useState('');
  const [building_id, setBuildingId] = useState('');
  const [floor_id, setFloorId] = useState('');
  const [lab_id, setLabId] = useState('');
  const [userId, setUserId] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [userLogList, setUserLogList] = useState([]);
  const [isLoading, setGridLoading] = useState(false);
  const [unTaggedUserList, setUnTaggedUserList] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    loadLocation();
    FetchUserLogService({}, UserLogHandleSuccess, userHandleException);
  }, [unTaggedUserList]);

  const columns = [
    // {
    //   field: 'companyCode',
    //   headerName: 'Company Name',
    //   width: 150,
    //   headerAlign: 'center'
    // },
    // {
    //   field: 'userId',
    //   headerName: 'User ID',
    //   width: 130,
    //   headerAlign: 'center'
    // },
    {
      field: 'userEmail',
      headerName: 'Email',
      minWidth: 250,
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'createdDate',
      headerName: 'Date',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'createdTime',
      headerName: 'Time',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center'
    },
  ];

  const loadLocation = () => {
    FetchLocationService(LocationHandleSuccess, LocationHandleException);
  };

  const LocationHandleSuccess = (dataObject) => {
    setLocationList(dataObject.data);
  };

  const LocationHandleException = () => { };
  /* eslint-disable-next-line */
  const LocationChanged = (location_id) => {
    setLocation_id(location_id);
    setBranchList([]);
    setFacilityList([]);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setBranch_id('');
    setBranch('');
    setFacility('');
    setBuildingId('');
    setFloorId('');
    setLabId('');

    setUserId('');
    setUserList([]);
    if(location_id){
      FetchBranchService({ location_id }, BranchHandleSuccess, branchHandleException);
    }
    FetchUserLogService({ location_id }, UserLogHandleSuccess, userHandleException);
  };
  /* eslint-disable-next-line */
  const BranchChanged = (branch_id) => {
    setBranch(branch_id);
    setBranch_id(branch_id);
    setFacilityList([]);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setFacility('');
    setBuildingId('');
    setFloorId('');
    setLabId('');

    setUserId('');
    setUserList([]);
    if(branch_id){
      FetchFacilitiyService({ location_id, branch_id }, FacilityHandleSuccess, FacilityHandleException);
    }
    FetchUserLogService({ location_id, branch_id }, UserLogHandleSuccess, userHandleException);
  };

  const BranchHandleSuccess = (dataObject) => {
    setBranchList(dataObject.data || []);
  };

  const branchHandleException = () => { };

  const userHandleException = () => { };

  const FacilityHandleSuccess = (dataObject) => {
    setFacilityList(dataObject.data || []);
  };

  const FacilityHandleException = () => { };

  const FacilityChanged = (facility_id) => {
    setFacility(facility_id);
    setBuildingList([]);
    setFloorList([]);
    setLabList([]);
    setBuildingId('');
    setFloorId('');
    setLabId('');

    setUserId('');
    setUserList([]);
    if(facility_id){
      BuildingFetchService({ location_id, branch_id, facility_id }, buildingHandleSuccess, locationHandleException);
    }
    FetchUserLogService({ location_id, branch_id, facility_id }, UserLogHandleSuccess, userHandleException);
  };

  const buildingHandleSuccess = (dataObject) =>{
    setBuildingList(dataObject.data || []);
  }

  const locationHandleException = () => {};

  const onBuildingChange = (building_id) =>{
    setBuildingId(building_id);
    setFloorList([]);
    setLabList([]);
    setFloorId('');
    setLabId('');

    setUserId('');
    setUserList([]);
    if(building_id){
      FloorfetchService({ location_id, branch_id, facility_id: facility, building_id }, floorHandleSuccess, locationHandleException);
    }
    FetchUserLogService({ location_id, branch_id, facility_id: facility, building_id }, UserLogHandleSuccess, userHandleException);
  }

  const onFloorChange = (floor_id) =>{
    setFloorId(floor_id);
    setLabList([]);
    setLabId('');
    
    setUserId('');
    setUserList([]);
    if(floor_id){
      LabfetchService({ location_id, branch_id, facility_id: facility, building_id, floor_id }, labHandleSuccess, locationHandleException);
    }
    FetchUserLogService({ location_id, branch_id, facility_id: facility, building_id, floor_id }, UserLogHandleSuccess, userHandleException);
  }

  const onLabChange = (lab_id) =>{
    setLabId(lab_id);
    
    setUserId('');
    setUserList([]);
    // if(lab_id){
    // }
    FetchUserLogService({ location_id, branch_id, facility_id: facility, building_id, floor_id, lab_id }, UserLogHandleSuccess, userHandleException);
  }

  const floorHandleSuccess = (dataObject) =>{
    setFloorList(dataObject.data || []);
  }

  const labHandleSuccess = (dataObject) =>{
    setLabList(dataObject.data || []);
  }

  const UserLogHandleSuccess = (dataObject) => {
    setUserList(dataObject || []);
    setGridLoading(false);
  };

  const UserLogDetailsHandleSuccess = (dataObject) => {
    setUserLogList(dataObject.data);
    setGridLoading(false);
  };

  const userLogDetailsHandleException = () => { };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(fromDate>toDate){
      dateRangevalidator(setNotification);
    } else {
      setGridLoading(true);
      FetchUserLogDetails({ location_id, branch_id, facility_id: facility, building_id, floor_id, lab_id, userId, fromDate, toDate }, UserLogDetailsHandleSuccess, userLogDetailsHandleException);
    }
  };

  const handleCancel = () => {
    setLocation_id('');
    setBranch('');
    setBranch_id('');
    setFacility('');
    setUserId('');
    setBranchList([]);
    setFacilityList([]);
    setUserList([]);
    setFromDate('');
    setToDate('');
    setUserLogList([]);
    setGridLoading(false);
    setUnTaggedUserList(!unTaggedUserList);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid sx={{ mt: 1 }} item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location_id}
                  label="Location"
                  onChange={(e) => {
                    setLocation_id(e.target.value);
                    LocationChanged(e.target.value);
                  }}
                >
                  <MenuItem value="" key={0}>
                    <em>N/A</em>
                  </MenuItem>
                  {locationList.map((data, index) => (
                    <MenuItem value={data.id} key={index + 1}>{data.stateName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={branch}
                label="Branch"
                onChange={(e) => {
                  BranchChanged(e.target.value);
                }}
              >
                <MenuItem value="" key={0}>
                  <em>N/A</em>
                </MenuItem>
                {branchList.map((data, index) => (
                  <MenuItem value={data.id} key={index + 1}>{data.branchName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Facility</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facility}
                label="Facility"
                onChange={(e) => {
                  FacilityChanged(e.target.value);
                }}
              >
                <MenuItem value="" key={0}>
                  <em>N/A</em>
                </MenuItem>
                {facilityList.map((data, index) => (
                  <MenuItem value={data.id} key={index + 1}>{data.facilityName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Building</InputLabel>
                <Select
                  value={building_id}
                  onChange={(e) => onBuildingChange(e.target.value)}
                  label="Building"
                >
                  <MenuItem value="" key={0}>
                    <em>N/A</em>
                  </MenuItem>
                  {buildingList?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index + 1}>{data.buildingName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Floor</InputLabel>
                <Select
                  value={floor_id}
                  onChange={(e) => onFloorChange(e.target.value)}
                  label="Floor"
                >
                  <MenuItem value="" key={0}>
                    <em>N/A</em>
                  </MenuItem>
                  {floorList?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index + 1}>{data.floorName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <div className="rounded-md -space-y-px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Lab</InputLabel>
                <Select
                  value={lab_id}
                  onChange={(e) => onLabChange(e.target.value)}
                  label="Lab"
                >
                  <MenuItem value="" key={0}>
                    <em>N/A</em>
                  </MenuItem>
                  {labList?.map((data, index) => {
                    return (
                      <MenuItem value={data.id} key={index + 1}>{data.labDepName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId}
                // required
                label="User"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              >
                <MenuItem value="" key={0}>
                  <em>N/A</em>
                </MenuItem>
                {userList?.map((data, index) => (
                  <MenuItem value={data.id} key={index + 1}>{data.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              label="From Date"
              type="date"
              value={fromDate}
              variant="outlined"
              className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
              text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
              required
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDateValidator()
              }}
            />
          </Grid>
          <Grid
            sx={{ mt: 1, padding: 0 }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              label="to date"
              type="date"
              value={toDate}
              variant="outlined"
              className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
              text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
              required
              onChange={(e) => {
                setToDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDateValidator()
              }}
            />
          </Grid>
          <Grid
            sx={{ mt: 0, padding: 0 }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              paddingTop: '0px'
            }}
          >
            <div className="ml-2 float-right inline-block">
              <FormControl sx={{ margin: '5px' }}>
                <Button autoFocus onClick={handleCancel}>
                  Cancel
                </Button>
              </FormControl>
              <FormControl sx={{ margin: '5px' }}>
                <Button type="submit">
                  Submit
                </Button>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </form>
      <Grid>
        <div style={{ height: '350px', width: '100%',}}>
          <DataGrid
            rows={userLogList}
            columns={columns}
            pageSize={5}
            loading={isLoading}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Grid>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}
