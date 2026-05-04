import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Paper } from '@mui/material';
// import '../../maps/streetMap.css';

import MapsMultiplePoints from '../../maps/mapsMultiplePoints';

function GeoLocationWidget({
  locationCoordination, zoomLevel, centerLatitude, centerLongitude, height
}) {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState('');
  const [centerLng, setCenterLng] = useState('');

  // useEffect(() => {
  //   setLocationCoordinationList(locationCoordination);
  //   setCenterLat(centerLatitude || locationCoordination[0]?.position?.lat);
  //   setCenterLng(centerLongitude || locationCoordination[0]?.position?.lng);
  // }, [locationCoordination,]);
  useEffect(() => {
    setLocationCoordinationList(locationCoordination);

    const firstValid = locationCoordination.find(
      m => m?.position?.lat != null && m?.position?.lng != null
    );

    if (centerLatitude != null && centerLongitude != null) {
      setCenterLat(centerLatitude);
      setCenterLng(centerLongitude);
    } else if (firstValid) {
      setCenterLat(firstValid.position.lat);
      setCenterLng(firstValid.position.lng);
    }
  }, [locationCoordination, centerLatitude, centerLongitude]);

  return (
    <>
      <Card className={'h-full mt-0 min-[320px]:mt-0 min-[768px]:mt-0'} sx={{ borderRadius: '12px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
        <Paper elevation={3} className={'h-full'}>
          <CardContent className={'h-full'} style={{ padding: '0' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {/* {locationCoordinationList.length !== 0
                ? (
                  <MapsMultiplePoints
                    width="100%"
                    height={height || "55vh"}
                    markers={locationCoordinationList}
                    zoom={4}
                    center={{ lat: centerLat, lng: centerLng }}
                  />
                )
                : ''} */}
              {locationCoordinationList.length > 0 && centerLat && centerLng && (
                <MapsMultiplePoints
                  width="100%"
                  height={height || "55vh"}
                  markers={locationCoordinationList}
                  zoom={4}
                  center={{ lat: centerLat, lng: centerLng }}
                />
              )}

            </Grid>
          </CardContent>
        </Paper>
      </Card>
    </>
  );
}

export default GeoLocationWidget;
