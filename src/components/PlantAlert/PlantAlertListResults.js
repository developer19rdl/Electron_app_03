import React, {
    useState, useEffect
} from 'react'
import PlantAlertToolbar from './PlantAlertToolbar'
import PlantAlertModalComponent from './PlantAlertModalComponent'
import DeleteConfirmationDailog from '../../utils/confirmDeletion'
import NotificationBar from '../notification/ServiceNotificationBar'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useUserAccess } from '../../../src/context/UserAccessProvider';
import { AssetDeleteService, AssetFetchService, PlantAlertSettingsDeleteService, PlantAlertSettingsFetchService, SearchDeviceDataService } from '../../services/LoginPageService'
import ManagementPlantAlert from '../../pages/PlantManagement/ManagementPlantAlert'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AvgBalanceResults from '../AvgBalance/AvgBalanceResults'
import CorrectiveActionResults from '../CorrectiveAction/CorrectiveActionResults'
import EnergySavedResults from '../CorrectiveAction/EnergySavedResults'


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PlantAlertListResults = () => {
    const [value, setValue] = React.useState(0);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const columns = [
        {
            field: 'locationName',
            headerName: 'Location',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'branchName',
            headerName: 'Branch',
            minWidth: 170,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'facilityName',
            headerName: 'Facility',
            minWidth: 100,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'buildingName',
            headerName: 'Building',
            minWidth: 100,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'PFMin',
            headerName: 'Power Factor Min',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'PFMax',
            headerName: 'Power Factor Max',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'FrequencyMin',
            headerName: 'Frequency Min',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'FrequencyMax',
            headerName: 'Frequency Max',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'voltageMin',
            headerName: 'Voltage Min',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'voltageMax',
            headerName: 'Voltage Max',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'totalConsumMin',
            headerName: 'Consumption Min',
            minWidth: 200,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'totalConsumMax',
            headerName: 'Consumption Max',
            minWidth: 200,
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
    const [assetList, setAssetList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const moduleAccess = useUserAccess()('device');




    const [locationId, setLocationId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [facilityId, setFacilityId] = useState('');
    const [buildingId, setBuildingId] = useState('');
    const [floorId, setFloorId] = useState('');
    const [zoneId, setZoneId] = useState('');
    const [deviceList, setDeviceList] = useState([]);


    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        SearchDeviceDataService({
            locationId, branchId, facilityId, buildingId, floorId, zoneId,
        }, DeviceHandleSuccess, DeviceHandleException);
    }, [locationId, branchId, facilityId, buildingId, floorId, zoneId]);

    const DeviceHandleSuccess = (dataObject) => {
        setDeviceList(dataObject.data || []);
    };
    const DeviceHandleException = () => { };


    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setAssetList(dataObject?.data || []);
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
        PlantAlertSettingsFetchService(handleSuccess, handleException);
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

    return (
        <>
            <ManagementPlantAlert
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
                setZoneId={setZoneId}

            />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Plant Alert" {...a11yProps(0)} />
                        {/* <Tab label="Energy Bill" {...a11yProps(1)} />
                        <Tab label="Corrective Action" {...a11yProps(1)} />
                        <Tab label="Energy Saved" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div style={{ height: 400, width: '100%' }}>
                        <PlantAlertToolbar
                            setIsAddButton={setIsAddButton}
                            setEditConfigSetup={setEditConfigSetup}
                            setOpen={setOpen}
                            editConfigSetup={editConfigSetup}
                            userAccess={moduleAccess}
                        />
                        <DataGrid
                            rows={assetList}
                            columns={columns}
                            pageSize={5}
                            loading={isLoading}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                        <PlantAlertModalComponent
                            locationId={locationId}
                            setLocationId={setLocationId}
                            branchId={branchId}
                            setBranchId={setBranchId}
                            facilityId={facilityId}
                            setFacilityId={setFacilityId}
                            buildingId={buildingId}
                            setBuildingId={setBuildingId}

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
                            deleteService={PlantAlertSettingsDeleteService}
                            handleSuccess={deletehandleSuccess}
                            handleException={deletehandleException}
                        />
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <AvgBalanceResults />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <CorrectiveActionResults
                        locationId={locationId}
                        setLocationId={setLocationId}
                        branchId={branchId}
                        setBranchId={setBranchId}
                        facilityId={facilityId}
                        setFacilityId={setFacilityId}
                        buildingId={buildingId}
                        setBuildingId={setBuildingId}
                        setFloorId={setFloorId}
                        floorId={floorId}
                        setZoneId={setZoneId}
                        zoneId={zoneId}
                        deviceList={deviceList} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <EnergySavedResults
                        locationId={locationId}
                        setLocationId={setLocationId}
                        branchId={branchId}
                        setBranchId={setBranchId}
                        facilityId={facilityId}
                        setFacilityId={setFacilityId}
                        buildingId={buildingId}
                        setBuildingId={setBuildingId}
                        setFloorId={setFloorId}
                        floorId={floorId}
                        setZoneId={setZoneId}
                        zoneId={zoneId}
                        deviceList={deviceList} />
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default PlantAlertListResults