import { Box, Fab, Stack, Typography } from '@mui/material';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const SensorMasterToolbar = (props) => {
    return (
        <Box
            sx={{
                // mb: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography
                sx={{ m: 1 }}
                variant="h5"
            >
                Sensor Category
            </Typography>
            {/* {props.userAccess.add && ( */}
            <Box sx={{ m: 1 }}>
                <Stack direction="row" spacing={2}>
                    <Fab
                        variant="extended"
                        size="medium"



                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}
                        onClick={() => {
                            props.setIsAddButton(true);
                            props.setEditSensorCategory([]);
                            props.setOpen(true);
                        }}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Add Sensor
                    </Fab>
                </Stack>
            </Box>
            {/* )} */}
        </Box>
    )
}

export default SensorMasterToolbar