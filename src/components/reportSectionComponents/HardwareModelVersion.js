import { Download, Send } from '@mui/icons-material';
import {
  Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { DownloadHardwareVersionReport, EmailHardwareVersionReportService } from '../../services/DownloadCsvReportsService';
import { FetchHardwareVersionReportDetails } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

// Date
const convertDate = (value) => {
  let date = '';
  const dateTimeSplit = value && value.split(' ');
  if (dateTimeSplit) {
    const dateSplit = dateTimeSplit[0].split('-');
    date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
  }
  return date;
};

// Time
const convertTime = (value) => {
  let time = '';
  const dateTimeSplit = value && value.split(' ');
  if (dateTimeSplit) {
    time = dateTimeSplit[1];
  }
  return time;
};

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    headerAlign: 'center',
    minWidth: 100,
    maxWidth: 200,
    flex: 1,
    align: 'center',
    // renderCell: (params) => (
    //   <Typography>
    //     {
    //       convertDate(params.value)
    //     }
    //   </Typography>
    // ),
  },
  {
    field: 'time',
    headerName: 'Time',
    headerAlign: 'center',
    minWidth: 100,
    maxWidth: 200,
    flex: 1,
    align: 'center',
    // renderCell: (params) => (
    //   <Typography>
    //     {
    //       convertTime(params.value)
    //     }
    //   </Typography>
    // ),
  },
  {
    field: 'stateName',
    headerName: 'Location',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'branchName',
    headerName: 'Branch',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'facilityName',
    headerName: 'Facility',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'floorName',
    headerName: 'Floor',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'labDepName',
    headerName: 'Zone',
    headerAlign: 'center',
    minWidth: 200,
    flex: 1,
    align: 'center',
  },
  {
    field: 'deviceName',
    headerName: 'Device Name',
    headerAlign: 'center',
    minWidth: 300,
    flex: 1,
    align: 'center',
  },
  {
    field: 'deviceModel',
    headerName: 'Device Model No.',
    headerAlign: 'center',
    minWidth: 140,
    maxWidth: 200,
    flex: 1,
    align: 'center',
  },
];

function HardwareModelVersion({ deviceList, siteId }) {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [hardwareVersionreportList, setHardwareVersionreportList] = useState([]);
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

  const HandleDeviceChange = (deviceId) => {
    setDeviceId(deviceId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNewData();
  };

  const fetchNewData = () => {
    // if(deviceId !== ''){
    setGridLoading(true);
    FetchHardwareVersionReportDetails({
      page, pageSize, deviceId, ...siteId,
    }, HardwareVersionReportHandleSuccess, HardwareVersionHandleException);
    // }
  };

  const HardwareVersionReportHandleSuccess = (dataObject) => {
    setHardwareVersionreportList(dataObject.data || []);
    setRowCountState(dataObject.totalRowCount || 0);
    setGridLoading(false);
  };

  const HardwareVersionHandleException = (dataObject) => { };

  const handleCancel = () => {
    setDeviceId('');
    setGridLoading(false);
  };

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchNewData();
  };

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    fetchNewData();
  };

  const DownloadCsv = () => {
    // if (deviceId !== '') {
    setEnableDownload(true);
    DownloadHardwareVersionReport({ ...siteId, deviceId }, hardwareVersionExportSuccess, hardwareVersionExportException);
    // } else {
    //   setNotification({
    //     status: true,
    //     type: 'error',
    //     message: 'Please select a Device',
    //   });
    // }
  };

  const hardwareVersionExportSuccess = (dataObject) => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message || 'Success',
      });
    }, 2000);
  };

  const hardwareVersionExportException = (errorObject, errorMessage) => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'error',
        message: errorMessage || 'Something went wrong',
      });
    }, 2000);
  };

  const SendEmail = () => {
    // if (deviceId !== '') {
    setEnableSend(true);
    EmailHardwareVersionReportService({ ...siteId, deviceId }, handleEmailSuccess, handleEmailException);
    // } else {
    //   setNotification({
    //     status: true,
    //     type: 'error',
    //     message: 'Please select a Device',
    //   });
    // }
  };

  const handleEmailSuccess = (dataObject) => {
    setTimeout(() => {
      setEnableSend(false);
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message || ' Success',
      });
    }, 2000);
  };

  const handleEmailException = (errorObject, errorMessage) => {
    setTimeout(() => {
      setEnableSend(false);
      setNotification({
        status: true,
        type: 'error',
        message: errorMessage || ' Something went wrong',
      });
    }, 2000);
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
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={3}
          >
            <FormControl fullWidth>
              <InputLabel>Device</InputLabel>
              <Select
                value={deviceId}
                label="Device"
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
            xs={6}
            sm={1.5}
            md={2}
            lg={2}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button size="medium" variant="contained" autoFocus type="submit">
                Submit
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={1.5}
            md={2}
            lg={2}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button size="medium" variant="contained" autoFocus onClick={handleCancel}>
                Cancel
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2.5}
            md={2}
            lg={2}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button
                variant="contained"
                onClick={() => {
                  DownloadCsv();
                }}
                endIcon={enableDownload === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <Download />}
                disabled={enableDownload}
              >
                Download
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2.5}
            md={2}
            lg={2}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button
                variant="contained"
                onClick={() => {
                  SendEmail();
                }}
                endIcon={enableSend === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <Send />}
                disabled={enableSend}
              >
                Send
              </Button>
            </FormControl>
          </Grid>
          <div style={{ height: '620px', width: '100%', marginTop: 25 }}>
            <DataGrid
              rows={hardwareVersionreportList}
              rowCount={rowCountState}
              loading={isLoading}
              // rowsPerPageOptions={[5, 10, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              columns={columns}
            />
          </div>
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

export default HardwareModelVersion;
