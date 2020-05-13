import React from "react";
import styled from "styled-components";

import {
  Grid,
  List,
  ListItemText,
  ListItem as MuiListItem,
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.palette.common.white};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;

  &,
  &:hover,
  &:active {
    color: #000;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container item md={6} justify="flex-start">
        <List>
          <ListItem>
            <ListItemText primary="Created By: Antonio Raian (raymendesjr2013@gmail.com) " />
          </ListItem>
        </List>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
