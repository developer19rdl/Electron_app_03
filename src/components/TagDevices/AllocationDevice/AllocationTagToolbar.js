
import React from 'react'
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export function AllocationTagToolbar(props) {
    console.log("```````", props.showNotification)

    const handleAddMeter = () => {
        props.setIsAddButton(true);
        props.setEditTagAllocation([]);
        props.setOpen(true);
    };
    return (
        <Box
            sx={{
                mb: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}
        >
            <Typography sx={{ m: 1 }} variant="h5">
                Tag Allocation
            </Typography>
            <Box sx={{ m: 1 }} onClick={handleAddMeter}>
                <Stack direction="row" spacing={2}>
                    <Fab variant="extended" size="medium" color="primary" aria-label="add" sx={{
                        backgroundColor: "#051622", color: "#ffff",
                        "&:hover": {
                            backgroundColor: "#183b52", // Change to your desired hover color
                        },
                    }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add Tag Allocation
                    </Fab>
                </Stack>
            </Box>
        </Box>
    );
}