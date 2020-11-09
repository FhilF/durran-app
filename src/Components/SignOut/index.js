import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import CircularProgress from "@material-ui/core/CircularProgress";
import AlertSnackBar from "Components/AlertSnackBar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import { EmojioneV4 } from "react-emoji-render";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    "& .MuiInputBase-input": {
      paddingTop: "15px",
    },
  },

  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },

  emoji: {
    "& > span > img": {
      height: "24px !important",
      width: "24px !important",
    },
  },

  customListButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function EditProfile(props) {
  const classes = useStyles();
  const { signOutUser, userSession } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    setOpen(false);
  };


  return (
    <Box className={classes.root}>
      <ListItem
        button
        className={classes.customListButton}
        onClick={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" style={{ width: "300px", paddingTop:"30px"}}>
          Do you want to sign out?
        </DialogTitle>
        <DialogActions style={{paddingBottom:"20px"}}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              signOutUser(e, userSession);
            }}
            color="primary"
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditProfile;
