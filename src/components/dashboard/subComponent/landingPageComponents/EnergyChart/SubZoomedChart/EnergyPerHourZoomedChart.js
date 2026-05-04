import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


const EnergyPerDayZoomedChart = ({ totalEnergyPerHour, handleClose, open }) => {


    const tooltipStyles = {
        backgroundColor: 'gray',
        border: '1px solid #ccc',
        padding: '8px',
        color: '#fff',
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Energy/Hour</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={totalEnergyPerHour}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_hour" />
                        <YAxis domain={["auto", "auto"]}
                            padding={{ top: 30, bottom: 20 }} />
                        <Tooltip contentStyle={tooltipStyles} labelFormatter={(label) => moment(label).format('MMM D, YYYY h:mm A')} />
                        <Bar dataKey="EnergyPerHour" fill="#22c1e2" />
                    </BarChart>
                </ResponsiveContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog >
    )

}

export default EnergyPerDayZoomedChart