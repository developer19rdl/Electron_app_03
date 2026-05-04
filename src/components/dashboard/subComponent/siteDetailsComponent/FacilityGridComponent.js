import { Breadcrumbs, Card, CardContent, Chip, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FetchFacilitiyService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType, setAQIColor, setAQILabel } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */

function FacilityGridComponent(props) {
  const { setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
    setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList,
    setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList, locationAlerts
  } = props;
  const { facilityIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);
  const facilityColumns = [
    {
      field: 'facilityName',
      headerName: 'Facility Name',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'activeDevicesCount',
      headerName: 'Active devices',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
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

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setGridLoading(true);
    FetchFacilitiyService({
      locationId: props.locationDetails.locationId,
      branchId: props.locationDetails.branchId,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject?.data || []);
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
    setLocationCoordinationList(newArray);
    setZoomLevel(9);
  };

  const handleException = () => { };

  // function LinkTo({ selectedRow }) {
  //   return (
  //     <h3
  //       style={{ cursor: 'pointer' }}
  //       onClick={() => {
  //         locationAlerts({ facilityId: selectedRow.id });
  //         setLocationDetails((oldValue) => {
  //           return { ...oldValue, facilityId: selectedRow.id };
  //         });

  //         setBreadCrumbLabels((oldvalue) => {
  //           return { ...oldvalue, facilityLabel: selectedRow.facilityName };
  //         });

  //         setProgressState(3);
  //         const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
  //         // setCenterLatitude(parseFloat(coordList[0]));
  //         // setCenterLongitude(parseFloat(coordList[1]));
  //         setCenterLatitude('');
  //         setCenterLongitude('');
  //       }}
  //     >
  //       {selectedRow.facilityName}
  //     </h3>
  //   );
  // }
  const handleRowClick = (params) => {
    const selectedRow = params.row;

    // Call locationAlerts and setLocationDetails with selected row data
    locationAlerts({ facilityId: selectedRow.id });
    setLocationDetails((oldValue) => ({
      ...oldValue,
      facilityId: selectedRow.id,
    }));

    setBreadCrumbLabels((oldValue) => ({
      ...oldValue,
      facilityLabel: selectedRow.facilityName,
    }));

    setProgressState(3);
    const coordList = selectedRow.coordinates.replaceAll('"', '').split(',') || [];
    setCenterLatitude('');
    setCenterLongitude('');
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
      } else {
        // locationAlerts({});
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
          xl: '45.4vh',
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
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

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
              // setCenterLatitude(23.500);
              // setCenterLongitude(80.000);
              setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            Location
          </h3>
          <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

            onClick={() => {
              const { locationDetails } = ApplicationStore().getStorage('userDetails');
              let value = 1;
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
              } else {
                locationAlerts({ locationId: locationDetails.locationId || props.locationDetails.locationId });
                value = 1;
              }
              setLocationlabel(value);
              setDeviceCoordsList([]);
              setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.stateLabel}
          </h3>
          {/* <Typography
            underline="hover"
            color="inherit"
          >
            {breadCrumbLabels.branchLabel}
          </Typography> */}
          <h3 className="font-roboto font-semibold tracking-wider p-1 text-black text-sm cursor-pointer">
            {breadCrumbLabels.branchLabel}
          </h3>
        </Breadcrumbs>
        <CardContent
          style={{ height: '48vh' }}
          sx={{
            fontFamily: 'customfont',
            height: { xs: '81%', sm: '100%' }, // Responsive height setting
            display: 'flex',
            flexDirection: 'column',
            // padding: '16px',
            marginTop: '-10px'

          }}
        >
          <DataGrid
            rows={dataList}
            columns={facilityColumns}
            loading={isLoading}
            pageSize={5}
            rowHeight={38}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            onRowClick={handleRowClick} // Set the onRowClick handler here
            style={{ maxHeight: `${93}%` }}
            sx={{
              border: 'none',
            }}
          />
        </CardContent>

      </Paper>
    </Card>
  );
}

export default FacilityGridComponent;
