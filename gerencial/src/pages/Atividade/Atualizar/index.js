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
import { ButtonSuccess } from "../styled";
import TableComponent from "../../../components/TableComponent";

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
  const { open, setOpen, refresh } = props;
  const [treinos, setTreinos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [atividade, setAtividade] = useState({});
  const [treino, setTreino] = useState("");
  const [atvTreinos, setAtvTreinos] = useState([]);
  const [showTreinos, setShowTreinos] = useState([]);

  const [error, setError] = useState(errors[0]);

  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    setAtividade({ data_treino: moment().format("YYYY-MM-DD") });
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
    post("/usuario/atividade/nova", { atividade, treinos: atvTreinos })
      .then((res) => {
        if (res) {
          console.log("Resposta", res);
          _handleClose();
        }
      })
      .catch((err) => alert(err));
  };

  const _handleClose = () => {
    setShowTreinos([]);
    setAtvTreinos([]);
    setAtividade({});
    setOpen(false);
    refresh();
  };

  const _handleAdd = () => {
    const dados = JSON.parse(treino);
    console.log("Chegou aq", treino);
    let aux = atvTreinos.slice();
    aux.push(dados.id);
    setAtvTreinos(aux);

    aux = showTreinos.slice();
    aux.push(dados);
    setShowTreinos(aux);
    setTreino("");
  };

  const _handleDelete = (treino) => {
    const aux = [];
    //deleta do show
    showTreinos.map((tre) => {
      if (tre.id != treino.id) aux.push(tre);
    });
    console.log("AUX", aux);

    setShowTreinos(aux);

    atvTreinos.map((tre) => {
      if (tre != treino.id) aux.push(tre);
    });
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
                      if (showTreinos.length <= 0) return setError(errors[4]);
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
                        if (showTreinos.length <= 0) return setError(errors[4]);
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
                      onChange={(e) => {
                        setAtividade({
                          ...atividade,
                          dificuldade_esperada: e.target.value,
                        });
                        if (!atividade.usuario_id) return setError(errors[0]);
                        if (!atividade.titulo) return setError(errors[1]);
                        if (!atividade.data_treino) return setError(errors[3]);
                        if (showTreinos.length <= 0) return setError(errors[4]);
                      }}
                    />
                  </Grid>
                </Tooltip>
                <Tooltip title="Data do treino" placement="top-start">
                  <Grid item xs={6}>
                    <TextField
                      id="data_treino"
                      label="Data do Treino"
                      value={atividade.data_treino}
                      variant="outlined"
                      color="secondary"
                      format="DD/MM/YYYY"
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
                        if (showTreinos.length <= 0) return setError(errors[4]);
                      }}
                    />
                  </Grid>
                </Tooltip>
              </Grid>
            </Grid>

            <Typography variant="h3" style={{ paddingBottom: 10 }}>
              Treinos
            </Typography>
            {/* Treinos */}
            <Grid container direction="row" style={{ paddingBottom: 10 }}>
              <Tooltip title="Treino" placement="top-start">
                <Grid item xs={11}>
                  <TextField
                    id="treino"
                    label="Treino"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "98%" }}
                    value={treino}
                    select
                    onChange={(e) => {
                      setTreino(e.target.value);
                      if (!atividade.usuario_id) return setError(errors[0]);
                      if (!atividade.titulo) return setError(errors[1]);
                      if (!atividade.dificuldade_esperada)
                        return setError(errors[2]);
                      if (!atividade.data_treino) return setError(errors[3]);
                      if (showTreinos.length <= 0) return setError(errors[4]);
                    }}
                  >
                    {treinos.map((element) => (
                      <MenuItem
                        key={element.id}
                        value={JSON.stringify(element)}
                      >
                        {element.exercicio.nome} -> R:{element.repeticoes} S:
                        {element.qtd_series} I:{element.intervalo}s
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Tooltip>
              <Tooltip
                title="Adcionar Treino nessa atividade"
                placement="top-start"
              >
                <Grid item xs={1}>
                  <ButtonSuccess
                    fullWidth
                    disabled={!treino}
                    style={{ height: "100%" }}
                    color="primary"
                    onClick={() => {
                      _handleAdd();
                    }}
                  >
                    <Add />
                  </ButtonSuccess>
                </Grid>
              </Tooltip>
              <Grid item xs={12} md={12} lg={12}>
                <TableComponent
                  columns={colunas}
                  data={showTreinos}
                  handleDetails={() => {}}
                  actions={[
                    (rowData) => ({
                      icon: () => <Delete />,
                      tooltip: "Remover Linha",
                      onClick: () => {
                        _handleDelete(rowData);
                      },
                    }),
                  ]}
                />
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
                  atividade.data_treino &&
                  atvTreinos.length > 0
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
