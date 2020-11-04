import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  snackBarContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}));

const AlertSnackBar = (props) => {
  const classes = useStyles();
  const { status } = props;
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (status !== "") {
      setOpen(true);
    }
  }, [status]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Box className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={status.alert != null ? status.alert.type : "success"}
        >
          {status.alert != null ? status.alert.message : "Message"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlertSnackBar;
