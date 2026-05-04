import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const CronJobData = () => {
    const columns = [
        {
            field: 'id',
            headerName: 'SLNO',
            flex: 1,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'pathName',
            headerName: 'Json URL',
            width: 130,
            headerAlign: 'center',
            align: 'center'

        },
        {
            field: 'sequence',
            headerName: 'Description',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'coordinates',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            // width: 300,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                // <Stack direction='row' spacing={1}>
                //     <EditData selectedRow={params.row} />
                //     <DeleteData selectedRow={params.row} />
                //     <RowData selectedRow={params.row} />
                //     <Status selectedRow={params.row} />
                //     <CodeEdit selectedRow={params.row} />
                // </Stack>
            ],
        },
    ];
    return (
        <Box sx={{ width: '100%', height: '85vh', paddingLeft: 2, paddingRight: 2 }}>
            <Card className={'mt-[15px]'} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '12px', }}>
                <CardHeader
                    title="Cron Job Data"
                    titleTypographyProps={{ variant: 'h6', display: 'flex', justifyContent: 'flex-start', paddingTop: 2, paddingBottom: 2 }}
                />
                <CardContent className={'min-h-[550px]'} style={{ border: 'none', marginTop: '-50px' }}>

                    {/* <div style={{ height: 250, width: '100%' }}> */}
                    <div style={{ height: 425, width: '100%' }}> {/* Adjusted for responsive view */}

                        {/* <ProtocolJSONToolbar
                                setIsAddButton={setIsAddButton}
                                setEditMovabledevice={setEditMovabledevice}
                                setOpen={setOpen}
                            /> */}


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
                            rows={[]}
                            columns={columns}
                            pageSize={10}
                            rowHeight={38}
                            // loading={isLoading}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                        {/* </div> */}



                        {/* <NotificationBar
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
                            /> */}
                    </div>
                    {/* <TabPanel value={value} index={1}>
                        <MyComponent />
                    </TabPanel> */}
                </CardContent>
            </Card>
        </Box>
    )
}

export default CronJobData