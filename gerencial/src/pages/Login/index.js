import React, { useState } from "react";
import "../style.css";
import {
  TextField,
  IconButton,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import Logo from "../../assets/images/logoColor.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Redirect } from "react-router-dom";

import { StyPaper, BoxLogo, BoxForms, BoxSubmit, BtnSubmit } from "./styled";
import { post } from "../../services/Requests";

const Login = () => {
  const [state] = React.useState({
    vertical: "top",
    horizontal: "center",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seePwd, setSeePwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensErr, setMensErr] = useState("");

  const [isLoged, setLoged] = useState(false);

  const _handleSubmit = () => {
    setLoading(true);
    console.log("Apertou");
    if (username && password) {
      post("/usuario/login", { from: "web", username, password })
        .then((res) => {
          if (res) {
            console.log("Resposta Login", JSON.stringify(res));
            localStorage.setItem("token", res.token.token);
            localStorage.setItem("user", JSON.stringify(res.usuario));
            localStorage.setItem("username", res.usuario.username);
            localStorage.setItem(
              "categoria",
              JSON.stringify(res.usuario.categoria)
            );
            setLoged(true);
          }
        })
        .catch((err) => {
          console.log("Erro no login", err.response);
          setMensErr(
            err.response ? err.response.data.message : "Contate o suporte" + err
          );
        });
    }
    setLoading(false);
  };
  const { vertical, horizontal } = state;
  return (
    <div className="container">
      {isLoged ? (
        <Redirect to="/home" />
      ) : (
        <StyPaper>
          {loading && (
            <Grid container justify="center" alignItems="center">
              <CircularProgress align="center" />
            </Grid>
          )}
          <Snackbar
            autoHideDuration={6000}
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={mensErr}
            onClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }

              setMensErr("");
            }}
            message={mensErr}
          />
          <BoxLogo>
            <img
              alt="Logo"
              src={Logo}
              height="100%"
              style={{ paddingBottom: 30 }}
            />
          </BoxLogo>
          <BoxForms>
            <TextField
              className="inputs"
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
              style={{ width: "80%" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </BoxForms>
          <BoxForms>
            <TextField
              label="Senha"
              id="pwdField"
              variant="outlined"
              style={{ width: "80%" }}
              onChange={(e) => setPassword(e.target.value)}
              type={seePwd ? "text" : "password"}
              className="inputs"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  _handleSubmit();
                }
              }}
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
          </BoxForms>
          <BoxSubmit>
            <BtnSubmit
              variant="contained"
              color="primary"
              className="btn"
              fullWidth
              style={{ height: "75%", fontWeight: "bold", fontSize: "18px" }}
              onClick={() => _handleSubmit()}
            >
              Entrar
            </BtnSubmit>
          </BoxSubmit>
        </StyPaper>
      )}
    </div>
  );
};
export default Login;
