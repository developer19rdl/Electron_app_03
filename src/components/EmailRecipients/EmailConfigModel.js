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
    IconButton,
    InputAdornment
} from '@mui/material';
import { EmailAlertAdd, EmailAlertAddEdit } from '../../services/LoginPageService';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const EmailConfigModel = ({ open, setOpen, isAddButton, editEmailConfigSetup, setNotification, setRefreshData }) => {
    const [smtpServer, setSmtpServer] = useState('');
    console.log('setEditAlertConfigSetup', editEmailConfigSetup);

    const [alertEmailForm, setAlertEmailForm] = useState('');
    const [password, setPassword] = useState('');
    const [port, setPort] = useState('');
    const [securityType, setSecurityType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [id, setId] = useState('');
    const [alertTypeList, setAlertTypeList] = useState([]);
    const [users, setUsers] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [consumableTypeList, setConsumableTypeList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('AlertParameters'); // Initialize with default value



    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSecurityType = (e) => {
        setSecurityType(e.target.value);
    };

    const onUsersChange = (e) => {
        setUsers(e.target.value);
    };

    const onAlertTypeChange = (e) => {
        setAlertMessage(e.target.value);
    };

    useEffect(() => {
        // loadCategory();
        loadData();
    }, [editEmailConfigSetup]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAddButton) {
            EmailAlertAdd({
                smtp_server: smtpServer,
                port,
                security_type: securityType,
                fromUser: alertEmailForm,
                fromUserPass: password
            }, handleSuccess1, handleException02);
        } else {
            EmailAlertAddEdit(
                {
                    id,
                    smtp_server: smtpServer,
                    port,
                    security_type: securityType,
                    fromUser: alertEmailForm,
                    fromUserPass: password
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
        setId(editEmailConfigSetup?.id || '');
        setSmtpServer(editEmailConfigSetup.smtp_server || '')
        setAlertEmailForm(editEmailConfigSetup.fromUser || '')
        setPassword(editEmailConfigSetup.fromUserPass || '')
        setSecurityType(editEmailConfigSetup.security_type || '')
        setPort(editEmailConfigSetup.port || '')

    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
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
                                <TextField
                                    fullWidth
                                    label="SMTP Server"
                                    placeholder="SMTP Server"
                                    variant="outlined"
                                    required
                                    value={smtpServer}
                                    onChange={(e) => setSmtpServer(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Sender Email"
                                    placeholder="Sender Email"
                                    variant="outlined"
                                    type='email'
                                    required
                                    value={alertEmailForm}
                                    onChange={(e) => setAlertEmailForm(e.target.value)}

                                />
                            </Grid>
                            {/* <Grid item xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    placeholder="Password"
                                    variant="outlined"
                                    required
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </Grid> */}
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    placeholder="Password"
                                    variant="outlined"
                                    required
                                    type={!isAddButton ? "password" : showPassword ? "text" : "password"} // Toggle password visibility
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {!isAddButton ?
                                                    <IconButton edge="end">
                                                        <VisibilityOff />
                                                    </IconButton>
                                                    :
                                                    <IconButton onClick={handleTogglePassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                }
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Security Type</InputLabel>
                                    <Select
                                        defaultValue='Finished_Goods'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        placeholder='Security Type'
                                        value={securityType}
                                        label="Security Type"
                                        onChange={handleSecurityType}>
                                        <MenuItem value='TLS'>TLS</MenuItem>
                                        <MenuItem value='SSL'>SSL</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Port"
                                    placeholder="port"
                                    variant="outlined"
                                    required
                                    type='number'
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}

                                />
                            </Grid>
                        </Grid>
                        {/* )} */}

                        {/* {selectedValue === 'SetAlerts' && (
                            <Grid container spacing={2}>

                                <Grid item xs={6} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="machine-select-label">Alert Type</InputLabel>
                                        <Select
                                            labelId="machine-select-label"
                                            id="machine-select"
                                            label="Alert Type"
                                            value={alertType}
                                            required
                                            onChange={onAlertTypeChange}
                                        >
                                            {alertTypeList.map((data, index) => (
                                                <MenuItem key={index} value={data.id}>{data.departmentName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Alert Lead Days "
                                        placeholder="Alert Lead Days"
                                        variant="outlined"
                                        required
                                        value={alertLeadDays}
                                        onChange={(e) => setAlertLeadDays(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="machine-select-label">Users</InputLabel>
                                        <Select
                                            labelId="machine-select-label"
                                            id="machine-select"
                                            label="Users"
                                            value={users}
                                            required
                                            onChange={onUsersChange}
                                        >
                                            {usersList.map((data, index) => (
                                                <MenuItem key={index} value={data.id}>{data.departmentName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        )} */}

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

export default EmailConfigModel;
