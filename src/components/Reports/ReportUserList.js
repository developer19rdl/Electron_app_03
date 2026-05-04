import React, { useEffect, useState } from 'react'
import NotificationBar from '../notification/ServiceNotificationBar';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { FetchBranchService, FetchLocationService, SearchDevicesFetchService, UserDeviceReport } from '../../services/LoginPageService';
import { DownloadCustomerDeviceReport, DownloadDeviceReport } from '../../services/DownloadCsvReportsService';
import { FetchReportLocationService, SearchDevicesReportService, UserDeviceReport } from '../../services/LoginPageService';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CircularProgress } from '@mui/material';

const ReportUserList = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [Locationid, setLocationId] = useState('');
    const [deviceList, setDeviceList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [gridLoading, setGridLoading] = useState(false);

    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);


    const [enableDownload, setEnableDownload] = useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });


    useEffect(() => {
        FetchReportLocationService(handleLocationSuccess, handleLocationException);

    }, []);

    const handleLocationSuccess = (dataObject) => {
        setLocationList(dataObject.data || []);
        // if (locationDetails?.locationId) {
        //     setLocationId(locationDetails?.locationId);
        //     FetchBranchService({ locationId: locationDetails?.locationId }, BranchHandleSuccess, BranchHandleException);
        // }
    };
    const handleLocationException = () => { };

    const BranchHandleSuccess = (dataObject) => {
        setDeviceList(dataObject.data || []);

    };
    const BranchHandleException = () => { };
    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };

    const HandleLocationChange = (Locationid) => {
        setLocationId(Locationid);
        if (Locationid) {
            SearchDevicesReportService({
                locationId: Locationid,
            }, BranchHandleSuccess, BranchHandleException);
        }
    };


    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const calculateOneMonthFrom = (date) => {
        const selectedDate = new Date(date);
        const oneMonthFromSelectedDate = new Date(selectedDate);
        oneMonthFromSelectedDate.setMonth(oneMonthFromSelectedDate.getMonth() + 1);
        const year = oneMonthFromSelectedDate.getFullYear();
        const month = String(oneMonthFromSelectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(oneMonthFromSelectedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const fetchData = (page, pageSize) => {
        setGridLoading(true);
        UserDeviceReport({
            fromDate,
            toDate,
            locationId: Locationid,
            deviceId,
            page: page + 1, // API is 1-indexed
            limit: pageSize
        }, AlarmReportHandleSuccess, AlarmReportHandleException);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPage(0);
        fetchData(0, pageSize);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (fromDate && toDate) {
            fetchData(newPage, pageSize);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(0);
        if (fromDate && toDate) {
            fetchData(0, newPageSize);
        }
    };

    const handleCancel = () => {
        setFromDate('');
        setToDate('');
        setDeviceId('');
        setHeaders([]);
        setData([]);
        setLocationId('');
        setRowCount(0);
        setPage(0);
        setPageSize(100);
    };
    const AlarmReportHandleSuccess = (dataObject) => {
        setData(dataObject?.data || [])
        setHeaders(dataObject?.headers || [])
        setRowCount(dataObject?.total || 0)
        setNotification({
            status: true,
            type: 'success',
            message: "Success",
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
        setGridLoading(false);
    };

    const AlarmReportHandleException = (errorObject, errorMessage) => {
        setGridLoading(false);
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);

    };


    // const DownloadCsv = () => {
    //     if (fromDate !== '' && toDate !== '') {
    //         DownloadDeviceReport({
    //             fromDate, toDate, locationId: Locationid, deviceId
    //         }, csvReportHandleSuccess, csvReportHandleException);
    //     } else {
    //         setNotification({
    //             status: true,
    //             type: 'error',
    //             message: 'Please select a date range',
    //         });
    //     }
    // };

    const DownloadCsv = () => {
        if (fromDate !== '' && toDate !== '') {
            setEnableDownload(true);
            DownloadDeviceReport({
                fromDate,
                toDate,
                locationId: Locationid,
                deviceId
            }, csvReportHandleSuccess, csvReportHandleException);
        } else {
            setNotification({
                status: true,
                type: 'error',
                message: 'Please select a date range',
            });
        }
    };

    const csvReportHandleSuccess = () => {
        setEnableDownload(false);
        setTimeout(() => {
        }, 2000);
    };

    const csvReportHandleException = () => {
        setEnableDownload(false);
        setTimeout(() => {
            setNotification({
                status: true,
                type: 'error',
                message: 'Something went wrong...',
            });
        }, 2000);
    };
    const parseValue = (value) => {
        if (value === undefined || value === null || value === '') return "0";
        const parsed = parseFloat(value);
        return isNaN(parsed) ? value : parsed.toFixed(2);
    };

    const formatTimestamp = (ts) => {
        if (!ts) return "";
        const date = new Date(ts);
        if (!isNaN(date.getTime())) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            const ss = String(date.getSeconds()).padStart(2, '0');
            return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
        }
        return ts;
    };

    const displayHeaders = headers.length > 0 && headers[0]?.group?.toLowerCase().includes('time')
        ? headers
        : [{ group: 'Timestamp' }, ...headers];

    const dataGridColumns = displayHeaders.flatMap((header) => {
        if (header.subHeaders && header.subHeaders.length > 0) {
            return header.subHeaders.map((subHeader) => ({
                field: `${header.group}_${subHeader}`,
                headerName: `${header.group} - ${subHeader}`,
                width: 180,
                headerAlign: 'center',
                align: 'center',
            }));
        } else {
            const isTimestamp = header.group.toLowerCase().includes('time');
            return [{
                field: header.group,
                headerName: header.group,
                width: isTimestamp ? 220 : 180,
                headerAlign: 'center',
                align: 'center',
            }];
        }
    });

    const dataGridRows = Object.entries(data).map(([timestamp, rowData], index) => {
        const row = { id: index };
        displayHeaders.forEach((header) => {
            if (header.group.toLowerCase().includes('time')) {
                row[header.group] = formatTimestamp(timestamp);
            } else if (header.subHeaders && header.subHeaders.length > 0) {
                header.subHeaders.forEach((subHeader) => {
                    const value = rowData[header.group]?.[subHeader];
                    row[`${header.group}_${subHeader}`] = parseValue(value);
                });
            } else {
                const value = rowData[header.group];
                row[header.group] = parseValue(value);
            }
        });
        return row;
    });
    return (
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}>

                <CardContent className={'min-h-[550px]'} style={{ border: 'none', }}>

                    {/* <div style={{ height: 425, width: '100%' }}> */}
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="From Date"
                                        type="date"
                                        value={fromDate}
                                        variant="outlined"
                                        size='small'
                                        required
                                        onChange={(e) => {
                                            setFromDate(e.target.value);
                                        }}
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // inputProps={{
                                        //   max: currentDateValidator()
                                        // }}
                                        inputProps={{
                                            max: calculateOneMonthFrom(toDate), // Set max date based on selectDateTo
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sm={6}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="To Date"
                                        type="date"
                                        value={toDate}
                                        variant="outlined"
                                        size='small'

                                        required
                                        onChange={(e) => {
                                            setToDate(e.target.value);
                                        }}
                                        autoComplete="off"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // inputProps={{
                                        //   max: currentDateValidator()
                                        // }}
                                        inputProps={{
                                            min: fromDate, // Set min date based on selectDateFrom
                                            max: calculateOneMonthFrom(fromDate), // Set max date based on selectDateFrom
                                        }}
                                    />

                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel>Location</InputLabel>
                                        <Select
                                            value={Locationid}
                                            size='small'

                                            label="Devices"
                                            onChange={(e) => {
                                                HandleLocationChange(e.target.value);
                                            }}
                                        >
                                            <MenuItem value="" key={0}>
                                                <em style={{ fontWeight: 'bold' }}>All</em>
                                            </MenuItem>
                                            {locationList.map((data, index) => (
                                                <MenuItem value={data.id} key={index + 1}>
                                                    {data.loc_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3}
                                    lg={3}
                                    xl={3}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel>Devices</InputLabel>
                                        <Select
                                            value={deviceId}
                                            size='small'

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
                                    xs={6}
                                    sm={3}
                                    md={3}
                                    lg={3}
                                    xl={2}
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
                                        }}
                                            onClick={handleSubmit}
                                        >
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
                                    xl={2}
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
                                    xs={6}
                                    sm={3}
                                    md={3}
                                    lg={3}
                                    xl={2}
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <Button
                                            size="medium"
                                            sx={{
                                                backgroundColor: "#051622", color: "#ffff",
                                                "&:hover": {
                                                    backgroundColor: "#183b52", // Change to your desired hover color
                                                },
                                            }}
                                            variant="contained"
                                            autoFocus
                                            disabled={enableDownload}
                                            onClick={() => {
                                                DownloadCsv();
                                            }}
                                        >
                                            {enableDownload ? <CircularProgress size={24} color="inherit" /> : 'Download'}
                                        </Button>
                                    </FormControl>
                                </Grid>

                                {/* <div style={{ height: '64vh', width: '100%', marginTop: 12, overflowY: 'auto' }}>
                                     <DataGrid
                                        rows={alarmReportList}
                                        // rowCount={rowCountState}

                                        // pagination
                                        // page={page}
                                        // pageSize={pageSize}
                                        // paginationMode="server"
                                        // onPageChange={onPageChange}
                                        // onPageSizeChange={onPageSizeChange}
                                        columns={columns}
                                        // rowHeight={70}
                                        // getRowHeight={() => 'auto'}
                                        pageSize={100}
                                    /> 
                                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
                                        <thead>{renderHeaders()}</thead>
                                        <tbody>{renderRows()}</tbody>
                                    </table>
                                </div> */}
                                {gridLoading ? (
                                    <Grid item xs={12}>
                                        <div style={{ width: "100%", textAlign: 'center', padding: '20px', fontSize: '26px', fontWeight: 'bold' }}>
                                            Loading...
                                        </div>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                                        <Box sx={{ height: '60vh', width: '100%' }}>
                                            <DataGrid
                                                rows={dataGridRows}
                                                columns={dataGridColumns}
                                                disableSelectionOnClick
                                                paginationMode="server"
                                                rowCount={rowCount}
                                                page={page}
                                                pageSize={pageSize}
                                                onPageChange={handlePageChange}
                                                onPageSizeChange={handlePageSizeChange}
                                                rowsPerPageOptions={[10, 25, 50, 100]}
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                                                    '& .MuiDataGrid-columnHeaders': {
                                                        backgroundColor: '#f5f5f5',
                                                        color: '#333',
                                                        fontWeight: 'bold',
                                                        borderBottom: '1px solid #e0e0e0',
                                                    },
                                                    '& .MuiDataGrid-virtualScroller': {
                                                        overflowY: 'auto !important',
                                                    },
                                                    // Ensure scrollbar is visible and easy to use
                                                    '& ::-webkit-scrollbar': {
                                                        width: '8px',
                                                        height: '8px',
                                                    },
                                                    '& ::-webkit-scrollbar-track': {
                                                        backgroundColor: '#f1f1f1',
                                                    },
                                                    '& ::-webkit-scrollbar-thumb': {
                                                        backgroundColor: '#888',
                                                        borderRadius: '4px',
                                                    },
                                                    '& ::-webkit-scrollbar-thumb:hover': {
                                                        backgroundColor: '#555',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                )}

                            </Grid>
                        </form>
                        <NotificationBar
                            handleClose={handleClose}
                            notificationContent={openNotification.message}
                            openNotification={openNotification.status}
                            type={openNotification.type}
                        />
                    </Grid>


                </CardContent>
            </Card>
        </Box>
    )
}

export default ReportUserList



