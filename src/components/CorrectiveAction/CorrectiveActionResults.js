import React, {
    useState, useEffect
} from 'react'
import DeleteConfirmationDailog from '../../utils/confirmDeletion'
import NotificationBar from '../notification/ServiceNotificationBar'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useUserAccess } from '../../context/UserAccessProvider';
import { AssetDeleteService, AssetFetchService, AvgBalanceAddServiceDeleteService, AvgBalanceAddServiceFetchService, CorrectiveActionAssetService, CorrectiveActionDeleteService, CorrectiveActionFetchService, FetchMeterService, PlantAlertSettingsDeleteService, PlantAlertSettingsFetchService } from '../../services/LoginPageService'
import PropTypes from 'prop-types';
import AvgBalanceToolbar from './AvgBalanceToolbar'
import AvgBalanceModel from './CorrectiveActionModel'
import CorrectiveActionToolbar from './AvgBalanceToolbar';
import CorrectiveActionModel from './CorrectiveActionModel';
import {
    Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
} from '@mui/material';

const CorrectiveActionResults = ({ locationId, setLocationId, branchId, setBranchId, facilityId, setFacilityId, buildingId, setBuildingId, setFloorId, floorId, setZoneId, zoneId, deviceList }) => {

    const columns = [
        {
            field: 'problemStatement',
            headerName: 'Problem Statement',
            minWidth: 130,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'correctiveAction',
            headerName: 'Corrective Action',
            minWidth: 100,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'fromDate',
            headerName: 'From Date',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'meterName',
            headerName: 'Meter Name',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'assetName',
            headerName: 'Asset Name',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            align: 'center',
            flex: 1,
            cellClassName: 'actions',
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
            ],
        },
    ];

    const [open, setOpen] = useState(false);
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [isAddButton, setIsAddButton] = useState(true);
    const [editConfigSetup, setEditConfigSetup] = useState([]);
    const [machineCorrectiveList, setMachineCorrectiveList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const moduleAccess = useUserAccess()('device');

    const [deviceId, setDeviceId] = useState('');

    const [assetId, setAssetId] = useState('');

    const [meterList, setMeterList] = useState([]);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setMachineCorrectiveList(dataObject?.data || []);
    };

    const handleException = (errorObject) => {

    };

    function DeleteData(props) {
        return moduleAccess.delete && (
            <DeleteIcon onClick={() => {
                setDeleteId(props.selectedRow.id);
                setDeleteDailogOpen(true);
            }}
            />
        );
    }

    useEffect(() => {
        CorrectiveActionFetchService(handleSuccess, handleException);
    }, [refreshData]);

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

    function EditData(props) {
        return (moduleAccess.edit
            && (
                <EditIcon onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditConfigSetup(props.selectedRow);
                    setOpen(true);
                }}
                />
            ));
    }

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };


    const HandleDeviceChange = (deviceId) => {

        if (deviceId) {

            CorrectiveActionAssetService({ deviceId }, MeterHandleSuccess, MeterHandleException);
        }

        setDeviceId(deviceId);
    };
    const MeterHandleSuccess = (dataObject) => {
        setMeterList(dataObject.data || []);

    };

    const MeterHandleException = () => { };

    return (

        <>
            <Grid container spacing={1} alignItems="center">
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={2}
                    xl={3}
                >
                    <FormControl fullWidth size="small">
                        <InputLabel>Devices</InputLabel>
                        <Select
                            value={deviceId}
                            label="Devices"
                            onChange={(e) => {
                                HandleDeviceChange(e.target.value);
                            }}
                        >
                            <MenuItem value="" key={0}>
                                <em style={{ fontWeight: 'bold' }}>All</em>
                            </MenuItem>
                            {deviceList?.map((data, index) => (
                                <MenuItem value={data.id} key={index + 1}>{data.deviceName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={2}
                    xl={3}
                >
                    <FormControl fullWidth size="small">
                        <InputLabel>Assets</InputLabel>
                        <Select
                            value={assetId}
                            label="Devices"
                            onChange={(e) => {
                                setAssetId(e.target.value)
                            }}
                        >
                            <MenuItem value="" key={0}>
                                <em style={{ fontWeight: 'bold' }}>All</em>
                            </MenuItem>
                            {meterList?.map((data, index) => (
                                <MenuItem value={data.id} key={index + 1}>{data.assetName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>





            </Grid>
            <div style={{ height: 400, width: '100%' }}>


                <CorrectiveActionToolbar
                    setIsAddButton={setIsAddButton}
                    setEditConfigSetup={setEditConfigSetup}
                    setOpen={setOpen}
                    editConfigSetup={editConfigSetup}
                    userAccess={moduleAccess}
                />

                <DataGrid
                    rows={machineCorrectiveList}
                    columns={columns}
                    pageSize={5}
                    loading={isLoading}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
                <CorrectiveActionModel
                    locationId={locationId}
                    setLocationId={setLocationId}
                    branchId={branchId}
                    setBranchId={setBranchId}
                    facilityId={facilityId}
                    setFacilityId={setFacilityId}
                    buildingId={buildingId}
                    setBuildingId={setBuildingId}
                    floorId={floorId}
                    setFloorId={setFloorId}
                    zoneId={zoneId}
                    assetId={assetId}
                    deviceId={deviceId}
                    setZoneId={setZoneId}
                    isAddButton={isAddButton}
                    configSetupData={editConfigSetup}
                    open={open}
                    setOpen={setOpen}
                    setRefreshData={setRefreshData}
                    handleClose={handleClose}
                    openNotification={openNotification}
                    setNotification={setNotification}
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
                    deleteService={CorrectiveActionDeleteService}
                    handleSuccess={deletehandleSuccess}
                    handleException={deletehandleException}
                />
            </div>
        </>
    )
}

export default CorrectiveActionResults
