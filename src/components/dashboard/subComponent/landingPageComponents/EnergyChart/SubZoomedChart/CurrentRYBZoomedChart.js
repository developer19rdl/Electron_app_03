import React, { useState } from 'react';
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
    ReferenceArea,
    Label,
} from 'recharts';
import moment from 'moment';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CurrentRYBZoomedChart = ({ chartData, handleClose, open, xAxisTicks }) => {
    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };

    const [yAxisZoom, setYAxisZoom] = useState({});

    const handleMouseEnter = (e) => {
        const { chartY, value } = e;
        setYAxisZoom({
            y: chartY,
            label: value,
        });
    };

    const handleMouseLeave = () => {
        setYAxisZoom({});
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Current (R,Y,B,PF)</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="created_at"
                            ticks={xAxisTicks}
                        />
                        <YAxis
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            allowDataOverflow
                            domain={['auto', 'auto']}
                        > <Label
                                value="I"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            /></YAxis>
                        <Tooltip
                            contentStyle={tooltipStyles}
                           
                        />
                        <Legend />
                        <Line type="monotone" dataKey="R Current" stroke="#FE0000" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="Y Current" stroke="#F4D160" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="B Current" stroke="#4E4FEB" dot={false} strokeWidth={3} />
                        <Line type="monotone" dataKey="PF" stroke="#e91e63" className="chart-line" dot={false} strokeWidth={3} />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                        {yAxisZoom.y && (
                            <ReferenceArea y1={yAxisZoom.y} y2={400} fill="#8884d8" fillOpacity={0.3}>
                                <Label value={yAxisZoom.label} position="insideTopLeft" />
                            </ReferenceArea>
                        )}
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

export default CurrentRYBZoomedChart;