import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CustomerModal from './CustomerModalComponent';
import { CustomerListToolbar } from './customer-list-toolbar';
import { CustomerDeleteService, customerShowList, FetchCustomerService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ConfirmPassword from '../user/passwordConfirmComponent';
import { Box, Card, CardContent } from '@mui/material';

export function CustomerListResults() {
  const columns = [

    {
      field: 'custId',
      headerName: 'Customer Id',
      width: 130,
      headerAlign: 'center',
      flex: 1,

    },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      width: 170,
      headerAlign: 'center',
      flex: 1,
      align: 'center',

    },
    // {
    //   field: 'duration',
    //   headerName: 'Duration',
    //   width: 170,
    //   headerAlign: 'center',
    //   flex: 1,
    //   align: 'center',

    // },
    {
      field: 'renewalDate',
      headerName: 'Renewal Date',
      width: 170,
      headerAlign: 'center',
      flex: 1,
      align: 'center',

    },
    {
      field: 'primaryNo',
      headerName: 'Primary Phone No',
      width: 170,
      headerAlign: 'center',
      flex: 1,
      align: 'center',

    },
    {
      field: 'secondaryNo',
      headerName: 'Secondary Phone No',
      width: 170,
      headerAlign: 'center',
      flex: 1,
      align: 'center',

    },
    {
      field: 'email',
      headerName: 'Email Id',
      width: 230,
      headerAlign: 'center',
      flex: 1,
      align: 'center',


    },
    {
      field: 'alternativeEmail',
      headerName: 'Alternative Email',
      width: 230,
      headerAlign: 'center',
      flex: 1,
      align: 'center',


    },
    {
      field: 'phoneNo',
      headerName: 'Phone',
      width: 120,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
  const [id, setId] = useState('');
  const [password, setConfirmPassword] = useState('');
  const [btnReset, setBtnReset] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleShowSuccess = (dataObject) => {
    setGridLoading(false);
    setCustomerList(dataObject.data);
  };

  const handleShowException = (errorObject) => {
  };

  useEffect(() => {
    setGridLoading(true);
    customerShowList(handleShowSuccess, handleShowException);
  }, [refreshData]);

  const passwordSubmit = async (e) => {
    e.preventDefault();
    CustomerDeleteService({ password, id }, passwordValidationSuccess, passwordValidationException);
    setBtnReset(false);
  };

  const passwordValidationSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });
    setRefreshData((oldvalue) => !oldvalue);
  };

  const passwordValidationException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  function EditData(props) {
    return (
      <EditIcon
        style={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditCustomer(props.selectedRow);
          setOpen(true);
        }}
      />
    );
  }

  function DeleteData(props) {
    return (
      <DeleteIcon
        onClick={() => {
          setId(props.selectedRow.id);
          setBtnReset(true);
        }}
        style={{ cursor: 'pointer' }}
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

  return (
    <Box sx={{ width: '100%', height: '85vh' }}>
      <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px' }}>
        <CardContent className={'min-h-[550px]'} style={{ border: 'none', boxShadow: 'none' }}>

          <div style={{ height: 400, width: '100%' }}>
            <CustomerListToolbar
              setIsAddButton={setIsAddButton}
              setEditCustomer={setEditCustomer}
              setOpen={setOpen}
            />
            <DataGrid
              rows={customerList}
              columns={columns}
              pageSize={5}
              loading={isLoading}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-footerContainer': {
                  borderTop: 'none', // This removes the top line above pagination
                },
                border: 'none',
                // marginTop: '-14px'
              }}
            />
            <ConfirmPassword
              open={btnReset}
              passwordSubmit={passwordSubmit}
              setConfirmPassword={setConfirmPassword}
              setBtnReset={setBtnReset}
            />
            <CustomerModal
              isAddButton={isAddButton}
              customerData={editCustomer}
              open={open}
              setOpen={setOpen}
              setRefreshData={setRefreshData}
            />
            <NotificationBar
              handleClose={handleClose}
              notificationContent={openNotification.message}
              openNotification={openNotification.status}
              type={openNotification.type}
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
