import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FloorListResults } from './siteDetails/floor/floorList';
import ApplicationStore from '../utils/localStorageUtil';

function Floor() {
  const routeStateObject = useLocation();
  const { buildingImg: routeBuildingImg } = routeStateObject.state;
  const { locationDetails } = ApplicationStore().getStorage('userDetails');
  const { buildingImg: locationBuildingImg } = locationDetails;
  const imgSrc = `${process.env.REACT_APP_IMAGE_BASE_URL}/${routeBuildingImg || locationBuildingImg}`;
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
            height: '70vh',
            marginTop: '0px',
            minHeight: '300px'
          }}>
          <FloorListResults img={imgSrc} />
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
            // height: 'auto',
            // border: '1px solid black',
            paddingLeft: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginTop: '2px',
            // width: '100%'
          }}
        >
          <img
            src={imgSrc}
            style={{
              width: `${99}%`,
              height: `${95}%`
            }}
          />
        </Box>
      </Grid>
    </Container>
  );
}

export default Floor;
