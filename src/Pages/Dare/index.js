import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SaveIcon from "@material-ui/icons/Save";

import DareModel from "Models/Dare";
import EntryForm from "Components/Forms/EntryForm"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dareCardRoot: {
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
  },
  formEntryCardRoot: {
    marginTop: "8px",
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
  },
  cardContent: {
    paddingTop: "32px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  entryFormRoot: {},

  parentTextArea: {
    width: "100%",
    background: "transparent",
  },

  customTextArea: {
    paddingTop: "10px",
  },


  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
  },

  profileUsername: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },
}));

function Dare(props) {
  const classes = useStyles();
  const { dare, userData } = props;
  return (
    <Box className={classes.root} p={2}>
      <Card className={classes.dareCardRoot}>
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography className={classes.title} variant="h5" component="h1">
              {dare[0].title}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {dare[0]._id}
            </Typography>
          </Box>
          <Box mt={8}>
            <Typography variant="body1" component="p">
              {dare[0].description}
            </Typography>
          </Box>
          <Box mt={8}>
            <Typography variant="subtitle1" component="p">
              {moment(dare[0].dateTimeStart).format("MMM DD, yyyy • hh:mm a")}{" "}
              <span style={{ fontSize: ".9em", fontWeight: 600 }}>-</span>{" "}
              {moment(dare[0].dateTimeEnd).format("MMM DD, yyyy • hh:mm a")}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              gutterBottom
            ></Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button color="primary">View entries</Button>
          </Box>
        </CardContent>
      </Card>
      <EntryForm userData={userData} dare={dare}/>
      <Box style={{backgorund:"white", height:"500px", width:"100%"}}></Box>
    </Box>
  );
}

export default Dare;
