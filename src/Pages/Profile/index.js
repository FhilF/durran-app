import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { pink, blue } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import EntryComponent from "Components/Entry";

import countryList from "country-list";
import moment from "moment";
import isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import { EmojioneV4 } from "react-emoji-render";
import {
  USER_DEFAULT_NAME,
  USER_DEFAULT_COUNTRY,
  USER_DEFAULT_BIO,
} from "Utils/constants";

import placeHolder from "Assets/Images/avatar-placeholder.png";

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
      display: "inline-block",
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

  avatarProfile: {
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
  const countries = countryList.getData();
  const [dialog, setDialog] = useState(false);
  const spacing = "\xa0\xa0\xa0\xa0";
  console.log(entries)

  let durranUserData = isSelf ? durranUser[0].attrs : durranUser[0];

  const nameCheck = (data) => {
    if (isNull(data) || isEmpty(data)) {
      return <>{USER_DEFAULT_NAME}</>;
    } else {
      return data;
    }
  };

  const profile = {
    name: null,
    username: null,
    country: null,
    address: null,
    dateJoined: null,
    profileBio: null,
  };

  if (isSelf) {
    profile.name =
      durranUserData.name === null ? (
        <>{USER_DEFAULT_NAME}</>
      ) : (
        durranUserData.name
      );
    profile.username = durranUserData.username;
    profile.country = durranUserData.location;
    profile.dateJoined = moment(durranUserData.createdAt).format("MMMM YYYY");
    profile.bio =
      durranUserData.bio === null ? (
        <>{USER_DEFAULT_BIO}</>
      ) : (
        durranUserData.bio
      );
    profile.bitcoinAddress = durranUserData.bitcoinAddress;
  } else {
    profile.name =
      durranUserData.name === null ? (
        <>{USER_DEFAULT_NAME}</>
      ) : (
        durranUserData.name
      );
    profile.username = durranUserData.username;
    profile.country = durranUserData.location;
    profile.dateJoined = moment(durranUserData.createdAt).format("MMMM YYYY");
    profile.bio =
      durranUserData.bio === null ? (
        <>{USER_DEFAULT_BIO}</>
      ) : (
        durranUserData.bio
      );
    profile.bitcoinAddress = durranUserData.bitcoinAddress;
  }
  const handleClose = () => {
    setDialog(false);
  };

  const Country = (props) => {
    const { country } = props;
    let countryCode = "";
    if (country !== null) {
      countryCode = countryList.getCode(country);
    }
    return (
      <>
        {country === null ? (
          <Box display="flex">
            <p className={classes.emoji}>
              <EmojioneV4 text=":earth_americas:" className="a" />
            </p>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {USER_DEFAULT_COUNTRY}
            </Typography>
          </Box>
        ) : (
          <Box display="flex">
            <p className={classes.emoji}>
              <EmojioneV4
                text={
                  countryCode == null
                    ? `:earth_americas:`
                    : `:flag-${countryCode.toLowerCase()}:`
                }
                className="a"
              />
            </p>
            <Typography
              variant="subtitle1"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {country}
            </Typography>
          </Box>
        )}
      </>
    );
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.profile}>
        <Box className={classes.profileBanner}></Box>
        <Box pl={2} pr={2}>
          <Box style={{ position: "relative" }}>
            <Box className={classes.avatarProfileContainer}>
              <img
                src={placeHolder}
                alt="..."
                className={classes.avatarProfile}
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
                {profile.name}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className="profileUsername"
                style={{ lineHeight: 1 }}
              >
                {profile.username}
              </Typography>
              <Box mt={2}>
                <Typography variant="subtitle2" component="p">
                  {profile.bio}
                </Typography>
                <Box mt={2}>
                  <Box>
                    <Country country={profile.country} />
                  </Box>
                  <Box display="flex">
                    <p className={classes.emoji}>
                      <EmojioneV4 text=":calendar:" className="a" />
                    </p>
                    <Typography
                      variant="subtitle1"
                      component="p"
                      style={{ fontSize: "12px" }}
                    >
                      Joined {profile.dateJoined}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={4} pl={2} pr={2}>
        {isSelf && entries.length !== 0
          ? entries.map((row, index) => {
              return (
                <EntryComponent
                  entry={row.attrs}
                  key={index}
                  history={history}
                />
              );
            })
          : null}

        {!isSelf && durranUserData.entries !== 0
          ? 
          durranUserData.entries.map((row, index) => {
              return (
                <EntryComponent
                  entry={row}
                  key={index}
                  history={history}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
};
export default Profile;
