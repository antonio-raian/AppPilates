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
  MenuItem,
  DialogActions,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import { post } from "../../../services/Requests";

const errors = [
  "Usuário não definido",
  "Categoria não escolhida",
  "Senha não definida",
  "Senhas não são iguais",
];

const situacoes = ["Ativo", "Inativo", "Inadimplente"];

const Novo = (props) => {
  const { open, setOpen, refresh } = props;
  const [seePwd, setSeePwd] = useState(false);
  const [user, setUser] = useState({});
  const [confirm, setConfirm] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [error, setError] = useState(errors[0]);

  const categoria = JSON.parse(localStorage.getItem("categoria"));
  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    post("/categoria/busca", {})
      .then((res) => {
        console.log("Resposta", res);
        if (res) {
          const catList = [];
          res.map((cat) => {
            if (cat.nivel > categoria.nivel) catList.push(cat);
          });
          setCategorias(catList);
        }
      })
      .catch((err) => alert(err));
  };
  const _handleSubmit = () => {
    post("/usuario/novo", user)
      .then((res) => {
        if (res) {
          console.log("Resposta", res);
          _handleClose();
        }
      })
      .catch((err) => alert(err));
  };

  const _handleClose = () => {
    setUser({});
    setOpen(false);
    refresh();
  };

  const _handleVerify = () => {
    if (!user.username) return setError(errors[0]);
    if (!user.categoria_id) return setError(errors[1]);
    if (!user.password) return setError(errors[2]);
    if (!confirm === user.password) return setError(errors[3]);

    return setError("Clique para Salvar");
  };

  return (
    <>
      <Dialog maxWidth="md" open={open}>
        <DialogTitle>
          <Grid container>
            <Grid item xs={11}>
              <Box mt={4} mb={4}>
                <Typography variant="h4">Novo Usuário</Typography>
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
              <Tooltip title="Nome de Usuário" placement="top-start">
                <Grid item xs={4}>
                  <TextField
                    id="username"
                    label="Usuário"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                      _handleVerify();
                    }}
                  />
                </Grid>
              </Tooltip>
              <Tooltip title="Categoria de Usuário" placement="top-start">
                <Grid item xs={4}>
                  <TextField
                    id="categoria"
                    label="Categoria"
                    variant="outlined"
                    color="secondary"
                    select
                    style={{ width: "95%" }}
                    value={user.categoria_id}
                    onChange={(e) => {
                      setUser({ ...user, categoria_id: e.target.value });
                      _handleVerify();
                    }}
                  >
                    {categorias.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Tooltip>
              <Tooltip title="Situação de Usuário" placement="top-start">
                <Grid item xs={4}>
                  <TextField
                    id="situacao"
                    label="Situação"
                    variant="outlined"
                    color="secondary"
                    select
                    style={{ width: "95%" }}
                    value={user.situacao}
                    onChange={(e) => {
                      setUser({ ...user, situacao: e.target.value });
                      _handleVerify();
                    }}
                  >
                    {situacoes.map((element) => (
                      <MenuItem key={element} value={element}>
                        {element}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Tooltip>
            </Grid>

            <Grid container direction="row" style={{ paddingBottom: 10 }}>
              <Tooltip title="Senha do Usuário" placement="top-start">
                <Grid item xs={6}>
                  <TextField
                    label="Senha"
                    id="pwdField"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                      _handleVerify();
                    }}
                    type={seePwd ? "text" : "password"}
                    className="inputs"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setSeePwd(!seePwd)}
                        >
                          {seePwd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Tooltip>
              <Tooltip
                title={
                  confirm === user.password ? "Confirmação de Senha" : errors[3]
                }
                placement="top-start"
              >
                <Grid item xs={6}>
                  <TextField
                    id="passwd-confirm"
                    label="Confirma Senha"
                    variant="outlined"
                    color={user.password === confirm ? "secondary" : "primary"}
                    type={"password"}
                    style={{ width: "95%" }}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      _handleVerify();
                    }}
                  />
                </Grid>
              </Tooltip>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={_handleClose}>
              Cancelar
            </Button>
            <Button
              disabled={
                user.username && user.categoria_id && user.password === confirm
                  ? false
                  : true
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
