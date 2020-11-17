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

const useStyles = makeStyles((theme) => ({
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
}));

function EditProfile(props) {
  const classes = useStyles();
  const { durranUser, handleProfileEdit } = props;
  let durranUserData = durranUser[0];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: durranUserData.attrs.name === null ? "" : durranUserData.attrs.name,
    location:
      durranUserData.attrs.location === null
        ? ""
        : durranUserData.attrs.location,
    bio: durranUserData.attrs.bio === null ? "" : durranUserData.attrs.bio,
  });

  const [status, setStatus] = useState("");
  const setSnackbar = (type, message) => {
    let alert = { type: type, message: message };
    setStatus({
      alert,
      date: new Date(),
    });
  };

  const nullCheck = (data) => {
    if (isNull(data) || isEmpty(data)) {
      return null;
    } else {
      return data;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(function () {
      setProfile({
        name:
          durranUserData.attrs.name === null ? "" : durranUserData.attrs.name,
        location:
          durranUserData.attrs.location === null
            ? ""
            : durranUserData.attrs.location,
        bio: durranUserData.attrs.bio === null ? "" : durranUserData.attrs.bio,
      });
    }, 1000);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setTimeout(function () {
    //   setLoading(false);
    // }, 5000);
    const profileEdit = {
      name: null,
      location: null,
      bio: null,
    };
    profileEdit.name = nullCheck(profile.name);
    profileEdit.location = nullCheck(profile.location);
    profileEdit.bio = nullCheck(profile.location);
    durranUserData.update({
      ...profileEdit,
    });
    try {
      await durranUserData.save();
      handleProfileEdit();
      setLoading(false);
      setSnackbar("success", "Successfully editted your profile");
    } catch (error) {
      setSnackbar("error", "There was an error submitting your request!");
      setLoading(false);
    }
  };
  return (
    <Box className={classes.root}>
      <AlertSnackBar key={status.date} status={status} />
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          handleClickOpen();
        }}
      >
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" style={{ paddingBottom: 0 }}>
          Edit Profile
        </DialogTitle>

        <form onSubmit={handleEditProfile}>
          <DialogContent style={{ width: "600px" }}>
            <TextField
              className={classes.textField}
              id="profile-name"
              label="Name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 60,
              }}
              helperText={`${profile.name.length}/60`}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
              }}
              value={profile.name}
              disabled={loading}
              autoComplete="off"
            />
            <TextField
              className={classes.textField}
              id="profile-location"
              label="location"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 40,
              }}
              helperText={`${
                profile.location.length !== null && profile.location.length < 0
                  ? profile.location.length
                  : 0
              }/40`}
              onChange={(e) => {
                setProfile({ ...profile, location: e.target.value });
              }}
              value={profile.location}
              disabled={loading}
              autoComplete="off"
            />
            

            <TextField
              className={classes.textField}
              id="profile-bio"
              label="Bio"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows={5}
              inputProps={{
                maxLength: 180,
              }}
              helperText={`${profile.bio.length}/180`}
              onChange={(e) => {
                setProfile({ ...profile, bio: e.target.value });
              }}
              value={profile.bio}
              disabled={loading}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <div className={classes.wrapper}>
              <Button
                color="primary"
                type="submit"
                disabled={loading}
                variant="contained"
              >
                {loading ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default EditProfile;
