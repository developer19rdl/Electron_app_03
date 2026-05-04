import { Breadcrumbs, Card, CardContent, Chip, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { BuildingFetchService } from '../../../../services/LoginPageService';
import GridViewIcon from '@mui/icons-material/GridView';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
function BuildingGridComponent(props) {
  const {
    setImg, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
    setLocationCoordinationList, setIsGeoMap, setDeviceCoordsList, siteImages, setSiteImages,
    setZoomLevel, setCenterLatitude, setCenterLongitude, setAlertList, locationAlerts, setIsDashBoard
  } = props;
  const { buildingIdList } = ApplicationStore().getStorage('alertDetails');
  const [isLoading, setGridLoading] = useState(true);
  const dataColumns = [
    {
      field: 'buildingName',
      headerName: 'Building Name',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => (
        <Typography style={{ cursor: 'pointer' }}>
          {params.row.buildingName}
        </Typography>
      ),
    },
    {
      field: 'activeDevicesCount', // Unique field name for the dummy column
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
      field: 'inactiveDevicesCount', // Unique field name for the dummy column
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => [
        <LinkToBuIldingMeter sx={{ fontSize: 14, width: 80, height: 28 }} selectedRow={params.row} />,
      ],
    },

  ];
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setGridLoading(true);
    BuildingFetchService({
      locationId: props.locationDetails.locationId,
      branchId: props.locationDetails.branchId,
      facilityId: props.locationDetails.facilityId,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.buildingName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
    setZoomLevel(17);
  };

  const handleException = (errorObject) => {
  };
  const handleRowClick = (params) => {
    const selectedRow = params.row;
    locationAlerts({ buildingId: selectedRow.id });
    setLocationDetails((oldValue) => ({ ...oldValue, buildingId: selectedRow.id }));
    setIsGeoMap(false);
    setBreadCrumbLabels((oldValue) => ({ ...oldValue, buildingLabel: selectedRow.buildingName }));
    setProgressState(4);
    setImg(selectedRow.buildingImg);
    setSiteImages((oldValue) => ({ ...oldValue, buildingImg: selectedRow.buildingImg }));
  };


  function LinkToBuIldingMeter({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          // locationAlerts({ buildingId: selectedRow.id });
          setLocationDetails((oldValue) => {
            return { ...oldValue, buildingId: selectedRow.id };
          });
          // setIsGeoMap(false);
          // setBreadCrumbLabels((oldvalue) => {
          //   return { ...oldvalue, buildingLabel: selectedRow.buildingName };
          // });
          setIsDashBoard(3);

          // setProgressState(4);
          // console.log("building", selectedRow.buildingImg)
          // setImg(selectedRow.buildingImg);
          // setSiteImages((oldValue) => {
          //   return { ...oldValue, buildingImg: selectedRow.buildingImg };
          // });
        }}
      >
        {/* {selectedRow.buildingName} */}
        <GridViewIcon />
      </h3>
    );
  }








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
              setIsGeoMap(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            {breadCrumbLabels.branchLabel}
          </h3>

          <h3 className="font-roboto font-semibold tracking-wider p-1 text-black text-sm cursor-pointer">
            {breadCrumbLabels.facilityLabel}
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
            columns={dataColumns}
            loading={isLoading}
            pageSize={5}
            rowHeight={38}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            onRowClick={handleRowClick}
            style={{ maxHeight: '93%' }}
            sx={{ border: 'none' }}
          />
        </CardContent>

      </Paper>
    </Card>
  );
}

export default BuildingGridComponent;
