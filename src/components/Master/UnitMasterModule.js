import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DeviceMasterAdd, DeviceMasterEdit, ProjectAddService, ProjectEditService, SensorMasterAdd, SensorMasterEdit, unitsMasterAdd, unitsMasterEdit } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

const UnitMasterModule = ({ open, setOpen, isAddButton, editUnitCategory, setRefreshData, setNotification }) => {
    const [UnitcategoryName, setUnitCategoryName] = useState('');
    const [unitCategoryDescription, setUnitCategoryDescription] = useState('');
    const [id, setId] = useState('');
    // const [openNotification, setNotification] = useState({
    //     status: false,
    //     type: 'error',
    //     message: '',
    // });

    useEffect(() => {
        if (editUnitCategory) {
            setOpen(open);
            //   setBackdrop(true);
            loadData();
        }
        // if (isAddButton) {
        //   setBackdrop(false);
        // }
    }, [editUnitCategory, isAddButton]);

    const loadData = () => {
        setId(editUnitCategory?.id)
        setUnitCategoryName(editUnitCategory?.unitsName)
        setUnitCategoryDescription(editUnitCategory?.unitsDesc)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            unitsMasterAdd(
                {
                    unitsName: UnitcategoryName,
                    unitsDesc: unitCategoryDescription,

                },
                UnitAddSuccess,
                UnitAddException
            );
        } else {
            unitsMasterEdit(
                {
                    id,
                    unitsName: UnitcategoryName,
                    unitsDesc: unitCategoryDescription,

                },
                UnitAddSuccess,
                UnitAddException
            );
        }

    };

    const UnitAddSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);
        setTimeout(() => {
            handleClose();
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);

    };

    const UnitAddException = (errorObject, errorMessage) => {
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
                {isAddButton ? 'Add Unit' : 'Edit Unit'}
            </DialogTitle>
            <DialogContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md -space-y-px">

                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Units Name"
                                    type="text"
                                    value={UnitcategoryName}
                                    variant="outlined"
                                    placeholder="Unit Category Name"
                                    fullWidth
                                    required
                                    // onBlur={() => { validateForNullValue(email, 'email'); }}
                                    onChange={(e) => { setUnitCategoryName(e.target.value); }}
                                    autoComplete="off"
                                // error={errorObject?.emailId?.errorStatus}
                                // helperText={errorObject?.emailId?.helperText}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <TextField
                                    sx={{ mb: 2 }}
                                    label="Unit Category Description"
                                    type="text"
                                    value={unitCategoryDescription}
                                    variant="outlined"
                                    placeholder="Unit Category Description"
                                    fullWidth
                                    required
                                    // onBlur={() => validateForNullValue(phoneNo, 'phone')}
                                    onChange={(e) => { setUnitCategoryDescription(e.target.value); }}
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

export default UnitMasterModule