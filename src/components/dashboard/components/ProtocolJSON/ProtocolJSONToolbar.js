import { Box, Fab, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import NotificationBar from '../../../notification/ServiceNotificationBar';

function ProtocolJSONToolbar(props) {
    const { setRefreshData } = props;

    // const [file, setFile] = useState(null);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    const handleAddJson = () => {
        props.setIsAddButton(true);
        props.setEditMovabledevice([]);
        props.setOpen(true);
    };

    // const fileInputRef = useRef(null);

    // const handleTemplateDownload = () => {
    //     DownloadManageMovableTemplate(templateDownloadSuccess, templateDownloadException)
    // };
    // const templateDownloadSuccess = () => { }
    // const templateDownloadException = () => { }

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
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    return (
        <Box
            sx={{
                // mb: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography sx={{ m: 1 }} variant="h5">
                Json Data
            </Typography>
            <Box sx={{ m: 1 }} >
                <Stack direction="row" spacing={2}>
                    <Fab variant="extended" size="medium" color="primary"
                        aria-label="add"
                        onClick={handleAddJson}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            },
                        }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Create Json Link
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

export default ProtocolJSONToolbar