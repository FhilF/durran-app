import React, { Component, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { UserSession, Person, blockstackUser } from "blockstack";
import { Connect } from "@blockstack/connect";
import { connect } from "react-redux";
import { configure, User, getConfig } from "radiks";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";

import { fetchDares } from "Utils/Actions/dareAction";

import DurranUserModel from "Models/DurranUser";
import LandingPage from "Views/LandingPage";
import UserStructure from "Structure/User";
import SuperUser from "Structure/SuperUser";
import theme from "Common/theme";
import { appConfig } from "Common/constants";
import {
  setUser,
  signInUser,
  signOutUser,
  setUserSettings,
} from "Utils/Actions/userAuthAction";

import { useBlockstack, useConnectOptions } from "react-blockstack";
import { connectOptions } from "./UserSession";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import TestComponent from "Pages/Test";

const handleRadiksSignIn = async (userData, setIsSigningIn) => {
  setIsSigningIn(true);
  const query = { sortByDateStart: true };
  // this.props.fetchDares(query);
  try {
    await User.createWithCurrentUser();
    const durranUser = await DurranUserModel.fetchOwnList();
    if (!durranUser.length) {
      const durranUserModel = new DurranUserModel({
        name: null,
        username: userData.username,
        bio: null,
        imageUrl: null,
        bannerUrl: null,
        stxAddress: userData.profile.stxAddress,
        location: null,
      });
      await durranUserModel.save();
    }
    setIsSigningIn(false);
  } catch (error) {
    console.log(error);
    setIsSigningIn(false);
  }
};

const handleUserSignIn = async (userSession, setUser, setUserSettings) => {
  if (userSession) {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      if (userData.username === "fenrir09.id.blockstack") {
        setUserSettings({ isAdmin: true });
      }
      setUser(userData);
    }
  }
};

function App(props) {
  const {
    userSettings,
    setUserSettings,
    setUser,
    userData,
    fetchDares,
  } = props;
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userSession, setUserSession] = useState();
  const { userSession: session } = useBlockstack();

  useEffect(() => {
    setUserSession(session);
    handleUserSignIn(session, setUser, setUserSettings);
  }, [session, setUser, setUserSettings]);

  useEffect(() => {
    configure({
      apiServer: "http://localhost:5002",
      userSession,
    });

  }, [userSession]);

  useEffect(() => {
    console.log(isSigningIn);
  }, [isSigningIn]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Connect
        authOptions={useConnectOptions(
          connectOptions(({ userSession }) => {
            setUserSession(userSession);
            const { setUser, setUserSettings } = props;
            const userData = userSession.loadUserData();
            handleUserSignIn(userSession, setUser, setUserSettings);
            handleRadiksSignIn(userData, setIsSigningIn);
          })
        )}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
            <Box>Loading</Box>
          ) : isSigningIn ? (
            <Box>Signing in user...</Box>
          ) : (
            <Content
              userSession={userSession}
              signOutUser={signOutUser}
              userSettings={userSettings}
              userData={userData}
              fetchDares={fetchDares}
            />
          )}
        </ThemeProvider>
      </Connect>
    </MuiPickersUtilsProvider>
  );
}

function Content(props) {
  const {
    userSession,
    userData,
    signOutUser,
    userSettings,
    fetchDares,
    dareReducerObj,
  } = props;
  const authenticated = userSession && userSession.isUserSignedIn();
  const decentralizedID =
    userSession &&
    userSession.isUserSignedIn() &&
    userSession.loadUserData().decentralizedID;

  useEffect(() => {
    if (userSession) {
      if (userSession.isUserSignedIn()) {
        const query = { sortByDateStart: true };
        fetchDares(query);
      }
    }
  }, [userSession, fetchDares]);

  return (
    <Box>
      {!authenticated && <UserStructure signInUser={signInUser} />}
      {decentralizedID && (
        <SuperUser
          userSession={userSession}
          signOutUser={signOutUser}
          userData={userData}
          isAdmin={userSettings.isAdmin}
        />
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userData: state.authReducer.user,
  userSettings: state.authReducer.userSettings,
  dares: state.dareReducer.dares,
  loadingReducer: state.dareReducer.daresLoading,
  errorReducer: state.dareReducer.daresError,
});
export default connect(mapStateToProps, {
  setUser,
  setUserSettings,
  fetchDares,
})(App);
