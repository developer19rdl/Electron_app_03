import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DeviceIdAlerts } from '../../../../services/LoginPageService';
import AlertWidget from '../../components/AlertWidget';
import NotificationBar from '../../../notification/ServiceNotificationBar';

const MeterAlertModalComponent = ({ alertOpen, HandleAlertClose, locationDetails }) => {
    const [dataList, setDataList] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: '',
    });

    // useEffect(() => {
    //     DeviceIdAlerts(locationDetails, fetchAlertListSuccess, fetchAlertListException);
    // }, [locationDetails, refreshData, alertOpen]);
    useEffect(() => {
        DeviceIdAlerts(locationDetails, fetchAlertListSuccess, fetchAlertListException);
    }, []);

    const fetchAlertListSuccess = (dataObject) => {
        setDataList(dataObject.data);

    };

    const fetchAlertListException = () => {
    };



    return (

        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: '50%', } }}
            maxWidth="md"
            open={alertOpen} onClose={HandleAlertClose} fullWidth>
            {/* <DialogTitle>Alerts</DialogTitle> */}
            <DialogContent style={{
                paddingTop: '10px'
            }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        padding: 1,
                        marginLeft: 1,
                    }}
                >
                    <DialogContent style={{
                        height: '51vh',
                        paddingTop: '0px'
                    }}>
                        <div style={{
                            height: '435px',
                            width: '100%',
                            margin: '0px',
                            '& .super-app.Pass': {
                                backgroundColor: '#d47483',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                            paddingTop: '0px'
                        }}
                        >

                            <AlertWidget dataList={dataList} setRefreshData={setRefreshData} maxHeight='500px' setAlertList={setDataList} setNotification={setNotification} isdatalist={true} />
                        </div>
                    </DialogContent>

                    <div className='float-right'>
                        <Button
                            sx={{ m: 1 }}
                            size="large"
                            onClick={HandleAlertClose} color="primary">
                            Close
                        </Button>
                    </div>
                </Grid>
            </DialogContent>
            <NotificationBar
                HandleAlertClose={HandleAlertClose}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}
            />
        </Dialog>

    )
}

export default MeterAlertModalComponent
