import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import NotificationBar from '../../notification/ServiceNotificationBar';
// import { SensorHistoryAlertdata } from '../../../services/LoginPageService';

const AlertHistoryLog = () => {
    const [clearAlert, setClearAlert] = useState(false);
    const [clearHistory, setClearHistory] = useState(false);
    const [clearAlertReason, setAlertReason] = useState('');
    const [deleteValidation, setDeleteValidation] = useState("")
    const [alertlogList, setAlertLogList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    })
    const columns = [
        {
            field: 'loc_name',
            headerName: 'Location',
            flex: 1,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'devName',
            headerName: 'Device',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'tagName',
            headerName: 'Sensor Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'clearedAtDate',
            headerName: 'Date',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'clearedAtTime',
            headerName: 'Time',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'alertValue',
            headerName: 'Alert Value',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'alertStatus',
            headerName: 'Status',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        // {
        //   field: 'actions',
        //   type: 'actions',
        //   headerName: 'Actions',
        //   minWidth: 100,
        //   align: 'center',
        //   flex: 1,
        //   cellClassName: 'actions',
        //   getActions: (params) => [
        //     <DeleteData selectedRow={params.row} />,
        //   ],
        // },
    ];



    //   function DeleteData(props) {
    //     return (
    //       <DeleteIcon onClick={() => {
    //         setDeleteId(props.selectedRow.id);
    //         setClearAlert(true);
    //       }}
    //       />
    //     )
    //   }

    useEffect(() => {
        // SensorHistoryAlertdata(handleSuccess, handleException);

    }, []);


    const handleSuccess = (dataObject) => {
        setAlertLogList(dataObject?.data || [])
        setNotification({
            status: true,
            type: 'success',
            message: dataObject.message,
        });

        setRefreshData((oldvalue) => !oldvalue);

    };

    /* eslint-disable-next-line */
    const handleException = (errorObject, errorMessage) => {
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
        <Box sx={{ width: '100%', height: '85vh', padding: '20px' }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}>
                <Paper elevation={3} className={'h-full '}>
                    <CardHeader
                        title={
                            <Typography
                                sx={{
                                    fontSize: '25px',
                                    fontFamily: 'customfont',
                                    fontWeight: '600',
                                    color: 'inherit',
                                    textAlign: 'left',
                                    letterSpacing: '1px',
                                    marginLeft: '10px'
                                }}
                                underline="hover"
                            >
                                Alerts History
                            </Typography>
                        }
                        sx={{ paddingBottom: 0 }}
                    />
                    <CardContent className={'min-h-[550px]'} style={{ border: 'none', }}>
                        <div style={{ height: '70vh', width: '100%', marginTop: 12 }}>

                            <DataGrid
                                rows={alertlogList || []}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                style={{ maxHeight: `${92}%`, }}
                                // columnVisibilityModel={{
                                //   actions: moduleAccess.delete
                                // }}
                                sx={{
                                    border: 'none',
                                }}
                            />

                        </div>
                    </CardContent>
                </Paper>
                <NotificationBar
                    handleClose={handleClose}
                    notificationContent={openNotification.message}
                    openNotification={openNotification.status}
                    type={openNotification.type}
                />
            </Card>
        </Box>
    )
}

export default AlertHistoryLog