import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function CategoryListToolbar(props) {
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
      <Typography
        sx={{ m: 0, paddingLeft: '43px' }}
        variant="h5"
      >
        Category
      </Typography>
      {props.userAccess.add && (
        <Box
          sx={{ m: 0 }}
          onClick={() => {
            props.setIsAddButton(true);
            props.setEditCategory([]);
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
              Add Category
            </Fab>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
