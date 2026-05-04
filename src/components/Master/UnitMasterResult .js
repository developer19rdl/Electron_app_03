import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';
import NotificationBar from '../notification/ServiceNotificationBar';
import DeviceMasterToolbar from './DeviceMasterToolbar';
import { DeviceMasterCategory, DeviceMasterDelete, SensorMasterCategory, SensorMasterDelete, unitsMasterCategory, unitsMasterDelete } from '../../services/LoginPageService';
import DeviceMasterModule from './DeviceMasterModule';
import SensorMasterModule from './SensorMasterModule ';
import SensorMasterToolbar from './SensorMasterToolbar';
import UnitMasterToolbar from './UnitMasterToolbar ';
import UnitMasterModule from './UnitMasterModule';

function UnitMasterResult() {
    const columns = [

        {
            field: 'unitsName',
            headerName: 'Unit Category Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'unitsDesc',
            headerName: 'Unit Description',
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
    const [editUnitCategory, setEditUnitCategory] = useState([]);
    const [unitcategoryList, setUnitCategoryList] = useState([]);
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
                    setEditUnitCategory(props.selectedRow);
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
        unitsMasterCategory(handleSuccess, handleException);
    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setUnitCategoryList(dataObject.data || []);
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
                <UnitMasterToolbar
                    setIsAddButton={setIsAddButton}
                    setEditUnitCategory={setEditUnitCategory}
                    setOpen={setOpen}
                    editUnitCategory={editUnitCategory}
                />
                <div style={{ height: '65vh', width: '100%', padding: 0 }}>

                    <DataGrid
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none', // Removes the top border of the footer
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
                        rows={unitcategoryList}
                        columns={columns}
                        pageSize={10}
                        rowHeight={38}
                        // loading={isLoading}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                    <UnitMasterModule
                        isAddButton={isAddButton}
                        editUnitCategory={editUnitCategory}
                        open={open}
                        setOpen={setOpen}
                        setRefreshData={setRefreshData}
                        openNotification={openNotification}
                        setNotification={setNotification}
                    />
                    <DeleteConfirmationDailog
                        open={deleteDailogOpen}
                        setOpen={setDeleteDailogOpen}
                        deleteId={deleteId}
                        deleteService={unitsMasterDelete}
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

export default UnitMasterResult 