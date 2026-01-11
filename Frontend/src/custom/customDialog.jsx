import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const CustomDialog = ({
  open,
  onClose,
  onSave,
  title,
  children,
  disableSave = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={disableSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
