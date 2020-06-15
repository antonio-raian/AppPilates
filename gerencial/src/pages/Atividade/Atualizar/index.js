import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Grid,
  Box,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Tooltip,
  MenuItem,
} from "@material-ui/core";
import { Close, Add, Delete } from "@material-ui/icons";
import { post } from "../../../services/Requests";

const errors = [
  "Usuário não selecionado", //0
  "Título não definido", //1
  "Dificuldade não definida", //2
  "Data Treino não definida", //3
  "Não adicionou treinos", //4
];

const colunas = [
  { title: "Exercício", field: "exercicioname" },
  { title: "Repetições", field: "repeticoes" },
  { title: "Nº de Séries", field: "qtd_series" },
];

const Novo = (props) => {
  const { open, setOpen, refresh, item } = props;
  const [treinos, setTreinos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [atividade, setAtividade] = useState({});

  const [error, setError] = useState(errors[0]);

  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    console.log("ITEM", item);
    setAtividade({
      ...item,
      realizado: item.realizado === "Não" ? false : true,
      data_treino: moment().format("YYYY-MM-DD"),
    });

    post("/treino/busca", {})
      .then((res) => {
        if (res) {
          const treiList = [];
          res.map((tr) => {
            if (tr.ativo)
              treiList.push({ ...tr, exercicioname: tr.exercicio.nome });
          });
          setTreinos(treiList);
        }
      })
      .catch((err) => alert(err));

    post("/usuario/busca", {})
      .then((res) => {
        console.log("Resposta Busca Usuarios Atividade", res);
        const renderUser = [];
        res.map((u) => {
          if (u.situacao == "Ativo") return renderUser.push(u);
        });
        setUsuarios(renderUser);
      })
      .catch((err) => alert(err));
  };

  const _handleSubmit = () => {
    post("/usuario/atividade/altera", { atividade })
      .then((res) => {
        if (res) {
          console.log("Resposta", res);
          _handleClose();
        }
      })
      .catch((err) => alert(err));
  };

  const _handleClose = () => {
    setAtividade({});
    setOpen(false);
    refresh();
  };

  return (
    <>
      <Dialog maxWidth="md" open={open}>
        <DialogTitle>
          <Grid container>
            <Grid item xs={11}>
              <Box mt={4} mb={4}>
                <Typography variant="h4">Nova Atividade</Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box mt={2} mb={2}>
                <IconButton aria-label="close" onClick={_handleClose}>
                  <Close />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            {/* Usuario */}
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ paddingBottom: 10 }}
            >
              <Tooltip title="Usuário" placement="top-start">
                <Grid item xs={8}>
                  <TextField
                    id="usuario"
                    label="Usuário"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    value={atividade.usuario_id}
                    select
                    onChange={(e) => {
                      setAtividade({
                        ...atividade,
                        usuario_id: e.target.value,
                      });
                      if (!atividade.titulo) return setError(errors[1]);
                      if (!atividade.dificuldade_esperada)
                        return setError(errors[2]);
                      if (!atividade.data_treino) return setError(errors[3]);
                    }}
                  >
                    {usuarios.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Tooltip>
            </Grid>

            {/* Atividade */}
            <Grid container style={{ paddingBottom: 10 }}>
              <Typography variant="h3" style={{ paddingBottom: 10 }}>
                Atividade
              </Typography>
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                style={{ paddingBottom: 10 }}
              >
                <Tooltip title="Título do Treino" placement="top-start">
                  <Grid item xs={12}>
                    <TextField
                      id="titulo"
                      label="Título"
                      variant="outlined"
                      color="secondary"
                      inputProps={{ min: 1 }}
                      value={atividade.titulo}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setAtividade({
                          ...atividade,
                          titulo: e.target.value,
                        });
                        if (!atividade.usuario_id) return setError(errors[0]);
                        if (!atividade.dificuldade_esperada)
                          return setError(errors[2]);
                        if (!atividade.data_treino) return setError(errors[3]);
                      }}
                    />
                  </Grid>
                </Tooltip>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                style={{ paddingBottom: 10 }}
              >
                <Tooltip title="Dificuldade de 0 a 10" placement="top-start">
                  <Grid item xs={6}>
                    <TextField
                      id="dificuldade_esperada"
                      label="Dificuldade"
                      variant="outlined"
                      color="secondary"
                      type="number"
                      inputProps={{ min: 0, max: 10 }}
                      style={{ width: "98%" }}
                      value={atividade.dificuldade_esperada}
                      onChange={(e) => {
                        setAtividade({
                          ...atividade,
                          dificuldade_esperada: e.target.value,
                        });
                        if (!atividade.usuario_id) return setError(errors[0]);
                        if (!atividade.titulo) return setError(errors[1]);
                        if (!atividade.data_treino) return setError(errors[3]);
                      }}
                    />
                  </Grid>
                </Tooltip>
                <Tooltip title="Data do treino" placement="top-start">
                  <Grid item xs={6}>
                    <TextField
                      id="data_treino"
                      label="Data do Treino"
                      variant="outlined"
                      color="secondary"
                      format="DD/MM/YYYY"
                      value={atividade.data_treino}
                      type="date"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setAtividade({
                          ...atividade,
                          data_treino: e.target.value,
                        });
                        if (!atividade.usuario_id) return setError(errors[0]);
                        if (!atividade.titulo) return setError(errors[1]);
                        if (!atividade.dificuldade_esperada)
                          return setError(errors[2]);
                      }}
                    />
                  </Grid>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={_handleClose}>
              Cancelar
            </Button>
            <Button
              disabled={
                !(
                  atividade.usuario_id &&
                  atividade.titulo &&
                  atividade.dificuldade_esperada &&
                  atividade.data_treino
                )
              }
              variant="contained"
              color="inherit"
              onClick={_handleSubmit}
            >
              Salvar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Novo;
