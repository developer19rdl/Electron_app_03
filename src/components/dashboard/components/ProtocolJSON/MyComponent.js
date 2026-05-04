// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Card,
//     CardContent,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     FormControl,
//     Grid,
//     InputLabel,
//     MenuItem,
//     Select,
//     Stack,
//     TextField,
//     Typography,
// } from "@mui/material";
// import { Button } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import CodeIcon from '@mui/icons-material/Code';
// import { movableAssetsShow } from "../../../../services/LoginPageService";
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import EditIcon from '@mui/icons-material/Edit';

// const rows = [
//     { id: 1, col1: "Hello", col2: "World" },
//     { id: 2, col1: "Data", col2: "Grid" },
//     { id: 3, col1: "Material", col2: "UI" },
// ];


// const MyComponent = () => {
//     const columns = [
//         {
//             field: 'id',
//             headerName: 'SLNO',
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center'

//         },
//         {
//             field: 'pathName',
//             headerName: 'Topic Name',
//             width: 130,
//             headerAlign: 'center',
//             align: 'center'

//         },
//         {
//             field: 'sequence',
//             headerName: 'Description',
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center'
//         },
//         {
//             field: 'coordinates',
//             headerName: 'Security',
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center'
//         },
//         {
//             field: 'coordinates1',
//             headerName: 'Status',
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center'
//         },
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Actions',
//             flex: 1,
//             // width: 300,
//             cellClassName: 'actions',
//             disableClickEventBubbling: true,
//             getActions: (params) => [
//                 <Stack direction='row' spacing={1}>
//                     <EditData selectedRow={params.row} />
//                     <DeleteData selectedRow={params.row} />
//                     <RowData selectedRow={params.row} />
//                     <Status selectedRow={params.row} />
//                     <CodeEdit selectedRow={params.row} />
//                 </Stack>
//             ],
//         },
//     ];


//     function EditData(props) {
//         return (
//             <EditIcon
//                 style={{ cursor: 'pointer' }}
//                 onClick={(event) => {
//                     event.stopPropagation();
//                     setIsAddButton(false);
//                     setEditMovabledevice(props.selectedRow);
//                     setOpen(true);

//                 }}
//             />
//         )
//     };
//     function DeleteData(props) {
//         return (
//             <DeleteIcon

//                 style={{ cursor: 'pointer' }}
//                 onClick={() => {
//                     setDeleteId(props.selectedRow.id);
//                     setDeleteDailogOpen(true)
//                 }}
//             />
//         );
//     };

//     function RowData(props) {
//         return (
//             <VisibilityIcon
//                 style={{ cursor: 'pointer' }}
//                 onClick={(event) => {
//                     event.stopPropagation();
//                     // setEditMovabledevice(props.selectedRow);
//                     setOpenRow(true)
//                     alert("hi")

//                 }}
//             />
//         )
//     };
//     function Status(props) {
//         return (
//             <PlayCircleOutlineIcon
//                 style={{ cursor: 'pointer' }}
//                 onClick={(event) => {
//                     event.stopPropagation();
//                     // setIsAddButton(false);
//                     setEditMovabledevice(props.selectedRow);
//                     // setOpen(true);
//                     // setRowOpen(true)

//                 }}
//             />
//         )
//     };
//     function CodeEdit(props) {
//         return (
//             <CodeIcon
//                 style={{ cursor: 'pointer' }}
//                 onClick={(event) => {
//                     event.stopPropagation();
//                     // setIsAddButton(false);
//                     // setEditMovabledevice(props.selectedRow);
//                     setOpen(true);
//                     // setRowOpen(true)

//                 }}
//             />
//         )
//     };



//     // function EditData(props) {
//     //     return (
//     //         <EditIcon
//     //             style={{ cursor: 'pointer' }}
//     //             onClick={(event) => {
//     //                 event.stopPropagation();
//     //                 setIsAddButton(false);
//     //                 setEditMovabledevice(props.selectedRow);
//     //                 setOpen(true);

//     //             }}
//     //         />
//     //     )
//     // };
//     // function DeleteData(props) {
//     //     return (
//     //         <DeleteIcon

//     //             style={{ cursor: 'pointer' }}
//     //             onClick={() => {
//     //                 setDeleteId(props.selectedRow.id);
//     //                 setDeleteDailogOpen(true)
//     //             }}
//     //         />
//     //     );
//     // };

//     // function RowData(props) {
//     //     return (
//     //         <VisibilityIcon
//     //             style={{ cursor: 'pointer' }}
//     //             onClick={(event) => {
//     //                 event.stopPropagation();
//     //                 setIsAddButton(false);
//     //                 // setEditMovabledevice(props.selectedRow);
//     //                 setRowOpen(true)
//     //                 alert("hi")

//     //             }}
//     //         />
//     //     )
//     // };
//     // function Status(props) {
//     //     return (
//     //         <PlayCircleOutlineIcon
//     //             style={{ cursor: 'pointer' }}
//     //             onClick={(event) => {
//     //                 event.stopPropagation();
//     //                 setIsAddButton(false);
//     //                 setEditMovabledevice(props.selectedRow);
//     //                 // setOpen(true);
//     //                 // setRowOpen(true)

//     //             }}
//     //         />
//     //     )
//     // };
//     // function CodeEdit(props) {
//     //     return (
//     //         <CodeIcon
//     //             style={{ cursor: 'pointer' }}
//     //             onClick={(event) => {
//     //                 event.stopPropagation();
//     //                 setIsAddButton(false);
//     //                 // setEditMovabledevice(props.selectedRow);
//     //                 setJsonOpen(true)
//     //                 // setRowOpen(true)

//     //             }}
//     //         />
//     //     )
//     // };

//     const [MovabledeviceList, setMovableDeviceList] = useState([]);
//     const [editMovabledevice, setEditMovabledevice] = useState([]);
//     const [refreshData, setRefreshData] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [opentestbroker, setOpenTestBroker] = useState(false);
//     const [openAes, setOpenAes] = useState(false);
//     const [openRow, setOpenRow] = useState(false);
//     const [openMqttClient, setOpenMqttClient] = useState(false);
//     const [age, setAge] = useState("");

//     useEffect(() => {
//         movableAssetsShow(handleSuccess, handleException);
//         // ProjectShowService(handleProjectSuccess, handleProjectException);

//     }, [refreshData]);

//     const handleSuccess = (dataObject) => {
//         setMovableDeviceList(dataObject.data)
//     };
//     const handleException = () => {

//     }

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     const handleopen = () => {
//         setOpen(true);
//     };

//     const handleopenTestBroker = () => {
//         setOpenTestBroker(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//         setOpenTestBroker(false);
//         setOpenAes(false);
//         setOpenMqttClient(false);
//         setOpenRow(false)
//     };

//     const handleAes = () => {
//         setOpenAes(true);
//     };

//     const handleMQTTClient = () => {
//         setOpenMqttClient(true);
//     };
//     return (
//         // <Card
//         //     sx={{
//         //         boxShadow: 3,
//         //         borderRadius: 2,
//         //         padding: 3,
//         //         margin: "20px auto",
//         //         maxWidth: 1650,
//         //     }}
//         // >
//         <CardContent>
//             <div
//                 style={{
//                     display: "flex",
//                     columnGap: "20px",
//                     justifyContent: "center",
//                     // paddingBottom: "30px",
//                     flexWrap: "wrap",
//                     rowGap: "20px",
//                     marginBottom: "10px"
//                 }}
//             >

//                 <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                     onClick={handleopenTestBroker}
//                 >
//                     Test Broker
//                 </Button>
//                 <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                     onClick={handleAes}
//                 >
//                     SSL Settings
//                 </Button>
//                 <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                     onClick={handleMQTTClient}
//                 >
//                     MQTT Client Settings
//                 </Button>
//                 <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                 >
//                     Add Topic
//                 </Button>
//             </div>

//             <div style={{ height: 425, width: '100%' }}>
//                 <DataGrid
//                     sx={{
//                         border: 'none',
//                         '& .MuiDataGrid-footerContainer': {
//                             borderTop: 'none', // This removes the top border of the footer (pagination area)
//                         },
//                         '& .MuiDataGrid-cell': {
//                             borderBottom: 'none', // Removes the bottom border between cells
//                         },
//                         '& .MuiDataGrid-row': {
//                             '&:hover': {
//                                 backgroundColor: '#ffffff', // Removes hover background
//                             },
//                         },
//                         '& .MuiDataGrid-row:nth-of-type(odd)': {
//                             backgroundColor: '#f5f5f5', // Light gray for odd rows
//                         },
//                         '& .MuiDataGrid-row:nth-of-type(even)': {
//                             backgroundColor: '#ffffff', // White for even rows
//                         },

//                     }}
//                     rows={MovabledeviceList}
//                     columns={columns}
//                     pageSize={10}
//                     rowHeight={38}
//                     rowsPerPageOptions={[5]}
//                     disableSelectionOnClick
//                 />
//             </div>

//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 sx={{ "& .MuiDialog-paper": { width: "900px", maxWidth: "none" } }}
//             >
//                 <DialogTitle>MQTT</DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ maxWidth: 200, marginTop: 1 }}>
//                         <FormControl fullWidth>
//                             <InputLabel id="demo-simple-select-label">Topic</InputLabel>
//                             <Select
//                                 labelId="demo-simple-select-label"
//                                 id="demo-simple-select"
//                                 value={age}
//                                 label="Topic"
//                                 onChange={handleChange}
//                                 fullWidth
//                             >
//                                 <MenuItem value={10}>Ten</MenuItem>
//                                 <MenuItem value={20}>Twenty</MenuItem>
//                                 <MenuItem value={30}>Thirty</MenuItem>
//                             </Select>
//                         </FormControl>


//                     </Box>
//                     <div style={{ height: 300, marginTop: "20px", backgroundColor: '#212121' }}>

//                     </div>
//                 </DialogContent>
//                 <Grid md={8} lg={8} style={{ display: 'flex', paddingLeft: 25, columnGap: 8 }}>
//                     <Button
//                         variant="contained"
//                         style={{
//                             backgroundColor: "#212121",
//                             borderRadius: "10px",

//                         }}
//                     >
//                         Download
//                     </Button>
//                     <Button
//                         variant="contained"
//                         style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                     >
//                         Test Broker
//                     </Button>
//                     <Button
//                         variant="contained"
//                         style={{ backgroundColor: "#212121", borderRadius: "10px" }}
//                     >
//                         SSL Settings
//                     </Button>
//                 </Grid>

//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog
//                 open={opentestbroker}
//                 onClose={handleClose}
//                 sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "none" } }}
//             >
//                 <DialogTitle>Test Broker</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} padding={1}>
//                         {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

//                         <Grid item xs={12} md={12} lg={12} xl={12}>
//                             <TextField
//                                 // value={warningMinValue}
//                                 id="outlined-basic"
//                                 label="Test Password"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setWarningMinValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={12} xl={12}>
//                             <Button
//                                 variant="contained"
//                                 style={{ backgroundColor: "#212121" }}
//                             >
//                                 Save
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog
//                 open={openAes}
//                 onClose={handleClose}
//                 sx={{ "& .MuiDialog-paper": { width: "500px", maxWidth: "none" } }}
//             >
//                 <DialogTitle>AES</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} padding={1}>
//                         {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

//                         <Grid item xs={12} md={12} lg={12} xl={12}>
//                             <TextField
//                                 // value={warningMinValue}
//                                 id="outlined-basic"
//                                 label="VRL"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setWarningMinValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={12} lg={12} xl={12}>
//                             <TextField
//                                 // value={warningMaxValue}
//                                 id="outlined-basic"
//                                 label="Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setWarningMaxValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={12} xl={12}>
//                             <Button
//                                 variant="contained"
//                                 style={{ backgroundColor: "#212121" }}
//                             >
//                                 Save
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog
//                 open={openMqttClient}
//                 onClose={handleClose}
//                 sx={{ "& .MuiDialog-paper": { width: "900px", maxWidth: "none" } }}
//             >
//                 <DialogTitle>MQTT Client Settings</DialogTitle>
//                 <DialogContent>
//                     {/* <Box sx={{ maxWidth: 150 }}> */}
//                     <Grid container spacing={2} padding={1}>
//                         {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

//                         <Grid item xs={12} md={6} lg={6} xl={6}>
//                             <TextField
//                                 // value={warningMinValue}
//                                 id="outlined-basic"
//                                 label="VRL"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setWarningMinValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={6} xl={6}>
//                             <TextField
//                                 // value={warningMaxValue}
//                                 id="outlined-basic"
//                                 label="Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setWarningMaxValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={6} xl={6}>
//                             <TextField
//                                 // value={outOfRangeMinValue}
//                                 id="outlined-basic"
//                                 label="Password"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setOutOfRangeMinValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={6} xl={6}>
//                             <TextField
//                                 // value={outOfRangeMaxValue}
//                                 id="outlined-basic"
//                                 label="Port"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setOutOfRangeMaxValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={6} xl={6}>
//                             <TextField
//                                 // value={criticalMinValue}
//                                 id="outlined-basic"
//                                 label="Topic"
//                                 variant="outlined"
//                                 fullWidth
//                                 // onChange={(e) => {
//                                 //   setCriticalMinValue(e.target.value);
//                                 // }}
//                                 autoComplete="off"
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={12} xl={12}>
//                             <Button
//                                 variant="contained"
//                                 style={{ backgroundColor: "#212121" }}
//                             >
//                                 Save
//                             </Button>
//                         </Grid>
//                     </Grid>


//                     {/* <div style={{ height: 300, width: "570%", marginTop: "20px" }}>
//                 <DataGrid
//                   rows={[]}
//                   columns={columns}
//                   pageSize={5}
//                   rowsPerPageOptions={[5]}
//                   disableSelectionOnClick
//                 />
//               </div> */}
//                     {/* </Box> */}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog
//                 open={openRow}
//                 onClose={handleClose}
//                 sx={{ "& .MuiDialog-paper": { width: "600px", maxWidth: "none" } }}
//             >
//                 <DialogTitle>Raw Table</DialogTitle>
//                 <DialogContent>
//                     <div style={{ height: 400, width: '100%' }}>
//                         <DataGrid
//                             sx={{
//                                 border: 'none',
//                                 '& .MuiDataGrid-footerContainer': {
//                                     borderTop: 'none', // This removes the top border of the footer (pagination area)
//                                 },
//                                 '& .MuiDataGrid-cell': {
//                                     borderBottom: 'none', // Removes the bottom border between cells
//                                 },
//                                 '& .MuiDataGrid-row': {
//                                     '&:hover': {
//                                         backgroundColor: '#ffffff', // Removes hover background
//                                     },
//                                 },
//                                 '& .MuiDataGrid-row:nth-of-type(odd)': {
//                                     backgroundColor: '#f5f5f5', // Light gray for odd rows
//                                 },
//                                 '& .MuiDataGrid-row:nth-of-type(even)': {
//                                     backgroundColor: '#ffffff', // White for even rows
//                                 },

//                             }}
//                             rows={[]}
//                             columns={columns}
//                             pageSize={10}
//                             rowHeight={38}
//                             rowsPerPageOptions={[5]}
//                             disableSelectionOnClick
//                         />
//                     </div>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </CardContent>
//         // </Card>
//     );
// };

// export default MyComponent;




import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import {
    FetchMQTTUrl,
    SubmitMQTTUrl,
    movableAssetsShow,
} from "../../../../services/LoginPageService";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import NotificationBar from "../../../notification/ServiceNotificationBar";
import Editor from "react-simple-code-editor";
import { Highlight, Prism, themes } from "prism-react-renderer";

const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "Data", col2: "Grid" },
    { id: 3, col1: "Material", col2: "UI" },
];

const MyComponent = () => {
    const columns = [
        {
            field: "id",
            headerName: "SLNO",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "pathName",
            headerName: "Topic Name",
            width: 130,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "sequence",
            headerName: "Description",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "coordinates",
            headerName: "Security",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "coordinates1",
            headerName: "Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            // width: 300,
            cellClassName: "actions",
            disableClickEventBubbling: true,
            getActions: (params) => [
                <Stack direction="row" spacing={1}>
                    <EditData selectedRow={params.row} />
                    <DeleteData selectedRow={params.row} />
                    <RowData selectedRow={params.row} />
                    <Status selectedRow={params.row} />
                    <CodeEdit selectedRow={params.row} />
                </Stack>,
            ],
        },
    ];

    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditMovabledevice(props.selectedRow);
                    setOpen(true);
                }}
            />
        );
    }
    function DeleteData(props) {
        return (
            <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setDeleteId(props.selectedRow.id);
                    setDeleteDailogOpen(true);
                }}
            />
        );
    }

    function RowData(props) {
        return (
            <VisibilityIcon
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                    event.stopPropagation();
                    // setEditMovabledevice(props.selectedRow);
                    setOpenRow(true);
                    //   alert("hi");
                    // setOpenMqttClient(true);
                }}
            />
        );
    }
    function Status(props) {
        return (
            <PlayCircleOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                    event.stopPropagation();
                    // setIsAddButton(false);
                    setEditMovabledevice(props.selectedRow);
                    // setOpen(true);
                    // setRowOpen(true)
                }}
            />
        );
    }
    function CodeEdit(props) {
        return (
            <CodeIcon
                style={{ cursor: "pointer" }}
                onClick={(event) => {
                    event.stopPropagation();
                    // setIsAddButton(false);
                    // setEditMovabledevice(props.selectedRow);
                    setOpen(true);
                    // setRowOpen(true)
                }}
            />
        );
    }

    // function EditData(props) {
    //     return (
    //         <EditIcon
    //             style={{ cursor: 'pointer' }}
    //             onClick={(event) => {
    //                 event.stopPropagation();
    //                 setIsAddButton(false);
    //                 setEditMovabledevice(props.selectedRow);
    //                 setOpen(true);

    //             }}
    //         />
    //     )
    // };
    // function DeleteData(props) {
    //     return (
    //         <DeleteIcon

    //             style={{ cursor: 'pointer' }}
    //             onClick={() => {
    //                 setDeleteId(props.selectedRow.id);
    //                 setDeleteDailogOpen(true)
    //             }}
    //         />
    //     );
    // };

    // function RowData(props) {
    //     return (
    //         <VisibilityIcon
    //             style={{ cursor: 'pointer' }}
    //             onClick={(event) => {
    //                 event.stopPropagation();
    //                 setIsAddButton(false);
    //                 // setEditMovabledevice(props.selectedRow);
    //                 setRowOpen(true)
    //                 alert("hi")

    //             }}
    //         />
    //     )
    // };
    // function Status(props) {
    //     return (
    //         <PlayCircleOutlineIcon
    //             style={{ cursor: 'pointer' }}
    //             onClick={(event) => {
    //                 event.stopPropagation();
    //                 setIsAddButton(false);
    //                 setEditMovabledevice(props.selectedRow);
    //                 // setOpen(true);
    //                 // setRowOpen(true)

    //             }}
    //         />
    //     )
    // };
    // function CodeEdit(props) {
    //     return (
    //         <CodeIcon
    //             style={{ cursor: 'pointer' }}
    //             onClick={(event) => {
    //                 event.stopPropagation();
    //                 setIsAddButton(false);
    //                 // setEditMovabledevice(props.selectedRow);
    //                 setJsonOpen(true)
    //                 // setRowOpen(true)

    //             }}
    //         />
    //     )
    // };

    const [MovabledeviceList, setMovableDeviceList] = useState([]);
    const [editMovabledevice, setEditMovabledevice] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [open, setOpen] = useState(false);
    const [opentestbroker, setOpenTestBroker] = useState(false);
    const [openAes, setOpenAes] = useState(false);
    const [openRow, setOpenRow] = useState(false);
    const [openMqttClient, setOpenMqttClient] = useState(false);
    const [mqttUrl, setMqttUrl] = useState("");
    const [id, setId] = useState("");
    const [age, setAge] = useState("");
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [port, setPort] = useState("");
    const [topic, setTopic] = useState("");
    const [code, setCode] = useState(
        `function hello() {\n  console.log("Hello, world!");\n}`
    );
    const [openNotification, setNotification] = useState({
        status: false,
        type: "error",
        message: "",
    });
    const [files, setFiles] = useState({
        caFile: null,
        clientFile: null,
        clientKeyFile: null,
    });

    const handleFileChange = (event, fileType) => {
        const file = event.target.files[0];
        setFiles((prev) => ({ ...prev, [fileType]: file }));
    };
    useEffect(() => {
        movableAssetsShow(handleSuccess, handleException);
        // ProjectShowService(handleProjectSuccess, handleProjectException);
    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setMovableDeviceList(dataObject.data);
        // setRefreshData((oldvalue) => !oldvalue)
    };
    const handleException = () => { };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleopen = () => {
        setOpen(true);
    };

    const handleopenTestBroker = () => {
        setOpenTestBroker(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpenTestBroker(false);
        setOpenAes(false);
        setOpenMqttClient(false);
        setOpenRow(false);

        setName("");
        setPassword("");
        setPort("");
        setTopic("");
    };

    const handleAes = () => {
        setOpenAes(true);
    };

    const handleMQTTClient = () => {
        setOpenMqttClient(true);
    };

    useEffect(() => {
        FetchMQTTUrl(handleMQTTUrlSuccess, handleMQTTUrlException);
    }, []);

    const handleMQTTUrlSuccess = (dataObject) => {
        setMqttUrl(dataObject.mqttUrl);
        setId(dataObject.id);
    };

    const handleMQTTUrlException = () => { };

    const handlesubmit = () => {
        SubmitMQTTUrl(
            {
                generatedUrl: mqttUrl,
                name: name,
                password: password,
                port: port,
                topic: topic,
                mqttConfigurationId: id,
            },
            handleSubmitSuccess,
            handleSubmitException
        );
    };

    const handleSubmitSuccess = (dataObject) => {
        setName("");
        setPassword("");
        setPort("");
        setTopic("");
        setOpenMqttClient(false);
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message,
        });
        setTimeout(() => {
            setNotification({ status: false, type: "", message: "" });
        }, 2000);
    };
    const handleSubmitException = () => { };

    return (
        // <Card
        //     sx={{
        //         borderRadius: 2,
        //         boxShadow: 3,
        //         padding: 3,
        //         margin: "20px auto",
        //         maxWidth: 1650,
        //     }}
        // >
        <CardContent>
            <div
                style={{
                    display: "flex",
                    columnGap: "20px",
                    justifyContent: "center",
                    // paddingBottom: "30px",
                    flexWrap: "wrap",
                    rowGap: "20px",
                    marginBottom: "10px",
                }}
            >
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                    onClick={handleopenTestBroker}
                >
                    Test Broker
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                    onClick={handleAes}
                >
                    SSL Settings
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                    onClick={handleMQTTClient}
                >
                    MQTT Client Settings
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                >
                    Add Topic
                </Button>
            </div>

            <div style={{ height: 425, width: "100%" }}>
                <DataGrid
                    sx={{
                        border: "none",
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none", // This removes the top border of the footer (pagination area)
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none", // Removes the bottom border between cells
                        },
                        "& .MuiDataGrid-row": {
                            "&:hover": {
                                backgroundColor: "#ffffff", // Removes hover background
                            },
                        },
                        "& .MuiDataGrid-row:nth-of-type(odd)": {
                            backgroundColor: "#f5f5f5", // Light gray for odd rows
                        },
                        "& .MuiDataGrid-row:nth-of-type(even)": {
                            backgroundColor: "#ffffff", // White for even rows
                        },
                    }}
                    rows={MovabledeviceList}
                    columns={columns}
                    pageSize={10}
                    rowHeight={38}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ "& .MuiDialog-paper": { width: "900px", maxWidth: "none" } }}
            >
                <DialogTitle>MQTT</DialogTitle>
                <DialogContent>
                    <Box sx={{ maxWidth: 200, marginTop: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Topic"
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div
                        style={{
                            height: 300,
                            marginTop: "20px",
                            backgroundColor: "#212121",
                            padding: "10px",
                            borderRadius: "5px",
                            overflow: "auto",
                        }}
                    >
                        <Editor
                            value={code}
                            onValueChange={(newCode) => setCode(newCode)}
                            highlight={(code) => (
                                <Highlight
                                    Prism={Prism}
                                    theme={themes.nightOwl}
                                    code={code}
                                    language="javascript"
                                >
                                    {({
                                        className,
                                        style,
                                        tokens,
                                        getLineProps,
                                        getTokenProps,
                                    }) => (
                                        <pre
                                            className={className}
                                            style={{ ...style, backgroundColor: "#212121" }}
                                        >
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line, key: i })}>
                                                    {line.map((token, key) => (
                                                        <span
                                                            key={key}
                                                            {...getTokenProps({ token, key })}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            )}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                color: "#ffffff",
                                backgroundColor: "#212121",
                                minHeight: "100%",
                            }}
                        />
                    </div>
                </DialogContent>
                <Grid
                    md={8}
                    lg={8}
                    style={{ display: "flex", paddingLeft: 25, columnGap: 8 }}
                >
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "#212121",
                            borderRadius: "10px",
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                    >
                        Restart Default
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#212121", borderRadius: "10px" }}
                    >
                        Save customer code
                    </Button>
                </Grid>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={opentestbroker}
                onClose={handleClose}
                sx={{ "& .MuiDialog-paper": { width: "400px", maxWidth: "none" } }}
            >
                <DialogTitle>Test Broker</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} padding={1}>
                        {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <TextField
                                // value={warningMinValue}
                                id="outlined-basic"
                                label="Test Password"
                                variant="outlined"
                                fullWidth
                                // onChange={(e) => {
                                //   setWarningMinValue(e.target.value);
                                // }}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} xl={12}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#212121" }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAes}
                onClose={handleClose}
                sx={{ "& .MuiDialog-paper": { width: "700px", maxWidth: "none" } }}
            >
                <DialogTitle>SSL Settings</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} padding={1}>
                        {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Grid item container spacing={2} alignItems="center">
                                <Grid item style={{ marginBottom: "10px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{
                                            backgroundColor: "#D3D3D3",
                                            width: "220px",
                                            color: "black",
                                        }}
                                    >
                                        Upload CA File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleFileChange(e, "caFile")}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs style={{ marginBottom: "10px" }}>
                                    <TextField
                                        fullWidth
                                        value={files.caFile ? files.caFile.name : ""}
                                        variant="outlined"
                                        size="small"
                                        placeholder="No file chosen"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Client File */}
                            <Grid item container spacing={2} alignItems="center">
                                <Grid item style={{ marginBottom: "10px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{
                                            backgroundColor: "#D3D3D3",
                                            width: "220px",
                                            color: "black",
                                        }}
                                    >
                                        Upload Client File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleFileChange(e, "clientFile")}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs style={{ marginBottom: "10px" }}>
                                    <TextField
                                        fullWidth
                                        value={files.clientFile ? files.clientFile.name : ""}
                                        variant="outlined"
                                        size="small"
                                        placeholder="No file chosen"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Client Key File */}
                            <Grid item container spacing={2} alignItems="center">
                                <Grid item style={{ marginBottom: "10px" }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        style={{
                                            backgroundColor: "#D3D3D3",
                                            width: "220px",
                                            color: "black",
                                        }}
                                    >
                                        Upload Client Key File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleFileChange(e, "clientKeyFile")}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs style={{ marginBottom: "10px" }}>
                                    <TextField
                                        fullWidth
                                        value={files.clientKeyFile ? files.clientKeyFile.name : ""}
                                        variant="outlined"
                                        size="small"
                                        placeholder="No file chosen"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} xl={12}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#212121" }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openMqttClient}
                onClose={handleClose}
                sx={{ "& .MuiDialog-paper": { width: "900px", maxWidth: "none" } }}
            >
                <DialogTitle>MQTT Client Settings</DialogTitle>
                <DialogContent>
                    {/* <Box sx={{ maxWidth: 150 }}> */}
                    <Grid container spacing={2} padding={1}>
                        {/* <Grid item lg={12} md={12} container justifyContent="flex-start"> */}

                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <TextField
                                // value={warningMinValue}
                                id="outlined-basic"
                                label="URL"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setMqttUrl(e.target.value);
                                }}
                                value={mqttUrl}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={warningMaxValue}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={outOfRangeMinValue}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={outOfRangeMaxValue}
                                id="outlined-basic"
                                label="Port"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setPort(e.target.value);
                                }}
                                value={port}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={criticalMinValue}
                                id="outlined-basic"
                                label="Topic"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                }}
                                value={topic}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={criticalMinValue}
                                id="outlined-basic"
                                label="Connection Timeout"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                }}
                                value={topic}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={criticalMinValue}
                                id="outlined-basic"
                                label="Client ID"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                }}
                                value={topic}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6} xl={6}>
                            <TextField
                                // value={criticalMinValue}
                                id="outlined-basic"
                                label="Reconnecting Period"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                }}
                                value={topic}
                                autoComplete="off"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} xl={12}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#212121" }}
                                onClick={handlesubmit}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                    {/* <div style={{ height: 300, width: "570%", marginTop: "20px" }}>
                <DataGrid
                  rows={[]}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </div> */}
                    {/* </Box> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openRow}
                onClose={handleClose}
                sx={{ "& .MuiDialog-paper": { width: "600px", maxWidth: "none" } }}
            >
                <DialogTitle>Raw Table</DialogTitle>
                <DialogContent>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            sx={{
                                border: "none",
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none", // This removes the top border of the footer (pagination area)
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none", // Removes the bottom border between cells
                                },
                                "& .MuiDataGrid-row": {
                                    "&:hover": {
                                        backgroundColor: "#ffffff", // Removes hover background
                                    },
                                },
                                "& .MuiDataGrid-row:nth-of-type(odd)": {
                                    backgroundColor: "#f5f5f5", // Light gray for odd rows
                                },
                                "& .MuiDataGrid-row:nth-of-type(even)": {
                                    backgroundColor: "#ffffff", // White for even rows
                                },
                            }}
                            rows={[]}
                            columns={columns}
                            pageSize={10}
                            rowHeight={38}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </CardContent>
        // </Card>
    );
};

export default MyComponent;