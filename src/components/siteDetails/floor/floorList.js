import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { PlayArrow, Edit, DeleteOutlined } from '@mui/icons-material';
import { Breadcrumbs, Card, CardContent, Stack, Typography } from '@mui/material';
import { FloorDeleteService, FloorfetchService } from '../../../services/LoginPageService';
import { FloorListToolbar } from './floor-list-toolbars';
import FloorModal from './FloorModalComponent';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../context/UserAccessProvider';
import ApplicationStore from '../../../utils/localStorageUtil';
import DeleteConfirmationDailog from '../../../utils/confirmDeletion';
import CentralHooterModal from '../CentralHooter/CentralHooterModal';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


export function FloorListResults({ img }) {
  const dataColumns = [
    {
      field: 'floorName',
      headerName: 'Floor Name',
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
  const [openCentralHooter, setOpenCentralHooter] = useState(false);
  const [centralButtonText, setCentralButtonText] = useState('ADD CENTRAL HOOTER');
  const [colorValue, setColorValue] = useState("primary")
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editData, setEditData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const routeStateObject = useLocation();
  const {
    locationId, branchId, facilityId, buildingId, buildingImg,
  } = routeStateObject.state;
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('location');
  const {
    locationLabel, branchLabel, facilityLabel, buildingLabel,
  } = ApplicationStore().getStorage('siteDetails');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  useEffect(() => {
    setGridLoading(true);
    FloorfetchService({
      locationId,
      branchId,
      facilityId,
      buildingId,
    }, handleSuccess, handleException);
  }, [refreshData]);

  function LinkTo(props) {
    return (
      <Link
        to={`${props.selectedRow.floorName}`}
        state={{
          locationId,
          branchId,
          facilityId,
          buildingId,
          buildingImg,
          floorId: props.selectedRow.id,
          floorMap: props.selectedRow.floorMap,
        }}
      >
        <PlayCircleIcon />
      </Link>
    );
  }

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject?.data || []);
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

  const pathList = routeStateObject.pathname.split('/').filter((x) => x);
  const pathname = pathList.map((data, index) => {
    const path = data.replace(/%20/g, ' ');
    return (path);
  });
  return (
    <Card
      className='h-[63vh] sm:h-[67vh] rounded-lg shadow-md"'
      style={{ width: '100%', padding: '15px', paddingBottom: '0', marginTop: '0px', boxShadow: 'none' }}>
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
              sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

              to={`/Location/${pathname[1]}/${pathname[2]}`}
              state={{
                locationId,
                branchId,
              }}
            >
              {pathname[2]}
            </Link>
          )}
        {buildingLabel ? (
          <Typography
            underline="hover"
            color="inherit"
            sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

          >
            {pathname[3]}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

            to={`/Location/${pathname[1]}/${pathname[2]}/${pathname[3]}`}
            state={{
              locationId,
              branchId,
              facilityId,
            }}
          >
            {pathname[3]}
          </Link>
        )}
        <Typography
          underline="hover"
          color="inherit"
          sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: '600', fontSize: '16px', letterSpacing: '1px' }}

        >
          {pathname[4]}
        </Typography>
      </Breadcrumbs>
      <FloorListToolbar
        setOpen={setOpen}
        setIsAddButton={setIsAddButton}
        setEditData={setEditData}
        userAccess={moduleAccess}
        setOpenCentralHooter={setOpenCentralHooter}
        centralButtonText={centralButtonText}
        colorValue={colorValue}
      />
      <CardContent className="h-[250px] sm:h-[93%] lg:h-[84%] xl:h-[93%]"
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
          //   // height: '37vh'

          //   // height: 'auto',
          //   // minHeight: '57vh',
          //   height: '85%',
          //   minHeight: '250px',
          //   maxHeight: '70vh'
          // }}
          sx={{
            border: 'none',
          }}
        />

        <FloorModal
          isAddButton={isAddButton}
          editData={editData}
          open={open}
          setOpen={setOpen}
          location_id={locationId}
          branch_id={branchId}
          facility_id={facilityId}
          building_id={buildingId}
          setRefreshData={setRefreshData}
          src={img}
        />
        <CentralHooterModal
          openCentralHooter={openCentralHooter}
          setOpenCentralHooter={setOpenCentralHooter}
          setCentralButtonText={setCentralButtonText}
          setColorValue={setColorValue}
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
          deleteService={FloorDeleteService}
          handleSuccess={deletehandleSuccess}
          handleException={deletehandleException}
        />
      </CardContent>

    </Card>

  );
}
