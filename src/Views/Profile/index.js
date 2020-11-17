import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ProfileComponent from "Pages/Profile";
import DurranUserModel from "Models/DurranUser";
import EntryModel from "Models/Entry";
import {
  fetchDurranUser,
  clearDurranUser,
} from "Utils/Actions/durranUserAction";

import { fetchEntries } from "Utils/Actions/entryAction";

import ProfileLoadingComponent from "Components/ProfileLoading";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUser: false,
      userData: null,
      isSelf: false,
      durranUserAdmin: [],
      entries: null,
      updateUserProfile: false,
    };
    this.handleProfileData = this.handleProfileData.bind(this);
  }

  async handleProfileData() {
    this.setState({
      isLoading: true,
    });
    const { userData, match } = this.props;
    const username = match.params.username;
    if (userData.username === username) {
      try {
        const durranUser = await DurranUserModel.fetchOwnList({
          username: username,
        });

        const entries = await EntryModel.fetchOwnList({
          createdBy: username,
        });

        this.setState({
          durranUserAdmin: durranUser,
          entries: entries,
          isSelf: true,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (userData.username !== username) {
      const query = { durranUser: username };
      const queryEntries = { createdBy: username };
      this.props.fetchDurranUser(query);
      this.props.fetchEntries(queryEntries);
      this.setState({ isSelf: false, isLoading: false });
    }
  }

  componentDidMount() {
    this.handleProfileData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.handleProfileData();
    }
  }

  componentWillUnmount() {
    this.props.clearDurranUser();
  }

  render() {
    const { isLoading, isSelf, entries, durranUserAdmin } = this.state;
    const { userData, history, durranUser, durranUserLoading, entriesLoading } = this.props;
    console.log(durranUser)
    return (
      <Box>
        {isLoading ? (
          <ProfileLoadingComponent />
        ) : isSelf ? (
          <ProfileComponent
            userData={userData}
            durranUser={durranUserAdmin}
            entries={entries}
            isSelf={isSelf}
            history={history}
          />
        ) : durranUserLoading && entriesLoading ? (
          <ProfileLoadingComponent />
        ) : durranUser.length !== 0 ? (
          <ProfileComponent
            userData={userData}
            durranUser={durranUser}
            entries={this.props.entries}
            isSelf={isSelf}
            history={history}
          />
        ) : (
          <>Cannot be found</>
        )}
      </Box>
    );
  }
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
