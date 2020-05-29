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
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { post } from "../../../services/Requests";

const errors = [
  "Nome não definido",
  "Descição não definida",
  "Link não definido",
];

const Novo = (props) => {
  const { item, open, setOpen, refresh } = props;
  const [exercicio, setExercicio] = useState({});
  const [objModificado, setObjModificado] = useState({});

  const [error, setError] = useState(errors[0]);

  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    setExercicio(item);
  };

  const _handleSubmit = () => {
    post("/exercicio/altera", exercicio)
      .then((res) => {
        if (res) {
          console.log("Resposta", res);
          _handleClose();
        }
      })
      .catch((err) => alert(err));
  };
  const _handleClose = () => {
    setExercicio({});
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
                <Typography variant="h4">Alterar Exercício</Typography>
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
          <Grid container maxWidth="xs">
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ paddingBottom: 10 }}
            >
              <Tooltip title="Nome do Exercício" placement="top-start">
                <Grid item xs={12} md={6}>
                  <TextField
                    id="nome"
                    label="Nome"
                    value={exercicio.nome}
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setObjModificado({
                        ...objModificado,
                        id: exercicio.id,
                        nome: e.target.value,
                      });
                      setExercicio({ ...exercicio, nome: e.target.value });
                      if (!exercicio.descricao) return setError(errors[1]);
                      if (!exercicio.link) return setError(errors[2]);
                    }}
                  />
                </Grid>
              </Tooltip>
              <Tooltip
                title="Link para vídeo do Exercício"
                placement="top-start"
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    id="link"
                    label="Link"
                    value={exercicio.link}
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setObjModificado({
                        ...objModificado,
                        id: exercicio.id,
                        link: e.target.value,
                      });
                      setExercicio({ ...exercicio, link: e.target.value });
                      if (!exercicio.descricao) return setError(errors[1]);
                      if (!exercicio.nome) return setError(errors[0]);
                    }}
                  />
                </Grid>
              </Tooltip>
            </Grid>
            <Grid container>
              <Grid container direction="row" style={{ paddingBottom: 10 }}>
                <Tooltip title="Descrição do Exercício" placement="top-start">
                  <Grid item xs={12}>
                    <TextField
                      id="descricao"
                      label="Descrição"
                      value={exercicio.descricao}
                      variant="outlined"
                      color="secondary"
                      multiline
                      style={{ width: "98%" }}
                      onChange={(e) => {
                        setObjModificado({
                          ...objModificado,
                          id: exercicio.id,
                          link: e.target.value,
                        });
                        setExercicio({
                          ...exercicio,
                          descricao: e.target.value,
                        });
                        if (!exercicio.nome) return setError(errors[0]);
                        if (!exercicio.link) return setError(errors[2]);
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
