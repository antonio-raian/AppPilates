import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

const Deletar = (props) => {
  const { open, setOpen, title, message, actionYes, actionNot } = props;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={actionNot} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button onClick={actionYes} variant="contained" color="secondary">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Deletar;
