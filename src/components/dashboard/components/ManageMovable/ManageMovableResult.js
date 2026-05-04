import React, { useEffect, useState } from 'react'
import { useUserAccess } from '../../../../context/UserAccessProvider';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import NotificationBar from '../../../notification/ServiceNotificationBar';
import DeleteConfirmationDailog from '../../../../utils/confirmDeletion';
import { DataGrid } from '@mui/x-data-grid';
import ManageMovableToolbar from './ManageMovableToolbar';
import ManageMovableModel from './ManageMovableModel';
// import { Box, Card } from '@mui/material';
import { Box, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { movableAssetsDelete, movableAssetsShow } from '../../../../services/LoginPageService';


function ManageMovableResult() {
    const columns = [
        {
            field: 'id',
            headerName: 'PathId',
            flex: 1,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'pathName',
            headerName: 'Path Name',
            width: 130,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'sequence',
            headerName: 'Sequence',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'coordinates',
            headerName: 'longutiude & latitude',
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
    const [editMovabledevice, setEditMovabledevice] = useState([]);
    const [MovabledeviceList, setMovableDeviceList] = useState([]);
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });
    useEffect(() => {
        movableAssetsShow(handleSuccess, handleException);
        // ProjectShowService(handleProjectSuccess, handleProjectException);

    }, [refreshData]);

    const handleSuccess = (dataObject) => {
        setMovableDeviceList(dataObject.data)
    };
    const handleException = () => {

    }

    function EditData(props) {
        return (
            <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditMovabledevice(props.selectedRow);
                    setOpen(true);

                }}
            />
        )
    };
    function DeleteData(props) {
        return (
            <DeleteIcon

                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setDeleteId(props.selectedRow.id);
                    setDeleteDailogOpen(true)
                }}
            />
        );
    };
    const handleClose = () => {
        setNotification({
            status: false,
            type: '',
            message: '',
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
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', paddingTop: '25px' }}>
                {/* <CardHeader

            /> */}
                <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-40px' }}>

                    {/* <div style={{ height: 250, width: '100%' }}> */}

                    <ManageMovableToolbar
                        setIsAddButton={setIsAddButton}
                        setEditMovabledevice={setEditMovabledevice}
                        setOpen={setOpen}
                    />
                    {/* <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item xs={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Project</InputLabel>
                                <Select
                                    value={Project}
                                    label="Project"
                                    onChange={(e) => {
                                        setProject(e.target.value);

                                    }}
                                >
                                    <MenuItem value="" key={0}>
                                        <em style={{ fontWeight: 'bold' }}>All</em>
                                    </MenuItem>
                                    {ProjectList.map((data, index) => (
                                        <MenuItem value={data.id} key={index + 1}>
                                            {data.projectName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid> */}
                    <div style={{ height: '71vh', width: '100%', padding: 0 }}>

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
                            // checkboxSelection
                            rows={MovabledeviceList}
                            columns={columns}
                            pageSize={10}
                            rowHeight={38}
                            // loading={isLoading}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                        {/* </div> */}
                        <ManageMovableModel
                            isAddButton={isAddButton}
                            editMovabledevice={editMovabledevice}
                            open={open}
                            setOpen={setOpen}
                            setRefreshData={setRefreshData}
                        //   locationDetails={locationDetails}
                        //   deviceId={deviceId}  

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
                            deleteService={movableAssetsDelete}
                            handleSuccess={deletehandleSuccess}
                            handleException={deletehandleException}
                        />
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ManageMovableResult