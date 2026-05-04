import React, { useEffect, useRef } from "react";
import {
    Box,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from "@mui/material";

import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer,
    Brush,
    Label,
} from "recharts";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import { format } from "d3-format";
import { useState } from "react";

import info from "../../../../../../images/icons/tool.png";
import WavwGraphSubComponent from "./WavwGraphSubComponent";
import WavwGraphZoomChart from "./WavwGraphZoomChart";
import { FetchSpectrumdata } from "../../../../../../services/LoginPageService";


export const WaveGraph = (props) => {
    const datePropRef = useRef(props.Date);
    const timePropRef = useRef(props.Time);
    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const [selectedValue, setSelectedValue] = useState("");
    const [chartData, setChartData] = useState([]);
    const [selectedMode, setSelectedMode] = useState("Normal");
    const [open, setOpen] = useState(false);

    const [spectrumData, setSpectrumData] = useState('');

    console.log("chartData===", chartData)


    useEffect(() => {
        // Check if Date or Time props have changed
        if (props.Date !== datePropRef.current || props.Time !== timePropRef.current) {
            // Date or Time has changed, set selectedValue to "none"
            setSelectedValue("none");
        }

        // Update the references to the current props
        datePropRef.current = props.Date;
        timePropRef.current = props.Time;
    }, [props.Date, props.Time]);

    const handleChange = (event) => {
        if (event.target.value === "none") {
            // Date or time has changed, set selectedValue to "none"
            setSelectedValue("none");
        } else {
            // Date or time has not changed, set selectedValue to the selected value
            setSelectedValue(event.target.value);
        }

        FetchSpectrumdata(
            {
                deviceId: props.deviceId.deviceId || "",
                slaveId: parseInt(props.analogSensorList[0]?.slaveId || ""),
                date: props.Date || '',
                time: props.Time || '',
                spectrumSelectionType: event.target.value,
            },
            handleSuccess,
            handleException
        );


    };
    const handleSuccess = (dataObject) => {
        setSpectrumData(dataObject?.spectrumData || []);
    };

    useEffect(() => {
        console.log("chartData changed:", chartData);
    }, [chartData]);

    console.log("spectrumData", spectrumData)

    const handleException = (errorObject) => { };



    console.log("selectedValue==", selectedValue)

    useEffect(() => {
        // Update chart data when a new card is selected
        if (props.selectedCardId) {
            const selectedCard = props.fftList.find(
                (card) => card.id === props.selectedCardId
            );
            if (selectedCard) {
                setChartData(selectedCard.chartData);
            }
        }
    }, [props.selectedCardId, props.fftList]);


    // ***************************************************
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // Get the data point

            // Define the tooltip box style
            const tooltipStyle = {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                padding: "5px",
                borderRadius: "3px",
            };

            return (
                <div className="custom-tooltip" style={tooltipStyle}>
                    <p>Frequency: {dataPoint.frequency}</p>
                    <p>db: {dataPoint.dBScales}</p>
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
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                padding: "5px",
                borderRadius: "3px",
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

    const renderChart = () => {

        if (!spectrumData || !spectrumData.graph1) {
            // Return a message when data is not available
            return (
                <Typography variant="h4" style={{ marginLeft: "3%", marginTop: "2%", marginBottom: '2%' }}>
                    Data not available.
                </Typography>
            );
        }

        if (selectedValue === "rAmps") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph1;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.amplitudes.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            amplitudes: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            padding={{ top: 20, bottom: 20 }}
                            allowDataOverflow={true} // Allow data to overflow beyond the domain

                        >
                            <Label
                                value="amplitudes"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip2 />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="amplitudes"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }


        if (selectedValue === "rDb") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph2;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.dBScales.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            dBScales: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            padding={{ top: 20, bottom: 20 }}
                        >
                            <Label
                                value="db"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="dBScales"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }

        if (selectedValue === "yDb") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph2;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.dBScales.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            dBScales: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            padding={{ top: 20, bottom: 20 }}


                        >
                            <Label
                                value="db"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="dBScales"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
        if (selectedValue === "yAmps") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph1;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.amplitudes.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            amplitudes: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            padding={{ top: 20, bottom: 20 }}

                        >
                            <Label
                                value="amplitudes"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip2 />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="amplitudes"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }

        if (selectedValue === "bDb") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph2;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.dBScales.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            dBScales: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            padding={{ top: 20, bottom: 20 }}

                        >
                            <Label
                                value="db"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="dBScales"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

                        <Brush
                            dataKey="frequency" // Specify the data key for the X-axis (adjust as needed)
                            height={30} // Set the height of the brush component
                            stroke="#8884d8" // Specify the color of the brush
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
        if (selectedValue === "bAmps") {
            // const xMin = Math.min(...chartData.map((entry) => entry.frequency));
            // const xMax = Math.max(...chartData.map((entry) => entry.frequency));
            // const yMin = Math.min(...chartData.map((entry) => entry.dbScale));
            // const yMax = Math.max(...chartData.map((entry) => entry.dbScale));
            const graphData = spectrumData.graph1;

            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={graphData.amplitudes.map((value, index) => ({
                            frequency: graphData.frequencies[index],
                            amplitudes: value,
                        }))}
                        margin={{ top: 50, right: 25, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="frequency"
                            type="number"
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            domain={["auto", "auto"]} // Automatically calculate the X-axis domain
                            tick={{ fontSize: 12 }}
                        >
                            <Label
                                value="frequencies"
                                position="center"
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </XAxis>

                        <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]} // Automatically calculate the Y-axis domain
                            allowDataOverflow={true} // Allow data to overflow beyond the domain
                            padding={{ top: 20, bottom: 20 }}

                        >
                            <Label
                                value="amplitudes"
                                position="insideLeft"
                                angle={-90}
                                style={{ textAnchor: "middle", fontSize: "18px" }}
                                fill="#ffff"
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip2 />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="amplitudes"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />

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
            return <Typography variant="h4" style={{ marginLeft: "3%", marginTop: "2%", marginBottom: '2%' }}>Please select a spectrum.</Typography>;
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleZoomClick = () => {
        setOpen(true);
    };





    return (
        <div>

            <Box
                marginTop={"2%"}
                marginRight={"2%"}
                marginLeft={"12%"}
                width="100%"
                maxHeight={"100%"}
                justifyContent="center"
                alignItems="center"
            >
                <Card
                    sx={{
                        width: "80%",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle box-shadow
                        transition: "box-shadow 0.3s ease", // Smooth box-shadow transition
                        "&:hover": {
                            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.15)", // Increased shadow on hover
                        },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                {/* <InputLabel>Spectrum Selection</InputLabel> */}
                                <Select
                                    native
                                    defaultValue=""
                                    id="grouped-native-select"
                                    onChange={handleChange}

                                >
                                    <option aria-label="None" value={selectedValue}>
                                        {props.Date || props.Time ? "Spectrum Selection" : "None"}
                                    </option>
                                    <optgroup label="Curent">
                                        <option value={'rDb'}>R-db</option>
                                        <option value={'yDb'}>Y-db</option>
                                        <option value={'bDb'}>B-db</option>
                                        <option value={'rAmps'}>R-Amps</option>
                                        <option value={'yAmps'}>Y-Amps</option>
                                        <option value={'bAmps'}>B-Amps</option>
                                    </optgroup>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sx={{ marginTop: "15px" }}>
                            <Typography
                                sx={{
                                    color: "#434242",
                                    maxWidth: "43px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    borderRadius: "25%",
                                }}
                            >
                                <img
                                    src={info} // Replace with the correct path to your JPG imag
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop event propagation
                                        handleDialogOpen(); // Open the dialog
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                            </Typography>
                        </Grid>
                        <Grid item sx={{ marginTop: "15px" }}>
                            <IconButton onClick={handleZoomClick}>
                                <ZoomInIcon style={{ color: "white" }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    {renderChart()}
                </Card>
                <WavwGraphZoomChart chartData={chartData} open={open} handleClose={handleClose} selectedValue={selectedValue} spectrumData={spectrumData} />
                <Dialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    fullWidth={true}
                    maxWidth={"md"}
                    sx={{ marginLeft: "5%" }}
                >
                    <DialogTitle>ODR</DialogTitle>
                    <DialogContent>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                border: "1px solid #ccc",
                            }}
                        >
                            <thead style={{ background: "#f2f2f2" }}>
                                <tr>
                                    <th
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            color: "#000000",
                                        }}
                                    >
                                        Observation
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            color: "#000000",
                                        }}
                                    >
                                        Diagnostic
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            color: "#000000",
                                        }}
                                    >
                                        Recommendation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            textAlign: "justify",
                                        }}
                                    >
                                        In Machine Recirculating Pump. Current is stable in R
                                        phase with 0 amps in Y and B. Voltage is stable. Power
                                        factor is low.
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            textAlign: "justify",
                                        }}
                                    >
                                        Current phase loss in Y and B phase.
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            textAlign: "justify",
                                        }}
                                    >
                                        Stop the equipment. Check connections and connectivity for
                                        Y and B phase.
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
            </Box>

        </div>
    );
};