// import { Box, Breadcrumbs, Card, CardContent, CardHeader, Chip, Paper } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { darken, lighten } from '@mui/material/styles';
// import React, { useEffect, useState } from 'react';
// import { FetchLocationService } from '../../../../services/LoginPageService';
// import ApplicationStore from '../../../../utils/localStorageUtil';
// import { setAlertPriorityAndType, setAQIColor, setAQILabel } from '../../../../utils/helperFunctions';
// import { LatestAlertAccess } from '../../../../context/UserAccessProvider';

// /* eslint-disable no-unused-vars */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// /* eslint-disable radix */
// function LocationGridComponent(props) {
//   const {
//     setLocationDetails, setProgressState, setBreadCrumbLabels, setLocationCoordinationList,
//     setZoomLevel, setCenterLatitude, setCenterLongitude, locationAlerts
//   } = props;
//   const [dataList, setDataList] = useState([]);
//   const { locationIdList } = ApplicationStore().getStorage('alertDetails');
//   const [notificationStatus, setNotificationStatus] = useState(locationIdList);
//   const [isLoading, setGridLoading] = useState(true);
//   const { alertStatus, setAlertStatus } = LatestAlertAccess();
//   const columns = [
//     {
//       field: 'locationName',
//       headerName: 'Location Name',
//       minWidth: 200,
//       flex: 1,
//       type: 'actions',
//       getActions: (params) => [
//         <LinkTo selectedRow={params.row} />,
//       ],
//     },
//     {
//       field: 'activeDevicesCount', // Unique field name for the dummy column
//       headerName: 'Active devices',
//       minWidth: 200,
//       flex: 1,
//       renderCell: (params) => {
//         const activeDevicesCount = params.row.activeDevicesCount;
//         return (
//           <Chip sx={{ fontSize: 20, width: 100 }} label={activeDevicesCount} color="primary" />
//         );
//       },
//     },
//     {
//       field: 'inactiveDevicesCount', // Unique field name for the dummy column
//       headerName: 'Inactive devices',
//       minWidth: 200,
//       flex: 1,
//       renderCell: (params) => {
//         const inactiveDevicesCount = params.row.inactiveDevicesCount;
//         return (
//           <Chip sx={{ fontSize: 20, width: 100 }} label={inactiveDevicesCount} color="default" />
//         );
//       },
//     },

//   ];

//   useEffect(() => {
//     setGridLoading(true);
//     FetchLocationService(handleSuccess, handleException);
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');

//     setProgressState((oldValue) => {
//       let newValue = 0;
//       if (locationDetails.zoneId) {
//         newValue = 6;
//         locationAlerts({ zoneId: locationDetails.zoneId });
//       }
//       else if (locationDetails.floorId) {
//         newValue = 5;
//         locationAlerts({ floorId: locationDetails.floorId });
//       }
//       else if (locationDetails.buildingId) {
//         newValue = 4;
//         locationAlerts({ buildingId: locationDetails.buildingId });
//       }
//       else if (locationDetails.facilityId) {
//         newValue = 3;
//         locationAlerts({ facilityId: locationDetails.facilityId });
//       }
//       else if (locationDetails.branchId) {
//         newValue = 2;
//         locationAlerts({ branchId: locationDetails.branchId });
//       }
//       else if (locationDetails.locationId) {
//         newValue = 1;
//         locationAlerts({ locationId: locationDetails.locationId });
//       }
//       else {
//         locationAlerts({});
//       }
//       return newValue;
//     });
//   }, []);

//   function LinkTo({ selectedRow }) {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     return (
//       <h3
//         style={{ cursor: 'pointer' }}
//         onClick={() => {
//           locationAlerts({ locationId: selectedRow.id });
//           setLocationDetails((oldValue) => {
//             return { ...oldValue, locationId: selectedRow.id };
//           });

//           setBreadCrumbLabels((oldvalue) => {
//             return { ...oldvalue, stateLabel: selectedRow.locationName };
//           });
//           setProgressState(1);
//           const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
//           setCenterLatitude(parseFloat(coordList[0]));
//           setCenterLongitude(parseFloat(coordList[1]));
//         }}
//       >
//         {selectedRow.locationName}
//       </h3>
//     );
//   }
//   const handleSuccess = (dataObject) => {
//     setGridLoading(false);
//     setDataList(dataObject.data);
//     const newArray = dataObject.data ? dataObject.data.map((item) => {
//       const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
//       return {
//         id: item.id,
//         name: item.locationName,
//         position: {
//           lat: parseFloat(coordinates[0]),
//           lng: parseFloat(coordinates[1]),
//         },
//       };
//     })
//       : [];
//     setLocationCoordinationList(newArray);
//     setZoomLevel(4);
//   };

//   const handleException = (errorObject) => {
//   };

//   const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.1));

//   const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.1));

//   return (
//     <Card className={'h-[42vh] xl:h-[45vh] lg:h-[48vh]'}
//       sx={{
//         boxShadow: 'none',
//         borderRadius: '12px',
//         // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
//         boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',

//         padding: '10px'
//       }}
//     >
//       <Paper elevation={3} className={'h-full'} style={{ boxShadow: 'none' }}>
//         <CardHeader
//           title={
//             <Breadcrumbs aria-label="breadcrumb" separator="›" fontSize='20px' fontWeight='700' >
//               <h3 className='font-[Roboto, sans-serif] font-semibold tracking-[1px] p-1 text-black text-[18px]'>
//                 Location
//               </h3>
//             </Breadcrumbs>
//           }
//           sx={{ paddingBottom: 0 }}
//         />
//         {/* <Box
//         sx={{
//           height: 400,
//           '& .super-app-theme--red': {
//             color: 'maroon',
//             bgcolor: (theme) => getBackgroundColor('#FAE8FA', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor('#FAE8FA', theme.palette.mode),
//             },
//             ':hover': { backgroundColor: '#FAE8FA' },
//           },
//           '& .super-app-theme--orange': {
//             color: 'purple',
//             bgcolor: (theme) => getBackgroundColor('#9fa8da', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor(
//                 '#9fa8da',
//                 theme.palette.mode,
//               ),
//             },
//           },
//           '& .super-app-theme--disabled': {
//             bgcolor: (theme) => getBackgroundColor('#ffcdd2', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor(
//                 '#ffcdd2',
//                 theme.palette.mode,
//               ),
//             },
//           },
//           '& .super-app-theme--enabled': {
//             bgcolor: (theme) => getBackgroundColor('#A5D6A7', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor(
//                 '#A5D6A7',
//                 theme.palette.mode,
//               ),
//             },
//           },
//           '& .super-app-theme--outOfRange': {
//             color: 'darkgoldenrod',
//             bgcolor: (theme) => getBackgroundColor('#FFFCE3', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor('#FFFCE3', theme.palette.mode),
//             },
//           },
//           '& .super-app-theme--green': {
//             color: 'green',
//             bgcolor: (theme) => getBackgroundColor('#F2FFF2', theme.palette.mode),
//             '&:hover': {
//               bgcolor: (theme) => getHoverBackgroundColor('#F2FFF2', theme.palette.mode),
//             },
//           },
//           }}
//       > */}
//         <CardContent className={'h-[81%] sm:h-[100%]'} style={{ fontFamily: 'customfont' }} >

//           <DataGrid
//             rows={dataList}
//             columns={columns}
//             loading={isLoading}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             disableSelectionOnClick
//             style={{ maxHeight: `${90}%`, }}
//             sx={{
//               border: 'none',
//             }}
//           // style={{ maxHeight: '93%', overflowx: 'scroll' }}
//           // getCellClassName={(params) => {
//           //   let element = {
//           //     alertLabel: 'Good',
//           //     alertColor: 'green',
//           //     alertPriority: 4,
//           //   };
//           //   const alertObject = notificationStatus?.filter((alert) => {
//           //     return params.row.id === parseInt(alert.id);
//           //   });

//           //   alertObject?.map((data) => {
//           //     element = setAlertPriorityAndType(element, data);
//           //   });
//           //   if (params.field === 'id') {
//           //     return `super-app-theme--${element.alertColor}`;
//           //   }
//           // }}
//           />
//           {/* </Box> */}
//         </CardContent>

//       </Paper>
//     </Card>
//   );
// }

// export default LocationGridComponent;
import { Box, Breadcrumbs, Card, CardContent, CardHeader, Chip, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { FetchLocationService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';
import { LatestAlertAccess } from '../../../../context/UserAccessProvider';

/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function LocationGridComponent(props) {
  const {
    setIsDashBoard,
    setLocationDetails, setProgressState, setBreadCrumbLabels, setLocationCoordinationList,
    setZoomLevel, setCenterLatitude, setCenterLongitude, locationAlerts
  } = props;
  const [dataList, setDataList] = useState([]);
  const { locationIdList } = ApplicationStore().getStorage('alertDetails');
  const [notificationStatus, setNotificationStatus] = useState(locationIdList);
  const [isLoading, setGridLoading] = useState(true);
  const { alertStatus, setAlertStatus } = LatestAlertAccess();

  const columns = [
    {
      field: 'locationName',
      headerName: 'Location Name',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      // Remove the actions here to make it a simple cell
    },
    {
      field: 'activeDevicesCount',
      headerName: 'Active devices',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={params.row.activeDevicesCount} color="primary" />
      ),
    },
    {
      field: 'inactiveDevicesCount',
      headerName: 'Inactive devices',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => (
        <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={params.row.inactiveDevicesCount} color="default" />
      ),
    },
  ];

  useEffect(() => {
    setGridLoading(true);
    FetchLocationService(handleSuccess, handleException);
    const { locationDetails } = ApplicationStore().getStorage('userDetails');

    setProgressState((oldValue) => {
      let newValue = 0;
      if (locationDetails.zoneId) {
        newValue = 6;
        locationAlerts({ zoneId: locationDetails.zoneId });
      } else if (locationDetails.floorId) {
        newValue = 5;
        locationAlerts({ floorId: locationDetails.floorId });
      } else if (locationDetails.buildingId) {
        newValue = 4;
        locationAlerts({ buildingId: locationDetails.buildingId });
      } else if (locationDetails.facilityId) {
        newValue = 3;
        locationAlerts({ facilityId: locationDetails.facilityId });
      } else if (locationDetails.branchId) {
        newValue = 2;
        locationAlerts({ branchId: locationDetails.branchId });
      } else if (locationDetails.locationId) {
        newValue = 1;
        locationAlerts({ locationId: locationDetails.locationId });
      } else {
        locationAlerts({});
      }
      return newValue;
    });
  }, []);

  const handleRowClick = (params) => {
    const selectedRow = params.row;
    locationAlerts({ locationId: selectedRow.id });
    setLocationDetails((oldValue) => ({
      ...oldValue,
      locationId: selectedRow.id,
    }));

    setBreadCrumbLabels((oldValue) => ({
      ...oldValue,
      stateLabel: selectedRow.locationName,
    }));
    // setProgressState(1);
    setIsDashBoard(2);

    const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
    setCenterLatitude(parseFloat(coordList[0]));
    setCenterLongitude(parseFloat(coordList[1]));
  };

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.locationName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    }) : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(4);
  };

  const handleException = (errorObject) => {
    // Handle exceptions here
  };

  return (
    <Card
      sx={{
        height: {
          xs: '45vh',  // Extra small screens
          sm: '48vh',  // Small screens
          md: '45vh',  // Medium screens
          lg: '45vh',  // Large screens
          xl: '45vh',  // Extra-large screens
        },
        boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px',  // Subtle shadow effect
        borderRadius: 2,      // MUI shorthand for 16px
        // p: 2,                 // MUI shorthand for padding 16px
        transition: 'box-shadow 0.3s ease-in-out',  // Smooth shadow transition
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px',  // Enhanced shadow effect on hover
        },
      }}
    >
      <Paper elevation={3} sx={{ height: '100%', boxShadow: 'none' }}>
        <CardHeader
          title={
            <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ fontSize: '20px', }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  color: 'black',
                  fontSize: '18px',
                }}
              >
                Location
              </Typography>
            </Breadcrumbs>
          }
          sx={{ paddingBottom: 0 }}
        />
        <CardContent
          style={{ height: '50vh' }}
          sx={{
            fontFamily: 'customfont',
            height: { xs: '81%', sm: '100%' },
            display: 'flex',
            flexDirection: 'column',
            // padding: '16px',
            marginTop: "-10px"
          }}
        >          <DataGrid
            rows={dataList}
            columns={columns}
            loading={isLoading}
            pageSize={5}
            rowHeight={38}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            style={{ maxHeight: `${90}%` }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                cursor: 'pointer',
              },
            }}
            onRowClick={handleRowClick}  // Add this line for handling row clicks
          />
        </CardContent>
      </Paper>
    </Card>
  );
}

export default LocationGridComponent;
