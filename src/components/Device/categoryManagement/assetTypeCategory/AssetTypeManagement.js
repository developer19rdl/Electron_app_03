import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { AssetTypeListResult } from './subComponent/assetType-list-results';

function AssetTypeManagement() {
  return (
    <Container maxWidth={true} sx={{}} style={{
      padding: '5px',
    }}>
      <Grid
        sx={{ marginTop: -2, padding: 0 }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <AssetTypeListResult />
      </Grid>
    </Container >
  );
}

export default AssetTypeManagement;
