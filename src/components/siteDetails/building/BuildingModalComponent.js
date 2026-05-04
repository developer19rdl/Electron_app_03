import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BuildingAddService, BuildingEditService,
} from '../../../services/LoginPageService';
import MapsComponent from '../../maps/googleMapsComponent';
import { LocationFormValidate } from '../../../validation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';
import previewImage from '../../../images/previewImage.png';

function BuildingModal({
  open, setOpen, isAddButton, editData, locationId, branchId, facilityId, setRefreshData, locationCoordinationList, centerCoord
}) {
  console.log("centerCoord", centerCoord)
  // const location_id = locationId;
  // const branch_id = branchId;
  // const facility_id = facilityId;
  const [buildingName, setBuildingName] = useState('');
  const [description, setDescription] = useState('');
  const [buildingTotalFloors, setBuildingTotalFloors] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [buildingImg, setBuildingImg] = useState({});
  const [buildingTag, setBuildingTag] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [previewBuilding, setPreviewBuilding] = useState('');
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
    setBuildingName(editData.buildingName || '');
    setDescription(editData.description || '');
    setLatitude(coordinates[0]);
    setLongitude(coordinates[1]);
    setBuildingId(editData.id || '');
    setBuildingTag(editData.buildingTag || '');
    setBuildingTotalFloors(editData.totalFloors || '');
    setPreviewBuilding(editData.buildingImg ? `${process.env.REACT_APP_IMAGE_BASE_URL}/${editData.buildingImg}` : previewImage);
    setMarkerLng(parseFloat(coordinates[0]));
    setMarkerLat(parseFloat(coordinates[1]));
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
        await BuildingAddService({
          name: buildingName,
          description: description,
          total_floors: buildingTotalFloors,
          image: buildingImg,
          coordinates,
          locationId,
          branchId,
          facilityId,
          // buildingTag,
        }, handleSuccess, handleException);
      } else {
        await BuildingEditService({
          name: buildingName,
          description: description,
          total_floors: buildingTotalFloors,
          image: buildingImg,
          coordinates,
          locationId,
          branchId,
          facilityId,
          // buildingTag,
          buildingId,
        }, handleSuccess, handleException);
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
  const onMapClick = (newPosition) => {
    delete errorObject.coordinates; // Clear previous errors

    // Set the new latitude and longitude values
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
  };
  const validateForNullValue = (value, type) => {
    LocationFormValidate(value, type, setErrorObject);
  };

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const processImageFile = (imageFile) => {
    if (imageFile) {
      if (imageFile.type.match('image/jpeg') || imageFile.type.match('image/png')) {
        // Success phase
      } else {
        setNotification({
          status: true,
          type: 'error',
          message: 'Please select an image',
        });
      }
    }
  }
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '75%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isAddButton ? 'Add Building' : 'Edit Building'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="flex flex-col w-full">
                <div className="w-full sm:float-left pr-3 pl-3">
                  <div className='flex w-full gap-7 min-[320px]:flex-col min-[768px]:flex-row'>
                    <div className="rounded-md -space-y-px mb-2 w-full ">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Building Name"
                        type="text"
                        value={buildingName}
                        variant="outlined"
                        placeholder="Please enter Building name"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                      focus:ring-red-500 focus:border-red-500  sm:text-sm"
                        required
                        onBlur={() => validateForNullValue(buildingName, 'buildingName')}
                        onChange={(e) => { setBuildingName(e.target.value); }}
                        autoComplete="off"
                        error={errorObject?.buildingName?.errorStatus}
                        helperText={errorObject?.buildingName?.helperText}
                      />
                    </div>
                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Description"
                        type="text"
                        value={description}
                        variant="outlined"
                        placeholder="Please enter description"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                      focus:ring-red-500 focus:border-red-500  sm:text-sm"
                        required
                        onBlur={() => validateForNullValue(description, 'buildingDescription')}
                        onChange={(e) => { setDescription(e.target.value); }}
                        autoComplete="off"
                        error={errorObject?.description?.errorStatus}
                        helperText={errorObject?.description?.helperText}
                      />
                    </div>
                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Total Floors"
                        type="number"
                        value={buildingTotalFloors}
                        variant="outlined"
                        placeholder="Please enter total number of floors"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                      focus:ring-red-500 focus:border-red-500  sm:text-sm"
                        required
                        onBlur={() => validateForNullValue(buildingTotalFloors, 'buildingTotalFloors')}
                        onChange={(e) => { setBuildingTotalFloors(e.target.value); }}
                        autoComplete="off"
                        error={errorObject?.buildingTotalFloors?.errorStatus}
                        helperText={errorObject?.buildingTotalFloors?.helperText}

                      />
                    </div>
                  </div>
                  <div className='flex gap-7 min-[320px]:flex-col min-[768px]:flex-row'>
                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Latitude"
                        type="text"
                        disabled
                        value={latitude}
                        variant="outlined"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2
                      border border-gray-300 placeholder-gray-500 text-gray-900
                      rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
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
                        // variant="filled"
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Longitude"
                        type="text"
                        disabled
                        value={longitude}
                        variant="outlined"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                      focus:ring-red-500 focus:border-red-500  sm:text-sm"
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
                    {/* <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Building Tag"
                      type="text"
                      value={buildingTag}
                      variant="outlined"
                      placeholder="Please enter Building Tag"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                      placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                      focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(buildingTag, 'buildingTag')}
                      onChange={(e) => { setBuildingTag(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.buildingTag?.errorStatus}
                      helperText={errorObject?.buildingTag?.helperText}
                    />
                  </div> */}
                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        required={!!isAddButton}
                        label="building Image"
                        onBlur={() => {
                          validateForNullValue(buildingImg, 'buildingImg');
                        }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setBuildingImg(e.target.files[0]);
                            processImageFile(e.target.files[0]);
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setBuildingImg(reader.result);
                                setPreviewBuilding(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        InputLabelProps={{ shrink: true }}
                        type="file"
                        inputProps={{
                          accept: 'image/png, image/jpeg',
                        }}
                        error={errorObject?.buildingImg?.errorStatus}
                        helperText={errorObject?.buildingImg?.helperText}
                      />
                    </div>
                  </div>
                  <div className='flex justify-between items-center min-[320px]:flex-col min-[768px]:flex-row gap-10 mt-3'>
                    <div className="rounded-md -space-y-px mb-2" style={{ border: '2px black solid' }}>
                      <img src={previewBuilding} alt="Building Preview" style={{ width: '-webkit-fill-available', maxHeight: 300 }} />
                    </div>
                    {/* </div> */}
                    <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                      <Grid item xs={4} sm={4} md={4} lg={4} />
                      <MapsComponent
                        height="55vh"
                        width="100%"
                        onMarkerDrop={onMapClick}
                        longitude={markerLng}
                        latitude={markerLat}
                        stateName={editData.buildingName}
                        zoom={17}
                        center={isAddButton ? { lat: centerCoord.lat, lng: centerCoord.lng }
                          : {
                            lat: Number(latitude) || 80.500,
                            lng: Number(longitude) || 23.500,
                          }}
                        flagDistance={0.0003}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="float-right">
            <div className="rounded-md -space-y-px mt-5 mb-3">
              <Button
                type="submit"
                disabled={errorObject?.buildingName?.errorStatus || errorObject?.description?.errorStatus
                  || errorObject?.buildingTotalFloors?.errorStatus || errorObject?.buildingTag?.errorStatus
                  || errorObject?.coordinates?.errorStatus || errorObject?.stateName?.errorStatus}
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
export default BuildingModal;
