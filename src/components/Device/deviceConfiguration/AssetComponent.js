import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { AssetListResults } from './subcomponent/AssetListResults';

function AssetComponent(props) {
  return (
    <Container maxWidth={false} style={{ marginTop: -2, padding: '5px' }}>
      <Grid
        sx={{ marginTop: -2, padding: 0 }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <AssetListResults />
      </Grid>
    </Container>
  );
}

export default AssetComponent;
