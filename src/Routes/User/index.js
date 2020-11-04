import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "Views/LandingPage";

class UserRouter extends Component {
  render() {
    return (
      <Box>
        <Switch>
          <Route
            exact
            path="/"
            Component
            render={(routeProps) => <LandingPage {...routeProps} />}
          />
        </Switch>
      </Box>
    );
  }
}

export default UserRouter;
