import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { UserSession, Person, blockstackUser } from "blockstack";
import { Connect } from "@blockstack/connect";
import { connect } from "react-redux";
import { configure, User, getConfig } from "radiks";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

class App extends Component {
  constructor(props) {
    super(props);
    const userSession = new UserSession({ appConfig });
    this.state = {
      userSession,
      userData: null,
      isLoading: true,
      userSigningIn: false,
    };
    this.handleUserSignIn = this.handleUserSignIn.bind(this);
    this.handleRadiksSignIn = this.handleRadiksSignIn.bind(this);
  }

  async componentDidMount() {
    const { userSession } = this.state;
    console.log("test");
    configure({
      apiServer: "http://localhost:5002",
      userSession,
    });

    if (userSession.isUserSignedIn()) {
      const query = { sortByDateStart: true };
      this.handleUserSignIn(userSession);
      this.props.fetchDares(query);
    }
    this.setState({ isLoading: false });
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userSession !== this.state.userSession) {
      console.log("test123");
    }
  }

  async handleUserSignIn(userSession) {
    const { setUser, setUserSettings } = this.props;
    const userData = userSession.loadUserData();
    this.setState({ userData: userData });
    if (userData.username === "fenrir09.id.blockstack") {
      setUserSettings({ isAdmin: true });
    }
    setUser(userData);
  }

  async handleRadiksSignIn(username) {
    this.setState({ userSigningIn: true });
    const query = { sortByDateStart: true };
    this.props.fetchDares(query);
    try {
      await User.createWithCurrentUser();
      const durranUser = await DurranUserModel.fetchOwnList();
      if (!durranUser.length) {
        const durranUserModel = new DurranUserModel({
          name: null,
          username: username,
          bio: null,
          imageUrl: null,
          bannerUrl: null,
          bitcoinAddress: null,
          location: null,
        });
        await durranUserModel.save();
      }
      this.setState({ userSigningIn: false });
    } catch (error) {
      console.log(error);
      this.setState({ userSigningIn: false });
    }
  }

  render() {
    const { userData, isLoading, userSession, userSigningIn } = this.state;
    const { userSettings, dares, loadingReducer } = this.props;
    const authOptions = {
      appDetails: {
        name: "Durran",
        icon: window.location.origin + "/logo192.png",
      },
      userSession,
      finished: ({ userSession }) => {
        const { setUser, setUserSettings } = this.props;
        const userData = userSession.loadUserData();
        this.handleRadiksSignIn(userData.username);
        this.setState({ userData: userData });
        if (userData.username === "fenrir09.id.blockstack") {
          setUserSettings({ isAdmin: true });
        }
        setUser(userData);
      },
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Connect
          authOptions={useConnectOptions(
            connectOptions(({ userSession }) => this.state(userSession))
          )}
        >
          <ThemeProvider theme={theme}>
            {isLoading ? (
              <Box>Loading</Box>
            ) : !userData ? (
              <UserStructure
                userSession={userSession}
                signInUser={signInUser}
              />
            ) : userSigningIn ? (
              <Box>User signing in</Box>
            ) : (
              <SuperUser
                userSession={userSession}
                signOutUser={signOutUser}
                userData={userData}
                isAdmin={userSettings.isAdmin}
              />
            )}
          </ThemeProvider>
        </Connect>
      </MuiPickersUtilsProvider>
    );
  }
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
