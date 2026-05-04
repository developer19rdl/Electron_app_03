import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, DeleteOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Card, CardContent, Typography } from '@mui/material';
import { BuildingDeleteService, BuildingFetchService } from '../../../services/LoginPageService';
import { BuildingListToolbar } from './building-list-toolbars';
import BuildingModal from './BuildingModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import ApplicationStore from '../../../utils/localStorageUtil';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export function BuildingListResults(props) {
  const dataColumns = [
    {
      field: 'buildingName',
      headerName: 'Building Name',
      width: 170,
      // type: 'actions',
      // getActions: (params) => [
      //   <LinkTo selectedRow={params.row} />,
      // ],
    },
    {
      field: 'totalFloors',
      headerName: 'Total Floors',
      width: 130,
      headerAlign: 'center'
    },
    // {
    //   field: 'buildingTag',
    //   headerName: 'Building Tag',
    //   width: 230,
    //   headerAlign: 'center'
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
  const [isLoading, setGridLoading] = useState(false);
  const routeStateObject = useLocation();
  const { locationId, branchId, facilityId } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');

  const { locationLabel, branchLabel, facilityLabel, } = ApplicationStore().getStorage('siteDetails');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setGridLoading(true);
    BuildingFetchService({
      locationId,
      branchId,
      facilityId,
    }, handleSuccess, handleException);
  }, [refreshData]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
    const newArray = dataObject.data ? dataObject.data.map((item) => {
      const coordinates = item.coordinates ? item.coordinates.replaceAll('"', '').split(',') : [];

      return {
        id: item.id,
        name: item.facilityName,
        position: {
          lat: parseFloat(coordinates[0]),
          lng: parseFloat(coordinates[1]),
        },
      };
    })
      : [];
    props.setLocationCoordinationList(newArray);
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

  function LinkTo(props) {
    return (
      <Link
        to={`${props.selectedRow.buildingName}`}
        state={{
          locationId,
          branchId,
          facilityId,
          buildingId: props.selectedRow.id,
          buildingImg: props.selectedRow.buildingImg,
        }}
      >
        <PlayCircleIcon />
      </Link>
    );
  }

  function EditData(props) {
    return (
      moduleAccess.edit
      && (
        <Edit
          onClick={() => {
            setIsAddButton(false);
            setEditData(props.selectedRow);
            setOpen(true);
          }}
          style={{ cursor: 'pointer' }}
        />
      ));
  }

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteOutlined
        onClick={() => {
          // BuildingDeleteService(props.selectedRow, deletehandleSuccess, deletehandleException);
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

  const pathList = routeStateObject.pathname.split('/').filter((x) => x);
  const pathname = pathList.map((data, index) => {
    const path = data.replace(/%20/g, ' ');
    return (path);
  });

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
        {branchLabel
          ? (
            <Typography
              underline="hover"
              color="inherit"
              sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

            >
              {pathname[1]}
            </Typography>
          )
          : (
            <Link
              underline="hover"
              color="inherit"
              sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

              to={`/Location/${pathname[1]}`}
              state={{
                locationId,
              }}
            >
              {pathname[1]}
            </Link>
          )}
        {facilityLabel
          ? (
            <Typography
              underline="hover"
              color="inherit"
              sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

            >
              {pathname[2]}
            </Typography>
          )
          : (
            <Link
              underline="hover"
              color="inherit"
              to={`/Location/${pathname[1]}/${pathname[2]}`}
              state={{
                locationId,
                branchId,
              }}
              sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

            >
              {pathname[2]}
            </Link>
          )
        }
        <Typography
          underline="hover"
          color="inherit"
          sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

        >
          {pathname[3]}
        </Typography>
      </Breadcrumbs>

      <BuildingListToolbar
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
          columns={dataColumns}
          pageSize={5}
          rowHeight={38}
          loading={isLoading}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          // style={{
          //   // maxHeight: `${80}%`,
          //   height: '100%',
          //   // minHeight: '31vh',
          //   minHeight: '230px',
          //   maxHeight: '36vh'
          // }}
          sx={{
            border: 'none',
          }}
        />

        <BuildingModal
          isAddButton={isAddButton}
          editData={editData}
          open={open}
          setOpen={setOpen}
          locationId={locationId}
          branchId={branchId}
          facilityId={facilityId}
          setRefreshData={setRefreshData}
          locationCoordinationList={props.locationCoordinationList}
          centerCoord={{ lat: parseFloat(props.centerLat), lng: parseFloat(props.centerLng) }}
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
          deleteService={BuildingDeleteService}
          handleSuccess={deletehandleSuccess}
          handleException={deletehandleException}
        />
      </CardContent>
    </Card>
  );
}