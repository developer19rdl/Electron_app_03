import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
    Box,
    Card,
    CardContent,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput
} from '@mui/material';
import { EmailAlertAdd, EmailAlertAddEdit, SettingAlertAdd, SettingAlertAddEdit } from '../../services/LoginPageService';

const AlertConfigModel = ({ open, setOpen, isAddButton, editAlertSetUp, setNotification, setRefreshData }) => {
    console.log('editAlertSetUp', editAlertSetUp);
    const [smtpServer, setSmtpServer] = useState('');
    const [alertEmailForm, setAlertEmailForm] = useState('');
    const [password, setPassword] = useState('');
    const [port, setPort] = useState('');
    const [securityType, setSecurityType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [id, setId] = useState('');
    const [alertType, setAlertType] = useState('');
    const [subject, setSubject] = useState('');
    const [users, setUsers] = useState('');
    const [usersendTo, setUserSendTo] = useState([]); // Ensure it's an array
    const [consumableTypeList, setConsumableTypeList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('AlertParameters'); // Initialize with default value



    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // const handleSendertyType = (e) => {
    // const handleSendertyType = (event) => {
    //     const { value } = event.target;
    //     setUserSendTo(Array.isArray(value) ? value : [value]); // Ensure value is always an array
    // };

    const handleSendertyType = (event) => {
        const { value } = event.target;
        setUserSendTo(typeof value === "string" ? value.split(",") : value); // Ensure array format
    };
    const onUsersChange = (e) => {
        setUsers(e.target.value);
    };

    const handleAlertType = (e) => {
        setAlertType(e.target.value);
    };

    useEffect(() => {
        // loadCategory();
        loadData();
    }, [editAlertSetUp]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAddButton) {
            SettingAlertAdd({
                alert_type: alertType,
                alert_subject: subject,
                send_to: usersendTo
            }, handleSuccess1, handleException02);
        } else {
            SettingAlertAddEdit(
                {
                    id,
                    alert_type: alertType,
                    alert_subject: subject,
                    send_to: usersendTo
                },
                handleSuccess1, handleException02);

        }
    };

    const handleSuccess1 = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setRefreshData((oldvalue) => !oldvalue);
        setTimeout(() => {
            handleClose();
            setOpen(false);
            // setErrorObject({});
        }, 1000);
    };
    const handleException02 = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
    };
    const loadData = () => {
        setId(editAlertSetUp?.id || '');
        setAlertType(editAlertSetUp.alert_type || '')
        setSubject(editAlertSetUp.alert_subject || '')
        setUserSendTo(editAlertSetUp.send_to || '')

    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };



    return (
        <div>
            <Dialog sx={{ '& .MuiDialog-paper': { width: '62%', maxHeight: '100%' } }}
                maxWidth="lg"
                open={open}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{ color: '#000000', fontWeight: 'bold' }}>
                        {isAddButton ? 'Add ' : 'Update '} Email Settings
                    </DialogTitle>
                    <DialogContent>
                        {/* <Grid container spacing={2} style={{}}>
                            <Grid item xs={12} marginBottom={2}>
                                <Box display="flex" justifyContent="center">
                                    <FormControl component="fieldset">
                                        <RadioGroup row value={selectedValue} onChange={handleRadioChange}>
                                            <FormControlLabel value="AlertParameters" control={<Radio />} label="Email Settings" />
                                            <FormControlLabel value="SetAlerts" control={<Radio />} label="Set Alerts" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid> */}
                        {/* {selectedValue === 'AlertParameters' && ( */}
                        <Grid container spacing={2} paddingTop={1}>

                            <Grid item xs={6} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Alert Type</InputLabel>
                                    <Select
                                        defaultValue='Finished_Goods'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        placeholder='Alert Type'
                                        value={alertType}
                                        label="Alert Type"
                                        onChange={handleAlertType}>
                                        <MenuItem value='Sensor'>Sensor</MenuItem>
                                        <MenuItem value='Device'>Device</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Alert Subject"
                                    placeholder="Alert Subject"
                                    variant="outlined"
                                    required
                                    type='text'
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}

                                />
                            </Grid>

                            {/* <Grid item xs={6} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="user-send-alert-label">User Send Alert To</InputLabel>
                                    <Select
                                        multiple
                                        labelId="user-send-alert-label"
                                        id="user-send-alert"
                                        value={Array.isArray(usersendTo) ? usersendTo : []} // Ensure value is an array
                                        onChange={handleSendertyType}
                                        input={<OutlinedInput label="User Send Alert To" />}
                                        renderValue={(selected) => (Array.isArray(selected) ? selected.join(", ") : "")} // Prevent errors
                                    >
                                        {["User", "Super Admin", "Manager", "Admin"].map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid> */}

                            <Grid item xs={6} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="user-send-alert-label">User Send Alert To</InputLabel>
                                    <Select
                                        multiple
                                        labelId="user-send-alert-label"
                                        id="user-send-alert"
                                        value={usersendTo || []} // Ensure value is always an array
                                        onChange={handleSendertyType}
                                        input={<OutlinedInput label="User Send Alert To" />}
                                        renderValue={(selected) => selected.join(", ")} // Display selected values
                                    >
                                        {["User", "Super Admin", "Manager", "Admin"].map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'flex-end' }}>
                        <Button onClick={() => {
                            setOpen(false);

                        }}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isAddButton ? "Add" : "Update"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default AlertConfigModel;
