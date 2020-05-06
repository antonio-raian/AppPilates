import styled from "styled-components";
import { Paper, Grid, FormControl, Button } from "@material-ui/core";
import { spacing } from "@material-ui/system";

export const StyPaper = styled(Paper).attrs({ elevatio: 3 })`
  display: flex;
  width: 40%;
  height: 70%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxLogo = styled(Grid).attrs({
  container: true,
  justify: "center",
  alignItems: "center",
})`
  width: 100%;
  height: 50%;
  padding-bottom: 30px;
`;

export const BoxForms = styled(FormControl).attrs({
  required: true,
  fullWidth: true,
})`
  height: 22.5%;
  align-items: center;
`;

export const BoxSubmit = styled(FormControl).attrs({
  required: true,
  fullWidth: true,
})`
  width: 80%;
  height: 20%;
  alignitems: center;
`;

export const BtnSubmit = styled(Button)(spacing);
