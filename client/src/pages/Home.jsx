import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";

import { useAuth } from "../contexts/Authentication.context";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors";

export default function Home() {
  const { user } = useAuth();

  const nonAuthenticatedContent = (
    <Box
      height={"95vh"}
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems="center"
      gap={4}
      sx={{
        background: `linear-gradient(to bottom, white, ${superLightBLue})`,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          backgroundImage: `linear-gradient(180deg, ${middleBlue}, ${lightBlue})`,
          backgroundClip: "text",
          textFillColor: "transparent",
        }}
      >
        My Bank
      </Typography>
      <Typography
        variant="h5"
        sx={{
          backgroundImage: `linear-gradient(180deg, ${middleBlue}, ${lightBlue})`,
          backgroundClip: "text",
          textFillColor: "transparent",
        }}
      >
        In order to see your data, please, log in or sign up!
      </Typography>
      <Link to="/sign-up" style={{ color: middleBlue, "&:hover": { color: superLightBLue } }}>
        Go to Sign Up Page
      </Link>
    </Box>
  );

  const authenticatedContent = (
    <Box
      height={"100vh"}
      // width={"100%"}
      // my={4}
      display="flex"
      alignItems="center"
      // gap={4}
      // p={2}
      // sx={{ overflow: "scroll", margin: "-2em -5rem" }}
    >
      <Box
        flex={"0.25"}
        height={"100%"}
        display="flex"
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        gap={5}
        sx={{
          background: `linear-gradient(to bottom, ${superLightBLue}, ${lightBlue})`,
          paddingTop: "5rem",
        }}
      >
        <Typography variant={"h5"} sx={{ fontWeight: "600", paddingLeft: "2em" }}>
          myBank
        </Typography>

        <div>
          <Typography variant="caption" sx={{ paddingLeft: "2em" }}>
            Available Balance:
          </Typography>
          <Typography variant="h5" sx={{ paddingLeft: "2em" }}>
            12,500 USD
          </Typography>
        </div>

        <Link
          style={{
            width: "100%",
            height: "3.5em",
            background: middleBlue,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2em",
            // paddingLeft: "2em",
          }}
        >
          <GridViewIcon sx={{ paddingLeft: "2em" }} />
          Overview
        </Link>
      </Box>
      <Box flex={"0.75"} height={"100%"} sx={{}}>
        {user.isAuthenticated && <Link to="/logout">Log Out</Link>}
      </Box>
    </Box>
  );

  return !user.isAuthenticated ? nonAuthenticatedContent : authenticatedContent;
}
