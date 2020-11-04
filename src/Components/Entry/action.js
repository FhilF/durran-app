import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const EntryAction = (props) => {
  const classes = useStyles();
  const { entry } = props;
  return (
    <Box className={classes.root}>
      <IconButton
        aria-label="expand-less"
        color="primary"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MonetizationOnOutlinedIcon />
      </IconButton>
    </Box>
  );
};
export default EntryAction;
