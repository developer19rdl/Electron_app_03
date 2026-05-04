import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FloorAddService, FloorEditService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';
import ImageMarkerComponent from './imageMarker';
import previewImage from '../../../images/previewImage.png';

function FloorModal({
  open, setOpen, isAddButton, editData, location_id, branch_id, facility_id, building_id, setRefreshData, src,
}) {
  const [floorName, setFloorName] = useState('');
  const [floorStage, setFloorStage] = useState(0);
  const [floorMap, setFloorMap] = useState({});
  const [floorCords, setFloorCords] = useState('');
  const [locationId, setLocationId] = useState(location_id);
  const [branchId, setBranchId] = useState(branch_id);
  const [facilityId, setFacilityId] = useState(facility_id);
  const [buildingId, setBuildingId] = useState(building_id);
  const [floorId, setFloorId] = useState('');
  const [previewFloor, setPreviewFloor] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    if (editData) {
      setOpen(open);
      loaddata();
    }
  }, [editData]);

  const loaddata = () => {
    setFloorName(editData.floorName || '');
    setFloorId(editData.id || '');
    setFloorStage(editData.floorStage || '');
    setFloorCords(editData.floorCords || '');
    setPreviewFloor(editData.floorMap ? `${process.env.REACT_APP_IMAGE_BASE_URL}/${editData.floorMap}` : previewImage);
    // setFloorMap(editData.floorMap || '');
    // setFloorCords(editData.floorCords || []);
  };

  // http://192.168.1.94:8000/building/3b3de7f3-a5ab-4555-ad16-c9757c3a008f.png
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(longitude == '' || latitude == ''){
    //     setErrorObject(oldErrorState => {
    //         let status = {}
    //         status = {
    //             errorStatus: true,
    //             helperText: 'Please choose the points in Map'
    //         }
    //         return {
    //             ...oldErrorState,
    //             coordinates: status
    //         }
    //     });
    // }
    // else{
    if (isAddButton) {
      // alert(floorCords+"\n"+floorName+"\n"+floorStage +"\n"+location_id+"\n"+branch_id+"\n"+facility_id+"\n"+building_id);
      await FloorAddService({
        floor_name: floorName, floor_number: floorStage, image: floorMap, floorCords, locationId, branchId, facilityId, buildingId,
      }, handleSuccess, handleException);
    } else {
      await FloorEditService({
        floor_name: floorName, floor_number: floorStage, image: floorMap, floorCords, locationId, branchId, facilityId, buildingId, floorId,
      }, handleSuccess, handleException);
    }
    // }
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

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };
  const onMapClick = (e) => {
    delete errorObject.coordinates;
    // setLongitude(e.latLng.lat());
    // setLatitude(e.latLng.lng());
  };
  const validateForNullValue = (value, type) => {
    LocationFormValidate(value, type, setErrorObject);
  };

  const setFloorCoordinations = (value, direction) => {
    const cord = `${value.top},${value.left},${direction}`;
    setFloorCords(cord); // Error not yet solved
    // setFloorCords(oldArray => [...oldArray,direction]); // Error not yet solved

    // let cord = value.top+","+value.left;
    // setFloorCords(cord); // Error not yet solved
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
          message: 'Please select an image (Supported type : .jpeg/.png)',
        });
      }
    }
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isAddButton ? 'Add Floor' : 'Edit Floor'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="flex flex-col w-full">
                <div className="w-full sm:float-left pr-3 pl-3">
                  <div className='flex w-full gap-7 min-[320px]:flex-col min-[768px]:flex-row'>
                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Floor Name"
                        type="text"
                        value={floorName}
                        variant="outlined"
                        placeholder="Please enter Floor name"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                        required
                        onBlur={() => validateForNullValue(floorName, 'buildingName')}
                        onChange={(e) => { setFloorName(e.target.value); }}
                        autoComplete="off"
                        error={errorObject?.buildingName?.errorStatus}
                        helperText={errorObject?.buildingName?.helperText}
                      />
                    </div>

                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        sx={{ mb: 1 }}
                        label="Floor number"
                        type="number"
                        value={floorStage}
                        variant="outlined"
                        placeholder="Please enter Floor number"
                        className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                        required
                        onBlur={() => validateForNullValue(floorStage, 'buildingTotalFloors')}
                        onChange={(e) => { setFloorStage(e.target.value); }}
                        autoComplete="off"
                        error={errorObject?.buildingTotalFloors?.errorStatus}
                        helperText={errorObject?.buildingTotalFloors?.helperText}
                      // InputLabelProps={{
                      //     shrink: true,
                      // }}
                      />
                    </div>

                    <div className="rounded-md -space-y-px mb-2 w-full">
                      <TextField
                        fullWidth
                        label="Floor Image"
                        required={!!isAddButton}
                        onBlur={() => {
                          validateForNullValue(floorMap, 'buildingImg');
                        }}
                        onChange={(e) => {
                          // setCustomerLogo(e.target.files);
                          if (e.target.files && e.target.files.length > 0) {
                            setFloorMap(e.target.files[0]);
                            processImageFile(e.target.files[0]);
                            // const reader = new FileReader();
                            // reader.readAsDataURL(e.target.files[0]);
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setFloorMap(reader.result);
                                setPreviewFloor(reader.result);
                                // setImgdata(reader.result);
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
                  <div className="flex justify-between items-center gap-10 mt-3">
                    <Grid container spacing={2}>
                      {/* First div for the image (6 columns) */}
                      <Grid item xs={12} md={6} lg={6}>
                        <div className="rounded-md" style={{ border: '2px black solid' }}>
                          <img src={previewFloor || previewImage} className="w-full h-auto" alt="Floor Preview" />
                        </div>
                      </Grid>

                      {/* Second div for the ImageMarkerComponent (6 columns) */}
                      <Grid item xs={12} md={6} lg={6}>
                        <div className="w-full pr-1">
                          <ImageMarkerComponent
                            src={src}
                            width="100%"
                            setFloorCoordinations={setFloorCoordinations}
                            floorCords={floorCords}
                            isAddButton={isAddButton}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>


                </div>
              </div>
            </div>

            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  sx={{ m: 1 }}
                  type="submit"
                  size="large"
                  disabled={errorObject?.buildingName?.errorStatus || errorObject?.buildingTotalFloors?.errorStatus}
                >
                  {isAddButton ? 'Add' : 'Update'}
                </Button>
                <Button
                  sx={{ m: 1 }}
                  size="large"
                  onClick={(e) => {
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

export default FloorModal;
