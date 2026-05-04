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
    CorrectiveActionAddService,
    CorrectiveActionEditService,
    FetchEnergyReportDetails,
    PlantAlertAddService,
    PlantAlertSettingsEditService,
} from "../../services/LoginPageService";

const CorrectiveActionModel = ({

    open,
    setOpen,
    isAddButton,
    configSetupData,
    setRefreshData,
    setNotification,
    locationId,
    branchId,
    facilityId,
    buildingId,
    floorId,
    zoneId,
    assetId,
    deviceId

}) => {
    const [id, setId] = useState("");

    // AccessPoint inputs

    const [problemStatement, setProblemStatement] = useState("");
    const [correctiveAction, setCorrectiveAction] = useState("");
    const [energySaved, setEnergySaved] = useState("");
    const [fromDate, setFromDate] = useState('');


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

        setCorrectiveAction(configSetupData.correctiveAction || "");


    };

    const clearForm = () => {
        setCorrectiveAction("");

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
            await CorrectiveActionAddService(
                {
                    /* eslint-disable-next-line */

                    locationId,
                    branchId,
                    facilityId,
                    buildingId,
                    floorId,
                    zoneId,
                    fromDate,
                    problemStatement,
                    correctiveAction,
                    energySaved,
                    assetId,
                    deviceId
                },
                handleAddSuccess,
                handleException
            );
        } else {
            await CorrectiveActionEditService(
                {
                    /* eslint-disable-next-line */
                    id,
                    fromDate,
                    problemStatement,
                    correctiveAction,
                    energySaved,
                    assetId,
                    deviceId
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
                <DialogTitle>{isAddButton ? "Add Corrective Action" : "Edit Corrective Action"}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} mt={2}>
                            <TextField
                                fullWidth
                                label="From Date"
                                type="date"
                                value={fromDate}
                                variant="outlined"
                                required
                                onChange={(e) => {
                                    setFromDate(e.target.value);
                                }}
                                autoComplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={problemStatement}
                                margin="dense"
                                id="outlined-basic"
                                label="Problem Statement"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setProblemStatement(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={correctiveAction}
                                margin="dense"
                                id="outlined-basic"
                                label="Enter Corrective Action"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setCorrectiveAction(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={energySaved}
                                margin="dense"
                                id="outlined-basic"
                                label="Energy Saved"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setEnergySaved(e.target.value);
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

export default CorrectiveActionModel
