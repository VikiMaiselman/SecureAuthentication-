import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { useAuth } from "../contexts/Authentication.context";

export default function Home() {
  const { user } = useAuth();

  React.useEffect(() => {});

  return (
    <Box width={"100%"} my={4}>
      <Typography variant="h6" sx={{ width: "fit-content", margin: 0, marginRight: "auto", padding: 0 }}>
        Recent Transactions From: <span>Today</span>
      </Typography>
    </Box>
  );
}
