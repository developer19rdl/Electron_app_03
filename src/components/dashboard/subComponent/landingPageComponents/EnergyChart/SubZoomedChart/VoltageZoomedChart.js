import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    Label,
} from 'recharts';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import moment from 'moment';

const VoltageZoomedChart = ({ chartData, handleClose, open }) => {
    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Voltage (R Y B)</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="day" tickFormatter={(value) => moment(value).format('MMM D')} />
                        <YAxis type="number" domain={['dataMin', 'dataMax']} ><Label
                            value="V"
                            position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                            angle={-90}
                            style={{ textAnchor: 'middle', fontSize: '18px' }}
                            fill="#f3a850" // Change the color here
                        /></YAxis>
                        <Tooltip contentStyle={tooltipStyles} />
                        <Legend />
                        <Line type="monotone" dataKey="R Voltage" stroke="#B70404" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="Y Voltage" stroke="#F0DE36" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="B Voltage" stroke="#0079FF" dot={false} strokeWidth={3} />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VoltageZoomedChart;
