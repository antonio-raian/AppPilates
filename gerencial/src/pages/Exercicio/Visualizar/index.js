import React from "react";
import { Grid, Typography, Box, TextField } from "@material-ui/core";
import moment from "moment";

const Visualizar = (props) => {
  const { nome, descricao, link, data } = props;
  return (
    <>
      <Grid container direction="column">
        <Grid container directio="row">
          <Box mt={1}>
            <Typography variant="h3">{nome}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={4}>
            <Typography variant="h5">Descrição: </Typography>
          </Box>
          <Box mt={2}>
            <TextField
              id="decricao"
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              multiline
              value={descricao}
            />
          </Box>
        </Grid>
        <Grid container direction="row">
          <Box mt={2}>
            <Typography variant="h5">Vídeo: </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" style={{ paddingLeft: 15 }}>
              {link}
            </Typography>
          </Box>
        </Grid>
        <Grid container direction="row">
          <Box mt={2}>
            <Typography variant="h5">Criado em: </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" style={{ paddingLeft: 15 }}>
              {data}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Visualizar;
