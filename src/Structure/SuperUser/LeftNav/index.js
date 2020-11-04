import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { EmojioneV4 } from "react-emoji-render";
import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { pink, blue } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .navigationList > div:hover": {
      "& .MuiListItemText-primary": {
        color: "#fff",
      },
    },

    "& .active": {
      borderLeft: theme.custom.border,
      boxShadow: "0 6px 10px 0 #0c0c0c",
      backgroundColor: theme.palette.background.paper,
      "& .MuiListItemText-primary": {
        color: "#fff",
      },
    },
  },
  customListButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    height: "48px",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: "2px",
    paddingTop: theme.spacing(2),

    "@media (max-width: 1279px)": {
      justifyContent: "center",
    },
  },

  profileAvatar: {
    backgroundColor: theme.palette.secondary.main + " !important",
    color: "#fff",
    "& :hover": {
      backgroundColor: pink[100],
    },
  },

  profileInfo: {
    "@media (max-width: 1279px)": {
      display: "none",
    },
    paddingLeft: theme.spacing(2),
    "& .profileName": {
      fontSize: "16px",
      fontWeight: 600,
      display: "inline-block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "90%",
      color: theme.palette.primary.main + " !important",
      fontFamily: theme.custom.font2.fontFamily,
    },
    "& .profileUsername": {
      fontFamily: theme.custom.font2.fontFamily,
      fontWeight: 400,
    },
  },

  emoji: {
    "& > span > img": {
      height: "24px !important",
      width: "24px !important",
    },
  },
  navList: {
    "& .MuiListItemText-root > span": {
      color: theme.palette.text.primary,
      fontFamily: theme.custom.font1.fontFamily,
      fontWeight: 600,
      fontSize: "20px",
      letterSpacing: ".5px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "50px",
    },
  },
  rootProfile: {
    position: "relative",
    flexGrow: 1,
    "& :hover": {
      backgroundColor: theme.custom.cardBg,
      "& .profileName": {
        color: "#fff",
      },
      "& .profileUsername": {
        color: "#fff",
      },
    },
  },
  profileLink: {
    color: "#fff",
    textDecoration: "none",
  },

  userMenu: {
    "& .MuiMenu-paper": {
      width: "260px",
      backgroundColor: "#232938",
      "& > ul > li .MuiTypography-root": {
        color: theme.palette.text.primary,
      },
      "& > ul > li .MuiListItemIcon-root": {
        minWidth: "50px !important",
      },
      "& > ul > li:hover": {
        "& .MuiTypography-root": {
          color: "fff#",
        },
      },
    },
  },
}));

const MainMenu = [
  { name: "Home", location: "/", emoji: ":house_with_garden:" },
  { name: "Dares", location: "/dare", emoji: ":video_game:" },
];

const LeftNav = (props) => {
  const classes = useStyles();
  const { history, match, userSession, signOutUser, userData, isAdmin } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [location, setlocation] = useState(match.path);

  useEffect(() => {
    setlocation(history.location.pathname);
  }, [history.location]);

  const handleUserMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.rootProfile}>
        <a
          href="/"
          className={classes.profileLink}
          onClick={(e) => {
            handleUserMenu(e);
          }}
        >
          <Box className={classes.profile}>
            <Box className={classes.rootProfileAvatar}>
              <Avatar className={classes.profileAvatar}>F</Avatar>
            </Box>
            <Box className={classes.profileInfo}>
              <Typography variant="h4" component="h5" className="profileName">
                Fhilip Jhune Fernandez
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className="profileUsername"
              >
                {userData.username}
              </Typography>
            </Box>
          </Box>
        </a>
      </Box>
      <Divider />
      <List classes={{ root: "navigationList" }} className={classes.navList}>
        {MainMenu.map((menu, index) => (
          <Link
            key={index}
            color="inherit"
            underline="none"
            href={`${menu.location}`}
            onClick={(e) => {
              e.preventDefault();
              history.push(menu.location);
              if (anchorEl) {
                handleClose();
              }
            }}
          >
            <ListItem
              button
              className={[
                location === menu.location ? "active" : null,
                classes.customListButton,
              ].join(" ")}
            >
              <ListItemIcon>
                <span className={classes.emoji}>
                  <EmojioneV4 text={menu.emoji} />
                </span>
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          </Link>
        ))}

        {isAdmin ? (
          <Link
            color="inherit"
            underline="none"
            href="/admin/dare"
            onClick={(e) => {
              e.preventDefault();
              history.push("/admin/dare");
              if (anchorEl) {
                handleClose();
              }
              if (anchorEl) {
                handleClose();
              }
            }}
          >
            <ListItem
              button
              className={[
                location === "/admin/dare" ? "active" : null,
                classes.customListButton,
              ].join(" ")}
            >
              <ListItemIcon>
                <span className={classes.emoji}>
                  <EmojioneV4 text=":file_folder:" />
                </span>
              </ListItemIcon>
              <ListItemText primary="Dare List" />
            </ListItem>
          </Link>
        ) : null}
      </List>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        className={classes.userMenu}
      >
        <MenuItem
          onClick={(e) => {
            history.push(`/profile/${userData.username}`);
            if (anchorEl) {
              handleClose();
            }
          }}
          style={
            location === `/profile/${userData.username}`
              ? { backgroundColor: pink[500] }
              : null
          }
        >
          <ListItemIcon>
            <span className={classes.emoji}>
              <EmojioneV4 text=":panda_face:" />
            </span>
          </ListItemIcon>
          <Typography
            variant="inherit"
            style={
              location === `/profile/${userData.username}`
                ? { color: "#fff" }
                : null
            }
          >
            View Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            signOutUser(e, userSession);
          }}
        >
          <ListItemIcon>
            <span className={classes.emoji}>
              <EmojioneV4 text=":door:" />
            </span>
          </ListItemIcon>
          <Typography variant="inherit">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default LeftNav;
