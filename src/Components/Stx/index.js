import React, { useEffect, useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getStacksAccount } from "Lib/account";
import { fetchAccount } from "Lib/account";
import { addressToString } from "@blockstack/stacks-transactions";

import StacksLogo from "Assets/Images/stacks-logo.webp";

import { useBlockstack } from "react-blockstack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Stx(props) {
  const classes = useStyles();
  const { userData } = useBlockstack();

  const [txId, setTxId] = useState();

  const [profileStacks, setProfileStacks] = useState({
    stxAdress: null,
    account: null,
  });

  function showAddress(addr) {
    if (addr.length > 20) {
      return (
        addr.substr(0, 8) + "..." + addr.substr(addr.length - 8, addr.length)
      );
    }
    return addr;
  }

  useEffect(() => {
    console.log(userData)
    const { address } = getStacksAccount(userData.appPrivateKey);
    const appStxAddress = addressToString(address);
    const ownerStxAddress = userData.profile.stxAddress;
    fetchAccount(ownerStxAddress).then((acc) => {
      setProfileStacks({ stxAdress: ownerStxAddress, account: acc });
    });
  }, [userData]);

  // const { address } = getStacksAccount(userData.appPrivateKey);

  // useEffect(() => {
  //   fetchAccount(ownerStxAddress).then((acc) => {
  //     setProfileStacks({ account: acc });
  //   });
  //   console.log("test123");
  // }, [ownerStxAddress]);
  return (
    <Box display="flex" alignItems="center">
      <img
        src={StacksLogo}
        alt="Blockstack (stx)"
        width="24px"
        height="24px"
        style={{ marginRight: "8px" }}
      />
      <Box>
        <Typography
          variant="subtitle1"
          gutterBottom={false}
          style={{ lineHeight: "unset", color: "#fff" }}
        >
          {profileStacks.account && <>{profileStacks.account.balance}uSTX</>}
        </Typography>
        <Typography variant="subtitle2">
          {profileStacks.stxAdress && <>{showAddress(profileStacks.stxAdress)}</>}
        </Typography>
      </Box>
    </Box>
  );
}

export default Stx;
