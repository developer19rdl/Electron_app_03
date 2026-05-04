
// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Tabs,
//     Tab,
//     Typography,
//     Button,
//     Input,
//     Card,
//     CardHeader,
//     Container,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     MenuItem,
//     IconButton,
//     Menu,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
// import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
// import PowerIcon from "@mui/icons-material/Power";
// import ColorLensIcon from "@mui/icons-material/ColorLens";
// import SettingsIcon from "@mui/icons-material/Settings";
// import UploadIcon from "@mui/icons-material/Upload";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery, useTheme } from "@mui/material";
// import { AddScadaService, DevicesFetchShowService, SearchDevicesFetchService, ShowSelectDropDown, ShowSelectSensors, ShowScadaServiceList } from "../../services/LoginPageService";
// import ApplicationStore from "../../utils/localStorageUtil";

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         "aria-controls": `simple-tabpanel-${index}`,
//     };
// }

// function TabPanel({ children, value, index }) {
//     return (
//         <div role="tabpanel" hidden={value !== index}>
//             {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
//         </div>
//     );
// }

// const iconOptions = [
//     { label: "Location", value: "location", icon: <AddLocationAltIcon /> },
//     { label: "Tank", value: "tank", icon: <OpacityIcon /> },
//     { label: "Motor", value: "motor", icon: <PrecisionManufacturingIcon /> },
//     { label: "Sensor", value: "sensor", icon: <SettingsInputComponentIcon /> },
//     { label: "Power", value: "power", icon: <PowerIcon /> },
// ];

// const ScadaView = () => {
//     const [colorDialogOpen, setColorDialogOpen] = useState(false);
//     const [renameDialogOpen, setRenameDialogOpen] = useState(false);
//     const [renameTabIndex, setRenameTabIndex] = useState(null);
//     const [newTabName, setNewTabName] = useState("");

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const { userDetails } = ApplicationStore().getStorage('userDetails');
//     console.log("userDetailsid", userDetails?.id);
//     const location = useLocation();  // Access the location object
//     // const { locationDetails } = location.state || {};
//     const [tabIndex, setTabIndex] = useState(0);
//     const [deviceList, setDeviceList] = useState([]);
//     const [locationDetails, setlocationDetails] = useState([]);
//     const [selectedDevice, setSelectedDevice] = useState("");
//     const [selectedSensors, setSelectedSensors] = useState([]);
//     const [selectList, setSelectList] = useState([]);
//     const [scadaTabs, setScadaTabs] = useState([
//         { name: "PumpSet 1", image: "", markers: [] },
//         { name: "PumpSet 2", image: "", markers: [] },
//         { name: "PumpSet 3", image: "", markers: [] },
//     ]);
//     const [liveData, setLiveData] = useState({});
//     const [selectedColor, setSelectedColor] = useState("#040408ff");

//     // ⚙️ Menu anchor for settings (instead of dialog)
//     const [menuAnchor, setMenuAnchor] = useState(null);
//     const menuOpen = Boolean(menuAnchor);

//     // Marker Dialog
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [newMarkerData, setNewMarkerData] = useState({
//         x: 0,
//         y: 0,
//         label: "",
//         unit: "",
//         tagKey: "",
//         icon: "location",
//         color: "#000000",
//     });
//     const [pendingTabIndex, setPendingTabIndex] = useState(null);

//     // Simulated live data


//     useEffect(() => {
//         DevicesFetchShowService({
//             userId: userDetails?.id,
//         }, handleDeviceSuccess, handleDeviceException);
//         ShowScadaServiceList(
//             {
//                 userId: userDetails?.id,
//             },
//             handleScadaSuccess,
//             handleScadaException,
//         );
//     }, [locationDetails]);

//     useEffect(() => {
//         // const socket = io("https://wisething.in/", {
//         const socket = io(`${process.env.REACT_APP_BASE_URL}/`, {
//             transports: ["websocket"],
//             reconnection: true,
//             reconnectionAttempts: 10,
//             reconnectionDelay: 2000,
//         });

//         socket.on("connect", () => {
//             console.log("🟢 Socket Connected:", socket.id);
//         });

//         socket.on("live_data", (data) => {
//             console.log("📡 Live Data Received:", data);

//             if (data?.tagId && data?.value !== undefined) {
//                 setLiveData(prev => ({
//                     ...prev,
//                     [data.tagId]: data.value,
//                 }));
//             }
//         });

//         socket.on("disconnect", () => {
//             console.log("🔴 Socket Disconnected");
//         });

//         socket.on("connect_error", (err) => {
//             console.log("⚠️ Connection Error:", err.message);
//         });

//         return () => socket.disconnect();
//     }, []);



//     const handleDeviceSuccess = (dataObject) => {
//         setDeviceList(dataObject?.data || []);
//         setlocationDetails(dataObject?.locationId);
//     };
//     const handleDeviceException = () => {
//     };

//     const handleScadaSuccess = (dataObject) => {
//         const scadaData = dataObject?.data || [];

//         setScadaTabs((prevTabs) => {
//             // Find the maximum tab index required by the data
//             const maxTabNeeded = Math.max(...scadaData.map(item => Number(item.scadaTab)), 3);

//             // Create a base array of tabs if they don't exist
//             let updatedTabs = [...prevTabs];
//             while (updatedTabs.length < maxTabNeeded) {
//                 updatedTabs.push({ name: `PumpSet ${updatedTabs.length + 1}`, image: "", markers: [] });
//             }

//             // Reset markers to prevent duplicates on refresh
//             updatedTabs = updatedTabs.map(tab => ({ ...tab, markers: [] }));

//             scadaData.forEach((item) => {
//                 const idx = Number(item.scadaTab) - 1;
//                 const imageUrl = item.image?.startsWith("http")
//                     ? item.image
//                     // : `https://wisething.in/Mardah/Pump_node_server/public/${item.image}`;
//                     : `${process.env.REACT_APP_BASE_URL}/${item.image}`;

//                 if (!updatedTabs[idx].image && item.image) {
//                     updatedTabs[idx].image = imageUrl;
//                 }

//                 updatedTabs[idx].markers.push({
//                     id: item.id,
//                     x: item.x,
//                     y: item.y,
//                     label: item.titleName || "",
//                     unit: item.units || "",
//                     tagKey: item.tagsId,
//                     color: item.color || "#040408ff",
//                     sensorValue: item.sensorValue,
//                 });
//             });
//             return updatedTabs;
//         });
//     };
//     const handleScadaException = () => {
//         // optionally show error toast here
//         resetFormFields();
//     };


//     const handleGetSensorSuccess = (dataObject) => {
//         setSelectList(dataObject?.tags || []);
//     };
//     const handleGetSensorException = () => {
//     };

//     const handleImageUpload = (e, index) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // 🔥 FILE SIZE CHECK (Max 500 KB)
//         const fileSizeKB = file.size / 1024;
//         if (fileSizeKB > 500) {
//             alert("Image size must be less than 500 KB");
//             return;
//         }

//         // 🔥 Continue normal preview load
//         const reader = new FileReader();
//         reader.onload = (ev) => {
//             const updatedTabs = [...scadaTabs];
//             updatedTabs[index].image = ev.target.result; // Base64 preview
//             setScadaTabs(updatedTabs);
//         };
//         reader.readAsDataURL(file);
//     };


//     // Add marker
//     const handleImageClick = (e, tabIndex) => {
//         const imgRect = e.target.getBoundingClientRect();
//         const x = ((e.clientX - imgRect.left) / imgRect.width) * 100;
//         const y = ((e.clientY - imgRect.top) / imgRect.height) * 100;

//         setNewMarkerData({
//             x,
//             y,
//             label: "",
//             unit: "",
//             tagKey: "",
//             icon: "location",
//             color: selectedColor,
//         });
//         setPendingTabIndex(tabIndex);
//         setDialogOpen(true);
//     };

//     // const handleAddMarker = () => {
//     //     const { x, y, label, unit, tagKey, icon, color } = newMarkerData;
//     //     const newMarker = {
//     //         id: Date.now(),
//     //         x,
//     //         y,
//     //         label: label || `Point ${scadaTabs[pendingTabIndex].markers.length + 1}`,
//     //         unit,
//     //         tagKey,
//     //         icon,
//     //         color,
//     //         valueKey: tagKey || `val${Date.now()}`,
//     //     };

//     //     const updatedTabs = [...scadaTabs];
//     //     updatedTabs[pendingTabIndex].markers.push(newMarker);
//     //     setScadaTabs(updatedTabs);
//     //     setLiveData((prev) => ({ ...prev, [newMarker.valueKey]: "0.0" }));
//     //     setDialogOpen(false);
//     // };
//     const handleAddMarker = () => {
//         const { x, y, label, unit, icon } = newMarkerData;

//         // Find sensor details
//         const selectedSensorData = selectList.find(s => s.id === selectedSensors);

//         const tabImage = scadaTabs[pendingTabIndex].image || "";
//         // const imagePathToSend = tabImage.startsWith("https://wisething.in/")
//         //     ? tabImage.replace("https://wisething.in/", "")
//         //     : tabImage;
//         const imagePathToSend = tabImage.startsWith(`${process.env.REACT_APP_BASE_URL}/`)
//             ? tabImage.replace(process.env.REACT_APP_BASE_URL, "")
//             : tabImage;

//         // Prepare backend payload
//         const payload = {
//             userId: userDetails?.id,
//             locationId: locationDetails,
//             deviceId: selectedDevice,
//             tagsId: selectedSensorData?.id,            // SENSOR ID  ✔
//             units: unit,                               // UNIT ✔ (user entered)
//             titleName: label,                          // DISPLAY NAME ✔
//             x: x,
//             y: y,
//             color: selectedColor,
//             // icon: icon,
//             image: imagePathToSend,
//             scadaTab: String(pendingTabIndex + 1), // send as "1", "2", ...
//         };

//         console.log("SCADA PAYLOAD SENT:", payload);

//         // Call backend API
//         AddScadaService(
//             payload,
//             (res) => {
//                 console.log("SCADA Saved Successfully:", res);
//                 ShowScadaServiceList(
//                     {
//                         userId: userDetails?.id,
//                     },
//                     handleScadaSuccess,
//                     handleScadaException,
//                 );
//             },
//             (err) => {
//                 console.log("SCADA Save Error:", err);
//             }
//         );

//         // Existing UI logic (unchanged)
//         const newMarker = {
//             id: Date.now(),
//             x,
//             y,
//             label: label || `Point ${scadaTabs[pendingTabIndex].markers.length + 1}`,
//             unit,
//             tagKey: selectedSensorData?.id,
//             // icon,
//             color: selectedColor,
//             valueKey: `val${Date.now()}`,
//         };

//         const updatedTabs = [...scadaTabs];
//         updatedTabs[pendingTabIndex].markers.push(newMarker);
//         setScadaTabs(updatedTabs);

//         setLiveData((prev) => ({ ...prev, [newMarker.valueKey]: "0.0" }));
//         setDialogOpen(false);
//     };


//     const handleColorChange = (e) => setSelectedColor(e.target.value);

//     const addNewScadaTab = () => {
//         const newTab = {
//             // name: `SCADA ${scadaTabs.length + 1}`,
//             name: ` PumpSet ${scadaTabs.length + 1}`,
//             image: "",
//             markers: [],
//         };
//         setScadaTabs([...scadaTabs, newTab]);
//         setTabIndex(scadaTabs.length);
//     };

//     const renderIcon = (type, size = 26, color = "error") => {
//         switch (type) {
//             case "tank":
//                 return <OpacityIcon color={color} sx={{ fontSize: size }} />;
//             case "motor":
//                 return <PrecisionManufacturingIcon color={color} sx={{ fontSize: size }} />;
//             case "sensor":
//                 return <SettingsInputComponentIcon color={color} sx={{ fontSize: size }} />;
//             case "power":
//                 return <PowerIcon color={color} sx={{ fontSize: size }} />;
//             default:
//                 return <AddLocationAltIcon color={color} sx={{ fontSize: size }} />;
//         }
//     };
//     const resetFormFields = () => {
//         setSelectedSensors('');
//         setSelectedDevice('');
//         setNewMarkerData({
//             label: '',
//             unit: '',
//             icon: '',
//         });
//     };

//     return (
//         <Card
//             style={{
//                 boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//                 borderRadius: "12px",
//             }}
//         >
//             <Container maxWidth={false} style={{ height: "94vh" }}>
//                 <Box sx={{ width: "100%", height: "94vh" }}>
//                     {/* Tabs Header */}
//                     <CardHeader
//                         sx={{
//                             py: 0.5,
//                             px: 1,
//                             background: "#fafafa",
//                             borderBottom: "1px solid #ddd",
//                         }}
//                         title={
//                             <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
//                                 <Tabs
//                                     value={tabIndex}
//                                     onChange={(e, newValue) => setTabIndex(newValue)}
//                                     variant="scrollable"
//                                     scrollButtons="auto"
//                                     sx={{
//                                         flexGrow: 1,
//                                         minHeight: 36,
//                                         "& .MuiTab-root": {
//                                             minHeight: 36,
//                                             fontSize: "14px",
//                                             textTransform: "none",
//                                         },
//                                     }}
//                                 >
//                                     {scadaTabs.map((tab, index) => (
//                                         // <Tab key={index} label={tab.name} {...a11yProps(index)} />
//                                         <Tab
//                                             key={index}
//                                             label={tab.name}
//                                             {...a11yProps(index)}
//                                             onDoubleClick={() => {
//                                                 setRenameTabIndex(index);
//                                                 setNewTabName(tab.name);
//                                                 setRenameDialogOpen(true);
//                                             }}
//                                         />

//                                     ))}
//                                 </Tabs>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     onClick={addNewScadaTab}
//                                     sx={{
//                                         ml: 1,
//                                         fontSize: "13px",
//                                         textTransform: "none",
//                                         height: "32px",
//                                     }}
//                                 >
//                                     + Add PumpSet
//                                 </Button>
//                             </Box>
//                         }
//                     />

//                     {/* Tab Panels */}
//                     {scadaTabs.map((tab, index) => (
//                         <TabPanel value={tabIndex} index={index} key={index}>
//                             <Box
//                                 sx={{
//                                     position: "relative",
//                                     width: "100%",
//                                     height: "calc(100vh - 160px)",
//                                     backgroundColor: "#000",
//                                     overflow: "hidden",
//                                     cursor: "crosshair",
//                                 }}
//                             >
//                                 {/* ⚙️ Floating Settings Icon */}
//                                 <IconButton
//                                     onClick={(e) => setMenuAnchor(e.currentTarget)}
//                                     sx={{
//                                         position: "absolute",
//                                         top: 10,
//                                         right: 10,
//                                         color: "#fff",
//                                         background: "rgba(0,0,0,0.5)",
//                                         "&:hover": { background: "rgba(0,0,0,0.8)" },
//                                         zIndex: 10,
//                                     }}
//                                 >
//                                     <SettingsIcon />
//                                 </IconButton>

//                                 {/* ⚙️ SCADA Settings Menu */}
//                                 {/* <Menu
//                                     anchorEl={menuAnchor}
//                                     open={menuOpen}
//                                     onClose={() => setMenuAnchor(null)}
//                                     PaperProps={{
//                                         sx: {
//                                             borderRadius: 2,
//                                             minWidth: 200,
//                                             p: 0.5,
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem>
//                                         <label style={{ width: "100%", cursor: "pointer" }}>
//                                             <UploadIcon sx={{ fontSize: 18, mr: 1 }} />
//                                             Upload Image
//                                             <Input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(e) => {
//                                                     handleImageUpload(e, tabIndex);
//                                                     setMenuAnchor(null);
//                                                 }}
//                                                 sx={{ display: "none" }}
//                                             />
//                                         </label>
//                                     </MenuItem>

//                                     <MenuItem>
//                                         <ColorLensIcon sx={{ fontSize: 18, mr: 1 }} />
//                                         <input
//                                             type="color"
//                                             value={selectedColor}
//                                             onChange={(e) => {
//                                                 handleColorChange(e);
//                                                 setMenuAnchor(null);
//                                             }}
//                                             style={{
//                                                 border: "none",
//                                                 cursor: "pointer",
//                                                 background: "transparent",
//                                                 width: "30px",
//                                                 height: "30px",
//                                             }}
//                                         />
//                                         <Typography variant="body2" sx={{ ml: 1 }}>
//                                             Text Color
//                                         </Typography>
//                                     </MenuItem>
//                                 </Menu> */}
//                                 <Menu
//                                     anchorEl={menuAnchor}
//                                     open={menuOpen}
//                                     onClose={() => setMenuAnchor(null)}
//                                     PaperProps={{
//                                         sx: {
//                                             borderRadius: 2,
//                                             minWidth: 200,
//                                             p: 0.5,
//                                         },
//                                     }}
//                                 >
//                                     {/* Upload Image */}
//                                     <MenuItem>
//                                         <label style={{ width: "100%", cursor: "pointer" }}>
//                                             <UploadIcon sx={{ fontSize: 18, mr: 1 }} />
//                                             Upload Image
//                                             <Input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(e) => {
//                                                     handleImageUpload(e, tabIndex);
//                                                     setMenuAnchor(null);
//                                                 }}
//                                                 sx={{ display: "none" }}
//                                             />
//                                         </label>
//                                     </MenuItem>

//                                     {/* Open Dialog for Color Picker */}
//                                     <MenuItem
//                                         onClick={() => {
//                                             setColorDialogOpen(true);
//                                             setMenuAnchor(null);
//                                         }}
//                                     >
//                                         <ColorLensIcon sx={{ fontSize: 18, mr: 1 }} />
//                                         <Typography variant="body2">Choose Text Color</Typography>
//                                     </MenuItem>
//                                 </Menu>
//                                 <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)}>
//                                     <DialogTitle>Select Text Color</DialogTitle>

//                                     <DialogContent>
//                                         <input
//                                             type="color"
//                                             value={selectedColor}
//                                             onChange={(e) => setSelectedColor(e.target.value)}
//                                             style={{
//                                                 width: "100%",
//                                                 height: "60px",
//                                                 border: "none",
//                                                 cursor: "pointer",
//                                                 background: "transparent",
//                                             }}
//                                         />
//                                     </DialogContent>

//                                     <DialogActions>
//                                         <Button onClick={() => setColorDialogOpen(false)}>Close</Button>
//                                     </DialogActions>
//                                 </Dialog>


//                                 {/* Main Image Section */}
//                                 {tab.image ? (
//                                     <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
//                                         <Box
//                                             sx={{
//                                                 position: "relative",
//                                                 minWidth: isMobile ? "900px" : "100%",
//                                                 height: "100%",
//                                                 minHeight: isMobile ? "600px" : "auto",
//                                             }}
//                                         >
//                                             <img
//                                                 src={tab.image}
//                                                 alt="SCADA Layout"
//                                                 style={{
//                                                     width: "100%",
//                                                     height: "100%",
//                                                     objectFit: "fill",
//                                                 }}
//                                                 onClick={(e) => handleImageClick(e, index)}
//                                             />
//                                             {tab.markers.map((marker) => (
//                                                 <Box
//                                                     key={marker.id}
//                                                     sx={{
//                                                         position: "absolute",
//                                                         left: `${marker.x}%`,
//                                                         top: `${marker.y}%`,
//                                                         transform: "translate(-50%, -100%)",
//                                                         textAlign: "center",
//                                                         pointerEvents: "none",
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             backgroundColor: marker.color,
//                                                             border: `1px solid ${marker.color}`,
//                                                             borderRadius: "4px",
//                                                             padding: "2px 4px",
//                                                             marginTop: "2px",
//                                                             minWidth: "80px",
//                                                         }}
//                                                     >
//                                                         <Typography
//                                                             variant="caption"
//                                                             sx={{
//                                                                 color: "#ffffff",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "12px",
//                                                                 display: "block",
//                                                                 textAlign: "center",
//                                                                 marginTop: "2px",
//                                                             }}
//                                                         >
//                                                             {liveData[marker.tagKey] !== undefined ? liveData[marker.tagKey] : marker.sensorValue}{marker.unit ? ` ${marker.unit}` : ''}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             ))}
//                                         </Box>
//                                     </Box>
//                                 ) : (
//                                     <Typography
//                                         variant="h6"
//                                         sx={{ color: "#777", textAlign: "center", mt: 10 }}
//                                     >
//                                         Upload an image for {tab.name} using ⚙️
//                                     </Typography>
//                                 )}
//                             </Box>
//                         </TabPanel>
//                     ))}
//                 </Box>
//             </Container>

//             {/* 🟩 Marker Add Dialog (Unchanged) */}
//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//                 <DialogTitle>Add New Marker</DialogTitle>

//                 <DialogContent>

//                     {/* GRID CONTAINER */}
//                     <Grid container spacing={2}>

//                         {/* Select Device */}
//                         <Grid item xs={6}>
//                             <FormControl fullWidth sx={{ mt: 1 }}>
//                                 <InputLabel id="select-device-label" sx={{ color: "#000", fontWeight: "bold" }}>
//                                     Select Device
//                                 </InputLabel>

//                                 <Select
//                                     labelId="select-device-label"
//                                     value={selectedDevice}
//                                     label="Select Device"
//                                     size="small"
//                                     onChange={(e) => {
//                                         setSelectedDevice(e.target.value);
//                                         ShowSelectSensors(
//                                             { deviceId: e.target.value },
//                                             handleGetSensorSuccess,
//                                             handleGetSensorException
//                                         );
//                                     }}
//                                     sx={{
//                                         color: "#000",
//                                         fontWeight: "bold",
//                                         backgroundColor: "#fff",
//                                         "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                                         "& .MuiSelect-icon": { color: "#000" },
//                                     }}
//                                 >
//                                     {deviceList.map((device) => (
//                                         <MenuItem key={device.id} value={device.id}>
//                                             {device.deviceName}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* Select Sensors */}
//                         <Grid item xs={6}>
//                             <FormControl fullWidth sx={{ mt: 1 }}>
//                                 <InputLabel id="select-sensor-label" sx={{ color: "#000", fontWeight: "bold" }}>
//                                     Select Sensors
//                                 </InputLabel>

//                                 <Select
//                                     labelId="select-sensor-label"
//                                     value={selectedSensors}
//                                     label="Select Sensors"
//                                     size="small"
//                                     onChange={(e) => setSelectedSensors(e.target.value)}
//                                     sx={{
//                                         color: "#000",
//                                         fontWeight: "bold",
//                                         backgroundColor: "#fff",
//                                         "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                                         "& .MuiSelect-icon": { color: "#000" },
//                                     }}
//                                 >
//                                     {selectList.map((sensor) => (
//                                         <MenuItem key={sensor.id} value={sensor.id}>
//                                             {sensor.tagDisplayName}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* Other Fields */}
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Display Name"
//                                 size="small"
//                                 value={newMarkerData.label}
//                                 InputLabelProps={{
//                                     sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
//                                 }}
//                                 sx={{
//                                     color: "#000",
//                                     fontWeight: "bold",
//                                     backgroundColor: "#fff",
//                                     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                                     "& .MuiSelect-icon": { color: "#000" },
//                                 }}
//                                 onChange={(e) =>
//                                     setNewMarkerData({ ...newMarkerData, label: e.target.value })
//                                 }
//                             />
//                         </Grid>

//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Unit"
//                                 size="small"
//                                 value={newMarkerData.unit}
//                                 InputLabelProps={{
//                                     sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
//                                 }}
//                                 onChange={(e) =>
//                                     setNewMarkerData({ ...newMarkerData, unit: e.target.value })
//                                 }
//                                 sx={{
//                                     color: "#000",
//                                     fontWeight: "bold",
//                                     backgroundColor: "#fff",
//                                     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                                     "& .MuiSelect-icon": { color: "#000" },
//                                 }}
//                             />
//                         </Grid>

//                         {/* <Grid item xs={6}>
//                 <TextField
//                     fullWidth
//                     label="Backend Tag Key"
//                     size="small"
//                     value={newMarkerData.tagKey}
//                     InputLabelProps={{
//     sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
//   }}
//                     onChange={(e) =>
//                         setNewMarkerData({ ...newMarkerData, tagKey: e.target.value })
//                     }
//                      sx={{
//                             color: "#000",
//                             fontWeight: "bold",
//                             backgroundColor: "#fff",
//                             "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                             "& .MuiSelect-icon": { color: "#000" },
//                         }}
//                 />
//             </Grid> */}

//                         {/* <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 select
//                                 label="Icon Type"
//                                 size="small"
//                                 value={newMarkerData.icon}
//                                 InputLabelProps={{
//                                     sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
//                                 }}
//                                 sx={{
//                                     color: "#000",
//                                     fontWeight: "bold",
//                                     backgroundColor: "#fff",
//                                     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
//                                     "& .MuiSelect-icon": { color: "#000" },
//                                 }}
//                                 onChange={(e) =>
//                                     setNewMarkerData({ ...newMarkerData, icon: e.target.value })
//                                 }
//                             >
//                                 {iconOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.icon} {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid> */}

//                     </Grid>
//                 </DialogContent>

//                 <DialogActions>
//                     <Button onClick={() => {
//                         setDialogOpen(false)
//                         setSelectedSensors('');
//                         setSelectedDevice('')
//                         setNewMarkerData({
//                             label: '',
//                             unit: '',
//                             icon: '',
//                         })
//                     }}>Cancel</Button>
//                     <Button variant="contained" onClick={handleAddMarker}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
//                 <DialogTitle>Rename SCADA Tab</DialogTitle>

//                 <DialogContent style={{ paddingTop: 5 }}>
//                     <TextField
//                         fullWidth
//                         label="Tab Name"
//                         value={newTabName}
//                         onChange={(e) => setNewTabName(e.target.value)}
//                         autoFocus
//                     />
//                 </DialogContent>

//                 <DialogActions>
//                     <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             const updatedTabs = [...scadaTabs];
//                             updatedTabs[renameTabIndex].name = newTabName || updatedTabs[renameTabIndex].name;
//                             setScadaTabs(updatedTabs);
//                             setRenameDialogOpen(false);
//                         }}
//                     >
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>


//         </Card>
//     );
// };

// export default ScadaView;


import React, { useState, useEffect } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Button,
    Input,
    Card,
    CardHeader,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Menu,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { io } from "socket.io-client";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OpacityIcon from "@mui/icons-material/Opacity";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import PowerIcon from "@mui/icons-material/Power";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { AddScadaService, DevicesFetchShowService, SearchDevicesFetchService, ShowSelectDropDown, ShowSelectSensors, ShowScadaServiceList, DeleteScadaService, UpdateScadaService } from "../../services/LoginPageService";
import ApplicationStore from "../../utils/localStorageUtil";
import NotificationBar from "../notification/ServiceNotificationBar";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

const iconOptions = [
    { label: "Location", value: "location", icon: <AddLocationAltIcon /> },
    { label: "Tank", value: "tank", icon: <OpacityIcon /> },
    { label: "Motor", value: "motor", icon: <PrecisionManufacturingIcon /> },
    { label: "Sensor", value: "sensor", icon: <SettingsInputComponentIcon /> },
    { label: "Power", value: "power", icon: <PowerIcon /> },
];

const ScadaView = () => {
    const [colorDialogOpen, setColorDialogOpen] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [renameTabIndex, setRenameTabIndex] = useState(null);
    const [newTabName, setNewTabName] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { userDetails } = ApplicationStore().getStorage('userDetails');
    console.log("userDetailsid", userDetails?.id);
    const location = useLocation();  // Access the location object
    // const { locationDetails } = location.state || {};
    const [tabIndex, setTabIndex] = useState(0);
    const [deviceList, setDeviceList] = useState([]);
    const [locationDetails, setlocationDetails] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");
    const [selectedSensors, setSelectedSensors] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [scadaTabs, setScadaTabs] = useState([
        { name: "PumpSet 1", image: "", markers: [] },
        { name: "PumpSet 2", image: "", markers: [] },
        { name: "PumpSet 3", image: "", markers: [] },
    ]);
    const [liveData, setLiveData] = useState({});
    const [selectedColor, setSelectedColor] = useState("#040408ff");

    // ⚙️ Menu anchor for settings (instead of dialog)
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);

    // Marker Dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newMarkerData, setNewMarkerData] = useState({
        x: 0,
        y: 0,
        label: "",
        unit: "",
        tagKey: "",
        icon: "location",
        color: "#000000",
    });
    const [pendingTabIndex, setPendingTabIndex] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Alignment Guide & Dragging States
    const [hoverCoords, setHoverCoords] = useState(null);
    const [activeGuides, setActiveGuides] = useState({ x: null, y: null });
    const [draggingMarker, setDraggingMarker] = useState(null);
    const [openNotification, setNotification] = useState({
        status: false,
        type: "error",
        message: "",
    });

    const handleCloseNotification = () => {
        setNotification({
            status: false,
            type: "error",
            message: "",
        });
    };

    // Simulated live data


    useEffect(() => {
        DevicesFetchShowService({
            userId: userDetails?.id,
        }, handleDeviceSuccess, handleDeviceException);
        ShowScadaServiceList(
            {
                userId: userDetails?.id,
            },
            handleScadaSuccess,
            handleScadaException,
        );
    }, [locationDetails]);

    useEffect(() => {
        // const socket = io("https://wisething.in/", {
        const socket = io(`${process.env.REACT_APP_BASE_URL}/`, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
        });

        socket.on("connect", () => {
            console.log("🟢 Socket Connected:", socket.id);
        });

        socket.on("live_data", (data) => {
            console.log("📡 Live Data Received:", data);

            if (data?.tagId && data?.value !== undefined) {
                setLiveData(prev => ({
                    ...prev,
                    [data.tagId]: data.value,
                }));
            }
        });

        socket.on("disconnect", () => {
            console.log("🔴 Socket Disconnected");
        });

        socket.on("connect_error", (err) => {
            console.log("⚠️ Connection Error:", err.message);
        });

        return () => socket.disconnect();
    }, []);



    const handleDeviceSuccess = (dataObject) => {
        setDeviceList(dataObject?.data || []);
        setlocationDetails(dataObject?.locationId);
    };
    const handleDeviceException = () => {
    };

    const handleScadaSuccess = (dataObject) => {
        const scadaData = dataObject?.data || [];

        setScadaTabs((prevTabs) => {
            // Find the maximum tab index required by the data
            const maxTabNeeded = Math.max(...scadaData.map(item => Number(item.scadaTab)), 3);

            // Create a base array of tabs if they don't exist
            let updatedTabs = [...prevTabs];
            while (updatedTabs.length < maxTabNeeded) {
                updatedTabs.push({ name: `PumpSet ${updatedTabs.length + 1}`, image: "", markers: [] });
            }

            // Reset markers to prevent duplicates on refresh
            updatedTabs = updatedTabs.map(tab => ({ ...tab, markers: [] }));

            scadaData.forEach((item) => {
                const idx = Number(item.scadaTab) - 1;
                const imageUrl = item.image?.startsWith("http")
                    ? item.image
                    // : `https://wisething.in/Mardah/Pump_node_server/public/${item.image}`;
                    : `${process.env.REACT_APP_BASE_URLImage}/${item.image}`;

                if (!updatedTabs[idx].image && item.image) {
                    updatedTabs[idx].image = imageUrl;
                }

                updatedTabs[idx].markers.push({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    label: item.titleName || "",
                    unit: item.units || "",
                    tagKey: item.tagsId,
                    color: item.color || "#040408ff",
                    sensorValue: item.sensorValue,
                });
            });
            return updatedTabs;
        });
    };
    const handleScadaException = () => {
        setNotification({
            status: true,
            type: "error",
            message: "Unable to fetch SCADA data",
        });
        resetFormFields();
    };


    const handleGetSensorSuccess = (dataObject) => {
        setSelectList(dataObject?.tags || []);
    };
    const handleGetSensorException = () => {
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        // 🔥 FILE SIZE CHECK (Max 500 KB)
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > 500) {
            alert("Image size must be less than 500 KB");
            return;
        }

        // 🔥 Continue normal preview load
        const reader = new FileReader();
        reader.onload = (ev) => {
            const updatedTabs = [...scadaTabs];
            updatedTabs[index].image = ev.target.result; // Base64 preview
            setScadaTabs(updatedTabs);
        };
        reader.readAsDataURL(file);
    };


    const handleImageClick = (e, tabIndex) => {
        if (!isEditMode) return;
        const imgRect = e.target.getBoundingClientRect();
        const x = ((e.clientX - imgRect.left) / imgRect.width) * 100;
        const y = ((e.clientY - imgRect.top) / imgRect.height) * 100;

        setNewMarkerData({
            x: activeGuides.x !== null ? activeGuides.x : x,
            y: activeGuides.y !== null ? activeGuides.y : y,
            label: "",
            unit: "",
            tagKey: "",
            icon: "location",
            color: selectedColor,
        });
        setPendingTabIndex(tabIndex);
        setDialogOpen(true);
    };

    const handleMouseMove = (e, tabIndex) => {
        const imgRect = e.currentTarget.getBoundingClientRect();
        const rawX = ((e.clientX - imgRect.left) / imgRect.width) * 100;
        const rawY = ((e.clientY - imgRect.top) / imgRect.height) * 100;

        // Constrain between 0 and 100
        const x = Math.max(0, Math.min(100, rawX));
        const y = Math.max(0, Math.min(100, rawY));

        let snapX = null;
        let snapY = null;
        const SNAP_THRESHOLD = 1.5; // percentage distance to trigger snap

        scadaTabs[tabIndex].markers.forEach(marker => {
            // Don't snap to the marker currently being dragged
            if (draggingMarker && draggingMarker.markerId === marker.id) return;

            if (Math.abs(marker.x - x) < SNAP_THRESHOLD) snapX = marker.x;
            if (Math.abs(marker.y - y) < SNAP_THRESHOLD) snapY = marker.y;
        });

        setActiveGuides({ x: snapX, y: snapY });
        setHoverCoords({ x, y });

        // Update dragging marker position
        if (draggingMarker && draggingMarker.tabIndex === tabIndex) {
            const updatedTabs = [...scadaTabs];
            const markerIndex = updatedTabs[tabIndex].markers.findIndex(m => m.id === draggingMarker.markerId);
            if (markerIndex !== -1) {
                updatedTabs[tabIndex].markers[markerIndex].x = snapX !== null ? snapX : x;
                updatedTabs[tabIndex].markers[markerIndex].y = snapY !== null ? snapY : y;
                setScadaTabs(updatedTabs);
            }
        }
    };

    const handleMouseLeave = () => {
        setHoverCoords(null);
        setActiveGuides({ x: null, y: null });
    };

    const handleMouseDownMarker = (e, tabIndex, marker) => {
        e.stopPropagation(); // prevent triggering image click
        setDraggingMarker({ tabIndex, markerId: marker.id });
    };

    const handleMouseUp = () => {
        if (draggingMarker) {
            const { tabIndex, markerId } = draggingMarker;
            const marker = scadaTabs[tabIndex].markers.find(m => m.id === markerId);
            if (marker) {
                UpdateScadaService(
                    markerId,
                    { x: marker.x, y: marker.y, userId: userDetails?.id },
                    (res) => {
                        console.log("Marker position updated on server", res);
                        setNotification({
                            status: true,
                            type: "success",
                            message: "Marker position updated successfully",
                        });
                    },
                    (err) => {
                        console.error("Error updating marker position", err);
                        setNotification({
                            status: true,
                            type: "error",
                            message: "Failed to update marker position",
                        });
                    }
                );
            }
            setDraggingMarker(null);
        }
    };

    // const handleAddMarker = () => {
    //     const { x, y, label, unit, tagKey, icon, color } = newMarkerData;
    //     const newMarker = {
    //         id: Date.now(),
    //         x,
    //         y,
    //         label: label || `Point ${scadaTabs[pendingTabIndex].markers.length + 1}`,
    //         unit,
    //         tagKey,
    //         icon,
    //         color,
    //         valueKey: tagKey || `val${Date.now()}`,
    //     };

    //     const updatedTabs = [...scadaTabs];
    //     updatedTabs[pendingTabIndex].markers.push(newMarker);
    //     setScadaTabs(updatedTabs);
    //     setLiveData((prev) => ({ ...prev, [newMarker.valueKey]: "0.0" }));
    //     setDialogOpen(false);
    // };
    const handleAddMarker = () => {
        const { x, y, label, unit, icon } = newMarkerData;

        // Find sensor details
        const selectedSensorData = selectList.find(s => s.id === selectedSensors);

        const tabImage = scadaTabs[pendingTabIndex].image || "";
        // const imagePathToSend = tabImage.startsWith("https://wisething.in/")
        //     ? tabImage.replace("https://wisething.in/", "")
        //     : tabImage;
        const imagePathToSend = tabImage.startsWith(`${process.env.REACT_APP_BASE_URL}/`)
            ? tabImage.replace(process.env.REACT_APP_BASE_URL, "")
            : tabImage;

        // Prepare backend payload
        const payload = {
            userId: userDetails?.id,
            locationId: locationDetails,
            deviceId: selectedDevice,
            tagsId: selectedSensorData?.id,            // SENSOR ID  ✔
            units: unit,                               // UNIT ✔ (user entered)
            titleName: label,                          // DISPLAY NAME ✔
            x: x,
            y: y,
            color: selectedColor,
            // icon: icon,
            image: imagePathToSend,
            scadaTab: String(pendingTabIndex + 1), // send as "1", "2", ...
        };

        console.log("SCADA PAYLOAD SENT:", payload);

        // Call backend API
        AddScadaService(
            payload,
            (res) => {
                console.log("SCADA Saved Successfully:", res);
                setNotification({
                    status: true,
                    type: "success",
                    message: "Marker added successfully",
                });
                ShowScadaServiceList(
                    {
                        userId: userDetails?.id,
                    },
                    handleScadaSuccess,
                    handleScadaException,
                );
            },
            (err) => {
                console.log("SCADA Save Error:", err);
                setNotification({
                    status: true,
                    type: "error",
                    message: "Failed to add marker",
                });
            }
        );

        // Existing UI logic (unchanged)
        const newMarker = {
            id: Date.now(),
            x,
            y,
            label: label || `Point ${scadaTabs[pendingTabIndex].markers.length + 1}`,
            unit,
            tagKey: selectedSensorData?.id,
            // icon,
            color: selectedColor,
            valueKey: `val${Date.now()}`,
        };

        const updatedTabs = [...scadaTabs];
        updatedTabs[pendingTabIndex].markers.push(newMarker);
        setScadaTabs(updatedTabs);

        setLiveData((prev) => ({ ...prev, [newMarker.valueKey]: "0.0" }));
        setDialogOpen(false);
    };

    const handleDeleteMarker = (e, tabIndex, markerId) => {
        e.stopPropagation();

        // Optimistic UI update
        const updatedTabs = [...scadaTabs];
        updatedTabs[tabIndex].markers = updatedTabs[tabIndex].markers.filter(m => m.id !== markerId);
        setScadaTabs(updatedTabs);

        // API Call
        DeleteScadaService(
            markerId,
            (res) => {
                console.log("Marker deleted from server", res);
                setNotification({
                    status: true,
                    type: "success",
                    message: "Marker deleted successfully",
                });
            },
            (err) => {
                console.error("Error deleting marker", err);
                setNotification({
                    status: true,
                    type: "error",
                    message: "Failed to delete marker",
                });
            }
        );
    };


    const handleColorChange = (e) => setSelectedColor(e.target.value);

    const addNewScadaTab = () => {
        const newTab = {
            // name: `SCADA ${scadaTabs.length + 1}`,
            name: ` PumpSet ${scadaTabs.length + 1}`,
            image: "",
            markers: [],
        };
        setScadaTabs([...scadaTabs, newTab]);
        setTabIndex(scadaTabs.length);
    };

    const renderIcon = (type, size = 26, color = "error") => {
        switch (type) {
            case "tank":
                return <OpacityIcon color={color} sx={{ fontSize: size }} />;
            case "motor":
                return <PrecisionManufacturingIcon color={color} sx={{ fontSize: size }} />;
            case "sensor":
                return <SettingsInputComponentIcon color={color} sx={{ fontSize: size }} />;
            case "power":
                return <PowerIcon color={color} sx={{ fontSize: size }} />;
            default:
                return <AddLocationAltIcon color={color} sx={{ fontSize: size }} />;
        }
    };
    const resetFormFields = () => {
        setSelectedSensors('');
        setSelectedDevice('');
        setNewMarkerData({
            label: '',
            unit: '',
            icon: '',
        });
    };

    return (
        <Card
            style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "12px",
            }}
        >
            <Container maxWidth={false} style={{ height: "94vh" }}>
                <Box sx={{ width: "100%", height: "94vh" }}>
                    {/* Tabs Header */}
                    <CardHeader
                        sx={{
                            py: 0.5,
                            px: 1,
                            background: "#fafafa",
                            borderBottom: "1px solid #ddd",
                        }}
                        title={
                            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                                <Tabs
                                    value={tabIndex}
                                    onChange={(e, newValue) => setTabIndex(newValue)}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{
                                        flexGrow: 1,
                                        minHeight: 36,
                                        "& .MuiTab-root": {
                                            minHeight: 36,
                                            fontSize: "14px",
                                            textTransform: "none",
                                        },
                                    }}
                                >
                                    {scadaTabs.map((tab, index) => (
                                        // <Tab key={index} label={tab.name} {...a11yProps(index)} />
                                        <Tab
                                            key={index}
                                            label={tab.name}
                                            {...a11yProps(index)}
                                            onDoubleClick={() => {
                                                setRenameTabIndex(index);
                                                setNewTabName(tab.name);
                                                setRenameDialogOpen(true);
                                            }}
                                        />

                                    ))}
                                </Tabs>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={addNewScadaTab}
                                    sx={{
                                        ml: 1,
                                        fontSize: "13px",
                                        textTransform: "none",
                                        height: "32px",
                                    }}
                                >
                                    + Add PumpSet
                                </Button>
                            </Box>
                        }
                    />

                    {/* Tab Panels */}
                    {scadaTabs.map((tab, index) => (
                        <TabPanel value={tabIndex} index={index} key={index}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "calc(100vh - 160px)",
                                    backgroundColor: "#000",
                                    overflow: "hidden",
                                    cursor: "crosshair",
                                }}
                            >
                                {/* ⚙️ Floating Settings Icon */}
                                <IconButton
                                    onClick={(e) => setMenuAnchor(e.currentTarget)}
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        color: "#fff",
                                        background: "rgba(0,0,0,0.5)",
                                        "&:hover": { background: "rgba(0,0,0,0.8)" },
                                        zIndex: 10,
                                    }}
                                >
                                    <SettingsIcon />
                                </IconButton>

                                {/* ⚙️ SCADA Settings Menu */}
                                {/* <Menu
                                    anchorEl={menuAnchor}
                                    open={menuOpen}
                                    onClose={() => setMenuAnchor(null)}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: 2,
                                            minWidth: 200,
                                            p: 0.5,
                                        },
                                    }}
                                >
                                    <MenuItem>
                                        <label style={{ width: "100%", cursor: "pointer" }}>
                                            <UploadIcon sx={{ fontSize: 18, mr: 1 }} />
                                            Upload Image
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    handleImageUpload(e, tabIndex);
                                                    setMenuAnchor(null);
                                                }}
                                                sx={{ display: "none" }}
                                            />
                                        </label>
                                    </MenuItem>

                                    <MenuItem>
                                        <ColorLensIcon sx={{ fontSize: 18, mr: 1 }} />
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => {
                                                handleColorChange(e);
                                                setMenuAnchor(null);
                                            }}
                                            style={{
                                                border: "none",
                                                cursor: "pointer",
                                                background: "transparent",
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            Text Color
                                        </Typography>
                                    </MenuItem>
                                </Menu> */}
                                <Menu
                                    anchorEl={menuAnchor}
                                    open={menuOpen}
                                    onClose={() => setMenuAnchor(null)}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: 2,
                                            minWidth: 200,
                                            p: 0.5,
                                        },
                                    }}
                                >
                                    <MenuItem onClick={() => setIsEditMode(!isEditMode)}>
                                        <FormControlLabel
                                            control={<Switch checked={isEditMode} onChange={() => setIsEditMode(!isEditMode)} size="small" />}
                                            label={<Typography variant="body2" sx={{ fontWeight: "bold" }}>Edit Mode</Typography>}
                                            sx={{ ml: 0, w: '100%' }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </MenuItem>

                                    {/* Upload Image */}
                                    <MenuItem>
                                        <label style={{ width: "100%", cursor: "pointer" }}>
                                            <UploadIcon sx={{ fontSize: 18, mr: 1 }} />
                                            Upload Image
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    handleImageUpload(e, tabIndex);
                                                    setMenuAnchor(null);
                                                }}
                                                sx={{ display: "none" }}
                                            />
                                        </label>
                                    </MenuItem>

                                    {/* Open Dialog for Color Picker */}
                                    <MenuItem
                                        onClick={() => {
                                            setColorDialogOpen(true);
                                            setMenuAnchor(null);
                                        }}
                                    >
                                        <ColorLensIcon sx={{ fontSize: 18, mr: 1 }} />
                                        <Typography variant="body2">Choose Text Color</Typography>
                                    </MenuItem>
                                </Menu>
                                <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)}>
                                    <DialogTitle>Select Text Color</DialogTitle>

                                    <DialogContent>
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            style={{
                                                width: "100%",
                                                height: "60px",
                                                border: "none",
                                                cursor: "pointer",
                                                background: "transparent",
                                            }}
                                        />
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={() => setColorDialogOpen(false)}>Close</Button>
                                    </DialogActions>
                                </Dialog>


                                {/* Main Image Section */}
                                {tab.image ? (
                                    <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                minWidth: isMobile ? "900px" : "100%",
                                                height: "100%",
                                                minHeight: isMobile ? "600px" : "auto",
                                            }}
                                            onMouseMove={(e) => handleMouseMove(e, index)}
                                            onMouseUp={handleMouseUp}
                                            onMouseLeave={() => {
                                                handleMouseLeave();
                                                handleMouseUp();
                                            }}
                                        >
                                            <img
                                                src={tab.image}
                                                alt="SCADA Layout"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "fill",
                                                    cursor: isEditMode ? (draggingMarker ? "grabbing" : "crosshair") : "default",
                                                }}
                                                onClick={(e) => {
                                                    if (!draggingMarker) handleImageClick(e, index);
                                                }}
                                            />

                                            {/* Alignment Guides */}
                                            {isEditMode && hoverCoords && activeGuides.x !== null && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        left: `${activeGuides.x}%`,
                                                        top: 0,
                                                        width: "1px",
                                                        height: "100%",
                                                        backgroundColor: "#00ff00",
                                                        zIndex: 5,
                                                        pointerEvents: "none",
                                                        boxShadow: "0 0 4px #00ff00"
                                                    }}
                                                />
                                            )}
                                            {isEditMode && hoverCoords && activeGuides.y !== null && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: `${activeGuides.y}%`,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "1px",
                                                        backgroundColor: "#00ff00",
                                                        zIndex: 5,
                                                        pointerEvents: "none",
                                                        boxShadow: "0 0 4px #00ff00"
                                                    }}
                                                />
                                            )}
                                            {tab.markers.map((marker) => (
                                                <Box
                                                    key={marker.id}
                                                    onMouseDown={(e) => handleMouseDownMarker(e, index, marker)}
                                                    sx={{
                                                        position: "absolute",
                                                        left: `${marker.x}%`,
                                                        top: `${marker.y}%`,
                                                        transform: "translate(-50%, -50%)",
                                                        textAlign: "center",
                                                        pointerEvents: isEditMode ? "auto" : "none",
                                                        cursor: draggingMarker && draggingMarker.markerId === marker.id ? "grabbing" : (isEditMode ? "grab" : "default"),
                                                        zIndex: draggingMarker && draggingMarker.markerId === marker.id ? 20 : 1,
                                                        "&:hover .delete-icon": {
                                                            opacity: 1,
                                                        }
                                                    }}
                                                >
                                                    {/* Delete Icon Button */}
                                                    <IconButton
                                                        className="delete-icon"
                                                        onClick={(e) => handleDeleteMarker(e, index, marker.id)}
                                                        size="small"
                                                        sx={{
                                                            position: "absolute",
                                                            top: -12,
                                                            right: -12,
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            opacity: 0,
                                                            transition: "opacity 0.2s",
                                                            padding: "2px",
                                                            "&:hover": { backgroundColor: "darkred" },
                                                            zIndex: 10,
                                                        }}
                                                    >
                                                        <CloseIcon sx={{ fontSize: 12 }} />
                                                    </IconButton>

                                                    <Box
                                                        sx={{
                                                            backgroundColor: marker.color,
                                                            border: `1px solid ${marker.color}`,
                                                            borderRadius: "4px",
                                                            padding: "4px 8px",
                                                            minWidth: "80px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: "#ffffff",
                                                                fontWeight: "bold",
                                                                fontSize: "13px",
                                                                display: "block",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {liveData[marker.tagKey] !== undefined ? liveData[marker.tagKey] : marker.sensorValue}{marker.unit ? ` ${marker.unit}` : ''}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "#777", textAlign: "center", mt: 10 }}
                                    >
                                        Upload an image for {tab.name} using ⚙️
                                    </Typography>
                                )}
                            </Box>
                        </TabPanel>
                    ))}
                </Box>
            </Container>

            {/* 🟩 Marker Add Dialog (Unchanged) */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add New Marker</DialogTitle>

                <DialogContent>

                    {/* GRID CONTAINER */}
                    <Grid container spacing={2}>

                        {/* Select Device */}
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="select-device-label" sx={{ color: "#000", fontWeight: "bold" }}>
                                    Select Device
                                </InputLabel>

                                <Select
                                    labelId="select-device-label"
                                    value={selectedDevice}
                                    label="Select Device"
                                    size="small"
                                    onChange={(e) => {
                                        setSelectedDevice(e.target.value);
                                        ShowSelectSensors(
                                            { deviceId: e.target.value },
                                            handleGetSensorSuccess,
                                            handleGetSensorException
                                        );
                                    }}
                                    sx={{
                                        color: "#000",
                                        fontWeight: "bold",
                                        backgroundColor: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                        "& .MuiSelect-icon": { color: "#000" },
                                    }}
                                >
                                    {deviceList.map((device) => (
                                        <MenuItem key={device.id} value={device.id}>
                                            {device.deviceName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Sensors */}
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel id="select-sensor-label" sx={{ color: "#000", fontWeight: "bold" }}>
                                    Select Sensors
                                </InputLabel>

                                <Select
                                    labelId="select-sensor-label"
                                    value={selectedSensors}
                                    label="Select Sensors"
                                    size="small"
                                    onChange={(e) => setSelectedSensors(e.target.value)}
                                    sx={{
                                        color: "#000",
                                        fontWeight: "bold",
                                        backgroundColor: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                        "& .MuiSelect-icon": { color: "#000" },
                                    }}
                                >
                                    {selectList.map((sensor) => (
                                        <MenuItem key={sensor.id} value={sensor.id}>
                                            {sensor.tagDisplayName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Other Fields */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Display Name"
                                size="small"
                                value={newMarkerData.label}
                                InputLabelProps={{
                                    sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
                                }}
                                sx={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                    "& .MuiSelect-icon": { color: "#000" },
                                }}
                                onChange={(e) =>
                                    setNewMarkerData({ ...newMarkerData, label: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Unit"
                                size="small"
                                value={newMarkerData.unit}
                                InputLabelProps={{
                                    sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
                                }}
                                onChange={(e) =>
                                    setNewMarkerData({ ...newMarkerData, unit: e.target.value })
                                }
                                sx={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                    "& .MuiSelect-icon": { color: "#000" },
                                }}
                            />
                        </Grid>

                        {/* X and Y coordinates for fine-tuning alignment */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="X Coordinate (%)"
                                size="small"
                                type="number"
                                value={newMarkerData.x}
                                InputLabelProps={{
                                    sx: { fontWeight: "bold", color: "#000" },
                                }}
                                onChange={(e) =>
                                    setNewMarkerData({ ...newMarkerData, x: parseFloat(e.target.value) })
                                }
                                sx={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Y Coordinate (%)"
                                size="small"
                                type="number"
                                value={newMarkerData.y}
                                InputLabelProps={{
                                    sx: { fontWeight: "bold", color: "#000" },
                                }}
                                onChange={(e) =>
                                    setNewMarkerData({ ...newMarkerData, y: parseFloat(e.target.value) })
                                }
                                sx={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                }}
                            />
                        </Grid>

                        {/* <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Backend Tag Key"
                    size="small"
                    value={newMarkerData.tagKey}
                    InputLabelProps={{
    sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
  }}
                    onChange={(e) =>
                        setNewMarkerData({ ...newMarkerData, tagKey: e.target.value })
                    }
                     sx={{
                            color: "#000",
                            fontWeight: "bold",
                            backgroundColor: "#fff",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                            "& .MuiSelect-icon": { color: "#000" },
                        }}
                />
            </Grid> */}

                        {/* <Grid item xs={6}>
                            <TextField
                                fullWidth
                                select
                                label="Icon Type"
                                size="small"
                                value={newMarkerData.icon}
                                InputLabelProps={{
                                    sx: { fontWeight: "bold", color: "#000" },  // ← Bold label
                                }}
                                sx={{
                                    color: "#000",
                                    fontWeight: "bold",
                                    backgroundColor: "#fff",
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#000" },
                                    "& .MuiSelect-icon": { color: "#000" },
                                }}
                                onChange={(e) =>
                                    setNewMarkerData({ ...newMarkerData, icon: e.target.value })
                                }
                            >
                                {iconOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.icon} {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid> */}

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {
                        setDialogOpen(false)
                        setSelectedSensors('');
                        setSelectedDevice('')
                        setNewMarkerData({
                            label: '',
                            unit: '',
                            icon: '',
                        })
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddMarker}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
                <DialogTitle>Rename SCADA Tab</DialogTitle>

                <DialogContent style={{ paddingTop: 5 }}>
                    <TextField
                        fullWidth
                        label="Tab Name"
                        value={newTabName}
                        onChange={(e) => setNewTabName(e.target.value)}
                        autoFocus
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            const updatedTabs = [...scadaTabs];
                            updatedTabs[renameTabIndex].name = newTabName || updatedTabs[renameTabIndex].name;
                            setScadaTabs(updatedTabs);
                            setRenameDialogOpen(false);
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>


            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Card>
    );
};

export default ScadaView;



