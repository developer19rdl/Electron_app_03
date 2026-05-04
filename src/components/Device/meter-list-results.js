import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { MeterDeployDeleteService, FetchCustomerService, MeterDeployFetchService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import { MeterListToolbar } from './MeterListToolbar';
import MeterAddModel from './MeterAddModel';
import { useUserAccess } from '../../context/UserAccessProvider';

import {
  Tabs, Tab, Typography, Box, InputLabel, MenuItem, FormControl, Select, Stack, Grid, styled,
} from '@mui/material';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';

export function MeterListResults({ locationDetails, deviceList }) {

  const { locationId, branchId, facilityId, buildingId, floorId, zoneId } = locationDetails;


  const columns = [
    {
      field: 'meterName',
      headerName: 'Sensor Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center'

    },
    // {
    //   field: 'companyCode',
    //   headerName: 'Company Code',
    //   width: 130,
    //   headerAlign: 'center'
    // },
    {
      field: 'slaveId',
      headerName: 'Slave Id',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      disableClickEventBubbling: true,
      getActions: (params) => [
        <EditData selectedRow={params.row} />, <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editCustomer, setEditCustomer] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const moduleAccess = useUserAccess()('device');


  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const [deviceId, setDeviceId] = useState('');


  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setCustomerList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };

  useEffect(() => {
    setGridLoading(true);
    MeterDeployFetchService({
      locationId, branchId, facilityId, buildingId, floorId, zoneId, deviceId
    }, handleSuccess, handleException);
  }, [refreshData]);

  useEffect(() => {
    MeterDeployFetchService({
      locationId, branchId, facilityId, buildingId, floorId, zoneId, deviceId
    }, handleSuccess, handleException);
  }, [locationId, branchId, facilityId, buildingId, floorId, zoneId, deviceId]);


  function EditData(props) {
    return (
      <EditIcon
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditCustomer(props.selectedRow);
          setDeviceId(props.selectedRow.deviceid);
          setOpen(true);
        }}
      />
    );
  }

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
        }}
      />
    );
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const showNotification = (type, message) => {
    setNotification({
      status: true,
      type: type,
      message: message,
    });
  };

  const deletehandleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
    setTimeout(() => {
      handleClose();
      setDeleteDailogOpen(false);
    }, 3000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
    setTimeout(() => {
      handleClose();
    }, 3000);
  };




  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Device</InputLabel>
            <Select
              value={deviceId}
              label="Device"
              onChange={(e) => {
                setDeviceId(e.target.value);
                // setDeviceId(e.target.value)
                // LabHandleChange(e.target.value);
              }}
            >
              <MenuItem value="" key={0}>
                <em style={{ fontWeight: 'bold' }}>All</em>
              </MenuItem>
              {deviceList.map((data, index) => (
                <MenuItem value={data.id} key={index + 1}>
                  {data.deviceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>


      <div style={{ height: 250, width: '100%' }}>
        <MeterListToolbar
          setIsAddButton={setIsAddButton}
          setEditCustomer={setEditCustomer}
          setOpen={setOpen}
          locationDetails={locationDetails}
          showNotification={showNotification}
        />
        <div style={{ height: '52vh', width: '100%', padding: 0 }}>

          <DataGrid
            sx={{
              border: 'none',
              '& .MuiDataGrid-footerContainer': {
                borderTop: 'none', // This removes the top border of the footer (pagination area)
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none', // Removes the bottom border between cells
              },
            }}
            rows={customerList}
            columns={columns}
            pageSize={10}
            rowHeight={38}
            loading={isLoading}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
          />
        </div>
        <MeterAddModel
          isAddButton={isAddButton}
          editData={editCustomer}
          open={open}
          setOpen={setOpen}
          setRefreshData={setRefreshData}
          locationDetails={locationDetails}
          deviceId={deviceId}  // Pass the deviceId to the dialog component

        />
        <NotificationBar
          handleClose={handleClose}
          notificationContent={openNotification.message}
          openNotification={openNotification.status}
          type={openNotification.type}
        />
        <DeleteConfirmationDailog
          open={deleteDailogOpen}
          setOpen={setDeleteDailogOpen}
          deleteId={deleteId}
          deleteService={MeterDeployDeleteService}
          handleSuccess={deletehandleSuccess}
          handleException={deletehandleException}
        />
      </div>
    </>
  );
}