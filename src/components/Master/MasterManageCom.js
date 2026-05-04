import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardHeader, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ProjectResult from './ProjectResult';
import DeviceMasterResult from './DeviceMasterResult';
import SensorMasterResult from './SensorMasterResult ';
import UnitMasterResult from './UnitMasterResult ';


function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function MasterManageCom() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const routeStateObject = useLocation();

    return (
        <Card className={' h-[auto] mb-10 m-0 sm:m-6'}
            style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px' }}>
            <Container maxWidth={false} style={{ padding: 0, height: '94vh' }}>
                <Box
                    sx={{
                        width: '100%',
                        marginBottom: '0',
                        marginTop: 0,
                        padding: 0,
                        height: '94vh',
                    }}
                >
                    <CardHeader
                        style={{ display: 'block' }}
                        title={
                            <Box sx={{ width: '100%' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                                    variant='scrollable'
                                    visibleScrollbar={true}
                                    // allowScrollButtonsMobile
                                    style={{
                                        overflow: 'auto',
                                        width: 'auto'
                                    }}
                                >
                                    <Tab label="Project Management" {...a11yProps(0)} />
                                    <Tab label="Device Category" {...a11yProps(1)} />
                                    <Tab label="Sensor Category" {...a11yProps(2)} />
                                    <Tab label="Unit Category" {...a11yProps(3)} />
                                    {/* <Tab label="Add Sensor" {...a11yProps(4)} /> */}
                                </Tabs>
                            </Box>
                        }
                    />
                    <TabPanel value={value} index={0}>
                        <ProjectResult />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DeviceMasterResult />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SensorMasterResult />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <UnitMasterResult />
                    </TabPanel>
                    {/* <TabPanel value={value} index={4}>
            <AddSensorComponent />
          </TabPanel> */}
                </Box>
            </Container>
        </Card>
    );
}

export default MasterManageCom;

