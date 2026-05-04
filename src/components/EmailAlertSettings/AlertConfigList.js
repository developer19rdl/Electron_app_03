import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    Box, Card, CardContent, Tooltip, Tabs, Tab, Typography, CardHeader,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { SettingAlertDelete, ShowEmailAlert, ShowSettingAlert } from '../../services/LoginPageService';
import AlertConfigTools from '../EmailAlertSettings/AlertConfigTools';
import AlertConfigModel from '../EmailAlertSettings/AlertConfigModel';
import NotificationBar from '../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';



const AlertConfigList = () => {
    const [rows, setRow] = useState([]);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editAlertSetUp, setEditAlertSetUp] = useState('');
    const [open, setOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [isLoading, setGridLoading] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const columns = [
        {
            field: 'alert_type',
            headerName: 'Alert Type',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'alert_subject',
            headerName: 'Alert Subject',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'send_to',
            headerName: 'User Send Alert',
            minWidth: 170,
            align: 'center',
            flex: 1,
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

    ]
    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditAlertSetUp(props.selectedRow);
                    setOpen(true);
                }}
            />
        )
    };
    function DeleteData(props) {
        return (
            <DeleteIcon

                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setDeleteId(props.selectedRow.id);
                    setDeleteDailogOpen(true)
                }}
            />
        );
    };

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };


    useEffect(() => {
        ShowSettingAlert(handleShowAlertSuccess, handleShowAlertException);
    }, [refreshData]);

    const handleShowAlertSuccess = (dataObject) => {
        setRow(dataObject?.data || []);
    };

    const handleShowAlertException = () => {

    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

        <div style={{ height: 425, width: '100%' }}> {/* Adjusted for responsive view */}
            <AlertConfigTools
                setIsAddButton={setIsAddButton}
                setEditAlertSetUp={setEditAlertSetUp}
                setOpen={setOpen}
                editAlertSetUp={editAlertSetUp}
            />

            <AlertConfigModel
                isAddButton={isAddButton}
                editAlertSetUp={editAlertSetUp}
                setEditAlertSetUp={setEditAlertSetUp}
                open={open}
                setOpen={setOpen}
                setRefreshData={setRefreshData}
                handleClose={handleClose}
                openNotification={openNotification}
                setNotification={setNotification}
            />

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                rowHeight={38}
                loading={isLoading}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
                style={{ backgroundColor: '#ffffff' }}
                sx={{
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none', // This removes the top line above pagination
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none', // Removes the bottom border between cells
                    },
                    border: 'none',
                    // marginTop: '-14px'
                }}
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
                deleteService={SettingAlertDelete}
                handleSuccess={deletehandleSuccess}
                handleException={deletehandleException}
            />
        </div>



    )
}

export default AlertConfigList

