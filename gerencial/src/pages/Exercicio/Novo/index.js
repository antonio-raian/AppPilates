import React, { useState } from "react";
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
  const { open, setOpen, refresh } = props;
  const [exercicio, setExercicio] = useState({});

  const [error, setError] = useState(errors[0]);

  const _handleSubmit = () => {
    post("/exercicio/novo", exercicio)
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
                <Typography variant="h4">Novo Exercício</Typography>
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
              <Tooltip title="Nome do Exercício" placement="top-start">
                <Grid item xs={6}>
                  <TextField
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
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
                <Grid item xs={6}>
                  <TextField
                    id="link"
                    label="Link"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
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
                      variant="outlined"
                      color="secondary"
                      multiline
                      style={{ width: "98%" }}
                      onChange={(e) => {
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
            <Tooltip title={error} arrow>
              <Button
                disabled={
                  exercicio.nome && exercicio.descricao && exercicio.link
                    ? false
                    : true
                }
                variant="contained"
                color="inherit"
                onClick={_handleSubmit}
              >
                Salvar
              </Button>
            </Tooltip>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Novo;
