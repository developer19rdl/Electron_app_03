import {
  Box,
  Typography,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function LocationListToolbar(props) {
  return (
    <Box
      className="min-h-[6px]"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        // backgroundColor: 'red'
      }}
    >
      <Typography variant="h5" sx={{ m: 1 }}>
        Location
      </Typography>

      {props.userAccess.add && (
        <Box
          sx={{ m: 1 }}
          onClick={() => {
            props.setIsAddButton(true);
            props.setEditCustomer([]);
            props.setOpen(true);
          }}
        >
          <Stack direction="row" spacing={2}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{
                backgroundColor: "#051622",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#183b52",
                },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Location
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>

  );
}
