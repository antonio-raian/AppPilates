import React from "react";
import { Grid, Typography, Box, TextField } from "@material-ui/core";

const Visualizar = (props) => {
  const { exercicio, repeticoes, series, intervalo, data } = props;
  return (
    <>
      <Grid container direction="column">
        <Grid container directio="row">
          <Box mt={1}>
            <Typography variant="h3">{exercicio.nome}</Typography>
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
              value={exercicio.descricao}
            />
          </Box>
        </Grid>
        <Grid container directio="row">
          <Box mt={2}>
            <Typography variant="h5">Vídeo: </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" style={{ paddingLeft: 10 }}>
              {exercicio.link}
            </Typography>
          </Box>
        </Grid>
        <Grid container directio="row">
          <Box mt={4}>
            <Typography variant="h5">O que fazer: </Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="h6" style={{ paddingLeft: 10 }}>
              {series} séries com {repeticoes} repetições e descanso de{" "}
              {intervalo} segundos entre uma série e outra!
            </Typography>
          </Box>
        </Grid>
        <Grid container directio="row">
          <Box mt={4}>
            <Typography variant="h5">Criado em: </Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="h6" style={{ paddingLeft: 10 }}>
              {data}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Visualizar;
