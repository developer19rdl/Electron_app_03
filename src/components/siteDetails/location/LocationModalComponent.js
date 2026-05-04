import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  LocationAddService,
  LocationEditService,
} from '../../../services/LoginPageService';
import { LocationAddFormValidate } from '../../../validation/locationValidation';
import MapsComponent from '../../maps/googleMapsComponent';

import NotificationBar from '../../notification/ServiceNotificationBar';

function LocationModal({
  open, setOpen, isAddButton, locationData, setRefreshData, centerCoord
}) {
  console.log("centerCoord", centerCoord)
  const [locationName, setLocationName] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [locationId, setLocationId] = useState(19);
  const [errorObject, setErrorObject] = useState({});
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (locationData) {
      setOpen(open);
      loaddata();
    }
  }, [locationData]);

  const loaddata = () => {
    const coordinates = locationData.coordinates
      ? locationData.coordinates.split(',')
      : ['', ''];
    setLatitude(parseFloat(coordinates[0]) || '');
    setLongitude(parseFloat(coordinates[1]) || '');
    setLocationName(locationData.locationName || '');
    setLocationId(locationData.id || '');
    setMarkerLng(parseFloat(coordinates[0]));
    setMarkerLat(parseFloat(coordinates[1]));
  };

  /* eslint-disable-next-line */
  const clearForm = () => {
    setLocationName('');
    setLongitude('');
    setLatitude('');
    setLocationId('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (longitude === '' || latitude === '') {
      setErrorObject((oldErrorState) => {
        let status = {};
        status = {
          errorStatus: true,
          helperText: 'Please choose the points in Map',
        };
        return {
          ...oldErrorState,
          coordinates: status,
        };
      });
    } else {
      const coordinates = JSON.stringify(`${latitude},${longitude}`).replaceAll(
        '"',
        '',
      );

      if (isAddButton) {
        await LocationAddService(
          { loc_name: locationName, coordinates },
          handleSuccess,
          handleException,
        );
      } else {
        await LocationEditService(
          { loc_name: locationName, coordinates, locationId },
          handleSuccess,
          handleException,
        );
      }
    }
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setOpen(false);
      setErrorObject({});
    }, 1000);
  };
  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };

  const onMapClick = (newPosition) => {
    delete errorObject.coordinates; // Clear previous errors

    // Set the new latitude and longitude values
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
  };

  const validateForNullValue = (value, type) => {
    LocationAddFormValidate(value, type, setErrorObject);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };




  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '75%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isAddButton ? 'Add Location' : 'Edit Location'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} style={{ paddingTop: 5 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                onBlur={() => LocationAddFormValidate(locationName, 'locationName', setErrorObject)}
                error={errorObject?.locationName?.errorStatus}
                helperText={errorObject?.locationName?.helperText}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Latitude"
                value={latitude}
                // disabled
                error={errorObject?.coordinates?.errorStatus}
                helperText={errorObject?.coordinates?.helperText}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Longitude"
                value={longitude}
                // disabled
                error={errorObject?.coordinates?.errorStatus}
                helperText={errorObject?.coordinates?.helperText}
              />
            </Grid>
            <Grid item xs={12}>
              <MapsComponent
                onMarkerDrop={onMapClick}
                longitude={longitude}
                latitude={latitude}
                center={
                  isAddButton
                    ? { lat: Number(centerCoord.lat), lng: Number(centerCoord.lng) }
                    : { lat: Number(latitude) || 80.5, lng: Number(longitude) || 23.5 }
                }
                zoom={4}
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 4 }}>
              <Button type="submit" variant="contained" color="primary">
                {isAddButton ? 'Add' : 'Update'}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setErrorObject({});
                  loaddata();
                }}
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </Dialog>
  );
}

export default LocationModal;
