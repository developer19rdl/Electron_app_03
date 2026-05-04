import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AssetModal from './AssetModalComponent';
import { AssetListToolbar } from './AssetListToolbar';
import { AssetFetchService, AssetDeleteService } from '../../../../services/LoginPageService';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';

export function AssetListResults() {
  const columns = [
    {
      field: 'assetName',
      headerName: 'Asset Name',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'assetTypeName',
      headerName: 'Asset Type',
      minWidth: 170,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'assetDescription',
      headerName: 'Asset Description',
      minWidth: 100,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    // {
    //   field: 'motorDetails',
    //   headerName: 'Motor Details',
    //   minWidth: 100,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center'
    // },
    // {
    //   field: 'prsrVoltage',
    //   headerName: 'Rated PowerRated SpeedRated Voltage',
    //   minWidth: 200,
    //   align: 'center',
    //   flex: 1,
    //   headerAlign: 'center'
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      align: 'center',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />,
        <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editConfigSetup, setEditConfigSetup] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const moduleAccess = useUserAccess()('device');

  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: '',
  });

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setAssetList(dataObject?.data || []);
  };

  const handleException = (errorObject) => {

  };

  function DeleteData(props) {
    return moduleAccess.delete && (
      <DeleteIcon onClick={() => {
        setDeleteId(props.selectedRow.id);
        setDeleteDailogOpen(true);
      }}
      />
    );
  }

  useEffect(() => {
    AssetFetchService(handleSuccess, handleException);
  }, [refreshData]);

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
    return (moduleAccess.edit
      && (
        <EditIcon onClick={(event) => {
          event.stopPropagation();
          setIsAddButton(false);
          setEditConfigSetup(props.selectedRow);
          setOpen(true);
        }}
        />
      ));
  }

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  return (
    <div style={{ height: 448, width: '100%', padding: '10px' }}>
      <AssetListToolbar
        setIsAddButton={setIsAddButton}
        setEditConfigSetup={setEditConfigSetup}
        setOpen={setOpen}
        editConfigSetup={editConfigSetup}
        userAccess={moduleAccess}
      />

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
        rows={assetList}
        columns={columns}
        pageSize={10}
        rowHeight={38}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
      <AssetModal
        isAddButton={isAddButton}
        configSetupData={editConfigSetup}
        open={open}
        setOpen={setOpen}
        setRefreshData={setRefreshData}
        handleClose={handleClose}
        openNotification={openNotification}
        setNotification={setNotification}
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
        deleteService={AssetDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}