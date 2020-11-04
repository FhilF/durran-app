import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SingleEntryComponent from "Components/Entry/single";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Entry(props) {
  const { entry,history } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root} p={2}>
      <SingleEntryComponent entry={entry[0]} history={history} />
    </Box>
  );
}

export default Entry;
