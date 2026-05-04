import { Backdrop, Box, Breadcrumbs, Tooltip as TooltipMUI, Button, FormControl, Card, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Paper, Select, Typography, Switch, InputLabel, OutlinedInput, ListItemText, TextField, InputAdornment } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import SensorList from './SensorList';
import { useUserAccess } from '../../../../context/UserAccessProvider';
import { DeviceUpdateService, GetChartData, GetChartThreeData, GetChartTwoData, GetDeviceAlertData, GetMachineDeviceHeaderData, SearchDevicesFetchService, ShowSelectDropDown } from '../../../../services/LoginPageService';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import DialogContentText from '@mui/material/DialogContentText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { WarningAmber } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
// import HeaderSettingModal from './HeaderSettingModal';
import { HeaderSettingModal } from './HeaderSettingModal';
import { IntervalModal } from './IntervalModal';
import { GraphSettingModal } from './GraphSettingModal';
import { IntervalModalTwo } from './IntervalModalTwo';
import { IntervalModalThree } from './IntervalModalThree';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DragGraph from './DragGraph';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DeviceWidget = React.memo(({ locationDetails }) => {
  const navigate = useNavigate();
  const [sensorLists, setSensorLists] = useState([])
  const [edeviceList, setEDeviceLists] = useState([])
  const [edevice, setEDevice] = useState('');
  const [secounddevice, setSecoundDevice] = useState('');
  const [thirddevice, setThirdDevice] = useState('');
  const [searchClick, setSearchClick] = useState(false)
  const [headerSettingOpen, setHeaderSettingOpen] = React.useState(false);
  const [graphSettingOpen, setGraphSettingOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [checked, setChecked] = useState({
    CreatedTime: false,
    Originator: false,
    Type: false,
    Severity: false,
    Details: false,
  });
  const [filterChecked, setFilterChecked] = useState({
    Any: false,
    Active: false,
    Cleared: false,
    Acknowledged: false,
    UnAcknowledged: false,
  });
  const names = [
    'Temp',
    'Alert',
    'Vibration'
  ];
  const [selectedEnergyCheckBox, setSelectedEnergyCheckBox] = React.useState([]);
  const [selectedVibrationCheckBox, setSelectedVibrationCheckBox] = React.useState([]);
  const [selectedTemperatureCheckBox, setSelectedTemperatureCheckBox] = React.useState([]);
  const [defaultCheckbox, setDefaultCheckBox] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState('');
  const [selectedGropdown, setSelectedDropdown] = useState('default')
  const [headerData, setHeaderData] = useState();
  const [intervalModal, setIntervalModal] = useState(false);
  const [intervalModalTwo, setIntervalModalTwo] = useState(false);
  const [intervalModalThree, setIntervalModalThree] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [headerRefreshData, setHeaderRefreshData] = useState(false);
  const [graphDisplayNames, setGraphDisplayNames] = useState('')
  const [chartSlaveIds, setChartSlaveIds] = useState('');

  //FIRST GRAPH FILTER STATE AND DATA
  const [chartData, setChartData] = useState([]);
  const [selectedLast, setSelectedLast] = useState('15days');
  const [selectedAggregation, setSelectedAggregation] = useState('min');
  const [selectedInterval, setSelectedInterval] = useState('1hr');
  const [chartOneTagId, setChartOneTagId] = useState([])
  const [chartTwoTagId, setChartTwoTagId] = useState([])
  const [chartThreeTagId, setChartThreeTagId] = useState([])

  //SECOND GRAPH FILTER STATE AND DATA
  const [chartTwoData, setChartTwoData] = useState([]);
  const [secondSelectedLast, setSecondSelectedLast] = useState('15days');
  const [secondSelectedAggregation, setSecondSelectedAggregation] = useState('min');
  const [secondSelectedInterval, setSecondSelectedInterval] = useState('1hr');

  //THIRD GRAPH FINTER AND DATA
  const [chartThreeData, setChartThreeData] = useState([]);
  const [thirdSelectedLast, setThirdSelectedLast] = useState('15days');
  const [thirdSelectedAggregation, setThirdSelectedAggregation] = useState('min');
  const [thirdSelectedInterval, setThirdSelectedInterval] = useState('1hr');

  //ALERT DATA
  const [alertSelectedDay, setAlertSelectedDay] = useState('30days')
  const [alertData, setAlertData] = useState([]);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteRemark, setDeleteRemark] = useState('');
  const [deleteValidation, setDeleteValidation] = useState("")
  const [backDropLoader, setBackDropLoader] = useState(false)
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const MenuProps = {
    PaperProps: {
      style: {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff', // Background color for the dropdown list
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [Dragopen, setDragOpen] = useState(false);
  const moduleAccess = useUserAccess()('dashboard');
  const [selectedRow, setSelectedRow] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [opendialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  // const handleClickDragOpen = () => {
  //   setDragOpen(true)
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDropdown('default')
    setEDevice('');
    setSecoundDevice('');
    setThirdDevice();
    setSelectedEnergyCheckBox([]);
    setSelectedTemperatureCheckBox([]);
    setSelectedVibrationCheckBox([])
  };
  const handleClickDragOpen = () => {
    // Navigate to the target route and pass locationDetails as state
    navigate('/DragGraph', { state: { locationDetails } });
  };
  const columns = [
    { field: 'deviceCategoryName', headerName: 'Device Category', flex: 1 },
    { field: 'deviceName', headerName: 'Device Name', flex: 1 },
    { field: 'assetName', headerName: 'Asset Name', flex: 1 },
    { field: 'totalTags', headerName: 'Total Tags', flex: 1 },
    // { field: 'age', headerName: 'Active Alerts', type: 'number', align: "center", headerAlign: 'center', flex: 1 },

    {
      field: 'deviceStatus',
      headerName: 'Status',
      flex: 1,
      align: "center",
      headerAlign: 'center',

    }
  ];

  const columns1 = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   minWidth: 60,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center'
    // },
    {
      field: 'Date',
      headerName: 'Date',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    // {
    //   field: 'machineId',
    //   headerName: 'Machine ID',
    //   minWidth: 60,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center'
    // },
    {
      field: 'deviceName',
      headerName: 'Device Name',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'tagName',
      headerName: 'Tag Name',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'value',
      headerName: 'Value',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'status',
      headerName: 'Alert Message',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   minWidth: 100,
    //   align: 'center',
    //   flex: 1,
    //   cellClassName: 'actions',
    //   getActions: (params) => [
    //     <DeleteData selectedRow={params.row} />,
    //   ],
    // },
  ];

  function DeleteData(props) {
    return (
      <DeleteIcon onClick={() => {
        setDeleteId(props.selectedRow.id);
        setDeleteDailogOpen(true);
      }}
      />
    )
  }

  const handleModeChange = (event, params) => {
    const newMode = event.target.value;

    DeviceUpdateService(
      {
        id: params.row.id, // Ensure you are passing the correct ID or identifier if needed
        mode: newMode
      },
      handleModeSuccess,
      handleModeException
    );
  };
  const handleModeSuccess = () => {
    SearchDevicesFetchService({
      locationId: locationDetails.locationId,
      branchId: locationDetails.branchId,
      facilityId: locationDetails.facilityId,
      buildingId: locationDetails.buildingId,
      floorId: locationDetails.floorId,
      zoneId: locationDetails.zoneId,
    }, handleDeviceSuccess, handleDeviceException);
  };

  // Exception handler for the API call
  const handleModeException = (error) => {
    // Handle exception logic here (e.g., showing an error message)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow('');
  };
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  // useEffect(() => {
  //   // setBackDropLoader(true)
  //  {opendialog==true} GetMachineDeviceHeaderData({ locationId: locationDetails.locationId }, handleHeaderSuccess, handleHeaderException)
  // }, [headerRefreshData])
  useEffect(() => {
    if (opendialog) {
      GetMachineDeviceHeaderData(
        { locationId: locationDetails.locationId },
        handleHeaderSuccess,
        handleHeaderException
      );
    }
    GetDeviceAlertData({ locationId: locationDetails.locationId, dateRange: alertSelectedDay }, handleGetAlertSuccess, handleGetAlertException)
  }, [opendialog, headerRefreshData]);


  const handleHeaderSuccess = (dataObject) => {
    setHeaderData(dataObject?.data[0] || [])
    setGraphDisplayNames(dataObject?.displayNames)
    setChartSlaveIds(dataObject?.slaveIds)

    // CHART ONE
    GetChartData({
      deviceId: dataObject?.slaveIds?.chart1SlaveId,
      locationId: locationDetails.locationId,
      selected: selectedGropdown,
      aggregation: "min",
      interval: "1hr",
      sortDataType: "15days",
      tagIds: [],
      chartNo: 1,
      // slaveId: dataObject?.slaveIds?.chart1SlaveId
    }, handleGetChartDataSuccess, handleGetChartDataException)

    // CHART TWO
    GetChartTwoData({
      deviceId: dataObject?.slaveIds?.chart2SlaveId,
      locationId: locationDetails.locationId,
      selected: selectedGropdown,
      aggregation: "min",
      interval: "1hr",
      sortDataType: "15days",
      tagIds: [],
      chartNo: 2,
      // slaveId: dataObject?.slaveIds?.chart2SlaveId
    }, handleGetChartTwoDataSuccess, handleGetChartTwoDataException)

    // // CHART TWO
    GetChartThreeData({
      deviceId: dataObject?.slaveIds?.chart3SlaveId,
      locationId: locationDetails.locationId,
      selected: selectedGropdown,
      aggregation: "min",
      interval: "1hr",
      sortDataType: "15days",
      tagIds: [],
      chartNo: 3,
      // slaveId: dataObject?.slaveIds?.chart3SlaveId
    }, handleGetChartThreeDataSuccess, handleGetChartThreeDataException)
  };
  const handleHeaderException = () => { }
  useEffect(() => {
    SearchDevicesFetchService({
      locationId: locationDetails.locationId,
      branchId: locationDetails.branchId,
      facilityId: locationDetails.facilityId,
      buildingId: locationDetails.buildingId,
      floorId: locationDetails.floorId,
      zoneId: locationDetails.zoneId,
      // deviceId: "1"
    }, handleDeviceSuccess, handleDeviceException);
  }, []);

  const handleDeviceSuccess = (dataObject) => {
    setDeviceList(dataObject?.data || []);
  };
  const handleDeviceException = () => {

  };

  const handleGetSensorSuccess = (dataObject) => {
    const tagNames = dataObject.data.map((item) => item.Tag_name);
    setSensorLists(tagNames);
    setSelectList(dataObject?.data)
  }
  const handleGetSensorException = () => { }

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundColor: isDarkMode ? '#1A2027' : '#ffffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




  ////1stDevice//
  const handleEnergyChangeSelect = (event) => {
    setBackDropLoader(true)
    setSelectedDropdown('selectAll')
    const {
      target: { value },
    } = event;

    setSelectedEnergyCheckBox(
      typeof value === 'string' ? value.split(',') : value,
    );

    // Splitting the value if it's a string, otherwise, using it directly
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    // Extracting IDs from the selected values
    const selectedIds = selectedValues.map(val => {
      const selectedTag = selectList.find(tag => tag.Tag_name === val);
      return selectedTag ? selectedTag.Id : null;
    }).filter(id => id !== null);
    setChartOneTagId(selectedIds)

    // GRAPH API
    GetChartData({
      deviceId: edevice,
      locationId: locationDetails.locationId,
      selected: "selectAll",
      aggregation: selectedAggregation,
      interval: selectedInterval,
      sortDataType: selectedLast,
      tagIds: selectedIds,
      chartNo: 1,
      // slaveId: chartSlaveIds?.chart1SlaveId
    }, handleGetChartDataSuccess, handleGetChartDataException)

  };
  const handleGetChartDataSuccess = (dataObject) => {
    setBackDropLoader(false)
    setChartData(dataObject || [])
  }
  const handleGetChartDataException = () => { }
  const generateRandomColor = (isDarkMode) => {
    // Random hue between 0 and 360
    const hue = Math.floor(Math.random() * 360);
    // If dark mode, generate light colors (high lightness), else generate dark colors (low lightness)
    const lightness = isDarkMode ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20;
    const saturation = 80; // Saturation can stay constant for vibrant colors
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const handleVibrationChangeSelect = (event) => {
    setBackDropLoader(true)
    const {
      target: { value },
    } = event;

    setSelectedVibrationCheckBox(
      typeof value === 'string' ? value.split(',') : value,
    );

    // Splitting the value if it's a string, otherwise, using it directly
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    // Extracting IDs from the selected values
    const selectedIds = selectedValues.map(val => {
      const selectedTag = selectList.find(tag => tag.Tag_name === val);
      return selectedTag ? selectedTag.Id : null;
    }).filter(id => id !== null);
    setChartTwoTagId(selectedIds)


    //   UpdateSensorDropdown({
    //       machineId: machineId,
    //       field: "default",
    //       tagId: '',
    //       selected: typeof value === 'string' ? value.split(',') : value,
    //       tagId: selectedIds
    //   }, handleDefaultUpdateSuccess, handleDefaultUpdateException)

    // CHART TWO
    GetChartTwoData({
      deviceId: secounddevice,
      locationId: locationDetails.locationId,
      selected: "selectAll",
      aggregation: selectedAggregation,
      interval: selectedInterval,
      sortDataType: selectedLast,
      tagIds: selectedIds,
      chartNo: 1,
      // slaveId: chartSlaveIds?.chart1SlaveId
    }, handleGetChartTwoDataSuccess, handleGetChartTwoDataException)

  };
  const handleGetChartTwoDataSuccess = (dataObject) => {
    setBackDropLoader(false)
    setChartTwoData(dataObject || [])
  }
  const handleGetChartTwoDataException = () => { }
  const handleTemperatureChangeSelect = (event) => {
    setBackDropLoader(true)
    const {
      target: { value },
    } = event;

    setSelectedTemperatureCheckBox(
      typeof value === 'string' ? value.split(',') : value,
    );

    // Splitting the value if it's a string, otherwise, using it directly
    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    // Extracting IDs from the selected values
    const selectedIds = selectedValues.map(val => {
      const selectedTag = selectList.find(tag => tag.Tag_name === val);
      return selectedTag ? selectedTag.Id : null;
    }).filter(id => id !== null);
    setChartThreeTagId(selectedIds)

    //   UpdateSensorDropdown({
    //       machineId: machineId,
    //       field: "default",
    //       tagId: '',
    //       selected: typeof value === 'string' ? value.split(',') : value,
    //       tagId: selectedIds
    //   }, handleDefaultUpdateSuccess, handleDefaultUpdateException)

    GetChartThreeData({
      deviceId: thirddevice,
      locationId: locationDetails.locationId,
      selected: "selectAll",
      aggregation: selectedAggregation,
      interval: selectedInterval,
      sortDataType: selectedLast,
      tagIds: selectedIds,
      chartNo: 1,
      // slaveId: chartSlaveIds?.chart1SlaveId
    }, handleGetChartThreeDataSuccess, handleGetChartThreeDataException)

  };
  const handleGetChartThreeDataSuccess = (dataObject) => {
    setBackDropLoader(false)
    setChartThreeData(dataObject || [])
  }
  const handleGetChartThreeDataException = () => { }

  const handleGetAlertSuccess = (dataObject) => {
    setBackDropLoader(false)
    setAlertData(dataObject.data || [])
  }
  const handleGetAlertException = () => { }
  return (

    <Card className='h-[78vh] sm:h-[58vh]'
      sx={{
        boxShadow: 'none',
        borderRadius: '12px',
        // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',
        // padding: '2px'
      }}
    >
      <Paper elevation={3} className={'h-full'} style={{ boxShadow: 'none' }}>
        <CardHeader
          title={
            <Breadcrumbs aria-label="breadcrumb" separator="›" fontSize="20px" fontWeight="800" marginLeft="10px">
              <h3 className="font-[Roboto, sans-serif] font-semibold tracking-[1px] text-black text-[21px]">
                Device List
              </h3>
            </Breadcrumbs>

          }
          action={
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <TooltipMUI title="Health Dashboard" arrow placement="top">
                {/* <IconButton onClick={handleClickOpen}>
                  <DeviceHubIcon sx={{ color: 'black' }} />
                </IconButton> */}
              </TooltipMUI>

              <TooltipMUI title="Dashboard" arrow placement="top">
                <IconButton onClick={handleClickDragOpen} style={{ marginRight: 2 }}>
                  <DashboardIcon sx={{ color: 'black' }} />
                </IconButton>
              </TooltipMUI>
            </div>
          }
          sx={{ p: 1 }}
        />
        <CardContent className={'h-[58vh] sm:h-[53vh]'}
          style={{
            fontFamily: 'customfont',
            marginTop: '-16px'

          }}>
          <Box sx={{ height: '52vh' }}>

            <DataGrid
              columns={columns}
              rows={deviceList}
              rowHeight={38}
              pageSize={6}
              rowsPerPageOptions={[6]}
              // checkboxSelection
              disableSelectionOnClick
              // style={{ maxHeight: `${90}%`, }}
              onRowClick={handleRowClick}
              getRowClassName={(params) =>
                params.row.deviceStatus === 'enabled' ? 'enabled' : 'disabled'
              }
              sx={{
                border: 'none',
                '& .MuiDataGrid-footerContainer': {
                  borderTop: 'none', // Removes the top border of the footer (pagination area)
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none', // Removes the bottom border between cells
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "white", // Default color is white for rows without a mode
                },
                // Apply colors based on sensorStatus
                '& .enabled': {
                  backgroundColor: "#d4edda", // Light green for enabled rows
                  '&:hover': {
                    backgroundColor: "#d4edda", // Keep same color on hover for enabled rows
                  },
                },
                '& .disabled': {
                  backgroundColor: "#ecacac", // Light green for enabled rows
                  '&:hover': {
                    backgroundColor: "#ecacac", // Keep same color on hover for enabled rows
                  },
                },
                cursor: 'pointer'
              }}
              componentsProps={{
                base: {
                  style: {

                    maxHeight: 'calc(100% - 60px)',
                    overflowY: 'auto',
                  },
                },
              }}
            />
            <Dialog open={opendialog} maxWidth="xl" onClose={handleCloseDialog}
              fullScreen
            // Makes it occupy full available width
            // sx={{ "& .MuiDialog-paper": { Height: "100%", Width: "100%" } }}
            >
              {/* <DialogTitle>Device Details</DialogTitle> */}
              {/* <DialogContent> */}
              <Box sx={{ width: '100%', padding: 2, backgroundColor: isDarkMode ? '#404040' : '#f0f0f0', overflow: 'auto', height: '100vh' }}>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                  open={backDropLoader}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} lg={2} md={6}>
                    <Item style={{ height: '80px'/*, display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column'*/ }}>
                      {/* <AccountBalanceIcon /> */}
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
                        <div style={{}}>
                          {/* <img
                            // src={machineImage}
                            alt="Image Description"
                            className='imageStyle'
                            style={{
                              height: '30px',
                              filter: isDarkMode ? 'invert(1)' : 'none'
                            }}
                          /> */}
                          <Typography style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.locationName.toUpperCase()}</Typography>
                        </div>
                        <div style={{}}>
                          <SettingsIcon sx={{ fontSize: 25, color: isDarkMode ? '#ffffff' : '#000000' }} onClick={() => setHeaderSettingOpen(true)} />
                        </div>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={3} md={6}>
                    <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '80px' }}>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter1_labelname.toUpperCase()}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter1Value}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter1_setname.toUpperCase()}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter1_setvalue}</Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={3} md={6}>
                    <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '80px' }}>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter2_labelname.toUpperCase()}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter2Value}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter2_setname.toUpperCase()}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter2_setvalue}</Typography>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={2} md={6}>
                    <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '80px' }}>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter3_labelname.toUpperCase()}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.Parameter3Value}</Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} > */}
                      {/* <Grid item>
                                <Typography variant="h7" style={{ fontSize: '12px' }}>SET MEMORY USAGE</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>55%</Typography>
                            </Grid> */}
                      {/* <Grid item>
                                <FlashOnIcon sx={{ fontSize: 40 }} />
                            </Grid>
                        </Grid> */}
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={2} md={12}>
                    <Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '80px' }}>
                      <Grid container display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Grid item>
                          <Typography variant="h7" style={{ fontSize: '12px', color: isDarkMode ? '#ffffff' : '#000000' }}>ALERTS</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{headerData?.alertCount}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        {/* <Grid item>
                                <Typography variant="h7" style={{ fontSize: '12px' }}>SET MEMORY USAGE</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>55%</Typography>
                            </Grid> */}
                        <Grid item>
                          <NotificationsIcon sx={{ fontSize: 40, color: isDarkMode ? '#ffffff' : '#000000' }} />
                        </Grid>
                      </Grid>

                      <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <FormControlLabel
                            control={<MaterialUISwitch
                              sx={{ m: 1 }}
                              checked={isDarkMode}
                              onChange={(e) => setIsDarkMode(e.target.checked)}
                            />}
                          // label="MUI switch"
                          /> */}
                      </FormGroup>
                    </Item>
                  </Grid>

                  {/* ============================================================================================================================================== */}
                  {/* BOTTOM GRAPH CARD */}
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <Item>
                      <Grid container display={'flex'} justifyContent={'space-between'}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ fontSize: '18px', marginLeft: '3px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{selectedEnergyCheckBox.length > 0 ? "CUSTOM" : graphDisplayNames?.displayName1}</Typography>
                        </Grid>

                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel
                              id="device-select-label"
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                            >
                              Device
                            </InputLabel>
                            <Select
                              labelId="device-select-label"
                              id="device-select"
                              value={edevice}
                              onChange={(e) => {
                                setEDevice(e.target.value);
                                ShowSelectDropDown({ locationId: locationDetails.locationId, field: "selectAll", deviceId: e.target.value }, handleGetSensorSuccess, handleGetSensorException)

                              }} input={<OutlinedInput label="Select" />}
                              size="small"
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{
                                color: isDarkMode ? '#ffffff' : '#000000',
                                fontWeight: 'bold',
                                backgroundColor: isDarkMode ? '#454545' : '#ffffff'
                              }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                              {deviceList.map((data) => (
                                <MenuItem
                                  value={data.id}
                                  key={data.id}
                                  style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                                >
                                  {data.deviceName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-checkbox-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Select</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={selectedEnergyCheckBox}
                              onChange={handleEnergyChangeSelect}
                              input={<OutlinedInput label="Select" />}
                              renderValue={(selected) => selected.join(', ')}
                              size='small'
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            // MenuProps={MenuProps}
                            >
                              {sensorLists.map((name) => (
                                <MenuItem key={name} value={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                  <Checkbox checked={selectedEnergyCheckBox.indexOf(name) > -1} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                  <ListItemText primary={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <SettingsIcon
                            sx={{ fontSize: 25, marginLeft: '80px', color: isDarkMode ? '#ffffff' : '#000000' }}
                            onClick={() => {
                              setGraphSettingOpen(true);
                              setSelectedGraph("First");
                            }}
                          />
                        </Grid>

                      </Grid>
                      <Grid container display={'flex'} justifyContent={'space-between'} style={{ marginBottom: '10px' }}>
                        <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                          <AccessTimeIcon style={{ color: isDarkMode ? '#ffffff' : '#000000' }} /><Typography style={{ fontSize: '13px', cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} onClick={() => setIntervalModal(true)}>Real Time- Last {selectedLast}</Typography>
                        </Grid>
                      </Grid>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData?.data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="dateTime" tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          <YAxis type='number' domain={[0, chartData.maxValue]} tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          <Tooltip />
                          <Legend />
                          <Brush dataKey="dateTime" height={30} stroke="#602BF8" />
                          {chartData?.lines && chartData?.lines.map((item, index) => (
                            <Line strokeWidth={3} dot={false} key={index} type="monotone" dataKey={item.lineName} stroke={generateRandomColor(isDarkMode)} />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </Item>
                  </Grid>

                  {/* VIBRATION */}
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <Item>
                      <Grid container display={'flex'} justifyContent={'space-between'}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ fontSize: '18px', marginLeft: '3px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{selectedVibrationCheckBox.length > 0 ? "CUSTOM" : graphDisplayNames?.displayName2}</Typography>
                        </Grid>

                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel
                              id="device-select-label"
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                            >
                              Device
                            </InputLabel>
                            <Select
                              labelId="device-select-label"
                              id="device-select"
                              value={secounddevice}
                              onChange={(e) => {
                                setSecoundDevice(e.target.value);
                                ShowSelectDropDown({ locationId: locationDetails.locationId, field: "selectAll", deviceId: e.target.value }, handleGetSensorSuccess, handleGetSensorException)

                              }} input={<OutlinedInput label="Select" />}
                              size="small"
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{
                                color: isDarkMode ? '#ffffff' : '#000000',
                                fontWeight: 'bold',
                                backgroundColor: isDarkMode ? '#454545' : '#ffffff'
                              }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                              {deviceList.map((data) => (
                                <MenuItem
                                  value={data.id}
                                  key={data.id}
                                  style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                                >
                                  {data.deviceName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-checkbox-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Select</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={selectedVibrationCheckBox}
                              onChange={handleVibrationChangeSelect}
                              input={<OutlinedInput label="Select" />}
                              renderValue={(selected) => selected.join(', ')}
                              size='small'
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            // MenuProps={MenuProps}
                            >
                              {sensorLists.map((name) => (
                                <MenuItem key={name} value={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                  <Checkbox checked={selectedVibrationCheckBox.indexOf(name) > -1} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                  <ListItemText primary={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <SettingsIcon
                            sx={{ fontSize: 25, marginLeft: '80px', color: isDarkMode ? '#ffffff' : '#000000' }}
                            onClick={() => {
                              setGraphSettingOpen(true);
                              setSelectedGraph("Second");
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container display={'flex'} justifyContent={'space-between'} style={{ marginBottom: '10px' }}>
                        <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                          <AccessTimeIcon style={{ color: isDarkMode ? '#ffffff' : '#000000' }} /><Typography style={{ fontSize: '13px', cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} onClick={() => setIntervalModalTwo(true)}>Real Time- Last {secondSelectedLast}</Typography>
                        </Grid>
                      </Grid>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartTwoData?.data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="dateTime" tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          <YAxis type='number' domain={[0, chartTwoData.maxValue]} tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          <Tooltip />
                          <Legend />
                          <Brush dataKey="dateTime" height={30} stroke="#602BF8" />
                          {chartTwoData?.lines && chartTwoData?.lines.map((item, index) => (
                            <Line strokeWidth={3} dot={false} key={index} type="monotone" dataKey={item.lineName} stroke={generateRandomColor(isDarkMode)} />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </Item>
                  </Grid>

                  {/* TEMPERATURE */}
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <Item>
                      <Grid container display={'flex'} justifyContent={'space-between'}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ fontSize: '18px', marginLeft: '3px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>{selectedTemperatureCheckBox.length > 0 ? "CUSTOM" : graphDisplayNames?.displayName3}</Typography>
                        </Grid>

                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel
                              id="device-select-label"
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                            >
                              Device
                            </InputLabel>
                            <Select
                              labelId="device-select-label"
                              id="device-select"
                              value={thirddevice}
                              onChange={(e) => {
                                setThirdDevice(e.target.value);
                                ShowSelectDropDown({ locationId: locationDetails.locationId, field: "selectAll", deviceId: e.target.value }, handleGetSensorSuccess, handleGetSensorException)

                              }} input={<OutlinedInput label="Select" />}
                              size="small"
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{
                                color: isDarkMode ? '#ffffff' : '#000000',
                                fontWeight: 'bold',
                                backgroundColor: isDarkMode ? '#454545' : '#ffffff'
                              }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                              {deviceList.map((data) => (
                                <MenuItem
                                  value={data.id}
                                  key={data.id}
                                  style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}
                                >
                                  {data.deviceName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-checkbox-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Select</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={selectedTemperatureCheckBox}
                              onChange={handleTemperatureChangeSelect}
                              input={<OutlinedInput label="Select" />}
                              renderValue={(selected) => selected.join(', ')}
                              size='small'
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                },
                                '& .MuiSelect-icon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                },
                              }}
                              style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                              MenuProps={MenuProps} // Apply custom styles to the dropdown list
                            >
                              {sensorLists.map((name) => (
                                <MenuItem key={name} value={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>
                                  <Checkbox checked={selectedTemperatureCheckBox.indexOf(name) > -1} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                  <ListItemText primary={name} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <SettingsIcon
                            sx={{ fontSize: 25, marginLeft: '80px', color: isDarkMode ? '#ffffff' : '#000000' }}
                            onClick={() => {
                              setGraphSettingOpen(true);
                              setSelectedGraph("Third");
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container display={'flex'} justifyContent={'space-between'} style={{ marginBottom: '10px' }}>
                        <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                          <AccessTimeIcon style={{ color: isDarkMode ? '#ffffff' : '#000000' }} /><Typography style={{ fontSize: '13px', cursor: 'pointer', color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }} onClick={() => setIntervalModalThree(true)}>Real Time- Last {thirdSelectedLast}</Typography>
                        </Grid>
                      </Grid>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartThreeData?.data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="dateTime" tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          {/* <YAxis type='number' domain={[0, 100]} /> */}
                          <YAxis type='number' domain={[0, chartThreeData.maxValue]} tick={{ fill: isDarkMode ? '#ffffff' : '#000000' }} />
                          <Tooltip />
                          <Legend />
                          <Brush dataKey="dateTime" height={30} stroke="#602BF8" />
                          {chartThreeData?.lines && chartThreeData?.lines.map((item, index) => (
                            <Line strokeWidth={3} dot={false} key={index} type="monotone" dataKey={item.lineName} stroke={generateRandomColor(isDarkMode)} />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </Item>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6} md={6}>
                    <Item style={{ height: '356px' }}>
                      <Grid container display={'flex'} justifyContent={'space-between'}>
                        <Grid item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '10px' }}>
                          <Typography style={{ fontSize: '18px', marginLeft: '3px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>Alert</Typography>
                        </Grid>
                        <Grid item sty={{ marginBottom: '10px', marginTop: '10px' }}>
                          <Box width={{ lg: "222px", md: '222px', xs: '178px', sm: '222px' }}>
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label" style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>--Show Entries--</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={alertSelectedDay}
                                label="--Energy Source--"
                                sx={{
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: isDarkMode ? '#ffffff' : '#000000', // Border color (optional)
                                  },
                                  '& .MuiSelect-icon': {
                                    color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow color
                                  },
                                }}
                                style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold', backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                                onChange={(e) => {
                                  setBackDropLoader(true)
                                  setAlertSelectedDay(e.target.value)
                                  GetDeviceAlertData({ locationId: locationDetails.locationId, dateRange: e.target.value }, handleGetAlertSuccess, handleGetAlertException)
                                }}
                                MenuProps={MenuProps} // Apply custom styles to the dropdown list
                              >
                                <MenuItem value={"30days"} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>30days</MenuItem>
                                <MenuItem value={"15days"} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>15days</MenuItem>
                                <MenuItem value={"1week"} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1week</MenuItem>
                                <MenuItem value={"1day"} style={{ color: isDarkMode ? '#ffffff' : '#000000', fontWeight: 'bold' }}>1day</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                        {/* <Grid item>
                                <SearchIcon onClick={handleSearchClick} />
                                <DensityMediumIcon onClick={handleClickOpen} />
                                <FilterAltIcon onClick={handleFilterOpen} />
                                <ImportExportIcon onClick={handleExportOpen} />
                            </Grid> */}
                      </Grid>
                      <Grid container display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                        {searchClick ?
                          <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          :
                          <>

                          </>
                        }
                        <Grid item>
                        </Grid>
                      </Grid>
                      <Grid container style={{ /*overflowY: 'scroll',*/ height: '244px' }}>
                        <Grid item width={'100%'} paddingTop={1}>

                          <div style={{ height: 290, width: '100%' }}>
                            <DataGrid
                              rows={alertData}
                              columns={columns1}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              disableSelectionOnClick
                              style={{ backgroundColor: isDarkMode ? '#454545' : '#ffffff' }}
                              sx={{
                                '& .MuiDataGrid-columnHeaders': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Header text color
                                  fontWeight: 'bold', // Header font weight
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                  fontWeight: 'bold', // Ensures the header font weight is bold
                                },
                                '& .MuiDataGrid-footerContainer': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Footer (pagination) text color
                                },
                                '& .MuiTablePagination-root': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Pagination text color
                                },
                                '& .MuiTablePagination-selectIcon': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Dropdown arrow icon color in pagination
                                },
                                '& .MuiSvgIcon-root': {
                                  color: isDarkMode ? '#ffffff' : '#000000', // Pagination left and right icon color
                                },
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                </Grid>

                {/* --------DAILOGBOX FOR DELETE REASON */}
                <Dialog
                  fullWidth
                  maxWidth="sm"
                  sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
                  open={deleteDailogOpen}
                >
                  <DialogTitle sx={{ textAlign: 'center' }}>
                    <WarningAmber color="warning" style={{ fontSize: 95 }} />
                  </DialogTitle>
                  <DialogContent sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{ m: 1 }}
                      variant="h5"
                      component="span"
                    >
                      Do you really want to clear this record?
                    </Typography>
                    <br />
                    This process cannot be undone.
                    <Grid container marginTop={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          fullWidth
                          required
                          id="outlined-multiline-static"
                          label="Reason for clear"
                          multiline
                          rows={4}
                          value={deleteRemark}
                          onChange={(e) => {
                            setDeleteRemark(e.target.value);
                            setDeleteValidation("");
                          }}
                        // defaultValue="Reason for delete"
                        />
                        <Typography style={{ color: 'red' }}>{deleteValidation}</Typography>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions sx={{ margin: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Button
                      // onClick={handleDeleteRemark}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteDailogOpen(false)
                          setDeleteValidation("")
                          setDeleteRemark("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
                {/* ----DAILOGBOX FOR 3line---- */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Columns to display"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked.CreatedTime}
                              // onChange={handleChange}
                              name="CreatedTime"
                              color="primary"
                            />
                          }
                          label="CreatedTime"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked.Originator}
                              // onChange={handleChange}
                              name="Originator"
                              color="primary"
                            />
                          }
                          label="Originator"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked.Type}
                              // onChange={handleChange}
                              name="Type"
                              color="primary"
                            />
                          }
                          label="Type"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked.Severity}
                              // onChange={handleChange}
                              name="Severity"
                              color="primary"
                            />
                          }
                          label="Severity"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked.Details}
                              // onChange={handleChange}
                              name="Details"
                              color="primary"
                            />
                          }
                          label="Details"
                        />
                      </FormControl>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                {/* ----DAILOGBOX FOR FILTER---- */}
                <Dialog
                  open={filterOpen}
                  // onClose={handleFilterClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Columns to filter"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterChecked.Any}
                              // onChange={handleFilterChange}
                              name="Any"
                              color="primary"
                            />
                          }
                          label="Any"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterChecked.Active}
                              // onChange={handleFilterChange}
                              name="Active"
                              color="primary"
                            />
                          }
                          label="Active"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterChecked.Cleared}
                              // onChange={handleFilterChange}
                              name="Cleared"
                              color="primary"
                            />
                          }
                          label="Cleared"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterChecked.Acknowledged}
                              // onChange={handleFilterChange}
                              name="Acknowledged"
                              color="primary"
                            />
                          }
                          label="Acknowledged"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterChecked.UnAcknowledged}
                              // onChange={handleFilterChange}
                              name="UnAcknowledged"
                              color="primary"
                            />
                          }
                          label="UnAcknowledged"
                        />
                      </FormControl>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
                {/* ----DAILOGBOX FOR EXPORT---- */}
                < HeaderSettingModal
                  headerSettingOpen={headerSettingOpen}
                  setHeaderSettingOpen={setHeaderSettingOpen}
                  machineId={edevice}
                  setRefreshData={setRefreshData}
                  setHeaderRefreshData={setHeaderRefreshData}
                  isDarkMode={isDarkMode}
                  locationDetails={locationDetails}

                />
                < GraphSettingModal
                  graphSettingOpen={graphSettingOpen}
                  setGraphSettingOpen={setGraphSettingOpen}
                  selectedGraph={selectedGraph}
                  setSelectedDropdown={setSelectedDropdown}
                  selectedGropdown={selectedGropdown}
                  // machineId={edevice}
                  machineId={selectedGraph === "First" ? edevice : selectedGraph === "Second" ? secounddevice : thirddevice}
                  locationDetails={locationDetails}

                  setChartData={setChartData}
                  setChartTwoData={setChartTwoData}
                  setChartThreeData={setChartThreeData}
                  setRefreshData={setRefreshData}
                  setHeaderRefreshData={setHeaderRefreshData}
                  //FIRST GRAPH
                  selectedLast={selectedLast}
                  setSelectedLast={setSelectedLast}
                  selectedAggregation={selectedAggregation}
                  setSelectedAggregation={setSelectedAggregation}
                  selectedInterval={selectedInterval}
                  setSelectedInterval={setSelectedInterval}
                  chartOneName={graphDisplayNames?.displayName1}
                  chartTwoName={graphDisplayNames?.displayName2}
                  chartThreeName={graphDisplayNames?.displayName3}
                  chartOneSlaveId={chartSlaveIds?.chart1SlaveId}
                  chartTwoSlaveId={chartSlaveIds?.chart2SlaveId}
                  chartThreeSlaveId={chartSlaveIds?.chart3SlaveId}
                  setBackDropLoader={setBackDropLoader}
                  isDarkMode={isDarkMode}
                />
                < IntervalModal
                  locationDetails={locationDetails}
                  intervalModal={intervalModal}
                  setIntervalModal={setIntervalModal}
                  selectedGraph={selectedGraph}
                  setSelectedDropdown={setSelectedDropdown}
                  selectedGropdown={selectedGropdown}
                  machineId={edevice}
                  setChartData={setChartData}
                  chartOneTagId={chartOneTagId}
                  //FIRST GRAPH
                  selectedLast={selectedLast}
                  setSelectedLast={setSelectedLast}
                  selectedAggregation={selectedAggregation}
                  setSelectedAggregation={setSelectedAggregation}
                  selectedInterval={selectedInterval}
                  setSelectedInterval={setSelectedInterval}
                  // SECOND GRAPH
                  secondSelectedLast={secondSelectedLast}
                  setSecondSelectedLast={setSecondSelectedLast}
                  secondSelectedAggregation={secondSelectedAggregation}
                  setSecondSelectedAggregation={setSecondSelectedAggregation}
                  secondSelectedInterval={secondSelectedInterval}
                  setSecondSelectedInterval={setSecondSelectedInterval}
                  //THIRD GRAPH
                  thirdSelectedLast={thirdSelectedLast}
                  setThirdSelectedLast={setThirdSelectedLast}
                  thirdSelectedAggregation={thirdSelectedAggregation}
                  setThirdSelectedAggregation={setThirdSelectedAggregation}
                  thirdSelectedInterval={thirdSelectedInterval}
                  setThirdSelectedInterval={setThirdSelectedInterval}
                  //SLAVE ID
                  chartOneSlaveId={chartSlaveIds?.chart1SlaveId}
                  setBackDropLoader={setBackDropLoader}
                  isDarkMode={isDarkMode}
                />
                < IntervalModalTwo
                  locationDetails={locationDetails}
                  intervalModalTwo={intervalModalTwo}
                  setIntervalModalTwo={setIntervalModalTwo}
                  selectedGraph={selectedGraph}
                  setSelectedDropdown={setSelectedDropdown}
                  selectedGropdown={selectedGropdown}
                  machineId={secounddevice}
                  setChartTwoData={setChartTwoData}
                  chartTwoTagId={chartTwoTagId}
                  //FIRST GRAPH
                  selectedLast={selectedLast}
                  setSelectedLast={setSelectedLast}
                  selectedAggregation={selectedAggregation}
                  setSelectedAggregation={setSelectedAggregation}
                  selectedInterval={selectedInterval}
                  setSelectedInterval={setSelectedInterval}
                  // SECOND GRAPH
                  secondSelectedLast={secondSelectedLast}
                  setSecondSelectedLast={setSecondSelectedLast}
                  secondSelectedAggregation={secondSelectedAggregation}
                  setSecondSelectedAggregation={setSecondSelectedAggregation}
                  secondSelectedInterval={secondSelectedInterval}
                  setSecondSelectedInterval={setSecondSelectedInterval}
                  //THIRD GRAPH
                  thirdSelectedLast={thirdSelectedLast}
                  setThirdSelectedLast={setThirdSelectedLast}
                  thirdSelectedAggregation={thirdSelectedAggregation}
                  setThirdSelectedAggregation={setThirdSelectedAggregation}
                  thirdSelectedInterval={thirdSelectedInterval}
                  setThirdSelectedInterval={setThirdSelectedInterval}
                  //SLAVE ID
                  chartTwoSlaveId={chartSlaveIds?.chart2SlaveId}
                  setBackDropLoader={setBackDropLoader}
                  isDarkMode={isDarkMode}
                />
                < IntervalModalThree
                  locationDetails={locationDetails}
                  intervalModalThree={intervalModalThree}
                  setIntervalModalThree={setIntervalModalThree}
                  selectedGraph={selectedGraph}
                  setSelectedDropdown={setSelectedDropdown}
                  selectedGropdown={selectedGropdown}
                  machineId={thirddevice}
                  setChartThreeData={setChartThreeData}
                  chartThreeTagId={chartThreeTagId}
                  //FIRST GRAPH
                  selectedLast={selectedLast}
                  setSelectedLast={setSelectedLast}
                  selectedAggregation={selectedAggregation}
                  setSelectedAggregation={setSelectedAggregation}
                  selectedInterval={selectedInterval}
                  setSelectedInterval={setSelectedInterval}
                  // SECOND GRAPH
                  secondSelectedLast={secondSelectedLast}
                  setSecondSelectedLast={setSecondSelectedLast}
                  secondSelectedAggregation={secondSelectedAggregation}
                  setSecondSelectedAggregation={setSecondSelectedAggregation}
                  secondSelectedInterval={secondSelectedInterval}
                  setSecondSelectedInterval={setSecondSelectedInterval}
                  //THIRD GRAPH
                  thirdSelectedLast={thirdSelectedLast}
                  setThirdSelectedLast={setThirdSelectedLast}
                  thirdSelectedAggregation={thirdSelectedAggregation}
                  setThirdSelectedAggregation={setThirdSelectedAggregation}
                  thirdSelectedInterval={thirdSelectedInterval}
                  setThirdSelectedInterval={setThirdSelectedInterval}
                  //SLAVE ID
                  chartThreeSlaveId={chartSlaveIds?.chart3SlaveId}
                  setBackDropLoader={setBackDropLoader}
                  isDarkMode={isDarkMode}
                />

                <NotificationBar
                  // handleClose={handleCloseNotification}
                  notificationContent={openNotification.message}
                  openNotification={openNotification.status}
                  type={openNotification.type}
                />
              </Box>
              {/* </DialogContent> */}
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <SensorList open={open} setOpen={setOpen} onClose={handleClose} selectedRow={selectedRow} locationDetails={locationDetails} />
          {/* <DragGraph open={Dragopen} setOpen={setDragOpen} locationDetails={locationDetails} /> */}
        </CardContent>
      </Paper>
    </Card>
  )
}
)
export default DeviceWidget