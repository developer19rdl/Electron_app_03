import React, { useEffect, useState } from 'react'
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';
import { DataGrid } from '@mui/x-data-grid';
import ManageDevcieToolbar from './ManageSensorDevcieToolbar';
import ManageDeviceModel from './ManageSensorDeviceModel';
import { Box, Card, CardContent, CardHeader, Checkbox, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DeviceManageDelete, DeviceManagementStatus, DeviceManageService, DeviceSensorStatus, ProjectShowService, SensorManageDelete, SensorManageService } from '../../../../services/LoginPageService';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import SensorsIcon from '@mui/icons-material/Sensors';
import ManageSensorDevice from './SensorDeviceShow';
import SensorDevice from './SensorDeviceShow';
import ManageSensorDevcieToolbar from './ManageSensorDevcieToolbar';
import ManageSensorDeviceModel from './ManageSensorDeviceModel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SensorDeviceShow from './SensorDeviceShow';


function ManageSensorDeviceresult({ }) {

    const [selectAll, setSelectAll] = useState(false);

    const columns = [
        {
            field: 'selected',
            headerClassName: 'super-app-theme--header',
            headerName: <span style={{ fontWeight: 'bold', fontSize: '16px' }}></span>,
            type: 'number',
            sortable: true,
            width: 120,
            align: 'center', headerAlign: 'center',
            renderHeader: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
                    <span style={{ marginLeft: '5px', fontWeight: 'bold', fontSize: '16px' }}></span>
                </div>
            ),
            renderCell: (params) => (
                <Checkbox
                    checked={params.row.selected}
                    onChange={(e) => handleCheckboxChange(e, params.row.id)}
                />
            ),
        },

        {
            field: 'id',
            headerName: 'Sensor Id',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'sensorName',
            headerName: 'Sensor Name',
            width: 130,
            sortable: true,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'sensorType',
            headerName: 'Sensor Type',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'sensorCategory',
            headerName: 'Sensor Category',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },


        {
            field: 'motorCategory',
            headerName: 'Device Category',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'motorName',
            headerName: 'Device Name',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'locationName',
            headerName: 'Location',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'SimulationType',
            headerName: 'Simulator Type',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'sensorStatus',
            headerName: 'Sensor Status',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            sortable: true,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
                <ViewData selectedRow={params.row} />,

            ],
        },
    ];

    const handleCheckboxChange = (event, id) => {
        const updatedRows = sensordeviceList.map((row) =>
            row.id === id ? { ...row, selected: event.target.checked } : row
        );
        setSensorDeviceList(updatedRows);
    };

    const handleSelectAllChange = (event) => {
        setSelectAll(event.target.checked);
        const isChecked = event.target.checked;
        const updatedRows = sensordeviceList.map(row => {
            return { ...row, selected: isChecked };
        });
        setSensorDeviceList(updatedRows);
    };



    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [open, setOpen] = useState(false);
    const [sensoropen, setSensorOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editsensordevice, setEditSensordevice] = useState([]);
    const [sensordeviceList, setSensorDeviceList] = useState([]);
    // console.log("sensordeviceListMdeviceList", sensordeviceList)
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    // const moduleAccess = useUserAccess()('ManageDevice');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    useEffect(() => {
        SensorManageService(handleSuccess, handleException);
        // ProjectShowService(handleProjectSuccess, handleProjectException);

    }, [refreshData,]);


    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        // setSensorDeviceList(dataObject?.data || []);
        setSensorDeviceList(
            (dataObject?.data || []).map((item) => ({
                ...item,
                selected: false, // Convert 1 to true, 0 to false
            }))
        );
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
                    setEditSensordevice(props.selectedRow);
                    // setProject(props.selectedRow.project_id);
                    setOpen(true);

                }}
            />
        )
    };
    function ViewData(props) {
        return (
            <VisibilityIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRowData(props.selectedRow);
                    setViewDialogOpen(true);
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
                    setDeleteDailogOpen(true)
                }}
            />
        );
    };
    const handleClose = () => {
        setViewDialogOpen(false)
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
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', paddingTop: '25px' }}>
                {/* <CardHeader

                /> */}
                <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px', }}>

                    {/* <div style={{ height: 250, width: '100%' }}> */}

                    <ManageSensorDevcieToolbar
                        setIsAddButton={setIsAddButton}
                        setEditSensordevice={setEditSensordevice}
                        setOpen={setOpen}
                        sensordeviceList={sensordeviceList}
                        setSensorDeviceList={setSensorDeviceList}
                        showNotification={showNotification}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                    />

                    <div style={{ height: '71vh', width: '100%', padding: 0 }}>

                        <DataGrid
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: 'none', // Removes the top border of the footer (pagination area)
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: 'none', // Removes the bottom border between cells
                                },
                                '& .MuiDataGrid-row': {
                                    '&:hover': {
                                        backgroundColor: 'white', // Ensures no hover color change
                                    },
                                },
                                '& .enabled': {
                                    backgroundColor: "#d4edda", // d4edda Light green for enabled rows
                                    '&:hover': {
                                        backgroundColor: "#d4edda", // Keep same color on hover for enabled rows
                                    },
                                },
                                '& .disabled': {
                                    backgroundColor: "#ecacac", // Light green for enabled rows
                                    '&:hover': {
                                        backgroundColor: "#ecacac", // Keep same color on hover for enabled rows
                                    },
                                },

                            }}
                            rows={sensordeviceList}
                            columns={columns}
                            pageSize={10}
                            rowHeight={38}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            getRowClassName={(params) =>
                                params.row.sensorStatus === 'enabled' ? 'enabled' : 'disabled'
                            }
                        />
                    </div>
                    <ManageSensorDeviceModel
                        isAddButton={isAddButton}
                        editsensordevice={editsensordevice}
                        open={open}
                        setOpen={setOpen}
                        setRefreshData={setRefreshData}
                    //   locationDetails={locationDetails}
                    // projectId={Project}

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
                        deleteService={SensorManageDelete}
                        handleSuccess={deletehandleSuccess}
                        handleException={deletehandleException}
                    />
                    {/* </div> */}
                    <SensorDeviceShow open={viewDialogOpen} setViewDialogOpen={setViewDialogOpen} selectedRowData={selectedRowData} onClose={handleClose} /*selectedRow={selectedRow}*/ />

                </CardContent>
            </Card>
        </Box >
    )
}

export default ManageSensorDeviceresult

