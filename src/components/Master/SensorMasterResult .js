import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';
import NotificationBar from '../notification/ServiceNotificationBar';
import DeviceMasterToolbar from './DeviceMasterToolbar';
import { DeviceMasterCategory, DeviceMasterDelete, SensorMasterCategory, SensorMasterDelete } from '../../services/LoginPageService';
import DeviceMasterModule from './DeviceMasterModule';
import SensorMasterModule from './SensorMasterModule ';
import SensorMasterToolbar from './SensorMasterToolbar';

function SensorMasterResult() {
    const columns = [

        {
            field: 'sensorCategory',
            headerName: 'Sensor Category Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'sensorDescription',
            headerName: 'Sensor Description',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            flex: 1,
            cellClassName: 'actions',
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
            ],
        },
    ];
    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editsensorCategory, setEditSensorCategory] = useState([]);
    const [sensorcategoryList, setSensorCategoryList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [deleteId, setDeleteId] = useState('');
    const [refreshData, setRefreshData] = useState(false);
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    function EditData(props) {
        return (

            <EditIcon
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditSensorCategory(props.selectedRow);
                    setOpen(true);
                }}
                style={{ cursor: 'pointer' }}
            />
        );
    }
    function DeleteData(props) {
        return (
            <DeleteIcon
                onClick={() => {
                    setDeleteId(props.selectedRow.id);
                    setDeleteDailogOpen(true)
                }}
                style={{ cursor: 'pointer' }}
            />
        );
    }
    useEffect(() => {
        SensorMasterCategory(handleSuccess, handleException);
    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setSensorCategoryList(dataObject || []);
    };

    const handleException = () => {
    };

    const deletehandleSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setRefreshData((oldvalue) => !oldvalue);
        setTimeout(() => {
            handleClose();
            setDeleteDailogOpen(false);
        }, 3000);
    };

    const deletehandleException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    return (
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            {/* <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}> */}

            <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px' }}>

                {/* <div style={{ height: 425, width: '100%' }}> */}
                <SensorMasterToolbar
                    setIsAddButton={setIsAddButton}
                    setEditSensorCategory={setEditSensorCategory}
                    setOpen={setOpen}
                    editsensorCategory={editsensorCategory}
                />
                <div style={{ height: '65vh', width: '100%', padding: 0 }}>

                    <DataGrid
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none', // This removes the top border of the footer (pagination area)
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
                        rows={sensorcategoryList}
                        columns={columns}
                        pageSize={10}
                        rowHeight={38}
                        // loading={isLoading}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                    <SensorMasterModule
                        isAddButton={isAddButton}
                        editsensorCategory={editsensorCategory}
                        open={open}
                        setOpen={setOpen}
                        setRefreshData={setRefreshData}
                        setNotification={setNotification}
                    />
                    <DeleteConfirmationDailog
                        open={deleteDailogOpen}
                        setOpen={setDeleteDailogOpen}
                        deleteId={deleteId}
                        deleteService={SensorMasterDelete}
                        handleSuccess={deletehandleSuccess}
                        handleException={deletehandleException}
                    />
                    <NotificationBar
                        handleClose={handleClose}
                        notificationContent={openNotification.message}
                        openNotification={openNotification.status}
                        type={openNotification.type}
                    />
                </div>


            </CardContent>
            {/* </Card> */}
        </Box>
    )
}

export default SensorMasterResult 