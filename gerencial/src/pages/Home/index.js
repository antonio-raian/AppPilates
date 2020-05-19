import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Home = () => {
  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {};

  return (
    <>
      <Paper square>
        <Grid container style={{}}>
          <Grid item md={12} lg={12}>
            <Typography variant="h2">DashBoard</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
