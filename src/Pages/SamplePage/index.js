import React from "react";
import Box from "@material-ui/core/Box";
import Header from "Components/Layouts/Header";
import SuperUserRoutes from "Routes/SuperUser";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerLeftWidth = "280px";
const drawerRightWidth = "350px";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  navLeft: {
    width: drawerLeftWidth,
    height: "100vh",
  },

  navRight: {
    width: drawerRightWidth,
    height: "100vh",
  },

  drawerLeft: {
    width:"inherit",
  },

  drawerRight: {
    width:"inherit",
  },

  navChild: {
    
  },

  navContent: {
    width:"inherit",
    height:"inherit",
    flexGrow:1,
    position: "fixed",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    height: "auto",
    overflow: "auto",
    flexGrow: 1,
  },

  main: {
    "@media (min-width: 700px)": {
      width: "100%",
      minWidth: "600px",
      maxWidth: "600px",
    },
  },
}));

const SuperUser = (props) => {
  const { userSession, signOutUser } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box className={classes.navLeft}>
          <Box className={classes.navContent} bgcolor="grey.300">
            <nav className={classes.drawerLeft} aria-label="mailbox folders">
              <Divider />
              <List>
                {["Inbox", "Starred", "Send emailaaaaadddsd", "Drafts"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </nav>
          </Box>
        </Box>
        <Box className={classes.main}>
          <Box>
            <main className={classes.content}>
              <SuperUserRoutes />
            </main>
          </Box>
        </Box>
        <Box className={classes.navRight}>
          <Box className={classes.navContent} bgcolor="grey.300">
            <nav className={classes.drawerRight} aria-label="mailbox folders">
              <Divider />
              <List>
                {["Inbox", "Starred", "Send emailaaaaadddsd", "Drafts"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </nav>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SuperUser;
