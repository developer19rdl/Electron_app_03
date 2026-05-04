import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


import info from './../../../../images/icons/tool.png'

import {
    Box,
    Card,
    Grid,
    CardActionArea,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';


const AssetCard = (props) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleCardClick = () => {
        // Call the onCardClick function with the necessary data
        props.onCardClick(true, props.id, props.deviceId, props.assetName);

    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    border: '2px solid #ccc',
                    borderColor: '#00ffff',
                }}
                onClick={handleCardClick}
            >
                <CardActionArea sx={{ boxShadow: 5, height: '100%' }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        backgroundColor={props.inActiveMeterStatus == 0 ? '#E8E2E2' : '#00FF00'}
                        pl={2}
                        pr={2}
                        pt={1}
                        pd={1}
                    >
                        <Grid item xs={4}>
                            <Typography
                                sx={{
                                    color: '#434242',
                                    fontWeight: '500',
                                    maxWidth: '100px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {props.meterName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography
                                sx={{
                                    color: '#434242',
                                    fontWeight: '500',
                                    maxWidth: '100px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {props.assetName}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                        >
                            <Typography
                                sx={{
                                    color: '#434242',
                                    fontWeight: '500',
                                    maxWidth: '100px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    marginLeft: "65%",
                                    borderRadius: "25%"

                                }}

                            >
                                <img
                                    src={info} // Replace with the correct path to your JPG imag
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop event propagation
                                        handleDialogOpen(); // Open the dialog
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />

                            </Typography>
                        </Grid>
                    </Grid>
                    {props.inActiveMeterStatus == 0 ? (
                        <Typography
                            sx={{
                                width: '100%',
                                borderRadius: '2',
                                backgroundColor: '#61677A',
                                fontSize: '4rem',
                                color: 'gray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px', // Adjust padding as needed
                            }}
                        >
                            Inactive
                        </Typography>
                    ) : (
                        <Box sx={{ width: '100%', borderRadius: '2', backgroundColor: '#09090c', p: 2 }}>
                            {props.isUnbalance == 1 && (
                                <Tooltip title="Unbalance Status" enterDelay={500}>
                                    <WarningIcon sx={{ position: 'absolute', top: 4, left: 1, color: 'red' }} />
                                </Tooltip>
                            )}

                            <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={9}>
                                <Typography fontSize={14} color="#ffff" variant="body1" gutterBottom>
                                    <span style={{ fontSize: '20px', color: '#00ffff' }}> {props.avxVoltage}</span> V
                                </Typography>
                                <Typography fontSize={14} color="#ffff" variant="body1" gutterBottom>
                                    <span style={{ fontSize: '20px', color: '#00ffff' }}>{props.Frequency}</span> Hz
                                </Typography>
                            </Stack>
                            <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={8}>
                                <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                                    <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.kw}</span> kW
                                </Typography>
                                <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                                    <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.PowerFactor}</span> PF
                                </Typography>
                            </Stack>
                            <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
                                <Typography fontSize={14} m={1} color="#00ffff" variant="body1" gutterBottom>
                                    <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.kwh}</span> kWh
                                </Typography>
                            </Stack>
                            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography fontSize={19} color="#ffff" >Voltage</Typography>
                                    <Typography style={{ fontSize: '20px', color: '#00ffff' }} >{props.avxVoltage}</Typography>
                                    <Typography fontSize={14} color="#ffff" >V</Typography>
                                </div>
                                <div>
                                    <Typography fontSize={19} color="#ffff" >Current</Typography>
                                    <Typography style={{ fontSize: '20px', color: '#00ffff' }} >{props.kwh}</Typography>
                                    <Typography fontSize={14} color="#ffff" >kWh</Typography>
                                </div>
                            </div> */}
                        </Box>
                    )}
                </CardActionArea>
            </Card>
            <Dialog open={openDialog} onClose={handleDialogClose} fullWidth={true} maxWidth={'md'} sx={{ marginLeft: "5%" }}>
                <DialogTitle>ODR</DialogTitle>
                <DialogContent>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                        <thead style={{ background: '#f2f2f2' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Observation</th>
                                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Diagnostic</th>
                                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Recommendation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                                    In Machine Recirculating Pump. Current is stable in R phase with 0 amps in Y and B. Voltage is stable. Power factor is low.
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                                    Current phase loss in Y and B phase.
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                                    Stop the equipment.
                                    Check connections and connectivity for Y and B phase.
                                </td>
                            </tr>
                            {/* Add more rows if needed */}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AssetCard;
