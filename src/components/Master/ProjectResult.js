import React, { useEffect, useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ProjectListToolbar from './ProjectListToolbar';
import { useUserAccess } from '../../context/UserAccessProvider';
import { Box, Card, CardContent, CardHeader, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ProjectModule from './ProjectModule';
import { ProjectDeleteService, ProjectShowService } from '../../services/LoginPageService';
import DeleteConfirmationDailog from '../../utils/confirmDeletion';
import NotificationBar from '../notification/ServiceNotificationBar';


function ProjectResult() {
    const columns = [
        // {
        //   field: 'employeeId',
        //   headerName: 'Employee Id',
        //   width: 110,
        //   headerAlign: 'center'
        // },
        {
            field: 'projectName',
            headerName: 'Project Name',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'projectDescription',
            headerName: 'Project Description',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'projectStatus',
            headerName: 'Project Status',
            flex: 1,
            align: 'center',
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
                // <Switch
                //     checked={params.row.isActive}
                //     onChange={(event) => handleSwitchToggle(event, params.row)}
                //     color="primary"
                // />
                <Switch
                    checked={params.row.projectStatus || isEnabled} // Dynamically set based on row data
                    onChange={(event) => handleToggleChange(event, params.row)}
                    color="primary"
                />
            ],
        },
    ];
    const handleToggleChange = (e) => {
        const isChecked = e.target.checked; // Get the boolean value
        setIsEnabled(isChecked);
    };

    const [isEnabled, setIsEnabled] = useState(false); // State for the toggle switch

    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editProject, setEditProject] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [deleteId, setDeleteId] = useState('');
    const [password, setConfirmPassword] = useState('');
    const [btnReset, setBtnReset] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const moduleAccess = useUserAccess()('usermanagement');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    function EditData(props) {
        return (moduleAccess.edit
            && (
                <EditIcon
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsAddButton(false);
                        setEditProject(props.selectedRow);
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
                    setDeleteDailogOpen(true)
                }}
                style={{ cursor: 'pointer' }}
            />
        );
    }
    useEffect(() => {
        ProjectShowService(handleSuccess, handleException);
    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setGridLoading(false);
        setProjectList(dataObject || []);
    };

    const handleException = () => {
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
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
        });
    };
    return (
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            {/* <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}> */}

            <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px' }}>

                {/* <div style={{ height: 425, width: '100%' }}> */}
                <ProjectListToolbar
                    setIsAddButton={setIsAddButton}
                    setEditProject={setEditProject}
                    setOpen={setOpen}
                    ProjectrData={editProject}
                    userAccess={moduleAccess}
                />
                <div style={{ height: '65vh', width: '100%', padding: 0 }}>

                    <DataGrid
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none', // This removes the top border of the footer (pagination area)
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: 'none', // Removes the bottom border between cells
                            },
                            '& .MuiDataGrid-row': {
                                '&:hover': {
                                    backgroundColor: '#ffffff', // Removes hover background
                                },
                            },
                            '& .MuiDataGrid-row:nth-of-type(odd)': {
                                backgroundColor: '#f5f5f5', // Light gray for odd rows
                            },
                            '& .MuiDataGrid-row:nth-of-type(even)': {
                                backgroundColor: '#ffffff', // White for even rows
                            },

                        }}
                        rows={projectList}
                        columns={columns}
                        pageSize={10}
                        rowHeight={38}
                        // loading={isLoading}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                    <ProjectModule
                        isAddButton={isAddButton}
                        ProjectrData={editProject}
                        open={open}
                        setOpen={setOpen}
                        setRefreshData={setRefreshData}
                    />
                    <DeleteConfirmationDailog
                        open={deleteDailogOpen}
                        setOpen={setDeleteDailogOpen}
                        deleteId={deleteId}
                        deleteService={ProjectDeleteService}
                        handleSuccess={deletehandleSuccess}
                        handleException={deletehandleException}
                    />
                    <NotificationBar
                        handleClose={handleClose}
                        notificationContent={openNotification.message}
                        openNotification={openNotification.status}
                        type={openNotification.type}
                    />
                </div>


            </CardContent>
            {/* </Card> */}
        </Box>
    )
}

export default ProjectResult