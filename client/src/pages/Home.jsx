import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";

import { useAuth } from "../contexts/Authentication.context";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors";

export default function Home() {
  const { user } = useAuth();

  const handleOverviewClick = () => {
    // get data ablout the user
    // get data about all the transactions associated with the user
  };

  return (
    <Box height={"100vh"} display="flex" alignItems="center">
      <Box flex={"0.75"} height={"100%"} sx={{}}>
        {user.isAuthenticated && <Link to="/logout">Log Out</Link>}
      </Box>
    </Box>
  );
}
