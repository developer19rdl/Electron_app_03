import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardHeader, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddDeviceListResults from '../components/Device/subComponent/AddDeviceListResults';
import HorizontalLinearStepper from '../components/Device/DeviceSensor';
import DeviceManagement from '../components/Device/categoryManagement/deviceCategory/DeviceComponent';
import AddSensorCategory from '../components/Device/categoryManagement/sensorCategory/SensorCategoryComponent';
import AddSensorComponent from '../components/Device/categoryManagement/addSensors/AddSensorComponent';
import ConfigSetupComponent from '../components/Device/deviceConfiguration/AssetComponent';
import AssetComponent from '../components/Device/deviceConfiguration/AssetComponent';
import AssetTypeManagement from '../components/Device/categoryManagement/assetTypeCategory/AssetTypeManagement';
import UnitMasterResult from '../components/Master/UnitMasterResult ';

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

function CategoryManagement() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const routeStateObject = useLocation();

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
                  <Tab label="Asset Category" {...a11yProps(0)} />
                  <Tab label="Add Asset" {...a11yProps(1)} />
                  <Tab label="Device Category" {...a11yProps(2)} />
                  <Tab label="Unit Category" {...a11yProps(3)} />

                  {/* <Tab label="Sensor Category" {...a11yProps(3)} /> */}
                  {/* <Tab label="Add Sensor" {...a11yProps(4)} /> */}
                </Tabs>
              </Box>
            }
          />
          <TabPanel value={value} index={0}>
            <AssetTypeManagement locationDetails={routeStateObject.state} />

          </TabPanel>
          <TabPanel value={value} index={1}>
            <AssetComponent />

          </TabPanel>
          <TabPanel value={value} index={2}>
            <DeviceManagement locationDetails={routeStateObject.state} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UnitMasterResult locationDetails={routeStateObject.state} />
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
            <AddSensorCategory />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AddSensorComponent />
          </TabPanel> */}
        </Box>
      </Container>
    </Card>
  );
}

export default CategoryManagement;