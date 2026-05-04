import React, { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { FetchEsdValueBarChart, FetchEsdValueLineChart, FetchTotalEnergyPerHourValueBarChart } from '../../../../../services/LoginPageService';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CircularProgress from '@mui/material/CircularProgress';

import moment from 'moment';
import EnergyPerHourZoomedChart from './SubZoomedChart/EnergyPerHourZoomedChart';
import { debounce } from 'lodash';


const EnergyPerHourBarChart = ({ meterTagId, deviceId, dataFetched, dopen, sortDataType, fromDate, toDate }) => {

    const [totalEnergyPerHour, setTotalEnergyPerHour] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);




    // useEffect(() => {
    //     FetchTotalEnergyPerHourValueBarChart({ meterId: meterTagId, deviceId }, EsdValueBarChartHandleSuccess, EsdValueBarChartHandleException);
    // }, [meterTagId]);
    useEffect(() => {
        if (dopen && !dataFetched) {
            setLoading(true);
            FetchTotalEnergyPerHourValueBarChart({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, EsdValueBarChartHandleSuccess, EsdValueBarChartHandleException);
        }
    }, []);



    const EsdValueBarChartHandleSuccess = (dataObject) => {
        const data = dataObject.data.map((item) => {
            let formattedValue;

            if (sortDataType === 'week') {
                formattedValue = moment(item.date_hour).format('dddd'); // Display the day for the week
            } else if (sortDataType === 'month') {
                formattedValue = moment(item.date_hour).format('MMMM YYYY'); // Display the month and year for the month
            } else if (sortDataType === 'year') {
                formattedValue = moment(item.date_hour).format('YYYY'); // Display the year for the year
            } else {
                formattedValue = moment(item.date_hour).format('h:mm A'); // Display the time for other cases
            }

            return {
                ...item,
                date_hour: formattedValue,
            };
        });

        setLoading(false);
        setTotalEnergyPerHour(data);
    };

    const EsdValueBarChartHandleException = () => {
        setLoading(false);
    }

    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleZoomClick = () => {
        setOpen(true);
    };




    return (
        <>
            <Typography variant="subtitle1" gutterBottom style={{ position: 'absolute', top: 5, left: 15 }} >
                Energy/HR
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
                    <BarChart data={totalEnergyPerHour}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_hour" />
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
                        <Bar dataKey="EnergyPerHour" fill="#22c1e2" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            <EnergyPerHourZoomedChart totalEnergyPerHour={totalEnergyPerHour} handleClose={handleClose} open={open} />
        </>
    )
}

export default EnergyPerHourBarChart 