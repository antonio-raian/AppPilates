import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Login, Suporte } from "./pages";
import { AuthContext } from "./context/auth";

import maTheme from "./theme";
import { ThemeProvider } from "styled-components";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { StylesProvider } from "@material-ui/styles";
import Routes from "./routes/Routes";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <StylesProvider injectFirst>
      <AuthContext.Provider value={true}>
        <MuiThemeProvider theme={maTheme[0]}>
          <ThemeProvider theme={maTheme[0]}>
            <BrowserRouter>
              <Redirect from="/" to="/login" />
              <Route
                exact
                path="/login"
                render={() =>
                  localStorage.getItem("token") ? (
                    <Redirect to="/home" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </AuthContext.Provider>
    </StylesProvider>
  );
}

export default App;
