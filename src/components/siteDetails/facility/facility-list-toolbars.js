import {
  Box,
  Typography,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function FacilityListToolbar(props) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
      style={{
        height: '6vh',
        minHeight: '55px'
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
        Facility
      </Typography>
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
              Add Facility
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
