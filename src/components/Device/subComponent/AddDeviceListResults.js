import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import {
  Box, CircularProgress, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Grid,
} from '@mui/material';
import {
  GppMaybe, PlayArrow, PlayDisabled, Science, Upgrade,
} from '@mui/icons-material';
import { darken, lighten } from '@mui/material/styles';
import DeviceModel from './DeviceModelComponent';
import {
  DeviceDeleteService, DeviceFetchService, CategoryFetchService, SensorDeployFetchService, ChangeDeviceMode, deviceDeployedSensors, BumpTestEnabledSensors, SearchDevicesFetchService,
} from '../../../services/LoginPageService';
import SensorModel from './SensorModelComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import BumpTestComponentModal from './BumpTestComponentModal';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import ImageMarkerList from './imageMarkerList';
import DeviceModeModal from './DeviceModeModal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function AddDeviceListResults(props) {

  const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = props;

  // const { zoneId } = props;
  const [showImageMarkerList, setShowImageMarkerList] = useState(false);



  useEffect(() => {
    if (zoneId) {
      setShowImageMarkerList(true);
    } else {
      setShowImageMarkerList(false);
    }
  }, [zoneId]);

  const columns = [
    {
      field: 'deviceName',
      headerName: 'Device Name',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'deviceCategoryName',
      headerName: 'Device Category',
      minWidth: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'deviceTag',
      headerName: 'Device Tag',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      align: 'center',
      minWidth: 150,
      headerAlign: 'center'
    },

    {
      field: 'firmwareVersion',
      headerName: 'Firm Ware',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'hardwareVersion',
      headerName: 'H/W Model No.',
      sortable: false,
      minWidth: 120,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      flex: 1,
      align: 'center',
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
        <SensorsData selectedRow={params.row} />,
        // <AppSettingsAltIconData selectedRow={params.row} />,
      ],
    },
  ];
  const [showImageMarker, setShowImageMarker] = useState(false);

  const [progressStatus, setProgressStatus] = useState(3);
  const [device_id, setDeviceId] = useState('0');
  const [calibratingDeviceId, setCalibratingDeviceId] = useState('');
  const [sensorRefresh, setSensorRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deployedSensorTagList, setDeployedSensorTagList] = useState([]);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editDevice, setEditDevice] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [categoryList, setCategoryList] = useState('');
  const [isLoading, setGridLoading] = useState(true);
  const [sensorOpen, setSensorOpen] = useState(false);
  const [changeDeviceId, setChangeDeviceId] = useState('');
  const [changeDeviceIdMode, setChangeDeviceIdMode] = useState('');
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [digitalSensorList, setDigitalSensorList] = useState([]);
  const [modbusSensorList, setModbusSensorList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [deviceModeHeader, setDeviceModeHeader] = useState('');
  const [deviceModeSubHeader, setDeviceModeSubHeader] = useState('');
  const moduleAccess = useUserAccess()('devicelocation');
  const [deviceCoordsList, setDeviceCoordsList] = useState([]);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleCloseDialog = () => {
    setShowImageMarker(false);
  };

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDeviceList(dataObject?.data || []);
    const deviceCoordinationsList = dataObject.data.map((data) => {
      const coordination = data.floorCords;
      const arrayList = coordination?.split(',');
      return arrayList && { top: arrayList[0], left: arrayList[1] };
    });
    const filteredArray = deviceCoordinationsList.filter((x) => x != null);
    setDeviceCoordsList(filteredArray || []);
    // setRefreshData((oldvalue) => !oldvalue);

  };

  const handleException = () => {
  };

  // useEffect(() => {
  //   DeviceFetchService({ ...props.locationDetails }, handleSuccess, handleException);
  //   loadCategory();
  // }, [refreshData]);

  useEffect(() => {
    SearchDevicesFetchService({
      locationId, branchId, facilityId, buildingId, floorId, zoneId,
    }, handleSuccess, handleException);
  }, [locationId, branchId, facilityId, buildingId, floorId, zoneId, refreshData]);


  const categoryHandleSuccess = (dataObject) => {
    setCategoryList(dataObject.data);
  };
  const loadCategory = () => {
    CategoryFetchService(categoryHandleSuccess, handleException);
  };

  /* eslint-disable-next-line */
  function EditData(props) {
    return (moduleAccess.view
      && (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditDevice(props.selectedRow);
            setOpen(true);
          }}
        />
      ));
  }
  /* eslint-disable-next-line */
  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
        }}
      />
    );
  }
  /* eslint-disable-next-line */
  function SensorsData(props) {
    return (moduleAccess.view && (
      <RemoveRedEyeIcon
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setShowImageMarker(!showImageMarker); // Toggle visibility
          setEditDevice(props.selectedRow);
          fetchSensorList(props.selectedRow.id);
          setDeviceId(props.selectedRow.id);
        }}
      />
    ));
  }
  const fetchSensorList = (device_id) => {
    SensorDeployFetchService({ ...props.locationDetails, device_id }, fetchSenosorListSuccess, fetchSenosorListException);
  };

  useEffect(() => {
    if (device_id !== '0') {
      fetchSensorList(device_id);
    }
  }, [sensorRefresh]);

  const fetchSenosorListSuccess = (dataObject) => {
    setAnalogSensorList(dataObject.Analog.data || []);
    setDigitalSensorList(dataObject.Digital.data || []);
    setModbusSensorList(dataObject.Modbas.data || []);
    setProgressStatus(1);
    setSensorOpen(true);
  };

  const fetchSenosorListException = () => {
  };
  /* eslint-disable-next-line */


  const deletehandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setDeleteDailogOpen(false);
    }, 3000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6));

  const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5));

  return (
    <div style={{ height: 110, width: '100%', padding: 0 }}>
      <Grid container spacing={1}>
        {/* {showImageMarker && (
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Box
              component={Grid}
              item
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderColor: 'black',
                  border: '2px solid black',
                }}
              >
                <ImageMarkerList
                  labImage={`${process.env.REACT_APP_IMAGE_BASE_URL}/${props.zoneMap}`}
                  deviceCoordsList={deviceCoordsList}
                />
              </div>
            </Box>
          </Grid>
        )} */}
        <Dialog
          open={showImageMarker} // Dialog visibility controlled by the state
          onClose={handleCloseDialog} // This should reset state or close the dialog
          fullWidth
          maxWidth="sm"
        >
          <Box sx={{
            padding: 6, borderColor: 'black', border: '2px solid black',

          }}>

            {/* Pass props like zoneMap and deviceCoordsList to ImageMarkerList */}
            <ImageMarkerList
              labImage={`${process.env.REACT_APP_IMAGE_BASE_URL}/${props.zoneMap}`} // Make sure zoneMap is correctly set in props
              deviceCoordsList={deviceCoordsList}
            />
          </Box>
          <Grid style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, marginTop: 4, marginBottom: 0 }}>
            <Button
              variant="outlined"
              // color="secondary"
              onClick={handleCloseDialog} // Close the dialog when clicked
              sx={{ marginBottom: 2, }} // Optional styling for spacing
            >
              Cancel
            </Button>
          </Grid>
        </Dialog>

        {/* <Grid item xs={showImageMarkerList ? 12 : 12} sm={showImageMarkerList ? 8 : 12} md={showImageMarkerList ? 8 : 12} lg={showImageMarkerList ? 8 : 12} xl={showImageMarkerList ? 8 : 12}> */}
        <div style={{ height: '63vh', width: '100%', padding: 0 }}>
          <DataGrid
            sx={{
              border: 'none',
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none', // This removes the top border of the footer (pagination area)
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none', // Removes the bottom border between cells
              },
            }}
            rows={deviceList}
            columns={columns}
            pageSize={8}
            rowHeight={41}
            loading={isLoading}
            rowsPerPageOptions={[8]}
            disableSelectionOnClick
          />
        </div>
        {/* </Grid> */}
      </Grid>
      <DeviceModel
        isAddButton={isAddButton}
        deviceData={editDevice}
        open={open}
        setOpen={setOpen}
        categoryData={categoryList}
        locationDetails={props.locationDetails}
        zoneMap={props.zoneMap}
        setRefreshData={setRefreshData}
      />
      <SensorModel
        setSensorRefresh={setSensorRefresh}
        analogSensorList={analogSensorList}
        digitalSensorList={digitalSensorList}
        modbusSensorList={modbusSensorList}
        deviceData={editDevice}
        locationDetails={props.locationDetails}
        device_id={editDevice.id}
        open={sensorOpen}
        setOpen={setSensorOpen}
        setRefreshData={setRefreshData}
        progressStatus={progressStatus}
        setProgressStatus={setProgressStatus}
        deployedSensorTagList={deployedSensorTagList}
        calibratingDeviceId={calibratingDeviceId}
      />
      <DeviceModeModal
        changeDeviceId={changeDeviceId}
        setChangeDeviceId={setChangeDeviceId}
        changeDeviceIdMode={changeDeviceIdMode}
        deviceModalOpen={deviceModalOpen}
        setDeviceModalOpen={setDeviceModalOpen}
        deviceModeHeader={deviceModeHeader}
        deviceModeSubHeader={deviceModeSubHeader}
        setNotification={setNotification}
        setRefreshData={setRefreshData}
      />
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      <DeleteConfirmationDailog
        open={deleteDailogOpen}
        setOpen={setDeleteDailogOpen}
        deleteId={deleteId}
        deleteService={DeviceDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}

export default AddDeviceListResults;
