
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    ListItemText,
    Grid,
    IconButton,
    Typography,
    Menu,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
} from "@mui/material";
import { Tooltip as MuiTooltip } from "@mui/material";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, } from "recharts";
import { AddGraphSettings, AddGraphShowDelete, AddGraphShowList, AnalyticsAdd, AnalyticsDeleteService, AnalyticsList, GetChartData, GetMachineDeviceHeaderData, SearchDevicesFetchService, ShowSelectDropDown, UpdateGraphShowListData } from "../../../../services/LoginPageService";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import "ag-charts-enterprise";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDailog from "../../../../utils/confirmDeletion";
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import GeoLocationWidget from "../../components/GeoLocationWidget";
import axios from "axios";
import AnalyticsBoxPlot from "./AnalyticsBoxPlot";

const DragGraph = () => {
    const [specMin, setSpecMin] = useState("");
    const [specMax, setSpecMax] = useState("");
    const [controlLow, setControlLow] = useState("");
    const [controlMax, setControlMax] = useState("");
    const [mode, setMode] = useState("normal"); // "normal" | "analytics"
    const [mapMarkers, setMapMarkers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const locationTimerRef = useRef(null);
    const location = useLocation();  // Access the location object
    const { locationDetails } = location.state || {};
    const [openDialog, setOpenDialog] = useState(false); // Dialog state
    const [openPollingDialog, setOpenPollingDialog] = useState(false); // Dialog state
    const [selectedDevice, setSelectedDevice] = useState([]);
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [graphType, setGraphType] = useState("");
    const [graphs, setGraphs] = useState([]); // Store added graphs
    const [selectList, setSelectList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [selectedLast, setSelectedLast] = useState('');
    const [selectedAggregation, setSelectedAggregation] = useState('');
    const [selectedInterval, setSelectedInterval] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [normalGraphs, setNormalGraphs] = useState([]);
    const [analyticsGraphs, setAnalyticsGraphs] = useState([]);
    const [currentDeleteService, setCurrentDeleteService] = useState(null);

    const [refreshData, setRefreshData] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [id, setGraphid] = useState('');
    const [isAddButton, setIsAddButton] = useState(true);
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [openMapDialog, setOpenMapDialog] = useState(false);
    const [analyticsGraph, setAnalyticsGraph] = useState(null);
    const [cardsPerRow, setCardsPerRow] = useState(3); // default = 3 cards per row
    const [isAnalyticsDelete, setIsAnalyticsDelete] = useState(false);

    const getGridSize = (count) => {
        switch (count) {
            case 1: return 12; // 1 card
            case 2: return 6;  // 2 cards
            case 3: return 4;  // 3 cards
            case 4: return 3;  // 4 cards
            default: return 4;
        }
    };
    const graphTypes = ["Line", "Bar", "Gauge"];
    const graphTypesAnalytics = ["line", "histogram", "box"];
    useEffect(() => {
        if (!mapMarkers.length) return;

        clearInterval(locationTimerRef.current);

        locationTimerRef.current = setInterval(() => {
            setMapMarkers(prev =>
                prev.map(marker => {
                    // 🚨 if only one location → DO NOT MOVE
                    if (!marker.positions || marker.positions.length <= 1) {
                        return marker;
                    }

                    const nextIndex = currentIndex + 1;

                    if (!marker.positions[nextIndex]) {
                        return marker; // stop at last position
                    }

                    return {
                        ...marker,
                        position: marker.positions[nextIndex]
                    };
                })
            );

            setCurrentIndex(prev => prev + 1);
        }, 3000);

        return () => clearInterval(locationTimerRef.current);
    }, [mapMarkers.length, currentIndex]);

    const LINE_COLORS = {
        "48-65": "#1976d2", // Blue
        "48-66": "#2e7d32", // Green
        "48-67": "#d32f2f"  // Red
    };


    useEffect(() => {
        SearchDevicesFetchService({
            locationId: locationDetails.locationId,
        }, handleDeviceSuccess, handleDeviceException);
        AddGraphShowList({
            locId: locationDetails.locationId,

        }, handleGraphShowSuccess, handleGraphShowException);
        if (!isAddButton) {
            ShowSelectDropDown(
                { locationId: locationDetails.locationId, field: "selectAll", deviceId: selectedDevice },
                handleGetSensorSuccess,
                handleGetSensorException
            );
        }
    }, [refreshData, isAddButton, locationDetails]);

    useEffect(() => {
        setSelectedAggregation("");
    }, [mode]);
    useEffect(() => {
        if (!locationDetails?.locationId) return;

        AnalyticsList(
            { locationId: locationDetails.locationId },
            handleAnalyticsSuccess,
            handleAnalyticsError
        );
    }, [locationDetails?.locationId, refreshData]);
    const handleAnalyticsSuccess = (response) => {
        const charts = response?.charts;

        if (!Array.isArray(charts)) {
            setAnalyticsGraphs([]);
            return;
        }

        const graphs = charts.map((chart) => {
            const type = (chart.chartType || "").toLowerCase();


            const common = {
                id: `analytics-${chart.analyticId}`,
                analyticId: chart.analyticId,
                aggregation: chart.aggregation || "",
                interval: chart.time_interval || "",   // 🔥 fix key
                timeRange: chart.time_range || "",     // 🔥 fix key
                specMin: chart.specMin,
                specMax: chart.specMax,
                controlLow: chart.controlLow,
                controlMax: chart.controlMax,
                type:
                    type === "line"
                        ? "MULTI_LINE"
                        : type === "histogram"
                            ? "HISTOGRAM"
                            : "BOX",
                tags: (chart.lines || []).map(l => ({
                    deviceId: l.deviceId,
                    tagId: l.tagId
                }))
            };

            if (type === "line") {
                return {
                    ...common,
                    tagName: "Line Analytics",
                    data: chart.chartData || [],
                    xKey: chart.xAxisKey || "dateTime",
                    lines: (chart.lines || []).map(l => ({
                        key: l.key,
                        label: l.label,
                        color: "#1976d2"
                    }))
                };
            }

            if (type === "histogram") {
                if (!chart.bins?.length) return null;

                return {
                    ...common,
                    tagName: "Histogram Analytics",
                    data: chart.bins,
                    xKey: "range",
                    bars: (chart.lines || []).map(l => ({
                        key: String(l.key),
                        label: l.label,
                        color: "#1976d2"
                    }))
                };
            }

            if (type === "box") {
                if (!chart.boxes?.length) return null;

                return {
                    ...common,
                    tagName: "Box Analytics",
                    data: chart.boxes
                };
            }

            return null;
        }).filter(Boolean);

        setAnalyticsGraphs(graphs);
    };


    const handleAnalyticsError = (err) => {
        console.error("Analytics fetch error", err);
    };

    const handleGraphShowSuccess = (dataObject) => {
        const graphs = dataObject?.tagsChart || [];

        // ✅ ONLY normal graphs go here
        setNormalGraphs(graphs);

        // 🗺️ marker logic (unchanged)
        const markers = [];

        graphs.forEach((g) => {
            if (!Array.isArray(g.positions) || g.positions.length === 0) return;

            const validPositions = g.positions.filter(
                p => p && p.lat != null && p.lng != null
            );
            if (!validPositions.length) return;
            if (markers.find(m => m.id === g.deviceId)) return;

            markers.push({
                id: g.deviceId,
                name: g.deviceName,
                positions: validPositions,
                position: validPositions[0]
            });
        });

        setMapMarkers(markers);
        setCurrentIndex(0);
    };


    const handleGraphShowException = () => {

    };

    const handleDeviceSuccess = (dataObject) => {
        setDeviceList(dataObject?.data || []);
    };
    const handleDeviceException = () => {

    };

    // Open the graph settings dialog
    const handleAddGraph = () => {
        setOpenDialog(true);
    };
    const handleAddPollingInterval = () => {
        setOpenPollingDialog(true);
    };


    const [graphData, setGraphData] = useState([]); // State to store API responses

    const buildAnalyticsTagPayload = () => {
        return selectList
            .filter(sensor => selectedSensors.includes(sensor.Id))
            .map(sensor => ({
                deviceId: String(sensor.deviceId),
                deviceName: sensor.deviceName,
                tagId: String(sensor.Id),
                tagName: sensor.Tag_name,
            }));
    };

    const handleSubmit = () => {

        if (mode === "analytics") {

            const analyticsPayload = {
                locationId: String(locationDetails.locationId),
                chartName: "",
                aggregation: selectedAggregation,
                timeInterval: selectedInterval || "5m",
                timeRange: selectedLast || "30d",
                GroupType: graphType,
                specMin: specMin,
                specMax: specMax,
                controlLow: controlLow,
                controlMax: controlMax,
                tagIds: buildAnalyticsTagPayload() // 👈 array of {deviceId, deviceName, tagId, tagName}
            };

            AnalyticsAdd(
                analyticsPayload,
                handleAnalyticsAddSuccess,
                handleAnalyticsAddException
            );



            return; // 🚨 STOP normal flow
        }
        if (isAddButton) {
            AddGraphSettings({
                locationId: locationDetails.locationId,
                deviceId: selectedDevice,
                tagId: selectedSensors,
                GroupType: graphType,
                last: selectedLast,
                dataAggregations: selectedAggregation,
                groupingInterval: selectedInterval

            }, handleGraphSettingsDataSuccess, handleGraphSettingsDataException);
        } else {
            setIsAddButton(true)
            UpdateGraphShowListData({
                id,
                tagId: selectedSensors,
                GroupType: graphType,
                last: selectedLast,
                dataAggregations: selectedAggregation,
                groupingInterval: selectedInterval

            }, handleGraphSettingsDataSuccess, handleGraphSettingsDataException);
        };
        // Create a new graph entry
        const newGraph = {
            deviceId: selectedDevice,
            locationId: locationDetails.locationId,
            selected: "selectAll",
            aggregation: selectedAggregation,
            interval: selectedInterval,
            sortDataType: selectedLast,
            tagIds: [selectedSensors],
        };

        // Call API to fetch chart data
        if (graphType === 'Gauge') {
            GetMachineDeviceHeaderData({ locationId: locationDetails.locationId, }, handleGetChartDataSuccess, handleGetChartDataException);
        } else {
            GetChartData(newGraph, handleGetChartDataSuccess, handleGetChartDataException);
        }

        // Store new graph with its type in the state
        setGraphs([...graphs, { type: graphType }]);

        setOpenDialog(false); // Close dialog
    };

    const handleAnalyticsAddSuccess = () => {
        setOpenDialog(false);
        setRefreshData(prev => !prev);
    };

    const handleAnalyticsAddException = (error) => {
        console.error("Analytics store error", error);
    };

    const handleGetChartDataSuccess = (dataObject) => {
        // Store the response data (or an empty array if no data is returned)
        const newData = dataObject || [];

        // Store the new graph data in the state based on graph type
        setGraphData((prevData) => [
            ...prevData,
            { type: graphType, data: newData },
        ]);
    };


    const handleGetChartDataException = (errorObject, errorMessage) => {

    };



    const handleGraphSettingsDataSuccess = (dataObject) => {
        setRefreshData((oldvalue) => !oldvalue);
        setSelectedInterval('');
        setSelectedAggregation('');
        setSelectedLast('');
        setGraphType('');
        setSelectedSensors([]);
        setSelectedDevice([])
    };

    const handleGraphSettingsDataException = (errorObject, errorMessage) => {

    };



    const handleGetSensorSuccess = (dataObject) => {

        setSelectList(dataObject?.data)
    };
    const handleGetSensorException = () => { }

    const generateRandomColor = (isDarkMode) => {
        // Random hue between 0 and 360
        const hue = Math.floor(Math.random() * 360);
        // If dark mode, generate light colors (high lightness), else generate dark colors (low lightness)
        const lightness = isDarkMode ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20;
        const saturation = 80; // Saturation can stay constant for vibrant colors
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const handleEditGraph = (graph) => {
        console.log("Editing graph:", graph);

        setGraphid(graph.id);
        setOpenDialog(true);
        setIsAddButton(false);

        /* 🔁 ANALYTICS MODE */
        if (graph.type === "MULTI_LINE" || graph.type === "HISTOGRAM" || graph.type === "BOX") {
            setMode("analytics");

            // ✅ extract devices + sensors
            const deviceIds = [];
            const sensorIds = [];

            graph.tags?.forEach(t => {
                if (!deviceIds.includes(t.deviceId)) {
                    deviceIds.push(t.deviceId);
                }
                sensorIds.push(Number(t.tagId));
            });

            setSelectedDevice(deviceIds);     // array
            setSelectedSensors(sensorIds);    // array
            setSelectedAggregation(graph.aggregation || "");
            setSelectedInterval(graph.interval || "");
            setSelectedLast(graph.timeRange || "");
            setGraphType(""); // not used in analytics

            // 🔥 load sensors for devices
            ShowSelectDropDown(
                {
                    locationId: locationDetails.locationId,
                    field: "selectAll",
                    deviceId: deviceIds
                },
                handleGetSensorSuccess,
                handleGetSensorException
            );

            return;
        }

        /* 🔁 NORMAL MODE */
        setMode("normal");
        setSelectedDevice(graph.deviceId);     // number
        setSelectedSensors(graph.tagId || []); // array
        setGraphType(graph.chartType);
        setSelectedInterval(graph.interval || "");
        setSelectedAggregation(graph.aggregation || "");
        setSelectedLast(graph.sortDataType || "");

        ShowSelectDropDown(
            {
                locationId: locationDetails.locationId,
                field: "selectAll",
                deviceId: graph.deviceId
            },
            handleGetSensorSuccess,
            handleGetSensorException
        );


    };

    const handleEditGraphAnalytics = (graph) => {
        if (!graph) return;

        setGraphid(graph.analyticId);
        setOpenDialog(true);
        setIsAddButton(false);
        setMode("analytics");

        const deviceIds = [];
        const sensorIds = [];

        graph.tags?.forEach(t => {
            if (t.deviceId && !deviceIds.includes(t.deviceId)) {
                deviceIds.push(t.deviceId);
            }
            sensorIds.push(Number(t.tagId));
        });

        setSelectedDevice(deviceIds);
        setSelectedSensors(sensorIds);
        setSelectedAggregation(graph.aggregation || "");
        setSelectedInterval(graph.interval || "");
        setSelectedLast(graph.timeRange || "");
        setGraphType(graph.type.toLowerCase());

        if (deviceIds.length > 0) {
            ShowSelectDropDown(
                {
                    locationId: locationDetails.locationId,
                    field: "selectAll",
                    deviceId: deviceIds
                },
                handleGetSensorSuccess,
                handleGetSensorException
            );
        }
    };

    const handleDeleteGraphAnaltics = (analyticId) => {
        console.log("Delete analytics:", analyticId);

        if (!analyticId) return;

        setDeleteId(analyticId);
        setCurrentDeleteService(() => AnalyticsDeleteService);
        setIsAnalyticsDelete(true);
        setDeleteDailogOpen(true);
    };



    const handleDeleteGraph = (graphId) => {
        console.log("delete normal graph:", graphId);

        setDeleteId(graphId);
        setCurrentDeleteService(() => AddGraphShowDelete); // ✅ set correct service
        setIsAnalyticsDelete(false); // ✅ important
        setDeleteDailogOpen(true);
    };



    // const deletehandleSuccess = () => {
    //     if (isAnalyticsDelete) {
    //         setRefreshData(prev => !prev);
    //         setDeleteDailogOpen(false);
    //         setIsAnalyticsDelete(false);
    //         return;
    //     }


    //     // 1️⃣ Find deleted graph
    //     const deletedGraph = normalGraphs.find(g => g.id === deleteId);
    //     if (!deletedGraph) return;

    //     const deletedDeviceId = deletedGraph.deviceId;

    //     // 2️⃣ Remove graph from UI list
    //     const updatedGraphs = normalGraphs.filter(g => g.id !== deleteId);
    //     setNormalGraphs(updatedGraphs);

    //     // 3️⃣ Check if device still has graphs
    //     const deviceStillExists = updatedGraphs.some(
    //         g => g.deviceId === deletedDeviceId
    //     );

    //     // 4️⃣ If NO graphs left → remove marker
    //     if (!deviceStillExists) {
    //         setMapMarkers(prev =>
    //             prev.filter(marker => marker.id !== deletedDeviceId)
    //         );
    //     }

    //     // 5️⃣ Close dialog
    //     setDeleteDailogOpen(false);
    // };


    // const [anchorEl, setAnchorEl] = useState(null);
    const deletehandleSuccess = () => {

        if (isAnalyticsDelete) {
            // refresh analytics
            setRefreshData(prev => !prev);
        } else {
            // remove from normal UI
            const deletedGraph = normalGraphs.find(g => g.id === deleteId);
            if (!deletedGraph) return;

            const deletedDeviceId = deletedGraph.deviceId;

            const updatedGraphs = normalGraphs.filter(g => g.id !== deleteId);
            setNormalGraphs(updatedGraphs);

            const deviceStillExists = updatedGraphs.some(
                g => g.deviceId === deletedDeviceId
            );

            if (!deviceStillExists) {
                setMapMarkers(prev =>
                    prev.filter(marker => marker.id !== deletedDeviceId)
                );
            }
        }

        setDeleteDailogOpen(false);
    };

    const [normalMenuAnchor, setNormalMenuAnchor] = useState(null);
    const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

    const [selectedNormalGraph, setSelectedNormalGraph] = useState(null);
    const [selectedAnalyticsGraph, setSelectedAnalyticsGraph] = useState(null);

    // const open = Boolean(anchorEl);


    const deletehandleException = (errorObject, errorMessage) => {
        setTimeout(() => {
            // handleClose();
        }, 3000);
    };
    /////////Polling Interval code///
    const [selectedPollingInterval, setSelectedPollingInterval] = useState(10000)
    let devicePolling;

    useEffect(() => {
        console.log("Polling Interval:", selectedPollingInterval);
        intervalCallFunction(); // Call immediately on mount

        devicePolling = setInterval(() => {
            intervalCallFunction();
        }, selectedPollingInterval);

        return () => clearInterval(devicePolling);
    }, [selectedPollingInterval, locationDetails.locationId,]);

    const intervalCallFunction = () => {
        AddGraphShowList({
            locId: locationDetails.locationId,

        }, handleGraphShowSuccess, handleGraphShowException);
    };

    const handleChange = (event) => {
        setSelectedPollingInterval(Number(event.target.value));
        setOpenPollingDialog(false)
    };
    return (
        <>

            <Box sx={{ width: "100%", padding: 2, overflow: "auto", height: "90vh", }}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={12}
                        md={6}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginBottom: 3,
                            gap: 12   // 👈 spacing between controls
                        }}
                    >

                        {/* 🔥 Cards per row selector */}
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel>Cards per row</InputLabel>
                            <Select
                                value={cardsPerRow}
                                label="Chats per row"
                                onChange={(e) => setCardsPerRow(Number(e.target.value))}
                            >
                                <MenuItem value={1}>1 </MenuItem>
                                <MenuItem value={2}>2 </MenuItem>
                                <MenuItem value={3}>3 </MenuItem>
                                <MenuItem value={4}>4 </MenuItem>
                            </Select>
                        </FormControl>

                        {/* existing buttons */}
                        <IconButton onClick={handleAddGraph}>
                            <SettingsIcon style={{ color: 'black' }} />
                        </IconButton>

                        <IconButton onClick={handleAddPollingInterval}>
                            <QueryBuilderIcon style={{ color: 'black' }} />
                        </IconButton>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>

                    {normalGraphs.map((graph, index) => (

                        <Grid item xs={12} sm={12} lg={getGridSize(cardsPerRow)} key={graph.id}>
                            <Box sx={{ padding: 0, border: "1px solid #ccc", borderRadius: 2 }}>


                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                                    <h3 style={{ fontSize: 19, fontWeight: "bold", paddingLeft: 2 }}>{graph?.tagName}</h3>
                                    <Box>
                                        {/* Menu Button */}
                                        {/* <IconButton onClick={(event) => handleMenuOpen(event, graph)}> */}
                                        <IconButton
                                            onClick={(event) => {
                                                setNormalMenuAnchor(event.currentTarget);
                                                setSelectedNormalGraph(graph);
                                            }}
                                        >

                                            <MoreVertIcon />
                                        </IconButton>


                                        <Menu
                                            anchorEl={normalMenuAnchor}
                                            open={Boolean(normalMenuAnchor)}
                                            onClose={() => setNormalMenuAnchor(null)}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    handleEditGraph(selectedNormalGraph);
                                                    setNormalMenuAnchor(null);
                                                }}
                                            >
                                                <EditIcon sx={{ color: "blue", mr: 1 }} /> Edit
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    handleDeleteGraph(selectedNormalGraph?.id);
                                                    setNormalMenuAnchor(null);
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: "red", mr: 1 }} /> Delete
                                            </MenuItem>
                                        </Menu>

                                    </Box>
                                </Box>
                                {graph.chartType === "Line" ? (

                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={graph?.data}
                                            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="dateTime" tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                                            <YAxis type='number' domain={[0, graph?.maxValue]} tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                                            <Tooltip />
                                            <Legend />
                                            {/* <Brush dataKey="dateTime" height={30} stroke="#602BF8" /> */}
                                            {graph?.lines && graph?.lines.map((item, index) => (
                                                <Line strokeWidth={3} dot={false} key={index} type="monotone" dataKey={item.lineName} stroke={generateRandomColor(isDarkMode)} />
                                            ))}
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : graph.chartType === "Bar" ? (

                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={graph?.data}
                                            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="dateTime" tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                                            <YAxis type='number' domain={[0, graph?.maxValue]} tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                                            <Tooltip />
                                            <Legend />
                                            {/* <Brush dataKey="dateTime" height={30} stroke="#602BF8" /> */}
                                            {graph?.lines && graph?.lines.map((item, index) => (
                                                <Bar strokeWidth={3} dot={false} key={index} type="monotone" dataKey={item.lineName} stroke={generateRandomColor(isDarkMode)} />
                                            ))}
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (

                                    <div style={{ width: "100%", height: "200px", overflow: "hidden", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: "200px", height: "100px", marginTop: -10 }}>  {/* Set width & height */}
                                            <SemiCircleProgressBar percentage={Number(graph?.data[0]?.value || 0)} strokeWidth={25} size={800} />
                                        </div>
                                        <div style={{ width: '100%', marginTop: -18 }}>
                                            <Typography style={{ fontSize: 13 }}>
                                                <spam style={{ fontSize: 26 }}>{Number(graph?.data[0]?.value || 0)}</spam>
                                                <br />
                                                {graph?.tagName}
                                            </Typography>
                                        </div>
                                    </div>

                                )}
                            </Box>
                        </Grid>
                    ))}
                    {analyticsGraphs.length > 0 && (
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {analyticsGraphs.map((graph) => (
                                    <Grid item xs={12} md={getGridSize(cardsPerRow)} key={graph.id} style={{ paddingBottom: 8 }}>
                                        <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 1, }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                                                <h3 style={{ fontSize: 19, fontWeight: "bold", paddingLeft: 2 }}>{graph?.tagName}</h3>
                                                <Box>
                                                    <IconButton
                                                        onClick={(event) => {
                                                            setAnalyticsMenuAnchor(event.currentTarget);
                                                            setSelectedAnalyticsGraph(graph);
                                                        }}
                                                    >

                                                        <MoreVertIcon />
                                                    </IconButton>

                                                    <Menu
                                                        anchorEl={analyticsMenuAnchor}
                                                        open={Boolean(analyticsMenuAnchor)}
                                                        onClose={() => setAnalyticsMenuAnchor(null)}
                                                    >
                                                        <MenuItem
                                                            onClick={() => {
                                                                handleEditGraphAnalytics(selectedAnalyticsGraph);
                                                                setAnalyticsMenuAnchor(null);
                                                            }}
                                                        >
                                                            <EditIcon sx={{ color: "blue", mr: 1 }} /> Edit
                                                        </MenuItem>

                                                        <MenuItem
                                                            onClick={() => {
                                                                handleDeleteGraphAnaltics(selectedAnalyticsGraph?.analyticId);
                                                                setAnalyticsMenuAnchor(null);
                                                                console.log("Selected Graph:", selectedAnalyticsGraph);

                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ color: "red", mr: 1 }} /> Delete
                                                        </MenuItem>
                                                    </Menu>

                                                </Box>
                                            </Box>
                                            {/* <h3 style={{ paddingLeft: 8 }}>{graph.title}</h3> */}
                                            <AnalyticsGraphCard graph={graph} isDarkMode={isDarkMode} />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}


                    {mapMarkers.length > 0 && (
                        <Grid item xs={12} sm={12} md={getGridSize(cardsPerRow)} >
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: 2,
                                    cursor: "pointer"
                                }}
                                onClick={() => setOpenMapDialog(true)}
                            >
                                <GeoLocationWidget
                                    locationCoordination={mapMarkers}
                                    zoomLevel={4}
                                    height="260px"
                                    variant="preview"
                                />
                            </Box>
                        </Grid>
                    )}

                </Grid>

            </Box>

            {/* Graph Settings Dialog */}
            <Dialog sx={{ '& .MuiDialog-paper': { minWidth: '45%' } }}
                maxWidth="sm" open={openDialog} >
                <DialogTitle>Add Graph Settings</DialogTitle>
                <DialogContent>
                    {/* Device Dropdown */}
                    <FormControl sx={{ mb: 2 }}>
                        <RadioGroup
                            row
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <FormControlLabel
                                value="normal"
                                control={<Radio />}
                                label="Normal"
                            />
                            {/* <FormControlLabel
                                value="analytics"
                                control={<Radio />}
                                label="Analytics"
                            /> */}
                        </RadioGroup>
                    </FormControl>

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Select Device</InputLabel>

                                <Select
                                    label="Select Device"
                                    disabled={!isAddButton}
                                    multiple={mode === "analytics"}   // ✅ multi only in analytics
                                    value={selectedDevice}
                                    onChange={(e) => {
                                        setSelectedDevice(e.target.value);

                                        // 🔥 fetch sensors only in analytics
                                        if (mode === "analytics") {
                                            ShowSelectDropDown(
                                                {
                                                    locationId: locationDetails.locationId,
                                                    field: "selectAll",
                                                    deviceId: e.target.value   // array
                                                },
                                                handleGetSensorSuccess,
                                                handleGetSensorException
                                            );
                                        } else {
                                            // NORMAL MODE (unchanged)
                                            ShowSelectDropDown(
                                                {
                                                    locationId: locationDetails.locationId,
                                                    field: "selectAll",
                                                    deviceId: e.target.value
                                                },
                                                handleGetSensorSuccess,
                                                handleGetSensorException
                                            );
                                        }
                                    }}
                                    renderValue={(selected) =>
                                        Array.isArray(selected)
                                            ? selected
                                                .map(id => deviceList.find(d => d.id === id)?.deviceName)
                                                .join(", ")
                                            : deviceList.find(d => d.id === selected)?.deviceName
                                    }
                                >
                                    {deviceList.map((device) => (
                                        <MenuItem key={device.id} value={device.id}>
                                            {mode === "analytics" && (
                                                <Checkbox checked={selectedDevice.includes(device.id)} />
                                            )}
                                            <ListItemText primary={device.deviceName} />
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>

                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Select Sensors</InputLabel>
                                <Select
                                    value={selectedSensors}
                                    multiple={mode === "analytics"}
                                    disabled={!isAddButton}
                                    onChange={(e) => setSelectedSensors(e.target.value)}
                                    renderValue={(selected) =>
                                        Array.isArray(selected)
                                            ? selected
                                                .map(id => selectList.find(s => s.Id === id)?.Tag_name)
                                                .join(", ")
                                            : selectList.find(s => s.Id === selected)?.Tag_name
                                    }
                                >
                                    {selectList.map((sensor) => (
                                        <MenuItem key={sensor.Id} value={sensor.Id}>
                                            {mode === "analytics" && (
                                                <Checkbox checked={selectedSensors.includes(sensor.Id)} />
                                            )}
                                            <ListItemText primary={sensor.Tag_name} />
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            {mode === "normal" && (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Graph Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={graphType}
                                        label="Graph type"
                                        onChange={(e) => setGraphType(e.target.value)}
                                        style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#000000', // Border color (optional)
                                            },
                                            '& .MuiSelect-icon': {
                                                color: '#000000', // Dropdown arrow color
                                            },
                                        }}
                                    >
                                        {graphTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            {mode === "analytics" && (

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Graph Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={graphType}
                                        label="Graph type"
                                        onChange={(e) => setGraphType(e.target.value)}
                                        style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#000000', // Border color (optional)
                                            },
                                            '& .MuiSelect-icon': {
                                                color: '#000000', // Dropdown arrow color
                                            },
                                        }}
                                    >
                                        {graphTypesAnalytics.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            )}

                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={6} xl={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Last</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedLast}
                                    label="Last"
                                    onChange={(e) => {
                                        setSelectedLast(e.target.value)

                                    }}
                                    style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#000000', // Border color (optional)
                                        },
                                        '& .MuiSelect-icon': {
                                            color: '#000000', // Dropdown arrow color
                                        },
                                    }}
                                >
                                    <MenuItem value={'1hr'} style={{ color: '#000000', fontWeight: 'bold' }}>1hrs</MenuItem>
                                    <MenuItem value={'8hr'} style={{ color: '#000000', fontWeight: 'bold' }}>8hrs</MenuItem>
                                    <MenuItem value={'1day'} style={{ color: '#000000', fontWeight: 'bold' }}>1day</MenuItem>
                                    <MenuItem value={'1week'} style={{ color: '#000000', fontWeight: 'bold' }}>1week</MenuItem>
                                    <MenuItem value={'15days'} style={{ color: '#000000', fontWeight: 'bold' }}>15days</MenuItem>
                                    <MenuItem value={'30days'} style={{ color: '#000000', fontWeight: 'bold' }}>30days</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={12}>

                            {/* 🔹 NORMAL MODE */}
                            {mode === "normal" && (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"
                                        style={{ color: '#000000', fontWeight: 'bold' }}>Data Aggregations</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedAggregation}
                                        onChange={(e) => setSelectedAggregation(e.target.value)}
                                        displayEmpty
                                        label="Data Aggregations"
                                        // renderValue={(val) => val || "Select Aggregation"}
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000000' },
                                            '& .MuiSelect-icon': { color: '#000000' },
                                        }}
                                    >
                                        {(selectedLast === '1hr' || selectedLast === '8hr') && (
                                            <MenuItem value="latest">Latest</MenuItem>
                                        )}
                                        <MenuItem value="count">Count</MenuItem>
                                        <MenuItem value="avg">Average</MenuItem>
                                        <MenuItem value="max">Max</MenuItem>
                                        <MenuItem value="min">Min</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {/* 🔹 ANALYTICS MODE */}
                            {mode === "analytics" && (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"
                                        style={{ color: '#000000', fontWeight: 'bold' }}>Data Aggregations</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Data Aggregations"

                                        value={selectedAggregation}
                                        onChange={(e) => setSelectedAggregation(e.target.value)}
                                        displayEmpty
                                        // renderValue={(val) => val || "Select Aggregation"}
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000000' },
                                            '& .MuiSelect-icon': { color: '#000000' },
                                        }}
                                    >
                                        <MenuItem value="avg">Average</MenuItem>
                                        <MenuItem value="min">Min</MenuItem>
                                        <MenuItem value="max">Max</MenuItem>
                                        <MenuItem value="sum">Sum</MenuItem>
                                        <MenuItem value="latest">Latest</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={6} xl={12}>

                            {/* 🔥 ANALYTICS MODE */}
                            {mode === "analytics" && (
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        style={{ color: '#000000', fontWeight: 'bold' }}
                                    >
                                        Grouping Interval
                                    </InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={selectedInterval}
                                        label="Grouping Interval"
                                        onChange={(e) => setSelectedInterval(e.target.value)}
                                        style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000000' },
                                            '& .MuiSelect-icon': { color: '#000000' },
                                        }}
                                    >
                                        <MenuItem value="1m">1 Min</MenuItem>
                                        <MenuItem value="5m">5 Min</MenuItem>
                                        <MenuItem value="15m">15 Min</MenuItem>
                                        <MenuItem value="1h">1 Hour</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {/* 🔹 NORMAL MODE (UNCHANGED LOGIC) */}
                            {mode === "normal" && (
                                (selectedLast === '1hr' || selectedLast === '8hr') && selectedAggregation === 'latest' ? (
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            style={{ color: '#000000', fontWeight: 'bold' }}
                                        >
                                            Grouping Interval
                                        </InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={selectedInterval}
                                            label="Grouping Interval"
                                            onChange={(e) => setSelectedInterval(e.target.value)}
                                            style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000000' },
                                                '& .MuiSelect-icon': { color: '#000000' },
                                            }}
                                        >
                                            <MenuItem value="1sec">1 Sec</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            style={{ color: '#000000', fontWeight: 'bold' }}
                                        >
                                            Grouping Interval
                                        </InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={selectedInterval}
                                            label="Grouping Interval"
                                            onChange={(e) => setSelectedInterval(e.target.value)}
                                            style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000000' },
                                                '& .MuiSelect-icon': { color: '#000000' },
                                            }}
                                        >
                                            <MenuItem value="15min">15 Min</MenuItem>
                                            <MenuItem value="30min">30 Min</MenuItem>
                                            <MenuItem value="1hr">1 Hr</MenuItem>
                                            <MenuItem value="1day">1 Day</MenuItem>
                                        </Select>
                                    </FormControl>
                                )
                            )}

                            {mode === "analytics" && graphType === "line" && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Spec Min"
                                            type="number"
                                            value={specMin}
                                            onChange={(e) => setSpecMin(e.target.value)}
                                            InputLabelProps={{
                                                style: { color: "#000000", fontWeight: "bold" }
                                            }}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Spec Max"
                                            type="number"
                                            value={specMax}
                                            onChange={(e) => setSpecMax(e.target.value)}
                                            InputLabelProps={{
                                                style: { color: "#000000", fontWeight: "bold" }
                                            }}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Control Low"
                                            type="number"
                                            value={controlLow}
                                            onChange={(e) => setControlLow(e.target.value)}
                                            InputLabelProps={{
                                                style: { color: "#000000", fontWeight: "bold" }
                                            }}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Control Max"
                                            type="number"
                                            value={controlMax}
                                            onChange={(e) => setControlMax(e.target.value)}
                                            InputLabelProps={{
                                                style: { color: "#000000", fontWeight: "bold" }
                                            }}
                                            sx={{
                                                backgroundColor: "#ffffff",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: "#000000",
                                                },
                                            }}
                                        />
                                    </Grid>
                                </>
                            )}

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setSelectedInterval('');
                        setSelectedAggregation('');
                        setSelectedLast('');
                        setGraphType('');
                        setSelectedSensors([]);
                        setSelectedDevice([])
                        setOpenDialog(false)
                        setIsAddButton(true)
                    }} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        {isAddButton ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openMapDialog}
                onClose={() => setOpenMapDialog(false)}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>
                    Device Location (Zoom View)
                </DialogTitle>

                <DialogContent sx={{ height: "70vh" }}>
                    <GeoLocationWidget
                        locationCoordination={mapMarkers}
                        zoomLevel={8}
                        height="65vh"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenMapDialog(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog sx={{ '& .MuiDialog-paper': { minWidth: '25%' } }}
                maxWidth="sm" open={openPollingDialog} >
                <DialogTitle>Select Polling Interval</DialogTitle>
                <DialogContent>
                    {/* Device Dropdown */}
                    <Grid container spacing={1} marginTop={1}>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label" style={{ color: '#000000', fontWeight: 'bold' }}>Polling Interval</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedPollingInterval}
                                    label="Polling Interval"
                                    onChange={handleChange}
                                    style={{ color: '#000000', fontWeight: 'bold', backgroundColor: '#ffffff' }}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#000000', // Border color (optional)
                                        },
                                        '& .MuiSelect-icon': {
                                            color: '#000000', // Dropdown arrow color
                                        },
                                    }}
                                >
                                    <MenuItem value={10000} style={{ color: '#000000', fontWeight: 'bold' }}>10 sec</MenuItem>
                                    <MenuItem value={15000} style={{ color: '#000000', fontWeight: 'bold' }}>15 sec</MenuItem>
                                    <MenuItem value={30000} style={{ color: '#000000', fontWeight: 'bold' }}>30 sec</MenuItem>
                                    <MenuItem value={900000} style={{ color: '#000000', fontWeight: 'bold' }}>15 min</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {

                        setOpenPollingDialog(false)
                        setIsAddButton(true)
                    }} color="secondary">
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog >
            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
                deleteId={deleteId}
                // deleteService={AddGraphShowDelete}
                deleteService={currentDeleteService}

                handleSuccess={deletehandleSuccess}
                handleException={deletehandleException}
            />
        </>
    );
};

export default DragGraph;

const COLOR_PALETTE = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#9c27b0",
    "#d32f2f",
    "#0288d1",
    "#f57c00",
    "#7b1fa2",
];

const AnalyticsGraphCard = ({ graph, isDarkMode }) => {

    // ✅ Stable line colors
    const coloredLines = useMemo(() => {
        return graph.lines?.map((l, index) => ({
            ...l,
            stableColor: COLOR_PALETTE[index % COLOR_PALETTE.length]
        }));
    }, [graph.lines]);

    // ✅ Stable bar colors
    const coloredBars = useMemo(() => {
        return graph.bars?.map((b, index) => ({
            ...b,
            stableColor: COLOR_PALETTE[index % COLOR_PALETTE.length]
        }));
    }, [graph.bars]);


    if (graph.type === "MULTI_LINE") {
        return (
            <Box>
                {/* ✅ Limit Summary */}
                {(graph.specMin !== undefined || graph.controlLow !== undefined) && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 3,
                            fontSize: 12,
                            fontWeight: 500,
                            mb: 1,
                            flexWrap: "wrap"
                        }}
                    >
                        {graph.specMin !== undefined && graph.specMax !== undefined && (
                            <Box sx={{ color: "#1565c0" }}>
                                <strong>Spec:</strong> {graph.specMin} – {graph.specMax}
                            </Box>
                        )}

                        {graph.controlLow !== undefined && graph.controlMax !== undefined && (
                            <Box sx={{ color: "#ef6c00" }}>
                                <strong>Control:</strong> {graph.controlLow} – {graph.controlMax}
                            </Box>
                        )}
                    </Box>
                )}

                <ResponsiveContainer width="100%" height={225}>
                    <LineChart data={graph.data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey={graph.xKey || "dateTime"}
                            tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                        />

                        <YAxis
                            domain={["auto", "auto"]}
                            tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                        />

                        {/* Limit Lines */}
                        {graph.specMin !== undefined && (
                            <ReferenceLine
                                y={graph.specMin}
                                stroke="#1565c0"
                                strokeDasharray="4 4"
                            />
                        )}

                        {graph.specMax !== undefined && (
                            <ReferenceLine
                                y={graph.specMax}
                                stroke="#1565c0"
                                strokeDasharray="4 4"
                            />
                        )}

                        {graph.controlLow !== undefined && (
                            <ReferenceLine
                                y={graph.controlLow}
                                stroke="#ef6c00"
                                strokeDasharray="6 6"
                            />
                        )}

                        {graph.controlMax !== undefined && (
                            <ReferenceLine
                                y={graph.controlMax}
                                stroke="#ef6c00"
                                strokeDasharray="6 6"
                            />
                        )}

                        <Tooltip />

                        {/* ✅ Professional Custom Legend */}
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{
                                marginTop: 8
                            }}
                            content={({ payload }) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        gap: 2,
                                        fontSize: 12,
                                        maxHeight: 50,
                                        overflowY: "auto"
                                    }}
                                >
                                    {payload.map((entry, index) => (
                                        <MuiTooltip
                                            key={index}
                                            title={entry.value}
                                            arrow
                                            placement="top"
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    maxWidth: 180
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: entry.color,
                                                        borderRadius: 1,
                                                        mr: 0.5
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }}
                                                >
                                                    {entry.value}
                                                </Box>
                                            </Box>
                                        </MuiTooltip>
                                    ))}
                                </Box>
                            )}
                        />

                        {coloredLines?.map((l) => (
                            <Line
                                key={l.key}
                                dataKey={l.key}
                                name={l.label}  // ✅ keep full name here
                                stroke={l.stableColor}
                                strokeWidth={3}
                                dot={false}
                                type="monotone"
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        );
    }
    // 🟠 HISTOGRAM
    if (graph.type === "HISTOGRAM") {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={graph.data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey={graph.xKey || "range"}
                        tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                    />

                    <YAxis
                        tick={{ fill: isDarkMode ? "#ffffff" : "#000000" }}
                    />

                    <Tooltip />
                    <Legend />

                    {coloredBars?.map((b, index) => (
                        <Bar
                            key={b.key}
                            dataKey={b.key}
                            name={b.label}
                            fill={b.stableColor}
                        />
                    ))}

                </BarChart>
            </ResponsiveContainer>
        );
    }

    if (graph.type === "BOX") {
        return <AnalyticsBoxPlot graph={graph} isDarkMode={isDarkMode} />;
    }

    return null;
};