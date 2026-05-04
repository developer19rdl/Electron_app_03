import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
    Card,
    CardHeader, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddDeviceListResults from './Device/subComponent/AddDeviceListResults';
import HorizontalLinearStepper from './Device/DeviceSensor';
// import MeterAdd from './Device/MeterAddModel';
import { useUserAccess } from '../context/UserAccessProvider';
import ApplicationStore from '../utils/localStorageUtil';
import { BuildingFetchService, DeviceFetchService, FetchBranchService, FetchFacilitiyService, FetchLocationService, FloorfetchService, LabfetchService, ZoneDeviceFetchService } from '../services/LoginPageService';
import { MeterListResults } from './Device/meter-list-results';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddTagToolbar from './TagDevices/AddTagToolbar';
import { AddTaglistresult } from './TagDevices/AddTag-list-result';
import { AllocationListResult } from './TagDevices/AllocationDevice/AllocationListResult';


function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: '10px' }}>
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

function DeviceListResults() {
    const [hoveredDropdown, setHoveredDropdown] = useState(null);

    // const [isHovered, setIsHovered] = useState(false);
    const [locationId, setLocationId] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [branchId, setBranchId] = useState('');
    const [branchList, setBranchList] = useState([]);
    const [facilityId, setFacilityId] = useState('');
    const [facilityList, setFacilityList] = useState([]);
    const [buildingId, setBuildingId] = useState('');
    const [buildingList, setBuildingList] = useState([]);
    const [floorId, setFloorId] = useState('');
    const [floorList, setFloorList] = useState([]);
    const [zoneId, setZoneId] = useState('');
    const [zoneList, setZoneList] = useState([]);
    // const [isHovered, setIsHovered] = useState(false);
    const [deviceList, setDeviceList] = useState([]);
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    const [zoneMap, setZoneMap] = useState('');
    useEffect(() => {
        loadLocation();
    }, []);
    // const { imageLabURL } = locationDetails;

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const routeStateObject = useLocation();



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
        // setZoneMap(dataObject.data.zoneMap)
        // console.log(dataObject.data.zoneMap);
        // if (locationDetails?.zoneId) {
        //     setZoneId(locationDetails?.zoneId);
        //     setZoneMap(locationDetails?.zoneMap)
        // }
    };

    const LabHandleException = () => { };

    const LabHandleChange = (zoneId) => {
        setZoneId(zoneId);
        // setZoneId(zoneId);

        if (zoneId) {
            ZoneDeviceFetchService({
                locationId, branchId, facilityId, buildingId, floorId, zoneId
            }, ZoneDeviceFetchSuccess, ZoneDeviceFetchException);
        }
        if (zoneId) {
            DeviceFetchService({
                locationId, branchId, facilityId, buildingId, floorId, zoneId
            }, DeviceFetchSuccess, DeviceFetchException);
        }

    };

    const ZoneDeviceFetchSuccess = (dataObject) => {

        setZoneMap(dataObject.data[0].zoneMap);
        // console.log("zoneMap", dataObject.data[0].zoneMap);

        // if (locationDetails?.zoneId) {
        //     setZoneId(locationDetails?.zoneId);
        //     setZoneMap(locationDetails?.zoneMap)
        // }
    };

    const ZoneDeviceFetchException = () => { };

    const DeviceFetchSuccess = (dataObject) => {

        setDeviceList(dataObject.data)

        // if (locationDetails?.zoneId) {
        //     setZoneId(locationDetails?.zoneId);
        //     setZoneMap(locationDetails?.zoneMap)
        // }
    };

    const DeviceFetchException = () => { };

    const moduleAccess = useUserAccess()('devicelocation');

    const [expanded, setExpanded] = useState(false);  // State to track if accordion is open

    const handleAccordionClick = (event) => {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'LI') {
            setExpanded((prevExpanded) => !prevExpanded);
        }
    };

    const handleHover = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };
    return (

        <Card className={' h-[auto] mb-10 m-0 sm:m-6'}
            style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px' }}>
            <Container maxWidth={false} style={{ padding: 0, height: '94vh' }}>
                <Box
                    sx={{
                        width: '100%',
                        marginBottom: '0',
                        marginTop: 0,
                        padding: 0,
                        height: '94vh',
                    }}
                >

                    {/* <Accordion
                        expanded={expanded}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAccordionClick}
                        disableGutters
                        elevation={0}
                        style={{ transition: 'max-height 0.2s ease-in-out' }}  // Smooth transition effect
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontWeight: 'bold' }}>Location List</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1} style={{ padding: '0px' }}>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.locationName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.branchName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.facilityName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.buildingName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.floorName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
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
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.zoneName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion> */}
                    <Accordion
                        expanded={expanded}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAccordionClick}
                        disableGutters
                        elevation={0}
                        style={{ transition: 'max-height 0.2s ease-in-out', borderBottom: '1px solid #212121' }}  // Smooth transition effect
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                Location List &gt;
                            </Typography>
                            <Typography style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                                {locationId ? ` ${locationList.find(item => item.id === locationId)?.locationName}` : ''}
                                {branchId ? `  >  ${branchList.find(item => item.id === branchId)?.branchName}` : ''}
                                {facilityId ? `  >  ${facilityList.find(item => item.id === facilityId)?.facilityName}` : ''}
                                {buildingId ? `  > ${buildingList.find(item => item.id === buildingId)?.buildingName}` : ''}
                                {floorId ? `  > ${floorList.find(item => item.id === floorId)?.floorName}` : ''}
                                {zoneId ? `   > ${zoneList.find(item => item.id === zoneId)?.zoneName}` : ''}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1} style={{ padding: '0px' }}>
                                <Grid item xs={6} sm={4} md={4} lg={3} xl={2}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Location</InputLabel>
                                        <Select
                                            value={locationId}
                                            label="Location"
                                            disabled={locationDetails?.locationId}
                                            onChange={(e) => LocationChanged(e.target.value)}
                                        >
                                            <MenuItem value="" key={0}>
                                                <em style={{ fontWeight: 'bold' }}>All</em>
                                            </MenuItem>
                                            {locationList.map((data, index) => (
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.locationName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <CardHeader
                        style={{ display: 'block' }}
                        title={
                            <Box sx={{ width: '100%' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                                    variant='scrollable'
                                    visibleScrollbar={true}
                                    // allowScrollButtonsMobile
                                    sx={{
                                        overflow: 'auto',
                                        width: 'auto',
                                        marginTop: '-16px',
                                        // marginLeft: '10px'
                                    }}
                                >
                                    {/* <Tab label="Devices" {...a11yProps(0)} /> */}
                                    {moduleAccess.add && <Tab label="Manage Devices" {...a11yProps(0)} />}
                                    {/* {moduleAccess.add && <Tab label="Manage Sensors" {...a11yProps(1)} />} */}
                                    {moduleAccess.add && <Tab label="Add Parameters" {...a11yProps(1)} />}
                                    {/* {moduleAccess.add && <Tab label="Tag Allocation" {...a11yProps(2)} />} */}
                                </Tabs>
                            </Box>
                        }
                    />

                    <TabPanel value={value} index={0} style={{ marginTop: '-14px' }}>
                        <HorizontalLinearStepper
                            locationDetails={{
                                locationId, branchId, facilityId, buildingId, floorId, zoneId,
                            }}
                            zoneMap={zoneMap}
                            setValue={setValue}
                            locationId={locationId}
                            branchId={branchId}
                            facilityId={facilityId}
                            buildingId={buildingId}
                            floorId={floorId}
                            zoneId={zoneId}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>

                        <Container maxWidth={false} style={{ marginTop: '-14px' }}>
                            <Box >
                                {/* <MeterListResults
                                    locationId={locationId}
                                    branchId={branchId}
                                    facilityId={facilityId}
                                    buildingId={buildingId}
                                    floorId={floorId}
                                    zoneId={zoneId}
                                    // deviceId={deviceId}
                                    locationDetails={{
                                        locationId, branchId, facilityId, buildingId, floorId, zoneId
                                    }}
                                    deviceList={deviceList}
                                /> */}
                                <AddTaglistresult />
                            </Box>
                        </Container>
                    </TabPanel>
                    <TabPanel value={value} index={2}>

                        <Container maxWidth={false} style={{ marginTop: '-14px' }}>
                            <Box >
                                {/* <MeterListResults
            locationId={locationId}
            branchId={branchId}
            facilityId={facilityId}
            buildingId={buildingId}
            floorId={floorId}
            zoneId={zoneId}
            // deviceId={deviceId}
            locationDetails={{
                locationId, branchId, facilityId, buildingId, floorId, zoneId
            }}
            deviceList={deviceList}
        /> */}
                                <AllocationListResult />
                            </Box>
                        </Container>
                    </TabPanel>
                    {/* </Grid> */}

                </Box>
            </Container>
        </Card>
    );
}

export default DeviceListResults;
