import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "Views/index";
import SamplePage from "Views/SamplePage";
import Profile from "Views/Profile";
import Entry from "Views/Entry";
import Dare from "Views/Dare";
import DareList from "Views/Dare/dareList";
import DareAdmin from "Views/DareAdmin";
import DareAdminList from "Views/DareAdmin/dareList";
import AddDare from "Views/DareAdmin/addDare";

class SuperUserRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isAdmin, ...rest } = this.props;
    return (
      <Box>
        <Switch>
          <Route
            exact
            path="/"
            Component
            render={(routeProps) => <Home {...routeProps} {...rest} />}
          />
          <Route
            path="/profile/:username"
            Component
            render={(routeProps) => <Profile {...routeProps} {...rest} />}
          />
          <Route
              path="/entry/:entryId"
              Component
              render={(routeProps) => <Entry {...routeProps} />}
            />
          <Route
              path="/dare/:dareId"
              Component
              render={(routeProps) => <Dare {...routeProps} />}
            />
          <Route
            path="/dare"
            Component
            render={(routeProps) => <DareList {...routeProps} {...rest} />}
          />
        </Switch>
        {isAdmin ? (
          <Switch>
            <Route
              path="/admin/dare/:dareId"
              Component
              render={(routeProps) => <DareAdmin {...routeProps} />}
            />
            <Route
              path="/admin/dare"
              Component
              render={(routeProps) => <DareAdminList {...routeProps} />}
            />
            <Route
              path="/admin/add-dare"
              Component
              render={(routeProps) => <AddDare {...routeProps} />}
            />
          </Switch>
        ) : null}
      </Box>
    );
  }
}

export default SuperUserRouter;
