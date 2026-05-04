import React, { useState, useEffect } from 'react';
import {
    Button, Grid, Box, Dialog, DialogContent, DialogTitle, TextField, Typography, Stack, Chip,
} from '@mui/material';
import giphy1 from '../../../images/giphy1.gif';
import { EnergyDashboardInform } from '../../../services/LoginPageService';

const PlantWidget = (props) => {
    const [totalEnergy, setTotalEnergy] = useState(0);
    const [energySaving, setEnergySaving] = useState(0);
    const [equivalentCO2, setEquivalentCO2] = useState(0);

    const { locationId, branchId, facilityId, buildingId, floorId } = props.locationData;


    // console.log("buildingId", props.totalActive)

    const handleSuccess = (dataObject) => {
        if (dataObject) {
            setTotalEnergy(dataObject.totalConsumption);
            setEnergySaving(dataObject.totalEnergySaving);
            setEquivalentCO2(dataObject.EquivalentCO2);
        }
    }

    const handleException = () => {
        // Handle error or exception here
    };
    useEffect(() => {
        // EnergyDashboardInform({ locationId, branchId, facilityId, buildingId }, handleSuccess, handleException);
    }, [props.locationCoordinationList, locationId, branchId, facilityId, buildingId, floorId]);
    return (
        <Grid container spacing={0} sx={{ height: '100%', }}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%', p: 1, color: 'green', backgroundColor: '#212121', }}>
                    <img src={giphy1} alt="Total Power Consumption" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Typography variant="body1" sx={{ color: '#f7f9fc', position: 'relative', zIndex: 2, marginBottom: 0 }}>
                        Total Active Devices
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#00ffff', position: 'relative', zIndex: 2, marginTop: 3 }}>
                        {props.totalActive}
                        {/* <Typography variant="body1" component="span" sx={{ fontSize: '1rem' }}>
                            kWh
                        </Typography> */}
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%', p: 1, color: 'green', backgroundColor: '#212121', }}>
                    <img src={giphy1} alt="Total Power Consumption" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Typography variant="body1" sx={{ color: 'White', position: 'relative', zIndex: 2, marginBottom: 0 }}>
                        Total Number Of Devices
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#00ffff', position: 'relative', zIndex: 2, marginTop: 3 }}>
                        {props.totalNumber}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%', p: 1, color: 'green', backgroundColor: '#212121', }}>
                    <img src={giphy1} alt="Total Power Consumption" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Typography variant="body1" sx={{ color: 'White', position: 'relative', zIndex: 2, marginBottom: 0 }}>
                        Total Sensors
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#00ffff', position: 'relative', zIndex: 2, marginTop: 3 }}>
                        {props.totalTags}

                        {/* <Typography variant="body1" component="span" sx={{ fontSize: '1rem' }}>
                            kWh
                        </Typography> */}
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%', p: 1, color: 'green', backgroundColor: '#212121', }}>
                    <img src={giphy1} alt="Total Power Consumption" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Typography variant="body1" sx={{ color: 'White', position: 'relative', zIndex: 2, marginBottom: 0 }}>
                        Networks
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#00ffff', position: 'relative', zIndex: 2, marginTop: 3 }}>
                        {equivalentCO2}{' '}
                        {/* 85{' '} */}
                        {/* <Typography variant="body1" component="span" sx={{ fontSize: '1rem' }}>
                            kg
                        </Typography> */}
                    </Typography>
                </Box>

            </Grid>
        </Grid>
    );
};

export default PlantWidget;
