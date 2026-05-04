import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Tabs, Tab, Typography, Box,
  Card,
  CardHeader,
  Container,
  CardContent,
} from '@mui/material';
import UserModal from './UserModalComponent';
import UserListToolbar from './UserListToolbar';
import { FetchUserService, UserDeleteService } from '../../services/LoginPageService';
import ConfirmPassword from './passwordConfirmComponent';
import NotificationBar from '../notification/ServiceNotificationBar';
import { useUserAccess } from '../../context/UserAccessProvider';
import UserLogForm from './UserLog/UserLogForm';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserListResults() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    // {
    //   field: 'employeeId',
    //   headerName: 'Employee Id',
    //   width: 110,
    //   headerAlign: 'center'
    // },
    {
      field: 'FullName',
      headerName: 'Employee Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'email',
      headerName: 'Email Id',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'phone',
      headerName: 'Phone',
      align: 'center',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'role',
      align: 'center',
      headerName: 'Employee Role',
      sortable: true,
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [editUser, setEditUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [id, setId] = useState('');
  const [password, setConfirmPassword] = useState('');
  const [btnReset, setBtnReset] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('usermanagement');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });
  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setUserList(dataObject || []);
  };

  const handleException = () => {
  };

  useEffect(() => {
    FetchUserService(handleSuccess, handleException);
  }, [refreshData]);

  function EditData(props) {
    return (moduleAccess.edit
      && (
        <EditIcon
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditUser(props.selectedRow);
            setOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        />
      ));
  }
  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        onClick={() => {
          setId(props.selectedRow.id);
          setBtnReset(true);
        }}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  const passwordSubmit = async (e) => {
    e.preventDefault();
    UserDeleteService({ password, id }, passwordValidationSuccess, passwordValidationException);
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
        <CardHeader
          title={
            <Box className=' ml-5 '>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Create User" {...a11yProps(0)} />
                {/* <Tab label="Log activity" {...a11yProps(1)} /> */}
              </Tabs>
            </Box>
          }
        />
        <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px' }}>

          <TabPanel value={value} index={0}>
            <div style={{ height: 425, width: '100%' }}> {/* Adjusted for responsive view */}
              <UserListToolbar
                setIsAddButton={setIsAddButton}
                setEditUser={setEditUser}
                setOpen={setOpen}
                editUser={editUser}
                userAccess={moduleAccess}
              />
              <DataGrid
                // className={'py-5 px-0 '}
                sx={{
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none', // This removes the top line above pagination
                  },
                  border: 'none',
                  // marginTop: '-14px'
                }}
                rows={userList}
                columns={columns}
                pageSize={10}
                rowHeight={38}
                loading={isLoading}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
              />
              <UserModal
                isAddButton={isAddButton}
                userData={editUser}
                open={open}
                setOpen={setOpen}
                setRefreshData={setRefreshData}
              />
              <ConfirmPassword
                open={btnReset}
                passwordSubmit={passwordSubmit}
                setConfirmPassword={setConfirmPassword}
                setBtnReset={setBtnReset}
              />
              <NotificationBar
                handleClose={handleClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
              />
            </div>
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
        <UserLogForm />
      </TabPanel> */}
        </CardContent>
      </Card>
    </Box>
  );
}
