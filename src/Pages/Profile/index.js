import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import {
  fetchDurranUser,
  clearDurranUser,
} from "Utils/Actions/durranUserAction";

import { fetchEntries } from "Utils/Actions/entryAction";
import ProfileLoadingComponent from "Components/ProfileLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { match, userData, fetchDurranUser, durranUser } = props;
  const username = match.params.username;
  const [pageLoading, setPageLoading] = useState(true);
  const [isSelf, setIsSelf] = useState();

  useEffect(() => {
    if (userData.username === username) {
      setIsSelf(true);
    } else {
      setIsSelf(false);
      const query = { durranUser: username };
      fetchDurranUser(query);
    }
  }, [username, userData, fetchDurranUser]);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  return (
    <Box className={classes.root}>
      {pageLoading ? (
        <ProfileLoadingComponent />
      ) : (
        <Box>
          {isSelf ? (
            <UserProfile />
          ) : (
            <OtherUserProfile durranUser={durranUser} />
          )}
        </Box>
      )}
    </Box>
  );
}

function UserProfile(props) {
  const classes = useStyles();
  return <Box className={classes.root}>me</Box>;
}

function OtherUserProfile(props) {
  const {durranUser}= props;
  const classes = useStyles();
  useEffect(() => {
    console.log(durranUser)
  }, [durranUser]);

  return <Box className={classes.root}>not me</Box>;
}

const mapStateToProps = (state) => ({
  userData: state.authReducer.user,
  durranUser: state.durranUserReducer.durranUser,
  durranUserLoading: state.durranUserReducer.durranUserLoading,
  durranUserError: state.durranUserReducer.durranUserError,
  entries: state.entryReducer.entries,
  entriesLoading: state.entryReducer.entriesLoading,
  entriesError: state.entryReducer.entriesError,
});

export default connect(mapStateToProps, {
  fetchDurranUser,
  clearDurranUser,
  fetchEntries,
})(Profile);
