import React from "react";
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
    "&:hover": {
      backgroundColor: theme.custom.hoverCardBg,
    },
    cursor: "pointer",
  },
  cardContent: {
    padding: "20px",
  },
  userName: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },
  createdAt: {
    fontSize: "12px",
    lineHeight: 1.5,
  },
  caption: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },
}));

const Entry = (props) => {
  const classes = useStyles();
  const { entry, history } = props;
  return (
    <Box className={classes.root}>
      <Box
        onClick={(e) => {
          e.preventDefault();
          history.push(`/entry/${entry._id}`);
        }}
      >
        <Card className={classes.entryCardRoot}>
          <CardContent className={classes.cardContent}>
            <Box display="flex" style={{ marginBottom: "8px" }}>
              <Link
                color="inherit"
                underline="none"
                href={`/profile/${entry.createdBy}`}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/profile/${entry.createdBy}`);
                }}
              >
                <Avatar className={classes.avatar}>F</Avatar>
              </Link>
              <Box display="flex" alignItems="center" pl={2}>
                <Box>
                  <Link
                    color="inherit"
                    underline="hover"
                    href={`/profile/${entry.createdBy}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/profile/${entry.createdBy}`);
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="p"
                      className={clsx(classes.userName, "userName")}
                    >
                      {entry.createdBy}
                    </Typography>
                  </Link>
                  <Link
                    color="primary"
                    underline="hover"
                    href={`/entry/${entry._id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/entry/${entry._id}`);
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="p"
                      className={classes.createdAt}
                    >
                      {moment(entry.createdAt).fromNow()}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
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
            <Box mt={4}>
              <EntryAction entry={entry} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default Entry;
