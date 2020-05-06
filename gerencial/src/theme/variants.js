import { green, grey, red } from "@material-ui/core/colors";

const lightVariant = {
  name: "Light",
  palette: {
    primary: {
      main: red[900],
      contrastText: "#FFF",
    },
    secondary: {
      main: "#ce4646",
      contrastText: "#FFF",
    },
  },
  header: {
    color: grey[200],
    background: red[900],
    search: {
      color: grey[100],
    },
    indicator: {
      background: red[700],
    },
  },
  sidebar: {
    color: "#000",
    background: grey[200],
    header: {
      color: "#FFF",
      background: red[900],
      brand: {
        color: "#FFFFFF",
      },
    },
    footer: {
      color: grey[900],
      background: grey[100],
      online: {
        background: red[900],
      },
    },
    badge: {
      color: "#FFF",
      background: green[600],
    },
  },
  body: {
    background: "#F9F9FC",
  },
};
const variants = [lightVariant];

export default variants;
