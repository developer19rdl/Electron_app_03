// import React, { useEffect, useState } from 'react';
// import './dashboard/dragResize.scss';
// import { Grid } from '@mui/material';

// import LocationGridWidget from './dashboard/components/LocationGridWidget';
// import AlertWidget from './dashboard/components/AlertWidget';
// import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
// import ImageMarkerList from './Device/subComponent/imageMarkerList';
// import LandingPageComponent from './dashboard/subComponent/siteDetailsComponent/LandingPageComponent';
// import DeviceGridComponent from './dashboard/subComponent/siteDetailsComponent/DeviceGridComponent';
// import ApplicationStore from '../utils/localStorageUtil';
// import { FetchFacilitiyService, FetchBranchService, FetchLocationService, DeviceIdAlerts, BuildingFetchService, FloorfetchService, LabfetchService } from '../services/LoginPageService';
// import NotificationBar from './notification/ServiceNotificationBar';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import PlantWidget from './dashboard/components/PlantWidget';
// import BuildingMeterPageComponent from './dashboard/subComponent/siteDetailsComponent/BuildingMeterPageComponent';
// import FooterComponent from './FooterComponent';


// const { locationLabel, facilityLabel, branchLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-shadow */
// function Dashboard() {
//   const [locationDetails, setLocationDetails] = useState({
//     locationId: '',
//     branchId: '',
//     facilityId: '',
//     buildingId: '',
//     floorId: '',
//     zoneId: '',
//     deviceId: '',
//   });

//   const [breadCrumbLabels, setBreadCrumbLabels] = useState({
//     stateLabel: locationLabel || 'State',
//     branchLabel: branchLabel || 'Branch',
//     facilityLabel: facilityLabel || 'Facility',
//     buildingLabel: buildingLabel || 'Building',
//     floorLabel: floorLabel || 'Floor',
//     zoneLabel: zoneLabel || 'Zone',
//     deviceLabel: '',
//   });

//   const [siteImages, setSiteImages] = useState({
//     buildingImg: '',
//     floorMap: '',
//     zoneMap: '',
//   });

//   const [zoomLevel, setZoomLevel] = useState(4);
//   const [centerLatitude, setCenterLatitude] = useState(23.500);
//   const [centerLongitude, setCenterLongitude] = useState(80.500);
//   const [totalActive, setActiveTotal] = useState("");
//   const [totalNumber, setTotalNumber] = useState("");
//   const [totalTags, setTotalTags] = useState("");
//   // console.log("totalActive", totalActive)

//   const [locationCoordinationList, setLocationCoordinationList] = useState([]);
//   const [locationState, setProgressState] = useState(0);
//   const [Img, setImg] = useState('');
//   const imgSrc = `http://192.168.1.94:8000/${Img}`;
//   // console.log("dashboardComponent", imgSrc);
//   const [ImageState, setImageState] = useState(0);
//   const [deviceCoordsList, setDeviceCoordsList] = useState([]);
//   const [isdashboard, setIsDashBoard] = useState(0);
//   const [isGeoMap, setIsGeoMap] = useState(true);
//   const [alertList, setAlertList] = useState([]);
//   const [openNotification, setNotification] = useState({
//     status: false,
//     type: 'error',
//     message: '',
//   })
//   useEffect(() => {
//     const { locationLabel, facilityLabel, branchLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
//     const { dashboardRefresh, labelCount } = ApplicationStore().getStorage('dashboardRefresh');

//     setBreadCrumbLabels((oldValue) => {
//       return {
//         ...oldValue, stateLabel: locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, zoneLabel
//       };
//     });
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     if (locationDetails?.buildingImg) {
//       setImg(locationDetails.buildingImg);
//     } else if (locationDetails?.floorMap) {
//       setImg(locationDetails.floorMap);
//     } else if (locationDetails?.zoneMap) {
//       setImg(locationDetails.zoneMap);
//     }

//     setLocationDetails((oldValue) => {
//       return {
//         ...oldValue,
//         locationId: locationDetails.locationId,
//         branchId: locationDetails.branchId,
//         facilityId: locationDetails.facilityId,
//         buildingId: locationDetails.buildingId,
//         floorId: locationDetails.floorId,
//         zoneId: locationDetails.zoneId,
//       };
//     });
//     setProgressState((oldValue) => {
//       let newValue = 0;
//       if (locationDetails.zoneId) {
//         newValue = 6;
//         setIsGeoMap(false);
//         setImageState(1);
//         setIsDashBoard(2);
//         fetchLab();
//         locationAlerts({ zoneId: locationDetails.zoneId });
//       } else if (locationDetails.floorId) {
//         newValue = 5;
//         setIsGeoMap(false);
//         setImageState(1);
//         fetchFloor();
//         locationAlerts({ floorId: locationDetails.floorId });
//       } else if (locationDetails.buildingId) {
//         newValue = 4;
//         setIsGeoMap(false);
//         setImageState(1);
//         fetchBuilding();
//         locationAlerts({ buildingId: locationDetails.buildingId });
//       } else if (locationDetails.facilityId) {
//         newValue = 3;
//         fetchFacility();
//         locationAlerts({ facilityId: locationDetails.facilityId });
//       } else if (locationDetails.branchId) {
//         newValue = 2;
//         fetchBranch();
//         locationAlerts({ branchId: locationDetails.branchId });
//       } else if (locationDetails.locationId) {
//         newValue = 1;
//         fetchBranch();
//         locationAlerts({ locationId: locationDetails.locationId });
//       } else {
//         fetchLocation();
//         locationAlerts({});
//       }
//       return newValue;
//     });

//     if (dashboardRefresh === true) {
//       ApplicationStore().setStorage('dashboardRefresh', { dashboardRefresh: true, labelCount: labelCount });
//       setInterval(() => {
//         // console.log('Interval Running..');
//         let fetchedLabelCount = 0;
//         let { locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
//         fetchedLabelCount = locationLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         fetchedLabelCount = branchLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         fetchedLabelCount = facilityLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         fetchedLabelCount = buildingLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         fetchedLabelCount = floorLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         fetchedLabelCount = zoneLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
//         if (labelCount >= fetchedLabelCount) {
//           location.reload();
//         }
//       }, 1000);
//     }
//   }, []);

//   const fetchLocation = () => {
//     FetchLocationService(handleLocationSuccess, handleBranchException);
//     locationAlerts({});
//   };

//   const handleLocationSuccess = (dataObject) => {
//     const newArray = dataObject.data ? dataObject.data.map((item) => {
//       const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
//       return {
//         id: item.id,
//         name: item.stateName,
//         position: {
//           lat: parseFloat(coordinates[0]),
//           lng: parseFloat(coordinates[1]),
//         },
//       };
//     })
//       : [];
//     setCenterLatitude(parseFloat(23.500 || newArray[0]?.position.lat));
//     setCenterLongitude(parseFloat(80.500 || newArray[0]?.position.lng));
//     setActiveTotal(dataObject?.totalActiveDevices)
//     setTotalNumber(dataObject?.totalDevices)
//     setTotalTags(dataObject?.totalTags)
//   };

//   const fetchBranch = () => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     FetchBranchService({
//       locationId: locationDetails.locationId,
//     }, handleBranchSuccess, handleBranchException);
//     locationAlerts({ locationId: locationDetails.locationId });
//   };

//   const handleBranchSuccess = (dataObject) => {
//     const newArray = dataObject.data ? dataObject.data.map((item) => {
//       const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
//       return {
//         id: item.id,
//         name: item.facilityName,
//         position: {
//           lat: parseFloat(coordinates[0]),
//           lng: parseFloat(coordinates[1]),
//         },
//       };
//     })
//       : [];
//     setCenterLatitude(parseFloat(newArray[0]?.position.lat));
//     setCenterLongitude(parseFloat(newArray[0]?.position.lng));
//   };

//   const handleBranchException = (errorObject) => { };

//   const fetchFacility = () => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     FetchFacilitiyService({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//     }, handleFetchSuccess, handleFetchException);
//     locationAlerts({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//     });
//   };

//   const handleFetchSuccess = (dataObject) => {
//     const newArray = dataObject.data ? dataObject.data.map((item) => {
//       const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
//       return {
//         id: item.id,
//         name: item.facilityName,
//         position: {
//           lat: parseFloat(coordinates[0]),
//           lng: parseFloat(coordinates[1]),
//         },
//       };
//     })
//       : [];
//     setCenterLatitude(parseFloat(newArray[0]?.position.lat));
//     setCenterLongitude(parseFloat(newArray[0]?.position.lng));
//   };

//   const handleFetchException = (errorObject) => { };

//   const fetchBuilding = () => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     BuildingFetchService({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//     }, handleBuildingSuccess, handleBuildingException);
//     locationAlerts({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//     });
//   };

//   const handleBuildingSuccess = (dataObject) => {

//   };

//   const handleBuildingException = (errorObject) => { };

//   const fetchFloor = () => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     FloorfetchService({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//       buildingId: locationDetails?.buildingId,

//     }, handleFloorSuccess, handleFloorException);
//     locationAlerts({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//       buildingId: locationDetails?.buildingId,
//     });
//   };

//   const handleFloorSuccess = (dataObject) => {
//   };

//   const handleFloorException = (errorObject) => { };

//   const fetchLab = () => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     LabfetchService({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//       buildingId: locationDetails?.buildingId,
//       floorId: locationDetails?.floorId,
//     }, handleLabSuccess, handleLabException);
//     locationAlerts({
//       locationId: locationDetails?.locationId,
//       branchId: locationDetails?.branchId,
//       facilityId: locationDetails?.facilityId,
//       buildingId: locationDetails?.buildingId,
//       floorId: locationDetails?.floorId,
//     });
//   };

//   const handleLabSuccess = (dataObject) => {
//   };

//   const handleLabException = (errorObject) => { };

//   const locationAlerts = (alertLocationDetails) => {
//     DeviceIdAlerts(handleSuccessAlerts, handleExceptionAlerts);
//   }

//   const handleSuccessAlerts = (dataObject) => {
//     setAlertList(dataObject.data || []);
//   }

//   const handleExceptionAlerts = () => { };

//   const handleClose = () => {
//     setNotification({
//       status: false,
//       type: '',
//       message: '',
//     });
//   };

//   return (
//     <Grid container style={{ height: '94vh', width: '100%', padding: '5px', }}>
//       {isdashboard === 0
//         && (
//           <div style={{ height: '94vh', width: '100%', }}>
//             <Grid
//               item
//               xs={12}
//               sx={{
//                 marginLeft: 1,
//               }}
//               style={{
//                 height: '94vh',
//                 width: '100%',
//                 marginLeft: '0px'

//               }}
//             >
//               <Grid
//                 container
//                 item
//                 xs={12}
//                 style={{
//                   height: '90vh',
//                   width: '100%',
//                   overflow: 'auto',
//                   padding: '2px',
//                 }}
//               >
//                 <Grid
//                   item
//                   xs={12}
//                   sm={12}
//                   md={8}
//                   lg={8}

//                   sx={{ minHeight: '300px', height: '47vh', padding: '5px' }}
//                 >
//                   {/* <Paper elevation={5} sx={{ width: '100%', height: '100%', padding: '2px', borderRadius: '8px' }}> */}
//                   <LocationGridWidget
//                     setLocationCoordinationList={setLocationCoordinationList}
//                     locationState={locationState}
//                     setProgressState={setProgressState}
//                     setImg={setImg}
//                     setImageState={setImageState}
//                     locationDetails={locationDetails}
//                     setLocationDetails={setLocationDetails}
//                     setDeviceCoordsList={setDeviceCoordsList}
//                     setIsDashBoard={setIsDashBoard}
//                     setIsGeoMap={setIsGeoMap}
//                     siteImages={siteImages}
//                     setSiteImages={setSiteImages}
//                     setZoomLevel={setZoomLevel}
//                     setCenterLatitude={setCenterLatitude}
//                     setCenterLongitude={setCenterLongitude}
//                     breadCrumbLabels={breadCrumbLabels}
//                     setBreadCrumbLabels={setBreadCrumbLabels}
//                     setAlertList={setAlertList}
//                     locationAlerts={locationAlerts}
//                   />
//                   {/* </Paper> */}
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={4} lg={4}>
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexWrap: 'wrap',
//                       '& > :not(style)': {
//                         marginLeft: '1%',          // Left margin for child elements
//                         marginTop: '3px',         // Top margin for child elements
//                         width: '100%',             // Ensures the child elements take up the full width
//                         height: '45.5vh',          // Fixed height for the child elements
//                         padding: '5px',            // Padding inside each child element
//                         boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px',  // Subtle box shadow effect
//                         transition: 'box-shadow 0.3s ease',  // Smooth transition for the shadow
//                         '&:hover': {
//                           boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px',  // Enhanced shadow on hover
//                         },
//                       },
//                     }}
//                   >
//                     {/* Child components go here */}


//                     <Paper elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '6px' }}>
//                       <PlantWidget totalTags={totalTags} totalNumber={totalNumber} totalActive={totalActive} locationCoordinationList={locationCoordinationList} locationData={locationDetails} />
//                     </Paper>
//                   </Box>
//                 </Grid>

//                 <Grid
//                   item
//                   xs={12}
//                   sm={12}
//                   md={8}
//                   sx={{
//                     padding: '5px',
//                   }}
//                 >
//                   {/* Wrapping the content inside Paper to apply the box-shadow and other styles */}
//                   <Paper
//                     sx={{
//                       height: '46vh',  // Ensure the Paper takes the correct height
//                       boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 12px',  // Subtle shadow
//                       borderRadius: 2,  // MUI shorthand for border-radius
//                       // padding: '5px',
//                       transition: 'box-shadow 0.3s ease',  // Smooth transition for shadow
//                       '&:hover': {
//                         boxShadow: 'rgba(0, 0, 0, 0.5) 0px 8px 24px',  // Enhanced shadow on hover
//                       },
//                     }}
//                   >
//                     <AlertWidget dataList={alertList} setAlertList={setAlertList} setNotification={setNotification} />
//                   </Paper>
//                 </Grid>


//                 <Grid
//                   item
//                   xs={12}
//                   sm={12}
//                   md={4}
//                   lg={4}
//                 // style={{
//                 //   height: '47vh', padding: '5px',
//                 //   boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',

//                 // }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexWrap: 'wrap',
//                       '& > :not(style)': {
//                         // marginBottom: '3%',
//                         marginLeft: "1%",
//                         marginTop: '5px',
//                         width: '100%',
//                         height: "46vh",
//                         padding: '5px',
//                         // backgroundColor: 'red'
//                         transition: 'box-shadow 0.3s ease',  // Smooth transition for shadow
//                         '&:hover': {
//                           boxShadow: 'rgba(0, 0, 0, 0.5) 0px 4px 10px',  // Enhanced shadow on hover
//                         },

//                       },
//                     }}
//                   >
//                     <Paper elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '8px' }}>
//                       {isGeoMap === true ? <GeoLocationWidget locationCoordination={locationCoordinationList} zoomLevel={zoomLevel} centerLatitude={centerLatitude} centerLongitude={centerLongitude} height="46vh" />
//                         : <ImageMarkerList labImage={imgSrc} deviceCoordsList={deviceCoordsList} height="h-46vh min-h-295"
//                         />
//                       }
//                     </Paper>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </div>
//         )
//       }
//       {
//         isdashboard === 1
//         && (
//           <div style={{
//             height: '94vh',
//             width: '100%'
//           }}>
//             <LandingPageComponent locationDetails={locationDetails} setIsDashBoard={setIsDashBoard} />
//           </div>
//         )
//       }
//       {
//         isdashboard === 2
//         && (
//           <div style={{
//             height: '94vh',
//             width: '100%',
//             overflow: 'auto'
//           }}>
//             <DeviceGridComponent
//               setImg={setImg}
//               locationDetails={locationDetails}
//               setLocationDetails={setLocationDetails}
//               setDeviceCoordsList={setDeviceCoordsList}
//               setProgressState={setProgressState}
//               breadCrumbLabels={breadCrumbLabels}
//               setBreadCrumbLabels={setBreadCrumbLabels}
//               setIsDashBoard={setIsDashBoard}
//               setIsGeoMap={setIsGeoMap}
//               siteImages={siteImages}
//               setSiteImages={setSiteImages}
//               setCenterLatitude={setCenterLatitude}
//               setCenterLongitude={setCenterLongitude}
//               locationAlerts={locationAlerts}
//             />
//           </div>
//         )
//       }
//       {
//         isdashboard === 3
//         && (
//           <div style={{
//             height: '94vh',
//             width: '100%'
//           }}>
//             <BuildingMeterPageComponent locationDetails={locationDetails} setIsDashBoard={setIsDashBoard} />
//           </div>
//         )
//       }
//       <NotificationBar
//         handleClose={handleClose}
//         notificationContent={openNotification.message}
//         openNotification={openNotification.status}
//         type={openNotification.type}
//       />

//     </Grid >
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import './dashboard/dragResize.scss';
import { Grid } from '@mui/material';

import LocationGridWidget from './dashboard/components/LocationGridWidget';
import AlertWidget from './dashboard/components/AlertWidget';
import GeoLocationWidget from './dashboard/components/GeoLocationWidget';
import ImageMarkerList from './Device/subComponent/imageMarkerList';
import LandingPageComponent from './dashboard/subComponent/siteDetailsComponent/LandingPageComponent';
import DeviceGridComponent from './dashboard/subComponent/siteDetailsComponent/DeviceGridComponent';
import ApplicationStore from '../utils/localStorageUtil';
import { FetchFacilitiyService, FetchBranchService, FetchLocationService, DeviceIdAlerts, BuildingFetchService, FloorfetchService, LabfetchService } from '../services/LoginPageService';
import NotificationBar from './notification/ServiceNotificationBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PlantWidget from './dashboard/components/PlantWidget';
import BuildingMeterPageComponent from './dashboard/subComponent/siteDetailsComponent/BuildingMeterPageComponent';
import FooterComponent from './FooterComponent';


const { locationLabel, facilityLabel, branchLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
function Dashboard() {
  const [locationDetails, setLocationDetails] = useState({
    locationId: '',
    branchId: '',
    facilityId: '',
    buildingId: '',
    floorId: '',
    zoneId: '',
    deviceId: '',
  });

  const [breadCrumbLabels, setBreadCrumbLabels] = useState({
    stateLabel: locationLabel || 'State',
    branchLabel: branchLabel || 'Branch',
    facilityLabel: facilityLabel || 'Facility',
    buildingLabel: buildingLabel || 'Building',
    floorLabel: floorLabel || 'Floor',
    zoneLabel: zoneLabel || 'Zone',
    deviceLabel: '',
  });

  const [siteImages, setSiteImages] = useState({
    buildingImg: '',
    floorMap: '',
    zoneMap: '',
  });

  const [zoomLevel, setZoomLevel] = useState(4);
  const [centerLatitude, setCenterLatitude] = useState(23.500);
  const [centerLongitude, setCenterLongitude] = useState(80.500);
  const [totalActive, setActiveTotal] = useState("");
  const [totalNumber, setTotalNumber] = useState("");
  const [totalTags, setTotalTags] = useState("");
  // console.log("totalActive", totalActive)

  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [locationState, setProgressState] = useState(0);
  const [Img, setImg] = useState('');
  // const imgSrc = `https://wisething.in/${Img}`;
  const imgSrc = `${process.env.REACT_APP_BASE_URL}/${Img}`;
  // const imgSrc = `http://192.168.1.4:8000/${Img}`;
  // console.log("dashboardComponent", imgSrc);
  const [ImageState, setImageState] = useState(0);
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);
  const [isdashboard, setIsDashBoard] = useState(0);
  const [isGeoMap, setIsGeoMap] = useState(true);
  const [alertList, setAlertList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  })
  useEffect(() => {
    const { locationLabel, facilityLabel, branchLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
    const { dashboardRefresh, labelCount } = ApplicationStore().getStorage('dashboardRefresh');

    setBreadCrumbLabels((oldValue) => {
      return {
        ...oldValue, stateLabel: locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, zoneLabel
      };
    });
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    if (locationDetails?.buildingImg) {
      setImg(locationDetails.buildingImg);
    } else if (locationDetails?.floorMap) {
      setImg(locationDetails.floorMap);
    } else if (locationDetails?.zoneMap) {
      setImg(locationDetails.zoneMap);
    }

    setLocationDetails((oldValue) => {
      return {
        ...oldValue,
        locationId: locationDetails.locationId,
        branchId: locationDetails.branchId,
        facilityId: locationDetails.facilityId,
        buildingId: locationDetails.buildingId,
        floorId: locationDetails.floorId,
        zoneId: locationDetails.zoneId,
      };
    });
    setProgressState((oldValue) => {
      let newValue = 0;
      if (locationDetails.zoneId) {
        newValue = 6;
        setIsGeoMap(false);
        setImageState(1);
        setIsDashBoard(2);
        fetchLab();
        locationAlerts({ zoneId: locationDetails.zoneId });
      } else if (locationDetails.floorId) {
        newValue = 5;
        setIsGeoMap(false);
        setImageState(1);
        fetchFloor();
        locationAlerts({ floorId: locationDetails.floorId });
      } else if (locationDetails.buildingId) {
        newValue = 4;
        setIsGeoMap(false);
        setImageState(1);
        fetchBuilding();
        locationAlerts({ buildingId: locationDetails.buildingId });
      } else if (locationDetails.facilityId) {
        newValue = 3;
        fetchFacility();
        locationAlerts({ facilityId: locationDetails.facilityId });
      } else if (locationDetails.branchId) {
        newValue = 2;
        fetchBranch();
        locationAlerts({ branchId: locationDetails.branchId });
      } else if (locationDetails.locationId) {
        newValue = 1;
        fetchBranch();
        locationAlerts({ locationId: locationDetails.locationId });
      } else {
        fetchLocation();
        locationAlerts({});
      }
      return newValue;
    });

    if (dashboardRefresh === true) {
      ApplicationStore().setStorage('dashboardRefresh', { dashboardRefresh: true, labelCount: labelCount });
      setInterval(() => {
        // console.log('Interval Running..');
        let fetchedLabelCount = 0;
        let { locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, zoneLabel } = ApplicationStore().getStorage('siteDetails');
        fetchedLabelCount = locationLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        fetchedLabelCount = branchLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        fetchedLabelCount = facilityLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        fetchedLabelCount = buildingLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        fetchedLabelCount = floorLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        fetchedLabelCount = zoneLabel !== '' ? fetchedLabelCount + 1 : fetchedLabelCount;
        if (labelCount >= fetchedLabelCount) {
          location.reload();
        }
      }, 1000);
    }
  }, []);

  const fetchLocation = () => {
    FetchLocationService(handleLocationSuccess, handleBranchException);
    locationAlerts({});
  };

  const handleLocationSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.stateName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(23.500 || newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(80.500 || newArray[0]?.position.lng));
    setActiveTotal(dataObject?.totalActiveDevices)
    setTotalNumber(dataObject?.totalDevices)
    setTotalTags(dataObject?.totalTags)
  };

  const fetchBranch = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    FetchBranchService({
      locationId: locationDetails.locationId,
    }, handleBranchSuccess, handleBranchException);
    locationAlerts({ locationId: locationDetails.locationId });
  };

  const handleBranchSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(newArray[0]?.position.lng));
  };

  const handleBranchException = (errorObject) => { };

  const fetchFacility = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    FetchFacilitiyService({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
    }, handleFetchSuccess, handleFetchException);
    locationAlerts({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
    });
  };

  const handleFetchSuccess = (dataObject) => {
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setCenterLatitude(parseFloat(newArray[0]?.position.lat));
    setCenterLongitude(parseFloat(newArray[0]?.position.lng));
  };

  const handleFetchException = (errorObject) => { };

  const fetchBuilding = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    BuildingFetchService({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
    }, handleBuildingSuccess, handleBuildingException);
    locationAlerts({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
    });
  };

  const handleBuildingSuccess = (dataObject) => {

  };

  const handleBuildingException = (errorObject) => { };

  const fetchFloor = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    FloorfetchService({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
      buildingId: locationDetails?.buildingId,

    }, handleFloorSuccess, handleFloorException);
    locationAlerts({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
      buildingId: locationDetails?.buildingId,
    });
  };

  const handleFloorSuccess = (dataObject) => {
  };

  const handleFloorException = (errorObject) => { };

  const fetchLab = () => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    LabfetchService({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
      buildingId: locationDetails?.buildingId,
      floorId: locationDetails?.floorId,
    }, handleLabSuccess, handleLabException);
    locationAlerts({
      locationId: locationDetails?.locationId,
      branchId: locationDetails?.branchId,
      facilityId: locationDetails?.facilityId,
      buildingId: locationDetails?.buildingId,
      floorId: locationDetails?.floorId,
    });
  };

  const handleLabSuccess = (dataObject) => {
  };

  const handleLabException = (errorObject) => { };

  const locationAlerts = (alertLocationDetails) => {
    DeviceIdAlerts(handleSuccessAlerts, handleExceptionAlerts);
  }

  const handleSuccessAlerts = (dataObject) => {
    setAlertList(dataObject.data || []);
  }

  const handleExceptionAlerts = () => { };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <Grid container style={{ height: '94vh', width: '100%', padding: '5px', }}>
      {isdashboard === 0
        && (
          <div style={{ height: '94vh', width: '100%', }}>
            <Grid
              item
              xs={12}
              sx={{
                marginLeft: 1,
              }}
              style={{
                height: '94vh',
                width: '100%',
                marginLeft: '0px'

              }}
            >
              <Grid
                container
                item
                xs={12}
                style={{
                  height: '90vh',
                  width: '100%',
                  overflow: 'auto',
                  padding: '2px',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}

                  sx={{ minHeight: '300px', height: '47vh', padding: '5px' }}
                >
                  {/* <Paper elevation={5} sx={{ width: '100%', height: '100%', padding: '2px', borderRadius: '8px' }}> */}
                  <LocationGridWidget
                    setLocationCoordinationList={setLocationCoordinationList}
                    locationState={locationState}
                    setProgressState={setProgressState}
                    setImg={setImg}
                    setImageState={setImageState}
                    locationDetails={locationDetails}
                    setLocationDetails={setLocationDetails}
                    setDeviceCoordsList={setDeviceCoordsList}
                    setIsDashBoard={setIsDashBoard}
                    setIsGeoMap={setIsGeoMap}
                    siteImages={siteImages}
                    setSiteImages={setSiteImages}
                    setZoomLevel={setZoomLevel}
                    setCenterLatitude={setCenterLatitude}
                    setCenterLongitude={setCenterLongitude}
                    breadCrumbLabels={breadCrumbLabels}
                    setBreadCrumbLabels={setBreadCrumbLabels}
                    setAlertList={setAlertList}
                    locationAlerts={locationAlerts}
                  />
                  {/* </Paper> */}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      '& > :not(style)': {
                        marginLeft: '1%',          // Left margin for child elements
                        marginTop: '3px',         // Top margin for child elements
                        width: '100%',             // Ensures the child elements take up the full width
                        height: '45.5vh',          // Fixed height for the child elements
                        padding: '5px',            // Padding inside each child element
                        boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px',  // Subtle box shadow effect
                        transition: 'box-shadow 0.3s ease',  // Smooth transition for the shadow
                        '&:hover': {
                          boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px',  // Enhanced shadow on hover
                        },
                      },
                    }}
                  >
                    {/* Child components go here */}


                    <Paper elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '6px' }}>
                      <PlantWidget totalTags={totalTags} totalNumber={totalNumber} totalActive={totalActive} locationCoordinationList={locationCoordinationList} locationData={locationDetails} />
                    </Paper>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  sx={{
                    padding: '5px',
                  }}
                >
                  {/* Wrapping the content inside Paper to apply the box-shadow and other styles */}
                  <Paper
                    sx={{
                      height: '46vh',  // Ensure the Paper takes the correct height
                      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 12px',  // Subtle shadow
                      borderRadius: 2,  // MUI shorthand for border-radius
                      // padding: '5px',
                      transition: 'box-shadow 0.3s ease',  // Smooth transition for shadow
                      '&:hover': {
                        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 8px 24px',  // Enhanced shadow on hover
                      },
                    }}
                  >
                    <AlertWidget dataList={alertList} setAlertList={setAlertList} setNotification={setNotification} />
                  </Paper>
                </Grid>


                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                // style={{
                //   height: '47vh', padding: '5px',
                //   boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',

                // }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      '& > :not(style)': {
                        // marginBottom: '3%',
                        marginLeft: "1%",
                        marginTop: '5px',
                        width: '100%',
                        height: "46vh",
                        padding: '5px',
                        // backgroundColor: 'red'
                        transition: 'box-shadow 0.3s ease',  // Smooth transition for shadow
                        '&:hover': {
                          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 4px 10px',  // Enhanced shadow on hover
                        },

                      },
                    }}
                  >
                    <Paper elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '8px' }}>
                      {isGeoMap === true ? <GeoLocationWidget locationCoordination={locationCoordinationList} zoomLevel={zoomLevel} centerLatitude={centerLatitude} centerLongitude={centerLongitude} height="46vh" />
                        : <ImageMarkerList labImage={imgSrc} deviceCoordsList={deviceCoordsList} height="h-46vh min-h-295"
                        />
                      }
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )
      }
      {
        isdashboard === 1
        && (
          <div style={{
            height: '94vh',
            width: '100%'
          }}>
            <LandingPageComponent locationDetails={locationDetails} setIsDashBoard={setIsDashBoard} />
          </div>
        )
      }
      {
        isdashboard === 2
        && (
          <div style={{
            height: '94vh',
            width: '100%',
            overflow: 'auto'
          }}>
            <DeviceGridComponent
              setImg={setImg}
              locationDetails={locationDetails}
              setLocationDetails={setLocationDetails}
              setDeviceCoordsList={setDeviceCoordsList}
              setProgressState={setProgressState}
              breadCrumbLabels={breadCrumbLabels}
              setBreadCrumbLabels={setBreadCrumbLabels}
              setIsDashBoard={setIsDashBoard}
              setIsGeoMap={setIsGeoMap}
              siteImages={siteImages}
              setSiteImages={setSiteImages}
              setCenterLatitude={setCenterLatitude}
              setCenterLongitude={setCenterLongitude}
              locationAlerts={locationAlerts}
            />
          </div>
        )
      }
      {
        isdashboard === 3
        && (
          <div style={{
            height: '94vh',
            width: '100%'
          }}>
            <BuildingMeterPageComponent locationDetails={locationDetails} setIsDashBoard={setIsDashBoard} />
          </div>
        )
      }
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />

    </Grid >
  );
}

export default Dashboard;



