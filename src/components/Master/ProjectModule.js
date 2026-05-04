import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ProjectAddService, ProjectEditService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

const ProjectModule = ({ open, setOpen, isAddButton, ProjectrData, setRefreshData }) => {
    const [ProjectName, setProjectName] = useState('');
    const [ProDescription, setProDescription] = useState('');
    const [id, setId] = useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        if (ProjectrData) {
            setOpen(open);
            //   setBackdrop(true);
            loadData();
        }
        // if (isAddButton) {
        //   setBackdrop(false);
        // }
    }, [ProjectrData, isAddButton]);

    const loadData = () => {
        setId(ProjectrData?.id)
        setProjectName(ProjectrData?.projectName)
        setProDescription(ProjectrData?.projectDescription)
        setIsEnabled(ProjectrData?.projectStatus === 'enabled' ? 1 : 0);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            ProjectAddService(
                {
                    projectName: ProjectName,
                    projectDescription: ProDescription,
                    projectStatus: isEnabled ? 1 : 0

                },
                ProjectAddSuccess,
                ProjectAddException
            );
        } else {
            ProjectEditService(
                {
                    id,
                    projectName: ProjectName,
                    projectDescription: ProDescription,
                    projectStatus: isEnabled ? 1 : 0
                },
                ProjectAddSuccess,
                ProjectAddException
            );
        }

    };

    const ProjectAddSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        // setOpen(false);
        setTimeout(() => {
            resetForm();
            handleClose();
            setProgressStatus(1);
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    const ProjectAddException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 5000);
    };

    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const [isEnabled, setIsEnabled] = useState(false); // State for the toggle switch

    const handleToggleChange = (e) => {
        const isChecked = e.target.checked; // Get the boolean value
        setIsEnabled(isChecked);
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: '60%' } }}
            maxWidth="sm"
            open={open}
        >
            <DialogTitle sx={{ letterSpacing: '1px', textAlign: 'center', fontSize: " 22px" }}>
                {isAddButton ? 'Add Project' : 'Edit Project'}
            </DialogTitle>
            <DialogContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">

                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Project Name"
                                    type="text"
                                    value={ProjectName}
                                    variant="outlined"
                                    placeholder="Project Name"
                                    fullWidth
                                    required
                                    // onBlur={() => { validateForNullValue(email, 'email'); }}
                                    onChange={(e) => { setProjectName(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.emailId?.errorStatus}
                                // helperText={errorObject?.emailId?.helperText}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Project Description"
                                    type="text"
                                    value={ProDescription}
                                    variant="outlined"
                                    placeholder="Project Description"
                                    fullWidth
                                    required
                                    // onBlur={() => validateForNullValue(phoneNo, 'phone')}
                                    onChange={(e) => { setProDescription(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.phone?.errorStatus}
                                // helperText={errorObject?.phone?.helperText}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Switch
                                        checked={isEnabled}
                                        onChange={handleToggleChange}
                                        color="primary"
                                    />
                                    <Typography variant="body1" sx={{ ml: 1 }}>
                                        {isEnabled ? 'Enable' : 'Disable'}
                                    </Typography>
                                </Box>
                            </Grid>

                        </Grid>

                        <div className="rounded-md -space-y-px float-right">

                            <Button
                                type="submit"
                            >
                                {isAddButton ? 'Add' : 'Update'}
                            </Button>
                            <Button
                                onClick={() => {
                                    // setErrorObject({});
                                    // setBranchList([]);
                                    // setFacilityList([]);
                                    // setBuildingList([]);
                                    // setBranchId('');
                                    // setFacilityId('');
                                    // setBuildingId('');
                                    // setFloorId('');
                                    // setLabId('');
                                    // loaddata();
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Dialog>
    )
}

export default ProjectModule