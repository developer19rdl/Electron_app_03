import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DeviceMasterAdd, DeviceMasterEdit, ProjectAddService, ProjectEditService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

const DeviceMasterModule = ({ open, setOpen, isAddButton, editCategory, setRefreshData }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [id, setId] = useState('');
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    useEffect(() => {
        if (editCategory) {
            setOpen(open);
            //   setBackdrop(true);
            loadData();
        }
        // if (isAddButton) {
        //   setBackdrop(false);
        // }
    }, [editCategory, isAddButton]);

    const loadData = () => {
        setId(editCategory?.id)
        setCategoryName(editCategory?.motorCategory)
        setCategoryDescription(editCategory?.motorDescription)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            DeviceMasterAdd(
                {
                    motorCategory: categoryName,
                    motorDescription: categoryDescription,

                },
                ProjectAddSuccess,
                ProjectAddException
            );
        } else {
            DeviceMasterEdit(
                {
                    id,
                    motorCategory: categoryName,
                    motorDescription: categoryDescription,

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
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: '60%' } }}
            maxWidth="sm"
            open={open}
        >
            <DialogTitle sx={{ letterSpacing: '1px', textAlign: 'center', fontSize: " 22px" }}>
                {isAddButton ? 'Add Device Category' : 'Edit Device Category'}
            </DialogTitle>
            <DialogContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">

                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Device Category Name"
                                    type="text"
                                    value={categoryName}
                                    variant="outlined"
                                    placeholder="Device Category Name"
                                    fullWidth
                                    required
                                    // onBlur={() => { validateForNullValue(email, 'email'); }}
                                    onChange={(e) => { setCategoryName(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.emailId?.errorStatus}
                                // helperText={errorObject?.emailId?.helperText}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Device Category Description"
                                    type="text"
                                    value={categoryDescription}
                                    variant="outlined"
                                    placeholder="Device Category Description"
                                    fullWidth
                                    required
                                    // onBlur={() => validateForNullValue(phoneNo, 'phone')}
                                    onChange={(e) => { setCategoryDescription(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.phone?.errorStatus}
                                // helperText={errorObject?.phone?.helperText}
                                />
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

export default DeviceMasterModule