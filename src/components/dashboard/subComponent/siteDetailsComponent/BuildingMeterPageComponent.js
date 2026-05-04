import React, { useState, useEffect } from 'react';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Widget from '../../../widget/Widget';
import ApplicationStore from '../../../../utils/localStorageUtil';
import { BuildingMeterListDetails } from '../../../../services/LoginPageService';
import AllAssetInfoBuilding from '../landingPageComponents/AllAssetInfoBuilding';
import EnergyMeterComponent from '../landingPageComponents/EnergyMeterComponent';



const BuildingMeterPageComponent = ({ locationDetails, setIsDashBoard }) => {
    const intervalSec = 100000;
    const [meterList, setMeterList] = useState([]);
    const [totalMeters, setTotalMeters] = useState(0);
    const [open, setOpen] = useState(false);

    // const [assetOpen, setAssetOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({ meterId: null, deviceId: null, meterTag: null });

    useEffect(() => {
        intervalCallFunction();
        /* eslint-disable-next-line */
        if (open === false) {
            const devicePolling = setInterval(() => {
                intervalCallFunction();
            }, intervalSec);
            return () => {
                clearInterval(devicePolling);
            };
        }
    }, [locationDetails, open]);


    const intervalCallFunction = () => {
        BuildingMeterListDetails({ buildingId: locationDetails.buildingId }, fetchMeterListSuccess, fetchMeterListException);
    };
    const fetchMeterListSuccess = (dataObject) => {

        setMeterList(dataObject?.data || []);
        setTotalMeters(dataObject.totalMeter)
        setBackdropOpen(false);

    };

    const fetchMeterListException = () => {
    };





    return (
        <div style={{
            height: '98%', width: '100%', marginTop: 10, marginLeft: 7, paddingLeft: 2, paddingTop: 0,
        }}
        >
            <div
                style={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}>

                <Button
                    variant="outlined"
                    style={{ marginLeft: '10px' }}
                    startIcon={<ArrowBack />}
                    onClick={() => {
                        setIsDashBoard(0);
                    }}
                >
                    Back to Building
                </Button>
            </div>
            <div className="widgets" style={{ height: 'auto', backgroundColor: '#fafafa', padding: 3 }}>
                <div className="widgets" style={{
                    height: 'auto', backgroundColor: '#fafafa', padding: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%'
                }}>
                    <Widget type="devices" totalSensors={totalMeters} />
                    {/* <Widget type="alerts" setAlertOpen={setAlertOpen} totalAlerts={totalAlerts} /> */}
                    {/* <Widget type="aqi" setAlertOpen={setAQITrendOpen} aqi={aqiIndex} /> */}
                    <Widget type="time" />
                </div>




            </div>
            <AllAssetInfoBuilding
                setOpen={setOpen}
                analogSensorList={meterList}

                setSelectedAsset={setSelectedAsset}

            />
            <EnergyMeterComponent
                open={open}
                setOpen={setOpen}
                deviceId={selectedAsset.deviceId}
                meterTagId={selectedAsset.meterId}
                meterTag={selectedAsset.meterTag}
                analogSensorList={meterList}
            />

        </div>
    )
}

export default BuildingMeterPageComponent
