import React from 'react';
import { Box, Container } from '@mui/material';
import PlantAlertListResults from '../components/PlantAlert/PlantAlertListResults';

const MeterGeneralAlertSettings = () => {

    return (
        <>
            <Container maxWidth={false}>
                <Box sx={{ mt: 1 }} >
                    <PlantAlertListResults />
                </Box>
            </Container>
        </>
    );
};

export default MeterGeneralAlertSettings;
