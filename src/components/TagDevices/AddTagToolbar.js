
import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NotificationBar from '../notification/ServiceNotificationBar';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton } from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import { DownloadTagsTemplate } from '../../services/DownloadCsvReportsService';
import { UploadTagAlone } from '../../services/LoginPageService';


function AddTagToolbar(props) {
    // const { setRefreshData, projectId, setMDeviceList } = props;
    // const { Project } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    // console.log("aqswdefr", props.showNotification)
    // const [file, setFile] = useState(null);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const handleAddMeter = () => {
        props.setIsAddButton(true),
            props.setEditTag([]),
            props.setOpen(true)

    };

    const fileInputRef = useRef(null);

    // const handleItemImportSucess = (dataObject) => {
    //     setNotification({
    //         status: true,
    //         type: 'success',
    //         message: dataObject.message,
    //     });
    //     setTimeout(() => {
    //         handleClose();
    //         // setOpen(false);
    //     }, 2000);
    //     setRefreshData((oldvalue) => !oldvalue);
    // }
    // const handleItemImportException = (errorObject, errorMessage) => {
    //     setNotification({
    //         status: true,
    //         type: 'error',
    //         message: errorMessage,
    //     });
    //     setTimeout(() => {
    //         handleClose();
    //         // setOpen(false);
    //     }, 2000);
    // };

    const handleClose = () => {
        setAnchorEl(null);
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    const handleTemplateDownload = () => {
        DownloadTagsTemplate(templateDownloadSuccess, templateDownloadException)
    };
    const templateDownloadSuccess = () => {

    };

    // const handleException = (errorObject) => { }

    const templateDownloadException = () => { }

    // const handleDownload = () => {
    //     const selectedIds = props.MdeviceList
    //         .filter((item) => item.selected === true)  // Filter the selected items
    //         .map((data) => data.id);  // Extract only the ids of the selected items
    //     DownloadManageDeviceService({
    //         ids: selectedIds
    //     }, handleDownloadSucess, handledownloadException)
    // };
    // const handleDownloadSucess = () => {
    //     DeviceManageService({
    //         project_id: projectId
    //     }, handleSuccess, handleException);
    // };
    // const handleSuccess = (dataObject) => {
    //     // setGridLoading(false);
    //     // setMDeviceList(dataObject?.data || []);
    //     setMDeviceList(
    //         (dataObject?.data || []).map((item) => ({
    //             ...item,
    //             selected: false, // Convert 1 to true, 0 to false
    //         }))
    //     );
    // };
    // const handledownloadException = () => {

    // };


    const handleUploadTemplate = () => {
        // Trigger the file input click when the button is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        handleClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    const fileData = reader.result;

                    // Trigger the upload API call
                    UploadTagAlone({
                        fileData: fileData,
                    }, handleItemImportSucess, handleItemImportException);
                }
            };

            reader.readAsDataURL(file);
        }
    };
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

    // const handleEnable = () => {
    //     // Filter the selected items and extract their ids
    //     const selectedIds = props.MdeviceList
    //         .filter((item) => item.selected === true)  // Filter the selected items
    //         .map((data) => data.id);  // Extract only the ids of the selected items

    //     DeviceManagementStatus({
    //         selectAll: props.selectAll,  // Pass the selectAll state
    //         ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
    //         motorStatus: "1",  // motorStatus is set to "1"
    //     }, statusSuccess, statusException);
    // };
    // const statusSuccess = (dataObject) => {
    //     DeviceManageService({
    //         project_id: projectId
    //     }, handleSuccess, handleException);
    //     setNotification({
    //         status: true,
    //         type: 'success',
    //         message: dataObject.message,
    //     });
    // };

    // const statusException = (errorObject, errorMessage) => {

    // }
    // const handleDisable = () => {
    //     // Filter the selected items and extract their ids
    //     const selectedIds = props.MdeviceList
    //         .filter((item) => item.selected === true)  // Filter the selected items
    //         .map((data) => data.id);  // Extract only the ids of the selected items

    //     DeviceManagementStatus({
    //         selectAll: props.selectAll,  // Pass the selectAll state
    //         ids: selectedIds,  // Pass the ids array directly (e.g., [125, 126, 121, 122])
    //         motorStatus: "0",  // motorStatus is set to "1"
    //     }, statusdisableSuccess, statusDisableException);
    // };
    // const statusdisableSuccess = (dataObject) => {
    //     DeviceManageService({
    //         project_id: projectId
    //     }, handleSuccess, handleException);
    //     setNotification({
    //         status: true,
    //         type: 'success',
    //         message: dataObject.message,
    //     });
    // };

    // const statusDisableException = (errorObject, errorMessage) => {

    // };

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
                Add Parameter
            </Typography>
            <Box sx={{ m: 1 }} >
                <Stack direction="row" spacing={2}>
                    {/* <IconButton onClick={handleClick}> */}
                    {/* <Fab
                        size="small"
                        color="primary"
                        aria-label="menu"
                        sx={{
                            backgroundColor: "#051622",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#183b52" },
                        }}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </Fab> */}

                    {/* <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                       
                        <MenuItem onClick={handleTemplateDownload}>
                            <ArrowDownwardIcon sx={{ mr: 1 }} />
                            Template Download
                        </MenuItem>
                        <MenuItem onClick={handleUploadTemplate}>
                            <UploadIcon sx={{ mr: 1 }} />
                            Upload Template
                        </MenuItem>
                    </Menu> */}

                    {/* Hidden file input for uploading */}
                    {/* <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    /> */}


                    {/* <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleEnable} sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <PowerSettingsNewIcon sx={{ mr: 1 }} />
                        Enable
                    </Fab>



                    <Fab variant="extended" size="small" color="primary" aria-label="add"
                        onClick={handleDisable} sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <SettingsPowerIcon sx={{ mr: 1 }} />
                        Disable
                    </Fab> */}

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
                        Add Parameter
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

export default AddTagToolbar