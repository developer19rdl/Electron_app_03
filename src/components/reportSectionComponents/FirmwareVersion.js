import React, { useState } from 'react';
import {
  FormControl, Select, Button, InputLabel, MenuItem, Typography, Grid, CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import { FetchFirmwareVersionReportDetails } from '../../services/LoginPageService';
import { DownloadFirmwareVersionReport, EmailFirmwareVersionReportService } from '../../services/DownloadCsvReportsService';
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
    field: 'created_at',
    headerName: 'Date',
    headerAlign: 'center',
    minWidth: 100,
    maxWidth: 200,
    flex: 1,
    align: 'center',
    renderCell: (params) => (
      <Typography>
        {
          convertDate(params.value)
        }
      </Typography>
    ),
  },
  {
    field: 'updated_at',
    headerName: 'Time',
    headerAlign: 'center',
    minWidth: 100,
    maxWidth: 200,
    flex: 1,
    align: 'center',
    renderCell: (params) => (
      <Typography>
        {
          convertTime(params.value)
        }
      </Typography>
    ),
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
    field: 'firmwareVersion',
    headerName: 'FirmwareVersion',
    headerAlign: 'center',
    minWidth: 120,
    maxWidth: 200,
    flex: 1,
    align: 'center',
  },
  // { field: 'HardwareVersion', headerName: 'HardwareVersion', width: 130 },

];

// const dateFormat = (value) => {
//     const dateTime = value.split(' ');
//     const date = dateTime[0].split('-');
//     const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
//     return dateValue;
// };

function FirmwareVersion({ deviceList, siteId }) {
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [firmwareVersionReportList, setFirmwareVersionReportList] = useState([]);
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
    FetchFirmwareVersionReportDetails({
      page, pageSize, deviceId, ...siteId,
    }, FirmwareVersionReportHandleSuccess, FirmwareVersionHandleException);
    // }
  };

  const FirmwareVersionReportHandleSuccess = (dataObject) => {
    setFirmwareVersionReportList(dataObject.data.data);
    setRowCountState(dataObject.totalRowCount);
    setGridLoading(false);
  };

  const FirmwareVersionHandleException = (dataObject) => { };

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
      DownloadFirmwareVersionReport({ ...siteId, deviceId }, firmwareVersionExportSuccess, firmwareVersionExportException);
    // } else {
    //   setNotification({
    //     status: true,
    //     type: 'error',
    //     message: 'Please select a Device',
    //   });
    // }
  };

  const firmwareVersionExportSuccess = (dataObject) => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message || 'Success',
      });
    }, 2000);
  };

  const firmwareVersionExportException = (errorObject, errorMessage) => {
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
      EmailFirmwareVersionReportService({ ...siteId, deviceId }, handleEmailSuccess, handleEmailException);
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
                endIcon={enableDownload === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <DownloadIcon />}
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
                endIcon={enableSend === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <SendIcon />}
                disabled={enableSend}
              >
                Send
              </Button>
            </FormControl>
          </Grid>
          <div style={{ height: '620px', width: '100%', marginTop: 25 }}>
            <DataGrid
              rows={firmwareVersionReportList}
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

export default FirmwareVersion;
