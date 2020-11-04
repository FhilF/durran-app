import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Link from "@material-ui/core/Link";

import DareModel from "Models/Dare";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    backgroundColor: theme.custom.cardBg,
    marginTop: "8px",
    boxShadow: theme.custom.boxShadow,
    // borderLeft: theme.custom.border,
  },
}));

function DareList(props) {
  const classes = useStyles();
  const { data, history } = props;
  return (
    <Box className={classes.root} p={2}>
      {data.map((dare, index) => {
        const maxLength = 158;
        let description = dare.description;
        if (description.length > maxLength) {
          description = description.substring(0, maxLength);
          description = description.substring(0, maxLength + 1) + "...";
        }
        return (
          <Card className={classes.cardRoot} key={index}>
            <CardContent
              style={{
                paddingTop: "32px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <Typography className={classes.title} variant="h5" component="h1">
                {dare.title}
              </Typography>
              <Typography variant="subtitle2" component="p">
                {dare._id}
              </Typography>
              <Box mt={4}>
                <Typography variant="body1" component="p">
                  {description}
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography variant="subtitle1" component="p">
                  {moment(dare.dateTimeStart).format("MMM DD, YYYY • hh:mm a")}{" "}
                  <span style={{ fontSize: ".9em", fontWeight: 600 }}>-</span>{" "}
                  {moment(dare.dateTimeEnd).format("MMM DD, YYYY • hh:mm a")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="p"
                  gutterBottom
                ></Typography>
              </Box>
            </CardContent>
            <CardActions
              style={{
                display: "block",
                // justifyContent: "flex-end",
                padding: "20px",
                paddingTop: 0,
              }}
            >
              <Box display="flex" justifyContent="flex-start">
                <Box style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="subtitle2"
                    component="p"
                  >
                    {moment(dare.createdAt).format("MMM DD, yyyy • hh:mm a")}
                  </Typography>
                </Box>
                <Box>
                <Link
                    color="primary"
                    underline="none"
                    href={`/dare/${dare._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/dare/${dare._id}`);
                    }}
                  >
                  <Button
                    variant="outlined"
                    color="primary"
                  >
                    Join
                  </Button>
                  </Link>
                </Box>
              </Box>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}

export default DareList;
