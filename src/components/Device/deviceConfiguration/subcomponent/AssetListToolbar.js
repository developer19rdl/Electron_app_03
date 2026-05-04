import React from 'react';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function AssetListToolbar(props) {
  return (
    <Box
      sx={{
        mb: '0px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        sx={{ m: 0, paddingLeft: '43px' }}
        variant="h5"
        component="span"
      >
        Add Asset
      </Typography>
      {props.userAccess.add && (
        <Box
          sx={{ mb: 1 }}
          onClick={() => {
            props.setIsAddButton(true);
            props.setEditConfigSetup([]);
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
                backgroundColor: "#051622", color: "#ffff",
                "&:hover": {
                  backgroundColor: "#183b52", // Change to your desired hover color
                },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Asset
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
