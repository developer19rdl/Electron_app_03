import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { DeviceManageAdd, DeviceManageEdit, ProjectSensorManage, ProjectShowService, SensorManageAdd, SensorManageEdit, SensorMasterCategory, unitsMasterCategory } from '../../../../services/LoginPageService';

const ManageSensorDeviceModel = ({ open, setOpen, isAddButton, setRefreshData, editsensordevice, }) => {

    // console.log("00000000",)
    const [id, setId] = useState('');
    const [statusType, setStatusType] = useState('');
    const [simulatorType, setSimulatorType] = useState('');
    const [device, setDevice] = useState('');
    const [sensorName, setSensorName] = useState('');
    const [sensorCategory, setSensorCategory] = useState('');
    const [upperLimit, setUpperLimit] = useState('');
    const [lowerLimit, setLowerLimit] = useState('');
    const [lowerAlert, setLowerAlert] = useState('');
    const [upperAlert, setUpperAlert] = useState('');
    const [upperWarning, setUpperWarning] = useState('');
    const [lowerWarning, setLowerWarning] = useState('');
    const [register, setRegister] = useState('');
    const [slaveId, setSlaveId] = useState('');
    const [dataRangeFrom, setDataRangeFrom] = useState('');
    const [datarangeTo, setDataRangeTo] = useState('');
    const [constant, setConstant] = useState('');
    const [random, setRandom] = useState('');
    const [unitsList, setUnitsList] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [sensorList, setSensorList] = useState([]);
    const [units, setUnits] = useState('');
    const [selectedOption, setSelectedOption] = useState('Standalone');
    const [showDeviceSecret, setShowDeviceSecret] = useState(false);
    const [showDataEnable, setShowDataEnable] = useState(false);
    const [showDataAlert, setShowDataAlert] = useState(false);
    const [showRange, setShowRange] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ProjectList, setProjectList] = useState([]);
    const [Project, setProject] = useState('');
    const [linearDirection, setLinearDirection] = useState(false); // For radio button selection
    const [digitalList, setDigitalList] = useState(false); // For radio button selection
    const [length, setLength] = useState(''); // Store the number entered
    const [inputValues, setInputValues] = useState([]); // Store the values of each dynamically generated field
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        setShowDeviceSecret(false); // Reset secret field visibility when switching options
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAddButton) {
            SensorManageAdd(
                {
                    project_id: Project,
                    motorId: device,
                    sensorCategory: sensorCategory,
                    sensorName: sensorName,
                    sensorType: statusType,
                    DataRangeFrom: dataRangeFrom,
                    DataRangeTo: datarangeTo,
                    Units: units,
                    DataWarningLevel: showDataEnable,
                    DwUpperLevMsg: upperWarning,
                    DwLowerLevMsg: lowerWarning,
                    CriticalAlertLevel: showDataAlert,
                    CaUpperLevMsg: upperAlert,
                    CaLowerLevMsg: lowerAlert,
                    OutOfRange: showRange,
                    OrUpperLevMsg: upperLimit,
                    OrLowerLevMsg: lowerLimit,
                    SimulationType: simulatorType,
                    constantField: constant,
                    // randomField: random,
                    status: linearDirection,
                    digitalSelection: statusType === "Digital" ? digitalList : null,
                    slaveId: slaveId,
                    register: register,
                    length: length,

                },
                deviceManageSuccess,
                deviceManageException
            );
        } else {
            SensorManageEdit(

                {

                    id,
                    project_id: Project,
                    motorId: device,
                    sensorCategory: sensorCategory,
                    sensorName: sensorName,
                    sensorType: statusType,
                    DataRangeFrom: dataRangeFrom,
                    DataRangeTo: datarangeTo,
                    Units: units,
                    DataWarningLevel: showDataEnable,
                    DwUpperLevMsg: upperWarning,
                    DwLowerLevMsg: lowerWarning,
                    CriticalAlertLevel: showDataAlert,
                    CaUpperLevMsg: upperAlert,
                    CaLowerLevMsg: lowerAlert,
                    OutOfRange: showRange,
                    OrUpperLevMsg: upperLimit,
                    OrLowerLevMsg: lowerLimit,
                    SimulationType: simulatorType,
                    constantField: constant,
                    // randomField: random,
                    status: linearDirection,
                    digitalSelection: statusType === "Digital" ? digitalList : null,
                    slaveId: slaveId,
                    register: register,
                    length: length,
                },

                deviceManageSuccess,
                deviceManageException
            );
        }

    };

    const deviceManageSuccess = (dataObject) => {
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });
        setOpen(false);
        setTimeout(() => {
            resetForm();
            handleClose();
            // setProgressStatus(1);
        }, 3000);
        setRefreshData((oldvalue) => !oldvalue);
    };

    const deviceManageException = (errorObject, errorMessage) => {
        setNotification({
            status: true,
            type: 'error',
            message: errorMessage,
        });
        setTimeout(() => {
            handleClose();
        }, 3000);
    };
    useEffect(() => {
        ProjectShowService(handleProjectSuccess, handleProjectException);
        SensorMasterCategory(handleSensorCategorySuccess, handleSensorCategoryException)
        unitsMasterCategory(handleUnitSuccess, handleUnitException);
        setOpen(open);
        if (editsensordevice) {
            loadData(); // Load data only when `editsensordevice` is provided
        }        // setSelectedDevice(projectId);
    }, [editsensordevice,]);
    const handleUnitSuccess = (dataObject) => {
        // setGridLoading(false);
        setUnitsList(dataObject);
    };

    const handleUnitException = (errorObject) => {
    };
    const handleProjectSuccess = (dataObject) => {
        // setGridLoading(false);
        setProjectList(dataObject);
    };

    const handleProjectException = (errorObject) => {
    };

    const handleSensorCategorySuccess = (dataObject) => {
        // setGridLoading(false);
        setSensorList(dataObject || []);
    };

    const handleSensorCategoryException = (errorObject, errorMessage) => {
    };

    const getSensorDeviceName = (e) => {
        ProjectSensorManage({
            project_id: e.target.value
        }, handleFetchsensorSuccess, handleFetchSensorException);
    };
    const handleFetchsensorSuccess = (dataObject) => {
        setDeviceList(dataObject.data || [])
    };
    const handleFetchSensorException = (errorObject, errorMessage) => {

    };
    const loadData = () => {
        setId(editsensordevice.id || '');
        setStatusType(editsensordevice.sensorType || '')
        setSimulatorType(editsensordevice.SimulationType || '')
        setDevice(editsensordevice.motorId || '')
        setSensorName(editsensordevice.sensorName || '')
        setSensorCategory(editsensordevice.sensorCategoryId || '')
        setUpperLimit(editsensordevice.OrUpperLevMsg || '')
        setLowerLimit(editsensordevice.OrLowerLevMsg || '')
        setLowerAlert(editsensordevice.CaLowerLevMsg || '')
        setUpperAlert(editsensordevice.CaUpperLevMsg || '')
        setUpperWarning(editsensordevice.DwUpperLevMsg || '')
        setLowerWarning(editsensordevice.DwLowerLevMsg || '')
        setRegister(editsensordevice.register || '')
        setSlaveId(editsensordevice.slaveId || '')
        setDataRangeFrom(editsensordevice.DataRangeFrom || '')
        setDataRangeTo(editsensordevice.DataRangeTo || '')
        setConstant(editsensordevice.constantField || '')
        // setRandom(editsensordevice.randomField || '')
        setLinearDirection(editsensordevice.status || '')
        setLength(editsensordevice.length || '')
        setProject(editsensordevice.project_id || '')
        setUnits(editsensordevice.Units || '')
        setShowDataEnable(editsensordevice.DataWarningLevel || '')
        setShowDataAlert(editsensordevice.CriticalAlertLevel || '')
        setShowRange(editsensordevice.OutOfRange || '')
        setDigitalList(editsensordevice.digitalSelection || '')

        if (!isAddButton) {
            ProjectSensorManage({
                project_id: editsensordevice?.project_id
            }, handleFetchsensorSuccess, handleFetchSensorException);
        }
    };
    const clearFormData = () => {
        setId('');
        setStatusType('');
        setSimulatorType('');
        setDevice('');
        setSensorName('');
        setSensorCategory('');
        setUpperLimit('');
        setLowerLimit('');
        setLowerAlert('');
        setUpperAlert('');
        setUpperWarning('');
        setLowerWarning('');
        setRegister('');
        setSlaveId('');
        setDataRangeFrom('');
        setDataRangeTo('');
        setConstant('');
        // setRandom('');
        setLinearDirection('');
        setLength('');
        setProject('');
        setUnits('');
        setShowDataEnable('');
        setShowDataAlert('');
        setShowRange('');
        setDigitalList([]);
        setDeviceList([]);

    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };

    // Handle the change in the 'length' input field
    const handleLengthChange = (e) => {
        const value = e.target.value;

        setLength(value); // Set the length input value
        setInputValues(new Array(Number(value)).fill('')); // Create a new array to track the values for each dynamic field
    };

    // Handle changes in the dynamic text fields
    const handleFieldChange = (index, event) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = event.target.value;
        setInputValues(updatedValues);
    };

    return (
        <>
            <Dialog open={open} fullWidth={true} maxWidth="lg"
            >
                <form onSubmit={handleSubmit}>
                    <DialogContent style={{ height: '78vh' }}>
                        <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px' }}>
                            {isAddButton ? 'Add Sensor' : 'Edit Sensor'}
                        </DialogTitle>
                        {/* <Grid container spacing={0} sx={{ mt: 0, mb: 1 }}>


                        </Grid> */}
                        {/* {selectedOption === 'Standalone' && ( */}
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Project</InputLabel>
                                    <Select
                                        value={Project}
                                        label="Project"
                                        onChange={(e) => {
                                            setProject(e.target.value);
                                            getSensorDeviceName(e)
                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {ProjectList.map((data, index) => (
                                            <MenuItem value={data.id} key={index + 1}>
                                                {data.projectName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Device</InputLabel>
                                    <Select
                                        value={device}
                                        label="Project"
                                        onChange={(e) => {
                                            setDevice(e.target.value);

                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {deviceList.map((data, index) => (
                                            <MenuItem value={data.motorId} key={index + 1}  >
                                                {data.motorName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="medium">
                                    <InputLabel>Sensor Category</InputLabel>
                                    <Select
                                        value={sensorCategory}
                                        label="Sensor Category"
                                        onChange={(e) => {
                                            setSensorCategory(e.target.value);

                                        }}
                                    >
                                        <MenuItem value="" key={0}>
                                            <em style={{ fontWeight: 'bold' }}>All</em>
                                        </MenuItem>
                                        {sensorList.map((data, index) => (
                                            <MenuItem value={data.id} key={index + 1}  >
                                                {data.sensorCategory}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Sensor Name"
                                    value={sensorName}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setSensorName(e.target.value)
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Sensor Type"
                                    // margin="normal"
                                    autoComplete="off"
                                    select
                                    value={statusType}
                                    // disabled={!isAddButton}
                                    onChange={(e) => {
                                        setStatusType(e.target.value);
                                        setDataRangeFrom('');
                                        setDataRangeTo('');
                                        setDigitalList('');
                                        setUnits('')
                                        setSlaveId('');
                                        setRegister('');
                                        setLength('');
                                        setLinearDirection(false);
                                    }}
                                >
                                    {/* Replace with dynamic category options */}
                                    <MenuItem value="Analog">Analog</MenuItem>
                                    <MenuItem value="Digital">Digital</MenuItem>
                                    <MenuItem value="Modbus">Modbus</MenuItem>

                                </TextField>
                            </Grid>

                            {(statusType === 'Analog' || statusType === 'Digital') && (
                                <>
                                    {statusType === 'Digital' && (
                                        <Grid item xs={4} style={{ display: 'flex', }}>
                                            <RadioGroup
                                                row
                                                value={digitalList}
                                                onChange={(e) => {
                                                    setDigitalList(e.target.value);
                                                    setDataRangeFrom("");
                                                    setDataRangeTo("");
                                                }
                                                }
                                            >
                                                <FormControlLabel
                                                    value="HighTolow"
                                                    control={<Radio />}
                                                    label="High/Low"
                                                />
                                                <FormControlLabel
                                                    value="counter"
                                                    control={<Radio />}
                                                    label="Counter"
                                                />
                                            </RadioGroup>
                                        </Grid>
                                    )}
                                    {(statusType === 'Analog' || digitalList === 'counter') && (<>
                                        <Grid item xs={12}>
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                Data Range
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                label="Data Range From"
                                                value={dataRangeFrom}
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    setDataRangeFrom(e.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                label="Data Range To"
                                                value={datarangeTo}
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    setDataRangeTo(e.target.value)
                                                }}
                                            />
                                        </Grid>
                                    </>
                                    )}

                                    <Grid item xs={4}>
                                        <FormControl fullWidth size="medium">
                                            <InputLabel>Units</InputLabel>
                                            <Select
                                                value={units}
                                                label="Units"
                                                onChange={(e) => {
                                                    setUnits(e.target.value);

                                                }}
                                            >
                                                <MenuItem value="" key={0}>
                                                    <em style={{ fontWeight: 'bold' }}>All</em>
                                                </MenuItem>
                                                {unitsList.map((data, index) => (
                                                    <MenuItem value={data.id} key={index + 1}  >
                                                        {data.unitCategory}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* )} */}
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={showDataEnable}
                                                    // disabled={showDisable}
                                                    onChange={(e) => setShowDataEnable(e.target.checked)}
                                                />
                                            }
                                            label="Data Warning Level"
                                        />
                                    </Grid>
                                    {showDataEnable && (
                                        <>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Upper Warning Level"
                                                    value={upperWarning}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setUpperWarning(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Lower Warning Level"
                                                    value={lowerWarning}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setLowerWarning(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                    {/* <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Device ID"
                                    value={deviceId}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setDeviceId(e.target.value)
                                    }}
                                />
                            </Grid> */}
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={showDataAlert}
                                                    // disabled={showDisable}
                                                    onChange={(e) => setShowDataAlert(e.target.checked)}
                                                />
                                            }
                                            label=" Critical Alert Level"
                                        />
                                    </Grid>
                                    {showDataAlert && (
                                        <>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Upper Alert Level"
                                                    value={upperAlert}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setUpperAlert(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Lower Alert Level"
                                                    value={lowerAlert}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setLowerAlert(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={showRange}
                                                    // disabled={showDisable}
                                                    onChange={(e) => setShowRange(e.target.checked)}
                                                />
                                            }
                                            label=" Out of Range"
                                        />
                                    </Grid>
                                    {showRange && (
                                        <>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Upper Range Limit"
                                                    value={upperLimit}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setUpperLimit(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Lower Range Limit"
                                                    value={lowerLimit}
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setLowerLimit(e.target.value)
                                                    }}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Simulator Type"
                                            // margin="normal"
                                            autoComplete="off"
                                            select
                                            value={simulatorType}
                                            onChange={(e) => {
                                                setSimulatorType(e.target.value);
                                            }}
                                        >
                                            {/* Replace with dynamic category options */}
                                            <MenuItem value="Constant">Constant</MenuItem>
                                            <MenuItem value="Random">Random</MenuItem>
                                            <MenuItem value="Linear">Linear</MenuItem>

                                        </TextField>
                                    </Grid>
                                </>)}
                            {simulatorType === 'Constant' && (

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Constant"
                                        value={constant}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setConstant(e.target.value)
                                        }}
                                    />
                                </Grid>
                            )}
                            {/* {simulatorType === 'Random' && (

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Random"
                                        value={random}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setRandom(e.target.value)
                                        }}
                                    />
                                </Grid>
                            )} */}
                            {simulatorType === 'Linear' && (
                                <Grid item xs={3} style={{ display: 'flex' }}>
                                    <RadioGroup
                                        row
                                        value={linearDirection}
                                        onChange={(e) => setLinearDirection(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="lowToHigh"
                                            control={<Radio />}
                                            label="Low to High"
                                        />
                                        <FormControlLabel
                                            value="highToLow"
                                            control={<Radio />}
                                            label="High to Low"
                                        />
                                    </RadioGroup>
                                </Grid>
                            )}

                            {/* )} */}

                            {statusType === 'Modbus' && (
                                <>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Slave Id"
                                            value={slaveId}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                setSlaveId(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Register"
                                            value={register}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                setRegister(e.target.value)
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Length"
                                            value={length}
                                            autoComplete="off"
                                            onChange={handleLengthChange}
                                        />
                                    </Grid>
                                    {/* {simulatorType === 'Constant' && ( */}



                                    {/* Dynamically render text fields based on the length entered */}
                                    {Array.from({ length: Number(length) }).map((_, index) => (
                                        <Grid item xs={4} key={index}>
                                            <TextField
                                                fullWidth
                                                label={`Data ${index + 1}`}
                                                value={inputValues[index] || ''}
                                                autoComplete="off"
                                                onChange={(e) => handleFieldChange(index, e)}
                                            />
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Grid>

                    </DialogContent>
                    <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>
                        <Button type="submit" variant="contained" color="primary">
                            {isAddButton ? 'Add' : 'Update'}
                        </Button>
                        <Button
                            onClick={() => {
                                setOpen(false);
                                // loadData();
                                // clearFormData();

                            }}
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Dialog>
            <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </>
    )
}

export default ManageSensorDeviceModel