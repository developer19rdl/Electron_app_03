// import {
//   Button, Box, Dialog, DialogContent, DialogTitle, TextField, Grid, InputAdornment, IconButton,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { CustomerAddService, CustomerEditService, UnblockUserService } from '../../services/LoginPageService';
// import { AddCustomerValidate } from '../../validation/formValidation';
// import NotificationBar from '../notification/ServiceNotificationBar';
// import previewImage from '../../images/previewImageSmall.png';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// function CustomerModal({
//   open, setOpen, isAddButton, customerData, setRefreshData,
// }) {
//   const [id, setId] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [email, setEmail] = useState('');

//   const [phoneNo, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [customerId, setCustomerID] = useState('');
//   const [customerLogo, setCustomerLogo] = useState('');
//   const [previewBuilding, setPreviewBuilding] = useState('');
//   const [password, setConfirmPassword] = useState('');
//   const [btnReset, setBtnReset] = useState(false);
//   const [errorObject, setErrorObject] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const [openNotification, setNotification] = useState({
//     status: false,
//     type: 'error',
//     message: '',
//   });

//   useEffect(() => {
//     setOpen(open);
//     loadData();
//   }, [customerData]);

//   const loadData = () => {
//     setId(customerData.id || '');
//     setCustomerName(customerData.customerName || '');
//     setEmail(customerData.email || '');
//     setPhone(customerData.phoneNo || '');
//     setAddress(customerData.address || '');
//     setCustomerID(customerData.customerId || '');

//     setPreviewBuilding(
//       customerData.customerLogo
//         ? `http://192.168.1.94:8000/${customerData.customerLogo}?${new Date().getTime()}`
//         : previewImage
//     );


//     setCustomerLogo('');
//   };

//   const validateForNullValue = (value, type) => {
//     AddCustomerValidate(value, type, setErrorObject);
//   };

//   const handleSuccess = (dataObject) => {
//     setRefreshData((oldvalue) => !oldvalue);
//     setNotification({
//       status: true,
//       type: 'success',
//       message: dataObject.message,
//     });
//     setTimeout(() => {
//       handleClose();
//       setOpen(false);
//     }, 5000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isAddButton) {
//       CustomerAddService({
//         customerName, email, phoneNo, address, customerId, customerLogo
//       }, handleSuccess, handleException);
//     } else {
//       CustomerEditService({
//         id, customerName, email, phoneNo, address, customerId, customerLogo
//       }, handleSuccess, handleException);
//     }
//   };

//   const handleException = (errorObject, errorMessage) => {
//     setNotification({
//       status: true,
//       type: 'error',
//       message: errorMessage,
//     });
//     setTimeout(() => {
//       handleClose();
//     }, 5000);
//   };

//   // const passwordSubmit = (e) => {
//   //   e.preventDefault();
//   //   UnblockUserService({ email, password, id }, passwordValidationSuccess, passwordValidationException);
//   //   setBtnReset(false);
//   // };
//   // const passwordValidationSuccess = (dataObject) => {
//   //   setNotification({
//   //     status: true,
//   //     type: 'success',
//   //     message: dataObject.message,
//   //   });
//   //   setTimeout(() => {
//   //     handleClose();
//   //   }, 5000);
//   // };

//   // const passwordValidationException = (errorObject, errorMessage) => {
//   //   setNotification({
//   //     status: true,
//   //     type: 'error',
//   //     message: errorMessage,
//   //   });
//   //   setTimeout(() => {
//   //     handleClose();
//   //   }, 5000);
//   // };

//   const handleClose = () => {
//     setNotification({
//       status: false,
//       type: '',
//       message: '',
//     });
//   };

//   // const handleClickShowPassword = () => {
//   //   setShowPassword(!showPassword);
//   // };

//   // const handleMouseDownPassword = (event) => {
//   //   event.preventDefault();
//   // };

//   return (
//     <Dialog
//       sx={{ '& .MuiDialog-paper': { width: '72%', maxHeight: '100%' } }}
//       maxWidth="lg"
//       open={open}
//     >
//       <DialogTitle>
//         {isAddButton ? 'Add Customer' : 'Edit Customer'}
//       </DialogTitle>
//       <DialogContent>
//         <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md  -space-y-px ">
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <div className="rounded-md -space-y-px mb-2">
//                   <TextField
//                     sx={{ mb: 1 }}
//                     label="Customer Name"
//                     type="text"
//                     value={customerName}
//                     variant="outlined"
//                     placeholder="Customer Name"
//                     /* eslint-disable-next-line */
//                     className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
//                     required
//                     onBlur={() => validateForNullValue(customerName, 'fullName')}
//                     onChange={(e) => { setCustomerName(e.target.value); }}
//                     autoComplete="off"
//                     error={errorObject?.fullName?.errorStatus}
//                     helperText={errorObject?.fullName?.helperText}
//                   />
//                 </div>
//               </Grid>
//               <Grid item xs={6}>
//                 <div className="rounded-md -space-y-px">
//                   <div className="mb-2">
//                     <TextField
//                       sx={{ mb: 1 }}
//                       label="Customer Id"
//                       type="text"
//                       value={customerId}
//                       variant="outlined"
//                       placeholder="Customer Id"
//                       disabled={isAddButton ? false : true}
//                       /* eslint-disable-next-line */
//                       className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
//                       required
//                       onBlur={() => validateForNullValue(customerId, 'customerID')}
//                       onChange={(e) => setCustomerID(e.target.value)}
//                       autoComplete="off"
//                       error={errorObject?.customerID?.errorStatus}
//                       helperText={errorObject?.customerID?.helperText}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item xs={6}>
//                 <div className="rounded-md -space-y-px">
//                   <div className="mb-2">
//                     <TextField
//                       sx={{ mb: 1 }}
//                       label="Customer Email Id"
//                       type="email"
//                       value={email}
//                       variant="outlined"
//                       placeholder="Customer Email Id"
//                       /* eslint-disable-next-line */
//                       className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
//                       required
//                       onBlur={() => { validateForNullValue(email, 'email'); }}
//                       onChange={(e) => { setEmail(e.target.value); }}
//                       autoComplete="off"
//                       error={errorObject?.emailID?.errorStatus}
//                       helperText={errorObject?.emailID?.helperText}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item xs={6}>
//                 <div className="rounded-md -space-y-px">
//                   <div className="mb-2">
//                     <TextField
//                       sx={{ mb: 1 }}
//                       label="Phone number"
//                       type="number"
//                       value={phoneNo}
//                       variant="outlined"
//                       placeholder="Phone number"
//                       /* eslint-disable-next-line */
//                       className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
//                       required
//                       onBlur={() => validateForNullValue(phoneNo, 'phone')}
//                       onChange={(e) => { setPhone(e.target.value); }}
//                       autoComplete="off"
//                       error={errorObject?.phone?.errorStatus}
//                       helperText={errorObject?.phone?.helperText}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item xs={12}>
//                 <div className="rounded-md -space-y-px">
//                   <div className="mb-2">
//                     <TextField
//                       sx={{ mb: 1 }}
//                       label="Address"
//                       type="text"
//                       value={address}
//                       variant="outlined"
//                       placeholder="Address"
//                       /* eslint-disable-next-line */
//                       className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500  sm:text-sm"
//                       required
//                       onBlur={() => validateForNullValue(address, 'address')}
//                       onChange={(e) => setAddress(e.target.value)}
//                       autoComplete="off"
//                       error={errorObject?.address?.errorStatus}
//                       helperText={errorObject?.address?.helperText}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item xs={9}>
//                 <div className="col-span-12 sm:col-span-8 lg:col-span-8">
//                   <div className="mb-2 block">
//                     <TextField
//                       fullWidth
//                       label="Company Logo"
//                       onBlur={() => {
//                         validateForNullValue(customerLogo, 'customerLogo');
//                       }}
//                       onChange={(e) => {
//                         if (e.target.files && e.target.files.length > 0) {
//                           const reader = new FileReader();
//                           reader.onload = () => {
//                             if (reader.readyState === 2) {
//                               setCustomerLogo(reader.result);
//                               setPreviewBuilding(reader.result);
//                             }
//                           };
//                           reader.readAsDataURL(e.target.files[0]);
//                         }
//                       }}
//                       InputLabelProps={{ shrink: true }}
//                       type="file"
//                       inputProps={{
//                         accept: 'image/png',
//                       }}
//                       error={errorObject?.customerLogo?.errorStatus}
//                       helperText={errorObject?.customerLogo?.helperText}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item xs={3}>
//                 <div className="col-span-12 sm:col-span-2 lg:col-span-2">
//                   <div className="mb-2 block">
//                     <Box
//                       component="img"
//                       sx={{
//                         height: 100,
//                         width: 100,
//                         maxHeight: { xs: 233, md: 167 },
//                         maxWidth: { xs: 150, md: 150 },
//                       }}
//                       alt="The Customer Buidling Image"
//                       src={previewBuilding || previewImage}
//                     />
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//             <div className="rounded-md -space-y-px float-right">
//               {/* {isAddButton ? ''
//                 : (
//                   <Button
//                     onClick={() => {
//                       setBtnReset(true);
//                     }}
//                   >
//                     Reset Password
//                   </Button>
//                 )} */}
//               <Button
//                 type="submit"
//               /* eslint-disable-next-line */
//               // disabled={errorObject?.fullName?.errorStatus || errorObject?.emailID?.errorStatus || errorObject?.phone?.errorStatus || errorObject?.address?.errorStatus || errorObject?.customerID?.errorStatus || errorObject?.customerTheme?.errorStatus || errorObject?.customerLogo?.errorStatus}
//               >
//                 {isAddButton ? 'Add' : 'Update'}
//               </Button>
//               <Button
//                 /* eslint-disable-next-line */
//                 onClick={(e) => {
//                   setOpen(false);
//                   setErrorObject({});
//                   loadData();
//                 }}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </form>
//       </DialogContent>
//       {/* <Dialog
//         maxWidth="sm"
//         open={btnReset}
//       >
//         <DialogTitle>
//           Confirm your password
//         </DialogTitle>
//         <DialogContent>
//           <form onSubmit={passwordSubmit}>
//             <div className="col-span-6 sm:col-span-2 lg:col-span-2 ">
//               <div className="inline">
//                 <TextField
//                   placeholder="Enter your password"
//                   type="password"
//                   required
//                   onChange={(e) => {
//                     setConfirmPassword(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="mt-3 ml-2 float-right">
//               <Button
//                 onClick={() => {
//                   setBtnReset(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog> */}
//       <NotificationBar
//         handleClose={handleClose}
//         notificationContent={openNotification.message}
//         openNotification={openNotification.status}
//         type={openNotification.type}
//       />
//     </Dialog>
//   );
// }

// export default CustomerModal;

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  CustomerAdd,

  CustomerEdit,
  customerIdShow,

} from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';

/* -------------------- CONSTANTS -------------------- */

const durationOptions = [
  { label: 'Monthly', value: 'monthly', months: 1 },
  { label: 'Quarterly', value: 'quarterly', months: 3 },
  { label: 'Yearly', value: 'yearly', months: 12 },
];

const categoryOptions = [
  { label: 'Standard', value: 'standard' },
  { label: 'Premium', value: 'premium' },
  { label: 'Enterprise', value: 'enterprise' },
];

/* -------------------- COMPONENT -------------------- */

function CustomerModal({
  open,
  setOpen,
  isAddButton,
  customerData = {},
  setRefreshData,
}) {
  const [id, setId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');

  const [errors, setErrors] = useState({});

  const [notification, setNotification] = useState({
    status: false,
    type: '',
    message: '',
  });

  /* -------------------- LOAD DATA -------------------- */

  useEffect(() => {
    if (!open) return;

    setId(customerData.id || '');
    setCustomerId(customerData.custId || '');
    setCustomerName(customerData.customerName || '');
    setCategory(customerData.category || '');
    setDuration(customerData.duration || '');
    setRenewalDate(customerData.renewalDate || '');
    setPrimaryEmail(customerData.email || '');
    setAlternateEmail(customerData.alternativeEmail || '');
    setPrimaryPhone(customerData.primaryNo || '');
    setAlternatePhone(customerData.secondaryNo || '');
    customerIdShow(handleIdSuccess, handleIdExException);
  }, [customerData, open]);

  /* -------------------- HELPERS -------------------- */
  const handleIdSuccess = (dataObject) => {
    if (isAddButton) {
      setCustomerId(dataObject?.data?.customerId || '');
    }
  }
  const handleIdExException = () => { }



  const calculateRenewalDate = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0];
  };

  const validateField = (name, value) => {
    let message = '';

    switch (name) {
      case 'customerId':
        if (!value) message = 'Customer ID is required';
        break;

      case 'customerName':
        if (!value) message = 'Customer Name is required';
        break;

      case 'category':
        if (!value) message = 'Please select category';
        break;

      case 'duration':
        if (!value) message = 'Please select duration';
        break;

      case 'primaryEmail':
        if (!value) {
          message = 'Primary email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Enter valid email';
        }
        break;

      case 'alternateEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Enter valid email';
        }
        break;

      case 'primaryPhone':
        if (!value) {
          message = 'Primary phone is required';
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          message = 'Enter valid 10 digit number';
        }
        break;

      case 'alternatePhone':
        if (value && !/^[6-9]\d{9}$/.test(value)) {
          message = 'Enter valid 10 digit number';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return !message;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);
    validateField('duration', value);

    const selected = durationOptions.find((d) => d.value === value);
    if (selected) {
      setRenewalDate(calculateRenewalDate(selected.months));
    }
  };

  /* -------------------- SUBMIT -------------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      validateField('customerId', customerId) &
      validateField('customerName', customerName) &
      validateField('category', category) &
      validateField('duration', duration) &
      validateField('primaryEmail', primaryEmail) &
      validateField('primaryPhone', primaryPhone);

    if (!isValid) return;

    const payload = {
      customerId,
      customerName,
      category,
      duration,
      renewalDate,
      primaryEmail,
      alternateEmail,
      primaryPhone,
      alternatePhone,
    };

    if (isAddButton) {
      CustomerAdd(payload, handleSuccess, handleError);
    } else {
      CustomerEdit({ ...payload, id }, handleSuccess, handleError);
    }
  };

  const handleSuccess = (res) => {
    setNotification({
      status: true,
      type: 'success',
      message: res.message,
    });
    setRefreshData((p) => !p);
    setTimeout(() => setOpen(false), 2000);
  };

  const handleError = (_, message) => {
    setNotification({
      status: true,
      type: 'error',
      message,
    });
  };

  /* -------------------- UI -------------------- */

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      <DialogTitle>{isAddButton ? 'Add Customer' : 'Edit Customer'}</DialogTitle>

      <DialogContent style={{ paddingTop: 6 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Customer ID"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.customerId}
                helperText={errors.customerId}
                disabled={isAddButton}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.customerName}
                helperText={errors.customerName}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.category}
                helperText={errors.category}
              >
                {categoryOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Duration"
                name="duration"
                value={duration}
                onChange={handleDurationChange}
                onBlur={handleBlur}
                error={!!errors.duration}
                helperText={errors.duration}
              >
                {durationOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Renewal Date"
                type="date"
                value={renewalDate}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Primary Email"
                name="primaryEmail"
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.primaryEmail}
                helperText={errors.primaryEmail}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Alternate Email"
                name="alternateEmail"
                value={alternateEmail}
                onChange={(e) => setAlternateEmail(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.alternateEmail}
                helperText={errors.alternateEmail}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Primary Phone"
                name="primaryPhone"
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.primaryPhone}
                helperText={errors.primaryPhone}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Alternate Phone"
                name="alternatePhone"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.alternatePhone}
                helperText={errors.alternatePhone}
              />
            </Grid>

            <Grid item xs={12} textAlign="right">
              <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {isAddButton ? 'Add' : 'Update'}
              </Button>
            </Grid>

          </Grid>
        </form>
      </DialogContent>

      <NotificationBar
        openNotification={notification.status}
        type={notification.type}
        notificationContent={notification.message}
        handleClose={() =>
          setNotification({ status: false, type: '', message: '' })
        }
      />
    </Dialog>
  );
}

export default CustomerModal;


