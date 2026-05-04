import React, { useEffect, useState } from 'react'
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';
import { DataGrid } from '@mui/x-data-grid';
// import { Box, Card } from '@mui/material';
import { Box, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Tab, Tabs, Typography } from '@mui/material';
import { movableAssetsDelete, movableAssetsShow } from '../../../../services/LoginPageService';
import ProtocolJSONToolbar from './ProtocolJSONToolbar';
import ProtocolJSONModel from './ProtocolJSONModel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RowdataView from './RowdataView';
import CodeIcon from '@mui/icons-material/Code';
import JSONPacketEdit from './JSONPacketEdit';
import MyComponent from './MyComponent';

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

function ProtocolJSONResult() {
    const columns = [
        {
            field: 'id',
            headerName: 'SLNO',
            flex: 1,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'pathName',
            headerName: 'Json URL',
            width: 130,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'sequence',
            headerName: 'Description',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'coordinates',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            // width: 300,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                <Stack direction='row' spacing={1}>
                    <EditData selectedRow={params.row} />
                    <DeleteData selectedRow={params.row} />
                    <RowData selectedRow={params.row} />
                    <Status selectedRow={params.row} />
                    <CodeEdit selectedRow={params.row} />
                </Stack>
            ],
        },
    ];

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(false);
    const [rowopen, setRowOpen] = useState(false);
    const [jsonopen, setJsonOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editMovabledevice, setEditMovabledevice] = useState([]);
    const [MovabledeviceList, setMovableDeviceList] = useState([]);
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
        movableAssetsShow(handleSuccess, handleException);
        // ProjectShowService(handleProjectSuccess, handleProjectException);

    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setMovableDeviceList(dataObject.data)
    };
    const handleException = () => {

    }

    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditMovabledevice(props.selectedRow);
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

    function RowData(props) {
        return (
            <VisibilityIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    // setEditMovabledevice(props.selectedRow);
                    setRowOpen(true)
                    alert("hi")

                }}
            />
        )
    };
    function Status(props) {
        return (
            <PlayCircleOutlineIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditMovabledevice(props.selectedRow);
                    // setOpen(true);
                    // setRowOpen(true)

                }}
            />
        )
    };
    function CodeEdit(props) {
        return (
            <CodeIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    // setEditMovabledevice(props.selectedRow);
                    setJsonOpen(true)
                    // setRowOpen(true)

                }}
            />
        )
    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
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
        <Box sx={{ width: '100%', height: '85vh', paddingLeft: 2, paddingRight: 2 }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}>
                <CardHeader
                    title={
                        <Box className=' ml-5 '>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="JSON" {...a11yProps(0)} />
                                <Tab label="MQTT" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                    }
                />
                <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-50px' }}>

                    {/* <div style={{ height: 250, width: '100%' }}> */}
                    <TabPanel value={value} index={0}>
                        <div style={{ height: 425, width: '100%' }}> {/* Adjusted for responsive view */}

                            <ProtocolJSONToolbar
                                setIsAddButton={setIsAddButton}
                                setEditMovabledevice={setEditMovabledevice}
                                setOpen={setOpen}
                            />


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
                                // checkboxSelection
                                rows={MovabledeviceList}
                                columns={columns}
                                pageSize={10}
                                rowHeight={38}
                                // loading={isLoading}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                            {/* </div> */}
                            <ProtocolJSONModel
                                isAddButton={isAddButton}
                                editMovabledevice={editMovabledevice}
                                open={open}
                                setOpen={setOpen}
                                setRefreshData={setRefreshData}
                            //   locationDetails={locationDetails}
                            //   deviceId={deviceId}  

                            />
                            <RowdataView
                                open={rowopen}
                                setOpen={setRowOpen}
                            />
                            <JSONPacketEdit
                                open={jsonopen}
                                setOpen={setJsonOpen}
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
                                deleteService={movableAssetsDelete}
                                handleSuccess={deletehandleSuccess}
                                handleException={deletehandleException}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <MyComponent /> */}
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProtocolJSONResult