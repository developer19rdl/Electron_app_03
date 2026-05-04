import {
  Button, Dialog, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { AddCategoryValidate } from '../../../../../validation/formValidation';
import { DeviceCategoryAddService, DeviceCategoryEditService } from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';

function CategoryModel({
  open, setOpen, isAddButton, categoryData, setRefreshData, handleClose, openNotification, setNotification
}) {
  const [id, setId] = useState('');
  const [deviceCategory, setDeviceCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errorObject, setErrorObject] = useState({});


  useEffect(() => {
    setOpen(open);
    loadData();
  }, [categoryData]);

  const loadData = () => {
    setId(categoryData.id || '');
    setDeviceCategory(categoryData.cateName || '');
    setDescription(categoryData.cateDesc || '');
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
    setDeviceCategory('');
    setDescription('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddButton) {
      DeviceCategoryAddService({ cateName: deviceCategory, cateDesc: description }, handleAddSuccess, handleException);
    } else {
      DeviceCategoryEditService({ id, cateName: deviceCategory, cateDesc: description }, handleUpdateSuccess, handleException);
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
        <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
          {isAddButton ? 'Add Device Category' : 'Edit Device Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="outlined-required"
            label="Device Category Name"
            defaultValue=""
            fullWidth
            value={deviceCategory}
            required
            onBlur={() => validateForNullValue(deviceCategory, 'deviceCategory')}
            onChange={(e) => { setDeviceCategory(e.target.value); }}
            autoComplete="off"
            error={errorObject?.deviceCategory?.errorStatus}
            helperText={errorObject?.deviceCategory?.helperText}
          />
          <TextField
            id="dense"
            label=" Device Category Descriptions"
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
            disabled={errorObject?.deviceCategory?.errorStatus || errorObject?.description?.errorStatus}
            size="large"
            type="submit"
          >
            {' '}
            {isAddButton ? 'Add' : 'Update'}
          </Button>

        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CategoryModel;
