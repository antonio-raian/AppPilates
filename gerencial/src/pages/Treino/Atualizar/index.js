import React, { useState, useEffect } from "react";
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
import { Close } from "@material-ui/icons";
import { post } from "../../../services/Requests";

const errors = [
  "Exercicio não selecionado",
  "Repetições não definidas",
  "Séries não definidas",
  "Intervalo não definido",
];

const Novo = (props) => {
  const { item, open, setOpen, refresh } = props;
  const [exercicios, setExercicios] = useState([]);
  const [treino, setTreino] = useState({});
  const [objModificado, setObjModificado] = useState({});

  const [error, setError] = useState(errors[0]);

  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    setTreino(item);
    post("/exercicio/busca", {})
      .then((res) => {
        if (res) {
          const exers = [];
          res.map((ex) => {
            if (ex.ativo) exers.push(ex);
          });
          setExercicios(exers);
        }
      })
      .catch((err) => alert(err));
  };

  const _handleSubmit = () => {
    post("/treino/altera", treino)
      .then((res) => {
        if (res) {
          console.log("Resposta", res);
          _handleClose();
        }
      })
      .catch((err) => alert(err));
  };
  const _handleClose = () => {
    setTreino({});
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
                <Typography variant="h4">Alterar Tipo de Treino</Typography>
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
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ paddingBottom: 10 }}
            >
              <Tooltip title="Exercício" placement="top-start">
                <Grid item xs={6}>
                  <TextField
                    id="exercicio"
                    label="Exercício"
                    value={treino.exercicio_id}
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    select
                    onChange={(e) => {
                      setObjModificado({
                        ...objModificado,
                        exercicio_id: e.target.value,
                      });
                      setTreino({ ...treino, exercicio_id: e.target.value });
                      if (!treino.repeticoes) return setError(errors[1]);
                      if (!treino.qtd_series) return setError(errors[2]);
                      if (!treino.intervalo) return setError(errors[3]);
                    }}
                  >
                    {exercicios.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Tooltip>
              <Tooltip
                title="Nº de Repetições do exercício"
                placement="top-start"
              >
                <Grid item xs={6}>
                  <TextField
                    id="repeticoes"
                    label="Repetições"
                    value={treino.repeticoes}
                    variant="outlined"
                    color="secondary"
                    type="number"
                    inputProps={{ min: 1 }}
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setObjModificado({
                        ...objModificado,
                        repeticoes: e.target.value,
                      });
                      setTreino({ ...treino, repeticoes: e.target.value });
                      if (!treino.exercicio_id) return setError(errors[0]);
                      if (!treino.qtd_series) return setError(errors[2]);
                      if (!treino.intervalo) return setError(errors[3]);
                    }}
                  />
                </Grid>
              </Tooltip>
            </Grid>
            <Grid container>
              <Grid container direction="row" style={{ paddingBottom: 10 }}>
                <Tooltip
                  title="Nº de Séries do exercício"
                  placement="top-start"
                >
                  <Grid item xs={6}>
                    <TextField
                      id="qtd_series"
                      label="Séries"
                      value={treino.qtd_series}
                      variant="outlined"
                      color="secondary"
                      type="number"
                      inputProps={{ min: 1 }}
                      style={{ width: "95%" }}
                      onChange={(e) => {
                        setObjModificado({
                          ...objModificado,
                          qtd_series: e.target.value,
                        });
                        setTreino({ ...treino, qtd_series: e.target.value });
                        if (!treino.exercicio_id) return setError(errors[0]);
                        if (!treino.repeticoes) return setError(errors[1]);
                        if (!treino.intervalo) return setError(errors[3]);
                      }}
                    />
                  </Grid>
                </Tooltip>
                <Tooltip
                  title="Tempo de descanso entre as séries em segudos"
                  placement="top-start"
                >
                  <Grid item xs={6}>
                    <TextField
                      id="intervalo"
                      label="Intervalo"
                      value={treino.intervalo}
                      variant="outlined"
                      color="secondary"
                      type="number"
                      inputProps={{ min: 10 }}
                      style={{ width: "95%" }}
                      onChange={(e) => {
                        setObjModificado({
                          ...objModificado,
                          intervalo: e.target.value,
                        });
                        setTreino({ ...treino, intervalo: e.target.value });
                        if (!treino.exercicio_id) return setError(errors[0]);
                        if (!treino.repeticoes) return setError(errors[1]);
                        if (!treino.qtd_series) return setError(errors[2]);
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
              disabled={Object.keys(objModificado).length <= 0}
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
