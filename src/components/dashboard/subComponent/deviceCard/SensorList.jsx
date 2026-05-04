import { Box, Breadcrumbs, Button, ButtonGroup, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { DeviceForSensorList, graphForSensor, MeterDeployFetchService, SensorUpdateMode } from '../../../../services/LoginPageService';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';


const SensorList = ({ open, setOpen, selectedRow, locationDetails }) => {
    console.log("Sensors000locationDetails1111llllllllll", selectedRow.deviceName)
    const [activeButton, setActiveButton] = useState('today');
    const [sensorModes, setSensorModes] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [sensorlistName, setSensorListName] = useState([]);
    const [selectedRowData, setSelectedRowDAta] = useState('')
    const [graphDataMin, setGraphDatamin] = useState([]);
    const [graphDataMax, setGraphDataMax] = useState([]);
    const [openGraphDialog, setOpenGraphDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleOpenGraph = (row) => {
        setLoading(true)
        graphForSensor(
            {
                id: row.id,
                sortDataType: activeButton
            },
            handleGraphSuccess,
            handleGraphException
        );
        setOpenGraphDialog(true);

    };

    // Success handler
    const handleGraphSuccess = (dataObject) => {
        setLoading(false)

        setGraphDatamin(dataObject?.minValue)
        setGraphDataMax(dataObject?.maxValue)
        // Set data for the graph
        setGraphData(dataObject.data);

    };

    // Exception handler
    const handleGraphException = (error, errorMessage) => {
        console.error("Error fetching graph data:", errorMessage);
        setLoading(false)
        setGraphData([]);

    };

    const sensorColumns = [
        { field: 'tagName', headerName: 'Sensor Name', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'updated_at', headerName: 'Last Updated Date', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'slaveId', headerName: 'Slave Id', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'sensorValue', headerName: 'Value', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'unitCategoryName', headerName: 'Units', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'alertCount', headerName: 'Active Alerts', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'alertStatus', headerName: 'Status', flex: 1, align: "center", headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            align: "center",
            headerAlign: 'center',
            renderCell: (params) => (
                <IconButton onClick={() => {
                    handleOpenGraph(params.row);
                    setSelectedRowDAta(params.row);
                    setSensorListName(params.row.tagName);
                }
                } color="primary">
                    <TrendingUpIcon />
                </IconButton>
            )
        }
    ];
    useEffect(() => {

        if (open) {

            DeviceForSensorList({

                id: selectedRow.id
            }, handleSuccess, handleException);
        } else {
            setSensorModes([]);
        }
        if (openGraphDialog) {
            graphForSensor(
                {
                    id: selectedRowData.id,
                    sortDataType: activeButton
                },
                handleGraphSuccess,
                handleGraphException
            );
        }

    }, [open, selectedRow, activeButton, selectedRowData]); // This will re-run only when selectedRow changes

    // Handle mode changes




    const handleSuccess = (dataObject) => {
        // setRefreshData((oldvalue) => !oldvalue);

        setSensorModes(dataObject?.data || [])

    };
    const handleException = (errorObject, errorMesaage) => {
        setSensorModes([]);
    };

    // Define the columns for the sensor DataGrid

    const onClose = () => {
        // alert('hii')
        setOpen(false)
    };
    return (
        <>
            <Dialog open={open} maxWidth="xl" fullWidth
                sx={{ "& .MuiDialog-paper": { width: "900px", marginTop: "70px", marginLeft: "200px" } }}>
                <Paper elevation={3} className={'h-full'} style={{ boxShadow: 'none' }}>
                    <CardHeader
                        title={
                            <Breadcrumbs aria-label="breadcrumb" separator="›" fontSize='20px' fontWeight='800' >
                                <h3 className='font-[Roboto, sans-serif] font-semibold tracking-[1px] p-1 text-black text-[21px]'>
                                    {selectedRow?.deviceName} Sensor List
                                </h3>
                            </Breadcrumbs>
                        }
                        sx={{ paddingBottom: 0 }}
                    />
                    <CardContent className={'h-[81%] sm:h-[90%]'} style={{ fontFamily: 'customfont' }} >
                        <Box sx={{ height: '100%' }}>
                            <DataGrid
                                columns={sensorColumns}
                                rows={sensorModes}
                                pageSize={5}
                                rowHeight={38}
                                autoHeight
                                getRowClassName={(params) => {
                                    if (params.row.sensorMode === "Disable") {
                                        return "row-disable";
                                    } else if (params.row.sensorMode === "Configure") {
                                        return "row-configure";
                                    } else if (params.row.sensorMode === "Enable") {
                                        return "row-enable";
                                    } else {
                                        return '';
                                    }
                                }}
                                sx={{
                                    borderRadius: '13px',
                                    "& .MuiDataGrid-cell:focus-within": {
                                        outline: "none",
                                    },
                                    "& .MuiDataGrid-row": {
                                        backgroundColor: "white",
                                    },
                                    "& .MuiDataGrid-row.row-disable": {
                                        backgroundColor: "#FFA7A7",
                                        "&:hover": {
                                            backgroundColor: "#FFA7A7",
                                        },
                                    },
                                    "& .MuiDataGrid-row.row-enable": {
                                        backgroundColor: "#A5DD9B",
                                        "&:hover": {
                                            backgroundColor: "#A5DD9B",
                                        },
                                    },
                                    "& .MuiDataGrid-row.row-configure": {
                                        backgroundColor: "#FFEC9E",
                                        "&:hover": {
                                            backgroundColor: "#FFEC9E",
                                        },
                                    },
                                }}
                            />
                        </Box>

                    </CardContent>
                </Paper>
                {/* </Card> */}
                <DialogActions>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openGraphDialog} maxWidth="md" fullWidth>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>{sensorlistName} Trends
                    <ButtonGroup variant="outlined" aria-label="outlined button group" size='small'>
                        <Button
                            onClick={() => setActiveButton('today')}

                            sx={{
                                padding: '1px 12px',
                                backgroundColor: activeButton === 'today' ? 'primary.main' : 'transparent',
                                color: activeButton === 'today' ? 'white' : 'inherit',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                },
                            }}
                        >
                            Today
                        </Button>
                        <Button
                            onClick={() => setActiveButton('yesterday')}
                            sx={{
                                backgroundColor: activeButton === 'yesterday' ? 'primary.main' : 'transparent',
                                color: activeButton === 'yesterday' ? 'white' : 'inherit',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                },
                            }}
                        >
                            Yestarday
                        </Button>


                    </ButtonGroup>
                </DialogTitle>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <DialogContent>

                        {graphData.length > 0 ? ( // Ensure data exists before rendering chart
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="timestamp" />
                                    <YAxis />
                                    {/* <Legend
                                        formatter={() => "Value     Date"}
                                    /> */}
                                    <Legend
                                        payload={[
                                            { value: "Value", type: "line", color: "blue" },
                                            { value: "Date", type: "line", color: "black" }
                                        ]}
                                    />
                                    <Tooltip
                                        labelFormatter={(label) => `Date: ${label}`}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="blue" name="Value" />
                                    <ReferenceLine y={graphDataMin} label="Min" stroke="red" strokeDasharray="3 3" />
                                    <ReferenceLine y={graphDataMax} label="Max" stroke="green" strokeDasharray="3 3" />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <Typography variant="body1" color="textSecondary">No data available</Typography>
                        )}
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={() => {
                        setOpenGraphDialog(false);
                        setGraphData([]);
                        setActiveButton('today')
                    }} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default SensorList
