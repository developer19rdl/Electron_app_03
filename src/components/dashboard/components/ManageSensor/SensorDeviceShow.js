// import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';

// function SensorDeviceShow({ selectedRowData, open, onClose }) {
//     return (
//         <Dialog open={open}  >
//             <DialogTitle style={{ fontSize: '22px', }}>Sensor Details</DialogTitle>
//             <DialogContent>
//                 {selectedRowData && (
//                     <>
//                         <Typography><strong>Sensor ID:</strong> {selectedRowData.id}</Typography>
//                         <Typography><strong>Sensor Name:</strong> {selectedRowData.sensorName}</Typography>
//                         <Typography><strong>Sensor Type:</strong> {selectedRowData.sensorType}</Typography>
//                         <Typography><strong>Sensor Category:</strong> {selectedRowData.sensorCategory}</Typography>
//                         <Typography><strong>Device Category:</strong> {selectedRowData.motorCategory}</Typography>
//                         <Typography><strong>Device Name:</strong> {selectedRowData.motorName}</Typography>
//                         <Typography><strong>Location:</strong> {selectedRowData.locationName}</Typography>
//                         {selectedRowData.SimulationType && (
//                             <Typography><strong>Simulator Type:</strong> {selectedRowData.SimulationType}</Typography>
//                         )}
//                         {selectedRowData.digitalSelection && (
//                             <Typography><strong>Digital Selection:</strong> {selectedRowData.digitalSelection}</Typography>
//                         )}
//                         {selectedRowData.DataWarningLevel && (
//                             <>
//                                 <Typography style={{ fontSize: '18px' }}><strong>Data Warning Level</strong></Typography>
//                                 <Typography><strong>Upper Warning Level:</strong> {selectedRowData.DwUpperLevMsg}</Typography>
//                                 <Typography><strong>Lower Warning Level:</strong> {selectedRowData.DwLowerLevMsg}</Typography>
//                             </>
//                         )}
//                         {selectedRowData.CriticalAlertLevel && (
//                             <>
//                                 <Typography style={{ fontSize: '18px' }}><strong>Critical Alert Level</strong></Typography>
//                                 <Typography><strong>Upper Alert Level:</strong> {selectedRowData.CaUpperLevMsg}</Typography>
//                                 <Typography><strong>Lower Alert Level:</strong> {selectedRowData.CaLowerLevMsg}</Typography>
//                             </>
//                         )}
//                         {selectedRowData.OutOfRange && (
//                             <>
//                                 <Typography style={{ fontSize: '18px' }}><strong>Out of Range</strong></Typography>
//                                 <Typography><strong>Upper Range Limit:</strong> {selectedRowData.OrUpperLevMsg}</Typography>
//                                 <Typography><strong>Lower Range Limit:</strong> {selectedRowData.OrLowerLevMsg}</Typography>
//                             </>
//                         )}
//                         {selectedRowData.constantField && (
//                             <Typography><strong>Constant:</strong> {selectedRowData.constantField}</Typography>
//                         )}
//                         {selectedRowData.randomField && (
//                             <Typography><strong>Random:</strong> {selectedRowData.randomField}</Typography>
//                         )}
//                         {selectedRowData.status && (
//                             <Typography><strong>Linear Status:</strong> {selectedRowData.status}</Typography>
//                         )}
//                         {selectedRowData.slaveId && (
//                             <Typography><strong>Slave Id:</strong> {selectedRowData.slaveId}</Typography>
//                         )}
//                         {selectedRowData.register && (
//                             <Typography><strong>Register:</strong> {selectedRowData.register}</Typography>
//                         )}
//                         {selectedRowData.Units && (
//                             <Typography><strong>Units:</strong> {selectedRowData.Units}</Typography>
//                         )}
//                     </>
//                 )}

//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="primary">Close</Button>
//             </DialogActions>
//         </Dialog>
//     );
// }
// export default SensorDeviceShow

// import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

// function SensorDeviceShow({ selectedRowData, open, onClose }) {
//     // Prepare the data for the DataGrid
//     const columns = [
//         { field: 'field', headerName: 'Field', width: 250 },
//         { field: 'value', headerName: 'Value', width: 300 },
//     ];

//     // Format the row data
//     const rows = selectedRowData
//         ? Object.keys(selectedRowData).map((key) => ({
//             id: key,
//             field: key,
//             value: selectedRowData[key],
//         }))
//         : [];

//     return (
//         <Dialog open={open} fullWidth={true} maxWidth="md">
//             <DialogTitle style={{ fontSize: '22px' }}>Sensor Details</DialogTitle>
//             <DialogContent>
//                 {selectedRowData && (
//                     <div style={{ height: 400, width: '100%' }}>
//                         <DataGrid rows={rows} columns={columns} pageSize={5} />
//                     </div>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="primary">Close</Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

// export default SensorDeviceShow;

import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function SensorDeviceShow({ selectedRowData, open, onClose }) {
    // Prepare the data for the DataGrid
    const columns = [
        {
            field: 'field', headerName: 'Sensor Field', flex: 1, renderCell: (params) => (
                <span>{params.value}</span> // Making the cell value bold
            ),
        },
        {
            field: 'value', headerName: 'Value', flex: 1, renderCell: (params) => (
                <span>{params.value}</span> // Regular cell value without bold
            ),
        },
    ];

    // Format the row data for DataGrid
    const rows = selectedRowData
        ? [
            { id: 1, field: 'Sensor ID', value: selectedRowData.id },
            { id: 2, field: 'Sensor Name', value: selectedRowData.sensorName },
            { id: 3, field: 'Sensor Type', value: selectedRowData.sensorType },
            { id: 4, field: 'Sensor Category', value: selectedRowData.sensorCategory },
            { id: 5, field: 'Device Category', value: selectedRowData.motorCategory },
            { id: 6, field: 'Device Name', value: selectedRowData.motorName },
            { id: 7, field: 'Location', value: selectedRowData.locationName },
            selectedRowData.SimulationType && {
                id: 8,
                field: 'Simulator Type',
                value: selectedRowData.SimulationType,
            },
            selectedRowData.digitalSelection && {
                id: 9,
                field: 'Digital Selection',
                value: selectedRowData.digitalSelection,
            },
            selectedRowData.DwUpperLevMsg && {
                id: 10,
                field: 'Upper Warning Level',
                value: selectedRowData.DwUpperLevMsg,
            },
            selectedRowData.DwLowerLevMsg && {
                id: 11,
                field: 'Lower Warning Level',
                value: selectedRowData.DwLowerLevMsg,
            },
            selectedRowData.CaUpperLevMsg && {
                id: 12,
                field: 'Upper Alert Level',
                value: selectedRowData.CaUpperLevMsg,
            },
            selectedRowData.CaLowerLevMsg && {
                id: 13,
                field: 'Lower Alert Level',
                value: selectedRowData.CaLowerLevMsg,
            },
            selectedRowData.OrUpperLevMsg && {
                id: 14,
                field: 'Upper Range Limit',
                value: selectedRowData.OrUpperLevMsg,
            },
            selectedRowData.OrLowerLevMsg && {
                id: 15,
                field: 'Lower Range Limit',
                value: selectedRowData.OrLowerLevMsg,
            },
            selectedRowData.constantField && {
                id: 16,
                field: 'Constant',
                value: selectedRowData.constantField,
            },
            selectedRowData.randomField && {
                id: 17,
                field: 'Random',
                value: selectedRowData.randomField,
            },
            selectedRowData.status && {
                id: 18,
                field: 'Linear Status',
                value: selectedRowData.status,
            },
            selectedRowData.slaveId && {
                id: 19,
                field: 'Slave Id',
                value: selectedRowData.slaveId,
            },
            selectedRowData.register && {
                id: 20,
                field: 'Register',
                value: selectedRowData.register,
            },
            selectedRowData.Units && {
                id: 21,
                field: 'Units',
                value: selectedRowData.Units,
            },
        ].filter(Boolean)
        : [];

    return (
        <Dialog open={open} fullWidth={true} maxWidth="sm">
            <DialogTitle style={{ fontSize: '22px', justifyContent: 'start', display: 'flex' }}>Sensor Details</DialogTitle>
            <DialogContent>
                {selectedRowData && (
                    <div style={{ height: 400, }}>
                        <DataGrid sx={{
                            border: '',
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: '', // This removes the top border of the footer (pagination area)
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

                        }} rows={rows} columns={columns} pageSize={8} rowHeight={35} />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SensorDeviceShow;

// ///////////////////
// import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

// function SensorDeviceShow({ selectedRowData, open, onClose }) {
//     // Prepare the columns dynamically based on the fields
//     const columns = [
//         { field: 'sensorId', headerName: 'Sensor ID', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'sensorName', headerName: 'Sensor Name', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'sensorType', headerName: 'Sensor Type', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'sensorCategory', headerName: 'Sensor Category', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'motorCategory', headerName: 'Device Category', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'motorName', headerName: 'Device Name', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'locationName', headerName: 'Location', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'simulationType', headerName: 'Simulator Type', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'digitalSelection', headerName: 'Digital Selection', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'dwUpperLevMsg', headerName: 'Upper Warning Level', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'dwLowerLevMsg', headerName: 'Lower Warning Level', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'caUpperLevMsg', headerName: 'Upper Alert Level', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'caLowerLevMsg', headerName: 'Lower Alert Level', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'orUpperLevMsg', headerName: 'Upper Range Limit', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'orLowerLevMsg', headerName: 'Lower Range Limit', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'constantField', headerName: 'Constant', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'randomField', headerName: 'Random', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'status', headerName: 'Linear Status', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'slaveId', headerName: 'Slave Id', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'register', headerName: 'Register', width: 130, headerAlign: 'center', align: 'center' },
//         { field: 'units', headerName: 'Units', width: 130, headerAlign: 'center', align: 'center' },
//     ];

//     // Prepare the row data for the DataGrid
//     const row = selectedRowData
//         ? {
//             id: selectedRowData.id,
//             sensorId: selectedRowData.id,
//             sensorName: selectedRowData.sensorName,
//             sensorType: selectedRowData.sensorType,
//             sensorCategory: selectedRowData.sensorCategory,
//             motorCategory: selectedRowData.motorCategory,
//             motorName: selectedRowData.motorName,
//             locationName: selectedRowData.locationName,
//             simulationType: selectedRowData.SimulationType,
//             digitalSelection: selectedRowData.digitalSelection,
//             dwUpperLevMsg: selectedRowData.DwUpperLevMsg,
//             dwLowerLevMsg: selectedRowData.DwLowerLevMsg,
//             caUpperLevMsg: selectedRowData.CaUpperLevMsg,
//             caLowerLevMsg: selectedRowData.CaLowerLevMsg,
//             orUpperLevMsg: selectedRowData.OrUpperLevMsg,
//             orLowerLevMsg: selectedRowData.OrLowerLevMsg,
//             constantField: selectedRowData.constantField,
//             randomField: selectedRowData.randomField,
//             status: selectedRowData.status,
//             slaveId: selectedRowData.slaveId,
//             register: selectedRowData.register,
//             units: selectedRowData.Units,
//         }
//         : {};

//     // const columns = allColumns.filter((col) => {
//     //     // Only include columns where the corresponding data exists
//     //     return selectedRowData && selectedRowData[col.field] !== undefined && selectedRowData[col.field] !== null;
//     // });

//     return (
//         <Dialog open={open} fullWidth={true} maxWidth="lg">
//             <DialogTitle style={{ fontSize: '22px' }}>Sensor Details</DialogTitle>
//             <DialogContent>
//                 {selectedRowData && (
//                     <div style={{ height: 400, width: '100%' }}>
//                         <DataGrid rows={[row]} columns={columns} pageSize={1} getRowId={(row) => row.id} />
//                     </div>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="primary">
//                     Close
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

// export default SensorDeviceShow;
