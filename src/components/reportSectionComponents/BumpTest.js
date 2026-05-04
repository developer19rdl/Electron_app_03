import React, { useState, useEffect } from 'react';
import {
  InputLabel, MenuItem, FormControl, Select, TextField, Button, Typography, Grid, CircularProgress, Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import {
  DataGrid,
} from '@mui/x-data-grid';
import { Cancel, CheckCircle, Error } from '@mui/icons-material';
import { FetchBumpTestReportDetails } from '../../services/LoginPageService';
import { DownloadReportBumpTestCsv, EmailBumptestReportService } from '../../services/DownloadCsvReportsService';
import NotificationBar from '../notification/ServiceNotificationBar';
import { currentDateValidator, dateRangevalidator } from '../../utils/helperFunctions';

function BumpTest({ deviceList, siteId }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [device_id, setDeviceId] = useState('');
  const [isLoading, setGridLoading] = useState(false);
  const [bumpTestReportList, setBumpTestReportList] = useState([]);
  const [unTaggedBumpTestReportList, setUnTaggedBumpTestReportList] = useState();
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

  useEffect(() => {
    FetchNewData();
  }, [unTaggedBumpTestReportList, page]);

  const columns = [
    {
      field: 'created_at',
      headerName: 'Date',
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Typography>
          {
            dateFormat(params.value)
          }
        </Typography>
      ),
    },
    {
      field: 'stateName',
      headerName: 'Location',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'branchName',
      headerName: 'Branch',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'facilityName',
      headerName: 'Facilities',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'buildingName',
      headerName: 'Building',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'floorName',
      headerName: 'Floor',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'labDepName',
      headerName: 'Zone',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'deviceName',
      headerName: 'Device',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sensorTagName',
      headerName: 'Sensor',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'result',
      headerName: 'Result',
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        // <Typography>
        //   {
        //     dateFormat(params.value)
        //   }
        // </Typography>
        <Chip
          color={params.value === 'Pass' ? 'success' : params.value === 'Fail' ? 'error' : 'primary'}
          icon={params.value === 'Pass' ? <CheckCircle /> : params.value === 'Fail' ? <Cancel /> : <Error />}
          label={params.value}
          variant="outlined"
        />
      ),
    },
    {
      field: 'percentageDeviation',
      headerName: 'Deviation',
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'typeCheck',
      headerName: 'Test Type',
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastDueDate',
      headerName: 'Next Due Date',
      minWidth: 120,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'userEmail',
      headerName: 'User',
      minWidth: 120,
      maxWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
  ];
  const dateFormat = (value) => {
    const dateTime = value.split(' ');
    const date = dateTime[0].split('-');
    const dateValue = `${date[2]}-${date[1]}-${date[0]}`;
    return dateValue;
  };

  const HandleDeviceChange = (device_id) => {
    setDeviceId(device_id);
  };

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    FetchNewData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fromDate > toDate ? dateRangevalidator(setNotification) : FetchNewData();
  };

  const FetchNewData = () => {
    if (fromDate !== '' && toDate !== '') {
      setGridLoading(true);
      FetchBumpTestReportDetails({
        page, pageSize, ...siteId, device_id, fromDate, toDate,
      }, BumpTestReportHandleSuccess, BumpTestReportHandleException);
    }
  };

  const BumpTestReportHandleSuccess = (dataObject) => {
    setBumpTestReportList(dataObject.data.data);
    setRowCountState(dataObject.data.totalRowCount);
    setGridLoading(false);
  };

  const BumpTestReportHandleException = () => { };

  const handleCancel = () => {
    setFromDate('');
    setToDate('');
    setDeviceId('');
    setGridLoading(false);
    setUnTaggedBumpTestReportList(!unTaggedBumpTestReportList);
  };

  const OnPageChange = (newPage) => {
    setPage(newPage);
  };

  const DownloadCsv = () => {
    if (fromDate !== '' && toDate !== '') {
      fromDate > toDate ? dateRangevalidator(setNotification) :
      (setEnableDownload(true),
      DownloadReportBumpTestCsv({
        ...siteId, device_id, fromDate, toDate,
      }, csvReportHandleSuccess, csvReportHandleException));
    } else {
      setNotification({
        status: true,
        type: 'error',
        message: 'Please select a date range',
      });
    }
  };

  const csvReportHandleSuccess = (dataObject) => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'success',
        message: dataObject.message || 'Success',
      });
    }, 3000);
  };

  const csvReportHandleException = (errorObject, errorMessage) => {
    setTimeout(() => {
      setEnableDownload(false);
      setNotification({
        status: true,
        type: 'error',
        message: errorMessage || 'Something went wrong',
      });
    }, 3000);
  };

  const SendEmail = () => {
    if (fromDate !== '' && toDate !== '') {
      fromDate > toDate ? dateRangevalidator(setNotification) :
      (setEnableSend(true),
      EmailBumptestReportService({
        ...siteId, device_id, fromDate, toDate,
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
        message: errorMessage || 'Something went wrong',
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
            xs={6}
            sm={6}
            md={4}
            lg={2}
            xl={2.5}
          >
            <TextField
              fullWidth
              label="From Date"
              type="date"
              variant="outlined"
              value={fromDate}
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
            lg={2}
            xl={2.5}
          >
            <TextField
              fullWidth
              label="To Date"
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
            lg={2}
            xl={3}
          >
            <FormControl fullWidth>
              <InputLabel>Device</InputLabel>
              <Select
                value={device_id}
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
            sm={3}
            md={3}
            lg={1.5}
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
            sm={3}
            md={3}
            lg={1.5}
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
            sm={3}
            md={3}
            lg={1.5}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button
                size="medium"
                variant="contained"
                autoFocus
                endIcon={enableDownload === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <DownloadIcon />}
                onClick={() => {
                  DownloadCsv();
                }}
                disabled={enableDownload}
              >
                Download
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={3}
            lg={1.5}
            xl={1}
            style={{
              alignSelf: 'center',
            }}
          >
            <FormControl fullWidth>
              <Button
                variant="contained"
                endIcon={enableSend === true ? <CircularProgress style={{ height: '25px', width: '25px' }} /> : <SendIcon />}
                disabled={enableSend}
                onClick={SendEmail}
              >
                Send
              </Button>
            </FormControl>
          </Grid>
          <div style={{ height: '620px', width: '100%', marginTop: 25 }}>
            <DataGrid
              rows={bumpTestReportList}
              rowCount={rowCountState}
              loading={isLoading}
              rowsPerPageOptions={[1, 10, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              onPageChange={OnPageChange}
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

export default BumpTest;
