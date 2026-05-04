import React, { useEffect } from 'react'
import {
    Box, Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer, Brush, Label
} from 'recharts';
import { useState } from 'react';
// import fft from 'fft.js';
const WavwGraphSubComponent = (props) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [chartData, setChartData] = useState([]);
    const [selectedMode, setSelectedMode] = useState('Normal');
    const [fftData, setFFTData] = useState([]);
    console.log("fftDta==", fftData)
    console.log("chartData==", props.chartData)
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // Get the data point
            // Define the tooltip box style
            const tooltipStyle = {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '5px',
                borderRadius: '3px',
            };
            return (
                <div className="custom-tooltip" style={tooltipStyle}>
                    <p>Frequency: {dataPoint.frequency}</p>
                    <p>db: {dataPoint.dbScale}</p>
                </div>
            );
        }
        return null;
    };
    const CustomTooltip2 = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // Get the data point
            // Define the tooltip box style
            const tooltipStyle = {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '5px',
                borderRadius: '3px',
            };
            return (
                <div className="custom-tooltip" style={tooltipStyle}>
                    <p>Frequency: {dataPoint.frequency}</p>
                    <p>amplitudes: {dataPoint.amplitudes}</p>
                </div>
            );
        }
        return null;
    };
    const convertToFFT = (timeDomainData) => {
        // Find the next power of two greater than or equal to the input data length
        const fftSize = Math.pow(2, Math.ceil(Math.log2(timeDomainData.length)));

        // Pad the input data with zeros to match the FFT size
        const paddedData = new Array(fftSize).fill(0);
        for (let i = 0; i < timeDomainData.length; i++) {
            paddedData[i] = timeDomainData[i];
        }

        const fftInstance = new fft(fftSize);
        const fftData = fftInstance.createComplexArray();
        fftInstance.realTransform(fftData, paddedData);
        return fftData;
    };

    useEffect(() => {
        if (props.chartData.length > 0) {
            const resultFFTData = convertToFFT(props.timeDomainData);
            setFFTData(resultFFTData);
        }
    }, [props.chartData]);
    const renderChart = () => {
        if (selectedValue === '10') {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={props.chartData} margin={{ top: 50, right: 25, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={['auto', 'auto']} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="Frequency"
                                position="center"
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#ffff"
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={['auto', 'auto']} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true}  // Allow data to overflow beyond the domain
                            tickFormatter={(value) => value.toFixed(2)}
                            ticks={[, -40 - 30, -20 - 10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 100]}
                        >
                            <Label
                                value="db"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="dbScale" dot={false} stroke="#8884d8" />
                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
        if (selectedValue === '40') {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={props.chartData} margin={{ top: 50, right: 25, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={['auto', 'auto']} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="Frequency"
                                position="center"
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#ffff"
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={['auto', 'auto']} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true}  // Allow data to overflow beyond the domain
                            tickFormatter={(value) => value.toFixed(2)}
                            ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.5]}
                        >
                            <Label
                                value="db"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip2 />} />
                        <Legend />
                        <Line type="monotone" dataKey="amplitudes" dot={false} stroke="#8884d8" />
                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
        else {
            // Render a default chart or any message when no selection is made
            return <p style={{ marginLeft: "3%" }}>Please select a spectrum.</p>;
        }
    };
    return (
        <div>
            <Box marginTop={"2%"} marginRight={"2%"} marginLeft={"12%"} width="100%" maxHeight={"100%"} justifyContent="center" alignItems="center" >
                <Card sx={{
                    width: "80%",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle box-shadow
                    transition: "box-shadow 0.3s ease", // Smooth box-shadow transition
                    "&:hover": {
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.15)", // Increased shadow on hover
                    },
                }}>
                    <Grid container spacing={2}>
                        <Grid item >
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel >Spectrum Selection</InputLabel>
                                <Select native defaultValue="" id="grouped-native-select" onChange={handleChange} label="Spectrum Selection">
                                    <option aria-label="None" value={selectedValue} />
                                    <optgroup label="Curent">
                                        <option value={10}>R-db</option>
                                        <option value={20}>Y-db</option>
                                        <option value={30}>B-db</option>
                                        <option value={40}>R-Amps</option>
                                        <option value={50}>Y-Amps</option>
                                        <option value={60}>B-Amps</option>
                                    </optgroup>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sx={{ marginTop: "15px" }}>
                            <Typography
                                sx={{
                                    color: '#434242',
                                    maxWidth: '43px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    borderRadius: "25%"
                                }}
                            >
                                {/* <img
                                src={info} // Replace with the correct path to your JPG imag
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop event propagation
                                    handleDialogOpen(); // Open the dialog
                                }}
                                style={{ cursor: 'pointer' }}
                            /> */}
                            </Typography>
                        </Grid>
                    </Grid>
                    {renderChart()}
                </Card>
                {/* <Dialog open={openDialog} onClose={handleDialogClose} fullWidth={true} maxWidth={'md'} sx={{ marginLeft: "5%" }}>
                <DialogTitle>ODR</DialogTitle>
                <DialogContent>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                        <thead style={{ background: '#f2f2f2' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid #ccc', color: '#000000' }}>Observation</th>
                                <th style={{ padding: '10px', border: '1px solid #ccc', color: '#000000' }}>Diagnostic</th>
                                <th style={{ padding: '10px', border: '1px solid #ccc', color: '#000000' }}>Recommendation</th>
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
                           
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog> */}
            </Box>
        </div>
    )
}
export default WavwGraphSubComponent