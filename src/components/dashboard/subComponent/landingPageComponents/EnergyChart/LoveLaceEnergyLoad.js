import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, Brush, ReferenceArea } from 'recharts';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { FetchKwhLoad } from '../../../../../services/LoginPageService';
import AreaZoomedChart from './SubZoomedChart/AreaZoomedChart';
import { debounce } from 'lodash';
import moment from "moment";

function calculateTickValues(data, numTicks) {
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const tickIncrement = Math.ceil((maxValue - minValue) / numTicks);

    // Generate an array of tick values
    const tickValues = [];
    for (let i = 0; i < numTicks; i++) {
        tickValues.push(minValue + i * tickIncrement);
    }

    return tickValues;
}


const LoveLaceEnergyLoad = ({ meterTagId, deviceId, sortDataType, fromDate, toDate, dataFetched, setDataFetched, dopen, dsetOpen }) => {
    const [energyLoadData, setEnergyLoadData] = useState([]);
    const [open, setOpen] = useState(false);
    const [zoomedArea, setZoomedArea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [xAxisTicks, setXAxisTicks] = useState([]);
    const [yAxisTicks, setYAxisTicks] = useState([]);




    // useEffect(() => {
    //     FetchKwhLoad({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchKwhLoadHandleSuccess, FetchKwhLoadHandleException);
    // }, [deviceId, meterTagId, sortDataType]);

    useEffect(() => {
        if (dopen && !dataFetched) {

            setLoading(true);
            FetchKwhLoad({ meterId: meterTagId, deviceId, sortDataType, fromDate, toDate }, FetchKwhLoadHandleSuccess, FetchKwhLoadHandleException);
        }
    }, []);

    const FetchKwhLoadHandleSuccess = (dataObject) => {
        try {
            const transformedData = dataObject.data.map(({ time, load }) => {
                let formattedValue;

                if (sortDataType === "week") {
                    formattedValue = moment(time).format("dddd"); // Display the day for the week
                } else if (sortDataType === "month") {
                    formattedValue = moment(time).format("MMMM YYYY"); // Display the month and year for the month
                } else if (sortDataType === "year") {
                    formattedValue = moment(time).format("YYYY"); // Display the year for the year
                } else {
                    formattedValue = moment(time).format(" h:mm A"); // Display the default format for other cases
                }

                return {
                    time: formattedValue,
                    load,
                };
            });
            let customTicks;
            if (sortDataType === "today") {
                // Show all hours for today/day
                customTicks = transformedData.filter((item, index) => index % 20 === 0).map((item) => item.time);

            } else if (sortDataType === "day") {
                // Show days of the week for week
                customTicks = transformedData.filter((item, index) => index % 20 === 0).map((item) => item.time);
            } else if (sortDataType === "week") {
                // Show days of the week for week
                customTicks = [...new Set(transformedData.map((item) => item.time))];
            } else if (sortDataType === "month") {
                // Show unique dates for month
                customTicks = [...new Set(transformedData.map((item) => item.time))];
            } else if (sortDataType === "year") {
                // Show unique years for year
                customTicks = [...new Set(transformedData.map((item) => item.time))];
            }

            console.log("Transformed Data:", transformedData); // Log the transformed data
            setEnergyLoadData(transformedData);
            setLoading(false);
            setXAxisTicks(customTicks);
            const yTickValues = calculateTickValues(transformedData.map(item => item.load), 5);
            setYAxisTicks(yTickValues);
        } catch (error) {
            console.error("Error in FetchKwhLoadHandleSuccess:", error); // Log any errors
            setLoading(false);
        }
    };
    const FetchKwhLoadHandleException = () => {
        setLoading(false);
    };

    const handleYZoomClick = (data, area) => {
        if (area && area.left && area.right) {
            setZoomedArea(area);
        } else {
            setZoomedArea(null);
        }
    };

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

    const [yAxisZoom, setYAxisZoom] = useState({});

    const handleMouseEnter = (e) => {
        const { chartX, chartY, value } = e;
        setYAxisZoom({
            y: chartY,
            height: 400 - chartY,
            label: value,
        });
    };

    const handleMouseLeave = () => {
        setYAxisZoom({});
    };





    return (
        <>
            <Typography variant="subtitle1" gutterBottom style={{ position: 'absolute', top: 5, left: 15 }} >
                Load
            </Typography>
            {/* <Button onClick={handleZoomClick} >
                Zoom
            </Button> */}

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
                <ResponsiveContainer style={{ marginTop: 100 }} width="100%" height="85%">
                    <AreaChart data={energyLoadData} onClick={handleYZoomClick}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" ticks={xAxisTicks} />
                        <YAxis
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            allowDataOverflow
                            domain={['auto', 'auto']}
                            padding={{ top: 60, }}
                            ticks={yAxisTicks} // Customize tick values here
                        // Customize tick labels here

                        >
                            <Label
                                value="Kw"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            />
                        </YAxis>
                        <Tooltip contentStyle={tooltipStyles} />
                        <Legend />
                        <Area type="monotone" dataKey="load" stroke="#ffffff" fill="#FAFAFA" />
                        {yAxisZoom.y && (
                            <ReferenceArea y={yAxisZoom.y} height={yAxisZoom.height} fill="#8884d8" fillOpacity={0.3}>
                                <Label value={yAxisZoom.label} position="insideTopLeft" />
                            </ReferenceArea>
                        )}

                    </AreaChart>
                </ResponsiveContainer>
            )}
            <AreaZoomedChart energyLoadData={energyLoadData} handleClose={handleClose} open={open} xAxisTicks={xAxisTicks} />
        </>
    );
};

export default LoveLaceEnergyLoad;