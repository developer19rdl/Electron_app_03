import React from 'react'
import Grid from '@mui/material/Grid';
import { Warning } from '@mui/icons-material';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import MeterCard from './MeterCard';
import AssetCard from './AssetCard';

const AllAssetInfoBuilding = ({ setOpen, analogSensorList, setSelectedAsset }) => {

    const handleAssetCardClick = (isOpen, meterId, deviceId, meterTag) => {
        setOpen(isOpen);
        setSelectedAsset({ meterId, deviceId, meterTag });
        console.log("asset clicked meterId, deviceId", meterId, deviceId, isOpen, meterTag)

    };
    return (
        <div style={{ height: '300px', overflow: 'auto' }}>

            <Grid container spacing={2} >
                {analogSensorList.map((data) => {
                    return (
                        <Grid mt={1} item xs={12} sm={6} md={3} lg={3} xl={3} key={data.id}>
                            <AssetCard
                                // setOpen={setOpen}
                                onCardClick={handleAssetCardClick} // Pass the handler function
                                id={data.meterId}
                                deviceId={data.deviceId}
                                parameterName={data.parameterName}
                                Frequency={data.frequency}
                                Voltage={data.avgVoltage}
                                avxVoltage={data.avxVoltage}
                                PowerFactor={data.powerFactor}
                                kw={data.kw}
                                kwh={data.kwh}
                                deviceName={data.deviceName}
                                assetName={data.assetName}
                                meterName={data.meterName}
                                inActiveMeterStatus={data.inActiveMeterStatus}
                                sensorData={data.analogSensorList}
                                isUnbalance={data.isUnbalance}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
}

export default AllAssetInfoBuilding
