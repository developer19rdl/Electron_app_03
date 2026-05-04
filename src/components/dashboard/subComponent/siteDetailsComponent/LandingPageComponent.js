import React, { useState, useEffect } from 'react';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Widget from '../../../widget/Widget';
import LayoutMachine from '../landingPageComponents/LayoutMachine';
import { DashboardMeterListDetails, DashboardSensorListDetails } from '../../../../services/LoginPageService';
import AlertModalComponent from '../landingPageComponents/AlertModalComponent';
import ApplicationStore from '../../../../utils/localStorageUtil';
import EnergyMeterComponent from '../landingPageComponents/EnergyMeterComponent';
function LandingPageComponent({ locationDetails, setIsDashBoard }) {
  const [deviceId, setDeviceId] = useState({
    deviceId: locationDetails.deviceId
  });
  const [open, setOpen] = useState(false);
  const [meterTagId, setMeterTagId] = useState('');
  const [meterTag, setMeterTag] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [analogSensorList, setAnalogSensorList] = useState([]);
  const [totalSensors, setTotalSensors] = useState(0);
  const [totalAlerts, setTotalALerts] = useState(0);
  const [aqiIndex, setAqiIndex] = useState('NA');

  const intervalSec = 100000;
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [aqiTrendOpen, setAQITrendOpen] = useState(false);
  /* eslint-disable-next-line */
  useEffect(() => {
    intervalCallFunction();
    /* eslint-disable-next-line */
    if (open === false) {
      const devicePolling = setInterval(() => {
        intervalCallFunction();
      }, intervalSec);
      return () => {
        clearInterval(devicePolling);
      };
    }
  }, [locationDetails, open]);

  const intervalCallFunction = () => {
    DashboardMeterListDetails({ deviceId: locationDetails.deviceId }, fetchSenosorListSuccess, fetchSenosorListException);
  };
  const fetchSenosorListSuccess = (dataObject) => {

    setAnalogSensorList(dataObject?.data || []);
    setTotalSensors(dataObject.totalMeter)
    setBackdropOpen(false);

  };

  const fetchSenosorListException = () => {
  };

  return (
    <div style={{
      height: '98%', width: '100%', marginTop: 10, marginLeft: 7, paddingLeft: 2, paddingTop: 0,
    }}
    >
      <div
        style={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>

        <Button
          variant="outlined"
          style={{ marginLeft: '10px' }}
          startIcon={<ArrowBack />}
          onClick={() => {
            setIsDashBoard(2);
          }}
        >
          Back to Data Logger
        </Button>
      </div>
      <div className="widgets" style={{ height: 'auto', backgroundColor: '#fafafa', padding: 3 }}>
        <div className="widgets" style={{
          height: 'auto', backgroundColor: '#fafafa', padding: 5,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%'
        }}>
          <Widget type="devices" totalSensors={totalSensors} />
          <Widget type="alerts" setAlertOpen={setAlertOpen} totalAlerts={totalAlerts} />
          <Widget type="aqi" setAlertOpen={setAQITrendOpen} aqi={aqiIndex} />
          {/* <Widget type="time" /> */}
        </div>
      </div>

      <LayoutMachine
        setOpen={setOpen}
        analogSensorList={analogSensorList}
        setMeterTagId={setMeterTagId}
        setMeterTag={setMeterTag}
      />

      <EnergyMeterComponent
        open={open}
        setOpen={setOpen}
        deviceId={deviceId}
        meterTagId={meterTagId}
        meterTag={meterTag}
        analogSensorList={analogSensorList}
      />
    </div>
  );
}

export default LandingPageComponent;
