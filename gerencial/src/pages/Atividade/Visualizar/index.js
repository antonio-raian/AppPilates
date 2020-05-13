import React from "react";
import { Grid, Typography, Box, TextField } from "@material-ui/core";

const Visualizar = (props) => {
  const {
    titulo,
    username,
    treinos,
    agendado,
    realizado,
    data_realizado,
    dif_esperada,
    dif_sentida,
    comentario,
    data,
  } = props;
  return (
    <Grid container direction="column">
      <Grid container directio="row">
        <Box mt={1}>
          <Typography variant="h3">{titulo}</Typography>
        </Box>
      </Grid>
      <Grid container directio="row">
        <Box mt={2}>
          <Typography variant="h5">Usuário: </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" style={{ paddingLeft: 10 }}>
            {username}
          </Typography>
        </Box>
      </Grid>
      <Grid container directio="row">
        <Box mt={2}>
          <Typography variant="h5">Exercícios: </Typography>
        </Box>
        <Grid container direction="column">
          {treinos.map((treino) => (
            <Grid container direction="row">
              <Box mt={2}>
                <Typography variant="h6" style={{ paddingLeft: 10 }}>
                  {treino.exercicio.nome}:
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="h6" style={{ paddingLeft: 10 }}>
                  {treino.qtd_series} séries com {treino.repeticoes} repetições
                  e descanso de {treino.intervalo} segundos entre uma série e
                  outra!
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container directio="row">
        <Box mt={4}>
          <Typography variant="h5">Dificuldade: </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" style={{ paddingLeft: 10 }}>
            {dif_esperada}
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
      <Grid container directio="row">
        <Box mt={4}>
          <Typography variant="h5">Agendado para: </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" style={{ paddingLeft: 10 }}>
            {agendado}
          </Typography>
        </Box>
      </Grid>

      {realizado == "Sim" ? (
        <>
          <Grid constainer>
            <Typography variant="h4">Avaliação </Typography>
          </Grid>
          <Grid container directio="row">
            <Box mt={4}>
              <Typography variant="h5">Realizado em: </Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="h6" style={{ paddingLeft: 10 }}>
                {data_realizado}
              </Typography>
            </Box>
          </Grid>
          <Grid container directio="row">
            <Box mt={4}>
              <Typography variant="h5">Dificuldade: </Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="h6" style={{ paddingLeft: 10 }}>
                {dif_sentida}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={4}>
              <Typography variant="h5">Comentarios: </Typography>
            </Box>
            <Box mt={2}>
              <TextField
                id="decricao"
                variant="outlined"
                color="secondary"
                style={{ width: "100%" }}
                multiline
                value={comentario}
              />
            </Box>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default Visualizar;
