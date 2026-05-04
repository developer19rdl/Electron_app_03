import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EnergyPerHourBarChart from './EnergyChart/EnergyPerHourBarChart'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import EnergyPerDayBarChart from './EnergyChart/EnergyPerDayBarChart';
import MeterLineChartData from './EnergyChart/MeterLineChartData';
import LoveLaceEnergyLoad from './EnergyChart/LoveLaceEnergyLoad';
import CurrentRYBLineChart from './EnergyChart/CurrentRYBLineChart';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { Button, ButtonGroup, Popover, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MeterAlertModalComponent from './MeterAlertModalComponent';

// import { currentDateValidator, dateRangevalidator } from '../../utils/helperFunctions';

import { currentDateValidator, dateRangevalidator } from '../../../../utils/helperFunctions';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import EnergyShowWaveChart from './EnergyChart/EnergyShowWaveChart';
import { DeviceIdAlerts } from '../../../../services/LoginPageService';
import TemperatureLineChart from './EnergyChart/TemperatureLineChart copy';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





const EnergyMeterComponent = ({ open, setOpen, meterTagId, deviceId, meterTag, setOpenEnergyMeter, openEnergyMeter, analogSensorList }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [activeButton, setActiveButton] = useState('today');

    const [chartFromDate, setChartFromDate] = useState('');
    const [chartToDate, setChartToDate] = useState('');

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [alertOpen, setAlertOpen] = useState(false);
    const [waveOpen, setWaveOpen] = useState(false);

    const [dataListCount, setDataListCount] = useState(0); // Add this state


    console.log("dataListCount", dataListCount)
    const [loadingLoveLace, setLoadingLoveLace] = useState(true);
    const [loadingEnergyPerHour, setLoadingEnergyPerHour] = useState(true);
    const [loadingEnergyPerDay, setLoadingEnergyPerDay] = useState(true);
    const [loadingMeterLineChart, setLoadingMeterLineChart] = useState(true);
    const [loadingCurrentRYBLineChart, setLoadingCurrentRYBLineChart] = useState(true);

    const [dataFetched, setDataFetched] = useState(false);

    // const [dataList, setDataList] = useState([]);
    // console.log("dataList", dataList);




    useEffect(() => {
        DeviceIdAlerts(deviceId, fetchAlertListSuccess, fetchAlertListException);
    }, [])

    const fetchAlertListSuccess = (dataObject) => {
        // setDataList(dataObject.data);
        setDataListCount(dataObject.data.length); // Update the dataListCount state with the length of the dataList
    };
    const fetchAlertListException = () => {
    };

    console.log("")




    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#212121',
                paper: '#212121',
            },
            primary: {
                main: '#ffffff', // Custom primary color
            },
            secondary: {
                main: '#ff0000', // Custom secondary color
            },
            // Add more custom colors if needed
        },
    });

    const ContainerGrid = styled(Grid)({
        padding: 0,
        margin: 0,
    });

    function notificationsLabel(count) {
        return `${count}`;
    }

    const HandleAlertClose = () => {
        setAlertOpen(false);
    };

    const HandleAlertClick = () => {
        setAlertOpen(true);
    };

    const HandleWaveClose = () => {
        setWaveOpen(false);
    };

    const HandleWaveClick = () => {
        setWaveOpen(true);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleCustomButtonClick = (event) => {
        // setActiveButton('custom')

        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const customOpen = Boolean(anchorEl);
    const id = customOpen ? 'custom-button-popover' : undefined;

    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    const customSubmit = () => {
        setActiveButton('custom')
        setFromDate(chartFromDate)
        setToDate(chartToDate)

    }


    return (
        // <div style={{ backgroundColor: '#212121' }} >
        <ThemeProvider theme={darkTheme}>
            <Dialog
                fullScreen
                open={open}
                // onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: { padding: 4 },
                }}
            >

                <IconButton
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '30px',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                    onClick={HandleAlertClick}
                    aria-label={notificationsLabel(dataListCount)} // Correctly using dataListCount here
                >
                    <Badge badgeContent={dataListCount} color="secondary">
                        <AddAlertIcon />
                    </Badge>
                </IconButton>


                {/* <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShowChartIcon />}
                    size='small'
                    style={{
                        position: 'absolute',
                        top: '31px',
                        right: '32%',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                    onClick={HandleWaveClick}
                >
                    Spectrum
                </Button> */}


                <CloseIcon
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '0px',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                    onClick={() => {
                        setOpen(false);
                        setOpenEnergyMeter(false);
                    }}
                />

                <DialogTitle
                    sx={{
                        position: 'absolute',
                        top: '0px',
                        left: '40%',
                        transform: 'translateX(-50%)',
                        cursor: 'pointer',
                        zIndex: 1,
                        color: '#fff'
                    }}
                    id="alert-dialog-title"
                >
                    Trends of Meters (
                    {meterTag}
                    )
                </DialogTitle>


                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                // marginTop={1}
                >

                    <Grid item xs={6} >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Grid item xs={7} container justifyContent="flex-end">
                                <ButtonGroup variant="outlined" aria-label="outlined button group" size='small'>
                                    <Button onClick={handleCustomButtonClick}>Custom</Button>
                                    <Button
                                        onClick={() => setActiveButton('today')}

                                    // sx={{ padding: '1px 12px' }}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        onClick={() => setActiveButton('day')}

                                    >
                                        Day
                                    </Button>
                                    <Button
                                        onClick={() => setActiveButton('week')}

                                    >
                                        Week
                                    </Button>
                                    <Button
                                        onClick={() => setActiveButton('month')}

                                    >
                                        Month
                                    </Button>
                                    <Button
                                        onClick={() => setActiveButton('year')}

                                    >
                                        Year
                                    </Button>
                                </ButtonGroup>
                                <Popover
                                    id={id}
                                    open={customOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}

                                >
                                    <Box sx={{ width: 300, height: 230, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                        <from>
                                            <TextField
                                                fullWidth
                                                label="From Date"
                                                type="date"
                                                value={chartFromDate}
                                                variant="outlined"
                                                required
                                                onChange={(e) => {
                                                    setChartFromDate(e.target.value);
                                                }}
                                                autoComplete="off"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    max: currentDateValidator()
                                                }}
                                                sx={{ p: 1, mb: 1 }}
                                            />

                                            <TextField
                                                fullWidth
                                                label="To date"
                                                type="date"
                                                value={chartToDate}
                                                variant="outlined"
                                                required
                                                onChange={(e) => {
                                                    setChartToDate(e.target.value);
                                                }}
                                                autoComplete="off"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    max: currentDateValidator()
                                                }}
                                                sx={{ p: 1 }}
                                            />
                                            <Button fullWidth size="small" onClick={customSubmit} type='submit' variant="contained" >Update</Button>
                                        </from>

                                    </Box>
                                </Popover>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid
                    container
                    mt={1}
                    spacing={1}
                >
                    {/* <Grid item xs={12} md={4} lg={4} >

                        <Box sx={{ height: '45vh', position: 'relative' }}>
                            <Item elevation={24}>

                                <LoveLaceEnergyLoad
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingLoveLace}
                                    dataFetched={dataFetched}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen}


                                />

                            </Item>
                        </Box>
                    </Grid> */}
                    {/* <Grid item xs={12} md={4} lg={4} >
                        <Box sx={{ height: '45vh', position: 'relative' }}>
                            <Item elevation={24}>
                                <EnergyPerHourBarChart
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingEnergyPerHour}
                                    dataFetched={dataFetched}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen} />
                            </Item>
                        </Box>
                    </Grid> */}
                    {/* <Grid item xs={12} md={4} lg={4} >
                        <Box sx={{ height: '45vh', position: 'relative' }}>
                            <Item elevation={24}>
                                <EnergyPerDayBarChart
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingEnergyPerDay}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen} />
                            </Item>
                        </Box>
                    </Grid> */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Box sx={{ height: '48vh', position: 'relative' }}>
                            <Item elevation={24}>
                                <MeterLineChartData
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingMeterLineChart}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen} />
                            </Item>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box sx={{ height: '48vh', position: 'relative' }}>
                            <Item elevation={24}>
                                <CurrentRYBLineChart
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingCurrentRYBLineChart}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen}
                                />
                            </Item>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} md={12} lg={12} >
                        <Box sx={{ height: '45vh', position: 'relative' }}>
                            <Item elevation={24}>
                                <TemperatureLineChart
                                    meterTagId={meterTagId}
                                    deviceId={deviceId}
                                    sortDataType={activeButton}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    loading={loadingCurrentRYBLineChart}
                                    setDataFetched={setDataFetched}
                                    dopen={open}
                                    dsetOpen={setOpen}
                                />
                            </Item>
                        </Box>
                    </Grid> */}
                </Grid>

            </Dialog>
            <MeterAlertModalComponent alertOpen={alertOpen} HandleAlertClose={HandleAlertClose} locationDetails={deviceId} />

            {/* <AlertModalComponent alertOpen={alertOpen} setAlertOpen={setAlertOpen} locationDetails={deviceId} /> */}

            <EnergyShowWaveChart waveOpen={waveOpen} HandleWaveClose={HandleWaveClose} deviceId={deviceId} analogSensorList={analogSensorList} />

        </ThemeProvider>

    )
}

export default EnergyMeterComponent