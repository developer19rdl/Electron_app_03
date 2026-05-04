import React, { useEffect, useState } from 'react';
import {
  Breadcrumbs, Typography, Grid, Backdrop, CircularProgress,
} from '@mui/material';
import { DeviceFetchService, HooterRelayService, TestHooterRelay } from '../../../../services/LoginPageService';
import DeviceWidget from '../deviceCard/DeviceWidget';
import NotificationWidget from '../deviceCard/NotificationWidget';
import ApplicationStore from '../../../../utils/localStorageUtil';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import AlertModalComponent from '../landingPageComponents/AlertModalComponent';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */

function DeviceGridComponent(props) {
  const {
    setImg, setLocationDetails, setProgressState, breadCrumbLabels, setBreadCrumbLabels,
    setDeviceCoordsList, setIsDashBoard, setIsGeoMap, siteImages, locationAlerts
  } = props;
  const [zoneId, setZoneId] = useState({
    zoneId: props.locationDetails.zoneId
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceTotal, setDeviceTotal] = useState('0');
  const [deviceAlert, setAlertTotal] = useState('0');
  const [disconnectedDevices, setDisconnectedDevices] = useState('0');
  const [labHooterStatus, setLabHooterStatus] = useState('0');
  const [aqiIndex, setAqiIndex] = useState('NA');
  const [expanded, setExpanded] = useState(false);
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const { deviceIdList } = ApplicationStore().getStorage('alertDetails');
  const intervalSec = 10000;
  const [pollingStatus, setPollingStatus] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    intervalCallFunction();
    const devicePolling = setInterval(() => {
      intervalCallFunction();
    }, intervalSec);
    return () => {
      clearInterval(devicePolling);
    };
  }, [props.locationDetails]);

  const intervalCallFunction = () => {
    DeviceFetchService({
      locationId: props.locationDetails.locationId,
      branchId: props.locationDetails.branchId,
      facilityId: props.locationDetails.facilityId,
      buildingId: props.locationDetails.buildingId,
      floorId: props.locationDetails.floorId,
      zoneId: props.locationDetails.zoneId,
    }, handleSuccess, handleException);
  };

  const handleSuccess = (dataObject) => {
    setDeviceList(dataObject.data);
    const deviceCoordinationsList = dataObject.data.map((data) => {
      const coordination = data.floorCords;
      const arrayList = coordination?.split(',');
      return arrayList && { top: arrayList[0], left: arrayList[1] };
    });
    const filteredArray = deviceCoordinationsList.filter((x) => x != null);
    // setDeviceCoordsList(filteredArray || []);
    setDeviceCoordsList([]);
    setDeviceTotal(dataObject.totalDeviceCount);
    setAlertTotal(dataObject.totalAlertCount);
    setDisconnectedDevices(dataObject.disconnectedDevices);
    setAqiIndex(dataObject.aqiIndex || 'NA');
    setLabHooterStatus(dataObject.labHooterStatus);
    setBackdropOpen(false);
  };

  const handleException = () => { };

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setDeviceCoordsList([]);
    setProgressState(() => {
      let newValue = value;
      if (locationDetails.zoneId) {
        // newValue = value < 7 ? 5 : value;
        // value >=4 ? setIsGeoMap(false) : setIsGeoMap(true);
        // setIsDashBoard(0);
      } else if (locationDetails.floorId) {
        newValue = value < 6 ? 5 : value;
        value >= 4 ? setIsGeoMap(false) : setIsGeoMap(true);
        setIsDashBoard(0);
      } else if (locationDetails.buildingId) {
        newValue = value < 5 ? 4 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
        setIsDashBoard(0);
      } else if (locationDetails.facilityId) {
        newValue = value < 4 ? 3 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
        setIsDashBoard(0);
      } else if (locationDetails.branchId) {
        newValue = value < 3 ? 2 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
        setIsDashBoard(0);
      } else if (locationDetails.locationId) {
        newValue = value < 2 ? 1 : value;
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
        setIsDashBoard(0);
      } else {
        // locationAlerts({});
        value <= 3 ? setIsGeoMap(true) : setIsGeoMap(false);
        setIsDashBoard(0);
      }
      return newValue;
    });
  };

  const handleHooter = () => {
    (userDetails?.userRole === 'systemSpecialist'
      || userDetails?.userRole === 'Admin'
      || userDetails?.userRole === 'Manager'
    ) && HooterRelayService({ zoneId: props.locationDetails.zoneId }, handleHooterSuccess, handleHooterException);
  }

  const handleHooterSuccess = (dataObject) => {
    setLabHooterStatus('0');
    setNotification({
      status: true,
      type: 'success',
      message: 'Disabled Successfully...!',
    });
  }

  const handleHooterException = () => {
    setNotification({
      status: false,
      type: 'error',
      message: 'Unable to disable the hooter...!',
    });
  }

  const testHooter = () => {
    TestHooterRelay({ zoneId: props.locationDetails.zoneId }, handleTestHooterSuccess, handleTestHooterException)
  }

  const handleTestHooterSuccess = (dataObject) => {
    setLabHooterStatus(dataObject.currentHooterStatus);
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
  }

  const handleTestHooterException = (errorObject, errorMessage) => {
    setNotification({
      status: false,
      type: 'error',
      message: 'Unable to test the Hooter...!',
    });
  }

  const handleAlert = () => {
    setAlertOpen(true);
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <div style={{
      height: '85%', width: '100%', marginTop: 10, paddingLeft: 5, paddingTop: 5,
    }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3 className='Roboto, sans-serif font-[600] tracking-[1px] p-1 text-black text-[15px] cursor-pointer'

          onClick={() => {
            setDeviceCoordsList([]);
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
            setImg('');
            // setIsGeoMap(true);
            setLocationlabel(value);
            // setIsDashBoard(0);
          }}
          style={{
            cursor: 'pointer',

            /* 🔥 HIGHLIGHT LOGIC */
            color: props.locationDetails.locationId ? '#1976d2' : '#000',
            fontWeight: props.locationDetails.locationId ? 700 : 600,
            borderBottom: props.locationDetails.locationId ? '2px solid #1976d2' : 'none',
            // paddingBottom: 4,
          }}
        >
          Location
        </h3>

      </Breadcrumbs>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <div style={{
          // overflow: 'scroll',
          width: '97.7%'
        }}>
          <div className="widgets" style={{
            height: 'auto', padding: 5,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            height: 'auto'
          }}>
            {/* <NotificationWidget type="hooterStatus" figure={labHooterStatus} handleClick={handleHooter} userRole={userDetails?.userRole} testHooter={testHooter} /> */}
            {/* <NotificationWidget type="disconnectedDevice" figure={disconnectedDevices} /> */}
            <NotificationWidget type="devices" figure={deviceTotal} />
            <NotificationWidget type="alerts" figure={deviceAlert} handleClick={handleAlert} />
            {/* <NotificationWidget type="aqi" aqi={aqiIndex} /> */}
            {/* <NotificationWidget type="time" /> */}
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          marginTop: 5,
          height: '76%',
          maxHeight: '100%',
          // overflow: 'auto',
        }}
      >
        <Grid container sx={{ width: '98%' }}>

          {/* {deviceList.map((data, index) => {
            return ( */}
          <Grid
            item
            sm={12}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            /* eslint-disable-next-line */
            // key={index}
            sx={{ padding: 1 }}
          >
            {/* <DeviceWidget
            type="aqmi"
            data={data}
            deviceIdList={deviceIdList}
            setLocationDetails={setLocationDetails}
            setIsDashBoard={setIsDashBoard}
            setBreadCrumbLabels={setBreadCrumbLabels}
            />
          </Grid> */}
            <DeviceWidget
              locationDetails={props.locationDetails}
            // type="aqmi"
            // data={data}
            // deviceIdList={deviceIdList}
            // setLocationDetails={setLocationDetails}
            // setIsDashBoard={setIsDashBoard}
            // setBreadCrumbLabels={setBreadCrumbLabels}
            />
          </Grid>
          {/* );
          })} */}
        </Grid>
      </div>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
      {/* <AlertModalComponent alertOpen={alertOpen} setAlertOpen={setAlertOpen} locationDetails={zoneId} /> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default DeviceGridComponent;
