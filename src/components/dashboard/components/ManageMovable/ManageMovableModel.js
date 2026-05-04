import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import NotificationBar from '../../../notification/ServiceNotificationBar';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import { DownloadManageMovableTemplate } from '../../../../services/DownloadCsvReportsService';
import { DevcieCategorylist, DeviceMasterCategory, DeviceNameListShow, movableAssetsAdd, movableAssetsEdit, UploadManageMovableXl } from '../../../../services/LoginPageService';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const ManageMovableModel = ({ open, setOpen, isAddButton, setRefreshData, editMovabledevice
    , projectId }) => {

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, },
        { field: 'pathName', headerName: 'Path Name', flex: 1, },
        { field: 'sequence', headerName: 'Sequence', flex: 1, },
        { field: 'coordinates', headerName: 'Coordinates', flex: 1, },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                <EditData selectedRow={params.row} />, <DeleteData selectedRow={params.row} />,
            ],
        },
    ]

    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    // setIsAddButton(false);
                    // setEditMovabledevice(props.selectedRow);
                    // setOpen(true);

                }}
            />
        )
    };
    function DeleteData(props) {
        return (
            <DeleteIcon

                style={{ cursor: 'pointer' }}
                onClick={() => {
                    // setDeleteId(props.selectedRow.id);
                    // setDeleteDailogOpen(true)
                }}
            />
        );
    };

    const [id, setId] = useState('');
    const [rows, setRows] = useState([]);
    const [deviceTime, setDeviceTime] = useState('');
    const [cordinates, setCordinates] = useState('');
    const [Devicecategory, setDeviceCategory] = useState('');
    const [devicename, setDeviceName] = useState('');
    const [pathName, setPathName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [sequence, setSequence] = useState('');
    const [server, setServer] = useState('');
    // const [Devicecategory, setDeviceCategory] = useState('');
    const [categoryList, setCategorytList] = useState([]);
    const [deviceNameList, setDeviceNameList] = useState([]);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);

    useEffect(() => {
        DevcieCategorylist(handleCategorySuccess, handleCategoryException);
        setOpen(open);
        loadData();
    }, [editMovabledevice]);
    const handleCategorySuccess = (dataObject) => {
        // setGridLoading(false);
        setCategorytList(dataObject.categories);
    };
    const handleCategoryException = (errorObject) => {
    };
    const loadData = () => {
        setId(editMovabledevice.id || '');
        setDeviceCategory(editMovabledevice.motorCategory || '');
        setDeviceName(editMovabledevice.motorName || '');
        setLocationName(editMovabledevice.location || '');
        setPathName(editMovabledevice.pathName || '');
        setSequence(editMovabledevice.sequence || '');
        setCordinates(editMovabledevice.coordinates || '')

    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    const fileInputRef = useRef(null);

    const handleTemplateDownload = () => {
        DownloadManageMovableTemplate(templateDownloadSuccess, templateDownloadException)
    };
    const templateDownloadSuccess = () => {

    }
    const templateDownloadException = () => { }

    const handleItemImportSucess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setTimeout(() => {
            handleClose();
            // setOpen(false);
        }, 2000);
        setRefreshData((oldvalue) => !oldvalue);
    }
    const handleItemImportException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
            // setOpen(false);
        }, 2000);
    };

    const getDeviceName = (e) => {
        DeviceNameListShow({
            motorCategoryId: e.target.value
        }, handleFetchTestRigSuccess, handleFetchTestRigException);
    };
    const handleFetchTestRigSuccess = (dataObject) => {
        setDeviceNameList(dataObject.motors || [])
    };
    const handleFetchTestRigException = (errorObject, errorMessage) => {

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            movableAssetsAdd(
                {
                    motorCategory: Devicecategory,
                    motorName: devicename,
                    location: locationName,
                    pathName: pathName,
                    sequence: sequence,
                    coordinates: cordinates

                },
                movableAssetsSuccess,
                movableAssetsException
            );
        } else {
            movableAssetsEdit(
                {
                    id,
                    motorCategory: Devicecategory,
                    motorName: devicename,
                    location: locationName,
                    pathName: pathName,
                    sequence: sequence,
                    coordinates: cordinates
                },
                movableAssetsSuccess,
                movableAssetsException
            );
        }

    };

    const movableAssetsSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);
        setTimeout(() => {
            resetForm();
            handleClose();
            // setProgressStatus(1);
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    const movableAssetsException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    };
    const handleDeviceNameChange = (motorId) => {
        // Find the selected motor's details
        const selectedMotor = deviceNameList.find((motor) => motor.motorId === motorId);
        if (selectedMotor) {
            setLocationName(selectedMotor.locationName); // Update the locationName state
        } else {
            setLocationName(""); // Reset the locationName if no match found
        }
    };

    // const handleSubmitAdditionalDialog = () => {
    //     console.log({
    //         // newPathName,
    //         // newSequence,
    //         // newCoordinates,
    //     });
    //     setOpenAdditionalDialog(false);
    // };
    const handleSubmitAdditionalDialog = () => {
        const newRow = {
            id: rows.length + 1, // Auto-increment ID
            pathName,
            sequence,
            coordinates: cordinates,
        };
        setRows([...rows, newRow]);
        setPathName('');
        setSequence('');
        setCordinates('');
    };

    <>
        <Dialog open={open} fullWidth={true} maxWidth="lg" onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogContent style={{ height: '78vh' }}>
                    <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px' }}>
                        {isAddButton ? 'Add Device' : 'Edit Device'}
                    </DialogTitle>
                    <Grid container spacing={1}>
                        {/* Your existing fields here */}
                    </Grid>
                    <Grid container spacing={1} marginTop={2}>
                        {/* Buttons */}
                        <Grid item xs={3}>
                            <Fab
                                variant="extended"
                                size="medium"
                                color="primary"
                                aria-label="add"
                                sx={{
                                    backgroundColor: "#051622",
                                    color: "#ffff",
                                    "&:hover": {
                                        backgroundColor: "#183b52",
                                    },
                                }}
                                onClick={() => setOpenAdditionalDialog(true)}
                            >
                                Add Path
                            </Fab>
                        </Grid>
                    </Grid>
                </DialogContent>
                <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        {isAddButton ? 'Add' : 'Update'}
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Dialog>
        <Dialog
            open={openAdditionalDialog}
            onClose={() => setOpenAdditionalDialog(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Additional Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Path Name"
                            value={pathName}
                            onChange={(e) => setPathName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Sequence"
                            value={sequence}
                            onChange={(e) => setSequence(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Coordinates"
                            value={cordinates}
                            onChange={(e) => setCordinates(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Box textAlign="right" marginTop={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleSubmitAdditionalDialog();
                            setOpenAdditionalDialog(false);
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>

        {/* DataGrid */}
        <div style={{ height: 200, width: '100%', marginTop: '20px' }}>
            <DataGrid
                rows={rows}
                columns={[
                    { field: 'id', headerName: 'ID', width: 100 },
                    { field: 'pathName', headerName: 'Path Name', width: 200 },
                    { field: 'sequence', headerName: 'Sequence', width: 150 },
                    { field: 'coordinates', headerName: 'Coordinates', width: 300 },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    </>

    return (
        <>
            <Dialog open={open} fullWidth={true} maxWidth="lg" onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogContent style={{ height: '78vh' }}>
                        <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px' }}>
                            {isAddButton ? 'Add Device' : 'Edit Device'}
                        </DialogTitle>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Device Category</InputLabel>
                                    <Select
                                        value={Devicecategory}
                                        label="Device Category"
                                        onChange={(e) => {
                                            setDeviceCategory(e.target.value);
                                            getDeviceName(e)
                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {categoryList.map((data, index) => (
                                            <MenuItem value={data.id} key={index + 1}  >
                                                {data.motorCategory}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Device Name</InputLabel>
                                    <Select
                                        value={devicename}
                                        label="Device Name"
                                        onChange={(e) => {
                                            setDeviceName(e.target.value);
                                            handleDeviceNameChange(e.target.value);
                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {deviceNameList.map((data, index) => (
                                            <MenuItem value={data.motorId} key={index + 1}  >
                                                {data.motorName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Location Name"
                                    value={locationName}
                                    disabled={isAddButton}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setLocationName(e.target.value)
                                    }}
                                />
                            </Grid>


                            {/* )} */}


                        </Grid>
                        <Grid container spacing={1} marginTop={2}>

                            <Grid item xs={3}>

                                <Fab variant="extended" size="medium" color="primary" aria-label="add"
                                    onClick={handleTemplateDownload} sx={{
                                        backgroundColor: "#051622", color: "#ffff",
                                        "&:hover": {
                                            backgroundColor: "#183b52", // Change to your desired hover color
                                        },
                                    }}>
                                    <FileDownloadOffIcon sx={{ mr: 1 }} />
                                    Template Download
                                </Fab>
                            </Grid>
                            <Grid item xs={3}>

                                <Fab variant="extended" size="medium" color="primary" aria-label="add"
                                    sx={{
                                        backgroundColor: "#051622", color: "#ffff",
                                        "&:hover": {
                                            backgroundColor: "#183b52", // Change to your desired hover color
                                        },
                                    }}
                                    onClick={() => {
                                        // Trigger the file input click when the button is clicked
                                        if (fileInputRef.current) {
                                            fileInputRef.current.click();
                                        }
                                    }}
                                >
                                    <UploadIcon sx={{ mr: 1 }} />
                                    Upload Template
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        // setUploadLoader(true)
                                                        UploadManageMovableXl({
                                                            file: reader.result,
                                                            // project_id: '5'
                                                        }, handleItemImportSucess, handleItemImportException);
                                                    }
                                                };
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }} />
                                </Fab>
                            </Grid>
                            <Grid item xs={3}>
                                <Fab
                                    variant="extended" size="medium" color="primary" aria-label="add"
                                    sx={{
                                        backgroundColor: "#051622", color: "#ffff",
                                        "&:hover": {
                                            backgroundColor: "#183b52", // Change to your desired hover color
                                        },
                                    }}
                                    onClick={() => setOpenAdditionalDialog(true)}
                                >
                                    Add Path
                                </Fab>
                            </Grid>
                        </Grid>
                        {/* )} */}

                        <div style={{ height: 250, width: '60%', marginTop: '20px' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}

                            />
                        </div>


                    </DialogContent>

                    <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>
                        <Button type="submit" variant="contained" color="primary">
                            {isAddButton ? 'Add' : 'Update'}
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Dialog>
            <Dialog
                open={openAdditionalDialog}
                onClose={() => setOpenAdditionalDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Additional Details</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Path Name"
                                value={pathName}
                                onChange={(e) => setPathName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Sequence"
                                value={sequence}
                                onChange={(e) => setSequence(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Coordinates"
                                value={cordinates}
                                onChange={(e) => setCordinates(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Box textAlign="right" marginTop={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAdditionalDialog}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </>
    )
}

export default ManageMovableModel