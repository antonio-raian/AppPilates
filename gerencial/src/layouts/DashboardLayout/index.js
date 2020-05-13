import React from "react";
import {
  Container,
  GlobalStyle,
  Side,
  sideWidth,
  Content,
  MainContent,
} from "./styled";
import { CssBaseline, Hidden, isWidthUp, withWidth } from "@material-ui/core";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { children, routes, width } = this.props;

    return (
      <Container>
        <CssBaseline />
        <GlobalStyle />
        <Side>
          <Hidden mdUp implementation="js">
            <SideBar
              routes={routes}
              PaperProps={{ style: { width: sideWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <SideBar
              routes={routes}
              PaperProps={{ style: { width: sideWidth } }}
            />
          </Hidden>
        </Side>
        <Content>
          <Header onDrawerToggle={this.handleDrawerToggle} />
          <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
            {children}
          </MainContent>
          <Footer />
        </Content>
      </Container>
    );
  }
}

export default withWidth()(Dashboard);
