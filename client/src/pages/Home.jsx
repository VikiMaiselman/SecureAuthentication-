import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";

import { checkAuthStatus } from "../util/helpers";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState();

  useEffect(() => {
    const checkStatus = async () => {
      let isAuth;
      try {
        isAuth = await checkAuthStatus();
      } catch (error) {
        console.error(error);
      }

      setIsAuthenticated(() => isAuth);
    };
    checkStatus();
  }, []);

  return (
    <>
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
          {isAuthenticated && <Link to="/logout">Log Out</Link>}
        </Box>
      </Box>

      {/* <p>Transactions will be here soon...</p> */}
    </>
  );
}
