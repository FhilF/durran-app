import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";

import ImagePreview from "Components/ImagePreview";
import EntryAction from "./action";

import moment from "moment";

import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "8px",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    cursor: "pointer",
  },
  entryCardRoot: {
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
  },

  dareCardRoot: {
    marginTop: "8px",
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
    "&:hover": {
      backgroundColor: theme.custom.hoverCardBg,
    },
  },

  cardContent: {
    padding: "20px",
  },
  userName: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  createdAt: {
    fontSize: "12px",
    lineHeight: 1.5,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  caption: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },

  dareJoined: {
    fontSize: "18px",
    color: theme.palette.primary.darker,
    marginBottom: "10px",
  },
}));

const EntryLoading = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card className={classes.dareCardRoot}>
        <CardContent className={classes.cardContent}>
          <Box display="flex" style={{ marginBottom: "8px" }}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
            <Box display="flex" alignItems="center" pl={2} style={{ flex: 1 }}>
              <Box style={{ width: "100%" }}>
                <Skeleton
                  animation="wave"
                  height={10}
                  width="50%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="20%"/>
              </Box>
            </Box>
          </Box>
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            style={{ marginBottom: 10 }}
          />
          <Skeleton animation="wave" variant="rect" height={300}  style={{borderRadius:"15px"}} />
          <Box style={{ height: "46px" }}></Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default EntryLoading;
