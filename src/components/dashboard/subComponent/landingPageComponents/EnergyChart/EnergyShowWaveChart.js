import React from 'react'
import Box from '@mui/material/Box';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import DialogContentText from "@mui/material/DialogContentText";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import TimePlot from './WaveChart/TimePlot';
import { WaveGraph } from './WaveChart/WaveGraph';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Grid } from "@mui/material";
import { Height } from '@mui/icons-material';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

const EnergyShowWaveChart = ({ waveOpen, HandleWaveClose, analogSensorList, deviceId }) => {
    const [selectedCardId, setSelectedCardId] = React.useState(null);
    const [Date, setDate] = React.useState("");
    const [Time, setTime] = React.useState("");
    const [fftList, setFftList] = React.useState([]);






    const handleCardClick = (cardId, date, time) => {
        setSelectedCardId(cardId);
        setDate(date),
            setTime(time)
    };

    console.log("date==", Date, "time==", Time)


    return (
        <>
            <Dialog fullScreen maxWidth={false} open={waveOpen} onClose={HandleWaveClose}>
                <DialogTitle
                    sx={{
                        textAlign: "center", // Center the text
                        fontSize: "25px",   // Increase font size\
                        color: "#A5C9FF"
                    }}
                >SPECTRUM
                    <IconButton
                        sx={{
                            position: 'absolute', // Set position to absolute
                            top: 0, // Align to the top
                            right: 10, // Align to the right
                        }}
                        edge="end"
                        color="inherit"
                        onClick={HandleWaveClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item md={12} sm={12} sx={12} lg={12}   >
                            <TimePlot onCardClick={handleCardClick} fftList={fftList} setFftList={setFftList} analogSensorList={analogSensorList} deviceId={deviceId} />
                        </Grid>
                        <Grid item md={12} sm={12} sx={12} lg={12}  >
                            <WaveGraph selectedCardId={selectedCardId} fftList={fftList} deviceId={deviceId} analogSensorList={analogSensorList} Date={Date} Time={Time} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog >


        </>
    )
}

export default EnergyShowWaveChart