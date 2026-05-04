import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import { DownloadManageMovableTemplate } from '../../../../services/DownloadCsvReportsService';
import { UploadManageMovableXl } from '../../../../services/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';

function ManageMovableToolbar(props) {
    const { setRefreshData } = props;

    // const [file, setFile] = useState(null);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const handleAddMeter = () => {
        props.setIsAddButton(true);
        props.setEditMovabledevice([]);
        props.setOpen(true);
    };

    const fileInputRef = useRef(null);

    const handleTemplateDownload = () => {
        DownloadManageMovableTemplate(templateDownloadSuccess, templateDownloadException)
    };
    const templateDownloadSuccess = () => { }
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

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
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
                Manage Movable
            </Typography>
            <Box sx={{ m: 1 }} >
                <Stack direction="row" spacing={2}>
                    {/* <Fab variant="extended" size="medium" color="primary" aria-label="add"
                        onClick={handleTemplateDownload} sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <FileDownloadOffIcon sx={{ mr: 1 }} />
                        Template Downlaod
                    </Fab>

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
                                                project_id: '5'
                                            }, handleItemImportSucess, handleItemImportException);
                                        }
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }
                            }} />
                    </Fab> */}

                    <Fab variant="extended" size="medium" color="primary"
                        aria-label="add"
                        onClick={handleAddMeter}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add Movable Asset
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

export default ManageMovableToolbar