// import { Breadcrumbs, Card, CardContent, Chip, Paper, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import React, { useEffect, useState } from 'react';
// import { FetchBranchService } from '../../../../services/LoginPageService';
// import { setAlertPriorityAndType, setAQIColor, setAQILabel } from '../../../../utils/helperFunctions';
// import ApplicationStore from '../../../../utils/localStorageUtil';

// /* eslint-disable no-unused-vars */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// /* eslint-disable radix */
// /* eslint-disable array-callback-return */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable no-shadow */

// function BranchGridComponent(props) {
//   const {
//     setLocationDetails, setProgressState, breadCrumbLabels,
//     setBreadCrumbLabels, setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
//     setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList,
//     locationAlerts
//   } = props;
//   const [dataList, setDataList] = useState([]);
//   const { branchIdList } = ApplicationStore().getStorage('alertDetails');
//   const [isLoading, setGridLoading] = useState(true);
//   const branchColumns = [
//     {
//       field: 'branchName',
//       headerName: 'Branch Name',
//       minWidth: 200,
//       flex: 1,
//       align: 'center',
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
//     FetchBranchService({
//       locationId: props.locationDetails.locationId,
//     }, handleSuccess, handleException);
//   }, [props.locationDetails]);

//   const handleSuccess = (dataObject) => {
//     setGridLoading(false);
//     setDataList(dataObject.data);
//     setProgressState(1);
//     const newArray = dataObject.data ? dataObject.data.map((item) => {
//       const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
//       return {
//         id: item.id,
//         name: item.branchName,
//         position: {
//           lat: parseFloat(coordinates[0]),
//           lng: parseFloat(coordinates[1]),
//         },
//       };
//     })
//       : [];
//     setLocationCoordinationList(newArray);
//     setZoomLevel(6);
//   };

//   const handleException = (errorObject) => {
//   };

//   function LinkTo({ selectedRow }) {
//     return (
//       <h3
//         style={{ cursor: 'pointer' }}
//         onClick={(e) => {
//           locationAlerts({ branchId: selectedRow.id });
//           setLocationDetails((oldValue) => {
//             return { ...oldValue, branchId: selectedRow.id };
//           });
//           setBreadCrumbLabels((oldvalue) => {
//             return { ...oldvalue, branchLabel: selectedRow.branchName };
//           });
//           setProgressState(2);
//           const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
//           setCenterLatitude(parseFloat(coordList[0]));
//           setCenterLongitude(parseFloat(coordList[1]));
//         }}
//       >
//         {selectedRow.branchName}
//       </h3>
//     );
//   }

//   const setLocationlabel = (value) => {
//     const { locationDetails } = ApplicationStore().getStorage('userDetails');
//     setProgressState((oldValue) => {
//       let newValue = value;
//       if (locationDetails.zoneId) {
//         newValue = value < 7 ? 6 : value;
//       } else if (locationDetails.floorId) {
//         newValue = value < 6 ? 5 : value;
//       } else if (locationDetails.buildingId) {
//         newValue = value < 5 ? 4 : value;
//       } else if (locationDetails.facilityId) {
//         newValue = value < 4 ? 3 : value;
//       } else if (locationDetails.branchId) {
//         newValue = value < 3 ? 2 : value;
//       } else if (locationDetails.locationId) {
//         newValue = value < 2 ? 1 : value;
//       } else {
//         // locationAlerts({});
//       }
//       return newValue;
//     });
//   };


//   return (
//     <Card className={'h-[42vh] xl:h-[45vh] lg:h-[48vh]'}
//       sx={{
//         boxShadow: 'none',
//         borderRadius: '12px',
//         // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
//         boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',

//         padding: '10px'
//       }}>
//       <Paper elevation={3} className={'h-full'} style={{ boxShadow: 'none' }}>

//         <Breadcrumbs aaria-label="breadcrumb" separator="›" fontSize='20px' fontWeight='700'>
//           <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'
//             onClick={() => {
//               const { locationDetails } = ApplicationStore().getStorage('userDetails');
//               let value = 0;
//               if (locationDetails.zoneId) {
//                 locationAlerts({ zoneId: locationDetails.zoneId || props.locationDetails.zoneId });
//                 value = 6;
//               } else if (locationDetails.floorId) {
//                 locationAlerts({ floorId: locationDetails.floorId || props.locationDetails.floorId });
//                 value = 5;
//               } else if (locationDetails.buildingId) {
//                 locationAlerts({ buildingId: locationDetails.buildingId || props.locationDetails.buildingId });
//                 value = 4;
//               } else if (locationDetails.facilityId) {
//                 locationAlerts({ facilityId: locationDetails.facilityId || props.locationDetails.facilityId });
//                 value = 3;
//               } else if (locationDetails.branchId) {
//                 locationAlerts({ branchId: locationDetails.branchId || props.locationDetails.branchId });
//                 value = 2;
//               } else if (locationDetails.locationId) {
//                 locationAlerts({ locationId: locationDetails.locationId || props.locationDetails.locationId });
//                 value = 1;
//               } else {
//                 locationAlerts({});
//                 value = 0;
//               }
//               setLocationlabel(value);
//               setDeviceCoordsList([]);
//               setIsGeoMap(true);
//             }}
//           >
//             Location
//           </h3>
//           <Typography
//             underline="hover"
//             color="inherit"
//           >
//             {breadCrumbLabels.stateLabel}
//           </Typography>
//         </Breadcrumbs>
//         <CardContent className={'h-[81%] sm:h-[100%]'} style={{ fontFamily: 'customfont' }} >
//           <DataGrid
//             rows={dataList}
//             columns={branchColumns}
//             loading={isLoading}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             disableSelectionOnClick
//             style={{ maxHeight: `${90}%`, }}
//             sx={{
//               border: 'none',
//             }}
//           />
//         </CardContent>

//       </Paper>
//     </Card>
//   );
// }

// export default BranchGridComponent;

import { Breadcrumbs, Card, CardContent, Chip, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchBranchService } from '../../../../services/LoginPageService';
import ApplicationStore from '../../../../utils/localStorageUtil';

function BranchGridComponent(props) {
  const {
    setLocationDetails, setProgressState, breadCrumbLabels,
    setBreadCrumbLabels, setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
    setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList,
    locationAlerts
  } = props;

  const [dataList, setDataList] = useState([]);
  const { branchIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);

  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <h3 style={{ cursor: 'pointer' }}>
            {params.row.branchName}
          </h3>
        );
      },
    },
    {
      field: 'activeDevicesCount',
      headerName: 'Active devices',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        const activeDevicesCount = params.row.activeDevicesCount;
        return (
          <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={activeDevicesCount} color="primary" />
        );
      },
    },
    {
      field: 'inactiveDevicesCount',
      headerName: 'Inactive devices',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        const inactiveDevicesCount = params.row.inactiveDevicesCount;
        return (
          <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={inactiveDevicesCount} color="default" />
        );
      },
    },
  ];

  useEffect(() => {
    setGridLoading(true);
    FetchBranchService({
      locationId: props.locationDetails.locationId,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    setProgressState(1);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.branchName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    }) : [];

    setLocationCoordinationList(newArray);
    setZoomLevel(6);
  };

  const handleException = (errorObject) => {
    // Handle exceptions as needed
    console.error(errorObject);
  };

  // This function is triggered when a row is clicked
  const handleRowClick = (params) => {
    const selectedRow = params.row;
    locationAlerts({ branchId: selectedRow.id }); // Trigger location alerts
    setLocationDetails((oldValue) => ({
      ...oldValue,
      branchId: selectedRow.id, // Update branchId
    }));
    setBreadCrumbLabels((oldvalue) => ({
      ...oldvalue,
      branchLabel: selectedRow.branchName, // Update breadcrumb labels
    }));
    setProgressState(2); // Update progress state

    // Ensure coordinates are set correctly
    const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
    if (coordList.length >= 2) { // Ensure there are enough coordinates
      setCenterLatitude(parseFloat(coordList[0])); // Set latitude
      setCenterLongitude(parseFloat(coordList[1])); // Set longitude
    }
  };

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState((oldValue) => {
      let newValue = value;
      if (locationDetails.zoneId) {
        newValue = value < 7 ? 6 : value;
      } else if (locationDetails.floorId) {
        newValue = value < 6 ? 5 : value;
      } else if (locationDetails.buildingId) {
        newValue = value < 5 ? 4 : value;
      } else if (locationDetails.facilityId) {
        newValue = value < 4 ? 3 : value;
      } else if (locationDetails.branchId) {
        newValue = value < 3 ? 2 : value;
      } else if (locationDetails.locationId) {
        newValue = value < 2 ? 1 : value;
      }
      return newValue;
    });
  };

  return (
    <Card
      sx={{
        height: {
          xs: '42vh',  // Extra small screens
          sm: '48vh',  // Small screens
          md: '45vh',  // Medium screens
          lg: '45vh',  // Large screens
          xl: '45.4vh',  // Extra-large screens
        },
        boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px',  // Subtle shadow effect
        borderRadius: 2,      // MUI shorthand for 16px
        p: 2,                 // MUI shorthand for padding 16px
        transition: 'box-shadow 0.3s ease-in-out',  // Smooth shadow transition
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px',  // Enhanced shadow effect on hover
        },
      }}
    >
      <Paper elevation={3} sx={{ height: '100%', boxShadow: 'none' }}>
        <Breadcrumbs aria-label="breadcrumb" separator="›" fontSize='20px' fontWeight='700'>
          <h3 className="font-roboto font-semibold tracking-wider p-1 text-black text-sm cursor-pointer"
            onClick={() => {
              const { locationDetails } = ApplicationStore().getStorage('userDetails');
              let value = 0;
              if (locationDetails.zoneId) {
                locationAlerts({ zoneId: locationDetails.zoneId || props.locationDetails.zoneId });
                value = 6;
              } else if (locationDetails.floorId) {
                locationAlerts({ floorId: locationDetails.floorId || props.locationDetails.floorId });
                value = 5;
              } else if (locationDetails.buildingId) {
                locationAlerts({ buildingId: locationDetails.buildingId || props.locationDetails.buildingId });
                value = 4;
              } else if (locationDetails.facilityId) {
                locationAlerts({ facilityId: locationDetails.facilityId || props.locationDetails.facilityId });
                value = 3;
              } else if (locationDetails.branchId) {
                locationAlerts({ branchId: locationDetails.branchId || props.locationDetails.branchId });
                value = 2;
              } else if (locationDetails.locationId) {
                locationAlerts({ locationId: locationDetails.locationId || props.locationDetails.locationId });
                value = 1;
              } else {
                locationAlerts({});
                value = 0;
              }
              setLocationlabel(value);
              setDeviceCoordsList([]);
              setIsGeoMap(true);
            }}
          >
            Location
          </h3>
          {/* <Typography underline="hover" color="inherit">
            {breadCrumbLabels.stateLabel}
          </Typography> */}
          <h3 className="font-roboto font-semibold tracking-wider p-1 text-black text-sm cursor-pointer">
            {breadCrumbLabels.stateLabel}
          </h3>
        </Breadcrumbs>
        <CardContent
          style={{ height: '50vh' }}
          sx={{
            fontFamily: 'customfont',
            height: { xs: '81%', sm: '100%' }, // Responsive height setting
            display: 'flex',
            flexDirection: 'column',
            // padding: '16px',
            marginTop: "-12px"

          }}
        >         <DataGrid
            rows={dataList}
            columns={branchColumns}
            loading={isLoading}
            pageSize={5}
            rowHeight={38}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            style={{ maxHeight: `${90}%` }}
            sx={{ border: 'none' }}
            onRowClick={handleRowClick} // Make rows clickable
          />
        </CardContent>
      </Paper>
    </Card >
  );
}

export default BranchGridComponent;
