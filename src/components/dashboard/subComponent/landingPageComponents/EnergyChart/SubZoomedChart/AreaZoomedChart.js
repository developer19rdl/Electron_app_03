import React, { useState } from 'react';
import {
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Brush,
    ReferenceArea,
    ResponsiveContainer,
    Area,
} from 'recharts';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AreaZoomedChart = ({ energyLoadData, handleClose, open, xAxisTicks }) => {
    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };

    const [yAxisZoom, setYAxisZoom] = useState({});

    const handleMouseEnter = (e) => {
        const { chartX, chartY, value } = e;
        setYAxisZoom({
            y: chartY,
            height: 400 - chartY,
            label: value,
        });
    };

    const handleMouseLeave = () => {
        setYAxisZoom({});
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Load(kW)</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={energyLoadData} syncId="chartZoom">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" ticks={xAxisTicks} />
                        <YAxis
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            allowDataOverflow
                            domain={['auto', 'auto']}
                            ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]} // Customize tick values here
                        />
                        <Tooltip contentStyle={tooltipStyles} />
                        <Legend />
                        <Area type="monotone" dataKey="load" stroke="#ffffff" fill="#FAFAFA" />
                        <Brush dataKey="time" height={30} stroke="#8884d8" />
                        {yAxisZoom.y && (
                            <ReferenceArea y={yAxisZoom.y} height={yAxisZoom.height} fill="#8884d8" fillOpacity={0.3}>
                                <Label value={yAxisZoom.label} position="insideTopLeft" />
                            </ReferenceArea>
                        )}
                    </AreaChart>
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

export default AreaZoomedChart;