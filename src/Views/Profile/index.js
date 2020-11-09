import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ProfileComponent from "Pages/Profile";
import DurranUserModel from "Models/DurranUser";
import EntryModel from "Models/Entry";
import {
  fertchDurranUser,
  clearDurranUser,
} from "Utils/Actions/durranUserAction";

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
      this.props.fertchDurranUser(query);
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
    const { userData, history, durranUser, durranUserLoading } = this.props;

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
        ) : durranUserLoading ? (
          <ProfileLoadingComponent />
        ) : durranUser.length !== 0 ? (
          <ProfileComponent
            userData={userData}
            durranUser={durranUser}
            entries={entries}
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
});
export default connect(mapStateToProps, { fertchDurranUser, clearDurranUser })(
  Profile
);
