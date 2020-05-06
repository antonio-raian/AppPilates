import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import { Redirect } from "react-router-dom";

import {
  Grid,
  Hidden,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@material-ui/core";

import { Menu as MenuIcon, PowerSettingsNew } from "@material-ui/icons";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  box-shadow: ${(props) => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;
class UserMenu extends Component {
  state = {
    anchorMenu: null,
    redirectToLogin: false,
    redirectToMyAccount: false,
  };

  toggleMenu = (event) => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = (param) => {
    if (param === "sair") {
      localStorage.clear("token");
      return this.setState({
        anchorMenu: null,
        redirectToLogin: true,
        redirectToMyAccount: false,
      });
    }
    if (param === "minha_conta") {
      return this.setState({
        anchorMenu: null,
        redirectToLogin: false,
        redirectToMyAccount: true,
      });
    }
    this.setState({ anchorMenu: null });
  };

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }

    if (this.state.redirectToMyAccount) {
      return <Redirect to="/usuario/account" />;
    }

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <PowerSettingsNew />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              this.closeMenu("minha_conta");
            }}
          >
            Minha Conta
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.closeMenu("sair");
            }}
          >
            Sair
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

const Header = ({ onDrawerToggle }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs />
          <Grid item>
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default withTheme(Header);
