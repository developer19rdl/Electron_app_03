import {
  Button, Grid, Dialog, DialogContent, DialogTitle, TextField, Select, FormControl, MenuItem, InputLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { AssetAddService, AssetEditService, AssetTypeFetchService } from '../../../../services/LoginPageService';
// import { AddVendorValidate } from '../../../../validation/locationValidation';
import NotificationBar from '../../../notification/ServiceNotificationBar';
/* eslint-disable-next-line */

function AssetModal({
  open, setOpen, isAddButton, configSetupData, setRefreshData, handleClose, openNotification, setNotification
}) {
  const [id, setId] = useState('');

  // AccessPoint inputs
  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [areaName, setAreaName] = useState('');


  // FTP inputs
  const [motorDetails, setMotorDetails] = useState('');
  const [rpsv, setRpsv] = useState('');
  const [ratedCurrent, setRatedCurrent] = useState('');
  const [motorTypeVariableSpeed, setMotorTypeVariableSpeed] = useState('');
  const [lineFrequency, setLineFrequency] = useState('');
  const [efficiency, setEfficiency] = useState('');

  const [assetTypeId, setAssetTypeId] = useState('');
  const [assetTypeList, setAssetTypeList] = useState([]);



  useEffect(() => {
    setOpen(open);
    loadData();
    // AssetTypeFetchService(categoryHandleSuccess, handleAssetTypeException);
  }, [configSetupData]);

  useEffect(() => {
    AssetTypeFetchService(categoryHandleSuccess, handleAssetTypeException);
  }, []);


  const categoryHandleSuccess = (dataObject) => {
    setAssetTypeList(dataObject.data);
    console.log(dataObject.data);
  };
  const handleAssetTypeException = (errorObject) => {

  };


  const loadData = () => {
    setId(configSetupData.id || '');
    setAssetName(configSetupData.assetName || '');
    // setAssetType(configSetupData.assetTypeName || '');
    setAssetDescription(configSetupData.assetDescription || '');


    // if (Array.isArray(configSetupData)) {
    //   setAssetTypeList(configSetupData);
    // } else {
    //   setAssetTypeList([]);
    // }

    setAssetTypeId(configSetupData.assetTypeid || '');

  };


  const clearForm = () => {
    setId('');

    setAssetName('');
    // setAssetType('');
    setAreaName('');

    setMotorDetails('');
    setRpsv('');
    setRatedCurrent('');
    setMotorTypeVariableSpeed('');
    setLineFrequency('');
    setEfficiency('');
    setAssetTypeId('');

  }

  /* eslint-disable-next-line */
  const validateForNullValue = (value, type) => {
    AddVendorValidate(value, type, setErrorObject);
  };

  const handleAddSuccess = (dataObject) => {
    clearForm();
    handleSuccess(dataObject);
    setOpen(false);

  }

  const handleUpdateSuccess = (dataObject) => {
    handleSuccess(dataObject);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
  };

  /* eslint-disable-next-line */
  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAddButton) {
      await AssetAddService({
        /* eslint-disable-next-line */
        assetName, assetTypeid: assetTypeId, assetDescription

      }, handleAddSuccess, handleException);
    } else {
      await AssetEditService({
        /* eslint-disable-next-line */
        id, assetName, assetTypeid: assetTypeId, assetDescription

      }, handleUpdateSuccess, handleException);
    }
  };


  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center', }}>
          {isAddButton ? 'Add Asset' : 'Edit Asset'}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <TextField
                value={assetName}
                margin="dense"
                id="outlined-basic"
                label="Asset Name"
                variant="outlined"
                fullWidth
                // required
                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                onChange={(e) => { setAssetName(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>

              {/* <Box sx={{ minWidth: 250 }}> */}
              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">
                  Asset Category
                </InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assetTypeId}
                  label="Asset Category"
                  // onBlur={() => { validateForNullValue(deviceCategory, 'deviceCategory')}}
                  onChange={(e) => {
                    setAssetTypeId(e.target.value);
                  }}
                // error={errorObject?.deviceCategory?.errorStatus}
                // helperText={errorObject?.deviceCategory?.helperText}
                >
                  {assetTypeList.map((data) => {
                    return (
                      <MenuItem value={data.id}>{data.assetTypeName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* </Box> */}
              {/* <TextField
                value={assetType}
                margin="dense"
                id="outlined-basic"
                label="Asset Type"
                variant="outlined"
                fullWidth
                // required
                // onBlur={() =>validateForNullValue(assetType, 'assetType')}
                onChange={(e) => { setAssetType(e.target.value); }}
                autoComplete="off"
              /> */}
            </Grid>
            {/* <Grid item xs={6}>
              <TextField
                value={areaName}
                margin="dense"
                id="outlined-basic"
                label="Area Name"
                // type="password"
                variant="outlined"
                fullWidth
                // required
                // onBlur={() =>validateForNullValue(areaName, 'areaName')}
                onChange={(e) => { setAreaName(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={motorDetails}
                margin="dense"
                id="outlined-basic"
                label="Motor Details"
                variant="outlined"
                fullWidth
                required
                // onBlur={() =>validateForNullValue(motorDetails, 'motorDetails')}
                onChange={(e) => { setMotorDetails(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>

              <TextField
                value={rpsv}
                margin="dense"
                id="outlined-basic"
                label="PowerRated SpeedRated Voltage"
                variant="outlined"
                required
                //  onBlur={() =>validateForNullValue(rpsv, 'rpsv')}
                onChange={(e) => { setRpsv(e.target.value); }}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={ratedCurrent}
                margin="dense"
                id="outlined-basic"
                // type="password"
                label="Rated Current"
                variant="outlined"
                fullWidth
                required
                //  onBlur={() =>validateForNullValue(ratedCurrent, 'ratedCurrent')}
                onChange={(e) => { setRatedCurrent(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={motorTypeVariableSpeed}
                margin="dense"
                id="outlined-basic"
                label="Motor Type Variable Speed"
                variant="outlined"
                fullWidth
                required
                //  onBlur={() =>validateForNullValue(motorTypeVariableSpeed, 'motorTypeVariableSpeed')}
                onChange={(e) => { setMotorTypeVariableSpeed(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={lineFrequency}
                margin="dense"
                id="outlined-multiline-flexible"
                label="Line Frequency"
                multiline
                maxRows={4}
                fullWidth
                required
                // onBlur={() =>validateForNullValue(lineFrequency, 'lineFrequency')}
                onChange={(e) => { setLineFrequency(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={efficiency}
                margin="dense"
                id="outlined-basic"
                label="Efficiency"
                variant="outlined"
                fullWidth
                required
                //  onBlur={() =>validateForNullValue(efficiency, 'efficiency')}
                onChange={(e) => { setEfficiency(e.target.value); }}
                autoComplete="off"
              />
            </Grid> */}
            <Grid item xs={6}>

              <TextField
                value={assetDescription}
                margin="dense"
                id="outlined-basic"
                label="Asset Description"
                variant="outlined"
                fullWidth
                // required
                // onBlur={() =>validateForNullValue(assetName, 'assetName')}
                onChange={(e) => { setAssetDescription(e.target.value); }}
                autoComplete="off"
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
          <Button
            size="large"
            autoFocus
            onClick={() => {
              setOpen(false);
              // setErrorObject({});
              loadData();
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="submit"
          >
            {' '}
            {isAddButton ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </form >
    </Dialog >
  );
}

export default AssetModal;