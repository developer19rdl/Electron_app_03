import { Button, Dialog, DialogContent, DialogTitle, Fab, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const RowdataView = ({ open, setOpen }) => {
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
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            getActions: (params) => [
                // <EditData selectedRow={params.row} />,
                // <DeleteData selectedRow={params.row} />,
                // <RowData selectedRow={params.row} />,
                // <Status selectedRow={params.row} />

            ],
        },
    ];
    return (
        <Dialog open={open} fullWidth={true} maxWidth="sm" >
            <   form
            // onSubmit={handleSubmit}
            >
                <DialogContent style={{ height: '78vh' }}>
                    <DialogTitle style={{ float: 'left', padding: '0px', marginBottom: '10px', fontSize: 25 }}>
                        {/* {isAddButton ? 'Add Device' : 'Edit Device'} */}
                        Raw Table
                    </DialogTitle>
                    <Grid container spacing={1}>
                        {/* Your existing fields here */}
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
                                // checkboxSelection
                                rows={''}
                                columns={columns}
                                pageSize={10}
                                rowHeight={38}
                                // loading={isLoading}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Grid>

                </DialogContent>
                <div className="rounded-md -space-y-px float-right" style={{ margin: '10px' }}>
                    {/* <Button type="submit" variant="contained" color="primary">
                        {isAddButton ? 'Add' : 'Update'}
                    </Button> */}
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="primary"
                        // style={{}}
                        sx={{
                            backgroundColor: "#051622", color: "#ffff",
                            "&:hover": {
                                backgroundColor: "#183b52", // Change to your desired hover color
                            }, marginLeft: '10px'
                        }}>


                        Cancel
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}

export default RowdataView