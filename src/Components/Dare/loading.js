import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Link from "@material-ui/core/Link";

import Skeleton from "@material-ui/lab/Skeleton";

import DareModel from "Models/Dare";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    backgroundColor: theme.custom.cardBg,
    marginTop: "8px",
    boxShadow: theme.custom.boxShadow,
    // borderLeft: theme.custom.border,
  },
}));

function DareLoading(props) {
  const classes = useStyles();
  const { data, history } = props;
  return (
    <Box className={classes.root} p={2}>
      <Card className={classes.cardRoot}>
        <CardContent
          style={{
            paddingTop: "32px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Typography className={classes.title} variant="h5" component="h1">
            <Skeleton width="70%" />
          </Typography>
          <Typography variant="subtitle2" component="p">
            <Skeleton width="45%" />
          </Typography>
          <Box mt={4}>
            <Typography variant="body1" component="p">
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="subtitle1" component="p">
              <Skeleton width="60%" />
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              gutterBottom
            ></Typography>
          </Box>
        </CardContent>
        <CardActions
          style={{
            display: "block",
            // justifyContent: "flex-end",
            padding: "20px",
            paddingTop: 0,
          }}
        >
          <Box>
            <Typography variant="subtitle2" component="p">
              <Skeleton width="30%" />
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}

export default DareLoading;
