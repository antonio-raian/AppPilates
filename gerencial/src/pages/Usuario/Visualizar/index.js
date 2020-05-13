import React from "react";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";

const Visualizar = (props) => {
  const { username, categoria, situacao, data } = props;
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3">{username}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Categoria:</Typography>
          <Grid item style={{ padding: 3 }}>
            <Typography variant="h7" style={{ paddingRight: 8 }}>
              Nome: {categoria.nome}
            </Typography>
            <Typography variant="h7">
              Descrição: {categoria.descricao}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6">Situação: {situacao}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Admissão: {moment(data).format("DD/MM/YYYY HH:mm")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Visualizar;
