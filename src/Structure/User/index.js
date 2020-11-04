import React from "react";
import Box from "@material-ui/core/Box";
import Header from "Components/Layouts/Header";
import UserRoutes from "Routes/User";

const User = (props) => {
  const { userSession, signInUser, signOutUser } = props;
  return (
    <Box>
      <Header userSession={userSession} signInUser={signInUser} signOutUser={signOutUser}/>
      <UserRoutes />
    </Box>
  );
};

export default User;
