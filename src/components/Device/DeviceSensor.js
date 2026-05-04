import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import DeviceAdd from './DeviceAdd';
import SensorAdd from './MeterAddModel';
import AddDeviceListResults from './subComponent/AddDeviceListResults';
import ManageDeviceresult from '../dashboard/components/ManageDevice/ManageDeviceresult';

const steps = ['Add Device', 'Add Sensor'];

export default function HorizontalLinearStepper({ locationId = { locationId },
  branchId,
  facilityId,
  buildingId,
  floorId,
  zoneId, zoneMap, locationDetails, setValue }) {
  // console.log("zoneMap", zoneMap)
  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        sx={{ mt: 0, padding: 0 }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {/* {activeStep === steps.length - 1 ? <SensorAdd locationDetails={locationDetails}/> :  */}
        {/* <DeviceAdd locationDetails={locationDetails} zoneMap={zoneMap} /> */}
        {/* } */}
        {/* <AddDeviceListResults
          locationId={locationId}
          branchId={branchId}
          facilityId={facilityId}
          buildingId={buildingId}
          floorId={floorId}
          zoneId={zoneId}
          locationDetails={{
            locationId, branchId, facilityId, buildingId, floorId, zoneId,
          }}

          zoneMap={zoneMap}
        /> */}
        <ManageDeviceresult
          locationDetails={locationDetails}
          locationId={locationId}
          branchId={branchId}
          facilityId={facilityId}
          buildingId={buildingId}
          floorId={floorId}
          zoneId={zoneId}

        />
      </Grid>
    </Box>
  );
}
