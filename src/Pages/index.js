import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import EntryComponent from "Components/Entry";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Home(props) {
  const classes = useStyles();
  const { entries, history } = props;
  return (
    <Box className={classes.root} p={2}>
      {entries.map((row, index) => {
        return <EntryComponent entry={row} key={row._id} history={history} />;
      })}
    </Box>
  );
}

export default Home;
