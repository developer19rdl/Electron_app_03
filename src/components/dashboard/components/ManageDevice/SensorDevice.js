import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Select, Typography } from '@mui/material'
import { SensorDeviceList } from '../../../../services/LoginPageService';
import { DataGrid } from '@mui/x-data-grid';
import NotificationBar from '../../../notification/ServiceNotificationBar';


const SensorDevice = ({ open, onClose, selectedRow, }) => {
    const sensorColumns = [
        { field: 'id', headerName: 'Sensor ID', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'sensorName', headerName: 'Sensor Name', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'SimulationType', headerName: 'Simulation Type', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'sensorType', headerName: 'Sensor Type', flex: 1, align: "center", headerAlign: 'center' },
        { field: 'sensorStatus', headerName: 'Sensor Status', flex: 1, align: "center", headerAlign: 'center' },
    ];
    // console.log("11111111111>>>", selectedRow)
    const [deviceSensorList, setdeviceSensorList] = useState([]);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        if (open) {
            SensorDeviceList({
                motorId: selectedRow.id
            }, handleSuccess, handleException);
        }

    }, [open, selectedRow]);

    const handleSuccess = (dataObject) => {
        // setRefreshData((oldvalue) => !oldvalue);

        setdeviceSensorList(dataObject?.data || [])
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);
        setTimeout(() => {
            // resetForm();
            handleClose();
            // setProgressStatus(1);
        }, 3000);
        // setRefreshData((oldvalue) => !oldvalue);
    };
    const handleException = (errorObject, errorMesaage) => {
        setdeviceSensorList([]);
        setNotification({
            status: true,
            type: 'error',
            message: errorMesaage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    };
    const handleClose = () => {
        // setSensorOpen(false)
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" style={{ borderRadius: '45px' }}>
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
                            rows={deviceSensorList}
                            pageSize={5}
                            rowHeight={38}
                            autoHeight
                            sx={{
                                border: '',
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: '', // This removes the top border of the footer (pagination area)
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: 'none', // Removes the bottom border between cells
                                },
                                '& .MuiDataGrid-row': {
                                    '&:hover': {
                                        backgroundColor: '#ffffff', // Removes hover background
                                    },
                                },
                                '& .MuiDataGrid-row:nth-of-type(odd)': {
                                    backgroundColor: '#f5f5f5', // Light gray for odd rows
                                },
                                '& .MuiDataGrid-row:nth-of-type(even)': {
                                    backgroundColor: '#ffffff', // White for even rows
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
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Dialog>
    )
}

export default SensorDevice