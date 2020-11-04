import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import DareModel from "Models/Dare";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    backgroundColor: theme.custom.cardBg,
    border: "none",
    boxShadow: "0 2px 4px 0px " + theme.custom.boxShadow,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
}));

function DareAdmin(props) {
  const classes = useStyles();
  const { dare } = props;
  console.log(dare);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Box className={classes.root} p={2}>
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            variant="h4"
            component="h1"
          >
            {dare.attrs.title}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {dare.attrs._id}
          </Typography>
          <Box mt={4}>
            <Typography variant="body1" component="p">
              {dare.attrs.description}
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="subtitle1" component="p">
              {moment(dare.attrs.dateTimeStart).format("MMM DD, yyyy • hh:mm")}
            </Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {moment(dare.attrs.dateTimeEnd).format("MMM DD, yyyy • hh:mm")}
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button>Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default DareAdmin;
