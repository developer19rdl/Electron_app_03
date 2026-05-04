import { Breadcrumbs, Card, CardContent, Chip, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { LabfetchService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType, setAQIColor, setAQILabel } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
function LabGridComponent(props) {
  const {
    setImg, setLocationDetails, setProgressState, breadCrumbLabels,
    setBreadCrumbLabels, setIsGeoMap, setDeviceCoordsList, siteImages, setSiteImages, setIsDashBoard, setAlertList,
    locationAlerts
  } = props;
  const { labIdList } = ApplicationStore().getStorage('alertDetails');
  const { locationDetails } = ApplicationStore().getStorage('userDetails');

  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const dataColumns = [
    {
      field: 'zoneName',
      headerName: 'Zone Name',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'activeDevicesCount',
      headerName: 'Active devices',
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={params.row.activeDevicesCount} color="primary" />
      ),
    },
    {
      field: 'inactiveDevicesCount',
      headerName: 'Inactive devices',
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Chip sx={{ fontSize: 14, width: 60, height: 28 }} label={params.row.inactiveDevicesCount} color="default" />
      ),
    },
    // Other columns can go here
  ];
  useEffect(() => {
    setGridLoading(true);
    setDeviceCoordsList([]);
    // const { locationDetails } = ApplicationStore().getStorage('userDetails');
    // if(locationDetails?.floorMap !== ''){
    //   setImg(locationDetails?.floorMap);
    // }

    LabfetchService({
      locationId: props.locationDetails.locationId,
      branchId: props.locationDetails.branchId,
      facilityId: props.locationDetails.facilityId,
      buildingId: props.locationDetails.buildingId,
      floorId: props.locationDetails.floorId,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    setImg(dataObject.floorMap);
  };

  const handleException = () => {
  };

  const handleRowClick = (params) => {
    const selectedRow = params.row;

    // Trigger actions similar to LinkTo component
    locationAlerts({ zoneId: selectedRow.id });
    setLocationDetails((oldValue) => ({
      ...oldValue,
      zoneId: selectedRow.id,
    }));

    setBreadCrumbLabels((oldValue) => ({
      ...oldValue,
      labLabel: selectedRow.zoneName,
    }));

    setIsDashBoard(2);
    setImg(selectedRow.zoneMap);
    setSiteImages((oldValue) => ({
      ...oldValue,
      zoneMap: selectedRow.zoneMap,
    }));
  };

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState((oldValue) => {
      setDeviceCoordsList([]);
      let newValue = value;
      if (locationDetails.zoneId) {
        newValue = value < 7 ? 6 : value;
        value >= 4 ? setIsGeoMap(false) : setIsGeoMap(true);
      } else if (locationDetails.floorId) {
        newValue = value < 6 ? 5 : value;
        value >= 4 ? setIsGeoMap(false) : setIsGeoMap(true);
      } else if (locationDetails.buildingId) {
        newValue = value < 5 ? 4 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
      } else if (locationDetails.facilityId) {
        newValue = value < 4 ? 3 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
      } else if (locationDetails.branchId) {
        newValue = value < 3 ? 2 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
      } else if (locationDetails.locationId) {
        newValue = value < 2 ? 1 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
      } else {
        // locationAlerts({});
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
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
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 4px 12px',  // Subtle shadow
        borderRadius: 2,      // MUI shorthand for 16px border-radius
        padding: 2,           // MUI shorthand for 16px padding
        transition: 'box-shadow 0.3s ease',  // Smooth transition for shadow
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 8px 24px',  // Enhanced shadow on hover
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
                setImg(locationDetails?.buildingImg);
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
              // setIsGeoMap(true);
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
              // setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.stateLabel}
          </h3>
          <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

            onClick={() => {
              const { locationDetails } = ApplicationStore().getStorage('userDetails');
              let value = 2;
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
              } else {
                locationAlerts({ branchId: locationDetails.branchId || props.locationDetails.branchId });
                value = 2;
              }
              setLocationlabel(value);
              setDeviceCoordsList([]);
              // setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.branchLabel}
          </h3>
          <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

            onClick={() => {
              const { locationDetails } = ApplicationStore().getStorage('userDetails');
              let value = 3;
              // locationAlerts({facilityId: locationDetails.facilityId || props.locationDetails.facilityId});
              if (locationDetails.zoneId) {
                locationAlerts({ zoneId: locationDetails.zoneId || props.locationDetails.zoneId });
                value = 6;
              } else if (locationDetails.floorId) {
                locationAlerts({ floorId: locationDetails.floorId || props.locationDetails.floorId });
                value = 5;
              } else if (locationDetails.buildingId) {
                locationAlerts({ buildingId: locationDetails.buildingId || props.locationDetails.buildingId });
                value = 4;
              } else {
                locationAlerts({ facilityId: locationDetails.facilityId || props.locationDetails.facilityId });
                value = 3;
              }
              setLocationlabel(value);
              setDeviceCoordsList([]);
              // setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.facilityLabel}
          </h3>
          <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

            onClick={() => {
              const { locationDetails } = ApplicationStore().getStorage('userDetails');
              let value = 4;
              // locationAlerts({buildingId: locationDetails.buildingId || props.locationDetails.buildingId});
              if (locationDetails.zoneId) {
                locationAlerts({ zoneId: locationDetails.zoneId || props.locationDetails.zoneId });
                value = 6;
              } else if (locationDetails.floorId) {
                locationAlerts({ floorId: locationDetails.floorId || props.locationDetails.floorId });
                value = 5;
              } else {
                locationAlerts({ buildingId: locationDetails.buildingId || props.locationDetails.buildingId });
                value = 4;
              }
              setLocationlabel(value);
              setDeviceCoordsList([]);
              // setImg(siteImages.buildingImage);
              // setIsGeoMap(false);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.buildingLabel}
          </h3>
          <h3 className="font-roboto font-semibold tracking-wider p-1 text-black text-sm cursor-pointer">
            {breadCrumbLabels.floorLabel}
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
        >             <DataGrid
            rows={dataList}
            columns={dataColumns}
            loading={isLoading}
            pageSize={5}
            rowHeight={38}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            style={{ maxHeight: `${93}%` }}
            sx={{
              border: 'none',
            }}
            onRowClick={handleRowClick} // Add this line to make rows clickable
          // Other DataGrid props can go here
          />
        </CardContent>

      </Paper>
    </Card>
  );
}

export default LabGridComponent;
