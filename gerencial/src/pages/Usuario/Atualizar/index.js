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
  const { user, open, setOpen, refresh } = props;
  const [seePwd, setSeePwd] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [objModificado, setObjModificado] = useState({});

  const [error, setError] = useState(errors[0]);

  const categoria = JSON.parse(localStorage.getItem("categoria"));

  useEffect(() => {
    if (open) _handleLoad();
  }, [open]);

  const _handleLoad = () => {
    console.log("USER", user);
    setUsuario(user);
    post("/categoria/busca", {})
      .then((res) => {
        console.log("Resposta", res);
        if (res) {
          const catList = [];
          res.map((cat) => {
            if (cat.nivel >= categoria.nivel) catList.push(cat);
          });
          setCategorias(catList);
        }
      })
      .catch((err) => alert(err));
  };

  const _handleSubmit = () => {
    post("/usuario/altera", objModificado)
      .then((res) => {
        console.log("Resposta", res);
        _handleClose();
      })
      .catch((err) => alert(err));
  };

  const _handleClose = () => {
    setObjModificado({});
    setOpen(false);
    refresh();
  };

  const _handleVerify = () => {
    if (!objModificado.password) return setError(errors[2]);
    if (!confirm === objModificado.password) return setError(errors[3]);

    return setError("Clique para Salvar");
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Grid container>
            <Grid item xs={11}>
              <Box mt={4} mb={4}>
                <Typography variant="h4">
                  Atualizar Usuário: {objModificado.username}
                </Typography>
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
          <Grid container alignItems="flex-end">
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
                    style={{ width: "90%" }}
                    value={usuario.username}
                    onChange={(e) => {
                      setUsuario({ ...usuario, username: e.target.value });
                      setObjModificado({
                        ...objModificado,
                        id: usuario.id,
                        username: e.target.value,
                      });
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
                    style={{ width: "90%" }}
                    value={usuario.categoria_id}
                    onChange={(e) => {
                      setUsuario({ ...usuario, categoria_id: e.target.value });
                      setObjModificado({
                        ...objModificado,
                        id: usuario.id,
                        categoria_id: e.target.value,
                      });
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
                    value={usuario.situacao}
                    onChange={(e) => {
                      setUsuario({ ...usuario, situacao: e.target.value });
                      setObjModificado({
                        ...objModificado,
                        id: usuario.id,
                        situacao: e.target.value,
                      });
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

            <Grid
              container
              direction="row"
              alignItems="flex-end"
              style={{ paddingBottom: 10 }}
            >
              <Tooltip title="Senha do Usuário" placement="top-start">
                <Grid item xs={6}>
                  <TextField
                    label="Senha"
                    id="pwdField"
                    variant="outlined"
                    color="secondary"
                    style={{ width: "90%" }}
                    onChange={(e) => {
                      setUsuario({ ...usuario, password: e.target.value });
                      setObjModificado({
                        ...objModificado,
                        id: usuario.id,
                        password: e.target.value,
                      });
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
                  confirm === objModificado.password
                    ? "Confirmação de Senha"
                    : errors[3]
                }
                placement="top-start"
              >
                <Grid item xs={6}>
                  <TextField
                    id="passwd-confirm"
                    label="Confirma Senha"
                    variant="outlined"
                    color={
                      objModificado.password === confirm
                        ? "secondary"
                        : "primary"
                    }
                    type={"password"}
                    style={{ width: "90%" }}
                    onChange={(e) => {
                      setConfirm(e.target.value);
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
                Object.keys(objModificado).length <= 0 ||
                !objModificado.password === confirm
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
