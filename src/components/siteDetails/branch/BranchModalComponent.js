import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BranchAddService, BranchEditService } from '../../../services/LoginPageService';
import { BranchFormValidate } from '../../../validation/locationValidation';
import MapsComponent from '../../maps/googleMapsComponent';

import NotificationBar from '../../notification/ServiceNotificationBar';

function BranchModal({
  open, setOpen, isAddButton, editData, location_Id, setRefreshData, locationCoordinationList, centerCoord
}) {
  console.log("centerCoord", centerCoord)

  const [branchName, setbranchName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locationId, setLocationId] = useState(location_Id);
  const [branchId, setBranchId] = useState('');
  const [errorObject, setErrorObject] = useState({});

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  useEffect(() => {
    if (editData) {
      setOpen(open);
      loaddata();
    }
  }, [editData]);

  const loaddata = () => {
    const coordinates = editData.coordinates ? editData.coordinates.split(',') : ['', ''];
    setbranchName(editData.branchName || '');
    setLatitude(coordinates[0]);
    setLongitude(coordinates[1]);
    setBranchId(editData.id || '');
    setMarkerLng(parseFloat(coordinates[0]));
    setMarkerLat(parseFloat(coordinates[1]));
  };
  /* eslint-disable-next-line */
  const clearForm = () => {
    setbranchName('');
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
      const coordinates = JSON.stringify(`${latitude},${longitude}`).replaceAll('"', '');
      if (isAddButton) {
        await BranchAddService({ locationId, branch_name: branchName, coordinates }, handleSuccess, handleException);
        // clearForm();
      } else {
        await BranchEditService({
          locationId, branch_name: branchName, coordinates, branchId,
        }, handleSuccess, handleException);
        // clearForm();
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
    }, 5000);
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

  // const onMapClick = (e) => {
  //   delete errorObject.coordinates;
  //   setLatitude(e.latLng.lat());
  //   setLongitude(e.latLng.lng());
  // };
  const onMapClick = (newPosition) => {
    delete errorObject.coordinates; // Clear previous errors

    // Set the new latitude and longitude values
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
  };

  const validateForNullValue = (value, type) => {
    BranchFormValidate(value, type, setErrorObject);
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
        {isAddButton ? 'Add Branch' : 'Edit Branch'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="flex flex-col w-full">
                <div className="w-full flex sm:float-left gap-5 pr-3 pl-3 mb-5 min-[320px]:flex-col min-[768px]:flex-row">
                  <div className=" -space-y-px mb-2 w-full">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Location Name"
                      type="text"
                      value={branchName}
                      variant="outlined"
                      placeholder="Please enter Branch name"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(branchName, 'branchName')}
                      onChange={(e) => { setbranchName(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.branchName?.errorStatus}
                      helperText={errorObject?.branchName?.helperText}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2 w-full">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Latitude"
                      type="text"
                      disabled
                      value={latitude}
                      variant="outlined"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      onChange={(e) => { setLatitude(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.coordinates?.errorStatus}
                      helperText={errorObject?.coordinates?.helperText}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2 w-full">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Longitude"
                      type="text"
                      disabled
                      value={longitude}
                      variant="outlined"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      required
                      onChange={(e) => { setLongitude(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.coordinates?.errorStatus}
                      helperText={errorObject?.coordinates?.helperText}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
                <div className="w-10/12 mr-auto ml-auto sm:float-right lg:float-left  pr-1 mb-7 min-[320px]:w-full min-[768px]:w-[80%] ">
                  <Grid item xs={4} sm={4} md={4} lg={4} />
                  <MapsComponent
                    onMarkerDrop={onMapClick}
                    height="40vh"
                    width="100%"
                    longitude={markerLng}
                    latitude={markerLat}
                    stateName={editData.branchName}
                    zoom={6}
                    center={isAddButton ? { lat: centerCoord.lat, lng: centerCoord.lng }
                      : {
                        lat: Number(latitude) || 80.500,
                        lng: Number(longitude) || 23.500,
                      }}
                    flagDistance={0.5}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  type="submit"
                  disabled={errorObject?.coordinates?.errorStatus || errorObject?.stateName?.errorStatus}
                >
                  {isAddButton ? 'Add' : 'Update'}
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    setErrorObject({});
                    loaddata();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
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

export default BranchModal;
