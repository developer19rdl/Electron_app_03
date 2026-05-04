import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    Label,
} from "recharts";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import moment from "moment";

const WavwGraphZoomChart = ({ chartData, handleClose, open, selectedValue, spectrumData }) => {
    const tooltipStyles = {
        backgroundColor: "gray",
        border: "1px solid #ccc",
        padding: "8px",
        color: "#fff",
    };
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
                <ResponsiveContainer width="100%" height={500}>
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
                <ResponsiveContainer width="100%" height={500}>
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
                <ResponsiveContainer width="100%" height={500}>
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
                <ResponsiveContainer width="100%" height={500}>
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
                <ResponsiveContainer width="100%" height={500}>
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
                <ResponsiveContainer width="100%" height={500}>
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

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Spectrum</DialogTitle>
            <DialogContent>
                {renderChart()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WavwGraphZoomChart;