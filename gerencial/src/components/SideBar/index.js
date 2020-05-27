import React from "react";

import { NavLink as RouterNavLink, withRouter } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Logo from "../../assets/images/logoWhite.png";

import { Grid } from "@material-ui/core";

import { routes } from "../../routes";
import {
  Item,
  ItemText,
  ItemIconMore,
  ItemIconLess,
  ItemBadge,
  StyDrawer,
  BoxTop,
  StyBox,
  Scrollbar,
  StyList,
  Items,
  SidebarSection,
  SidebarFooter,
  SidebarFooterText,
  Dot,
} from "./styled";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

function SidebarItem({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) {
  return (
    <Item {...rest}>
      {icon}
      <ItemText>{name}</ItemText>
      {isCollapsable ? isOpen ? <ItemIconMore /> : <ItemIconLess /> : null}
      {badge ? <ItemBadge label={badge} /> : ""}
    </Item>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = (index) => {
    // Collapse all elements
    Object.keys(this.state).forEach(
      (item) =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false,
        }))
    );

    // Toggle selected element
    this.setState((state) => ({
      [index]: !state[index],
    }));
  };

  componentWillMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome,
      }));
    });
  }

  render() {
    const { classes, staticContext, ...other } = this.props;

    return (
      <StyDrawer variant="permanent" {...other}>
        <BoxTop>
          <img alt="Logo" src={Logo} width="30%" height="110%" />{" "}
          <div style={{ paddingLeft: "20px" }}>
            <StyBox ml={1}>Método Integrado</StyBox>
          </div>
        </BoxTop>

        <Scrollbar>
          <StyList disablePadding>
            <Items>
              {routes
                .filter((n) => n.show)
                .map((category, index) => (
                  <React.Fragment key={index}>
                    {category.header ? (
                      <SidebarSection variant="caption">
                        {category.header}
                      </SidebarSection>
                    ) : null}

                    <SidebarItem
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                      badge={category.badge}
                    />
                  </React.Fragment>
                ))}
            </Items>
          </StyList>
        </Scrollbar>

        <SidebarFooter>
          <Grid container spacing={2}>
            <Grid item>
              <SidebarFooterText variant="h6">
                <AccountCircle
                  style={{ height: 25, margin: -5, marginRight: 5 }}
                />
                {localStorage.getItem("username")}
              </SidebarFooterText>
              <SidebarFooterText variant="body2">
                <Dot style={{ marginRight: 11 }} />
                Online
              </SidebarFooterText>
            </Grid>
          </Grid>
        </SidebarFooter>
      </StyDrawer>
    );
  }
}

export default withRouter(Sidebar);
