
// import React, { useEffect, useState } from 'react';
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Grid,
//     TextField,
//     Radio,
//     FormControlLabel,
//     RadioGroup,
//     FormControl,
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     InputLabel,
//     Select,
//     MenuItem,
//     OutlinedInput,
//     Checkbox
// } from '@mui/material';
// import { EmailAlertAdd, EmailAlertAddEdit, SettingAlertAdd, SettingAlertAddEdit } from '../../services/LoginPageService';

// const ProtocolConfigModel = ({ open, setOpen, isAddButton, editProtocolConfigSetup, setNotification, setRefreshData }) => {
//     console.log('editProtocolConfigSetup', editProtocolConfigSetup);
//     const [smtpServer, setSmtpServer] = useState('');
//     const [alertEmailForm, setAlertEmailForm] = useState('');
//     const [password, setPassword] = useState('');
//     const [port, setPort] = useState('');
//     const [securityType, setSecurityType] = useState('');
//     const [alertMessage, setAlertMessage] = useState('');
//     const [id, setId] = useState('');
//     const [alertType, setAlertType] = useState('');
//     const [subject, setSubject] = useState('');
//     const [users, setUsers] = useState('');
//     const [usersendTo, setUserSendTo] = useState([]); // Ensure it's an array
//     const [consumableTypeList, setConsumableTypeList] = useState([]);
//     const [selectedValue, setSelectedValue] = useState('AlertParameters'); // Initialize with default value
//     const [enableJSON, setEnableJSON] = useState(false);
//     const [enableMQTT, setEnableMQTT] = useState(false);
//     const [jsonUrl, setJsonUrl] = useState("");
//     const [mqttConfig, setMqttConfig] = useState({
//         host: "",
//         port: "",
//         username: "",
//         password: "",
//         topic: "",
//     });


//     useEffect(() => {
//         // loadCategory();
//         loadData();
//     }, [editProtocolConfigSetup]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (isAddButton) {
//             SettingAlertAdd({
//                host: data.host,
//                             port: data.port,
//                             username: data.username || '',
//                             password: data.password || '',
//                             topic: data.topic,
//             }, handleSuccess1, handleException02);
//         } else {
//             SettingAlertAddEdit(
//                 {
//                     id,
//                      host: data.host,
//                             port: data.port,
//                             username: data.username || '',
//                             password: data.password || '',
//                             topic: data.topic,
//                 },
//                 handleSuccess1, handleException02);

//         }
//     };

//     const handleSuccess1 = (dataObject) => {
//         setNotification({
//             status: true,
//             type: 'success',
//             message: dataObject.message,
//         });
//         setRefreshData((oldvalue) => !oldvalue);
//         setTimeout(() => {
//             handleClose();
//             setOpen(false);
//             // setErrorObject({});
//         }, 1000);
//     };
//     const handleException02 = (errorObject, errorMessage) => {
//         setNotification({
//             status: true,
//             type: 'error',
//             message: errorMessage,
//         });
//     };
//     const loadData = () => {
//         setId(editProtocolConfigSetup?.id || '');
//         setAlertType(editProtocolConfigSetup.alert_type || '')
//         setSubject(editProtocolConfigSetup.alert_subject || '')
//         setUserSendTo(editProtocolConfigSetup.send_to || '')

//     };
//     const handleClose = () => {
//         setNotification({
//             status: false,
//             type: '',
//             message: '',
//         });
//     };



//     return (
//         <div>
//             <Dialog sx={{ '& .MuiDialog-paper': { width: '32%', maxHeight: '100%' } }}
//                 maxWidth="md"
//                 open={open}>
//                 <form onSubmit={handleSubmit}>
//                     <DialogTitle style={{ color: '#000000', fontWeight: 'bold' }}>
//                         {isAddButton ? 'Add ' : 'Update '}Protocol Config
//                     </DialogTitle>
//                     <DialogContent>

//                         <Grid container spacing={2} paddingTop={2}>

//                             {/* Enable switches */}
//                             <Grid item xs={12}>
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={enableJSON}
//                                             onChange={(e) => setEnableJSON(e.target.checked)}
//                                         />
//                                     }
//                                     label="Enable JSON"
//                                 />

//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             checked={enableMQTT}
//                                             onChange={(e) => setEnableMQTT(e.target.checked)}
//                                         />
//                                     }
//                                     label="Enable MQTT"
//                                 />
//                             </Grid>

//                             {/* JSON Config */}
//                             {enableJSON && (
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         fullWidth
//                                         label="JSON URL"
//                                         placeholder="https://example.com/api"
//                                         value={jsonUrl}
//                                         onChange={(e) => setJsonUrl(e.target.value)}
//                                     />
//                                 </Grid>
//                             )}

//                             {/* MQTT Config */}
//                             {enableMQTT && (
//                                 <>
//                                     <Grid item xs={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="MQTT Host"
//                                             value={mqttConfig.host}
//                                             onChange={(e) =>
//                                                 setMqttConfig({ ...mqttConfig, host: e.target.value })
//                                             }
//                                         />
//                                     </Grid>

//                                     <Grid item xs={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="Port"
//                                             value={mqttConfig.port}
//                                             onChange={(e) =>
//                                                 setMqttConfig({ ...mqttConfig, port: e.target.value })
//                                             }
//                                         />
//                                     </Grid>

//                                     <Grid item xs={6}>
//                                         <TextField
//                                             fullWidth
//                                             label="Username"
//                                             value={mqttConfig.username}
//                                             onChange={(e) =>
//                                                 setMqttConfig({ ...mqttConfig, username: e.target.value })
//                                             }
//                                         />
//                                     </Grid>

//                                     <Grid item xs={6}>
//                                         <TextField
//                                             fullWidth
//                                             type="password"
//                                             label="Password"
//                                             value={mqttConfig.password}
//                                             onChange={(e) =>
//                                                 setMqttConfig({ ...mqttConfig, password: e.target.value })
//                                             }
//                                         />
//                                     </Grid>

//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             label="Topic"
//                                             value={mqttConfig.topic}
//                                             onChange={(e) =>
//                                                 setMqttConfig({ ...mqttConfig, topic: e.target.value })
//                                             }
//                                         />
//                                     </Grid>
//                                 </>
//                             )}
//                         </Grid>



//                     </DialogContent>
//                     <DialogActions style={{ justifyContent: 'flex-end' }}>
//                         <Button onClick={() => {
//                             setOpen(false);

//                         }}>
//                             Cancel
//                         </Button>
//                         <Button type="submit">
//                             {isAddButton ? "Add" : "Update"}
//                         </Button>
//                     </DialogActions>
//                 </form>
//             </Dialog>
//         </div>
//     );
// };

// export default ProtocolConfigModel;
import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography
} from "@mui/material";
import {
    MqttSettingsAdd,
    MqttSettingsUpdate,
    SettingAlertAdd,
    SettingAlertAddEdit
} from "../../services/LoginPageService";

const ProtocolConfigModel = ({
    open,
    setOpen,
    isAddButton,
    editProtocolConfigSetup,
    setNotification,
    setRefreshData
}) => {

    const [id, setId] = useState("");

    const [enableJSON, setEnableJSON] = useState(false);
    const [enableMQTT, setEnableMQTT] = useState(false);

    const [jsonUrl, setJsonUrl] = useState("");

    const [mqttConfig, setMqttConfig] = useState({
        host: "",
        port: "",
        username: "",
        password: "",
        topic: ""
    });

    /* ---------------- LOAD EDIT DATA ---------------- */
    useEffect(() => {
        if (!isAddButton && editProtocolConfigSetup) {
            setId(editProtocolConfigSetup.id || "");

            // setEnableJSON(editProtocolConfigSetup.enableJSON || false);
            // setEnableMQTT(editProtocolConfigSetup.enableMQTT || false);

            // setJsonUrl(editProtocolConfigSetup.jsonUrl || "");

            setMqttConfig({
                host: editProtocolConfigSetup.host || "",
                port: editProtocolConfigSetup.port || "",
                username: editProtocolConfigSetup.username || "",
                password: editProtocolConfigSetup.password || "",
                topic: editProtocolConfigSetup.topic || ""
            });
        }
    }, [editProtocolConfigSetup, isAddButton]);

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            // enableJSON,
            // jsonUrl,
            // enableMQTT,
            host: mqttConfig.host,
            port: mqttConfig.port,
            username: mqttConfig.username,
            password: mqttConfig.password,
            topic: mqttConfig.topic
        };

        if (isAddButton) {
            MqttSettingsAdd(payload, handleSuccess, handleError);
        } else {
            MqttSettingsUpdate(
                { id, ...payload },
                handleSuccess,
                handleError
            );
        }
    };

    /* ---------------- HANDLERS ---------------- */
    const handleSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: "success",
            message: dataObject.message
        });

        setRefreshData((prev) => !prev);

        setTimeout(() => {
            resetForm();       // 👈 CLEAR FORM
            setOpen(false);
        }, 800);
    };


    const handleError = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: "error",
            message: errorMessage
        });
    };

    const resetForm = () => {
        setId("");

        setEnableJSON(false);
        setEnableMQTT(false);

        setJsonUrl("");

        setMqttConfig({
            host: "",
            port: "",
            username: "",
            password: "",
            topic: ""
        });
    };

    useEffect(() => {
        if (isAddButton) {
            resetForm();   // 👈 when Add button clicked
        }
    }, [isAddButton]);

    /* ---------------- UI ---------------- */
    return (
        <Dialog
            sx={{ "& .MuiDialog-paper": { width: "40%" } }}
            maxWidth="md"
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    <Typography fontWeight="bold">
                        {isAddButton ? "Add" : "Update"} Protocol Config
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={2}>

                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={enableJSON}
                                        onChange={(e) => setEnableJSON(e.target.checked)}
                                    />
                                }
                                label="Enable JSON"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={enableMQTT}
                                        onChange={(e) => setEnableMQTT(e.target.checked)}
                                    />
                                }
                                label="Enable MQTT"
                            />
                        </Grid>

                        {enableJSON && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="JSON URL"
                                    placeholder="https://example.com/api"
                                    value={jsonUrl}
                                    onChange={(e) => setJsonUrl(e.target.value)}
                                />
                            </Grid>
                        )} */}


                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="MQTT Host"
                                value={mqttConfig.host}
                                onChange={(e) =>
                                    setMqttConfig({ ...mqttConfig, host: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Port"
                                value={mqttConfig.port}
                                onChange={(e) =>
                                    setMqttConfig({ ...mqttConfig, port: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={mqttConfig.username}
                                onChange={(e) =>
                                    setMqttConfig({
                                        ...mqttConfig,
                                        username: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                value={mqttConfig.password}
                                onChange={(e) =>
                                    setMqttConfig({
                                        ...mqttConfig,
                                        password: e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Topic"
                                value={mqttConfig.topic}
                                onChange={(e) =>
                                    setMqttConfig({
                                        ...mqttConfig,
                                        topic: e.target.value
                                    })
                                }
                            />
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            resetForm();   // 👈 CLEAR FORM
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        {isAddButton ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProtocolConfigModel;
