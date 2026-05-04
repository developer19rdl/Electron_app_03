import React, { useEffect, useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { FetchVoltageRYB } from '../../../../../services/LoginPageService';
import moment from 'moment';
import VoltageZoomedChart from './SubZoomedChart/VoltageZoomedChart';
import { Box, Button, Tooltip as MuiTooltip, IconButton, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import VoltageImbalance from './SubZoomedChart/UnbalnseChart/VoltageImbalance';
import CircularProgress from '@mui/material/CircularProgress';


const MeterLineChartData = ({ deviceId, meterTagId, sortDataType, fromDate, toDate, dataFetched, dopen }) => {
    const [chartData, setChartData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openVoltageImbalance, setOpenVoltageImbalance] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMeterImbalanceOpen, setIsMeterImbalanceOpen] = useState(false);
    const [xAxisTicks, setXAxisTicks] = useState([]);

    // useEffect(() => {
    //     FetchVoltageRYB({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchVoltageRYBtHandleSuccess, FetchVoltageRYBHandleException);
    // }, [deviceId, meterTagId, sortDataType]);



    useEffect(() => {
        if (dopen && !dataFetched) {
            setLoading(true);
            FetchVoltageRYB({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchVoltageRYBtHandleSuccess, FetchVoltageRYBHandleException);
        }
    }, []);


    const memoizedChartData = useMemo(() => chartData, [chartData]);


    const FetchVoltageRYBtHandleSuccess = (dataObject) => {
        const transformedData = dataObject.data.map(({ time, 'R Voltage': R, 'Y Voltage': Y, 'B Voltage': B }) => {
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

                'R Voltage': parseFloat(R),
                'Y Voltage': parseFloat(Y),
                'B Voltage': parseFloat(B),
                day: formattedValue,
            };
        });
        let customTicks;
        if (sortDataType === "today") {
            // Show all hours for today/day
            customTicks = transformedData.filter((item, index) => index % 10 === 0).map((item) => item.day);

        } else if (sortDataType === "day") {
            // Show days of the week for week
            customTicks = transformedData
                .filter((item, index) => index % 20 === 0)
                .map((item) => item.day);
        } else if (sortDataType === "week") {
            // Show days of the week for week
            customTicks = [...new Set(transformedData.map((item) => item.day))];
        } else if (sortDataType === "month") {
            // Show unique dates for month
            customTicks = [...new Set(transformedData.map((item) => item.day))];
        } else if (sortDataType === "year") {
            // Show unique years for year
            customTicks = [...new Set(transformedData.map((item) => item.day))];
        }

        setChartData(transformedData);
        setLoading(false);
        setXAxisTicks(customTicks);
    };
    const FetchVoltageRYBHandleException = () => {
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

    const HandleVoltageImbalanceClose = () => {
        setOpenVoltageImbalance(false);


    };

    console.log("isMeterImbalanceOpen")

    const HandleVoltageImbalanceClick = () => {
        setIsMeterImbalanceOpen(true);
        setOpenVoltageImbalance(true);

    };
    const yAxisDataMargin = 0.2;
    return (
        <>
            <Typography variant="subtitle1" gutterBottom style={{ position: 'absolute', top: 5, left: 15 }} >
                Voltage (R,Y,B)
            </Typography>

            <IconButton
                style={{ position: 'absolute', top: 1, right: 1 }}
                onClick={handleZoomClick}
            >
                <ZoomInIcon style={{ color: 'white' }} />
            </IconButton>

            <MuiTooltip title="Voltage Unbalance" >
                <IconButton
                    style={{ position: 'absolute', top: 0.8, right: 80 }}
                    onClick={HandleVoltageImbalanceClick}
                >
                    <SsidChartIcon style={{ color: '#33BBC5', fontWeight: '400px' }} />
                </IconButton>
            </MuiTooltip>

            {/* {chartData.length > 0 ? ( */}
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
                <ResponsiveContainer width="100%" height="85%" marginTop={30}>
                    <LineChart data={chartData} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" ticks={xAxisTicks} />


                        <YAxis
                            type="number"
                            domain={['auto', 'auto']}


                        >
                            <Label
                                value="V"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            />
                        </YAxis>
                        <Tooltip contentStyle={tooltipStyles} />
                        <Legend />
                        <Line type="monotone" dataKey="R Voltage" stroke="#B70404" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="Y Voltage" stroke="#F0DE36" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="B Voltage" stroke="#0079FF" dot={false} strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>

            )}
            {/* ) : (
                <div>Loading chart...</div>
            )} */}
            <VoltageZoomedChart chartData={memoizedChartData} handleClose={handleClose} open={open} xAxisTicks={xAxisTicks} />
            {isMeterImbalanceOpen && (
                <VoltageImbalance sortDataType={sortDataType} fromDate={fromDate} toDate={toDate} meterId={meterTagId} deviceId={deviceId} openVoltageImbalance={openVoltageImbalance} HandleVoltageImbalanceClose={HandleVoltageImbalanceClose} />
            )}
        </>
    );
};

export default MeterLineChartData;