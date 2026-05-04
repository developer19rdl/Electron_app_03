import React, { useEffect, useState } from 'react'
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';
import { DataGrid } from '@mui/x-data-grid';
import ManageDevcieToolbar from './ManageDevcieToolbar';
import ManageDeviceModel from './ManageDeviceModel';
import { Box, Card, CardContent, CardHeader, Checkbox, Fab, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DeviceManageDelete, DeviceManagementStatus, DeviceManageService, ProjectShowService } from '../../../../services/LoginPageService';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import SensorsIcon from '@mui/icons-material/Sensors';
import ManageSensorDevice from './SensorDevice';
import SensorDevice from './SensorDevice';

function ManageDeviceresult({ }) {

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
            headerName: 'Device Id',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'motorName',
            headerName: 'Device Name',
            width: 130,
            sortable: true,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'motorDescription',
            headerName: 'Device Category',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'status',
            headerName: 'Type',
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
            field: 'protocol',
            headerName: 'Protocol',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'pollingInterval',
            headerName: 'Polling Time',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'serverName',
            headerName: 'Server',
            flex: 1,
            sortable: true,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'deviceStatus',
            headerName: 'Device Status',
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
                // <SensorData selectedRow={params.row} />,

            ],
        },
    ];

    const handleCheckboxChange = (event, id) => {
        const updatedRows = MdeviceList.map((row) =>
            row.id === id ? { ...row, selected: event.target.checked } : row
        );
        setMDeviceList(updatedRows);
    };

    const handleSelectAllChange = (event) => {
        setSelectAll(event.target.checked);
        const isChecked = event.target.checked;
        const updatedRows = MdeviceList.map(row => {
            return { ...row, selected: isChecked };
        });
        setMDeviceList(updatedRows);
    };


    const handleEnable = () => {
        // Filter the selected items and extract their ids
        const selectedIds = MdeviceList
            .filter((item) => item.selected === true)  // Filter the selected items
            .map((data) => data.id);  // Extract only the ids of the selected items

        DeviceManagementStatus({
            selectAll: selectAll,  // Pass the selectAll state
            ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
            mode: "1",  // Mode is set to "1"
        }, statusSuccess, statusException);
    };
    const statusSuccess = (dataObject) => {
        // Handle the successful response here
        DeviceManageService({
            project_id: Project
        }, handleSuccess, handleException);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    };

    const statusException = (errorObject, errorMessage) => {

    }
    const handleDisable = () => {
        // Filter the selected items and extract their ids
        const selectedIds = MdeviceList
            .filter((item) => item.selected === true)  // Filter the selected items
            .map((data) => data.id);  // Extract only the ids of the selected items

        DeviceManagementStatus({
            selectAll: selectAll,  // Pass the selectAll state
            ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
            mode: "0",  // Mode is set to "1"
        }, statusdisableSuccess, statusDisableException);
    };
    const statusdisableSuccess = (dataObject) => {
        // Handle the successful response here
        DeviceManageService({
            project_id: Project
        }, handleSuccess, handleException);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    };

    const statusDisableException = (errorObject, errorMessage) => {

    };

    const [centerLat, setCenterLat] = useState(23.500);
    const [centerLng, setCenterLng] = useState(80.500);
    console.log("11111", centerLat, centerLng)

    const [open, setOpen] = useState(false);
    const [sensoropen, setSensorOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editMdevice, setEditMdevice] = useState([]);
    const [MdeviceList, setMDeviceList] = useState([]);
    console.log("MdeviceListMdeviceList", MdeviceList)
    const [ProjectList, setProjectList] = useState([]);
    const [Project, setProject] = useState('');
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
        DeviceManageService({
            project_id: Project
        }, handleSuccess, handleException);
        ProjectShowService(handleProjectSuccess, handleProjectException);

    }, [refreshData, Project]);

    const handleProjectSuccess = (dataObject) => {
        // setGridLoading(false);
        setProjectList(dataObject);
    };
    const handleProjectException = (errorObject) => {
    };
    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        // setMDeviceList(dataObject?.data || []);
        setMDeviceList(
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
                    setEditMdevice(props.selectedRow);
                    setProject(props.selectedRow.project_id);
                    setOpen(true);

                }}
            />
        )
    };
    function SensorData(props) {
        return (
            <SensorsIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditMdevice(props.selectedRow);
                    // setProject(props.selectedRow.project_id);
                    setSensorOpen(true);

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
        setSensorOpen(false)
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
            {/* <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', paddingTop: '25px' }}> */}
            {/* <CardHeader

                /> */}
            <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px' }}>

                {/* <div style={{ height: 250, width: '100%' }}> */}

                <ManageDevcieToolbar
                    setIsAddButton={setIsAddButton}
                    setEditMdevice={setEditMdevice}
                    setOpen={setOpen}
                    projectId={Project}
                    showNotification={showNotification}
                    MdeviceList={MdeviceList}
                    setMDeviceList={setMDeviceList}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex"
                >
                    {/* <Grid item xs={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Project</InputLabel>
                            <Select
                                value={Project}
                                label="Project"
                                onChange={(e) => {
                                    setProject(e.target.value);

                                }}
                            >
                                <MenuItem value="" key={0}>
                                    <em style={{ fontWeight: 'bold' }}>All</em>
                                </MenuItem>
                                {ProjectList.map((data, index) => (
                                    <MenuItem value={data.id} key={index + 1}>
                                        {data.projectName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> */}

                </Grid>
                <div style={{ height: '57.8vh', width: '100%', padding: 0 }}>

                    <DataGrid
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none', // Removes the top border of the footer (pagination area)
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none', // Removes the bottom border between cells
                            },
                            "& .MuiDataGrid-row": {
                                backgroundColor: "white", // Default color is white for rows without a mode
                            },
                            // Apply colors based on sensorStatus
                            '& .enabled': {
                                backgroundColor: "#d4edda", // Light green for enabled rows
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
                        // checkboxSelection
                        rows={MdeviceList}
                        columns={columns}
                        pageSize={10}
                        rowHeight={38}
                        // loading={isLoading}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        getRowClassName={(params) =>
                            params.row.deviceStatus === 'enabled' ? 'enabled' : 'disabled'
                        }
                    />
                    {/* </div> */}
                    <ManageDeviceModel
                        isAddButton={isAddButton}
                        editMdevice={editMdevice}
                        open={open}
                        setOpen={setOpen}
                        setRefreshData={setRefreshData}
                        //   locationDetails={locationDetails}
                        projectId={Project}
                        centerCoord={{ lat: centerLat, lng: centerLng }}


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
                        deleteService={DeviceManageDelete}
                        handleSuccess={deletehandleSuccess}
                        handleException={deletehandleException}
                    />
                </div>
                <SensorDevice open={sensoropen} onClose={handleClose} selectedRow={editMdevice} />

            </CardContent>
            {/* </Card> */}
        </Box >
    )
}

export default ManageDeviceresult

