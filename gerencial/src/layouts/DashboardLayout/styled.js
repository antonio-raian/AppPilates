import styled, { createGlobalStyle } from "styled-components";
import { spacing } from "@material-ui/system";
import { Paper } from "@material-ui/core";

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.body.background};
  }
`;

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
export const sideWidth = 260;

export const Side = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${sideWidth}px;
    flex-shrink: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyPaper = styled(Paper)(spacing);

export const MainContent = styled(StyPaper)`
  flex: 1;
  background: ${(props) => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;
