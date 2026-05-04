import React, { useState, useEffect } from 'react'
import { Grid, Box, Checkbox, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';

const VoltageAlert = ({
    showV1,
    showV2,
    showV3,
    v1AlertType,
    v1LowAlert,
    v1HighAlert,
    v2AlertType,
    v2LowAlert,
    v2HighAlert,
    v3AlertType,
    v3LowAlert,
    v3HighAlert,
    setShowV1,
    setShowV2,
    setShowV3,
    setV1AlertType,
    setV1LowAlert,
    setV1HighAlert,
    setV2AlertType,
    setV2LowAlert,
    setV2HighAlert,
    setV3AlertType,
    setV3LowAlert,
    setV3HighAlert,
    maxV1,
    minV1,
    setMaxV1,
    setMinV1,
    maxV2,
    minV2,
    setMinV2,
    setMaxV2,
    maxV3,
    minV3,
    setMinV3,
    setMaxV3,

}) => {



    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'R') {
            setShowV1(checked);
        } else if (name === 'Y') {
            setShowV2(checked);
        } else if (name === 'B') {
            setShowV3(checked);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {/* <Grid
                sx={{ mt: 1, padding: 0 }}
                item
                xs={12}
            >
                <Typography variant="subtitle1" gutterBottom>
                    Current  Alert Settings
                </Typography>
            </Grid> */}
                {/* <Grid container spacing={2}> */}
                <Grid item xs={4}>
                    <label>
                        <Checkbox
                            checked={showV1}
                            onChange={handleCheckboxChange}
                            name="R"
                        />
                        R
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <Checkbox
                            checked={showV2}
                            onChange={handleCheckboxChange}
                            name="Y"
                        />
                        Y
                    </label>
                </Grid>
                <Grid item xs={4}>
                    <label>
                        <Checkbox
                            checked={showV3}
                            onChange={handleCheckboxChange}
                            name="B"
                        />
                        B
                    </label>
                </Grid>


                {showV1 && (
                    <>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Maximum Rated R"
                                // Other props for TextField component
                                value={maxV1}

                                onChange={(e) => {
                                    setMaxV1(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Minimum Rated R"
                                // Other props for TextField component
                                value={minV1}

                                onChange={(e) => {
                                    setMinV1(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid
                            sx={{ mt: 0, padding: 0 }}
                            item
                            xs={12}

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
                                        value={v1AlertType}
                                        label="Sensor alert"
                                        onChange={(e) => {
                                            setV1AlertType(e.target.value);
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

                        {v1AlertType === 'Low' || v1AlertType === 'Both'
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
                                        value={v1LowAlert}
                                        // disabled={moduleAccess.edit === false && true}
                                        // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                        onChange={(e) => {
                                            setV1LowAlert(e.target.value);
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
                        {v1AlertType === 'High' || v1AlertType === 'Both'
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
                                        value={v1HighAlert}
                                        // disabled={moduleAccess.edit === false && true}
                                        // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                        onChange={(e) => {
                                            setV1HighAlert(e.target.value);
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


                    </>
                )
                }

                {
                    showV2 && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    label="Maximum Rated I2"
                                    // Other props for TextField component
                                    value={maxV2}
                                    fullWidth
                                    onChange={(e) => {
                                        setMaxV2(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Minimum Rated I2"
                                    // Other props for TextField component
                                    value={minV2}
                                    fullWidth
                                    onChange={(e) => {
                                        setMinV2(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                sx={{ mt: 0, padding: 0 }}
                                item
                                xs={12}

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
                                            value={v2AlertType}
                                            label="Sensor alert"
                                            onChange={(e) => {
                                                setV2AlertType(e.target.value);
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

                            {v2AlertType === 'Low' || v2AlertType === 'Both'
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
                                            value={v2LowAlert}
                                            // disabled={moduleAccess.edit === false && true}
                                            // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                            onChange={(e) => {
                                                setV2LowAlert(e.target.value);
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
                            {v2AlertType === 'High' || v2AlertType === 'Both'
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
                                            value={v2HighAlert}
                                            // disabled={moduleAccess.edit === false && true}
                                            // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                            onChange={(e) => {
                                                setV2HighAlert(e.target.value);
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


                        </>
                    )
                }

                {
                    showV3 && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    label="Maximum Rated I3"
                                    // Other props for TextField component
                                    value={maxV3}
                                    fullWidth
                                    onChange={(e) => {
                                        setMaxV3(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Minimum Rated I3"
                                    // Other props for TextField component
                                    value={minV3}
                                    fullWidth
                                    onChange={(e) => {
                                        setMinV3(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                sx={{ mt: 0, padding: 0 }}
                                item
                                xs={12}

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
                                            value={v3AlertType}
                                            label="Sensor alert"
                                            onChange={(e) => {
                                                setV3AlertType(e.target.value);
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

                            {v3AlertType === 'Low' || v3AlertType === 'Both'
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
                                            value={v3LowAlert}
                                            // disabled={moduleAccess.edit === false && true}
                                            // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                            onChange={(e) => {
                                                setV3LowAlert(e.target.value);
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
                            {v3AlertType === 'High' || v3AlertType === 'Both'
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
                                            value={v3HighAlert}
                                            // disabled={moduleAccess.edit === false && true}
                                            // onBlur={() => validateForNullValue(alertTag, "alertTag")}
                                            onChange={(e) => {
                                                setV3HighAlert(e.target.value);
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



                        </>
                    )
                }





            </Grid>

        </div >
    )
}

export default VoltageAlert
