import React, { useState, useEffect } from 'react'
import { Grid, Box, Checkbox, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';


const CurrentUnbalnce = (
    {
        curUnbalAlertType,
        setCurUnbalAlertType,
        curUnbalLowAlert,
        setCurUnbalLowAlert,
        curUnbalHighAlert,
        setCurUnbalHighAlert,
        curUnbalMax,
        setCurUnbalMax,
        curUnbalMin,
        setCurUnbalMin,
    }
) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Maximum Rated Current Unbalance"
                        value={curUnbalMax}

                        onChange={(e) => {
                            setCurUnbalMax(e.target.value);
                        }}

                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Minimum Rated Current Unbalance"
                        value={curUnbalMin}

                        onChange={(e) => {
                            setCurUnbalMin(e.target.value);
                        }}

                    />
                </Grid>
                <Grid
                    sx={{ mt: 0, padding: 0 }}
                    item
                    xs={6}

                >
                    <Box >
                        <FormControl fullWidth margin="normal" sx={{ marginTop: 0 }}>
                            <InputLabel id="demo-simple-select-label">
                                Alert
                            </InputLabel>
                            <Select
                                fullWidth
                                // sx={{ minWidth: 250 }}
                                labelId="demo-simple-select-label"
                                value={curUnbalAlertType}
                                label="Sensor alert"
                                onChange={(e) => {
                                    setCurUnbalAlertType(e.target.value);
                                    // setWarningMinValue(warningMinValue);
                                    // setWarningMaxValue(warningMaxValue);
                                }}
                            // error={errorObject?.deviceName?.errorStatus}
                            // helperText={errorObject?.deviceName?.helperText}
                            >
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Both">Both</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {curUnbalAlertType === 'Low' || curUnbalAlertType === 'Both'
                    ? (
                        <Grid
                            // sx={{ mt: 0, padding: 0 }}
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            xl={6}
                        >

                            <TextField
                                sx={{ marginTop: 0 }}
                                value={curUnbalLowAlert}
                                // disabled={moduleAccess.edit === false && true}
                                // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                onChange={(e) => {
                                    setCurUnbalLowAlert(e.target.value);
                                }}
                                margin="normal"
                                required
                                id="outlined-required"
                                label="Low alert message"
                                fullWidth
                                // error={errorObject?.deviceName?.errorStatus}
                                // helperText={errorObject?.deviceName?.helperText}
                                autoComplete="off"
                            />

                        </Grid>
                    )
                    : ''}
                {curUnbalAlertType === 'High' || curUnbalAlertType === 'Both'
                    ? (
                        <Grid
                            // sx={{ mt: 0, padding: 0 }}
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            {/* <div className="rounded-md -space-y-px"> */}
                            <TextField
                                sx={{ marginTop: 0 }}
                                value={curUnbalHighAlert}
                                // disabled={moduleAccess.edit === false && true}
                                // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                onChange={(e) => {
                                    setCurUnbalHighAlert(e.target.value);
                                }}
                                margin="normal"
                                required
                                id="outlined-required"
                                label="High alert message"
                                fullWidth
                                // error={errorObject?.deviceName?.errorStatus}
                                // helperText={errorObject?.deviceName?.helperText}
                                autoComplete="off"
                            />
                            {/* </div> */}
                        </Grid>
                    )
                    : ''}

            </Grid>
        </>
    )
}

export default CurrentUnbalnce
