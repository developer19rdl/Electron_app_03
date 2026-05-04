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
    FetchEnergyReportDetails,
    PlantAlertAddService,
    PlantAlertSettingsEditService,
} from "../../services/LoginPageService";
/* eslint-disable-next-line */

const PlantAlertModalComponent = ({
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
    const [assetName, setAssetName] = useState("");
    const [assetType, setAssetType] = useState("");
    const [areaName, setAreaName] = useState("");

    // FTP inputs
    const [motorDetails, setMotorDetails] = useState("");
    const [rpsv, setRpsv] = useState("");
    const [ratedCurrent, setRatedCurrent] = useState("");
    const [motorTypeVariableSpeed, setMotorTypeVariableSpeed] = useState("");
    const [lineFrequency, setLineFrequency] = useState("");
    const [efficiency, setEfficiency] = useState("");

    const [assetTypeId, setAssetTypeId] = useState("");
    const [assetTypeList, setAssetTypeList] = useState([]);

    const [pfMIn, setPfMIn] = useState("");
    const [pfMax, setPfMax] = useState("");

    const [freeMin, setFreeMin] = useState("");
    const [FreMax, setFreMax] = useState("");

    const [VoMIn, setVoMIn] = useState("");
    const [VoMax, setVoMax] = useState("");

    const [consumptionMin, setConsumptionMin] = useState("");
    const [consumptionMax, setConsumptionMax] = useState("");
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
        console.log(dataObject.data);
    };
    const handleAssetTypeException = (dataObject) => { };

    const loadData = () => {
        setId(configSetupData.id || "");

        setPfMIn(configSetupData.PFMin || "");
        setPfMax(configSetupData.PFMax || "");
        setFreeMin(configSetupData.FrequencyMin || "");
        setFreMax(configSetupData.FrequencyMax || "");
        setVoMIn(configSetupData.voltageMin || "");
        setVoMax(configSetupData.voltageMax || "");
        setConsumptionMin(configSetupData.totalConsumMin || "");
        setConsumptionMax(configSetupData.totalConsumMax || "");


    };

    const clearForm = () => {
        setPfMIn("");
        setPfMax("");
        setFreeMin("");
        setFreMax("");
        setVoMIn("");
        setVoMax("");
        setConsumptionMin("");
        setConsumptionMax("");
    };

    /* eslint-disable-next-line */
    const validateForNullValue = (value, type) => {
        AddVendorValidate(value, type, setErrorObject);
    };

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
            await PlantAlertAddService(
                {
                    /* eslint-disable-next-line */
                    PFMin: pfMIn,
                    PFMax: pfMax,
                    FrequencyMin: freeMin,
                    FrequencyMax: FreMax,
                    voltageMin: VoMIn,
                    voltageMax: VoMax,
                    totalConsumMin: consumptionMax,
                    totalConsumMax: consumptionMax,
                    locationId,
                    branchId,
                    facilityId,
                    buildingId,
                },
                handleAddSuccess,
                handleException
            );
        } else {
            await PlantAlertSettingsEditService(
                {
                    /* eslint-disable-next-line */
                    id,
                    PFMin: pfMIn,
                    PFMax: pfMax,
                    FrequencyMin: freeMin,
                    FrequencyMax: FreMax,
                    voltageMin: VoMIn,
                    voltageMax: VoMax,
                    totalConsumMin: consumptionMax,
                    totalConsumMax: consumptionMax,
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
                <DialogTitle>{isAddButton ? "Add Asset" : "Edit Asset"}</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                Power Factor
                            </Typography>
                        </Grid>

                        <Grid item xs={4.5}>
                            <TextField
                                value={pfMIn}
                                margin="dense"
                                id="outlined-basic"
                                label="Min"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setPfMIn(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <Box sx={{ minWidth: 250 }}> */}
                            <TextField
                                value={pfMax}
                                margin="dense"
                                id="outlined-basic"
                                label="Max"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setPfMax(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                Frequency
                            </Typography>
                        </Grid>

                        <Grid item xs={4.5}>
                            <TextField
                                value={freeMin}
                                margin="dense"
                                id="outlined-basic"
                                label="Min"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setFreeMin(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <Box sx={{ minWidth: 250 }}> */}
                            <TextField
                                value={FreMax}
                                margin="dense"
                                id="outlined-basic"
                                label="Max"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setFreMax(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                Voltage
                            </Typography>
                        </Grid>

                        <Grid item xs={4.5}>
                            <TextField
                                value={VoMIn}
                                margin="dense"
                                id="outlined-basic"
                                label="Min"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setVoMIn(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <Box sx={{ minWidth: 250 }}> */}
                            <TextField
                                value={VoMax}
                                margin="dense"
                                id="outlined-basic"
                                label="Max"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setVoMax(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom>
                                Consumption
                            </Typography>
                        </Grid>

                        <Grid item xs={4.5}>
                            <TextField
                                value={consumptionMin}
                                margin="dense"
                                id="outlined-basic"
                                label="Min"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setConsumptionMin(e.target.value);
                                }}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={4.5}>
                            {/* <Box sx={{ minWidth: 250 }}> */}
                            <TextField
                                value={consumptionMax}
                                margin="dense"
                                id="outlined-basic"
                                label="Max"
                                variant="outlined"
                                fullWidth
                                // required
                                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                                onChange={(e) => {
                                    setConsumptionMax(e.target.value);
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
    );
};

export default PlantAlertModalComponent;
