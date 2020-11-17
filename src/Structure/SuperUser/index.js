import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import SuperUserRoutes from "Routes/SuperUser";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { fetchDares } from "Utils/Actions/dareAction";
import { connect } from "react-redux";

import { pink, blue } from "@material-ui/core/colors";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";

import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import StxComponent from "Components/Stx";

import Link from "@material-ui/core/Link";

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
    display: "flex",
    flexDirection: "column",
  },

  navRight: {
    width: "inherit",
  },

  navChildLeft: {
    display: "flex",
    flexDirection: "column",
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
    display: "flex",
  },

  navContent: {
    width: "inherit",
    height: "inherit",
    flexGrow: 1,
    position: "fixed",
  },

  toolbar: theme.mixins.toolbar,

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

  appBar: {
    boxShadow: "1px 1px #0d0d10",
    background: "#121219",
    color: "#fff",
  },

  toolBar: {
    maxWidth: "1232px",
    width: "100%",
    height: "60px",
  },

  profileAvatar: {
    marginLeft: "-3px",
    height: "36px",
    width: "36px",
    backgroundColor: theme.palette.secondary.main + " !important",
    color: "#fff",
    "& :hover": {
      backgroundColor: pink[100],
    },
  },

  profile: {
    borderRadius: "50px",
    padding: "5px 10px",
  },

  line: {
    background: theme.palette.divider,
    height: "100%",
    width: "1px",
    marginRight: "8px",
  },
}));

const RightNavComponent = (props) => {
  const classes = useStyles();
  const { history, location } = props;
  return (
    <Box className={classes.drawerRight}>
      <Box className={classes.navContent}>
        <nav className={classes.navRight}>
          <Box className={classes.navChildRight}>
            <RightNav history={history} location={location} />
          </Box>
        </nav>
      </Box>
    </Box>
  );
};

function SuperUser(props) {
  const {
    history,
    match,
    userSession,
    signOutUser,
    userData,
    isAdmin,
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
      setLocation(history.location);
    };
  }, [history.location]);

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Box display="flex" justifyContent="center">
          <Toolbar className={classes.toolBar}>
            <Box
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                News
              </Typography> */}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              style={{
                height: "100%",
              }}
            >
              <Box mr="16px">
                <StxComponent userData={userData} />
              </Box>
              <Box display="flex" width="1px" className={classes.line}></Box>
              <Link
                color="inherit"
                underline="none"
                href={`/profile/${userData.username}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/profile/${userData.username}`);
                }}
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                  className={classes.profile}
                >
                  <Box display="flex">
                    <Avatar className={classes.profileAvatar}>F</Avatar>
                    <Box display="flex" alignItems="center" ml={1}>
                      <Typography variant="h6" component="h2">
                        {userData.username}
                      </Typography>
                    </Box>
                  </Box>
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Toolbar />
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box display="flex">
          <Box className={classes.drawerLeft}>
            <Box className={classes.navContentLeft}>
              <nav className={classes.navLeft}>
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
            <Box mt={2}>
              <SuperUserRoutes
                userSession={userSession}
                history={history}
                isAdmin={isAdmin}
              />
            </Box>
          </Box>
          {largeWidth() ? null : (
            <RightNavComponent history={history} location={location} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(SuperUser);
