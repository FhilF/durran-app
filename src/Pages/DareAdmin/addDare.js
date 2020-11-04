import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import DareModel from "Models/Dare";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {},
  },
  datePicker: {
    marginRight: theme.spacing(16) + "px !important",
  },
  actionRoot: {
    "& > *": {
      margin: theme.spacing(1),
      textTransform: "none",
    },
  },
}));

function DareAdmin(props) {
  const classes = useStyles();
  const { userData } = props;
  const [title, setTitle] = useState("");
  const [selectedDateStart, handleDateStartChange] = useState(new Date());
  const [selectedDateEnd, handleDateEndChange] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dareModel = new DareModel({
      title: title,
      description: description,
      dateTimeStart: Date.parse(selectedDateStart),
      dateTimeEnd: Date.parse(selectedDateEnd),
      createdBy: userData.userName,
    });

    try {
      await dareModel.save();
      setLoading(false);
      console.log('success')
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box className={classes.root} p={4}>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Title"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <Box style={{ display: "flex", marginTop: "32px" }}>
            <DateTimePicker
              value={selectedDateStart}
              disablePast
              onChange={handleDateStartChange}
              label="Date start"
              showTodayButton
              fullWidth
              className={classes.datePicker}
              inputVariant="outlined"
            />
            <DateTimePicker
              value={selectedDateEnd}
              disablePast
              onChange={handleDateEndChange}
              label="Date End"
              showTodayButton
              fullWidth
              className={classes.datePicker}
              inputVariant="outlined"
            />
          </Box>
          <Box mt={6}>
            <Box m={1}>
              <InputLabel>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontSize: "12.5px" }}
                >
                  Description
                </Typography>
              </InputLabel>
            </Box>
            <TextField
              className={classes.input}
              multiline
              rows="7"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box
            className={classes.actionRoot}
            display="flex"
            justifyContent="flex-end"
            mt={4}
          >
            <Button>Cancel</Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default DareAdmin;
