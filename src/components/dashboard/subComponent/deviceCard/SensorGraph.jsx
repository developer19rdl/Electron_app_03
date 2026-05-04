import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { DeviceForSensorList, MeterDeployFetchService, SensorUpdateMode } from '../../../../services/LoginPageService';

const SensorGraph = ({ open, onClose, selectedRow, locationDetails }) => {
    console.log("Sensors000locationDetails1111llllllllll", locationDetails)
    // const [refreshData, setRefreshData] = useState(false);
    const [sensorModes, setSensorModes] = useState([]);

    const sensorColumns = [
        // { field: 'id', headerName: 'Sensor ID', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'meterName', headerName: 'Sensor Name', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'dssd', headerName: 'Last Updated Time', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'fgddf', headerName: 'Last Updated Value', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'dsfd', headerName: 'Units', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'dsfsd', headerName: 'Active Alerts', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'ddsfsd', headerName: 'Status', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'dddsfsd', headerName: 'Actions', flex: 1, align: "center", headerAlign: 'center' },
        // { field: 'sensorOutPut', headerName: 'Sensor Output', flex: 1, align: "center", headerAlign: 'center' },
        // {
        //     field: 'sensorMode',
        //     headerName: 'Mode', align: "center", headerAlign: 'center',
        //     flex: 1,
        //     renderCell: (params) => (

        //         <Select
        //             value={params.row.sensorMode}
        //             onChange={(event) => handleModeChange(event, params)}
        //             fullWidth
        //             sx={{
        //                 '& .MuiOutlinedInput-notchedOutline': {
        //                     border: 'none',
        //                 }
        //             }}
        //         >
        //             <MenuItem value="Enable">Enable</MenuItem>
        //             <MenuItem value="Disable">Disable</MenuItem>
        //         </Select>
        //         // </div>
        //     ),
        // },
    ];
    // const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = locationDetails;
    useEffect(() => {
        if (open) {

            DeviceForSensorList({
                // locationId: locationDetails.locationId,
                // branchId: locationDetails.branchId,
                // facilityId: locationDetails.facilityId,
                // buildingId: locationDetails.buildingId,
                // floorId: locationDetails.floorId,
                // zoneId: locationDetails.zoneId,
                id: selectedRow.id
            }, handleSuccess, handleException);
        } else {
            setSensorModes([]);
        }
    }, [open, selectedRow]); // This will re-run only when selectedRow changes

    // Handle mode changes
    const handleModeChange = (event, params) => {
        const newMode = event.target.value;
        SensorUpdateMode(
            {
                meterId: params.row.id, // Ensure you are passing the correct ID or identifier if needed
                sensorMode: newMode
            },
            handleSensorModeSuccess,
            handleSensorModeException
        );
    };
    const handleSensorModeSuccess = () => {
        DeviceForSensorList({
            // locationId: locationDetails.locationId,
            // branchId: locationDetails.branchId,
            // facilityId: locationDetails.facilityId,
            // buildingId: locationDetails.buildingId,
            // floorId: locationDetails.floorId,
            // zoneId: locationDetails.zoneId,
            id: selectedRow.id
        }, handleSuccess, handleException);
    };

    // Exception handler for the API call
    const handleSensorModeException = (error) => {
        // Handle exception logic here (e.g., showing an error message)
        console.error('Error updating mode:', error);
    };

    const handleSuccess = (dataObject) => {
        // setRefreshData((oldvalue) => !oldvalue);

        setSensorModes(dataObject?.data || [])
    };
    const handleException = (errorObject, errorMesaage) => {
        setSensorModes([]);
    };

    // Define the columns for the sensor DataGrid
    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth
            sx={{ "& .MuiDialog-paper": { width: "900px", marginTop: "250px", marginLeft: "200px" } }}>
            <Paper elevation={3} className={'h-full'} style={{ boxShadow: 'none' }}>
                <CardHeader
                    title={
                        <Breadcrumbs aria-label="breadcrumb" separator="›" fontSize='20px' fontWeight='800' >
                            <h3 className='font-[Roboto, sans-serif] font-semibold tracking-[1px] p-1 text-black text-[21px]'>
                                Sensor for Device</h3>
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
                            onRowClick={handleRowClick}
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
    );
};
export default SensorGraph
