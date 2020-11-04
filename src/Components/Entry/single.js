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

const Entry = (props) => {
  const classes = useStyles();
  const { entry, history } = props;
  const [showDare, setShowDare] = useState(false);
  return (
    <Box className={classes.root}>
      <Card className={classes.entryCardRoot}>
        <CardContent className={classes.cardContent}>
          <Box display="flex" style={{ marginBottom: "8px" }}>
            <Avatar
              className={classes.avatar}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                history.push(`/profile/${entry.createdBy}`);
              }}
            >
              F
            </Avatar>
            <Box display="flex" alignItems="center" pl={2}>
              <Box>
                <Typography
                  variant="body2"
                  component="p"
                  className={clsx(classes.userName, "userName")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    history.push(`/profile/${entry.createdBy}`);
                  }}
                >
                  {entry.createdBy}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {entry.caption === "" || entry.caption == null ? null : (
              <Box mb={2}>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.caption}
                >
                  {entry.caption}
                </Typography>
              </Box>
            )}

            {entry.file.type === "image" ? (
              <ImagePreview entry={entry} />
            ) : null}

            {entry.file.type === "video" ? (
              <video height="380" width="100%" controls>
                <source src={entry.file.media} type={entry.file.media.type} />
                Your browser does not support HTML5 video.
              </video>
            ) : null}
          </Box>
          <Box mt={2}>
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.createdAt}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                history.push(`/entry/${entry._id}`);
              }}
            >
              {moment(entry.createdAt).format("MMM DD, yyyy • hh:mm a")}
            </Typography>
          </Box>

          <Box mt={4}>
            <EntryAction entry={entry} />
          </Box>
        </CardContent>
      </Card>

      <Link
        color="inherit"
        underline="none"
        href={`/dare/${entry.dare._id}`}
        onClick={(e) => {
          e.preventDefault();
          history.push(`/dare/${entry.dare._id}`);
        }}
      >
        <Card className={classes.dareCardRoot}>
          <CardContent className={classes.cardContent}>
            <Box>
              <Box display="flex" justifyContent="flex-start">
                <Box style={{ flex: 1 }}>
                  <Typography
                    className={classes.dareJoined}
                    variant="p"
                    component="p"
                  >
                    Dare joined
                  </Typography>
                </Box>
                <Box></Box>
                <Box>
                  {showDare ? (
                    <IconButton
                      aria-label="expand-less"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDare(false);
                      }}
                    >
                      <ExpandLessIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="expand-more"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDare(true);
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Typography className={classes.title} variant="h5" component="h1">
                {entry.dare.title}
              </Typography>
              <Typography variant="subtitle2" component="p">
                {entry.dare._id}
              </Typography>
            </Box>
            {showDare ? (
              <Box className={null}>
                <Box mt={8}>
                  <Typography variant="body1" component="p">
                    {entry.dare.description}
                  </Typography>
                </Box>
                <Box mt={8}>
                  <Typography variant="subtitle1" component="p">
                    {moment(entry.dare.dateTimeStart).format(
                      "MMM DD, yyyy • hh:mm a"
                    )}{" "}
                    <span style={{ fontSize: ".9em", fontWeight: 600 }}>-</span>{" "}
                    {moment(entry.dare.dateTimeEnd).format(
                      "MMM DD, yyyy • hh:mm a"
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    gutterBottom
                  ></Typography>
                </Box>
              </Box>
            ) : null}
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};
export default Entry;
