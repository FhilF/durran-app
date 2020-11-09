import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Skeleton from "@material-ui/lab/Skeleton";
import placeHolder from "Assets/Images/avatar-placeholder.png";
import EntryLoadingComponent from "Components/Entry/loading"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  profile: {
    width: "100%",
  },

  profileBanner: {
    width: "inherit",
    height: "220px",
    backgroundColor: theme.palette.primary.main,
  },

  avatarProfileContainer: {
    position: "absolute",
    top: -80,
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  profileDetails: {
    "& .profileName": {
      fontSize: "16px",
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "90%",
      color: theme.palette.primary.main + " !important",
      fontFamily: theme.custom.font2.fontFamily,
    },
    "& .profileUsername": {
      fontFamily: theme.custom.font2.fontFamily,
      fontWeight: 400,
      color: "#fff",
    },
  },

  avatarSkeleton: {
    backgroundColor: "#38383a",
    borderRadius: "50%",
    borderColor: theme.palette.secondary.main,
    border: "3px solid ",
    [theme.breakpoints.up("xs")]: {
      width: "100px",
      height: "100px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100px",
      height: "100px",
    },
    [theme.breakpoints.up("md")]: {
      width: "120px",
      height: "120px",
    },
  },

  profileContainer: {
    marginTop: "8px",
    backgroundColor: theme.custom.cardBg,
    padding: "20px",
    boxShadow: theme.custom.boxShadow,
    paddingTop: "12px",
    paddingBottom: "32px",
  },

  emoji: {
    margin: 0,
    marginRight: "8px",
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();

  return <Box></Box>;
};

const Profile = (props) => {
  const { userData, durranUser, entries, isSelf, history } = props;
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const spacing = "\xa0\xa0\xa0\xa0";

  return (
    <Box className={classes.root}>
      <Box className={classes.profile}>
        <Box className={classes.profileBanner}></Box>
        <Box pl={2} pr={2}>
          <Box style={{ position: "relative" }}>
            <Box className={classes.avatarProfileContainer}>
              <Skeleton
                animation={false}
                variant="circle"
                width={120}
                height={120}
                className={classes.avatarSkeleton}
              />
            </Box>
          </Box>
          <Box className={classes.profileContainer}>
            <Box display="flex" justifyContent="flex-end">
              {isSelf ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => {
                    // history.push(`/dare/${dare._id}`);
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box style={{ height: "36px" }}></Box>
              )}
            </Box>
            <Box className={classes.profileDetails} mt={2}>
              <Typography
                variant="h4"
                component="h6"
                className="profileName"
                style={{ fontSize: "17px" }}
              >
                <Skeleton animation="wave" width="60%" />
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className="profileUsername"
                style={{ lineHeight: 1 }}
              >
                <Skeleton animation="wave" width="40%" />
              </Typography>
              <Box mt={2}>
                <Typography variant="subtitle2" component="p">
                  <Skeleton height={15} animation="wave" width="70%" />
                </Typography>
                <Box mt={2}>
                  <Box>
                    <Skeleton height={15} animation="wave" width="50%" />
                  </Box>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      component="p"
                      style={{ fontSize: "12px", width: "100%" }}
                    >
                      <Skeleton height={15} animation="wave" width="40%" />
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={4} pl={2} pr={2}>
        <EntryLoadingComponent/>
        <EntryLoadingComponent/>
      </Box>
    </Box>
  );
};
export default Profile;
