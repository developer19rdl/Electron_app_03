import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import { BuildingListResults } from './siteDetails/building/buildingList';
import MapsMultiplePoints from './maps/mapsMultiplePoints';

function Building() {
  const routeStateObject = useLocation();
  const { centerCoordination } = routeStateObject.state;
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500);
  useEffect(() => {
    const coordinates = centerCoordination ? centerCoordination.replaceAll('"', '').split(',') : [];
    setCenterLat(parseFloat(coordinates[0]) || 23.500);
    setCenterLng(parseFloat(coordinates[1]) || 80.500);
  }, [locationCoordinationList]);
  return (
    <Container maxWidth={false} style={{
      height: '100vh', width: '100%',
      // paddingRight: '2px',
      // paddingLeft: '2px'
      padding: 12,
    }}>    <Grid container style={{ height: 'auto', width: '100%', }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            mt: 1,
            mb: 3,
            background: 'white',
            borderRadius: '6px',
            padding: '14px',
            height: '45vh',
            minHeight: '295px',
            boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px', // Subtle shadow effect
            transition: 'box-shadow 0.3s ease-in-out',  // Smooth transition
            '&:hover': {
              boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px', // Enhanced shadow effect on hover
            },
          }}
        >
          <BuildingListResults
            locationCoordinationList={locationCoordinationList}
            setLocationCoordinationList={setLocationCoordinationList}
            centerLat={centerLat}
            centerLng={centerLng}
          />
        </Grid>
        <Grid sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}
          style={{
            height: '47vh',
            marginTop: '-12px'

          }}
        >
          {locationCoordinationList.length !== 0
            ? (
              <MapsMultiplePoints
                width="100%"
                height="47vh"
                markers={locationCoordinationList}
                zoom={17}
                center={{
                  lat: locationCoordinationList[0].position.lat
                    || centerLat,
                  lng: locationCoordinationList[0].position.lng
                    || centerLng,
                }}
              />
            )
            : ''}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Building;
