import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

const JSONPacketEdit = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false)
    };
    return (
        <Dialog open={open} fullWidth={true} maxWidth='md' >
            {/* <form> */}
            <DialogTitle style={{ fontSize: 25 }}>
                Json Packet Editor
            </DialogTitle>
            <DialogContent>
                <div style={{ backgroundColor: 'red', height: 400 }}> {/* Adjust height if needed */}
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}
                    sx={{
                        backgroundColor: "#051622", color: "#ffff",
                        "&:hover": {
                            backgroundColor: "#183b52", // Change to your desired hover color
                        },
                    }}>
                    Downlaod</Button>
                <Button onClick={handleClose} sx={{
                    backgroundColor: "#051622", color: "#ffff",
                    "&:hover": {
                        backgroundColor: "#183b52", // Change to your desired hover color
                    },
                }}>
                    Reset default
                </Button>
                <Button onClick={handleClose} sx={{
                    backgroundColor: "#051622", color: "#ffff",
                    "&:hover": {
                        backgroundColor: "#183b52", // Change to your desired hover color
                    },
                }}>Save Custom</Button>
                <Button onClick={handleClose} sx={{
                    backgroundColor: "#051622", color: "#ffff",
                    "&:hover": {
                        backgroundColor: "#183b52", // Change to your desired hover color
                    },
                }}>
                    Copy Custom Code
                </Button>

            </DialogActions>
            <Typography style={{ display: 'flex', justifyContent: 'center', color: 'red', padding: 2, fontSize: 18 }}>
                Note:Changing Above Code Device url May Not Work Properly

            </Typography>
            {/* </form> */}
        </Dialog>
    )
}
export default JSONPacketEdit

