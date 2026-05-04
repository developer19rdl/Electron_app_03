import React, { useState } from 'react';
import { Grid, Box, Checkbox, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';

const MeterI1I2I3Alert = ({
    showI1,
    showI2,
    showI3,
    i1AlertType,
    i1LowAlert,
    i1HighAlert,
    i2AlertType,
    i2LowAlert,
    i2HighAlert,
    i3AlertType,
    i3LowAlert,
    i3HighAlert,
    setShowI1,
    setShowI2,
    setShowI3,
    setI1AlertType,
    setI1LowAlert,
    setI1HighAlert,
    setI2AlertType,
    setI2LowAlert,
    setI2HighAlert,
    setI3AlertType,
    setI3LowAlert,
    setI3HighAlert,
    maxI1,
    setMaxI1,
    minI1,
    setMinI1,

    maxI2,
    setMaxI2,
    minI2,
    setMinI2,

    maxI3,
    setMaxI3,
    minI3,
    setMinI3,

}) => {

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'I1') {
            setShowI1(checked);
        } else if (name === 'I2') {
            setShowI2(checked);
        } else if (name === 'I3') {
            setShowI3(checked);
        }
    };
    return (
        <div>
            <Grid container spacing={2}>

                <>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Upper Warning Level"
                            value={maxI1}

                            onChange={(e) => {
                                setMaxI1(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Minimum Warning Level"
                            value={minI1}

                            onChange={(e) => {
                                setMinI1(e.target.value);
                            }}
                        />
                    </Grid>



                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={12}
                    >

                        <TextField
                            sx={{ marginTop: 0 }}
                            value={i1LowAlert}
                            onChange={(e) => {
                                setI1LowAlert(e.target.value);
                            }}
                            margin="normal"
                            required
                            id="outlined-required"
                            label="Low alert message"
                            fullWidth
                            autoComplete="off"
                        />

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <TextField
                            sx={{ marginTop: 0 }}
                            value={i1HighAlert}
                            onChange={(e) => {
                                setI1HighAlert(e.target.value);
                            }}
                            margin="normal"
                            required
                            id="outlined-required"
                            label="High alert message"
                            fullWidth
                            autoComplete="off"
                        />
                        {/* </div> */}
                    </Grid>

                </>

                {
                    showI2 && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    label="Maximum Rated I2"
                                    value={maxI2}
                                    fullWidth

                                    onChange={(e) => {
                                        setMaxI2(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Minimum Rated I2"
                                    fullWidth
                                    value={minI2}

                                    onChange={(e) => {
                                        setMinI2(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                sx={{ mt: 0, padding: 0 }}
                                item
                                xs={12}


                            >
                                <Box >
                                    <FormControl margin="normal" sx={{ marginTop: 0, width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label">
                                            Alert
                                        </InputLabel>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            value={i2AlertType}
                                            label="Sensor alert"
                                            onChange={(e) => {
                                                setI2AlertType(e.target.value);
                                            }}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Both">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            {i2AlertType === 'Low' || i2AlertType === 'Both'
                                ? (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >

                                        <TextField
                                            sx={{ marginTop: 0 }}
                                            value={i2LowAlert}
                                            onChange={(e) => {
                                                setI2LowAlert(e.target.value);
                                            }}
                                            margin="normal"
                                            required
                                            id="outlined-required"
                                            label="Low alert message"
                                            fullWidth
                                            autoComplete="off"
                                        />

                                    </Grid>
                                )
                                : ''}
                            {i2AlertType === 'High' || i2AlertType === 'Both'
                                ? (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            sx={{ marginTop: 0 }}
                                            value={i2HighAlert}
                                            onChange={(e) => {
                                                setI2HighAlert(e.target.value);
                                            }}
                                            margin="normal"
                                            required
                                            id="outlined-required"
                                            label="High alert message"
                                            fullWidth
                                            autoComplete="off"
                                        />
                                    </Grid>
                                )
                                : ''}


                        </>
                    )
                }

                {
                    showI3 && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    label="Maximum Rated I3"
                                    value={maxI3}
                                    fullWidth
                                    onChange={(e) => {
                                        setMaxI3(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Minimum Rated I3"
                                    value={minI3}
                                    fullWidth
                                    onChange={(e) => {
                                        setMinI3(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                sx={{ mt: 0, padding: 0 }}
                                item
                                xs={12}
                            >
                                <Box >
                                    <FormControl margin="normal" sx={{ marginTop: 0, width: "100%" }}>
                                        <InputLabel id="demo-simple-select-label">
                                            Alert
                                        </InputLabel>
                                        <Select

                                            labelId="demo-simple-select-label"
                                            value={i3AlertType}
                                            label="Sensor alert"
                                            onChange={(e) => {
                                                setI3AlertType(e.target.value);
                                            }}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Both">Both</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            {i3AlertType === 'Low' || i3AlertType === 'Both'
                                ? (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            sx={{ marginTop: 0 }}
                                            value={i3LowAlert}
                                            onChange={(e) => {
                                                setI3LowAlert(e.target.value);
                                            }}
                                            margin="normal"
                                            required
                                            id="outlined-required"
                                            label="Low alert message"
                                            fullWidth
                                            autoComplete="off"
                                        />

                                    </Grid>
                                )
                                : ''}
                            {i3AlertType === 'High' || i3AlertType === 'Both'
                                ? (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            sx={{ marginTop: 0 }}
                                            value={i3HighAlert}
                                            onChange={(e) => {
                                                setI3HighAlert(e.target.value);
                                            }}
                                            margin="normal"
                                            required
                                            id="outlined-required"
                                            label="High alert message"
                                            fullWidth
                                            autoComplete="off"
                                        />
                                        {/* </div> */}
                                    </Grid>
                                )
                                : ''}
                        </>
                    )
                }
            </Grid>
        </div>
    )
}

export default MeterI1I2I3Alert
