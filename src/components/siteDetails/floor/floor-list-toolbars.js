import {
  Box,
  Typography,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function FloorListToolbar(props) {
  return (
    <Box

      style={{
        height: '6vh',
        minHeight: '60px',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
        Floor
      </Typography>

      <div style={{ display: 'flex' }}>

        {/* {props.userAccess.add && (
        <Box
          sx={{ m: 1 }}
          onClick={() => {
            props.setOpenCentralHooter(true);
          }}
        >
          <Stack direction="row" spacing={2}>
            <Fab variant="extended" size="medium" color={props.colorValue} aria-label="add">
              {
                props.centralButtonText ==="REMOVE CENTRALIZED HOOTER" ? (
                  <RemoveIcon sx={{ mr: 1 }} />
                ):(
                  <AddIcon sx={{ mr: 1 }} />
                )

              }
              
              {props.centralButtonText}
            </Fab>
          </Stack>
        </Box>
      )} */}

        {props.userAccess.add && (
          <Box
            sx={{ m: 1 }}
            onClick={() => {
              props.setIsAddButton(true);
              props.setEditData([]);
              props.setOpen(true);
            }}
          >
            <Stack direction="row" spacing={2}>
              <Fab variant="extended" size="medium" color="primary" aria-label="add" sx={{
                backgroundColor: "#051622", color: "#ffff",
                "&:hover": {
                  backgroundColor: "#183b52", // Change to your desired hover color
                },
              }}>
                <AddIcon sx={{ mr: 1 }} />
                Add Floor
              </Fab>
            </Stack>
          </Box>
        )}

      </div>

    </Box>
  );
}
