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
import { FetchVoltageRYBUnBalance } from '../../../../../../../services/LoginPageService';
import moment from 'moment';

const VoltageImbalance = ({ sortDataType, fromDate, toDate, meterId, deviceId, openVoltageImbalance, HandleVoltageImbalanceClose }) => {
    // Sample voltage data for Red (R), Yellow (Y), and Blue (B) phases
    const [chartData, setChartData] = useState([]);



    useEffect(() => {
        FetchVoltageRYBUnBalance({ meterId, deviceId, sortDataType, fromDate, toDate }, FetchVoltageRYBtHandleSuccess, FetchVoltageRYBHandleException);
    }, []);

    const FetchVoltageRYBtHandleSuccess = (dataObject) => {
        const transformedData = dataObject.data.map(({ time, voltageImbalance }) => ({
            time,
            'Voltage Imbalance': voltageImbalance,


        }));
        setChartData(transformedData);
    }

    const FetchVoltageRYBHandleException = () => { }

    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };

    return (
        <Dialog open={openVoltageImbalance} onClose={HandleVoltageImbalanceClose} fullWidth maxWidth="md">
            <DialogTitle>Voltage Imbalance</DialogTitle>
            <DialogContent>
                {/* Recharts LineChart */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />

                        <YAxis type="number" domain={['dataMin', 'dataMax']} >
                            <Label
                                value="V"
                                position="insideLeft" // Use 'insideLeft' to move the label inside and to the left
                                angle={-90}
                                style={{ textAnchor: 'middle', fontSize: '18px' }}
                                fill="#f3a850" // Change the color here
                            />
                        </YAxis>

                        <Tooltip contentStyle={tooltipStyles} labelFormatter={(label) => moment(label).format('MMM D, YYYY h:mm A')} />
                        <Legend />
                        <Line type="monotone" dataKey="Voltage Imbalance" stroke="#F3A850" dot={false} strokeWidth={3} />

                    </LineChart>
                </ResponsiveContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleVoltageImbalanceClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VoltageImbalance;
