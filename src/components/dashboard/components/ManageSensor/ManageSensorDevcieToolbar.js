import { Box, Fab, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DeviceSensorStatus, SensorManageService, UploadSensorAloneXl, UploadStandAloneXl } from '../../../../services/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { DownloadSensorDeviceService, DownloadSensorTemplateService, DownloadStandAloneTemplate } from '../../../../services/DownloadCsvReportsService';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';

function ManageSensorDevcieToolbar(props) {
    const { setRefreshData, } = props;
    // const { Project } = props;

    // console.log("aqswdefr", props.showNotification)
    // const [file, setFile] = useState(null);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const handleAddMeter = () => {
        props.setIsAddButton(true),
            props.setEditSensordevice([]),
            props.setOpen(true)

    };

    const fileInputRef = useRef(null);

    const handleItemImportSuccess = (dataObject) => {
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

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    const handleTemplateDownload = (type) => {

        setSubMenuAnchorEl(null)
        setAnchorEl(null)
        DownloadSensorTemplateService({ ids: type }, templateDownloadSuccess, templateDownloadException)
    };
    const templateDownloadSuccess = () => { }
    const templateDownloadException = () => { }

    const [uploadSubMenuAnchorEl, setUploadSubMenuAnchorEl] = useState(null);
    const [selectedUploadType, setSelectedUploadType] = useState('');

    const [anchorEl, setAnchorEl] = useState(null); // State for main menu anchor
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null); // State for submenu anchor
    // Open and close handlers for the main menu
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Open and close handlers for the submenu
    const handleSubMenuOpen = (event) => setSubMenuAnchorEl(event.currentTarget);
    const handleSubMenuClose = () => setSubMenuAnchorEl(null);

    const handleUploadSubMenuOpen = (event) => setUploadSubMenuAnchorEl(event.currentTarget);
    const handleUploadSubMenuClose = () => setUploadSubMenuAnchorEl(null);

    const handleDownload = () => {
        setAnchorEl(null)
        const selectedIds = props.sensordeviceList
            .filter((item) => item.selected === true)  // Filter the selected items
            .map((data) => data.id);  // Extract only the ids of the selected items
        DownloadSensorDeviceService({
            ids: selectedIds
        }, handleDownloadSucess, handledownloadException);
    };

    const handleDownloadSucess = () => {
        SensorManageService(handleSuccess, handleException);

    };
    const handleSuccess = (data) => {
        // setGridLoading(false);
        // setMDeviceList(dataObject?.data || []);
        props.setSensorDeviceList(
            (data?.data || []).map((item) => ({
                ...item,
                selected: false, // Convert 1 to true, 0 to false
            }))
        );
    };

    const handleException = () => {

    };
    const handledownloadException = () => {

    };
    const handleEnable = () => {
        // Filter the selected items and extract their ids
        const selectedIds = props.sensordeviceList
            .filter((item) => item.selected === true)  // Filter the selected items
            .map((data) => data.id);  // Extract only the ids of the selected items

        DeviceSensorStatus({
            selectAll: props.selectAll,  // Pass the selectAll state
            ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
            mode: "1",  // Mode is set to "1"
        }, statusSuccess, statusException);
    };
    const statusSuccess = (dataObject) => {

        // Handle the successful response here
        SensorManageService(handleSuccess, handleException);

        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    };

    const statusException = (errorObject, errorMessage) => {

    };
    const handleDisable = () => {
        // Filter the selected items and extract their ids
        const selectedIds = props.sensordeviceList
            .filter((item) => item.selected === true)  // Filter the selected items
            .map((data) => data.id);  // Extract only the ids of the selected items

        DeviceSensorStatus({
            selectAll: props.selectAll,  // Pass the selectAll state
            ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
            mode: "0",  // Mode is set to "1"
        }, statusdisableSuccess, statusDisableException);
    };
    const statusdisableSuccess = (dataObject) => {
        SensorManageService(handleSuccess, handleException);
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
    };

    const statusDisableException = (errorObject, errorMessage) => {

    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    UploadSensorAloneXl(
                        {
                            file: reader.result,
                            type: selectedUploadType, // Pass selected upload type
                        },
                        handleItemImportSuccess,
                        handleItemImportException
                    );
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <Box
            sx={{
                mb: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography sx={{ m: 1 }} variant="h5">
                Sensor Management
            </Typography>
            <Box sx={{ m: 1 }} >
                <Stack direction="row" spacing={2}>
                    {/* <Fab variant="extended" size="small" color="primary" aria-label="add" sx={{
                        backgroundColor: "#051622", color: "#ffff",
                        "&:hover": {
                            backgroundColor: "#183b52", // Change to your desired hover color
                        },
                    }}>
                        <DownloadIcon sx={{ mr: 1 }} />
                        Download </Fab>
                    <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleTemplateDownload} sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <ArrowDownwardIcon sx={{ mr: 1 }} />
                        Template Download
                    </Fab>

                    <Fab variant="extended" size="small" color="primary" aria-label="add"
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
                                            // UploadStandAloneXl({
                                            //     file: reader.result,
                                            //     project_id: projectId
                                            // }, handleItemImportSucess, handleItemImportException);
                                        }
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }
                            }} />
                    </Fab> */}

                    {/* <Grid>     */}
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="menu"
                        sx={{
                            backgroundColor: "#051622",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#183b52" },
                        }}
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon />
                    </Fab>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleDownload}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <DownloadIcon />
                                <span>Download</span>
                            </Stack>
                        </MenuItem>
                        <MenuItem
                            onClick={handleSubMenuOpen}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ArrowDownwardIcon />
                                <span>Template Download</span>
                            </Stack>
                        </MenuItem>
                        <Menu
                            anchorEl={subMenuAnchorEl}
                            open={Boolean(subMenuAnchorEl)}
                            onClose={handleSubMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <MenuItem onClick={() => handleTemplateDownload('analog')}>Analog</MenuItem>
                            <MenuItem onClick={() => handleTemplateDownload('digital')}>Digital</MenuItem>
                            <MenuItem onClick={() => handleTemplateDownload('modbus')}>Modbus</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleUploadSubMenuOpen}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <UploadIcon />
                                <span>Upload Template</span>
                            </Stack>
                        </MenuItem>

                        <Menu
                            anchorEl={uploadSubMenuAnchorEl}
                            open={Boolean(uploadSubMenuAnchorEl)}
                            onClose={handleUploadSubMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <MenuItem onClick={() => { setSelectedUploadType('analog'); fileInputRef.current.click(); }}>
                                Analog
                            </MenuItem>
                            <MenuItem onClick={() => { setSelectedUploadType('digital'); fileInputRef.current.click(); }}>
                                Digital
                            </MenuItem>
                            <MenuItem onClick={() => { setSelectedUploadType('modbus'); fileInputRef.current.click(); }}>
                                Modbus
                            </MenuItem>
                        </Menu>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                    </Menu>

                    <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleEnable}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <PowerSettingsNewIcon sx={{ mr: 1 }} />
                        Enable
                    </Fab>
                    {/* </Grid> */}
                    {/* <Grid item xs={2}> */}

                    <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleDisable}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <SettingsPowerIcon sx={{ mr: 1 }} />
                        Disable
                    </Fab>
                    {/* </Grid> */}

                    <Fab variant="extended" size="small" color="primary"
                        aria-label="add"
                        onClick={handleAddMeter}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add Sensor
                    </Fab>

                </Stack>

            </Box>
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Box>
    )
}

export default ManageSensorDevcieToolbar

