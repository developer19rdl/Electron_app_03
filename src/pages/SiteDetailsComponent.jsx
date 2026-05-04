import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material'
import { LocationListResults } from '../components/siteDetails/location/locationList';
import MapsMultiplePoints from '../components/maps/mapsMultiplePoints';
import ApplicationStore from '../utils/localStorageUtil';

const SiteDetails = () => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500);
  const navigate = useNavigate();
  useEffect(() => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    const { locationLabel, branchLabel, facilityLabel, buildingLabel, floorLabel, labLabel } = ApplicationStore().getStorage('siteDetails');
    const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = locationDetails;

    if (zoneId) {
      return navigate(`${locationLabel}/${branchLabel}/${facilityLabel}/${buildingLabel}/${floorLabel}/${labLabel}`, { state: { locationId, branchId, facilityId, buildingId, floorId, zoneId } });
    } else if (floorId) {
      return navigate(`${locationLabel}/${branchLabel}/${facilityLabel}/${buildingLabel}/${floorLabel}`, { state: { locationId, branchId, facilityId, buildingId, floorId } });
    } else if (buildingId) {
      return navigate(`${locationLabel}/${branchLabel}/${facilityLabel}/${buildingLabel}`, { state: { locationId, branchId, facilityId, buildingId } });
    } else if (facilityId) {
      return navigate(`${locationLabel}/${branchLabel}/${facilityLabel}`, { state: { locationId, branchId, facilityId } });
    } else if (branchId) {
      return navigate(`${locationLabel}/${branchLabel}`, { state: { locationId, branchId } });
    } else if (locationId) {
      return navigate(`${locationLabel}`, { state: { locationId } });
    }
  }, [locationCoordinationList]);

  return (
    <Container maxWidth={false} style={{
      height: '100vh', width: '100%',
      // paddingRight: '2px',
      // paddingLeft: '2px'
      padding: 10,
    }}>
      <Grid container spacing={4} >
        <Grid item sx={{ mt: 1 }} xs={12} sm={12} md={12} lg={12} xl={12}
        // style={{
        //   height: '46vh',
        //   marginTop: '0px',
        //   minHeight: '300px'
        // }}
        >
          <LocationListResults setLocationCoordinationList={setLocationCoordinationList} centerLat={centerLat} centerLng={centerLng} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
          style={{
            height: '47vh',
            marginTop: '-12px',
            borderRadius: '14px'
          }}
        >
          {locationCoordinationList.length !== 0
            ? (
              <MapsMultiplePoints
                width="100%"
                height="80%"
                markers={locationCoordinationList}
                zoom={4}
                center={{ lat: centerLat, lng: centerLng }}
              />
            )
            : ''}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SiteDetails