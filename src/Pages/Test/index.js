import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useBlockstack } from "react-blockstack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Dare(props) {
  const classes = useStyles();
  const {signOutUser} = props;
  const { signOut, userSession } = useBlockstack();
  return (
    <Box className={classes.root} p={2}>
      {signOut ? (
        <button
          className="btn btn-primary btn-lg"
          disabled={!signOut}
          onClick={(e) => {
            signOutUser(e,userSession,signOut)
          }}
        >
          {signOut ? "Log Out" : "..."}
        </button>
      ) : null}
    </Box>
  );
}

export default Dare;
