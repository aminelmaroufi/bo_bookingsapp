import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";

const ConfirmationDeleteDialog = (props) => {
  React.useEffect(() => {
    if (props.success) {
      props.handleCloseDialog();
    }
  }, [props.success]);

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle style={{ fontSize: 25, fontWeight: "bold" }}>
        Delete {props.moderator.fullname}
      </DialogTitle>
      <DialogContent dividers>
        <Typography style={{ fontSize: 20 }}>Are you sure?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleCloseDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={props.deleteModerator}
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDeleteDialog;
