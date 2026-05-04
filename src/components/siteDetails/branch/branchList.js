import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Breadcrumbs, Card, CardContent, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { BranchDeleteService, FetchBranchService } from '../../../services/LoginPageService';
import { BranchListToolbar } from './branch-list-toolbars';
import BranchModal from './BranchModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import ApplicationStore from '../../../utils/localStorageUtil';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export function BranchListResults(props) {
  const branchColumns = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      width: 270,
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

  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editData, setEditData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const routeStateObject = useLocation();
  const { locationId, centerCoordination } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');
  const { locationLabel } = ApplicationStore().getStorage('siteDetails');
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    FetchBranchService({
      locationId,
    }, handleSuccess, handleException);
  }, [refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject?.data || "");
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];

      return {
        id: item.id,
        name: item.branchName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    props.setLocationCoordinationList(newArray);
  };
  /* eslint-disable-next-line */
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
  /* eslint-disable-next-line */
  function LinkTo(props) {
    return (
      <Link
        to={`${props.selectedRow.branchName}`}
        state={{
          locationId,
          branchId: props.selectedRow.id,
          centerCoordination: props.selectedRow.coordinates
        }}
      >
        <PlayCircleIcon />
      </Link>
    );
  }
  /* eslint-disable-next-line */
  function EditData(props) {
    return (
      moduleAccess.edit
      && (
        <EditIcon
          onClick={() => {
            setIsAddButton(false);
            setEditData(props.selectedRow);
            setOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        />
      ));
  }
  /* eslint-disable-next-line */
  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon
        onClick={() => {
          setDeleteId(props.selectedRow.id);
          setDeleteDailogOpen(true);
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
  const pathname = routeStateObject.pathname.split('/').filter((x) => x);
  return (
    <Card
      className="rounded-lg shadow-md h-[50vh] sm:h-[40vh] md:h-[43vh] lg:h-[43vh] xl:h-[42vh]"
      style={{
        width: '100%',
        paddingBottom: '0',
        marginTop: '0px',
        boxShadow: 'none'
      }}>

      <Breadcrumbs aria-label="breadcrumb" separator="›" style={{
        minHeight: '15px',
        fontFamily: "'Roboto', sans-serif",
        fontWeight: '600',
        color: 'black',
        fontSize: '16px',
        letterSpacing: '0.5px'
      }}>
        {locationLabel ? (
          <Typography
            underline="hover"
            color="inherit"
          >
            Location
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" to="/Location">
            Location
          </Link>
        )}
        <Typography
          underline="hover"
          color="inherit"
          sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '585', fontSize: '16px', letterSpacing: '0.5px' }}

        >
          {pathname[1].replace(/%20/g, ' ')}
        </Typography>
      </Breadcrumbs>
      <BranchListToolbar
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditData={setEditData}
        userAccess={moduleAccess}
      />
      <CardContent
        className="h-[250px] sm:h-[93%] lg:h-[84%] xl:h-[93%]"
        style={{ marginTop: '-20px' }}
      >
        <DataGrid
          rows={dataList}
          columns={branchColumns}
          pageSize={5}
          loading={isLoading}
          rowHeight={38}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          // style={{
          //   // maxHeight: `${80}%`,
          //   height: '37vh',
          //   minHeight: '230px'
          // }}
          sx={{
            border: 'none',
          }}
        />
        <BranchModal
          isAddButton={isAddButton}
          editData={editData}
          open={open}
          setOpen={setOpen}
          location_Id={locationId}
          setRefreshData={setRefreshData}
          locationCoordinationList={props.locationCoordinationList}
          centerCoord={{
            lat: !isNaN(parseFloat(props.centerLat)) ? parseFloat(props.centerLat) : 21.04,
            lng: !isNaN(parseFloat(props.centerLng)) ? parseFloat(props.centerLng) : 73.703
          }} />
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
          deleteService={BranchDeleteService}
          handleSuccess={deletehandleSuccess}
          handleException={deletehandleException}
        />
      </CardContent>

    </Card>
  );
}
