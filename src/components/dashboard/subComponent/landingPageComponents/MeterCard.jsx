import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Grid,
  CardActionArea,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { getSensorBackgroundColor, getSensorHeaderColor, setAlertPriorityAndType, setAlertStatusCode } from '../../../../utils/helperFunctions';
import { WifiOffOutlined } from '@mui/icons-material';
import EsdTrendComponent from './EnergyMeterComponent';
import EnergyMeterComponent from './EnergyMeterComponent';
import InfoIcon from '@mui/icons-material/Info';

import info from './../../../../images/icons/tool.png'

function MeterCard(props) {
  const [open, setOpen] = useState(false);
  const [meterId, setMeterId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    props.setMeterTagId(props.id);
    props.setMeterTag(props.meterName);
    props.setOpen(true);
  };


  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '5px',
          borderRadius: '5px',
          border: '2px solid #ccc',
          borderColor: '#00ffff',
        }}
        onClick={(event) => handleClickOpen(event)}
      >
        <CardActionArea
          sx={{ boxShadow: 5, height: '100%', }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor='#E8E2E2'
            pl={2}
            pr={2}
            pt={1}
            pd={1}
          >
            <Grid
              item
              xs={4}
            >
              <Typography
                sx={{
                  color: '#434242',
                  fontWeight: '500',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {props.assetName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                sx={{
                  color: '#434242',
                  fontWeight: '500',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginLeft: "65%",
                  borderRadius: "25%"

                }}

              >
                {/* <img
                  src={info} // Replace with the correct path to your JPG imag
                  onClick={(e) => {
                    e.stopPropagation(); // Stop event propagation
                    handleDialogOpen(); // Open the dialog
                  }}
                  style={{ cursor: 'pointer' }}
                /> */}

              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', borderRadius: '2', backgroundColor: '#09090c', p: 2 }}>
            {/* <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={9}>
              <Typography fontSize={14} color="#ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#00ffff' }}> {props.avxVoltage}</span> V
              </Typography>
              <Typography fontSize={14} color="#ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#00ffff' }}>{props.Frequency}</span> Hz
              </Typography>
            </Stack>
            <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={8}>
              <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.kw}</span> kW
              </Typography>
              <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.PowerFactor}</span> PF
              </Typography>
            </Stack>
            <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={8}>
              <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.kwh}</span> kWh              </Typography>
              <Typography fontSize={14} color="#00ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#ffff00' }}>{"0"}</span> °C
              </Typography>
            </Stack> */}
            {/* <Stack pt={1} direction="row" justifyContent="space-evenly" alignItems="center" spacing={8}>
              <Typography fontSize={14} m={1} color="#00ffff" variant="body1" gutterBottom>
              
              </Typography>
              <Typography fontSize={14} m={1} color="#00ffff" variant="body1" gutterBottom>
                <span style={{ fontSize: '20px', color: '#ffff00' }}>{props.temp}</span> °C  </Typography>
            </Stack> */}

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '2px' }}>
              <div>
                <Typography fontSize={19} color="#ffff00" >Voltage</Typography>
                <Typography style={{ fontSize: '20px', color: '#00ffff' }} >{props.avxVoltage}</Typography>
                <Typography fontSize={14} color="#ffff" >V</Typography>
              </div>
              <div>
                <Typography fontSize={19} color="#ffff00" >Current</Typography>
                <Typography style={{ fontSize: '20px', color: '#00ffff' }} >{props.kwh}</Typography>
                <Typography fontSize={14} color="#ffff" >kWh</Typography>
              </div>

            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '7px' }}>
              <div>
                <Typography fontSize={19} color="#ffff00" >Temperature</Typography>
                <Typography style={{ fontSize: '20px', color: '#00ffff' }} >{props.kwh}</Typography>
                <Typography fontSize={14} color="#ffff" >°C</Typography>

              </div>

            </div> */}
          </Box>
        </CardActionArea>
      </Card>


      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth={true} maxWidth={'md'} sx={{ marginLeft: "5%" }}>
        <DialogTitle>ODR</DialogTitle>
        <DialogContent>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Observation</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Diagnostic</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                  In Machine Recirculating Pump. Current is stable in R phase with 0 amps in Y and B. Voltage is stable. Power factor is low.
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                  Current phase loss in Y and B phase.
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'justify' }}>
                  Stop the equipment.
                  Check connections and connectivity for Y and B phase.
                </td>
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* */}
    </>
  );
}

export default MeterCard;
