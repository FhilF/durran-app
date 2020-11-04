import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { fetchDares } from "Utils/Actions/dareAction";
import Link from "@material-ui/core/Link";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
  },
  card: {
    border: "none",
    borderBottom: "solid 1px #424b63",
    background: "#232938",
    "& .MuiCardContent-root": {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
    "& .MuiTypography-h5": {
      fontSize: "20px",
    },
    "& .MuiButtonBase-root": {
      textTransform: "none",
    },
  },
  cardTitle: {},

  dareContainer: {
    padding: "20px 16px 20px 16px",
    background: theme.custom.cardBg,
    marginBottom: "8px",
    boxShadow: "0 6px 10px 0 #0c0c0c",
    "&:hover": {
      paddingLeft: "11px",
      borderLeft: "5px solid " + theme.palette.primary.main,
      fontSize: "15.5px",
      background:theme.custom.hoverCardBg
    },
    color: "#fff",
    fontFamily: theme.custom.font1.fontFamily,
    fontWeight: 400,
    fontSize: "15px",
  },

  dareContainerDetails: {},

  title: {
    color: "#fff !important",
    fontFamily: theme.custom.font1.fontFamily,
    fontWeight: 600,
  },
}));

const DareComponent = (props) => {
  const classes = useStyles();
  const { dare, history } = props;
  return (
    <Link
      color="inherit"
      underline="none"
      href={`/dare/${dare._id}`}
      onClick={(e) => {
        e.preventDefault();
        history.push(`/dare/${dare._id}`);
      }}
    >
      <Box className={classes.dareContainer}>
        <Box display="flex" justifyContent="flex-start">
          <Box style={{ flex: 1 }}>
            <Box>
              <Box className={classes.dareContainerDetails}>{dare.title}</Box>
              <Typography
                variant="subtitle1"
                component="p"
                style={{ fontSize: "11px", marginTop: "5px" }}
              >
                {moment(dare.dateTimeStart).format("MMM DD, YYYY")}{" "}
                <span style={{ fontSize: ".9em", fontWeight: 600 }}>-</span>{" "}
                {moment(dare.dateTimeEnd).format("MMM DD, YYYY")}
              </Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ArrowForwardIcon color="primary" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

const RightNav = (props) => {
  const { dares, loadingReducer, history, location } = props;
  const classes = useStyles();
  const limit = 2;
  return (
    <Box className={classes.root}>
      {location.pathname === "/dare" ? null : (
        <Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            style={{
              borderBottom: "1px solid #303030",
              paddingLeft: "2px",
              paddingRight: "2px",
            }}
          >
            <Box style={{ flex: 1 }}>
              <Box pt={4} pb={4} display="flex" justifyContent="start">
                <Typography
                  variant="h5"
                  component="h1"
                  className={classes.title}
                >
                  Dares
                </Typography>
              </Box>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Link
                color="inherit"
                href="/dare"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/dare");
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="p"
                  style={{ textDecoration: "inherit" }}
                >
                  View all dares
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box style={{ paddingTop: "8px" }}>
            {loadingReducer ? (
              <>Loading</>
            ) : (
              dares.map((dare, index) => {
                return (
                  <Box key={index}>
                    {index <= limit - 1 ? (
                      <DareComponent
                        key={index}
                        dare={dare}
                        history={history}
                      />
                    ) : null}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  dares: state.dareReducer.dares,
  loadingReducer: state.dareReducer.daresLoading,
  errorReducer: state.dareReducer.daresError,
});
export default connect(mapStateToProps, { fetchDares })(RightNav);
