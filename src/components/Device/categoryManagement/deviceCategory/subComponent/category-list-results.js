import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CategoryModel from './CategoryModelComponent';
import { CategoryListToolbar } from './CategoryListToolbar';
import { DeviceCategoryFetchService, DeviceCategoryDeleteService } from '../../../../../services/LoginPageService';
import NotificationBar from '../../../../notification/ServiceNotificationBar';
import { useUserAccess } from '../../../../../context/UserAccessProvider';
import DeleteConfirmationDailog from '../../../../../utils/confirmDeletion';

export function CategoryListResults() {
  const columns = [
    {
      field: 'cateName',
      headerName: 'Device Category Name',
      minWidth: 200,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'cateDesc',
      headerName: 'Description',
      minWidth: 300,
      align: 'center',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      align: 'center',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => [
        <EditData selectedRow={params.row} />, <DeleteData selectedRow={params.row} />,
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isAddButton, setIsAddButton] = useState(true);
  const [editCategory, setEditCategory] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
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
    setCategoryList(dataObject.data);
  };

  const handleException = (errorObject) => {
  };

  useEffect(() => {
    DeviceCategoryFetchService(handleSuccess, handleException);
  }, [refreshData]);

  function EditData(props) {
    return (moduleAccess.edit
      && (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={(event) => {
            event.stopPropagation();
            setIsAddButton(false);
            setEditCategory(props.selectedRow);
            setOpen(true);
          }}
        />
      ));
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

  const handleClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <div style={{ height: 443, width: '100%', padding: "10px" }}>
      <CategoryListToolbar
        setIsAddButton={setIsAddButton}
        setEditCategory={setEditCategory}
        setOpen={setOpen}
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
        rows={CategoryList}
        columns={columns}
        pageSize={10}
        rowHeight={38}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
      <CategoryModel
        isAddButton={isAddButton}
        categoryData={editCategory}
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
        deleteService={DeviceCategoryDeleteService}
        handleSuccess={deletehandleSuccess}
        handleException={deletehandleException}
      />
    </div>
  );
}
