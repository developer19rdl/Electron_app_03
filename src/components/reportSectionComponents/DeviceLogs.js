import React, { useState, useEffect } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl, Select, TextField, Button, Typography, Grid, CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { FetchMeterService, FetchEnergyReportDetails } from '../../services/LoginPageService';
import { DownloadReportEnergyReportCsv, DownloadReportSensorLogCsv, EmailDeviceLogReportService } from '../../services/DownloadCsvReportsService';
import NotificationBar from '../notification/ServiceNotificationBar';
import { currentDateValidator, dateRangevalidator } from '../../utils/helperFunctions';

function DeviceLogs({ deviceList, siteId }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [sensorLogReportList, setSensorLogReportList] = useState([]);
  const [unTaggedSensorLogReportList, setUnTaggedSensorLogReportList] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCountState, setRowCountState] = useState(0);
  const [enableSend, setEnableSend] = useState(false);
  const [enableDownload, setEnableDownload] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  const [meterId, setMeterId] = useState('');

  const [meterList, setMeterList] = useState([]);


  // useEffect(() => {
  //   fetchNewData();
  // }, [unTaggedSensorLogReportList, page]);

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Date',
      minWidth: 200,
      maxWidth: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // renderCell: (params) => (
      //   <Typography>
      //     {
      //       dateFormat(params.value)
      //     }
      //   </Typography>
      // ),
    },
    // {
    //   field: 'time',
    //   headerName: 'Time',
    //   minWidth: 80,
    //   maxWidth: 120,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    //   renderCell: (params) => (
    //     <Typography>
    //       {
    //         timeFormat(params.row.created_at)
    //       }
    //     </Typography>
    //   ),
    // },
    {
      field: 'buildingName',
      headerName: 'Building',
      minWidth: 130,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'deviceName',
      headerName: 'Device',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    // {
    //   field: 'sensorTag',
    //   headerName: 'Meter',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'user',
    //   headerName: 'Assets',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    {
      field: 'v1',
      headerName: 'Voltage R',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'v2',
      headerName: 'Voltage Y',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'v3',
      headerName: 'Voltage B',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'I1',
      headerName: 'Current R',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'I2',
      headerName: 'Current Y',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'I3',
      headerName: 'Current B',
      minWidth: 80,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
    },
    // {
    //   field: 'powerFactor',
    //   headerName: 'Power Factor',
    //   minWidth: 250,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'kw',
    //   headerName: 'kW',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'kwh',
    //   headerName: 'kWh',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'frequency',
    //   headerName: 'Frequency',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'floorName',
    //   headerName: 'Floor',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
    // {
    //   field: 'labDepName',
    //   headerName: 'Zone',
    //   minWidth: 130,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center',
    // },
  ];

  // const dateFormat = (value) => {
  //   const dateTime = value.split(' ');
  //   const date = dateTime[0].split('-');
  //   const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
  //   return dateValue;
  // };

  const timeFormat = (value) => {
    const dateTime = value.split(' ');
    const dateValue = dateTime[1];
    return dateValue;
  };

  const HandleDeviceChange = (deviceId) => {

    if (deviceId) {
      FetchMeterService({ deviceId }, MeterHandleSuccess, MeterHandleException);
    }
    setDeviceId(deviceId);
  };
  const MeterHandleSuccess = (dataObject) => {
    setMeterList(dataObject.data || []);

  };

  const MeterHandleException = () => { };






  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewData();
  };

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const DownloadCsv = () => {
    if (fromDate !== '' && toDate !== '') {
      fromDate > toDate ? (dateRangevalidator(setNotification)) :
        (setEnableDownload(true),
          DownloadReportEnergyReportCsv({
            ...siteId, deviceId, meterId, fromDate, toDate,
          }, csvReportHandleSuccess, csvReportHandleException))
    } else {
      setNotification({
        status: true,
        type: 'error',
        message: 'Please select a date range',
      });
    }
  };

  const csvReportHandleSuccess = () => {
    setTimeout(() => {
      setEnableDownload(false);
    }, 2000);
  };

  const csvReportHandleException = () => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'error',
        message: 'Something went wrong...',
      });
    }, 2000);
  };

  const SendEmail = () => {
    if (fromDate !== '' && toDate !== '') {
      fromDate > toDate ? (dateRangevalidator(setNotification)) :
        (setEnableSend(true),
          EmailDeviceLogReportService({
            ...siteId, deviceId, fromDate, toDate,
          }, handleEmailSuccess, handleEmailException));
    } else {
      setNotification({
        status: true,
        type: 'error',
        message: 'Please select a date range',
      });
    }
  };

  const handleEmailSuccess = (dataObject) => {
    setTimeout(() => {
      setEnableSend(false);
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message || 'Success',
      });
    }, 2000);
  };

  const handleEmailException = (errorObject, errorMessage) => {
    setTimeout(() => {
      setEnableSend(false);
      setNotification({
        status: true,
        type: 'error',
        message: errorMessage,
      });
    }, 2000);
  };

  const fetchNewData = () => {
    // if (fromDate !== '' && toDate !== '') {
    setGridLoading(true);
    // setSensorLogReportList([]);
    FetchEnergyReportDetails({
      page, pageSize, ...siteId, deviceId, meterId, fromDate, toDate,
    }, SensorLogReportHandleSuccess, SensorLogHandleException);
    // }
  };

  const SensorLogReportHandleSuccess = (dataObject) => {
    setSensorLogReportList(dataObject.data || []);
    // setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const SensorLogHandleException = () => { };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setDeviceId('');
    setGridLoading(false);
    setUnTaggedSensorLogReportList(!unTaggedSensorLogReportList);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <Grid item>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="center">
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={2.5}
          >
            <TextField
              fullWidth
              label="From Date"
              type="date"
              value={fromDate}
              variant="outlined"
              required
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDateValidator()
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={2.5}
          >
            <TextField
              fullWidth
              label="To date"
              type="date"
              value={toDate}
              variant="outlined"
              required
              onChange={(e) => {
                setToDate(e.target.value);
              }}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDateValidator()
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={3}
          >
            <FormControl fullWidth>
              <InputLabel>Devices</InputLabel>
              <Select
                value={deviceId}
                label="Devices"
                onChange={(e) => {
                  HandleDeviceChange(e.target.value);
                }}
              >
                <MenuItem value="" key={0}>
                  <em style={{ fontWeight: 'bold' }}>All</em>
                </MenuItem>
                {deviceList?.map((data, index) => (
                  <MenuItem value={data.id} key={index + 1}>{data.deviceName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={3}
          >
            <FormControl fullWidth>
              <InputLabel>Assets</InputLabel>
              <Select
                value={meterId}
                label="Devices"
                onChange={(e) => {
                  setMeterId(e.target.value)
                }}
              >
                <MenuItem value="" key={0}>
                  <em style={{ fontWeight: 'bold' }}>All</em>
                </MenuItem>
                {meterList?.map((data, index) => (
                  <MenuItem value={data.slaveId} key={index + 1}>{data.meterName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={3}
            lg={3}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button size="medium" variant="contained" autoFocus type="submit" sx={{
                backgroundColor: "#051622", color: "#ffff",
                "&:hover": {
                  backgroundColor: "#183b52", // Change to your desired hover color
                },
              }}>
                Submit
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={3}
            lg={3}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button size="medium" variant="contained" autoFocus onClick={handleCancel} sx={{
                backgroundColor: "#051622", color: "#ffff",
                "&:hover": {
                  backgroundColor: "#183b52", // Change to your desired hover color
                },
              }}>
                Cancel
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            style={{
              alignSelf: 'center',

            }}
            lg={3}
          >
            <Button
              size="medium"
              variant="contained"

              autoFocus
              sx={{
                backgroundColor: "#051622", color: "#ffff",
                "&:hover": {
                  backgroundColor: "#183b52", // Change to your desired hover color
                },
              }}
              onClick={() => {
                DownloadCsv();
              }}
              endIcon={enableDownload === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <DownloadIcon />}
              disabled={enableDownload}
              style={{ marginRight: '10px' }}
            >
              Download
            </Button>
          </Grid>


          <Box sx={{ height: '620px', width: '100%', marginTop: 2 }}>
            <DataGrid
              rows={sensorLogReportList}
              // rowCount={rowCountState}
              loading={isLoading}
              // pagination
              // page={page}
              // pageSize={pageSize}
              // paginationMode="server"
              // onPageChange={onPageChange}
              // onPageSizeChange={onPageSizeChange}
              pageSize={100}
              // pageSizeOptions={[50, 100]}
              columns={columns}
            />
          </Box>
        </Grid>
      </form>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Grid>
  );
}

export default DeviceLogs;