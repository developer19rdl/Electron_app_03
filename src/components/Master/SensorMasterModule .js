import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DeviceMasterAdd, DeviceMasterEdit, ProjectAddService, ProjectEditService, SensorMasterAdd, SensorMasterEdit } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

const SensorMasterModule = ({ open, setOpen, isAddButton, editsensorCategory, setRefreshData, setNotification }) => {
    const [SensorcategoryName, setSensorCategoryName] = useState('');
    const [SensorCategoryDescription, setSensorCategoryDescription] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (editsensorCategory) {
            setOpen(open);
            //   setBackdrop(true);
            loadData();
        }
        // if (isAddButton) {
        //   setBackdrop(false);
        // }
    }, [editsensorCategory, isAddButton]);

    const loadData = () => {
        setId(editsensorCategory?.id)
        setSensorCategoryName(editsensorCategory?.sensorCategory)
        setSensorCategoryDescription(editsensorCategory?.sensorDescription)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            SensorMasterAdd(
                {
                    sensorCategory: SensorcategoryName,
                    sensorDescription: SensorCategoryDescription,

                },
                ProjectAddSuccess,
                ProjectAddException
            );
        } else {
            SensorMasterEdit(
                {
                    id,
                    sensorCategory: SensorcategoryName,
                    sensorDescription: SensorCategoryDescription,

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
                {isAddButton ? 'Add Sensor ' : 'Edit Sensor '}
            </DialogTitle>
            <DialogContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">

                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Sensor Category Name"
                                    type="text"
                                    value={SensorcategoryName}
                                    variant="outlined"
                                    placeholder="Sensor Category Name"
                                    fullWidth
                                    required
                                    // onBlur={() => { validateForNullValue(email, 'email'); }}
                                    onChange={(e) => { setSensorCategoryName(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.emailId?.errorStatus}
                                // helperText={errorObject?.emailId?.helperText}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Sensor Category Description"
                                    type="text"
                                    value={SensorCategoryDescription}
                                    variant="outlined"
                                    placeholder="Sensor Category Description"
                                    fullWidth
                                    required
                                    // onBlur={() => validateForNullValue(phoneNo, 'phone')}
                                    onChange={(e) => { setSensorCategoryDescription(e.target.value); }}
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

        </Dialog>
    )
}

export default SensorMasterModule