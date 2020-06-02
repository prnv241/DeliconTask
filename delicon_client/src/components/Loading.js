import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const Loading = () => {
  return (
    <>
      <Grid item sm></Grid>
      <Grid item sm style={{textAlign: 'center', marginTop: '45vh'}}>
        <CircularProgress />
        <p style={{marginTop: 10}}>Loading...</p>
      </Grid>
      <Grid item sm></Grid>
    </>
  );
}

export default Loading