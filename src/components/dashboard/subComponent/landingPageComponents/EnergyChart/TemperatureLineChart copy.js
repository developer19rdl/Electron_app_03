import React, { useEffect, useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ReferenceArea, Label } from 'recharts';
import { FetchCurrentRYBPF } from '../../../../../services/LoginPageService';
import { Box, Button, IconButton, Tooltip as MuiTooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import CurrentRYBZoomedChart from './SubZoomedChart/CurrentRYBZoomedChart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import moment from 'moment'; // Import moment for date formatting
import CurrentImbalance from './SubZoomedChart/UnbalnseChart/CurrentImbalance';
import CircularProgress from '@mui/material/CircularProgress';



const TemperatureLineChart = ({ meterTagId, deviceId, sortDataType, fromDate, toDate, dataFetched, setDataFetched, dopen }) => {
    const [chartData, setChartData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openCurrentImbalance, setOpenCurrentImbalance] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCurrentImbalanceOpen, setIsCurrentImbalanceOpen] = useState(false); // New state variable
    const [xAxisTicks, setXAxisTicks] = useState([]);


    // useEffect(() => {
    //     FetchCurrentRYBPF({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchCurrentRYBPFHandleSuccess, FetchCurrentRYBPFHandleException);
    // }, [deviceId, meterTagId, sortDataType]);

    console.log("chartData==", chartData)

    useEffect(() => {
        if (dopen && !dataFetched) {
            setLoading(true);
            FetchCurrentRYBPF({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchCurrentRYBPFHandleSuccess, FetchCurrentRYBPFHandleException);
        }
    }, []);

    const memoizedChartData = useMemo(() => chartData, [chartData]);

    const FetchCurrentRYBPFHandleSuccess = (dataObject) => {
        const transformedData = dataObject.data.map(({ time, 'R Current': R, 'Y Current': Y, 'B Current': B, PF }) => {
            let formattedValue;

            if (sortDataType === 'week') {
                formattedValue = moment(time).format('dddd'); // Display the day for the week
            } else if (sortDataType === 'month') {
                formattedValue = moment(time).format('MMMM YYYY'); // Display the month and year for the month
            } else if (sortDataType === 'year') {
                formattedValue = moment(time).format('YYYY'); // Display the year for the year
            } else {
                formattedValue = moment(time).format('h:mm A'); // Display the default format for other cases
            }

            return {
                created_at: formattedValue,
                'R Current': parseFloat(R),
                'Y Current': parseFloat(Y),
                'B Current': parseFloat(B),
                PF
            };
        });
        let customTicks;
        if (sortDataType === "today") {
            // Show all hours for today/day
            customTicks = transformedData.filter((item, index) => index % 5 === 0).map((item) => item.created_at);

        } else if (sortDataType === "day") {
            // Show days of the week for week
            customTicks = transformedData
                .filter((item, index) => index % 10 === 0)
                .map((item) => item.created_at);
        } else if (sortDataType === "week") {
            // Show days of the week for week
            customTicks = [...new Set(transformedData.map((item) => item.created_at))];
        } else if (sortDataType === "month") {
            // Show unique dates for month
            customTicks = [...new Set(transformedData.map((item) => item.created_at))];
        } else if (sortDataType === "year") {
            // Show unique years for year
            customTicks = [...new Set(transformedData.map((item) => item.created_at))];
        }


        setLoading(false);
        setChartData(transformedData);
        setXAxisTicks(customTicks);
    };
    const FetchCurrentRYBPFHandleException = () => {
        setLoading(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleZoomClick = () => {
        setOpen(true);
    };


    const HandleCurrentImbalanceClose = () => {
        setOpenCurrentImbalance(false);
    };

    const HandleCurrentImbalanceClick = () => {
        setIsCurrentImbalanceOpen(true);
        setOpenCurrentImbalance(true);
    };





    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };


    const yAxisDataMargin = 0.2;


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


            <MuiTooltip title="Current Unbalance" >
                <IconButton
                    style={{ position: 'absolute', top: 0.8, right: 80 }}
                    onClick={HandleCurrentImbalanceClick}
                >
                    <SsidChartIcon style={{ color: '#33BBC5', fontWeight: '400px' }} />
                </IconButton>
            </MuiTooltip>


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
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="created_at"
                            ticks={xAxisTicks}
                        />

                        <YAxis
                            domain={['auto', 'auto']}
                            padding={{ top: 20, bottom: 20 }}
                        >
                            <Label
                                value="I"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            />
                        </YAxis>
                        <Tooltip
                            contentStyle={tooltipStyles}

                        />                        <Legend />
                        {/* <Line type="monotone" dataKey="R Current" stroke="#FE0000" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="Y Current" stroke="#F4D160" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="B Current" stroke="#4E4FEB" dot={false} strokeWidth={3} /> */}
                        <Line type="monotone" dataKey="Temp" stroke="#e91e63" className="chart-line" dot={false} strokeWidth={3} />
                        {/* <Brush dataKey="time" height={30} stroke="#8884d8" /> */}
                    </LineChart>
                </ResponsiveContainer>
            )}

            <CurrentRYBZoomedChart chartData={memoizedChartData} handleClose={handleClose} open={open} xAxisTicks={xAxisTicks} />
            {isCurrentImbalanceOpen && (
                <CurrentImbalance
                    sortDataType={sortDataType} f
                    romDate={fromDate}
                    toDate={toDate}
                    meterId={meterTagId}
                    deviceId={deviceId}
                    openCurrentImbalance={openCurrentImbalance}
                    HandleCurrentImbalanceClose={HandleCurrentImbalanceClose} />
            )}
        </>
    );
};

export default TemperatureLineChart;