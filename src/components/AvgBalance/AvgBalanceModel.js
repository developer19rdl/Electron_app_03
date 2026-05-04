import {
    Button,
    Grid,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
// import { AssetAddService, AssetEditService, AssetTypeFetchService } from '../../../../services/LoginPageService';
// import { AddVendorValidate } from '../../../../validation/locationValidation';
// import NotificationBar from '../../../notification/ServiceNotificationBar';
import {
    AssetAddService,
    AssetEditService,
    AssetTypeFetchService,
    AvgBalanceAddService,
    AvgBalanceAddServiceEditService,
    FetchEnergyReportDetails,
    PlantAlertAddService,
    PlantAlertSettingsEditService,
} from "../../services/LoginPageService";

const AvgBalanceModel = ({
    open,
    setOpen,
    isAddButton,
    configSetupData,
    setRefreshData,
    handleClose,
    openNotification,
    setNotification,
    locationId,
    setLocationId,
    branchId,
    setBranchId,
    facilityId,
    setFacilityId,
    buildingId,
    setBuildingId
}) => {
    const [id, setId] = useState("");

    // AccessPoint inputs


    const [avgBalanceValue, setAvgBalanceValue] = useState("");

    useEffect(() => {
        setOpen(open);
        loadData();
        // AssetTypeFetchService(categoryHandleSuccess, handleAssetTypeException);
    }, [configSetupData]);

    useEffect(() => {
        AssetTypeFetchService(categoryHandleSuccess, handleAssetTypeException);
    }, []);

    const categoryHandleSuccess = (dataObject) => {
        setAssetTypeList(dataObject.data);
        // console.log(dataObject.data);
    };
    const handleAssetTypeException = (dataObject) => { };

    const loadData = () => {
        setId(configSetupData.id || "");

        setAvgBalanceValue(configSetupData.avgBalanceValue || "");


    };

    const clearForm = () => {
        setAvgBalanceValue("");

    };

    /* eslint-disable-next-line */

    const handleAddSuccess = (dataObject) => {
        clearForm();
        handleSuccess(dataObject);
    };

    const handleUpdateSuccess = (dataObject) => {
        handleSuccess(dataObject);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message,
        });
        setRefreshData((oldvalue) => !oldvalue);
    };

    /* eslint-disable-next-line */
    const handleException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: "error",
            message: errorMessage,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAddButton) {
            await AvgBalanceAddService(
                {
                    /* eslint-disable-next-line */
                    avgBalanceValue,
                    locationId,
                    branchId,
                    facilityId,
                    buildingId,
                },
                handleAddSuccess,
                handleException
            );
        } else {
            await AvgBalanceAddServiceEditService(
                {
                    /* eslint-disable-next-line */
                    id,
                    avgBalanceValue

                },
                handleUpdateSuccess,
                handleException
            );
        }
    };






    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "100%" } }}
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>{isAddButton ? "Enter Last 3 Months Average Energy Bill (kWh)" : "Edit Last 3 Months Average Energy Bill"}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} alignItems="center">


                        <Grid item xs={12}>
                            <TextField
                                value={avgBalanceValue}
                                margin="dense"
                                id="outlined-basic"
                                label="Please Enter Last 3 Months Average Energy Bill (kWh)"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setAvgBalanceValue(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ margin: "10px" }}>
                    <Button
                        size="large"
                        autoFocus
                        onClick={() => {
                            setOpen(false);
                            setErrorObject({});
                            loadData();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button size="large" type="submit">
                        {" "}
                        {isAddButton ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AvgBalanceModel
