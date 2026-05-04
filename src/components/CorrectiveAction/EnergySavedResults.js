import React, {
    useState, useEffect
} from 'react'
import {
    Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { AssetDeleteService, AssetFetchService, AvgBalanceAddServiceDeleteService, AvgBalanceAddServiceFetchService, CorrectiveActionAssetService, CorrectiveActionDeleteService, CorrectiveActionFetchService, FetchMeterService, MachineEnergySavedFetchService, PlantAlertSettingsDeleteService, PlantAlertSettingsFetchService } from '../../services/LoginPageService'


const EnergySavedResults = ({ locationId, setLocationId, branchId, setBranchId, facilityId, setFacilityId, buildingId, setBuildingId, setFloorId, floorId, setZoneId, zoneId, deviceList }) => {

    const columns = [
        {
            field: 'assetName',
            headerName: 'Asset Name',
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
            field: 'EnergySavingInstance',
            headerName: 'Energy Saving Instance',
            minWidth: 130,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'energySavings',
            headerName: 'Energy Saving (kWh)',
            minWidth: 100,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'co2EmissionAvoid',
            headerName: 'C02 Emissions Avoided',
            minWidth: 90,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },

    ];








    const [deviceId, setDeviceId] = useState('');
    const [assetId, setAssetId] = useState('');

    const [meterList, setMeterList] = useState([]);
    const [machineLevelEnergySavedData, setMachineLevelEnergySavedData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [isLoading, setGridLoading] = useState(true);


    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setMachineLevelEnergySavedData(dataObject?.data || []);
    };

    const handleException = (errorObject) => {

    };


    useEffect(() => {
        MachineEnergySavedFetchService(handleSuccess, handleException);
    }, [refreshData]);







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
        <div>
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

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        style={{marginTop:15}}
                        rows={machineLevelEnergySavedData}
                        columns={columns}
                        pageSize={5}
                        loading={isLoading}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            </Grid>

        </div>
    )
}

export default EnergySavedResults
