import React, { useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

const Home = () => {
  useEffect(() => {
    _handleLoad();
  }, []);

  const _handleLoad = () => {};

  return (
    <>
      <Paper square>
        <Grid container style={{}}>
          <Grid item xs={12} md={12} lg={12}>
            DashBoard
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Home;
