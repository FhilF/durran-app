import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import SuperUserRoutes from "Routes/SuperUser";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { fetchDares } from "Utils/Actions/dareAction";
import { connect } from "react-redux";

import { pink, blue } from "@material-ui/core/colors";

import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const drawerLeftWidth = "280px";
const drawerRightWidth = "350px";
const densedDrawerRightWidth = "300px";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  drawerLeft: {
    "@media (max-width: 1279px)": {
      width: theme.spacing(15) + 1,
      "& .MuiListItemText-root > span": {
        visibility: "hidden",
      },
      "& .MuiListItemIcon-root": {
        minWidth: 0,
      },
    },
    "@media (min-width: 1280px)": {
      width: drawerLeftWidth,
    },
    height: "100vh",
  },

  drawerRight: {
    "@media (max-width: 1059px)": {
      width: densedDrawerRightWidth,
    },
    "@media (min-width: 1060px)": {
      width: drawerRightWidth,
    },
    height: "100vh",
  },

  navLeft: {
    width: "inherit",
  },

  navRight: {
    width: "inherit",
  },

  navChildLeft: {
    "@media (min-width: 1280px)": {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },

  navChildRight: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },

  navContentLeft: {
    width: "inherit",
    height: "inherit",
    flexGrow: 1,
    position: "fixed",
  },

  navContent: {
    width: "inherit",
    height: "inherit",
    flexGrow: 1,
    position: "fixed",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    height: "auto",
    overflow: "auto",
    flexGrow: 1,
  },

  main: {
    borderLeft: "1px solid #303030",
    borderRight: "1px solid #303030",
    "@media (min-width: 700px)": {
      width: "100%",
      minWidth: "600px",
      maxWidth: "600px",
    },
  },

  largeMain: {
    borderLeft: "1px solid #424b63",
    borderRight: "1px solid #424b63",
    "@media (min-width: 700px)": {
      width: "100%",
      minWidth: "900px",
      maxWidth: "900px",
    },
  },

  pageTitle: {
    color: "#fff !important",
    fontFamily: theme.custom.font1.fontFamily,
    fontWeight: 600,
  },
}));

const RightNavComponent = (props) => {
  const classes = useStyles();
  const { history,location } = props;
  return (
    <Box className={classes.drawerRight}>
      <Box className={classes.navContent}>
        <nav className={classes.navRight}>
          <Box className={classes.navChildRight}>
            <RightNav history={history} location={location}/>
          </Box>
        </nav>
      </Box>
    </Box>
  );
};

const SuperUser = (props) => {
  const {
    history,
    match,
    userSession,
    signOutUser,
    userData,
    isAdmin,
    dares,
  } = props;
  const classes = useStyles();
  const largeWidth = () => {
    if (history.location.pathname === "/admin/dare") {
      return true;
    }
    return false;
  };

  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    return () => {
      setLocation(history.location)
    };
  }, [history.location]);

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box className={classes.drawerLeft}>
          <Box className={classes.navContentLeft}>
            <nav className={classes.navLeft} aria-label="mailbox folders">
              <Box className={classes.navChildLeft}>
                <LeftNav
                  userSession={userSession}
                  signOutUser={signOutUser}
                  history={history}
                  match={match}
                  userData={userData}
                  isAdmin={isAdmin}
                />
              </Box>
            </nav>
          </Box>
        </Box>
        <Box className={largeWidth() ? classes.largeMain : classes.main}>
          <Box>
            <main className={classes.content}>
              <Box
                pl={2}
                pr={2}
                pt={4}
                pb={4}
                display="flex"
                justifyContent="start"
                style={{ borderBottom: "1px solid #303030" }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  className={classes.pageTitle}
                >
                  Home
                </Typography>
              </Box>
              <SuperUserRoutes
                userSession={userSession}
                history={history}
                isAdmin={isAdmin}
              />
            </main>
          </Box>
        </Box>
        {largeWidth() ? null : <RightNavComponent history={history} location={location} />}
      </Box>
    </Box>
  );
};

export default withRouter(SuperUser);
