import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';
import { FetchLocationService, LocationDeleteService } from '../../../services/LoginPageService';
import { LocationListToolbar } from './location-list-toolbars';
import LocationModal from './LocationModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Card, CardContent, CardHeader } from '@mui/material';
export function LocationListResults({ setLocationCoordinationList, centerLat, centerLng }) {
  console.log("11111", centerLat, centerLng)
  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editState, setEditState] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const columns = [
    {
      field: 'locationName',
      headerName: 'Location Name',
      width: 270, align: 'cenetr'
      // type: 'actions',
      // getActions: (params) => [
      //   <LinkTo selectedRow={params.row} />,
      // ],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];
  useEffect(() => {
    setGridLoading(true);
    FetchLocationService(handleSuccess, handleException);
  }, [refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];
      return {
        id: item.id,
        name: item.locationName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    setLocationCoordinationList(newArray);
  };

  const handleException = (errorObject) => {
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
    }, 5000);
  };

  const deletehandleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage,
    });
  };

  function LinkTo(props) {
    return (
      <Link
        to={`${props.selectedRow.locationName}`}
        state={{ locationId: props.selectedRow.id, centerCoordination: props.selectedRow.coordinates }}
      >
        {/* <PlayCircleIcon /> */}

      </Link>
    );
  }

  function EditData(props) {
    return (
      moduleAccess.edit
      && (
        <EditIcon
          onClick={() => {
            setIsAddButton(false);
            setEditState(props.selectedRow);
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
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
        }
        }
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
    <>
      <Card
        className="h-[55vh] sm:h-[45vh] rounded-lg shadow-md"  // Tailwind classes for height and border-radius
        sx={{
          height: {
            xs: '54vh',  // Extra small screens
            sm: '46vh',  // Small screens
            md: '45vh',  // Medium screens
            lg: '45vh',  // Large screens
            xl: '45vh',  // Extra-large screens
          },
          boxShadow: 'rgba(0, 0, 0, 0.47) 2px 4px 10px 1px',  // Subtle shadow effect
          borderRadius: 2,      // MUI shorthand for 16px
          overflow: 'hidden',   // Prevent overflow from child components
          // p: 2,                 // MUI shorthand for padding 16px
          transition: 'box-shadow 0.3s ease-in-out',  // Smooth shadow transition
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.6) 4px 6px 14px 2px',  // Enhanced shadow effect on hover
          },
        }}
      >
        <CardHeader
          sx={{ padding: '16px', paddingBottom: '0px' }} // Adjusted bottom padding for better spacing
          title={
            <LocationListToolbar
              setOpen={setOpen}
              setIsAddButton={setIsAddButton}
              setEditCustomer={setEditState}
              userAccess={moduleAccess}
            />
          }
        />
        <CardContent className="h-[350px] sm:h-[320px] lg:h-[90%] "
          style={{
            marginTop: "-20px"
          }}
        > {/* Added padding to CardContent */}
          <DataGrid
            rows={dataList}
            columns={columns}
            pageSize={5}
            rowHeight={38}
            loading={isLoading}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              border: 'none',
              height: '35vh', // Allow DataGrid to fill the CardContent
            }}
          />
          <LocationModal
            isAddButton={isAddButton}
            locationData={editState}
            open={open}
            setOpen={setOpen}
            setRefreshData={setRefreshData}
            centerCoord={{ lat: centerLat, lng: centerLng }}
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
            deleteService={LocationDeleteService}
            handleSuccess={deletehandleSuccess}
            handleException={deletehandleException}
          />
        </CardContent>
      </Card>

    </>

  );
}
