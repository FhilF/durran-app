import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TipComponent from "Components/Tip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const EntryAction = (props) => {
  const classes = useStyles();
  const { entry, userLoggedIn } = props;
  return (
    <Box className={classes.root}>
      {/* {userLoggedIn === entry.createdBy ? null : <TipComponent entry={entry} />} */}
    </Box>
  );
};
export default EntryAction;
