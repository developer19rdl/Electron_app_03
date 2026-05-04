import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
} from '@mui/material';


import {
    FetchLocationService,
    FetchBranchService,
    FetchFacilitiyService,
    BuildingFetchService,
    FloorfetchService,
    LabfetchService,
    DeviceFetchService,
    SearchDeviceDataService,
} from '../../services/LoginPageService';
import ApplicationStore from '../../utils/localStorageUtil';


function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ManagementPlantAlert({
    locationId,
    setLocationId,
    branchId,
    setBranchId,
    facilityId,
    setFacilityId,
    buildingId,
    setBuildingId,
    setFloorId,
    floorId,
    setZoneId,
    zoneId,

}) {

    const [locationList, setLocationList] = useState([]);

    const [branchList, setBranchList] = useState([]);

    const [facilityList, setFacilityList] = useState([]);

    const [buildingList, setBuildingList] = useState([]);
    // const [floorId, setFloorId] = useState('');
    const [floorList, setFloorList] = useState([]);
    // const [zoneId, setZoneId] = useState('');
    const [zoneList, setZoneList] = useState([]);
    const [deviceId, setDeviceId] = useState('');
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    useEffect(() => {
        loadLocation();
    }, []);



    const loadLocation = () => {
        FetchLocationService(LocationHandleSuccess, LocationHandleException);
    };

    const LocationHandleSuccess = (dataObject) => {
        setLocationList(dataObject.data || []);
        if (locationDetails?.locationId) {
            setLocationId(locationDetails?.locationId);
            FetchBranchService({ locationId: locationDetails?.locationId }, BranchHandleSuccess, BranchHandleException);
        }
    };
    const LocationHandleException = () => { };

    const LocationChanged = (locationId) => {
        setLocationId(locationId);
        setBranchId('');
        setFacilityId('');
        setBuildingId('');
        setFloorId('');
        setZoneId('');
        setBranchList([]);
        setFacilityList([]);
        setBuildingList([]);
        setFloorList([]);
        setZoneList([]);
        if (locationId) {
            FetchBranchService({ locationId }, BranchHandleSuccess, BranchHandleException);
        }
    };

    const BranchHandleSuccess = (dataObject) => {
        setBranchList(dataObject.data || []);
        if (locationDetails?.branchId) {
            setBranchId(locationDetails?.branchId);
            FetchFacilitiyService({
                locationId: locationDetails?.locationId,
                branchId: locationDetails?.branchId
            }, FacilityHandleSuccess, FacilityHandleException
            );
        }
    };
    const BranchHandleException = () => { };

    const BranchChanged = (branchId) => {
        setBranchId(branchId);
        setFacilityId('');
        setBuildingId('');
        setFloorId('');
        setZoneId('');
        setFacilityList([]);
        setBuildingList([]);
        setFloorList([]);
        setZoneList([]);
        if (branchId) {
            FetchFacilitiyService({ locationId, branchId }, FacilityHandleSuccess, FacilityHandleException);
        }
    };
    const FacilityHandleSuccess = (dataObject) => {
        setFacilityList(dataObject.data || []);
        if (locationDetails?.facilityId) {
            setFacilityId(locationDetails?.facilityId);
            BuildingFetchService({
                locationId: locationDetails?.locationId,
                branchId: locationDetails?.branchId,
                facilityId: locationDetails?.facilityId,
            }, BuildingHandleSuccess, BuildingHandleException);
        }
    };

    const FacilityHandleException = () => { };

    const FacilityChanged = (facilityId) => {
        setFacilityId(facilityId);
        setBuildingId('');
        setFloorId('');
        setZoneId('');
        setBuildingList([]);
        setFloorList([]);
        setZoneList([]);
        if (facilityId) {
            BuildingFetchService({ locationId, branchId, facilityId }, BuildingHandleSuccess, BuildingHandleException);
        }
    };

    const BuildingHandleSuccess = (dataObject) => {
        setBuildingList(dataObject.data || []);
        if (locationDetails?.buildingId) {
            setBuildingId(locationDetails?.buildingId);
            FloorfetchService({
                locationId: locationDetails?.locationId,
                branchId: locationDetails?.branchId,
                facilityId: locationDetails?.facilityId,
                buildingId: locationDetails?.buildingId,
            }, FloorHandleSuccess, FloorHandleException);
        }
    };

    const BuildingHandleException = () => { };

    const BuildingChanged = (buildingId) => {
        setBuildingId(buildingId);
        setFloorId('');
        setZoneId('');
        setFloorList([]);
        setZoneList([]);
        if (buildingId) {
            FloorfetchService({
                locationId, branchId, facilityId, buildingId,
            }, FloorHandleSuccess, FloorHandleException);
        }
    };

    const FloorHandleSuccess = (dataObject) => {
        setFloorList(dataObject.data || []);
        if (locationDetails?.floorId) {
            setFloorId(locationDetails?.floorId);
            LabfetchService({
                locationId: locationDetails?.locationId,
                branchId: locationDetails?.branchId,
                facilityId: locationDetails?.facilityId,
                buildingId: locationDetails?.buildingId,
                floorId: locationDetails?.floorId,
            }, LabHandleSuccess, LabHandleException);
        }
    };
    const FloorHandleException = () => { };

    const FloorChanged = (floorId) => {
        setFloorId(floorId);
        setZoneId('');
        setZoneList([]);
        if (floorId) {
            LabfetchService({
                locationId, branchId, facilityId, buildingId, floorId,
            }, LabHandleSuccess, LabHandleException);
        }
    };

    const LabHandleSuccess = (dataObject) => {
        setZoneList(dataObject.data || []);
        // if (locationDetails?.zoneId) {
        //     setZoneId(locationDetails?.zoneId);
        // }
    };

    const LabHandleException = () => { };

    const LabHandleChange = (zoneId) => {
        setZoneId(zoneId);
        // if(zoneId){
        //     SearchDeviceDataService({
        //         locationId, branchId, facilityId, buildingId, floorId, zoneId,
        //     }, DeviceHandleSuccess, DeviceHandleException);
        // }
    };



    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Grid container spacing={1} style={{
            marginTop: 2,
            marginLeft: '0px',
            marginRight: '10px',
            paddingLeft: '5px',
            paddingRight: '5px'
        }}>
            <Grid item
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={2}
            >
                <FormControl fullWidth size="small">
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={locationId}
                        label="Location"
                        disabled={locationDetails?.locationId}
                        onChange={(e) => {
                            LocationChanged(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {locationList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.locationName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}>
                <FormControl fullWidth size="small" >
                    <InputLabel>Branch</InputLabel>
                    <Select
                        value={branchId}
                        label="Branch"
                        disabled={locationDetails?.branchId}
                        onChange={(e) => {
                            BranchChanged(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {branchList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.branchName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}
            >
                <FormControl fullWidth size="small" >
                    <InputLabel>Facility</InputLabel>
                    <Select
                        value={facilityId}
                        label="Facility"
                        disabled={locationDetails?.facilityId}
                        onChange={(e) => {
                            FacilityChanged(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {facilityList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.facilityName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}
            >
                <FormControl fullWidth size="small" >
                    <InputLabel>Building</InputLabel>
                    <Select
                        value={buildingId}
                        label="Building"
                        disabled={locationDetails?.buildingId}
                        onChange={(e) => {
                            BuildingChanged(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {buildingList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.buildingName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>


            <Grid item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}
            >
                <FormControl fullWidth size="small" >
                    <InputLabel>Floor</InputLabel>
                    <Select
                        value={floorId}
                        label="Floor"
                        disabled={locationDetails?.floorId}
                        onChange={(e) => {
                            FloorChanged(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {floorList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.floorName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}
            >
                <FormControl fullWidth size="small" >
                    <InputLabel>Zone</InputLabel>
                    <Select
                        value={zoneId}
                        label="Zone"
                        onChange={(e) => {
                            LabHandleChange(e.target.value);
                        }}
                    >
                        <MenuItem value="" key={0}>
                            <em style={{ fontWeight: 'bold' }}>All</em>
                        </MenuItem>
                        {zoneList.map((data, index) => (
                            <MenuItem value={data.id} key={index + 1}>{data.zoneName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>


    );
}
