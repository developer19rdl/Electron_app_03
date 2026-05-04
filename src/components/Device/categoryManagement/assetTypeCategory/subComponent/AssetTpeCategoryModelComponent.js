import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validation/formValidation';
import { AssetTypeAddService, AssetTypeEditService, CategoryAddService, CategoryEditService } from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';

function AssetTypeModel({
  open, setOpen, isAddButton, categoryData, setRefreshData, handleClose, openNotification, setNotification
}) {
  const [id, setId] = useState('');
  const [assetType, setAssetType] = useState('');
  const [description, setDescription] = useState('');
  const [errorObject, setErrorObject] = useState({});

  // const [openNotification, setNotification] = useState({
  //   status: false,
  //   type: 'error',
  //   message: '',
  // });

  useEffect(() => {
    setOpen(open);
    loadData();
  }, [categoryData]);

  const loadData = () => {
    setId(categoryData.id || '');
    setAssetType(categoryData.assetTypeName || '');
    setDescription(categoryData.assetTypeDesc || '');
  };

  const validateForNullValue = (value, type) => {
    AddCategoryValidate(value, type, setErrorObject);
  };

  const handleAddSuccess = (dataObject) => {
    handleSuccess(dataObject);
    clearForm();
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

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };


  const clearForm = () => {
    setId('');
    setAssetType('');
    setDescription('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      AssetTypeAddService({ assetTypeName: assetType, assetTypeDesc: description }, handleAddSuccess, handleException);
    } else {
      AssetTypeEditService({ id, assetTypeName: assetType, assetTypeDesc: description }, handleUpdateSuccess, handleException);
    }
  };

  // const handleClose = () => {
  //   setNotification({
  //     status: false,
  //     type: '',
  //     message: '',
  //   });
  // };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
          {isAddButton ? 'Add Asset Category' : 'Edit Asset Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="outlined-required"
            label="Asset Type Name"
            defaultValue=""
            fullWidth
            value={assetType}
            required
            onBlur={() => validateForNullValue(assetType, 'categoryName')}
            onChange={(e) => { setAssetType(e.target.value); }}
            autoComplete="off"
            error={errorObject?.assetType?.errorStatus}
            helperText={errorObject?.assetType?.helperText}
          />
          <TextField
            id="dense"
            label="Asset Type Descriptions"
            multiline
            margin="dense"
            maxRows={4}
            fullWidth
            value={description}
            required
            onBlur={() => validateForNullValue(description, 'categoryDescription')}
            onChange={(e) => { setDescription(e.target.value); }}
            autoComplete="off"
            error={errorObject?.description?.errorStatus}
            helperText={errorObject?.description?.helperText}
          />
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
          <Button
            size="large"
            autoFocus
            onClick={(e) => {
              setOpen(false);
              setErrorObject({});
              loadData();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={errorObject?.assetType?.errorStatus || errorObject?.description?.errorStatus}
            size="large"
            type="submit"
          >
            {' '}
            {isAddButton ? 'Add' : 'Update'}
          </Button>

        </DialogActions>
      </form>
      {/* <NotificationBar
        hideLimit={3000}
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      /> */}
    </Dialog>
  );
}

export default AssetTypeModel;
