import React, { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { FetchEsdValueLineChart, FetchTotalEnergyValueBarChart } from '../../../../../services/LoginPageService';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PerDayZoomedChart from './SubZoomedChart/PerDayZoomedChart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';



const EnergyPerDayBarChart = ({ meterTagId, deviceId, dataFetched, dopen, sortDataType, fromDate, toDate }) => {
    const [totalEnergyConsumption, setTotalEnergyConsumption] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     FetchTotalEnergyValueBarChart({ meterId: meterTagId, deviceId }, TotalEnergyBarChartHandleSuccess, TotalEnergyBarChartHandleException);
    // }, [meterTagId]);


    useEffect(() => {
        if (dopen && !dataFetched) {
            setLoading(true);
            FetchTotalEnergyValueBarChart({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, TotalEnergyBarChartHandleSuccess, TotalEnergyBarChartHandleException);
        }
    }, []);


    const TotalEnergyBarChartHandleSuccess = (dataObject) => {
        setTotalEnergyConsumption(dataObject.data);
        setLoading(false);
    }

    const TotalEnergyBarChartHandleException = () => {
        setLoading(false);

    }

    const handleClose = () => {
        setOpen(false);
    };


    const handleZoomClick = () => {
        setOpen(true);
    };

    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };


    return (
        <>
            <Typography variant="subtitle1" gutterBottom style={{ position: 'absolute', top: 5, left: 15 }} >
                Temperature
            </Typography>

            <IconButton
                style={{ position: 'absolute', top: 1, right: 1 }}
                onClick={handleZoomClick}
            >
                <ZoomInIcon style={{ color: 'white' }} />
            </IconButton>

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (

                <ResponsiveContainer width="100%" height="85%">
                    <BarChart width={400} height={200} data={totalEnergyConsumption}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="day"
                            tickFormatter={(day) => {
                                let formattedTime;

                                if (sortDataType === "week") {
                                    formattedTime = moment(day).format("ddd"); // Display abbreviated day names for the week
                                } else if (sortDataType === "month") {
                                    formattedTime = moment(day).format("MMMM YYYY"); // Display the month and year for the month
                                } else if (sortDataType === "year") {
                                    formattedTime = moment(day).format("YYYY"); // Display the year for the year
                                } else {
                                    formattedTime = moment(day).format("YYYY-MM-DD"); // Display the default format for other cases
                                }

                                console.log("Formatted Time:", formattedTime);

                                return formattedTime;
                            }} />
                        <YAxis domain={["auto", "auto"]}
                            padding={{ top: 30, bottom: 20 }} >
                            <Label
                                value="KWh"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            />
                        </YAxis>
                        <Tooltip contentStyle={tooltipStyles} />
                        <Bar dataKey="EnergyPerDay" fill="#f73b5a" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            <PerDayZoomedChart totalEnergyConsumption={totalEnergyConsumption} handleClose={handleClose} open={open} />
        </>

    )
}

export default EnergyPerDayBarChart