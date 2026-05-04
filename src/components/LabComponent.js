import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { LabListResults } from './siteDetails/lab/labList';
import ApplicationStore from '../utils/localStorageUtil';

function Lab() {
  const routeStateObject = useLocation();
  const { floorMap } = routeStateObject.state;
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const { imageFloorURL } = locationDetails;
  const imgSrc = `${process.env.REACT_APP_IMAGE_BASE_URL}/${imageFloorURL || floorMap}`;
  return (
    <Container maxWidth={false} style={{
      height: '100vh', width: '100%',
      // paddingRight: '2px',
      // paddingLeft: '2px'
      padding: 12,
    }}>    <Grid container style={{ height: 'auto', width: '100%', }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}
          sx={{ mt: 1, mb: 3, background: 'white', borderRadius: '6px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '16px' }}
          style={{
            height: '71vh',
            marginTop: '0px',
            minHeight: '300px'
          }}>
          <LabListResults img={imgSrc} />
        </Grid>

        <Box
          component={Grid}
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          display={{
            xs: 'block', sm: 'block', md: 'block', lg: 'block', lx: 'block',
          }}
          sx={{ mt: 2 }}
          style={{
            height: '70vh',
            border: '1px solid black',
            paddingLeft: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginTop: '2px'
          }}
        >
          {/* <div style={{
            width: `${99}%`, height: `${57}vh`, borderColor: 'black', border: `${2}px` + ' solid' + ' black',
          }}
          > */}
          <img
            src={imgSrc}
            style={{ width: `${99}%`, height: `${100}%` }}
          />
          {/* </div> */}
        </Box>
      </Grid>
    </Container>
  );
}

export default Lab;
