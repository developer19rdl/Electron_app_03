import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    Box, Card, CardContent, Tooltip, Tabs, Tab, Typography, CardHeader,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { EmailAlertDelete, ShowEmailAlert } from '../../services/LoginPageService';
import EmailConfigTools from './EmailConfigTools';
import EmailConfigModel from './EmailConfigModel';
import AlertConfigList from '../EmailAlertSettings/AlertConfigList';
import NotificationBar from '../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';
import ProtocolConfiglist from '../ProtocolConfigure/ProtocolConfiglist';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const EmailConfigList = () => {
    const [value, setValue] = React.useState(0);

    const [rows, setRow] = useState([]);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editEmailConfigSetup, setEditEmailConfigSetup] = useState('');
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
            field: 'security_type',
            headerName: 'Security Type',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'smtp_server',
            headerName: 'SMTP Server',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'fromUser',
            headerName: 'Email From',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },

        {
            field: 'port',
            headerName: 'Port',
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
                    setEditEmailConfigSetup(props.selectedRow);
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
        ShowEmailAlert(handleShowEmailSuccess, handleShowEmailException);
    }, [refreshData]);

    const handleShowEmailSuccess = (dataObject) => {
        setRow(dataObject?.data || []);
    };

    const handleShowEmailException = () => {

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
        <Box sx={{ width: '100%', height: '85vh', padding: 2 }}>
            <Card className={'mt-[8px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px' }}>
                <CardHeader
                    title={
                        <Box className=' ml-5 '>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Email Settings" {...a11yProps(0)} />
                                <Tab label="Alert Settings" {...a11yProps(1)} />
                                <Tab label="Protocol Settings" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                    }
                />
                <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-45px' }}>
                    <TabPanel value={value} index={0}>

                        <div style={{ height: 425, width: '100%' }}> {/* Adjusted for responsive view */}
                            <EmailConfigTools
                                setIsAddButton={setIsAddButton}
                                setEditEmailConfigSetup={setEditEmailConfigSetup}
                                setOpen={setOpen}
                                editEmailConfigSetup={editEmailConfigSetup}
                            />

                            <EmailConfigModel
                                isAddButton={isAddButton}
                                editEmailConfigSetup={editEmailConfigSetup}
                                setEditEmailConfigSetup={setEditEmailConfigSetup}
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
                                // style={{ backgroundColor: '#ffffff' }}
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
                                deleteService={EmailAlertDelete}
                                handleSuccess={deletehandleSuccess}
                                handleException={deletehandleException}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <AlertConfigList />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ProtocolConfiglist />
                    </TabPanel>

                </CardContent>
            </Card>
        </Box>
    )
}

export default EmailConfigList

