import { Delete } from '@mui/icons-material';
import {
  Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Stack, Chip,
  Card,
  CardContent,
  Paper,
  CardHeader,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useUserAccess } from '../../../context/UserAccessProvider';
import { SensorIdAlertUpdate, meterIdAlertUpdate } from '../../../services/LoginPageService';
import ApplicationStore from '../../../utils/localStorageUtil';
import { setAlertPriorityStatus } from '../../../utils/helperFunctions';

/* eslint-disable no-unused-vars */
function AlertWidget({
  dataList, setRefreshData, maxHeight, setAlertList, setNotification, alertOpen, isdatalist,
}) {
  const [clearAlert, setClearAlert] = useState(false);
  const [clearAlertReason, setAlertReason] = useState('');
  const [meterId, setMeterId] = useState('');
  const [errorObject, setErrorObject] = useState({});
  const moduleAccess = useUserAccess()('dashboard');
  const convertDateTime = (value) => {
    const dateSplit = value.split('-');
    const date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    return date;
  };
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const columns = [
    {
      field: 'loc_name',
      headerName: 'Location',
      // width: 100,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // renderCell: (params) => (
      //   <Typography>
      //     {
      //       convertDateTime(params.value)
      //     }
      //   </Typography>
      // ),
    },
    {
      field: 'devName',
      headerName: 'Device',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'tagName',
      headerName: 'Sensor Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'alertValue',
      headerName: 'Alert Value',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },

    {
      field: 'alertStatus',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    // {
    //   field: 'alertType',
    //   headerName: 'Status',
    //   minWidth: 100,
    //   maxWidth: 250,
    //   flex: 1,
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderCell: (params) => {
    //     let element = {
    //       alertLabel: 'Good',
    //       alertColor: 'green',
    //     };

    //     element = setAlertPriorityStatus(element, params.row.alertType);

    //     return (
    //       <Chip
    //         variant="outlined"
    //         label={element.alertLabel}
    //         style={{
    //           color: element.alertColor,
    //           borderColor: element.alertColor,
    //         }}
    //       />
    //     );
    //   },
    // },
    // userDetails?.userRole !== 'User' &&
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 150,
    //   cellClassName: 'actions',
    //   getActions: (params) => [
    //     <ClearAlert selectedRow={params.row} />,
    //   ],
    // },
  ];

  function ClearAlert({ selectedRow }) {
    return (
      // selectedRow.alarmType === 'Latch'
      //   ? (
      <Button
        variant="contained"
        color="success"
        startIcon={<Delete />}
        onClick={(e) => {
          setMeterId(selectedRow.id);
          setClearAlert(true);
        }}
      >
        Clear
      </Button>
    )
    //     : ''
    // );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    SensorIdAlertUpdate({
      alertId: meterId, clearAlertReason,
    }, handleSuccess, handleException);

    setClearAlert(false);
    setAlertReason('');
  };

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setAlertList((oldValue) => oldValue.filter((data) => {
      return data.id !== meterId;
    }));
    setRefreshData((oldvalue) => !oldvalue);
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

  return (
    <Card
      className={'w-full h-[47vh] sm:h-[43vh] lg:h-[47vh] xl:h-[46vh]'}
      // className={'w-full h-[50vh] sm:h-[46vh] lg:h-[50vh] xl:h-[48vh]'}
      sx={{
        borderRadius: '12px',
        // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px ',


      }}
    >
      <Paper elevation={3} className={'h-full '}>
        <CardHeader
          title={
            <Typography
              sx={{
                fontSize: '25px',
                fontFamily: 'customfont',
                fontWeight: '600',
                color: 'inherit',
                textAlign: 'left',
                letterSpacing: '1px',
                marginLeft: '10px'
              }}
              underline="hover"
            >
              Alerts
            </Typography>
          }
          sx={{ paddingBottom: 0 }}
        />
        <CardContent
          className={'w-full h-[93%] sm:h-[92%]'}
          sx={{
            paddingBottom: '16px',
            borderRadius: '12px',
          }}
        >
          <DataGrid
            rows={dataList || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            style={{ maxHeight: `${92}%`, }}
            columnVisibilityModel={{
              actions: moduleAccess.delete
            }}
            sx={{
              border: 'none',
            }}
          /> </CardContent>
      </Paper>
      <Dialog
        sx={{ '& .MuiDialog-paper': { minWidth: '40%' } }}
        maxWidth="sm"
        open={clearAlert}
      >
        <DialogTitle>
          Clear alert with reason
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px " style={{ textAlign: '-webkit-center' }}>
              <TextField
                id="outlined-name"
                label="Reason"
                value={clearAlertReason}
                fullWidth
                required
                multiline
                rows={5}
                onChange={(e) => {
                  setAlertReason(e.target.value);
                }}
              />
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={3}
                style={{ marginTop: '30px' }}
              >
                <Button
                  type="submit"
                >
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    setClearAlert(false);
                    setAlertReason('');
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AlertWidget;