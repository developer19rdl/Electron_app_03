import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import moment from 'moment';

const PerDayZoomedChart = ({ totalEnergyConsumption, handleClose, open, sortDataType }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle>Voltage (R Y B)</DialogTitle>
            <DialogContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={400} height={200} data={totalEnergyConsumption}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="day" tickFormatter={(day) => {
                            let formattedTime;

                            if (sortDataType === "week") {
                                formattedTime = moment(day).format("ddd"); // Display abbreviated day names for the week
                            } else if (sortDataType === "month") {
                                formattedTime = moment(day).format("MMMM YYYY"); // Display the month and year for the month
                            } else if (sortDataType === "year") {
                                formattedTime = moment(day).format("YYYY"); // Display the year for the year
                            } else {
                                formattedTime = moment(day).format("YYYY-MM-DD"); // Display the default format for other cases
                            }

                            console.log("Formatted Time:", formattedTime);

                            return formattedTime;
                        }} />
                        <YAxis domain={["auto", "auto"]}
                            padding={{ top: 30, bottom: 20 }} />
                        <Tooltip />
                        <Bar dataKey="EnergyPerDay" fill="#f73b5a" />
                    </BarChart>
                </ResponsiveContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default PerDayZoomedChart