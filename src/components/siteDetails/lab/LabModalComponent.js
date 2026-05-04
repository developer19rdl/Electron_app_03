import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LabAddService, LabEditService } from '../../../services/LoginPageService';
import { LocationFormValidate } from '../../../validation/locationValidation';
import ImageMarkerComponent from './imageMarker';
// import ImageMarkerComponent from '../../maps/imageMarker';
import { LabFormValidate } from '../../../validation/locationValidation';
import NotificationBar from '../../notification/ServiceNotificationBar';
import previewImage from '../../../images/previewImage.png';

function LabModal({
  open, setOpen, isAddButton, editData, location_id, branch_id, facility_id, building_id, floor_id, setRefreshData, img,
}) {
  const [zoneName, setZoneName] = useState('');
  const [zoneMap, setZoneMap] = useState({});
  const [labCoordinates, setLabCords] = useState('');
  const [locationId, setLocationId] = useState(location_id);
  const [branchId, setBranchId] = useState(branch_id);
  const [facilityId, setFacilityId] = useState(facility_id);
  const [buildingId, setBuildingId] = useState(building_id);
  const [floorId, setFloorId] = useState(floor_id);
  const [zoneId, setZoneId] = useState('');
  const [previewLab, setPreviewLab] = useState('');
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
    setZoneName(editData.zoneName || '');
    setZoneId(editData.id || '');
    setLabCords(editData.zoneCords || '');
    setPreviewLab(editData.zoneMap ? `${process.env.REACT_APP_IMAGE_BASE_URL}/${editData.zoneMap}` : previewImage);
  };
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
    // const zoneCords = labCoordinates ? JSON.stringify(labCoordinates) : editData.zoneCords;
    if (isAddButton) {
      await LabAddService({
        zone_name: zoneName, zoneMap: zoneMap, locationId, branchId, facilityId, buildingId, floorId,
      }, handleSuccess, handleException);
    } else {
      await LabEditService({
        zone_name: zoneName, zoneMap: zoneMap, locationId, branchId, facilityId, buildingId, floorId, zoneId,
      }, handleSuccess, handleException);
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

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setErrorObject({});
  };

  const validateForNullValue = (value, type) => {
    // LocationFormValidate(value, type, setErrorObject);
    LabFormValidate(value, type, setErrorObject);
  };

  const setFloorCoordinations = (value) => {
    const newcoordinates = [{
      left: value.left,
      top: value.top,
    }];
    setLabCords((prevCoordinates) => [...prevCoordinates, ...newcoordinates]);
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
      <DialogTitle>
        {isAddButton ? 'Add Zone' : 'Edit Zone'}
      </DialogTitle>
      <DialogContent>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px ">
            <div className="container mx-auto outline-black">
              <div className="inline">
                <div className="w-full sm:float-left lg:w-2/5  pr-3 pl-3">
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      sx={{ mb: 1 }}
                      label="Zone Name"
                      type="text"
                      value={zoneName}
                      variant="outlined"
                      placeholder="Please enter Floor name"
                      className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
                      required
                      onBlur={() => validateForNullValue(zoneName, 'labDepName')}
                      onChange={(e) => { setZoneName(e.target.value); }}
                      autoComplete="off"
                      error={errorObject?.zoneName?.errorStatus}
                      helperText={errorObject?.zoneName?.helperText}
                    />
                  </div>
                  <div className="rounded-md -space-y-px mb-2">
                    <TextField
                      fullWidth
                      label="Zone Image"
                      required={!!isAddButton}
                      onBlur={() => {
                        validateForNullValue(zoneMap, 'buildingImg');
                      }}
                      onChange={(e) => {
                        // setCustomerLogo(e.target.files);
                        if (e.target.files && e.target.files.length > 0) {
                          setZoneMap(e.target.files[0]);
                          processImageFile(e.target.files[0]);
                          // const reader = new FileReader();
                          // reader.readAsDataURL(e.target.files[0]);
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setZoneMap(reader.result);
                              setPreviewLab(reader.result);
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
                  <div className="rounded-md -space-y-px mb-2" style={{ border: '2px black solid' }}>
                    <img src={previewLab} style={{ width: '-webkit-fill-available' }} />
                  </div>
                </div>
                <div className="w-full sm:float-right lg:float-left lg:w-3/5 pr-1">
                  <ImageMarkerComponent
                    src={img}
                    height="500px"
                    width="500px"
                    setFloorCoordinations={setFloorCoordinations}
                    floorCords={labCoordinates}
                    setLabCords={setLabCords}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                  sx={{ m: 1 }}
                  type="submit"
                  size="large"
                  disabled={errorObject?.zoneName?.errorStatus}
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

export default LabModal;
