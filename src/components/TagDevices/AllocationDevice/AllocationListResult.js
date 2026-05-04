import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import NotificationBar from '../notification/ServiceNotificationBar';
import {
    Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
} from '@mui/material';
import { AllocationTagToolbar } from './AllocationTagToolbar';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import NotificationBar from '../../notification/ServiceNotificationBar';
import AllocateModel from './AllocateModel';
import { AssetsDeviceShow, TagAllocationDelete } from '../../../services/LoginPageService';

export function AllocationListResult() {

    const columns = [
        {
            field: 'sNo',
            headerName: 'SL No',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center',
            valueGetter: (params) => params.api.getRowIndex(params.id) + 1
        },
        {
            field: 'tagsName',
            headerName: 'Tag Name',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },

        {
            field: 'assetName',
            headerName: 'Asset Name',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'devCateName',
            headerName: 'Device Category',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'slaveId',
            headerName: 'Slave Id',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'deviceName',
            headerName: 'Device Name',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'minWarningAlert',
            headerName: 'Warning Min',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'maxWarningAlert',
            headerName: 'Warning Max',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'minOutRangeAlert',
            headerName: 'OutOfRange Min',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'maxOutRangeAlert',
            headerName: 'OutOfRange Max',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'minCriticalValue',
            headerName: 'Critical Min',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'maxCriticalValue',
            headerName: 'Critical Max',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'email',
            headerName: 'E-mail',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center',
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                <EditData selectedRow={params.row} />, <DeleteData selectedRow={params.row} />,
            ],
        },
    ];

    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [edittagAllocation, setEditTagAllocation] = useState([]);
    const [tagAllocationList, setTagAllocationList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);


    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {

        AssetsDeviceShow(
            handleAssetSuccess,
            handleAssetException)
    }, [refreshData])

    const handleAssetSuccess = (dataObject) => {
        setGridLoading(false);
        setTagAllocationList(dataObject.data)
    }

    const handleAssetException = () => {

    }


    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setTagAllocationList(dataObject.data);
    };

    const handleException = (errorObject) => {
    };






    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditTagAllocation(props.selectedRow);
                    setOpen(true);
                }}
            />
        );
    }

    function DeleteData(props) {
        return (
            <DeleteIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setDeleteId(props.selectedRow.id);
                    setDeleteDailogOpen(true);
                }}
            />
        );
    }

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const showNotification = (type, message) => {
        setNotification({
            status: true,
            type: type,
            message: message,
        });
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




    return (
        <>
            <div style={{ height: 250, width: '100%' }}>
                <AllocationTagToolbar
                    setIsAddButton={setIsAddButton}
                    setEditTagAllocation={setEditTagAllocation}
                    setOpen={setOpen}
                    showNotification={showNotification}
                />
                <div style={{ height: '52vh', width: '100%', padding: 0 }}>

                    <DataGrid
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none', // This removes the top border of the footer (pagination area)
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none', // Removes the bottom border between cells
                            },
                        }}
                        rows={tagAllocationList}
                        columns={columns}
                        pageSize={10}
                        rowHeight={38}
                        loading={isLoading}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                </div>
                <AllocateModel
                    isAddButton={isAddButton}
                    edittagAllocation={edittagAllocation}
                    open={open}
                    setOpen={setOpen}
                    setRefreshData={setRefreshData}

                />
                <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
                <DeleteConfirmationDailog
                    open={deleteDailogOpen}
                    setOpen={setDeleteDailogOpen}
                    deleteId={deleteId}
                    deleteService={TagAllocationDelete}
                    handleSuccess={deletehandleSuccess}
                    handleException={deletehandleException}
                />
            </div>
        </>
    );
}