import React, { useEffect, useState } from 'react';
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
import { FetchlineChartCurrentRYBUnBalance } from '../../../../../../../services/LoginPageService';


const CurrentImbalance = ({ sortDataType, fromDate, toDate, meterId, deviceId, openCurrentImbalance, HandleCurrentImbalanceClose }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        FetchlineChartCurrentRYBUnBalance({ meterId, deviceId, sortDataType, fromDate, toDate }, FetchCurrentRYBPFHandleSuccess, FetchCurrentRYBPFHandleException);
    }, [meterId, deviceId, sortDataType, fromDate, toDate]);

    const FetchCurrentRYBPFHandleSuccess = (dataObject) => {
        const transformedData = dataObject.data.map(({ time, currentImbalance }) => ({
            time,
            'Current Imbalance': currentImbalance

        }));
        setChartData(transformedData);
    };

    const FetchCurrentRYBPFHandleException = () => { };

    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };
    return (
        <Dialog open={openCurrentImbalance} onClose={HandleCurrentImbalanceClose} fullWidth maxWidth="md">
            <DialogTitle>Current Imbalance</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis > <Label
                            value="I"
                            position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                            angle={-90}
                            style={{ textAnchor: 'middle', fontSize: '18px' }}
                            fill="#f3a850" // Change the color here
                        /></YAxis>
                        <Tooltip contentStyle={tooltipStyles} />
                        <Legend />
                        <Line type="monotone" dataKey="Current Imbalance" stroke="#F3A850" dot={false} strokeWidth={3} />


                    </LineChart>
                </ResponsiveContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={HandleCurrentImbalanceClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CurrentImbalance;
