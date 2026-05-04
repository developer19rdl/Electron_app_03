import React, {
    useState, useEffect
} from 'react'
import DeleteConfirmationDailog from '../../utils/confirmDeletion'
import NotificationBar from '../notification/ServiceNotificationBar'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useUserAccess } from '../../../src/context/UserAccessProvider';
import { AssetDeleteService, AssetFetchService, AvgBalanceAddServiceDeleteService, AvgBalanceAddServiceFetchService, PlantAlertSettingsDeleteService, PlantAlertSettingsFetchService } from '../../services/LoginPageService'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AvgBalanceToolbar from './AvgBalanceToolbar'
import AvgBalanceModel from './AvgBalanceModel'

const AvgBalanceResults = () => {

    const columns = [
        {
            field: 'locationName',
            headerName: 'Location',
            minWidth: 130,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'branchName',
            headerName: 'Branch',
            minWidth: 100,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'facilityName',
            headerName: 'Facility',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'buildingName',
            headerName: 'Building',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'avgBalanceValue',
            headerName: '3 Months Average Energy Bill',
            minWidth: 220,
            align: 'center',
            flex: 1,
            headerAlign: 'center',
            valueFormatter: (params) => params.value + ' kWh'
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

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

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
        AvgBalanceAddServiceFetchService(handleSuccess, handleException);
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
        <div style={{ height: 400, width: '100%' }}>

            <AvgBalanceToolbar
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
            <AvgBalanceModel
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
                deleteService={AvgBalanceAddServiceDeleteService}
                handleSuccess={deletehandleSuccess}
                handleException={deletehandleException}
            />
        </div>
    )
}

export default AvgBalanceResults
