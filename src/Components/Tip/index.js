import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import { useBlockstack } from "react-blockstack";
import {
  makeSTXTokenTransfer,
  privateKeyToString,
  addressToString,
  broadcastTransaction,
} from "@blockstack/stacks-transactions";

import { NETWORK } from "Lib/constants";

import { putStxAddress } from "UserSession";
import { getUserAddress, getStacksAccount, fetchAccount } from "Lib/account";
import { useConnect } from "@blockstack/connect";

import Input from "@material-ui/core/Input";

const BigNum = require("bn.js");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Tip = (props) => {
  const classes = useStyles();
  const { entry } = props;
  const { userSession } = useBlockstack();
  const [open, setOpen] = useState(false);
  const { doSTXTransfer } = useConnect();

  const [account, setAccount] = useState();
  const [userIdentity, setUserIdentity] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      console.log("working");
    }
    // const userData = userSession.loadUserData();
    // const appPrivateKey = userData.appPrivateKey;
    // const id = getStacksAccount(appPrivateKey);
    // const addrAsString = addressToString(id.address);
    // setUserIdentity(id);
    // fetchAccount(addrAsString)
    //   .catch(e => {
    //     console.log(e);
    //   })
    //   .then(async acc => {
    //     setAccount(acc);
    //     console.log({ acc });
    //     const address = await getUserAddress(userSession, userData.username);
    //     console.log(address);

    //     if (!address) {
    //       await putStxAddress(userSession, addrAsString);
    //     }
    //   });
  }, [open]);

  const handleTip = async () => {
    const userData = userSession.loadUserData();
    const sender = userData.profile.stxAddress;
    const appPrivateKey = userData.appPrivateKey;
    const id = getStacksAccount(appPrivateKey);
    const addrAsString = addressToString(id.address);
    setUserIdentity(id);
    const senderAccountInfo = await fetchAccount(sender);
    if (senderAccountInfo.balance < 1000) {
      console.log("Your balance is below 1000 uSTX");
      return;
    }
    console.log({ meow: senderAccountInfo });

    const recipient = entry.durranUser;
    console.log("STX address of recipient " + recipient.stxAddress);

    try {
      await doSTXTransfer({
        recipient: recipient.stxAddress,
        amount: new BigNum(1000),
        network: NETWORK,

        finished: (data) => {
          console.log(data);
        },
      });
    } catch (e) {
      console.log(e);
    }

    // const username = entry.durranUser.username;
    // const recipient = entry.durranUser.stxAddress;

    // console.log("test")

    // const acc = await fetchAccount(addressToString(identity.address));
    // const balance = acc ? parseInt(acc.balance, 16) : 0;
    // if (balance < 1000) {
    //   console.log('Your balance is below 1000 uSTX');
    //   return;
    // }
    // const recipient = await getUserAddress(userSession, username);
    // console.log(recipient)
  };

  return (
    <Box
      className={classes.root}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <IconButton
        aria-label="expand-less"
        color="primary"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
      >
        <MonetizationOnOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ width: "600px", paddingTop: "30px" }}
        >
          Send tip to this Durran User
        </DialogTitle>
        <DialogContent>
          <Box display="flex">
            <Box display="grid" style={{ flex: 1 }}>
              <Typography variant="body2">User</Typography>
              <Typography variant="body1" gutterBottom>
                {entry.durranUser.username}
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Entry
              </Typography>
              <Typography variant="body1" gutterBottom>
                {entry._id}
              </Typography>
            </Box>
            <Box pl={2} pr={2}>
              <Input />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "20px" }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleTip();
            }}
            variant="contained"
            color="primary"
          >
            Send Tip
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Tip;
